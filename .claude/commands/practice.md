#!/usr/bin/env node
---
description: Get a random practice exercise to reinforce your Claude Code skills
---

// Generate level-appropriate practice exercises

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
const colors = require(path.join(libDir, 'colors.js'));

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

const EXERCISES = {
  beginner: [
    {
      title: 'Find all .js files',
      description: 'Use Glob to find all JavaScript files in the src directory and use Read to check the first one.',
      tools: ['Glob', 'Read'],
      level: 'Module 1-2'
    },
    {
      title: 'Search for functions',
      description: 'Use Grep to find all function definitions in your codebase. Count how many you find.',
      tools: ['Grep'],
      level: 'Module 1-2'
    },
    {
      title: 'Create a new file',
      description: 'Use Write to create a new file in your project with a meaningful name and content.',
      tools: ['Write'],
      level: 'Module 2'
    },
    {
      title: 'Edit an existing file',
      description: 'Use Edit to modify a comment or documentation string in one of your files.',
      tools: ['Edit'],
      level: 'Module 2'
    }
  ],
  intermediate: [
    {
      title: 'Git status check',
      description: 'Use Bash to run "git status" and understand what files are staged vs unstaged.',
      tools: ['Bash'],
      level: 'Module 3'
    },
    {
      title: 'Create a todo list',
      description: 'Use TodoWrite to create a structured todo list with at least 3 tasks.',
      tools: ['TodoWrite'],
      level: 'Module 4'
    },
    {
      title: 'Parallel file exploration',
      description: 'Use Read to load 3+ files in parallel in a single message.',
      tools: ['Read'],
      level: 'Module 4'
    },
    {
      title: 'Launch an agent',
      description: 'Use the Task tool to launch an Explore agent to find files matching a pattern.',
      tools: ['Task'],
      level: 'Module 4'
    }
  ],
  advanced: [
    {
      title: 'Build a custom skill',
      description: 'Create a new skill file with proper frontmatter and test it with a real command.',
      tools: ['Custom skill'],
      level: 'Module 5A'
    },
    {
      title: 'Create a slash command',
      description: 'Build a new slash command that automates a common task in your workflow.',
      tools: ['Slash command'],
      level: 'Module 5B'
    },
    {
      title: 'Fetch documentation',
      description: 'Use WebFetch to retrieve documentation and analyze its content.',
      tools: ['WebFetch'],
      level: 'Module 6'
    },
    {
      title: 'Complex git workflow',
      description: 'Create a branch, make changes, commit, and prepare a PR workflow.',
      tools: ['Bash', 'Git'],
      level: 'Module 7A'
    }
  ]
};

function main() {
  let level = 'beginner';

  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
      const currentModule = progress.currentModule;

      if (currentModule >= 7) {
        level = 'advanced';
      } else if (currentModule >= 5) {
        level = 'advanced';
      } else if (currentModule >= 3) {
        level = 'intermediate';
      }
    } catch (error) {
      console.error('Error reading progress:', error.message);
    }
  }

  displayExercise(level);
}

function displayExercise(level) {
  const exercises = EXERCISES[level];
  const exercise = exercises[Math.floor(Math.random() * exercises.length)];

  console.log('\n' + colors.bold(colors.cyan('╔════════════════════════════════════════════════════════╗')));
  console.log(colors.cyan('║') + colors.bold('  Practice Exercise - ' + level.toUpperCase() + '  ') + colors.cyan('║'));
  console.log(colors.cyan('╚════════════════════════════════════════════════════════╝\n'));

  console.log(colors.bold('📝 ' + exercise.title + '\n'));
  console.log('Level: ' + colors.yellow(exercise.level));
  console.log('Tools: ' + colors.cyan(exercise.tools.join(', ')) + '\n');

  console.log('Challenge:\n' + exercise.description + '\n');

  console.log(colors.bold('💡 Tips:\n'));
  if (exercise.tools.includes('Glob')) {
    console.log('• Use patterns like **/*.js to find files recursively');
  }
  if (exercise.tools.includes('Grep')) {
    console.log('• Use regex patterns to search code effectively');
  }
  if (exercise.tools.includes('Read')) {
    console.log('• You can read multiple files in one message');
  }
  if (exercise.tools.includes('Bash')) {
    console.log('• Use the Bash tool to run shell commands');
  }
  if (exercise.tools.includes('Edit')) {
    console.log('• Edit requires exact old_string match, with proper indentation');
  }
  if (exercise.tools.includes('TodoWrite')) {
    console.log('• Structure todos with content, status, and activeForm');
  }
  if (exercise.tools.includes('Task')) {
    console.log('• Task with subagent_type=Explore is great for codebase analysis');
  }

  console.log('\nGo ahead and complete this exercise! When done, you can get another with ' + colors.cyan('/practice') + ' again.\n');
}

if (require.main === module) {
  main();
}

module.exports = { displayExercise };
