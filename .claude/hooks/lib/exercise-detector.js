#!/usr/bin/env node

/**
 * Exercise Detection Engine for Learn Claude
 * Sophisticated detection of exercise completion using composite rules
 */

const fs = require('fs');
const path = require('path');

/**
 * Detect if an exercise is completed based on detection rules
 *
 * @param {Object} exerciseRules - Detection rules for the exercise
 * @param {Object} context - Context data (tool usage, file state, etc.)
 * @returns {Object} - { completed: boolean, confidence: number, reason: string }
 */
function detectExerciseCompletion(exerciseRules, context) {
  if (!exerciseRules || !exerciseRules.type) {
    return { completed: false, confidence: 0, reason: 'No detection rules defined' };
  }

  const detectors = {
    'simple': detectSimple,
    'composite': detectComposite,
    'file_validation': detectFileValidation,
    'content_analysis': detectContentAnalysis,
    'tool_sequence': detectToolSequence,
    'ai_validation': detectAIValidation
  };

  const detector = detectors[exerciseRules.type];
  if (!detector) {
    return { completed: false, confidence: 0, reason: `Unknown detection type: ${exerciseRules.type}` };
  }

  return detector(exerciseRules, context);
}

/**
 * Simple detection: Single tool usage
 */
function detectSimple(rules, context) {
  const { tool, command_contains, file_pattern } = rules;

  // Check tool usage
  if (tool && context.lastToolUsed !== tool) {
    return { completed: false, confidence: 0, reason: `Expected tool: ${tool}, got: ${context.lastToolUsed}` };
  }

  // Check command content
  if (command_contains && context.lastCommand) {
    if (!context.lastCommand.includes(command_contains)) {
      return { completed: false, confidence: 0.3, reason: `Command doesn't contain: ${command_contains}` };
    }
  }

  // Check file pattern
  if (file_pattern && context.filesModified) {
    const regex = new RegExp(file_pattern.replace('*', '.*'));
    const matches = context.filesModified.some(f => regex.test(f));
    if (!matches) {
      return { completed: false, confidence: 0.5, reason: `No files match pattern: ${file_pattern}` };
    }
  }

  return { completed: true, confidence: 1.0, reason: 'Simple detection passed' };
}

/**
 * Composite detection: Multiple rules with AND/OR logic
 */
function detectComposite(rules, context) {
  const { operator = 'AND', rules: subRules } = rules;

  if (!subRules || subRules.length === 0) {
    return { completed: false, confidence: 0, reason: 'No sub-rules defined' };
  }

  const results = subRules.map(subRule => {
    // Handle negation
    if (subRule.not) {
      const result = detectExerciseCompletion({ type: 'simple', ...subRule.not }, context);
      return {
        ...result,
        completed: !result.completed,
        reason: `NOT(${result.reason})`
      };
    }

    return detectExerciseCompletion({ type: 'simple', ...subRule }, context);
  });

  let completed, confidence, reason;

  if (operator === 'AND') {
    completed = results.every(r => r.completed);
    confidence = completed ? Math.min(...results.map(r => r.confidence)) : 0;
    reason = completed
      ? 'All conditions met'
      : `Missing: ${results.filter(r => !r.completed).map(r => r.reason).join(', ')}`;
  } else if (operator === 'OR') {
    completed = results.some(r => r.completed);
    confidence = completed ? Math.max(...results.map(r => r.confidence)) : 0;
    reason = completed
      ? `Met: ${results.filter(r => r.completed).map(r => r.reason).join(' OR ')}`
      : 'No conditions met';
  } else {
    return { completed: false, confidence: 0, reason: `Unknown operator: ${operator}` };
  }

  return { completed, confidence, reason };
}

/**
 * File validation: Check file exists and contains expected content
 */
function detectFileValidation(rules, context) {
  const { path: filePath, checks = [] } = rules;

  if (!filePath) {
    return { completed: false, confidence: 0, reason: 'No file path specified' };
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return { completed: false, confidence: 0, reason: `File not found: ${filePath}` };
  }

  // Read file content
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return { completed: false, confidence: 0, reason: `Cannot read file: ${error.message}` };
  }

  // Run checks
  for (const check of checks) {
    if (check.contains) {
      if (!content.includes(check.contains)) {
        return {
          completed: false,
          confidence: 0.5,
          reason: `File missing: "${check.contains}"`
        };
      }
    }

    if (check.matches) {
      const regex = new RegExp(check.matches);
      if (!regex.test(content)) {
        return {
          completed: false,
          confidence: 0.5,
          reason: `File doesn't match pattern: ${check.matches}`
        };
      }
    }

    if (check.line_count) {
      const lines = content.split('\n').length;
      if (lines < check.line_count.min) {
        return {
          completed: false,
          confidence: 0.7,
          reason: `File too short: ${lines} lines (min ${check.line_count.min})`
        };
      }
      if (check.line_count.max && lines > check.line_count.max) {
        return {
          completed: false,
          confidence: 0.7,
          reason: `File too long: ${lines} lines (max ${check.line_count.max})`
        };
      }
    }
  }

  return { completed: true, confidence: 1.0, reason: 'File validation passed' };
}

/**
 * Content analysis: Analyze code quality or structure
 */
function detectContentAnalysis(rules, context) {
  const { file_path, analysis_type } = rules;

  if (!file_path || !fs.existsSync(file_path)) {
    return { completed: false, confidence: 0, reason: 'File not found for analysis' };
  }

  const content = fs.readFileSync(file_path, 'utf8');

  if (analysis_type === 'function_defined') {
    const { function_name } = rules;
    const patterns = [
      new RegExp(`function\\s+${function_name}\\s*\\(`),
      new RegExp(`const\\s+${function_name}\\s*=.*=>`),,
      new RegExp(`${function_name}\\s*:\\s*function`)
    ];

    const found = patterns.some(p => p.test(content));
    return {
      completed: found,
      confidence: found ? 0.9 : 0,
      reason: found ? `Function ${function_name} defined` : `Function ${function_name} not found`
    };
  }

  if (analysis_type === 'imports') {
    const { required_imports } = rules;
    const missing = required_imports.filter(imp => !content.includes(imp));

    if (missing.length > 0) {
      return {
        completed: false,
        confidence: 0.6,
        reason: `Missing imports: ${missing.join(', ')}`
      };
    }

    return { completed: true, confidence: 0.9, reason: 'All imports present' };
  }

  if (analysis_type === 'test_coverage') {
    const testPatterns = [/it\s*\(/g, /test\s*\(/g, /describe\s*\(/g];
    const testCount = testPatterns.reduce((sum, pattern) => {
      return sum + (content.match(pattern) || []).length;
    }, 0);

    const { min_tests = 1 } = rules;
    const completed = testCount >= min_tests;

    return {
      completed,
      confidence: completed ? 0.9 : 0.5,
      reason: completed
        ? `Found ${testCount} tests (min ${min_tests})`
        : `Only ${testCount} tests found (min ${min_tests})`
    };
  }

  return { completed: false, confidence: 0, reason: 'Unknown analysis type' };
}

/**
 * Tool sequence detection: Check if tools were used in order
 */
function detectToolSequence(rules, context) {
  const { sequence, strict = true } = rules;

  if (!sequence || sequence.length === 0) {
    return { completed: false, confidence: 0, reason: 'No sequence defined' };
  }

  if (!context.toolHistory || context.toolHistory.length === 0) {
    return { completed: false, confidence: 0, reason: 'No tool history available' };
  }

  if (strict) {
    // Strict mode: exact sequence in order
    let seqIndex = 0;
    for (const tool of context.toolHistory) {
      if (tool === sequence[seqIndex]) {
        seqIndex++;
        if (seqIndex === sequence.length) {
          return { completed: true, confidence: 1.0, reason: 'Sequence completed in order' };
        }
      }
    }

    return {
      completed: false,
      confidence: seqIndex / sequence.length,
      reason: `Completed ${seqIndex}/${sequence.length} steps`
    };
  } else {
    // Flexible mode: all tools used, any order
    const remaining = sequence.filter(tool => !context.toolHistory.includes(tool));

    if (remaining.length === 0) {
      return { completed: true, confidence: 0.9, reason: 'All tools used' };
    }

    return {
      completed: false,
      confidence: (sequence.length - remaining.length) / sequence.length,
      reason: `Missing tools: ${remaining.join(', ')}`
    };
  }
}

/**
 * AI validation: Use AI to check if exercise was completed correctly
 * (This would integrate with Claude API in production)
 */
function detectAIValidation(rules, context) {
  const { prompt, min_quality = 'acceptable' } = rules;

  // In a real implementation, this would call Claude API
  // For now, return a placeholder

  const qualityLevels = {
    'poor': 0.3,
    'acceptable': 0.6,
    'good': 0.8,
    'excellent': 1.0
  };

  // Simulate AI validation
  // In production, you'd call Claude here
  const simulatedQuality = 'good'; // This would come from AI

  const confidence = qualityLevels[simulatedQuality];
  const completed = qualityLevels[simulatedQuality] >= qualityLevels[min_quality];

  return {
    completed,
    confidence,
    reason: `AI quality assessment: ${simulatedQuality} (min: ${min_quality})`
  };
}

/**
 * Build context from recent activity
 */
function buildContext(activity) {
  return {
    lastToolUsed: activity.lastTool || null,
    lastCommand: activity.lastCommand || null,
    filesModified: activity.filesModified || [],
    filesCreated: activity.filesCreated || [],
    toolHistory: activity.toolHistory || [],
    messageContent: activity.messageContent || '',
    timestamp: activity.timestamp || Date.now()
  };
}

/**
 * Example detection rules for common exercises
 */
const EXAMPLE_RULES = {
  // Simple: Use Read tool
  'read-file': {
    type: 'simple',
    tool: 'Read'
  },

  // Composite: Create and edit a file
  'create-and-edit': {
    type: 'composite',
    operator: 'AND',
    rules: [
      { tool: 'Write' },
      { tool: 'Edit' }
    ]
  },

  // File validation: Cargo project
  'cargo-project': {
    type: 'composite',
    operator: 'AND',
    rules: [
      {
        type: 'file_validation',
        path: 'Cargo.toml',
        checks: [
          { contains: '[package]' },
          { contains: 'name =' }
        ]
      },
      {
        type: 'file_validation',
        path: 'src/main.rs',
        checks: []
      }
    ]
  },

  // Tool sequence: Debug workflow
  'debug-workflow': {
    type: 'tool_sequence',
    sequence: ['Grep', 'Read', 'Edit'],
    strict: false
  }
};

module.exports = {
  detectExerciseCompletion,
  buildContext,
  EXAMPLE_RULES
};

// Test if run directly
if (require.main === module) {
  console.log('=== Exercise Detection Engine Test ===\n');

  // Test 1: Simple detection
  console.log('Test 1: Simple tool detection');
  const result1 = detectExerciseCompletion(
    { type: 'simple', tool: 'Read' },
    { lastToolUsed: 'Read' }
  );
  console.log(result1);
  console.log('');

  // Test 2: Composite detection
  console.log('Test 2: Composite detection (AND)');
  const result2 = detectExerciseCompletion(
    {
      type: 'composite',
      operator: 'AND',
      rules: [
        { tool: 'Read' },
        { tool: 'Write' }
      ]
    },
    { lastToolUsed: 'Write', toolHistory: ['Read', 'Write'] }
  );
  console.log(result2);
  console.log('');

  // Test 3: File validation
  console.log('Test 3: File validation');
  const result3 = detectExerciseCompletion(
    {
      type: 'file_validation',
      path: __filename,
      checks: [
        { contains: 'detectExerciseCompletion' }
      ]
    },
    {}
  );
  console.log(result3);
  console.log('');

  // Test 4: Tool sequence
  console.log('Test 4: Tool sequence detection');
  const result4 = detectExerciseCompletion(
    {
      type: 'tool_sequence',
      sequence: ['Grep', 'Read', 'Edit'],
      strict: false
    },
    { toolHistory: ['Grep', 'Write', 'Read', 'Edit', 'Bash'] }
  );
  console.log(result4);
  console.log('');
}
