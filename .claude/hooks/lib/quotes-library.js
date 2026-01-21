#!/usr/bin/env node

/**
 * Pop-Culture Quotes & Encouragement Library
 * For gamifying the Claude Code learning experience
 */

const quotes = {
  // Module 1: First Steps
  module1: [
    "The journey of a thousand commands begins with a single Read. - Ancient CLI Wisdom",
    "Do. Or do not. There is no try... actually scratch that, try lots! - Yoda (debugging edition)",
    "With great /commands comes great responsibility. - Uncle Ben's terminal",
    "I'm going to make him an offer he can't refuse... to learn Claude Code. - The Codefather",
    "May the source be with you. - Obi-Wan Kenobi"
  ],

  // Module 2: File Operations
  module2: [
    "I see files. Walking around like regular documents. They don't know they're about to be edited. - The Sixth Syntax",
    "You can't handle the truth! ...But you can handle these files now. - A Few Good Commands",
    "I'll be back... to read this file again. - The Terminator",
    "To grep, or not to grep: that is no longer the question. You grep! - Hamlet (modern edition)",
    "One does not simply... oh wait, now you can simply read files! - Boromir"
  ],

  // Module 3: Terminal & Git
  module3: [
    "I am inevitable... and so is your git commit history. - Thanos",
    "My precious... git commits! - Gollum (after discovering version control)",
    "This is the way. - The Mandalorian (referring to git best practices)",
    "I volunteer as tribute! ...to always write good commit messages. - Katniss Everdeen",
    "It's dangerous to go alone. Take git! - Old Man, The Legend of Zelda"
  ],

  // Module 4: Advanced Tools
  module4: [
    "With great power comes great parallel execution. - Spider-Man (multitasking edition)",
    "I have a very particular set of skills... and they include TodoWrite! - Taken",
    "Hasta la vista, baby... manual task tracking! - Terminator 2",
    "Keep your friends close, but your sub-agents closer. - The Godfather Part II",
    "Why so serious? Let's use TodoWrite! - The Joker"
  ],

  // Module 5A: Skill Creation
  module5A: [
    "I am Iron Man... who created his own Claude Code skills. - Tony Stark",
    "The skill must flow. - Dune",
    "You're a wizard, Harry! No, you're a skill creator! - Hagrid",
    "With these skills, I am Thor! God of Development! - Thor",
    "I can do this all day... creating skills. - Captain America"
  ],

  // Module 5B: Slash Commands
  module5B: [
    "Execute command /victory! - Star Trek",
    "I am Groot... but my commands are well-documented. - Groot",
    "That's no moon, that's a slash command! - Obi-Wan Kenobi",
    "Roads? Where we're going we don't need roads. We need /commands! - Doc Brown",
    "/help me, Obi-Wan Kenobi. You're my only hope. - Princess Leia"
  ],

  // Module 5C: Hooks Mastery
  module5C: [
    "I'm hooked on a feeling! ...of automated workflows. - Blue Swede/Guardians of the Galaxy",
    "The hooks, they do nothing! ...wait, now they do everything! - Fallout Boy (The Simpsons)",
    "Hook, line, and sinker... your automation is complete! - Fishing proverb",
    "Luke, I am your father... and I installed hooks for you. - Darth Vader",
    "There is no hook. - The Matrix (before you learned about hooks)"
  ],

  // Module 6: Web Integration
  module6: [
    "The web is dark and full of terrors... but WebFetch makes it better! - Game of Thrones",
    "I'll have what she's having... which is complete web integration mastery! - When Harry Met Sally",
    "You're going to need a bigger boat... of bandwidth for all this web scraping! - Jaws",
    "The internet is coming. - Game of Thrones",
    "Show me the data! - Jerry Maguire (hacker edition)"
  ],

  // Module 7A: Pull Requests & CI/CD
  module7A: [
    "I request... elaboration on this pull request. - Data, Star Trek",
    "Continuous Integration? Continuous Improvement! - Tony Stark's motto",
    "Your PR is very impressive. You must be very proud. - Lama Su, Star Wars",
    "The PR will be with you, always. - Obi-Wan Kenobi",
    "There's no place like /deploy production. - The Wizard of Oz"
  ],

  // Module 7B: MCP Hands-On
  module7B: [
    "The power of MCP... in the palm of my hand. - Doctor Octopus",
    "This is your last chance. Red pill: manual tools. Blue pill: MCP servers. - The Matrix",
    "MCP... the final frontier. - Star Trek",
    "One MCP to rule them all! - The Lord of the Rings",
    "With MCP, you have become more machine now than man. - Obi-Wan Kenobi"
  ],

  // Module 8: Advanced Git
  module8: [
    "Some men just want to watch the world merge. - The Dark Knight",
    "I'll git you my pretty, and your little branch too! - Wicked Witch (after resolving conflicts)",
    "Frankly, my dear, I don't give a damn... about merge conflicts anymore! - Gone with the Wind",
    "The name's Branch. Merge Branch. - James Bond",
    "My mama always said life is like a git repository. You never know what you're gonna commit. - Forrest Gump"
  ],

  // Module 9: Context Management
  module9: [
    "I have a very particular set of # annotations. - Taken",
    "Context is all you need. - Attention Is All You Need (paper) + The Beatles",
    "Remember remember, the # annotation. - V for Vendetta",
    "A mind needs books... and # annotations! - Game of Thrones",
    "In the context of eternity, our conscious minds are but a brief flicker... good thing we have # annotations! - Doctor Strange"
  ],

  // Module 10: Power User Mastery
  module10: [
    "With great mastery comes great efficiency. - Uncle Ben",
    "You have become the very thing you swore to destroy... a Claude Code power user! (In a good way!) - Anakin",
    "I am the one who Claude Codes! - Breaking Bad",
    "This is the way... of the power user. - The Mandalorian",
    "You've taken your first step into a larger world. - Obi-Wan Kenobi"
  ],

  // General achievements
  firstCommit: [
    "Your first commit! They grow up so fast. - Every developer ever",
    "It's alive! IT'S ALIVE! Your commit is alive! - Frankenstein",
    "A small step for a developer, a giant leap for your codebase. - Neil Armstrong",
    "Every commit begins with a single character. - Confucius (probably)",
    "Commit first, ask questions later. - Action movie hero"
  ],

  hundredthPrompt: [
    "This is Sparta! ...and this is your 100th prompt! - 300",
    "I've got 99 problems but a prompt ain't one! Well, actually I've got 100 prompts. - Jay-Z",
    "100 prompts and counting! Achievement unlocked! - Every RPG ever",
    "The first hundred prompts are the hardest. - Ancient wisdom",
    "Perfectly balanced, as all things should be. Unlike your 100 prompts to 0 bugs ratio. - Thanos"
  ],

  allModulesComplete: [
    "You did it! You crazy son of a gun, you did it! - Jurassic Park",
    "I am inevitable. And you are complete! - Thanos",
    "Mr. Stark, we did it. We won. - Peter Parker",
    "After all this time? Always. - Severus Snape (about using Claude Code)",
    "There is another... actually no, you've completed everything! - Yoda"
  ],

  // Motivational (random)
  motivational: [
    "You miss 100% of the commits you don't make. - Wayne Gretzky",
    "The code is strong with this one. - Darth Vader",
    "To infinity and beyond! ...in your learning journey. - Buzz Lightyear",
    "Just keep coding, just keep coding. - Dory",
    "Hakuna Matata! It means no bugs for the rest of your days. - The Lion King",
    "Adventure is out there! ...in the next module. - Up",
    "Ohana means family. Family means nobody gets left behind in their learning. - Lilo & Stitch",
    "This is where the fun begins! - Anakin Skywalker",
    "I can do this all day. - Captain America",
    "I'm Mary Poppins, y'all! ...and you're practically perfect in every way at Claude Code! - Yondu"
  ]
};

/**
 * Get a random quote for a specific module or achievement
 */
function getQuote(category) {
  const quoteList = quotes[category] || quotes.motivational;
  return quoteList[Math.floor(Math.random() * quoteList.length)];
}

/**
 * Get a quote for module completion
 */
function getModuleQuote(moduleNumber) {
  const key = `module${moduleNumber}`;
  return getQuote(key);
}

/**
 * Get a special quote for major milestones
 */
function getMilestoneQuote(milestone) {
  const milestones = {
    'first-commit': 'firstCommit',
    '100-prompts': 'hundredthPrompt',
    'all-complete': 'allModulesComplete'
  };

  return getQuote(milestones[milestone] || 'motivational');
}

/**
 * Get a random motivational quote
 */
function getMotivationalQuote() {
  return getQuote('motivational');
}

/**
 * Get multiple quotes (for variety)
 */
function getQuotes(category, count = 1) {
  const quoteList = quotes[category] || quotes.motivational;
  const shuffled = [...quoteList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get a contextual quote based on achievement type
 */
function getContextualQuote(achievementName, moduleNumber) {
  if (achievementName.toLowerCase().includes('first')) {
    return getModuleQuote(1);
  }
  if (achievementName.toLowerCase().includes('master')) {
    return getModuleQuote(10);
  }
  if (achievementName.toLowerCase().includes('commit')) {
    return getQuote('firstCommit');
  }
  if (moduleNumber) {
    return getModuleQuote(moduleNumber);
  }
  return getMotivationalQuote();
}

// If run directly, show examples
if (require.main === module) {
  console.log('=== Quotes Library Test ===\n');

  console.log('Module 1 Quote:');
  console.log(getModuleQuote(1));
  console.log();

  console.log('Module 5A Quote:');
  console.log(getModuleQuote('5A'));
  console.log();

  console.log('First Commit Quote:');
  console.log(getMilestoneQuote('first-commit'));
  console.log();

  console.log('Random Motivational:');
  console.log(getMotivationalQuote());
  console.log();

  console.log('Three Module 2 Quotes:');
  getQuotes('module2', 3).forEach(q => console.log('  -', q));
}

module.exports = {
  getQuote,
  getModuleQuote,
  getMilestoneQuote,
  getMotivationalQuote,
  getQuotes,
  getContextualQuote,
  quotes
};
