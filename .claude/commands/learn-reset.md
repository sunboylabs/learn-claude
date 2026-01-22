#!/usr/bin/env node
---
description: Reset your learning progress to start fresh
---

// Reset learning progress

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

function main() {
  // Check if progress file exists
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log('\n' + colors.yellow('⚠️  No learning progress found to reset.\n'));
    console.log('Run ' + colors.cyan('/learn') + ' to start your learning journey!\n');
    process.exit(0);
  }

  // Show confirmation prompt
  console.log('\n' + colors.bold(colors.yellow('⚠️  Reset Learning Progress?\n')));
  console.log('This will:');
  console.log('  • Delete your progress file (.learn-progress.json)');
  console.log('  • Reset all achievements and exercises');
  console.log('  • Start you from Module 1 again\n');
  console.log('This action cannot be undone!\n');

  // Ask for confirmation - user should respond in Claude conversation
  console.log(colors.bold('To confirm reset, type: "yes, reset my progress"'));
  console.log('To cancel, type anything else or just press Enter.\n');
}

if (require.main === module) {
  main();
}

module.exports = {};
