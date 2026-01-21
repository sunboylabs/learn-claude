#!/usr/bin/env node

/**
 * Algorithmic Art Generator for Claude Code Learning System
 * Generates personalized ASCII art banners, badges, and celebrations
 */

const crypto = require('crypto');

/**
 * Generate a unique color pattern based on name (for terminal colors)
 */
function getColorForName(name) {
  const hash = crypto.createHash('md5').update(name).digest('hex');
  const colorCode = parseInt(hash.substring(0, 2), 16) % 6 + 31; // 31-36 terminal colors
  return colorCode;
}

/**
 * Generate a simple ASCII art banner
 */
function generateBanner(text, style = 'double') {
  const width = Math.max(text.length + 4, 40);

  const styles = {
    simple: { top: '=', side: '|', corner: '+' },
    double: { top: '═', side: '║', corner: '╔╗╚╝' },
    stars: { top: '*', side: '*', corner: '*' },
    bold: { top: '█', side: '█', corner: '█' }
  };

  const s = styles[style] || styles.double;
  const topCorner = s.corner[0] || s.corner;
  const topCornerRight = s.corner[1] || s.corner;
  const bottomCorner = s.corner[2] || s.corner;
  const bottomCornerRight = s.corner[3] || s.corner;

  const topLine = topCorner + s.top.repeat(width - 2) + topCornerRight;
  const bottomLine = bottomCorner + s.top.repeat(width - 2) + bottomCornerRight;
  const padding = ' '.repeat(Math.floor((width - 2 - text.length) / 2));
  const textLine = s.side + padding + text + padding + ' '.repeat((width - 2 - text.length) % 2) + s.side;

  return `\n${topLine}\n${textLine}\n${bottomLine}\n`;
}

/**
 * Generate personalized celebration art
 */
function generateCelebration(name, achievement, level) {
  const art = [];

  // Header
  art.push('');
  art.push('🎉 '.repeat(20));
  art.push('');

  // Personalized message
  art.push(generateBanner(`${name.toUpperCase()}'S ACHIEVEMENT!`, 'double'));

  // Achievement art based on level
  const levelArt = getLevelArt(level);
  art.push(levelArt);

  // Achievement details
  art.push('');
  art.push(`   🏆 ${achievement}`);
  art.push('');

  // Progress bar
  const totalLevels = 13; // Total modules
  const progressPercent = Math.round((level / totalLevels) * 100);
  const filledBlocks = Math.round((level / totalLevels) * 30);
  const emptyBlocks = 30 - filledBlocks;
  art.push(`   Progress: [${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}] ${progressPercent}%`);
  art.push('');

  // Footer
  art.push('🎉 '.repeat(20));
  art.push('');

  return art.join('\n');
}

/**
 * Get ASCII art for different achievement levels
 */
function getLevelArt(level) {
  const arts = {
    1: `
    ⭐
   /|\\
  / | \\
    |
   / \\
  `,
    2: `
    ⭐⭐
   /|  |\\
  / |  | \\
    |  |
   / \\ / \\
  `,
    3: `
    ⭐⭐⭐
   /|  |  |\\
  / |  |  | \\
    |  |  |
   / \\ | / \\
  `,
    4: `
      🔥
    🔥🔥🔥
   🔥🔥🔥🔥🔥
  🔥🔥🔥🔥🔥🔥🔥
  `,
    5: `
      👑
     ╱ ╲
    ╱   ╲
   ╱ ⭐ ╲
  ╱       ╲
  `,
    6: `
   ╔══════╗
   ║ ⚡⚡ ║
   ║ POWER ║
   ║  USER ║
   ╚══════╝
  `,
    7: `
       🌟
      ╱╲╱╲
     ╱  ✨  ╲
    ╱   ╱╲   ╲
   ╱   ╱  ╲   ╲
  `,
    8: `
    ╔═══╗ ╔═══╗
    ║ 🏆 ║ ║ 🏆 ║
    ╚═══╝ ╚═══╝
       MASTER
  `
  };

  // Default to highest art for levels beyond 8
  return arts[Math.min(level, 8)] || arts[8];
}

/**
 * Generate a badge with user's name
 */
function generateBadge(badgeName, userName, icon = '🏅') {
  const badge = [];

  badge.push('');
  badge.push('   ┌─────────────────────────────┐');
  badge.push(`   │     ${icon} BADGE UNLOCKED ${icon}    │`);
  badge.push('   ├─────────────────────────────┤');
  badge.push(`   │                             │`);
  badge.push(`   │   ${centerText(badgeName, 25)}  │`);
  badge.push(`   │                             │`);
  badge.push('   ├─────────────────────────────┤');
  badge.push(`   │   Awarded to:               │`);
  badge.push(`   │   ${centerText(userName, 25)}  │`);
  badge.push('   └─────────────────────────────┘');
  badge.push('');

  return badge.join('\n');
}

/**
 * Center text within a given width
 */
function centerText(text, width) {
  const padding = Math.max(0, width - text.length);
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
}

/**
 * Generate a skill tree visualization
 */
function generateSkillTree(completedModules, totalModules = 13) {
  const tree = [];

  tree.push('');
  tree.push('   YOUR CLAUDE CODE SKILL TREE');
  tree.push('   ═══════════════════════════');
  tree.push('');

  const modules = [
    '1. First Steps',
    '2. File Operations',
    '3. Terminal & Git',
    '4. Advanced Tools',
    '5A. Skill Creation',
    '5B. Slash Commands',
    '5C. Hooks Mastery',
    '6. Web Integration',
    '7A. Pull Requests & CI/CD',
    '7B. MCP Hands-On',
    '8. Advanced Git',
    '9. Context Management',
    '10. Power User Mastery'
  ];

  modules.forEach((module, index) => {
    const completed = completedModules.includes(index + 1) || completedModules.includes(`${index + 1}A`) || completedModules.includes(`${index + 1}B`) || completedModules.includes(`${index + 1}C`);
    const icon = completed ? '✅' : '⭕';
    const connector = index < modules.length - 1 ? '│' : ' ';

    tree.push(`       ${icon} ${module}`);
    if (index < modules.length - 1) {
      tree.push(`       ${connector}`);
    }
  });

  tree.push('');
  tree.push(`   Progress: ${completedModules.length}/${totalModules} modules complete`);
  tree.push('');

  return tree.join('\n');
}

/**
 * Generate a level-up animation (frame-by-frame ASCII art)
 */
function generateLevelUpAnimation(level) {
  const frames = [];

  // Frame 1
  frames.push(`
        ░░░
       ░ ⭐ ░
        ░░░
  `);

  // Frame 2
  frames.push(`
       ░░░░░
      ░ ⭐⭐ ░
       ░░░░░
  `);

  // Frame 3
  frames.push(`
      ░░░░░░░
     ░ ⭐⭐⭐ ░
      ░░░░░░░
    LEVEL ${level}!
  `);

  return frames;
}

/**
 * Generate motivational fireworks
 */
function generateFireworks() {
  const patterns = [
    `
        *  '  .
      .  *  * .  *
    *   *  .  *  .
      .  *  *  .
        .  *  '
    `,
    `
    ✨ ⚡ ✨ ⚡ ✨
      ✨ ⚡ ✨ ⚡
    ⚡ ✨ ⚡ ✨ ⚡
      ⚡ ✨ ⚡ ✨
    ✨ ⚡ ✨ ⚡ ✨
    `,
    `
      🎆 🎇 🎆
    🎇   🎆   🎇
      🎆 🎇 🎆
    `
  ];

  return patterns[Math.floor(Math.random() * patterns.length)];
}

/**
 * Generate whimsical module completion art
 * Inspired by Claude Code's progress verbs (Pondering, Crafting, Scheming, etc.)
 */
function generateModuleCompletion(moduleNum, moduleName, userName, stats) {
  const art = [];

  // Module-specific whimsical art and verbs
  const moduleThemes = {
    1: { verb: 'Pondering', icon: '🤔', art: `
        ╭─────╮
        │ 🤔  │  First steps...
        │  📚 │  Now pondered!
        ╰─────╯
    ` },
    2: { verb: 'Crafting', icon: '🔨', art: `
        ⚒️  ✨
       ╱│╲ ╱│╲
      ⚒️ 📁 📝 ✨
        Files crafted!
    ` },
    3: { verb: 'Committing', icon: '📝', art: `
       ┌─────┐
       │ git │──► ✅
       │ 📝  │  Committed!
       └─────┘
    ` },
    4: { verb: 'Orchestrating', icon: '🎭', art: `
      ╭───────╮
      │ 🎭✨🎯│
      │ 🔄⚡🎪│  Tools
      ╰───────╯  orchestrated!
    ` },
    '5A': { verb: 'Conjuring', icon: '🔮', art: `
        ✨ 🔮 ✨
       ╱  ╱│╲  ╲
      ✨  🪄📜  ✨
       Skills conjured!
    ` },
    '5B': { verb: 'Forging', icon: '⚔️', art: `
      🔥 ⚔️ 🔥
     ╱  ╱│╲  ╲
    ⚒️  ⚡/⚡  ⚒️
     Commands forged!
    ` },
    '5C': { verb: 'Weaving', icon: '🕸️', art: `
      ╭─🕸️─╮
      │ ⚡ │
      ├─🪝─┤  Hooks
      │ ✨ │  woven!
      ╰─🕸️─╯
    ` },
    6: { verb: 'Fetching', icon: '🌐', art: `
      🌐 ━━━► 📡
       ╲      ╱
        ╲ ✨ ╱
         ╲  ╱  Web
          ╲╱  fetched!
    ` },
    '7A': { verb: 'Deploying', icon: '🚀', art: `
         🚀
        ╱│╲
       🔥│🔥
      ═══════
      Deployed!
    ` },
    '7B': { verb: 'Extending', icon: '🔌', art: `
      ╭───╮
      │🔌 │──► ⚡
      │MCP│──► ✨  Extended!
      ╰───╯
    ` },
    8: { verb: 'Branching', icon: '🌳', art: `
         🌳
        ╱│╲
       🌿│🌿
      ╱  │  ╲  Git
     🌱  │  🌱 mastered!
        ╱╲
    ` },
    9: { verb: 'Remembering', icon: '🧠', art: `
      ╭────────╮
      │ # 🧠  │
      │ ✨💭✨│  Context
      ╰────────╯  remembered!
    ` },
    10: { verb: 'Mastering', icon: '👑', art: `
          👑
         ╱│╲
        🏆│🏆
       ╱  │  ╲
      ⭐  │  ⭐  MASTERY
         ╱╲    ACHIEVED!
    ` }
  };

  const theme = moduleThemes[moduleNum] || moduleThemes[1];

  art.push('');
  art.push('═'.repeat(50));
  art.push('');
  art.push(centerText(`✨ ${theme.verb.toUpperCase()}... COMPLETE! ✨`, 50));
  art.push('');
  art.push(theme.art);
  art.push('');
  art.push(centerText(`Module ${moduleNum}: ${moduleName}`, 50));
  art.push(centerText(`Conquered by ${userName}`, 50));
  art.push('');

  // Stats section
  if (stats) {
    art.push('   📊 Module Stats:');
    art.push('   ─────────────────');
    if (stats.timeSpent) {
      const minutes = Math.floor(stats.timeSpent / 60);
      const seconds = stats.timeSpent % 60;
      art.push(`   ⏱️  Time spent: ${minutes}m ${seconds}s`);
    }
    if (stats.exercisesCompleted) {
      art.push(`   ✅ Exercises: ${stats.exercisesCompleted}/${stats.totalExercises}`);
    }
    if (stats.tokensUsed) {
      const tokensFormatted = stats.tokensUsed.toLocaleString();
      art.push(`   🔤 Tokens: ${tokensFormatted}`);
    }
    art.push('');
  }

  // Progress indicator
  art.push(generateFireworks());
  art.push('');
  art.push('═'.repeat(50));
  art.push('');

  return art.join('\n');
}

/**
 * Main export function to generate all types of art
 */
function generate(type, options = {}) {
  switch (type) {
    case 'banner':
      return generateBanner(options.text, options.style);

    case 'celebration':
      return generateCelebration(options.name, options.achievement, options.level);

    case 'badge':
      return generateBadge(options.badgeName, options.userName, options.icon);

    case 'skillTree':
      return generateSkillTree(options.completedModules, options.totalModules);

    case 'levelUp':
      return generateLevelUpAnimation(options.level);

    case 'fireworks':
      return generateFireworks();

    default:
      return generateBanner(options.text || 'ACHIEVEMENT!');
  }
}

// If run directly, provide a test
if (require.main === module) {
  console.log('=== Art Generator Test ===\n');

  console.log(generate('banner', { text: 'MODULE COMPLETE!', style: 'double' }));

  console.log(generate('celebration', {
    name: 'Alex',
    achievement: 'First Steps Master',
    level: 1
  }));

  console.log(generate('badge', {
    badgeName: 'File Operations Pro',
    userName: 'Alex',
    icon: '📁'
  }));

  console.log(generate('skillTree', {
    completedModules: [1, 2, 3]
  }));

  console.log(generate('fireworks'));
}

module.exports = {
  generate,
  generateBanner,
  generateCelebration,
  generateBadge,
  generateSkillTree,
  generateFireworks,
  getLevelArt,
  generateModuleCompletion
};
