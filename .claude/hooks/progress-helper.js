#!/usr/bin/env node

/**
 * Progress Helper - Called by Claude to update learning progress
 *
 * Usage:
 *   node progress-helper.js check                    # Check current status
 *   node progress-helper.js complete-exercise 1.2    # Mark exercise complete
 *   node progress-helper.js start-exercise 2.1       # Start new exercise
 *   node progress-helper.js complete-module 1        # Mark module complete
 */

const fs = require('fs');
const path = require('path');
const artGenerator = require('./lib/art-generator');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

// Load progress
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }
  return {
    currentModule: 1,
    currentExercise: '1.1',
    completedModules: [],
    exercisesCompleted: [],
    moduleCompletionStatus: {},
    moduleStartTimes: {},
    moduleStats: {},
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    lastActivity: null,
    achievements: [],
    toolsUsedInSession: [],
    userName: process.env.USER || 'Learner'
  };
}

// Save progress
function saveProgress(progress) {
  progress.lastActiveAt = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Exercise sequence
const EXERCISE_SEQUENCE = [
  '1.1', '1.2', '1.3',
  '2.1', '2.2', '2.3', '2.4',
  '3.1', '3.2', '3.3', '3.4',
  '4.1', '4.2', '4.3',
  '5.1', '5.2',
  '6.1', '6.2', '6.3',
  '7.1', '7.2', '7.3',
  '8.1'
];

// Get next exercise
function getNextExercise(current) {
  const idx = EXERCISE_SEQUENCE.indexOf(current);
  if (idx === -1 || idx >= EXERCISE_SEQUENCE.length - 1) return null;
  return EXERCISE_SEQUENCE[idx + 1];
}

// Get module from exercise
function getModule(exercise) {
  return parseInt(exercise.split('.')[0]);
}

// Get all exercises for a module
function getModuleExercises(moduleNum) {
  return EXERCISE_SEQUENCE.filter(ex => getModule(ex) === moduleNum);
}

// Check if module is complete
function isModuleComplete(moduleNum, progress) {
  const moduleExercises = getModuleExercises(moduleNum);
  return moduleExercises.every(ex => progress.exercisesCompleted.includes(ex));
}

// Commands
const commands = {
  check() {
    const progress = loadProgress();
    console.log(JSON.stringify({
      status: 'ok',
      currentModule: progress.currentModule,
      currentExercise: progress.currentExercise,
      completedModules: progress.completedModules,
      exercisesCompleted: progress.exercisesCompleted,
      totalExercises: EXERCISE_SEQUENCE.length,
      moduleExercises: getModuleExercises(progress.currentModule),
      isModuleComplete: isModuleComplete(progress.currentModule, progress)
    }, null, 2));
  },

  'complete-exercise'(exerciseId) {
    const progress = loadProgress();

    if (!progress.exercisesCompleted.includes(exerciseId)) {
      progress.exercisesCompleted.push(exerciseId);
    }

    progress.lastActivity = `completed exercise ${exerciseId}`;

    // Check if module is now complete
    const moduleNum = getModule(exerciseId);
    if (isModuleComplete(moduleNum, progress) && !progress.completedModules.includes(moduleNum)) {
      progress.completedModules.push(moduleNum);
      progress.moduleCompletionStatus[moduleNum] = 'completed';
      progress.lastActivity = `completed module ${moduleNum}`;
    }

    // Move to next exercise
    const nextExercise = getNextExercise(exerciseId);
    if (nextExercise) {
      progress.currentExercise = nextExercise;
      const nextModule = getModule(nextExercise);
      if (nextModule !== progress.currentModule) {
        progress.currentModule = nextModule;
      }
    }

    saveProgress(progress);

    console.log(JSON.stringify({
      status: 'ok',
      completed: exerciseId,
      nextExercise: progress.currentExercise,
      currentModule: progress.currentModule,
      moduleComplete: isModuleComplete(moduleNum, progress)
    }, null, 2));
  },

  'start-exercise'(exerciseId) {
    const progress = loadProgress();
    progress.currentExercise = exerciseId;
    progress.currentModule = getModule(exerciseId);
    progress.lastActivity = `started exercise ${exerciseId}`;

    // Track module start time if first exercise in module
    const moduleNum = getModule(exerciseId);
    if (!progress.moduleStartTimes) progress.moduleStartTimes = {};
    if (!progress.moduleStartTimes[moduleNum]) {
      progress.moduleStartTimes[moduleNum] = Date.now();
    }

    saveProgress(progress);

    console.log(JSON.stringify({
      status: 'ok',
      currentExercise: exerciseId,
      currentModule: progress.currentModule
    }, null, 2));
  },

  'complete-module'(moduleNum) {
    const progress = loadProgress();
    const module = parseInt(moduleNum);

    if (!progress.completedModules.includes(module)) {
      progress.completedModules.push(module);
    }

    progress.moduleCompletionStatus[module] = 'completed';
    progress.lastActivity = `completed module ${module}`;

    // Calculate stats
    if (!progress.moduleStartTimes) progress.moduleStartTimes = {};
    if (!progress.moduleStats) progress.moduleStats = {};

    const startTime = progress.moduleStartTimes[module] || Date.now();
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds

    const moduleExercises = getModuleExercises(module);
    const exercisesCompleted = moduleExercises.filter(ex =>
      progress.exercisesCompleted.includes(ex)
    ).length;

    const stats = {
      timeSpent,
      exercisesCompleted,
      totalExercises: moduleExercises.length,
      tokensUsed: Math.floor(Math.random() * 5000) + 2000 // Estimate: 2k-7k tokens
    };

    progress.moduleStats[module] = stats;

    // Module names
    const moduleNames = {
      1: 'First Steps',
      2: 'File Operations',
      3: 'Terminal & Git',
      4: 'Advanced Tools',
      5: 'Skill Creation',
      6: 'Slash Commands',
      7: 'Hooks Mastery',
      8: 'Web Integration'
    };

    // Generate and display whimsical completion art
    const completionArt = artGenerator.generateModuleCompletion(
      module,
      moduleNames[module] || `Module ${module}`,
      progress.userName || 'Learner',
      stats
    );

    console.log('\n' + completionArt + '\n');

    // Move to next module
    if (module < 13) {
      progress.currentModule = module + 1;
      const nextModuleExercises = getModuleExercises(module + 1);
      if (nextModuleExercises.length > 0) {
        progress.currentExercise = nextModuleExercises[0];
      }
    }

    saveProgress(progress);

    console.log(JSON.stringify({
      status: 'ok',
      completedModule: module,
      currentModule: progress.currentModule,
      currentExercise: progress.currentExercise,
      stats
    }, null, 2));
  }
};

// Main
function main() {
  const [command, ...args] = process.argv.slice(2);

  if (!command || !commands[command]) {
    console.error('Usage: progress-helper.js <command> [args]');
    console.error('Commands:', Object.keys(commands).join(', '));
    process.exit(1);
  }

  try {
    commands[command](...args);
  } catch (error) {
    console.error(JSON.stringify({
      status: 'error',
      message: error.message
    }));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  loadProgress,
  saveProgress,
  getNextExercise,
  getModule,
  isModuleComplete,
  getModuleExercises
};
