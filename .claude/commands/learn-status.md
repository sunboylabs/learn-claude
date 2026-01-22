#!/usr/bin/env node
---
description: Check your progress in the Claude Code learning tutorial
---

// Display your learning progress dashboard

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

// Import libraries
const colors = require(path.join(libDir, 'colors.js'));

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

const MODULES = [
  { id: 1, name: 'First Steps', category: 'Foundations', duration: 15 },
  { id: 2, name: 'File Operations', category: 'Foundations', duration: 25 },
  { id: 3, name: 'Terminal & Git', category: 'Foundations', duration: 25 },
  { id: 4, name: 'Advanced Tools', category: 'Foundations', duration: 30 },
  { id: '5a', name: 'Skill Creation', category: 'Customization', duration: 35 },
  { id: '5b', name: 'Slash Commands', category: 'Customization', duration: 20 },
  { id: '5c', name: 'Hooks Mastery', category: 'Customization', duration: 40 },
  { id: 6, name: 'Web Integration', category: 'Integration', duration: 35 },
  { id: '7a', name: 'Pull Requests & CI/CD', category: 'Integration', duration: 40 },
  { id: '7b', name: 'MCP Hands-On', category: 'Integration', duration: 45 },
  { id: 8, name: 'Advanced Git', category: 'Integration', duration: 30 },
  { id: 9, name: 'Context Management', category: 'Advanced', duration: 35 },
  { id: 10, name: 'Power User Mastery', category: 'Advanced', duration: 50 }
];

function main() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log('\n' + colors.bold('🚀 Welcome to Claude Code Learning!\n'));
    console.log('You haven\'t started your learning journey yet.\n');
    console.log('Run ' + colors.cyan('/learn') + ' to begin your path to Claude Code mastery.\n');
    console.log('Total time: 6-8 hours | 13 comprehensive modules | Pause/resume anytime\n');
    process.exit(0);
  }

  try {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    displayProgressDashboard(progress);
  } catch (error) {
    console.error('Error reading progress file:', error.message);
    process.exit(1);
  }
}

function displayProgressDashboard(progress) {
  const completed = progress.completedModules.length;
  const progressPercent = Math.round((completed / 13) * 100);
  const totalExercises = progress.exercisesCompleted.length;

  // Header
  console.log('\n' + colors.bold(colors.cyan('╔═══════════════════════════════════════════════════════════╗')));
  console.log(colors.cyan('║') + colors.bold('  Claude Code Mastery - Your Progress  ') + colors.cyan('║'));
  console.log(colors.cyan('╚═══════════════════════════════════════════════════════════╝\n'));

  // Progress bar
  const barLength = 40;
  const filledBars = Math.round((progressPercent / 100) * barLength);
  const emptyBars = barLength - filledBars;
  const bar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);

  console.log('Progress: [' + colors.green(bar) + '] ' + colors.bold(progressPercent + '%'));
  console.log('Modules: ' + colors.cyan(completed + '/13') + ' completed\n');

  // Current module
  console.log(colors.bold('Current Status:\n'));
  console.log('  🎯 Current Module: ' + colors.yellow('Module ' + progress.currentModule));
  console.log('  ✨ Achievements: ' + colors.yellow(progress.achievements?.length || 0) + ' unlocked');
  console.log('  📝 Exercises: ' + colors.yellow(totalExercises) + ' completed\n');

  // Module breakdown by category
  console.log(colors.bold('Module Status:\n'));

  const categories = ['Foundations', 'Customization', 'Integration', 'Advanced'];
  categories.forEach(category => {
    const categoryModules = MODULES.filter(m => m.category === category);
    const categoryCompleted = categoryModules.filter(m => progress.completedModules.includes(m.id)).length;
    const categoryDuration = categoryModules.reduce((sum, m) => sum + m.duration, 0);

    console.log(colors.bold('  ' + category + ' (' + categoryCompleted + '/' + categoryModules.length + '):'));

    categoryModules.forEach(module => {
      const isCompleted = progress.completedModules.includes(module.id);
      const isCurrent = progress.currentModule === module.id;

      let status = '  ⭕ ';
      if (isCompleted) {
        status = '  ' + colors.green('✅') + ' ';
      } else if (isCurrent) {
        status = '  ' + colors.cyan('🔄') + ' ';
      }

      console.log(status + 'Module ' + module.id + ': ' + module.name + ' (' + module.duration + 'min)');
    });
    console.log();
  });

  // Time investment by category
  console.log(colors.bold('Time Invested by Category:\n'));
  categories.forEach(category => {
    const categoryModules = MODULES.filter(m => m.category === category);
    const categoryCompleted = categoryModules.filter(m => progress.completedModules.includes(m.id)).length;
    const categoryDuration = categoryCompleted > 0 ? (categoryModules.slice(0, categoryCompleted).reduce((sum, m) => sum + m.duration, 0) / 60).toFixed(1) : '0.0';

    console.log('  ' + category + ': ' + colors.cyan(categoryDuration + ' hours'));
  });
  console.log();

  // Achievements
  if (progress.achievements && progress.achievements.length > 0) {
    console.log(colors.bold('Achievements Unlocked:\n'));
    const achievementDetails = {
      'first-module': { name: 'First Steps Complete', icon: '👣' },
      'getting-started': { name: 'Basics Master', icon: '📚' },
      'halfway': { name: 'Halfway Hero', icon: '⭐' },
      'advanced-user': { name: 'Advanced Practitioner', icon: '🚀' },
      'master': { name: 'Claude Code Master', icon: '🏆' },
      'hands-on-learner': { name: 'Hands-On Learner', icon: '✋' },
      'practice-makes-perfect': { name: 'Practice Makes Perfect', icon: '💪' },
      'exercise-champion': { name: 'Exercise Champion', icon: '🥇' },
      'conversationalist': { name: 'Getting Chatty', icon: '💬' },
      'frequent-flyer': { name: 'Frequent Flyer', icon: '✈️' },
      'century': { name: 'Century Club', icon: '💯' }
    };

    progress.achievements.forEach(ach => {
      const details = achievementDetails[ach];
      if (details) {
        console.log('  ' + details.icon + ' ' + colors.yellow(details.name));
      }
    });
    console.log();
  }

  // Encouraging message
  console.log(colors.bold('✨ ' + getEncouragementMessage(progressPercent) + '\n'));

  // Next steps
  if (completed === 13) {
    console.log('🎉 You\'ve completed the full journey!');
    console.log('Review modules with ' + colors.cyan('/modules') + ' or start building your own workflows!\n');
  } else {
    console.log('Next steps:');
    console.log('  Continue: ' + colors.cyan('/learn'));
    console.log('  Jump to module: ' + colors.cyan('/modules'));
    console.log('  Random exercise: ' + colors.cyan('/practice\n'));
  }
}

function getEncouragementMessage(percent) {
  if (percent === 100) return 'Congratulations! You\'ve completed the full journey! 🎉';
  if (percent >= 75) return 'Almost there! You\'re nearly a Claude Code master! 💪';
  if (percent >= 50) return 'You\'re becoming a power user! Keep up the excellent work! 🔥';
  if (percent >= 25) return 'Excellent progress! You\'re mastering the core tools! 👏';
  return 'Great start! You\'re building a strong foundation! 🌱';
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { displayProgressDashboard };
