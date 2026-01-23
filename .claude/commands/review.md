#!/usr/bin/env node
/*
---
description: Review previous concepts with spaced repetition quizzes
---
*/

// Review previous concepts with spaced repetition quizzes

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
const { colorize, stylize, divider } = require(path.join(libDir, 'colors.js'));
const quotesLibrary = require(path.join(libDir, 'quotes-library.js'));

// Convenience wrappers using colorize and stylize
const cyan = (text) => colorize(text, 'primary');
const yellow = (text) => colorize(text, 'warning');
const green = (text) => colorize(text, 'success');
const gray = (text) => colorize(text, 'border');
const bold = (text) => stylize(text, 'bold');
const italic = (text) => stylize(text, 'italic');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');

// Quiz questions organized by module
const QUIZ_QUESTIONS = {
  1: {
    name: 'First Steps',
    questions: [
      {
        question: 'Which tool do you use to read a file in Claude Code?',
        options: ['Read', 'Write', 'Open', 'Cat'],
        correct: 0,
        explanation: 'The Read tool is used to read files. It requires an absolute file path.'
      },
      {
        question: 'What pattern would you use with Glob to find all JavaScript files recursively?',
        options: ['*.js', '**/*.js', 'all.js', 'find.js'],
        correct: 1,
        explanation: 'The pattern **/*.js searches recursively for all .js files in all subdirectories.'
      },
      {
        question: 'Can you use Read to view images and PDFs?',
        options: ['Yes', 'No', 'Only images', 'Only PDFs'],
        correct: 0,
        explanation: 'Read is multimodal - it can read text files, images (PNG, JPG), PDFs, and even Jupyter notebooks!'
      }
    ]
  },
  2: {
    name: 'File Operations',
    questions: [
      {
        question: 'What\'s the most efficient way to read multiple files?',
        options: ['Read them one at a time', 'Use multiple Read calls in parallel', 'Use a loop', 'Use cat command'],
        correct: 1,
        explanation: 'Making multiple Read calls in a single message executes them in parallel, which is faster.'
      },
      {
        question: 'What does the Grep tool use for pattern matching?',
        options: ['Wildcards', 'Regex', 'SQL LIKE', 'Fuzzy matching'],
        correct: 1,
        explanation: 'Grep uses regex (regular expressions) for powerful pattern matching in file contents.'
      },
      {
        question: 'Before editing a file with Edit, what should you do?',
        options: ['Nothing', 'Backup the file', 'Read the file first', 'Close the file'],
        correct: 2,
        explanation: 'You must use Read before Edit. The Edit tool requires exact old_string matching including indentation.'
      },
      {
        question: 'What happens if you use Write on an existing file?',
        options: ['It appends to it', 'It throws an error', 'It overwrites it', 'It renames it'],
        correct: 2,
        explanation: 'Write overwrites existing files. For existing files, prefer using Edit instead.'
      }
    ]
  },
  3: {
    name: 'Terminal & Git',
    questions: [
      {
        question: 'Which tool do you use to run shell commands?',
        options: ['Shell', 'Terminal', 'Bash', 'Command'],
        correct: 2,
        explanation: 'The Bash tool executes shell commands. Always use Bash for terminal operations, not file operations.'
      },
      {
        question: 'What does "git status" show you?',
        options: ['Commit history', 'Branch names', 'Staged and unstaged changes', 'Remote repositories'],
        correct: 2,
        explanation: 'git status shows which files are modified, staged for commit, or untracked.'
      },
      {
        question: 'How do you chain multiple dependent commands in Bash?',
        options: ['Use comma', 'Use semicolon', 'Use &&', 'Use ||'],
        correct: 2,
        explanation: 'Use && to chain commands so that the next command only runs if the previous one succeeds.'
      }
    ]
  },
  4: {
    name: 'Advanced Tools',
    questions: [
      {
        question: 'What are the three task states in TodoWrite?',
        options: ['todo, doing, done', 'pending, in_progress, completed', 'start, middle, end', 'new, active, finished'],
        correct: 1,
        explanation: 'TodoWrite uses pending, in_progress, and completed as the three task states.'
      },
      {
        question: 'How many tasks should be "in_progress" at once?',
        options: ['As many as needed', 'Zero', 'Exactly one', 'Two or three'],
        correct: 2,
        explanation: 'Exactly ONE task should be in_progress at any time to maintain clear focus.'
      },
      {
        question: 'What subagent_type do you use for codebase exploration?',
        options: ['Search', 'Explore', 'Analyze', 'Find'],
        correct: 1,
        explanation: 'Use Task with subagent_type="Explore" for deep codebase exploration and analysis.'
      }
    ]
  },
  '5a': {
    name: 'Skill Creation',
    questions: [
      {
        question: 'Where do you put custom skills?',
        options: ['/skills/', '~/.claude/skills/', '~/skills/', '/usr/skills/'],
        correct: 1,
        explanation: 'Custom skills go in ~/.claude/skills/ directory in your home folder.'
      },
      {
        question: 'What model should you use for skill frontmatter for fast responses?',
        options: ['sonnet', 'opus', 'haiku', 'gpt-4'],
        correct: 2,
        explanation: 'Use model: haiku in skill frontmatter for faster, cost-effective responses for most tasks.'
      },
      {
        question: 'Are skills project-specific or global?',
        options: ['Project-specific', 'Global', 'Both', 'Depends on location'],
        correct: 3,
        explanation: 'Skills can be both! Put them in ~/.claude/skills/ (global) or .claude/skills/ (project-specific).'
      }
    ]
  },
  '5b': {
    name: 'Slash Commands',
    questions: [
      {
        question: 'Where do slash commands live?',
        options: ['/.commands/', '~/.claude/commands/', '/.claude/commands/', '/commands/'],
        correct: 2,
        explanation: 'Slash commands are .md files in .claude/commands/ directory.'
      },
      {
        question: 'What language can you use for slash command scripts?',
        options: ['Only Shell', 'Only Node.js', 'Shell, Node.js, Python, or any executable', 'Only Python'],
        correct: 2,
        explanation: 'Slash commands can be shell scripts, Node.js, Python, or any executable with a shebang.'
      },
      {
        question: 'How do you declare commands in skill.md?',
        options: ['In CLAUDE.md', 'In frontmatter commands section', 'In README', 'They auto-discover'],
        correct: 1,
        explanation: 'Declare commands in the skill.md frontmatter under the "commands:" section.'
      }
    ]
  },
  '5c': {
    name: 'Hooks Mastery',
    questions: [
      {
        question: 'Which hook runs after every Claude response?',
        options: ['pre-response', 'post-response', 'on-response', 'after-response'],
        correct: 1,
        explanation: 'The post-response.js hook executes after every Claude response.'
      },
      {
        question: 'What\'s the best practice for hook execution time?',
        options: ['Take as long as needed', 'Under 10 seconds', 'Under 1 second', 'Instant only'],
        correct: 1,
        explanation: 'Hooks should execute quickly (ideally under 10 seconds) to avoid slowing down interactions.'
      },
      {
        question: 'Can hooks modify Claude\'s response?',
        options: ['Yes', 'No', 'Only pre-response hooks', 'Only with permission'],
        correct: 0,
        explanation: 'Yes! Hooks can read, modify, or enhance responses - very powerful for automation.'
      }
    ]
  },
  6: {
    name: 'Web Integration',
    questions: [
      {
        question: 'Which tool fetches web pages and analyzes them?',
        options: ['WebGet', 'WebFetch', 'FetchWeb', 'HttpGet'],
        correct: 1,
        explanation: 'WebFetch retrieves web content, converts HTML to markdown, and can analyze it with AI.'
      },
      {
        question: 'What does WebSearch return?',
        options: ['Raw HTML', 'Search result blocks', 'JSON data', 'Markdown'],
        correct: 1,
        explanation: 'WebSearch returns formatted search result blocks with titles, snippets, and URLs.'
      },
      {
        question: 'Can you filter WebSearch to specific domains?',
        options: ['No', 'Yes, with allowed_domains', 'Yes, with domain_filter', 'Only block domains'],
        correct: 1,
        explanation: 'Use allowed_domains to include only specific sites, or blocked_domains to exclude them.'
      }
    ]
  },
  '7a': {
    name: 'Pull Requests & CI/CD',
    questions: [
      {
        question: 'When creating a PR, what should you analyze first?',
        options: ['Just the latest commit', 'All commits in the branch', 'The PR template', 'The base branch'],
        correct: 1,
        explanation: 'Analyze ALL commits in the branch (not just the latest) to create an accurate PR summary.'
      },
      {
        question: 'What command do you use to create a GitHub PR from CLI?',
        options: ['git pr create', 'gh pr create', 'git pull-request', 'github pr'],
        correct: 1,
        explanation: 'Use gh pr create (GitHub CLI) to create pull requests from the command line.'
      },
      {
        question: 'Should Claude skip git hooks by default?',
        options: ['Yes', 'No', 'Only for commits', 'Only for push'],
        correct: 1,
        explanation: 'Never skip hooks (--no-verify) unless explicitly requested by the user.'
      }
    ]
  },
  '7b': {
    name: 'MCP Hands-On',
    questions: [
      {
        question: 'What does MCP stand for?',
        options: ['Master Control Program', 'Model Context Protocol', 'Multi-Cloud Platform', 'Message Communication Protocol'],
        correct: 1,
        explanation: 'MCP stands for Model Context Protocol - it extends Claude with external tool servers.'
      },
      {
        question: 'Where do you configure MCP servers?',
        options: ['claude.json', 'claude_desktop_config.json', 'mcp.json', 'config.json'],
        correct: 1,
        explanation: 'MCP servers are configured in claude_desktop_config.json file.'
      },
      {
        question: 'What prefix do MCP tools have?',
        options: ['mcp-', 'mcp__', 'mcp.', 'mcp:'],
        correct: 1,
        explanation: 'MCP tools are prefixed with mcp__ (double underscore) in Claude Code.'
      }
    ]
  },
  8: {
    name: 'Advanced Git',
    questions: [
      {
        question: 'What\'s the safest way to resolve merge conflicts?',
        options: ['Use --theirs', 'Use --ours', 'Manually review and merge', 'Use --force'],
        correct: 2,
        explanation: 'Always manually review and merge conflicts to ensure no important changes are lost.'
      },
      {
        question: 'Should you use "git push --force" on main/master?',
        options: ['Yes, always', 'No, never', 'Only if needed', 'Only with permission'],
        correct: 1,
        explanation: 'Never force push to main/master - it can destroy team members\' work. Always warn if requested.'
      },
      {
        question: 'What does "git rebase" do?',
        options: ['Merges branches', 'Rewrites commit history', 'Creates tags', 'Deletes branches'],
        correct: 1,
        explanation: 'git rebase rewrites commit history by replaying commits on top of another branch.'
      }
    ]
  },
  9: {
    name: 'Context Management',
    questions: [
      {
        question: 'What\'s the context window for Claude Sonnet 3.5?',
        options: ['100K tokens', '200K tokens', '500K tokens', '1M tokens'],
        correct: 1,
        explanation: 'Claude Sonnet 3.5 has a 200K token context window (about 150K words or 500 pages).'
      },
      {
        question: 'What symbol starts a context annotation?',
        options: ['@', '#', '/', '!'],
        correct: 1,
        explanation: 'Use # to create context annotations like #plan, #idea, #bug for better organization.'
      },
      {
        question: 'Why use CLAUDE.md for instructions?',
        options: ['For documentation', 'Instructions persist across chats', 'Git requires it', 'For team collaboration'],
        correct: 1,
        explanation: 'CLAUDE.md provides persistent instructions that apply to every conversation in that project.'
      }
    ]
  },
  10: {
    name: 'Power User Mastery',
    questions: [
      {
        question: 'What\'s the recommended approach for large tasks?',
        options: ['Do everything at once', 'Break into small steps', 'Use multiple agents', 'Ask for human help'],
        correct: 1,
        explanation: 'Break large tasks into smaller, manageable steps for better results and easier debugging.'
      },
      {
        question: 'When should you use TodoWrite?',
        options: ['For single tasks', 'For 2-3 simple tasks', 'For complex multi-step tasks (3+)', 'Never'],
        correct: 2,
        explanation: 'Use TodoWrite for complex tasks requiring 3+ steps. Skip it for single straightforward tasks.'
      },
      {
        question: 'What\'s the best way to learn Claude Code?',
        options: ['Read docs only', 'Watch videos', 'Hands-on practice', 'Ask others'],
        correct: 2,
        explanation: 'Hands-on practice is the best way to learn - actually use the tools on real projects!'
      }
    ]
  }
};

// Spaced repetition algorithm - prioritize older completed modules
function selectModuleForReview(completedModules, lastReviewed = {}) {
  if (completedModules.length === 0) {
    return null;
  }

  // Calculate days since last review for each module
  const now = Date.now();
  const moduleScores = completedModules.map(moduleId => {
    const lastReviewDate = lastReviewed[moduleId] || 0;
    const daysSinceReview = Math.floor((now - lastReviewDate) / (1000 * 60 * 60 * 24));

    // Score based on spaced repetition intervals (1, 3, 7, 14, 30 days)
    let score = 0;
    if (daysSinceReview >= 30) score = 5;
    else if (daysSinceReview >= 14) score = 4;
    else if (daysSinceReview >= 7) score = 3;
    else if (daysSinceReview >= 3) score = 2;
    else if (daysSinceReview >= 1) score = 1;

    return { moduleId, score, daysSinceReview };
  });

  // Sort by score (higher = needs review more) and pick highest
  moduleScores.sort((a, b) => b.score - a.score);

  // If all modules reviewed recently, pick oldest
  if (moduleScores[0].score === 0) {
    moduleScores.sort((a, b) => b.daysSinceReview - a.daysSinceReview);
  }

  return moduleScores[0].moduleId;
}

function main() {
  // Check if progress file exists
  if (!fs.existsSync(PROGRESS_FILE)) {
    console.log(bold('\n📚 Review Quiz\n'));
    console.log('You haven\'t completed any modules yet!');
    console.log('\nRun ' + cyan('/learn') + ' to start your journey, then come back here to review.\n');
    process.exit(0);
  }

  try {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    runReviewQuiz(progress);
  } catch (error) {
    console.error('Error reading progress file:', error.message);
    process.exit(1);
  }
}

function runReviewQuiz(progress) {
  const completedModules = progress.completedModules || [];

  if (completedModules.length === 0) {
    console.log('\n' + bold(yellow('📚 No Completed Modules Yet\n')));
    console.log('You haven\'t completed any modules to review!');
    console.log('\nComplete modules first, then use ' + cyan('/review') + ' to reinforce your learning.\n');
    return;
  }

  // Initialize review tracking if not exists
  if (!progress.lastReviewed) {
    progress.lastReviewed = {};
  }

  // Select module using spaced repetition
  const moduleId = selectModuleForReview(completedModules, progress.lastReviewed);
  const moduleQuiz = QUIZ_QUESTIONS[moduleId];

  if (!moduleQuiz) {
    console.log('\n' + bold(yellow('📚 Quiz Not Available\n')));
    console.log('No quiz available for module ' + cyan(moduleId) + ' yet.\n');
    return;
  }

  console.log('\n' + bold(cyan('╔════════════════════════════════════════════════════════╗')));
  console.log(cyan('║') + bold('  📚 Review Quiz - Module ' + moduleId + '  ') + cyan('║'));
  console.log(cyan('╚════════════════════════════════════════════════════════╝\n'));

  console.log(bold('Module: ') + moduleQuiz.name + '\n');

  // Show review info
  const daysSince = progress.lastReviewed[moduleId]
    ? Math.floor((Date.now() - progress.lastReviewed[moduleId]) / (1000 * 60 * 60 * 24))
    : 'never';

  console.log(gray('Last reviewed: ' + (daysSince === 'never' ? 'never' : daysSince + ' days ago')));
  console.log(gray('Questions: ' + moduleQuiz.questions.length) + '\n');

  // Display all questions
  let correctCount = 0;
  const totalQuestions = moduleQuiz.questions.length;

  moduleQuiz.questions.forEach((q, index) => {
    console.log(bold(`Question ${index + 1}/${totalQuestions}:\n`));
    console.log(q.question + '\n');

    q.options.forEach((option, i) => {
      const letter = String.fromCharCode(65 + i); // A, B, C, D
      console.log(`  ${letter}. ${option}`);
    });

    console.log();

    // In a real interactive quiz, we'd wait for user input
    // For now, show the correct answer and explanation
    const correctLetter = String.fromCharCode(65 + q.correct);
    console.log(bold(green('✓ Correct Answer: ')) + correctLetter + '. ' + q.options[q.correct]);
    console.log(gray('💡 ' + q.explanation));
    console.log('\n' + divider('─', 60) + '\n');
  });

  // Summary
  console.log(bold(cyan('📊 Quiz Summary\n')));
  console.log('Module: ' + cyan(moduleQuiz.name));
  console.log('Questions: ' + cyan(totalQuestions));
  console.log('Topic: ' + cyan('Review and reinforce your knowledge\n'));

  // Tips for actual practice
  console.log(bold('💡 Practice Tips:\n'));
  console.log('  • Try answering each question before looking at the answer');
  console.log('  • Use ' + cyan('/practice') + ' for hands-on exercises');
  console.log('  • Review the module with ' + cyan('/modules') + ' if you need a refresher');
  console.log('  • Come back in a few days to review again!\n');

  // Update last reviewed timestamp
  progress.lastReviewed[moduleId] = Date.now();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

  // Motivational quote
  const quote = quotesLibrary.getMotivationalQuote();
  console.log(italic(gray(quote + '\n')));
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runReviewQuiz, selectModuleForReview };
