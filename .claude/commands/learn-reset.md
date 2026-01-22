#!/usr/bin/env node
---
description: Reset your learning progress to start fresh
---

// Reset learning progress

const fs = require('fs');
const path = require('path');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');
const colors = require('../../../learn-claude/.claude/hooks/lib/colors.js');

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
