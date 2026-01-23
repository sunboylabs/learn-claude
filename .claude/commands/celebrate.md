#!/usr/bin/env node
---
description: Show your learning achievements with epic celebration art!
---

// Celebrate your learning journey with ASCII art, achievements, and motivation!

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
const artGenerator = require(path.join(libDir, 'art-generator.js'));
const quotesLibrary = require(path.join(libDir, 'quotes-library.js'));
const colors = require(path.join(libDir, 'colors.js'));

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

// Module metadata
const MODULES = [
  { id: 1, name: 'First Steps', duration: '15 min' },
  { id: 2, name: 'File Operations', duration: '25 min' },
  { id: 3, name: 'Terminal & Git', duration: '25 min' },
  { id: 4, name: 'Advanced Tools', duration: '30 min' },
  { id: '5a', name: 'Skill Creation', duration: '35 min' },
  { id: '5b', name: 'Slash Commands', duration: '20 min' },
  { id: '5c', name: 'Hooks Mastery', duration: '40 min' },
  { id: 6, name: 'Web Integration', duration: '35 min' },
  { id: '7a', name: 'Pull Requests & CI/CD', duration: '40 min' },
  { id: '7b', name: 'MCP Hands-On', duration: '45 min' },
  { id: 8, name: 'Advanced Git', duration: '30 min' },
  { id: 9, name: 'Context Management', duration: '35 min' },
  { id: 10, name: 'Power User Mastery', duration: '50 min' }
];

function main() {
  // Check if progress file exists
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log(colors.bold('\n🚀 Welcome to Claude Code Learning!\n'));
    console.log('You haven\'t started your learning journey yet!');
    console.log('\nRun ' + colors.cyan('/learn') + ' to begin your path to Claude Code mastery.\n');
    process.exit(0);
  }

  try {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    displayCelebration(progress);
  } catch (error) {
    console.error('Error reading progress file:', error.message);
    process.exit(1);
  }
}

function displayCelebration(progress) {
  const completed = progress.completedModules.length;
  const totalExercises = progress.exercisesCompleted.length;
  const startDate = new Date(progress.startedAt);
  const daysSinceStart = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  console.log('\n' + colors.bold(colors.magenta('╔════════════════════════════════════════════════════════════╗')));
  console.log(colors.magenta('║') + colors.bold('  🎓 Your Claude Code Mastery Journey  ') + colors.magenta('║'));
  console.log(colors.magenta('╚════════════════════════════════════════════════════════════╝\n'));

  // Progress bar
  const progressPercent = Math.round((completed / 13) * 100);
  const barLength = 40;
  const filledBars = Math.round((progressPercent / 100) * barLength);
  const emptyBars = barLength - filledBars;
  const bar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);

  console.log('Progress: [' + colors.green(bar) + '] ' + colors.bold(progressPercent + '%'));
  console.log('Modules: ' + colors.cyan(completed + '/13') + ' completed\n');

  // Key stats
  console.log(colors.bold('📊 Your Stats:\n'));
  console.log('  ⏱️  Time Invested: ' + estimateHours(completed) + ' hours');
  console.log('  📝 Exercises: ' + colors.cyan(totalExercises) + ' completed');
  console.log('  💬 Prompts: ' + colors.cyan(progress.totalPrompts || 0) + ' sent');
  console.log('  📅 Days: ' + colors.cyan(daysSinceStart) + ' since start');
  if (progress.language) {
    console.log('  💻 Language: ' + colors.cyan(progress.language.toUpperCase()));
  }
  console.log();

  // Achievements
  if (progress.achievements && progress.achievements.length > 0) {
    console.log(colors.bold('🏆 Achievements Unlocked:\n'));
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
        console.log('  ' + details.icon + '  ' + colors.yellow(details.name));
      }
    });
    console.log();
  }

  // Module status
  console.log(colors.bold('📚 Module Status:\n'));
  MODULES.forEach(module => {
    const isCompleted = progress.completedModules.includes(module.id);
    const isCurrent = progress.currentModule === module.id;

    if (isCompleted) {
      console.log('  ' + colors.green('✅') + '  Module ' + module.id + ': ' + colors.green(module.name));
    } else if (isCurrent) {
      console.log('  ' + colors.cyan('🔄') + '  Module ' + module.id + ': ' + colors.cyan(module.name) + ' (in progress)');
    } else {
      console.log('  ' + colors.gray('⭕') + '  Module ' + module.id + ': ' + colors.gray(module.name));
    }
  });
  console.log();

  // Motivation message
  const motivation = getMotivationMessage(progressPercent);
  console.log(colors.bold('✨ ' + motivation + '\n'));

  // Next steps
  if (completed === 13) {
    console.log(colors.bold(colors.green('🎉 CONGRATULATIONS! 🎉\n')));
    console.log('You\'ve completed the full Claude Code learning journey!');
    console.log('\nYou\'re now ready to:');
    console.log('  • Build custom skills and hooks');
    console.log('  • Create advanced workflows');
    console.log('  • Integrate external tools with MCP');
    console.log('  • Optimize your Claude Code usage\n');
    console.log('Run ' + colors.cyan('/modules') + ' to review any module or start building your own!\n');
  } else {
    console.log('Next steps:');
    console.log('  • Continue learning: ' + colors.cyan('/learn'));
    console.log('  • Jump to a module: ' + colors.cyan('/modules'));
    console.log('  • Get a practice exercise: ' + colors.cyan('/practice\n'));
  }

  // Inspirational quote
  const quote = quotesLibrary.getMotivationalQuote();
  console.log(colors.italic(colors.gray(quote + '\n')));
}

function estimateHours(modulesCompleted) {
  // Rough estimate: 15 min per module on average
  return (modulesCompleted * 15 / 60).toFixed(1);
}

function getMotivationMessage(percent) {
  if (percent === 100) return 'You\'ve mastered Claude Code! 🚀';
  if (percent >= 75) return 'Almost there! You\'re becoming a power user! 💪';
  if (percent >= 50) return 'Excellent progress! Keep up the momentum! 🔥';
  if (percent >= 25) return 'You\'re on your way! Great work so far! 👏';
  return 'Great start! You\'re building a solid foundation! 🌱';
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { displayCelebration };
