#!/usr/bin/env node

/**
 * Configuration Manager for Learn Claude
 * Handles user preferences and settings
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG_PATH = path.join(__dirname, '../../../.learn-config.json');

// Default configuration
const DEFAULT_CONFIG = {
  version: "1.0.0",
  user: {
    name: "Learner",
    timezone: "America/Los_Angeles",
    learning_pace: "moderate" // slow, moderate, fast
  },
  display: {
    colors: true,
    animations: true,
    emoji: true,
    compact_mode: false,
    theme: "default" // default, minimal, high-contrast
  },
  celebrations: {
    enabled: true,
    style: "full", // full, minimal, none
    sound: false,
    animation_speed: "normal" // slow, normal, fast
  },
  learning: {
    show_hints: true,
    show_examples: true,
    difficulty: "auto", // easy, auto, hard
    skip_assessments: false,
    auto_advance: false
  },
  progress: {
    auto_save: true,
    backup_frequency: "daily", // never, daily, weekly
    sync_remote: false,
    track_analytics: true
  },
  notifications: {
    streak_reminders: true,
    achievement_unlocks: true,
    module_completion: true,
    daily_challenges: false
  }
};

/**
 * Load configuration from file or create default
 */
function loadConfig(configPath = DEFAULT_CONFIG_PATH) {
  try {
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(configData);

      // Merge with defaults to ensure all keys exist
      return mergeDeep(DEFAULT_CONFIG, config);
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
  }

  // Return default if file doesn't exist or error occurred
  return { ...DEFAULT_CONFIG };
}

/**
 * Save configuration to file
 */
function saveConfig(config, configPath = DEFAULT_CONFIG_PATH) {
  try {
    // Ensure directory exists
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config:', error.message);
    return false;
  }
}

/**
 * Get a specific configuration value
 */
function getConfig(key, configPath = DEFAULT_CONFIG_PATH) {
  const config = loadConfig(configPath);
  return getNestedValue(config, key);
}

/**
 * Set a specific configuration value
 */
function setConfig(key, value, configPath = DEFAULT_CONFIG_PATH) {
  const config = loadConfig(configPath);
  setNestedValue(config, key, value);
  return saveConfig(config, configPath);
}

/**
 * Reset configuration to defaults
 */
function resetConfig(configPath = DEFAULT_CONFIG_PATH) {
  return saveConfig({ ...DEFAULT_CONFIG }, configPath);
}

/**
 * Initialize configuration file if it doesn't exist
 */
function initConfig(configPath = DEFAULT_CONFIG_PATH) {
  if (!fs.existsSync(configPath)) {
    return saveConfig({ ...DEFAULT_CONFIG }, configPath);
  }
  return true;
}

/**
 * Validate configuration
 */
function validateConfig(config) {
  const errors = [];

  // Validate learning_pace
  if (config.user && config.user.learning_pace) {
    const validPaces = ['slow', 'moderate', 'fast'];
    if (!validPaces.includes(config.user.learning_pace)) {
      errors.push(`Invalid learning_pace: ${config.user.learning_pace}. Must be one of: ${validPaces.join(', ')}`);
    }
  }

  // Validate celebration style
  if (config.celebrations && config.celebrations.style) {
    const validStyles = ['full', 'minimal', 'none'];
    if (!validStyles.includes(config.celebrations.style)) {
      errors.push(`Invalid celebration style: ${config.celebrations.style}. Must be one of: ${validStyles.join(', ')}`);
    }
  }

  // Validate difficulty
  if (config.learning && config.learning.difficulty) {
    const validDifficulties = ['easy', 'auto', 'hard'];
    if (!validDifficulties.includes(config.learning.difficulty)) {
      errors.push(`Invalid difficulty: ${config.learning.difficulty}. Must be one of: ${validDifficulties.join(', ')}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

/**
 * Deep merge two objects
 */
function mergeDeep(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      result[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

/**
 * Display configuration
 */
function displayConfig(config) {
  const colors = require('./colors');

  console.log('\n' + colors.heading('Current Configuration', 1));

  console.log(colors.colorize('User Settings:', 'subheading'));
  console.log(`  Name: ${config.user.name}`);
  console.log(`  Timezone: ${config.user.timezone}`);
  console.log(`  Learning Pace: ${config.user.learning_pace}`);

  console.log('\n' + colors.colorize('Display Settings:', 'subheading'));
  console.log(`  Colors: ${config.display.colors ? '✓' : '✗'}`);
  console.log(`  Animations: ${config.display.animations ? '✓' : '✗'}`);
  console.log(`  Emoji: ${config.display.emoji ? '✓' : '✗'}`);
  console.log(`  Compact Mode: ${config.display.compact_mode ? '✓' : '✗'}`);
  console.log(`  Theme: ${config.display.theme}`);

  console.log('\n' + colors.colorize('Celebrations:', 'subheading'));
  console.log(`  Enabled: ${config.celebrations.enabled ? '✓' : '✗'}`);
  console.log(`  Style: ${config.celebrations.style}`);
  console.log(`  Sound: ${config.celebrations.sound ? '✓' : '✗'}`);
  console.log(`  Animation Speed: ${config.celebrations.animation_speed}`);

  console.log('\n' + colors.colorize('Learning Preferences:', 'subheading'));
  console.log(`  Show Hints: ${config.learning.show_hints ? '✓' : '✗'}`);
  console.log(`  Show Examples: ${config.learning.show_examples ? '✓' : '✗'}`);
  console.log(`  Difficulty: ${config.learning.difficulty}`);
  console.log(`  Skip Assessments: ${config.learning.skip_assessments ? '✓' : '✗'}`);
  console.log(`  Auto Advance: ${config.learning.auto_advance ? '✓' : '✗'}`);

  console.log('\n' + colors.colorize('Progress & Analytics:', 'subheading'));
  console.log(`  Auto Save: ${config.progress.auto_save ? '✓' : '✗'}`);
  console.log(`  Backup Frequency: ${config.progress.backup_frequency}`);
  console.log(`  Sync Remote: ${config.progress.sync_remote ? '✓' : '✗'}`);
  console.log(`  Track Analytics: ${config.progress.track_analytics ? '✓' : '✗'}`);

  console.log('\n' + colors.colorize('Notifications:', 'subheading'));
  console.log(`  Streak Reminders: ${config.notifications.streak_reminders ? '✓' : '✗'}`);
  console.log(`  Achievement Unlocks: ${config.notifications.achievement_unlocks ? '✓' : '✗'}`);
  console.log(`  Module Completion: ${config.notifications.module_completion ? '✓' : '✗'}`);
  console.log(`  Daily Challenges: ${config.notifications.daily_challenges ? '✓' : '✗'}`);

  console.log('\n');
}

// Export functions
module.exports = {
  loadConfig,
  saveConfig,
  getConfig,
  setConfig,
  resetConfig,
  initConfig,
  validateConfig,
  displayConfig,
  DEFAULT_CONFIG
};

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'show') {
    const config = loadConfig();
    displayConfig(config);
  } else if (command === 'get') {
    const key = args[1];
    if (!key) {
      console.error('Usage: config-manager.js get <key>');
      process.exit(1);
    }
    const value = getConfig(key);
    console.log(JSON.stringify(value, null, 2));
  } else if (command === 'set') {
    const key = args[1];
    const value = args[2];
    if (!key || value === undefined) {
      console.error('Usage: config-manager.js set <key> <value>');
      process.exit(1);
    }

    // Parse value (handle booleans and numbers)
    let parsedValue = value;
    if (value === 'true') parsedValue = true;
    else if (value === 'false') parsedValue = false;
    else if (!isNaN(value)) parsedValue = Number(value);

    if (setConfig(key, parsedValue)) {
      console.log(`✓ Set ${key} = ${parsedValue}`);
    } else {
      console.error(`✗ Failed to set ${key}`);
      process.exit(1);
    }
  } else if (command === 'reset') {
    if (resetConfig()) {
      console.log('✓ Configuration reset to defaults');
    } else {
      console.error('✗ Failed to reset configuration');
      process.exit(1);
    }
  } else if (command === 'init') {
    if (initConfig()) {
      console.log('✓ Configuration initialized');
    } else {
      console.error('✗ Failed to initialize configuration');
      process.exit(1);
    }
  } else {
    console.error(`Unknown command: ${command}`);
    console.error('Available commands: show, get, set, reset, init');
    process.exit(1);
  }
}
