#!/usr/bin/env node

/**
 * Statusline Updater for learn-claude skill
 *
 * Displays current learning progress in the Claude Code statusline
 * - Shows module number, name, completion percentage, and exercises completed
 * - Gracefully handles missing progress files
 * - Uses colors library for consistent formatting
 */

const fs = require('fs');
const path = require('path');

// Import colors library for formatting
const colors = require('./lib/colors');

// Module metadata mapping
const MODULE_NAMES = {
  1: 'First Steps',
  2: 'File Operations',
  3: 'Terminal & Git',
  4: 'Advanced Tools',
  5: 'Skill Creation',          // 5a
  6: 'Slash Commands',          // 5b
  7: 'Hooks Mastery',           // 5c
  8: 'Web Integration',         // 6
  9: 'Pull Requests & CI/CD',   // 7a
  10: 'MCP Hands-On',           // 7b
  11: 'Advanced Git',           // 8
  12: 'Context Management',     // 9
  13: 'Power User Mastery'      // 10
};

// Exercise count per module (from progress-helper.js)
const MODULE_EXERCISES = {
  1: 3,  // 1.1, 1.2, 1.3
  2: 4,  // 2.1, 2.2, 2.3, 2.4
  3: 4,  // 3.1, 3.2, 3.3, 3.4
  4: 3,  // 4.1, 4.2, 4.3
  5: 2,  // 5.1, 5.2
  6: 3,  // 6.1, 6.2, 6.3
  7: 3,  // 7.1, 7.2, 7.3
  8: 1,  // 8.1
  9: 0,  // Future modules
  10: 0,
  11: 0,
  12: 0,
  13: 0
};

/**
 * Load learning progress from current working directory
 */
function loadProgress(cwd) {
  const progressFile = path.join(cwd, '.learn-progress.json');

  try {
    if (fs.existsSync(progressFile)) {
      const data = fs.readFileSync(progressFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    // Silently fail - return null if can't read progress
    return null;
  }

  return null;
}

/**
 * Calculate module completion percentage
 */
function calculateModuleCompletion(moduleNum, exercisesCompleted) {
  const totalExercises = MODULE_EXERCISES[moduleNum] || 0;
  if (totalExercises === 0) return 0;

  // Count exercises for this module
  const modulePrefix = `${moduleNum}.`;
  const completedInModule = exercisesCompleted.filter(ex =>
    ex.startsWith(modulePrefix)
  ).length;

  return Math.round((completedInModule / totalExercises) * 100);
}

/**
 * Count total exercises completed for display
 */
function countExercisesForModule(moduleNum, exercisesCompleted) {
  const modulePrefix = `${moduleNum}.`;
  return exercisesCompleted.filter(ex => ex.startsWith(modulePrefix)).length;
}

/**
 * Generate statusline text
 */
function generateStatusLine(stdin) {
  try {
    // Parse stdin JSON (contains workspace info, model, etc.)
    const input = JSON.parse(stdin);
    const cwd = input.workspace?.current_dir || input.cwd || process.cwd();

    // Load progress from the current working directory
    const progress = loadProgress(cwd);

    if (!progress) {
      // No progress file found - show welcome message
      return colors.colorize('🚀 Start Learning - Run /learn to begin', 'primary');
    }

    // Extract progress data
    const currentModule = progress.currentModule || 1;
    const moduleName = MODULE_NAMES[currentModule] || `Module ${currentModule}`;
    const exercisesCompleted = progress.exercisesCompleted || [];
    const completedModules = progress.completedModules || [];

    // Calculate completion percentage for current module
    const completionPercentage = calculateModuleCompletion(currentModule, exercisesCompleted);
    const exercisesInModule = countExercisesForModule(currentModule, exercisesCompleted);

    // Build statusline components
    const bookIcon = colors.ICONS.book;
    const moduleText = `Module ${currentModule}: ${moduleName}`;
    const percentageText = `${completionPercentage}% Complete`;
    const exerciseText = `${exercisesInModule} exercises done`;

    // Format with colors
    const statusLine = [
      colors.colorize(bookIcon, 'primary'),
      colors.colorize(moduleText, 'emphasis'),
      colors.colorize('•', 'muted'),
      colors.colorize(percentageText, completionPercentage === 100 ? 'success' : 'current'),
      colors.colorize('•', 'muted'),
      colors.colorize(exerciseText, 'info')
    ].join(' ');

    return statusLine;

  } catch (error) {
    // Fallback in case of any errors
    return colors.colorize('📚 Learn Claude Code', 'primary');
  }
}

/**
 * Main execution
 */
function main() {
  // Read stdin
  let stdin = '';

  if (process.stdin.isTTY) {
    // Running directly (for testing) - use mock data
    stdin = JSON.stringify({
      workspace: {
        current_dir: process.cwd()
      }
    });
  } else {
    // Read from stdin
    const chunks = [];
    process.stdin.on('readable', () => {
      let chunk;
      while (null !== (chunk = process.stdin.read())) {
        chunks.push(chunk);
      }
    });

    process.stdin.on('end', () => {
      stdin = Buffer.concat(chunks).toString('utf8');
      const statusLine = generateStatusLine(stdin);
      console.log(statusLine);
    });

    return;
  }

  // If TTY, generate immediately with mock data
  const statusLine = generateStatusLine(stdin);
  console.log(statusLine);
}

// Export for testing
module.exports = {
  loadProgress,
  calculateModuleCompletion,
  generateStatusLine,
  MODULE_NAMES,
  MODULE_EXERCISES
};

// Run if executed directly
if (require.main === module) {
  main();
}
