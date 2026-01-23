#!/usr/bin/env node
/*
---
description: Get progressive hints when stuck on an exercise
---
*/

// Get progressive hints when stuck on an exercise

const fs = require('fs');
const path = require('path');
const os = require('os');

// Find the skill library directory
function findSkillLibs() {
  const possiblePaths = [
    path.join(os.homedir(), '.claude', 'skills', 'learn-claude', '.claude', 'hooks', 'lib'),
    path.join(__dirname, '..', '..', '..', 'skills', 'learn-claude', '.claude', 'hooks', 'lib'),
    path.join(process.cwd(), '.claude', 'hooks', 'lib')
  ];

  for (const dir of possiblePaths) {
    if (fs.existsSync(dir)) return dir;
  }

  throw new Error('Could not find skill libraries. Ensure learn-claude is installed in ~/.claude/skills/');
}

const libDir = findSkillLibs();
const { colorize, stylize, ICONS } = require(path.join(libDir, 'colors.js'));

// Convenience wrappers using colorize and stylize
const cyan = (text) => colorize(text, 'primary');
const yellow = (text) => colorize(text, 'warning');
const green = (text) => colorize(text, 'success');
const gray = (text) => colorize(text, 'border');
const bold = (text) => stylize(text, 'bold');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

// Exercise hints database
const EXERCISE_HINTS = {
  '1.1': {
    description: 'Reading a file',
    hints: [
      'You need to use the Read tool to read a file. Check what files are available in the practice project.',
      'The Read tool requires an absolute file path. Use the path provided in the exercise.',
      'Example: Read the file at /path/to/file.js to see its contents.'
    ],
    solution: 'Use the Read tool with the file path from your practice project. Claude will read the file and show you its contents.'
  },
  '1.2': {
    description: 'Finding files with Glob',
    hints: [
      'The Glob tool helps you search for files using patterns like **/*.js',
      'Try a pattern that matches all JavaScript files: **/*.js',
      'You can also search for specific file names or use wildcards like *.json'
    ],
    solution: 'Use Glob with pattern="**/*.js" to find all JavaScript files in your practice project.'
  },
  '1.3': {
    description: 'Understanding code',
    hints: [
      'Read the file first, then analyze what the code does.',
      'Look for function names, parameters, and what they return.',
      'Explain the code in simple terms - what is its purpose?'
    ],
    solution: 'Read the file with the Read tool, then explain what each function does and how they work together.'
  },
  '2.1': {
    description: 'Reading multiple files in parallel',
    hints: [
      'You can call the Read tool multiple times in a single message.',
      'Use multiple Read calls with different file paths in one response.',
      'This is more efficient than reading files one at a time.'
    ],
    solution: 'Make 2 or more Read tool calls in the same message, each with a different file path.'
  },
  '2.2': {
    description: 'Searching with Grep',
    hints: [
      'Grep searches for patterns in file contents using regex.',
      'Try searching for a specific function name or keyword.',
      'Use output_mode="content" to see the matching lines.'
    ],
    solution: 'Use Grep with pattern="function" and output_mode="content" to find all function declarations.'
  },
  '2.3': {
    description: 'Writing a new file',
    hints: [
      'The Write tool creates a new file with the content you specify.',
      'You need to provide both file_path and content parameters.',
      'Choose a meaningful name for your new file.'
    ],
    solution: 'Use Write with file_path="/path/to/newfile.js" and content="your code here" to create a new file.'
  },
  '2.4': {
    description: 'Editing an existing file',
    hints: [
      'Edit requires the exact old_string to replace and the new_string.',
      'Read the file first to see what you want to change.',
      'Make sure old_string matches exactly, including indentation.'
    ],
    solution: 'Use Read to see the file, then Edit with old_string matching the exact text you want to change and new_string with the replacement.'
  },
  '3.1': {
    description: 'Running git status',
    hints: [
      'Use the Bash tool to run shell commands.',
      'The command is simply: git status',
      'This shows you what files are modified, staged, or untracked.'
    ],
    solution: 'Use Bash with command="git status" to see the current state of your git repository.'
  },
  '3.2': {
    description: 'Running git diff',
    hints: [
      'git diff shows you what changed in your files.',
      'Use the Bash tool with the git diff command.',
      'You can see both staged and unstaged changes.'
    ],
    solution: 'Use Bash with command="git diff" to see unstaged changes, or "git diff --staged" for staged changes.'
  },
  '3.3': {
    description: 'Creating a git commit',
    hints: [
      'First stage your changes with git add.',
      'Then create a commit with git commit -m "message".',
      'Use a descriptive commit message.'
    ],
    solution: 'Use Bash: git add <file> && git commit -m "Your descriptive message here"'
  },
  '3.4': {
    description: 'Viewing git log',
    hints: [
      'git log shows the commit history.',
      'Use Bash tool to run the command.',
      'You can use flags like --oneline for a compact view.'
    ],
    solution: 'Use Bash with command="git log --oneline" to see a compact history of commits.'
  },
  '4.1': {
    description: 'Creating a todo list',
    hints: [
      'TodoWrite helps you track multiple tasks.',
      'Each todo needs: content, status, and activeForm.',
      'Status can be: pending, in_progress, or completed.'
    ],
    solution: 'Use TodoWrite with an array of todos, each having content (imperative), status, and activeForm (present continuous).'
  },
  '4.2': {
    description: 'Launching an Explore agent',
    hints: [
      'The Task tool can launch sub-agents for complex tasks.',
      'Use subagent_type="Explore" for codebase exploration.',
      'Provide a clear goal for what you want to explore.'
    ],
    solution: 'Use Task with subagent_type="Explore" and a goal like "find all API endpoints in the codebase".'
  },
  '4.3': {
    description: 'Parallel tool execution',
    hints: [
      'You can call multiple tools in one message for better performance.',
      'Use multiple tool calls when the operations are independent.',
      'This works with Read, Grep, Glob, and other tools.'
    ],
    solution: 'Make 3+ independent tool calls (like Read, Grep, Glob) in the same message to execute them in parallel.'
  }
};

function main() {
  // Check if progress file exists
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log(bold('\n💡 Hint System\n'));
    console.log('You haven\'t started your learning journey yet!');
    console.log('\nRun ' + cyan('/learn') + ' to begin, then use ' + cyan('/hint') + ' when you need help.\n');
    process.exit(0);
  }

  try {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    displayHint(progress);
  } catch (error) {
    console.error('Error reading progress file:', error.message);
    process.exit(1);
  }
}

function displayHint(progress) {
  const currentExercise = progress.currentExercise;

  if (!currentExercise) {
    console.log('\n' + bold(yellow('💡 No Active Exercise\n')));
    console.log('You\'re not currently working on an exercise.');
    console.log('\nRun ' + cyan('/learn') + ' to continue your learning journey.\n');
    return;
  }

  const exerciseData = EXERCISE_HINTS[currentExercise];

  if (!exerciseData) {
    console.log('\n' + bold(yellow('💡 Hint Not Available\n')));
    console.log('No hints available for exercise ' + cyan(currentExercise) + '.');
    console.log('\nTry asking Claude directly for help with your current exercise.\n');
    return;
  }

  // Track hint level in progress (if not exists, start at 0)
  const hintLevel = progress.hintLevel || 0;

  console.log('\n' + bold(cyan('╔════════════════════════════════════════════════════════╗')));
  console.log(cyan('║') + bold('  💡 Hint System - Exercise ' + currentExercise + '  ') + cyan('║'));
  console.log(cyan('╚════════════════════════════════════════════════════════╝\n'));

  console.log(bold('Exercise: ') + exerciseData.description + '\n');

  // Display progressive hints
  if (hintLevel === 0) {
    console.log(bold(yellow('💡 Hint 1: ')) + exerciseData.hints[0]);
    console.log('\n' + gray('This is a gentle nudge in the right direction.'));
    console.log(gray('Run /hint again for a more specific hint.\n'));

    // Update hint level
    progress.hintLevel = 1;
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  } else if (hintLevel === 1) {
    console.log(bold(yellow('💡 Hint 2: ')) + exerciseData.hints[1]);
    console.log('\n' + gray('This hint is more specific.'));
    console.log(gray('Run /hint again to see the complete solution.\n'));

    // Update hint level
    progress.hintLevel = 2;
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  } else if (hintLevel === 2) {
    console.log(bold(yellow('💡 Hint 3: ')) + exerciseData.hints[2]);
    console.log('\n' + gray('This is the most detailed hint before showing the solution.'));
    console.log(gray('Run /hint again to see the full solution.\n'));

    // Update hint level
    progress.hintLevel = 3;
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  } else {
    console.log(bold(green('💡 Solution: ')) + exerciseData.solution);
    console.log('\n' + gray('This is the complete solution to the exercise.'));
    console.log(gray('Try it out! When you complete the exercise, hints will reset for the next one.\n'));
  }

  // Tips
  console.log(bold('💭 Remember:\n'));
  console.log('  • Take your time to understand each concept');
  console.log('  • It\'s okay to need hints - that\'s how we learn!');
  console.log('  • Try the solution yourself to build muscle memory');
  console.log('  • Use ' + cyan('/practice') + ' for extra exercises\n');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { displayHint };
