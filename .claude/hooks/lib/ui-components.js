#!/usr/bin/env node

/**
 * Enhanced UI Components for Learn Claude
 * Beautiful, colorful terminal interfaces using the color system
 */

const colors = require('./colors');
const { ICONS, colorize, box, progressBar, statusList, heading, divider, center, table } = colors;

/**
 * Display enhanced progress dashboard
 */
function showProgressDashboard(progress) {
  const {
    completedModules = [],
    exercisesCompleted = [],
    totalExercises = 32,
    currentModule = 1,
    currentExercise = '1.1',
    streak = 0,
    totalTime = 0,
    achievements = []
  } = progress;

  const completionPercentage = Math.round((exercisesCompleted.length / totalExercises) * 100);

  const moduleList = [
    { num: 1, name: 'First Steps', status: completedModules.includes(1) ? 'completed' : (currentModule === 1 ? 'current' : 'incomplete') },
    { num: 2, name: 'File Operations', status: completedModules.includes(2) ? 'completed' : (currentModule === 2 ? 'current' : 'incomplete') },
    { num: 3, name: 'Terminal & Git', status: completedModules.includes(3) ? 'completed' : (currentModule === 3 ? 'current' : 'incomplete') },
    { num: 4, name: 'Advanced Tools', status: completedModules.includes(4) ? 'completed' : (currentModule === 4 ? 'current' : 'incomplete') },
    { num: 5, name: '5A-C: Customization', status: completedModules.includes(5) ? 'completed' : (currentModule === 5 ? 'current' : 'incomplete') },
    { num: 6, name: 'Web Integration', status: completedModules.includes(6) ? 'completed' : (currentModule === 6 ? 'current' : 'incomplete') },
    { num: 7, name: '7A-B: PR & MCP', status: completedModules.includes(7) ? 'completed' : (currentModule === 7 ? 'current' : 'incomplete') },
    { num: 8, name: 'Advanced Git', status: completedModules.includes(8) ? 'completed' : (currentModule === 8 ? 'current' : 'incomplete') },
    { num: 9, name: 'Context Management', status: completedModules.includes(9) ? 'completed' : (currentModule === 9 ? 'current' : 'incomplete') },
    { num: 10, name: 'Power User Mastery', status: completedModules.includes(10) ? 'completed' : (currentModule === 10 ? 'current' : 'incomplete') }
  ];

  const lines = [];

  lines.push('╭────────────────────────────────────────────────╮');
  lines.push('│  ' + colorize('🎯 Your Learning Journey', 'heading') + '                      │');
  lines.push('├────────────────────────────────────────────────┤');
  lines.push('│                                                │');

  // Progress bar
  lines.push('│  ' + progressBar(exercisesCompleted.length, totalExercises, { width: 40, showNumbers: false }) + '    │');
  lines.push('│                                                │');

  // Module list (compact)
  moduleList.slice(0, 6).forEach(mod => {
    let icon, statusText;
    if (mod.status === 'completed') {
      icon = colorize('✅', 'complete');
      statusText = mod.name;
    } else if (mod.status === 'current') {
      icon = colorize('🔄', 'current');
      statusText = colorize(mod.name, 'current');
    } else {
      icon = colorize('⭕', 'incomplete');
      statusText = colorize(mod.name, 'muted');
    }
    lines.push(`│  ${icon} Module ${mod.num}: ${statusText.padEnd(30)} │`);
  });

  if (moduleList.length > 6) {
    const remaining = moduleList.length - 6;
    lines.push(`│  ${colorize('⭕', 'incomplete')} ... ${remaining} more modules${' '.repeat(24)}│`);
  }

  lines.push('│                                                │');

  // Stats
  if (streak > 0) {
    lines.push(`│  ${ICONS.fire} Streak: ${colorize(streak + ' days', 'warning')}${' '.repeat(33 - streak.toString().length)}│`);
  }

  if (totalTime > 0) {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const timeStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    lines.push(`│  ${ICONS.clock} Total time: ${timeStr}${' '.repeat(31 - timeStr.length)}│`);
  }

  if (achievements.length > 0) {
    lines.push(`│  ${ICONS.trophy} Achievements: ${achievements.length}/15 unlocked${' '.repeat(20 - achievements.length.toString().length)}│`);
  }

  lines.push('│                                                │');
  lines.push('╰────────────────────────────────────────────────╯');

  return lines.join('\n');
}

/**
 * Display beautiful module introduction
 */
function showModuleIntro(moduleData) {
  const {
    number,
    name,
    icon = '📚',
    description,
    tools = [],
    estimatedTime = '30 minutes',
    exercises = 4,
    challenges = 0,
    quiz = true,
    proTip = null
  } = moduleData;

  const lines = [];

  lines.push('');
  lines.push('╔═══════════════════════════════════════════════════════╗');
  lines.push('║                                                       ║');
  lines.push('║' + center(colorize(`${icon}  MODULE ${number}: ${name.toUpperCase()}`, 'heading'), 55) + '║');
  lines.push('║                                                       ║');
  lines.push('╠═══════════════════════════════════════════════════════╣');
  lines.push('║                                                       ║');

  // Description
  const descLines = wrapText(description, 51);
  descLines.forEach(line => {
    lines.push('║  ' + line.padEnd(51) + '  ║');
  });

  lines.push('║                                                       ║');

  // Tools/topics
  if (tools.length > 0) {
    tools.forEach(tool => {
      const toolLine = `${tool.icon} ${colorize(tool.name, 'emphasis')} → ${tool.description}`;
      const wrapped = wrapText(toolLine, 51);
      wrapped.forEach(line => {
        lines.push('║  ' + line.padEnd(51) + '  ║');
      });
    });
    lines.push('║                                                       ║');
  }

  lines.push('╠═══════════════════════════════════════════════════════╣');
  lines.push('║                                                       ║');

  // Details
  lines.push('║  ' + colorize(`${ICONS.clock} Estimated time: ${estimatedTime}`, 'info').padEnd(67) + '  ║');
  lines.push('║  ' + colorize(`${ICONS.target} Exercises: ${exercises} hands-on activities`, 'info').padEnd(67) + '  ║');

  if (challenges > 0) {
    lines.push('║  ' + colorize(`${ICONS.lightning} Challenge: ${challenges} practical debugging task${challenges > 1 ? 's' : ''}`, 'info').padEnd(67) + '  ║');
  }

  if (quiz) {
    lines.push('║  ' + colorize(`${ICONS.pencil} Assessment: 5 question quiz`, 'info').padEnd(67) + '  ║');
  }

  lines.push('║                                                       ║');

  // Pro tip
  if (proTip) {
    lines.push('╠═══════════════════════════════════════════════════════╣');
    lines.push('║                                                       ║');
    const tipLines = wrapText(`${ICONS.bulb} Pro Tip: ${proTip}`, 51);
    tipLines.forEach(line => {
      lines.push('║  ' + line.padEnd(51) + '  ║');
    });
    lines.push('║                                                       ║');
  }

  lines.push('╚═══════════════════════════════════════════════════════╝');
  lines.push('');
  lines.push(colorize('Press ENTER to begin...', 'muted'));
  lines.push('');

  return lines.join('\n');
}

/**
 * Display interactive exercise prompt
 */
function showExercisePrompt(exerciseData) {
  const {
    number,
    title,
    icon = '✏️',
    context,
    mission,
    ideas = [],
    example,
    estimatedTime = '5 minutes',
    difficulty = 1, // 1-3
    hints = []
  } = exerciseData;

  const difficultyStars = '⭐'.repeat(difficulty);
  const difficultyLevel = ['Beginner', 'Intermediate', 'Advanced'][difficulty - 1];

  const lines = [];

  lines.push('');
  lines.push('┌─────────────────────────────────────────────────┐');
  lines.push('│  ' + colorize(`${icon} EXERCISE ${number}: ${title.toUpperCase()}`, 'primary') + ' '.repeat(Math.max(0, 44 - title.length - number.length)) + '│');
  lines.push('├─────────────────────────────────────────────────┤');
  lines.push('│                                                 │');

  // Context
  if (context) {
    const contextLines = wrapText(context, 45);
    contextLines.forEach(line => {
      lines.push('│  ' + line.padEnd(45) + '  │');
    });
    lines.push('│                                                 │');
  }

  // Mission
  lines.push('│  ' + colorize(`${ICONS.target} Your Mission:`, 'emphasis').padEnd(59) + '  │');
  const missionLines = wrapText(mission, 45);
  missionLines.forEach(line => {
    lines.push('│  ' + line.padEnd(45) + '  │');
  });
  lines.push('│                                                 │');

  // Ideas
  if (ideas.length > 0) {
    lines.push('│  ' + colorize(`${ICONS.bulb} Ideas:`, 'emphasis').padEnd(59) + '  │');
    ideas.forEach(idea => {
      const ideaLines = wrapText(`• ${idea}`, 45);
      ideaLines.forEach(line => {
        lines.push('│  ' + line.padEnd(45) + '  │');
      });
    });
    lines.push('│                                                 │');
  }

  // Example
  if (example) {
    lines.push('│  ' + colorize(`${ICONS.pencil} Example prompt:`, 'emphasis').padEnd(59) + '  │');
    const exampleLines = wrapText(`"${example}"`, 45);
    exampleLines.forEach(line => {
      lines.push('│  ' + colorize(line, 'code').padEnd(59) + '  │');
    });
    lines.push('│                                                 │');
  }

  // Meta info
  lines.push('│  ' + colorize(`${ICONS.clock} Estimated time: ${estimatedTime}`, 'muted').padEnd(59) + '  │');
  lines.push('│  ' + colorize(`${ICONS.star} Difficulty: ${difficultyStars} ${difficultyLevel}`, 'muted').padEnd(59 + difficulty * 3) + '  │');
  lines.push('│                                                 │');
  lines.push('└─────────────────────────────────────────────────┘');
  lines.push('');

  if (hints.length > 0) {
    lines.push(colorize(`💡 ${hints.length} hint${hints.length > 1 ? 's' : ''} available - ask if you need help!`, 'muted'));
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Display exercise completion celebration
 */
function showExerciseCelebration(exerciseNumber) {
  const lines = [];

  lines.push('');
  lines.push('  ' + colorize('✨ ', 'success').repeat(20));
  lines.push('');
  lines.push('     ' + colorize(`${ICONS.party}  EXERCISE ${exerciseNumber} COMPLETE!  ${ICONS.party}`, 'success'));
  lines.push('');
  lines.push('  ' + colorize('✨ ', 'success').repeat(20));
  lines.push('');

  return lines.join('\n');
}

/**
 * Display module completion celebration
 */
function showModuleCelebration(moduleData) {
  const { number, name, timeSpent, exercisesCompleted, totalExercises } = moduleData;

  const lines = [];

  lines.push('');
  lines.push('═'.repeat(50));
  lines.push('');
  lines.push(center(colorize(`✨ MODULE ${number} COMPLETE! ✨`, 'success'), 50));
  lines.push('');
  lines.push(center(colorize(name, 'heading'), 50));
  lines.push('');
  lines.push('═'.repeat(50));
  lines.push('');

  // Stats
  lines.push('   📊 Module Stats:');
  lines.push('   ─────────────────');
  if (timeSpent) {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    lines.push(`   ${ICONS.clock} Time spent: ${minutes}m ${seconds}s`);
  }
  if (exercisesCompleted) {
    lines.push(`   ${ICONS.success} Exercises: ${exercisesCompleted}/${totalExercises}`);
  }
  lines.push('');

  // Celebration
  lines.push('        *  \'  .');
  lines.push('      .  *  * .  *');
  lines.push('    *   *  .  *  .');
  lines.push('      .  *  *  .');
  lines.push('        .  *  \'');
  lines.push('');

  lines.push('═'.repeat(50));
  lines.push('');

  return lines.join('\n');
}

/**
 * Display quiz question
 */
function showQuizQuestion(questionData) {
  const { number, total, question, options, type = 'multiple-choice' } = questionData;

  const lines = [];

  lines.push('');
  lines.push('╔═══════════════════════════════════════════════════════╗');
  lines.push('║' + center(colorize(`📝 MODULE ASSESSMENT - Question ${number}/${total}`, 'heading'), 55) + '║');
  lines.push('╠═══════════════════════════════════════════════════════╣');
  lines.push('║                                                       ║');

  // Question
  const questionLines = wrapText(question, 51);
  questionLines.forEach(line => {
    lines.push('║  ' + colorize(line, 'emphasis').padEnd(65) + '  ║');
  });

  lines.push('║                                                       ║');

  // Options (for multiple choice)
  if (type === 'multiple-choice' && options) {
    options.forEach((option, i) => {
      const letter = String.fromCharCode(97 + i); // a, b, c, d
      const optionLines = wrapText(`${letter}) ${option}`, 51);
      optionLines.forEach((line, j) => {
        if (j === 0) {
          lines.push('║  ' + colorize(line, 'info').padEnd(65) + '  ║');
        } else {
          lines.push('║     ' + line.padEnd(48) + '  ║');
        }
      });
    });
    lines.push('║                                                       ║');
  }

  // Free-form prompt
  if (type === 'free-form') {
    lines.push('║  ' + colorize('[Free-form answer - explain in your own words]', 'muted').padEnd(65) + '  ║');
    lines.push('║                                                       ║');
  }

  lines.push('╚═══════════════════════════════════════════════════════╝');
  lines.push('');

  return lines.join('\n');
}

/**
 * Display practical challenge banner
 */
function showChallengeBanner(challengeData) {
  const {
    number,
    title,
    scenario,
    tasks = [],
    timeLimit,
    difficulty = 2,
    successCriteria = []
  } = challengeData;

  const difficultyStars = '⭐'.repeat(difficulty);
  const difficultyLevel = ['Beginner', 'Intermediate', 'Advanced'][difficulty - 1];

  const lines = [];

  lines.push('');
  lines.push('╔═══════════════════════════════════════════════════════╗');
  lines.push('║' + center(colorize(`💪 PRACTICAL CHALLENGE ${number}: ${title.toUpperCase()}`, 'warning'), 55) + '║');
  lines.push('╠═══════════════════════════════════════════════════════╣');
  lines.push('║                                                       ║');

  // Scenario
  lines.push('║  ' + colorize(`${ICONS.info} Scenario:`, 'emphasis').padEnd(65) + '  ║');
  const scenarioLines = wrapText(scenario, 51);
  scenarioLines.forEach(line => {
    lines.push('║  ' + line.padEnd(51) + '  ║');
  });
  lines.push('║                                                       ║');

  // Tasks
  lines.push('║  ' + colorize(`${ICONS.target} Your mission:`, 'emphasis').padEnd(65) + '  ║');
  tasks.forEach((task, i) => {
    const taskLines = wrapText(`${i + 1}. ${task}`, 51);
    taskLines.forEach((line, j) => {
      if (j === 0) {
        lines.push('║  ' + line.padEnd(51) + '  ║');
      } else {
        lines.push('║     ' + line.padEnd(48) + '  ║');
      }
    });
  });
  lines.push('║                                                       ║');

  // Success criteria
  if (successCriteria.length > 0) {
    lines.push('║  ' + colorize(`${ICONS.success} Success criteria:`, 'emphasis').padEnd(65) + '  ║');
    successCriteria.forEach(criterion => {
      const criterionLines = wrapText(`☐ ${criterion}`, 51);
      criterionLines.forEach(line => {
        lines.push('║  ' + line.padEnd(51) + '  ║');
      });
    });
    lines.push('║                                                       ║');
  }

  // Meta info
  if (timeLimit) {
    lines.push('║  ' + colorize(`${ICONS.clock} Time limit: ${timeLimit}`, 'warning').padEnd(65) + '  ║');
  }
  lines.push('║  ' + colorize(`${ICONS.star} Difficulty: ${difficultyStars} ${difficultyLevel}`, 'warning').padEnd(65 + difficulty * 3) + '  ║');
  lines.push('║                                                       ║');
  lines.push('╚═══════════════════════════════════════════════════════╝');
  lines.push('');
  lines.push(colorize(`Type "start challenge ${number}" when ready!`, 'primary'));
  lines.push('');

  return lines.join('\n');
}

/**
 * Display module selection menu with time estimates
 */
function showModuleSelectionMenu(moduleMetadata, progress = {}) {
  const {
    completedModules = [],
    currentModule = 1,
    moduleStats = {}
  } = progress;

  const lines = [];

  // Header
  lines.push('');
  lines.push('╔══════════════════════════════════════════════════════════════════════════╗');
  lines.push('║' + center(colorize('📚 Claude Code Mastery - All Modules', 'heading'), 74) + '║');
  lines.push('╚══════════════════════════════════════════════════════════════════════════╝');
  lines.push('');

  // Group modules by category
  const categories = {
    foundations: { icon: '📚', name: 'FOUNDATIONS', time: 95, description: 'Essential for all users' },
    customization: { icon: '🎨', name: 'DEEP CUSTOMIZATION', time: 95, description: 'Build your own workflows' },
    integration: { icon: '🔗', name: 'INTEGRATION & ADVANCED', time: 150, description: 'Professional workflows' },
    advanced: { icon: '🚀', name: 'ADVANCED MASTERY', time: 85, description: 'Power user techniques' }
  };

  // Get category modules from metadata
  const categoryModules = {
    foundations: moduleMetadata.modules.filter(m => m.category === 'foundations'),
    customization: moduleMetadata.modules.filter(m => m.category === 'customization'),
    integration: moduleMetadata.modules.filter(m => m.category === 'integration'),
    advanced: moduleMetadata.modules.filter(m => m.category === 'advanced')
  };

  // Display each category
  Object.keys(categories).forEach(catKey => {
    const category = categories[catKey];
    const modules = categoryModules[catKey];

    lines.push(colorize(`${category.icon} ${category.name} (${category.time} min)`, 'heading') + colorize(` - ${category.description}`, 'muted'));

    modules.forEach(module => {
      const moduleNum = module.number;
      let statusIcon, statusColor;

      if (completedModules.includes(moduleNum)) {
        statusIcon = '✅';
        statusColor = 'success';
      } else if (currentModule === moduleNum) {
        statusIcon = '🔄';
        statusColor = 'warning';
      } else {
        statusIcon = '⭕';
        statusColor = 'muted';
      }

      const numStr = moduleNum.toString().padStart(3, ' ');
      const nameStr = (module.moduleId ? `${module.moduleId}: ${module.name}` : module.name).padEnd(30);
      const timeStr = `[${module.timeEstimateMinutes} min]`.padEnd(10);
      const descStr = module.description;

      lines.push(`  ${numStr}. ${colorize(statusIcon, statusColor)}  ${colorize(nameStr, statusColor)} ${colorize(timeStr, 'muted')} ${colorize(descStr, 'muted')}`);
    });

    lines.push('');
  });

  // Calculate stats
  const totalModules = moduleMetadata.modules.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  // Calculate time invested
  let totalTimeInvested = 0;
  Object.keys(moduleStats).forEach(moduleNum => {
    if (moduleStats[moduleNum] && moduleStats[moduleNum].timeSpent) {
      totalTimeInvested += moduleStats[moduleNum].timeSpent;
    }
  });
  const hoursInvested = (totalTimeInvested / 3600).toFixed(1);

  // Calculate time remaining
  const incompleteModules = moduleMetadata.modules.filter(m => !completedModules.includes(m.number));
  const timeRemaining = incompleteModules.reduce((sum, m) => sum + m.timeEstimateMinutes, 0);
  const hoursRemaining = (timeRemaining / 60).toFixed(1);

  // Progress footer
  lines.push('──────────────────────────────────────────────────────────────────────────');
  lines.push(colorize(`Progress: ${completedCount}/${totalModules} modules (${progressPercent}%)`, 'info') +
             colorize(` | Time invested: ${hoursInvested} hours`, 'info') +
             colorize(` | ${hoursRemaining} hours remaining`, 'muted'));
  lines.push(colorize(`Current: Module ${currentModule}`, 'warning'));
  lines.push('──────────────────────────────────────────────────────────────────────────');
  lines.push('');

  return lines.join('\n');
}

/**
 * Display module preview before starting
 */
function showModulePreview(moduleMetadata, moduleNumber) {
  const module = moduleMetadata.modules.find(m => m.number === moduleNumber);
  if (!module) {
    return `Module ${moduleNumber} not found.`;
  }

  const lines = [];

  lines.push('');
  lines.push('╔══════════════════════════════════════════════════════════════╗');
  lines.push('║' + center(colorize(`Module ${moduleNumber}: ${module.moduleId || moduleNumber} - ${module.name}`, 'heading'), 62) + '║');
  lines.push('╚══════════════════════════════════════════════════════════════╝');
  lines.push('');
  lines.push(`  ${ICONS.clock} ${colorize('Estimated time:', 'emphasis')} ${module.timeEstimateMinutes} minutes`);
  lines.push(`  ${ICONS.pencil} ${colorize('Exercises:', 'emphasis')} ${module.exerciseCount} hands-on exercises`);
  lines.push(`  ${ICONS.star} ${colorize('Difficulty:', 'emphasis')} ${module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}`);
  lines.push('');
  lines.push(colorize('  What you\'ll learn:', 'emphasis'));
  const descLines = wrapText(module.description, 58);
  descLines.forEach(line => {
    lines.push('  • ' + line);
  });
  lines.push('');
  lines.push(colorize('  Topics covered:', 'emphasis'));
  module.topics.forEach(topic => {
    lines.push('  • ' + topic);
  });
  lines.push('');
  lines.push('╚══════════════════════════════════════════════════════════════╝');
  lines.push('');

  return lines.join('\n');
}

/**
 * Utility: Wrap text to fit within width
 */
function wrapText(text, maxWidth) {
  // Remove ANSI codes for length calculation
  const stripAnsi = (str) => str.replace(/\x1b\[[0-9;]*m/g, '');

  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (stripAnsi(testLine).length <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);

  return lines.map(line => {
    const stripped = stripAnsi(line);
    return line.padEnd(line.length + (maxWidth - stripped.length));
  });
}

// Export all components
module.exports = {
  showProgressDashboard,
  showModuleIntro,
  showExercisePrompt,
  showExerciseCelebration,
  showModuleCelebration,
  showQuizQuestion,
  showChallengeBanner,
  showModuleSelectionMenu,
  showModulePreview
};

// Test if run directly
if (require.main === module) {
  console.log('\n=== UI Components Test ===\n');

  // Test progress dashboard
  console.log(showProgressDashboard({
    completedModules: [1, 2],
    exercisesCompleted: Array.from({ length: 12 }, (_, i) => `${i + 1}.1`),
    totalExercises: 32,
    currentModule: 3,
    currentExercise: '3.1',
    streak: 5,
    totalTime: 7200,
    achievements: ['first-steps', 'quick-learner', 'on-fire']
  }));

  // Test module intro
  console.log(showModuleIntro({
    number: 2,
    name: 'File Operations',
    icon: '📁',
    description: 'Master the essential tools for working with code files in Claude Code.',
    tools: [
      { icon: '📖', name: 'Read', description: 'Navigate and understand any file' },
      { icon: '✏️', name: 'Write', description: 'Create new files from scratch' },
      { icon: '✂️', name: 'Edit', description: 'Make surgical changes to code' }
    ],
    estimatedTime: '25-30 minutes',
    exercises: 4,
    challenges: 1,
    quiz: true,
    proTip: 'These tools are the foundation of everything else. Master them first!'
  }));

  // Test exercise prompt
  console.log(showExercisePrompt({
    number: '2.3',
    title: 'Create a New File',
    icon: '✏️',
    context: "You've learned to read and search files. Now let's create something from scratch!",
    mission: 'Ask me to create a new utility file with a helpful function.',
    ideas: [
      'A helper function for date formatting',
      'A configuration file for the app',
      'A test file for authentication'
    ],
    example: 'Create a new file utils/helpers.js with a function to format dates',
    estimatedTime: '5 minutes',
    difficulty: 1,
    hints: ['Think about what utilities your app might need', 'Start simple, you can always expand later']
  }));

  // Test exercise celebration
  console.log(showExerciseCelebration('2.3'));

  // Test quiz question
  console.log(showQuizQuestion({
    number: 2,
    total: 5,
    question: 'When should you use Grep instead of Read?',
    options: [
      'When you need to see the whole file',
      'When searching for specific patterns across many files',
      'When you want to edit a file',
      'When you need line numbers'
    ],
    type: 'multiple-choice'
  }));

  // Test challenge banner
  console.log(showChallengeBanner({
    number: '2.1',
    title: 'Bug Hunt',
    scenario: 'The authentication system has a bug. Users can\'t log in.',
    tasks: [
      'Find the bug using Grep and Read',
      'Fix it using Edit',
      'Verify the fix by reading the test file'
    ],
    timeLimit: '10 minutes',
    difficulty: 2,
    successCriteria: [
      'You identified the bug location',
      'You explained what\'s wrong',
      'You fixed the code',
      'Tests would pass (conceptually)'
    ]
  }));
}
