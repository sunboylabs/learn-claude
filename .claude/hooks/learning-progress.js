#!/usr/bin/env node

/**
 * Learning Progress Hook - GAMIFIED EDITION!
 *
 * Tracks user progress through the Claude Code learning modules.
 * Creates a .learn-progress.json file to remember where the user is.
 * Provides encouraging messages and celebrates milestones.
 * NOW WITH: Algorithmic art, pop-culture quotes, and epic celebrations!
 */

const fs = require('fs');
const path = require('path');
const artGenerator = require('./lib/art-generator');
const quotesLibrary = require('./lib/quotes-library');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

// Initialize or load progress
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
  }

  // Get user's name from environment or use default
  const userName = process.env.USER || process.env.USERNAME || 'Developer';

  return {
    currentModule: 1,
    currentExercise: null,
    completedModules: [],
    exercisesCompleted: [],
    moduleCompletionStatus: {},
    startedAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    lastActivity: null,
    achievements: [],
    toolsUsedInSession: [],
    userName: userName,
    totalPrompts: 0,
    celebrationsSeen: []
  };
}

// Save progress
function saveProgress(progress) {
  progress.lastActiveAt = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Detect learning-related commands
function detectLearningActivity(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Check for module completion indicators
  const moduleCompletionPatterns = [
    /continue/i,
    /next module/i,
    /ready/i,
    /let's go/i,
    /completed.*exercise/i,
    /done/i,
    /finished/i
  ];

  const isProgressing = moduleCompletionPatterns.some(pattern =>
    pattern.test(userMessage)
  );

  // Check for skill invocation
  const isStarting = /learn.*claude|teach.*me|tutorial|i want to learn/i.test(lowerMessage);

  // Check if user is doing an exercise (contains action verbs + file references)
  const isDoingExercise = (
    (/read|find|show|search|create|edit|change|update|explain/i.test(lowerMessage)) &&
    (/file|\.js|\.py|\.ts|\.json|function|code/i.test(lowerMessage))
  );

  return { isProgressing, isStarting, isDoingExercise };
}

// Detect exercise completion based on tool usage
function detectExerciseCompletion(toolName, progress) {
  if (!progress.currentExercise) return null;

  const exerciseMap = {
    // Module 1
    '1.1': ['Read'],
    '1.2': ['Glob'],
    '1.3': ['Read', 'Grep', 'Glob'],
    // Module 2
    '2.1': ['Read'],
    '2.2': ['Grep'],
    '2.3': ['Write'],
    '2.4': ['Edit'],
    // Module 3
    '3.1': ['Bash'],
    '3.2': ['Bash'],
    '3.3': ['Bash'],
    '3.4': ['Bash'],
    // Module 4
    '4.1': ['TodoWrite'],
    '4.2': ['Task'],
    '4.3': ['Read', 'Glob', 'Grep'],
    // Module 5-8 are more open-ended
  };

  const requiredTools = exerciseMap[progress.currentExercise];
  if (!requiredTools) return null;

  // Check if the tool used matches what's expected for this exercise
  if (requiredTools.includes(toolName)) {
    return progress.currentExercise;
  }

  return null;
}

// Get next exercise in sequence
function getNextExercise(currentExercise) {
  const exerciseSequence = [
    '1.1', '1.2', '1.3',
    '2.1', '2.2', '2.3', '2.4',
    '3.1', '3.2', '3.3', '3.4',
    '4.1', '4.2', '4.3',
    '5.1', '5.2',
    '6.1', '6.2', '6.3',
    '7.1', '7.2', '7.3',
    '8.1'
  ];

  const currentIndex = exerciseSequence.indexOf(currentExercise);
  if (currentIndex === -1 || currentIndex === exerciseSequence.length - 1) {
    return null;
  }

  return exerciseSequence[currentIndex + 1];
}

// Get module from exercise number
function getModuleFromExercise(exercise) {
  if (!exercise) return null;
  return parseInt(exercise.split('.')[0]);
}

// Generate encouraging messages (keeping for backward compatibility)
function getEncouragementMessage(progress) {
  return quotesLibrary.getMotivationalQuote();
}

// Generate epic celebration with art and quotes
function generateCelebration(progress, achievementType, achievementName) {
  const userName = progress.userName || 'Developer';
  const completedCount = progress.completedModules.length;

  // Generate celebration art
  const celebration = artGenerator.generate('celebration', {
    name: userName,
    achievement: achievementName,
    level: completedCount
  });

  // Get contextual quote
  const quote = quotesLibrary.getContextualQuote(achievementName, completedCount);

  // Get fireworks for major milestones
  let fireworks = '';
  if (completedCount === 1 || completedCount === 4 || completedCount === 8 || completedCount >= 13) {
    fireworks = artGenerator.generate('fireworks');
  }

  return `${celebration}\n   ${quote}\n${fireworks}`;
}

// Generate badge for specific achievement
function generateAchievementBadge(achievementName, userName, icon) {
  return artGenerator.generate('badge', {
    badgeName: achievementName,
    userName: userName,
    icon: icon
  });
}

// Award achievements
function checkAchievements(progress) {
  const newAchievements = [];

  // Module-based achievements
  if (progress.completedModules.length >= 1 && !progress.achievements.includes('first-module')) {
    newAchievements.push({ id: 'first-module', name: 'First Steps Complete', icon: '👣', type: 'module' });
  }

  if (progress.completedModules.length >= 3 && !progress.achievements.includes('getting-started')) {
    newAchievements.push({ id: 'getting-started', name: 'Basics Master', icon: '📚', type: 'module' });
  }

  if (progress.completedModules.length >= 5 && !progress.achievements.includes('halfway')) {
    newAchievements.push({ id: 'halfway', name: 'Halfway Hero', icon: '⭐', type: 'milestone' });
  }

  if (progress.completedModules.length >= 8 && !progress.achievements.includes('advanced-user')) {
    newAchievements.push({ id: 'advanced-user', name: 'Advanced Practitioner', icon: '🚀', type: 'module' });
  }

  if (progress.completedModules.length >= 13 && !progress.achievements.includes('master')) {
    newAchievements.push({ id: 'master', name: 'Claude Code Master', icon: '🏆', type: 'milestone' });
  }

  // Exercise-based achievements
  if (progress.exercisesCompleted.length >= 5 && !progress.achievements.includes('hands-on-learner')) {
    newAchievements.push({ id: 'hands-on-learner', name: 'Hands-On Learner', icon: '✋', type: 'exercise' });
  }

  if (progress.exercisesCompleted.length >= 10 && !progress.achievements.includes('practice-makes-perfect')) {
    newAchievements.push({ id: 'practice-makes-perfect', name: 'Practice Makes Perfect', icon: '💪', type: 'exercise' });
  }

  if (progress.exercisesCompleted.length >= 20 && !progress.achievements.includes('exercise-champion')) {
    newAchievements.push({ id: 'exercise-champion', name: 'Exercise Champion', icon: '🥇', type: 'exercise' });
  }

  // Prompt-based achievements
  if (progress.totalPrompts >= 10 && !progress.achievements.includes('conversationalist')) {
    newAchievements.push({ id: 'conversationalist', name: 'Getting Chatty', icon: '💬', type: 'usage' });
  }

  if (progress.totalPrompts >= 50 && !progress.achievements.includes('frequent-flyer')) {
    newAchievements.push({ id: 'frequent-flyer', name: 'Frequent Flyer', icon: '✈️', type: 'usage' });
  }

  if (progress.totalPrompts >= 100 && !progress.achievements.includes('century')) {
    newAchievements.push({ id: 'century', name: 'Century Club', icon: '💯', type: 'milestone' });
  }

  return newAchievements;
}

// Main hook execution
function main() {
  const args = process.argv.slice(2);
  const hookType = process.env.CLAUDE_HOOK_TYPE;

  // This hook runs on user-prompt-submit
  if (hookType !== 'user-prompt-submit') {
    process.exit(0);
  }

  // Get user message from stdin
  let userMessage = '';
  if (process.stdin.isTTY) {
    userMessage = args.join(' ');
  }

  const progress = loadProgress();

  // Increment prompt count
  progress.totalPrompts = (progress.totalPrompts || 0) + 1;

  const activity = detectLearningActivity(userMessage);

  if (activity.isStarting) {
    // User is starting/resuming the tutorial
    console.log('\n' + getEncouragementMessage(progress));

    if (progress.currentModule > 0 && progress.completedModules.length > 0) {
      console.log(`📍 Resuming from Module ${progress.currentModule}`);
      console.log(`✅ Completed: ${progress.completedModules.length}/13 modules`);

      // Show skill tree periodically
      if (progress.completedModules.length >= 3) {
        console.log(artGenerator.generate('skillTree', {
          completedModules: progress.completedModules,
          totalModules: 13
        }));
      }
    }
  }

  if (activity.isProgressing) {
    // User is making progress - check for achievements
    const newAchievements = checkAchievements(progress);

    if (newAchievements.length > 0) {
      newAchievements.forEach(ach => {
        // Generate epic celebration for this achievement
        if (ach.type === 'milestone') {
          // Major milestones get full celebration art
          console.log(generateCelebration(progress, ach.type, ach.name));
        } else {
          // Regular achievements get badge
          console.log(generateAchievementBadge(ach.name, progress.userName, ach.icon));
          console.log(`\n   ${quotesLibrary.getMotivationalQuote()}\n`);
        }

        progress.achievements.push(ach.id);
      });
    }

    saveProgress(progress);
  }

  // Save progress after every interaction
  saveProgress(progress);

  process.exit(0);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { loadProgress, saveProgress, detectLearningActivity };
