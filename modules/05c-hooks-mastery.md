# Module 5C: Hooks Mastery 🪝

## What You'll Learn

Hooks are **event-driven scripts** that run automatically when specific events occur in Claude Code. They're perfect for automation, validation, and custom workflows!

You'll master:
- **Hook types** - What events trigger hooks
- **Hook formats** - JavaScript, Shell, Python scripts
- **Environment variables** - Accessing hook context
- **Input/Output** - Reading stdin, writing stdout
- **Debugging hooks** - Finding and fixing issues

## What is a Hook?

A hook is a script that **automatically runs** when Claude Code does something.

**Think of it as:** Event listeners for Claude Code actions!

### Common Use Cases

**Hooks are perfect for:**
- Validating commit messages before committing
- Logging tool usage for analytics
- Notifying teams about certain actions
- Custom achievement systems
- Auto-formatting code before saving
- Preventing dangerous operations

### Hook vs Command vs Skill

| Feature | Hook | Slash Command | Skill |
|---------|------|---------------|-------|
| **Trigger** | Automatic (on events) | Manual `/command` | Manual invocation |
| **Purpose** | React to events | Quick shortcuts | Complex workflows |
| **Execution** | Background | Foreground | Foreground |
| **Examples** | Validate commits | `/deploy` | "code-reviewer" |

---

## Hook Types

Claude Code supports several hook types:

### 1. user-prompt-submit

Runs **before Claude sees your message**.

**Use for:**
- Logging user activity
- Custom achievements/gamification
- Auto-expanding shortcuts
- Adding context automatically

**Timing:** Before your prompt is sent to Claude

### 2. tool-use

Runs **before a tool is executed**.

**Use for:**
- Logging tool usage
- Preventing dangerous operations
- Validating tool parameters
- Adding notifications

**Timing:** Before each tool call

### 3. tool-use-result

Runs **after a tool completes**.

**Use for:**
- Logging results
- Post-processing tool output
- Triggering follow-up actions
- Error tracking

**Timing:** After each tool completes

---

## Hook Anatomy

### File Location

Hooks live in `.claude/hooks/`:

```
.claude/
└── hooks/
    ├── user-prompt-submit/
    │   ├── achievement-tracker.js
    │   └── context-helper.js
    ├── tool-use/
    │   ├── tool-logger.js
    │   └── safety-check.sh
    └── tool-use-result/
        └── result-logger.js
```

**Directory Structure:**
- Hook type = directory name
- Hook scripts = files in that directory
- All executable scripts in a directory run

### File Formats

Hooks can be:
- **JavaScript (.js)** - Most common, uses Node.js
- **Shell scripts (.sh)** - For bash commands
- **Python (.py)** - If you prefer Python
- **Any executable** - Must have execute permission

**Requirements:**
1. Must be executable: `chmod +x hook-script.js`
2. Must have shebang line: `#!/usr/bin/env node`
3. Must read stdin for hook data
4. Must write to stdout/stderr

---

## Hands-On Exercise 5C.1: Create Your First Hook

Let's create a simple commit message validator!

**Task: Create `.claude/hooks/tool-use/commit-validator.js`**

This hook should:
- Run before any tool is used
- Check if the tool is Bash with a git commit command
- Validate the commit message format
- Block commits with bad messages

**Step-by-Step:**

1. **Create the directory**
   ```bash
   mkdir -p .claude/hooks/tool-use
   ```

2. **Create the hook file**
   Tell me: "Create `.claude/hooks/tool-use/commit-validator.js`"

3. **Write the hook script**

```javascript
#!/usr/bin/env node

const fs = require('fs');

// Read hook data from stdin
let inputData = '';
process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(inputData);

    // Check if this is a Bash tool with git commit
    if (hookData.tool === 'Bash' &&
        hookData.parameters &&
        hookData.parameters.command &&
        hookData.parameters.command.includes('git commit')) {

      const command = hookData.parameters.command;

      // Extract commit message
      const messageMatch = command.match(/-m\s+["'](.+?)["']/);

      if (messageMatch) {
        const message = messageMatch[1];

        // Validation rules
        const errors = [];

        // Must be at least 10 characters
        if (message.length < 10) {
          errors.push('Commit message too short (minimum 10 characters)');
        }

        // Should start with capital letter
        if (!/^[A-Z]/.test(message)) {
          errors.push('Commit message should start with capital letter');
        }

        // Should not end with period
        if (message.endsWith('.')) {
          errors.push('Commit message should not end with period');
        }

        // If errors, block the commit
        if (errors.length > 0) {
          console.error('❌ Commit message validation failed:');
          errors.forEach(err => console.error(`  - ${err}`));
          console.error(`\nMessage: "${message}"`);
          console.error('\nPlease improve your commit message.');
          process.exit(1); // Block the commit
        }
      }
    }

    // Allow the tool to proceed
    process.exit(0);

  } catch (error) {
    // On error, allow the tool (fail open)
    process.exit(0);
  }
});
```

4. **Make it executable**
   ```bash
   chmod +x .claude/hooks/tool-use/commit-validator.js
   ```

5. **Test it**
   Try making a commit with a bad message:
   "Create a test commit with message 'bad'"

   Watch the hook block it!

   Then try with a good message:
   "Create a commit with message 'Add validation for user inputs'"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5C.1]*

---

## Hook Input/Output

### Reading Hook Data (stdin)

All hooks receive JSON data on stdin:

```javascript
#!/usr/bin/env node

let inputData = '';

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  const hookData = JSON.parse(inputData);

  // Hook data contains:
  // - event: The hook type
  // - timestamp: When it happened
  // - tool: Tool being used (for tool-use hooks)
  // - parameters: Tool parameters
  // - prompt: User's prompt (for user-prompt-submit)

  // Your logic here
});
```

### Writing Output (stdout/stderr)

**stdout:** Normal output, visible to user
```javascript
console.log('✅ Hook passed!');
console.log('Additional info...');
```

**stderr:** Errors and warnings
```javascript
console.error('❌ Validation failed!');
console.error('Details about the failure...');
```

### Exit Codes

**Exit codes control hook behavior:**

```javascript
process.exit(0);  // Success - allow operation
process.exit(1);  // Failure - block operation
```

For tool-use hooks:
- `exit 0` → Tool executes normally
- `exit 1` → Tool is blocked, user sees error message

For user-prompt-submit hooks:
- `exit 0` → Prompt sent to Claude
- `exit 1` → Prompt blocked (rare use case)

---

## Environment Variables

Hooks have access to useful environment variables:

```javascript
#!/usr/bin/env node

// Project directory
const projectDir = process.env.CLAUDE_PROJECT_DIR;

// User's home directory
const homeDir = process.env.HOME;

// Claude config directory
const configDir = process.env.CLAUDE_CONFIG_DIR;

console.log(`Running in project: ${projectDir}`);
```

---

## Hands-On Exercise 5C.2: Create an Achievement Hook

Create a hook that awards achievements!

**Task: Create `.claude/hooks/user-prompt-submit/achievement-system.js`**

This hook should:
- Track how many prompts the user has sent
- Award achievements at milestones (10, 50, 100, 500 prompts)
- Store progress in a JSON file
- Display achievement unlocks

**Requirements:**
- Read current progress from `.claude/achievement-progress.json`
- Increment prompt count
- Check for new achievements
- Write updated progress
- Print achievement notifications to stdout
- Always exit 0 (never block prompts)

**Achievements to Award:**
- 10 prompts: "🌱 Getting Started"
- 50 prompts: "💬 Conversationalist"
- 100 prompts: "🔥 On Fire"
- 500 prompts: "🏆 Power User"

**Starter Code:**

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const progressFile = path.join(process.env.CLAUDE_PROJECT_DIR || '.', '.claude/achievement-progress.json');

// Achievement definitions
const achievements = [
  { id: 'started', threshold: 10, name: 'Getting Started', icon: '🌱' },
  { id: 'conversationalist', threshold: 50, name: 'Conversationalist', icon: '💬' },
  { id: 'on-fire', threshold: 100, name: 'On Fire', icon: '🔥' },
  { id: 'power-user', threshold: 500, name: 'Power User', icon: '🏆' }
];

// TODO: Read progress from file (or initialize if doesn't exist)
// TODO: Increment prompt count
// TODO: Check for newly unlocked achievements
// TODO: Write updated progress
// TODO: Display achievement notifications

process.exit(0);
```

Complete this hook and test it by sending prompts!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5C.2]*

---

## Hook Patterns

### Pattern 1: Logging Hook

Track tool usage for analytics:

```javascript
#!/usr/bin/env node

const fs = require('fs');

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', () => {
  const hookData = JSON.parse(inputData);

  // Log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    tool: hookData.tool,
    parameters: hookData.parameters
  };

  // Append to log file
  const logFile = '.claude/tool-usage.log';
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');

  // Always allow the tool
  process.exit(0);
});
```

### Pattern 2: Safety Check Hook

Prevent dangerous operations:

```javascript
#!/usr/bin/env node

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', () => {
  const hookData = JSON.parse(inputData);

  if (hookData.tool === 'Bash') {
    const command = hookData.parameters.command;

    // Dangerous commands
    const dangerousPatterns = [
      /rm\s+-rf\s+\//,           // rm -rf /
      /git push.*--force.*main/,  // Force push to main
      /:\(\)\{ :|:& \};:/,        // Fork bomb
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(command)) {
        console.error('🚨 DANGER: Command blocked for safety');
        console.error(`Command: ${command}`);
        console.error('This command could cause damage.');
        process.exit(1); // Block it
      }
    }
  }

  process.exit(0); // Allow it
});
```

### Pattern 3: Context Enhancement Hook

Automatically add context to prompts:

```javascript
#!/usr/bin/env node

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', () => {
  const hookData = JSON.parse(inputData);

  // Check if prompt mentions certain keywords
  const prompt = hookData.prompt || '';

  if (prompt.toLowerCase().includes('test')) {
    console.log('💡 Tip: Tests are in the tests/ directory');
  }

  if (prompt.toLowerCase().includes('deploy')) {
    console.log('💡 Remember: Run tests before deploying!');
  }

  // Always allow the prompt
  process.exit(0);
});
```

### Pattern 4: Notification Hook

Send notifications for important events:

```javascript
#!/usr/bin/env node

const { exec } = require('child_process');

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', () => {
  const hookData = JSON.parse(inputData);

  // Notify on deployments
  if (hookData.tool === 'Bash' &&
      hookData.parameters.command.includes('deploy')) {

    // Send notification (macOS example)
    exec(`osascript -e 'display notification "Deployment starting..." with title "Claude Code"'`);

    // Or send to Slack, Discord, etc.
    // fetch('https://hooks.slack.com/...', { ... });
  }

  process.exit(0);
});
```

---

## Hands-On Exercise 5C.3: Create a Tool Usage Logger

Create a hook that logs all tool usage!

**Task: Create `.claude/hooks/tool-use-result/tool-logger.js`**

This hook should:
- Run after every tool completes
- Log the tool name, parameters, and result
- Track success/failure
- Write to `.claude/logs/tool-usage.log` in JSON Lines format
- Create daily log files (e.g., `tool-usage-2025-01-19.log`)

**Requirements:**
- Parse hook data from stdin
- Extract tool name, parameters, and result
- Determine if tool succeeded or failed
- Format as JSON line
- Append to dated log file
- Never block operations (always exit 0)

**Bonus:**
- Add function to summarize logs: most-used tools, success rate
- Create a companion slash command `/usage-stats` to view summary

Test it by using various tools and checking the log files!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5C.3]*

---

## Debugging Hooks

### Common Issues

**Issue 1: Hook not running**

**Checklist:**
- [ ] File is in correct directory (`.claude/hooks/{event-type}/`)
- [ ] File is executable (`chmod +x hook.js`)
- [ ] Shebang line present (`#!/usr/bin/env node`)
- [ ] No syntax errors

**Issue 2: Hook blocks operations unexpectedly**

**Debug:**
```javascript
// Add debug logging
console.error('Hook input:', JSON.stringify(hookData, null, 2));
console.error('Validation result:', result);

// Check exit code
if (shouldBlock) {
  console.error('BLOCKING operation');
  process.exit(1);
} else {
  console.error('ALLOWING operation');
  process.exit(0);
}
```

**Issue 3: Hook crashes**

**Protect with try-catch:**
```javascript
process.stdin.on('end', () => {
  try {
    // Your hook logic here

    process.exit(0);
  } catch (error) {
    // Log error but don't block operation
    console.error('Hook error:', error.message);
    process.exit(0); // Fail open
  }
});
```

### Testing Hooks

**Strategy 1: Standalone Testing**

```javascript
// test-hook.js
const hook = require('./commit-validator.js');

const testInput = JSON.stringify({
  tool: 'Bash',
  parameters: {
    command: 'git commit -m "bad message"'
  }
});

// Simulate stdin
const { Readable } = require('stream');
const mockStdin = new Readable();
mockStdin.push(testInput);
mockStdin.push(null);

process.stdin = mockStdin;

// Run hook
// ...
```

**Strategy 2: Dry Run Mode**

```javascript
// Add dry run flag
const DRY_RUN = process.env.DRY_RUN === 'true';

if (DRY_RUN) {
  console.log('DRY RUN: Would have blocked commit');
  process.exit(0); // Don't actually block
} else {
  process.exit(1); // Actually block
}
```

Test with: `DRY_RUN=true claude`

---

## Hands-On Exercise 5C.4: Debug a Broken Hook

I'll give you a broken hook - fix it!

**Broken Hook:** `.claude/hooks/tool-use/broken-hook.js`

```javascript
#!/usr/bin/env node

let input = '';
process.stdin.on('data', chunk => { input += chunk; });

process.stdin.on('end', () => {
  const data = JSON.parse(input);

  // BUG 1: Typo in property name
  if (data.toolName === 'Read') {
    console.log('Reading file...');
  }

  // BUG 2: Blocking on wrong condition
  if (data.parameters.file_path.includes('secret')) {
    console.error('Cannot read secret files');
    process.exit(0); // Wrong exit code
  }

  // BUG 3: Missing error handling
  const fileSize = data.parameters.file_size.toFixed(2);
  console.log(`File size: ${fileSize} KB`);

  // BUG 4: Not exiting properly
  // (missing process.exit call)
});
```

**Your Task:**
1. Identify all 4 bugs
2. Fix them
3. Test the corrected hook
4. Explain what each bug would cause

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5C.4]*

---

## Advanced Hook Techniques

### Technique 1: Async Operations

Use async/await for complex operations:

```javascript
#!/usr/bin/env node

const fs = require('fs').promises;

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', async () => {
  try {
    const hookData = JSON.parse(inputData);

    // Async operations
    const config = await fs.readFile('.claude/config.json', 'utf8');
    const settings = JSON.parse(config);

    // Check against settings
    if (shouldBlock(hookData, settings)) {
      console.error('Operation blocked by configuration');
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('Hook error:', error.message);
    process.exit(0); // Fail open
  }
});
```

### Technique 2: Hook Configuration

Read configuration from external file:

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load hook config
const configPath = path.join(process.env.CLAUDE_PROJECT_DIR, '.claude/hooks-config.json');
let config = {};

if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// Use config in hook
const enableValidation = config.commitValidation !== false;
const minMessageLength = config.minCommitMessageLength || 10;
```

### Technique 3: Shared Utilities

Create reusable functions for hooks:

```javascript
// .claude/hooks/lib/hook-utils.js

function readHookData() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        resolve(null);
      }
    });
  });
}

function exitAllow() {
  process.exit(0);
}

function exitBlock(message) {
  console.error(message);
  process.exit(1);
}

module.exports = { readHookData, exitAllow, exitBlock };
```

Use in hooks:

```javascript
#!/usr/bin/env node

const { readHookData, exitAllow, exitBlock } = require('../lib/hook-utils.js');

(async () => {
  const hookData = await readHookData();

  if (!hookData) return exitAllow();

  // Your validation logic
  if (shouldBlock) {
    exitBlock('Validation failed');
  }

  exitAllow();
})();
```

---

## Real-World Hook Examples

### Example 1: Pre-Commit Linter

```javascript
#!/usr/bin/env node

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', async () => {
  try {
    const hookData = JSON.parse(inputData);

    // Check if this is a git commit
    if (hookData.tool === 'Bash' &&
        hookData.parameters.command.includes('git commit')) {

      console.log('Running linter before commit...');

      try {
        // Run linter
        await execAsync('npm run lint');
        console.log('✅ Linter passed');
        process.exit(0);
      } catch (error) {
        console.error('❌ Linter failed - please fix errors before committing');
        console.error(error.stdout);
        process.exit(1); // Block commit
      }
    }

    process.exit(0);
  } catch (error) {
    process.exit(0); // Fail open
  }
});
```

### Example 2: Token Usage Tracker

```javascript
#!/usr/bin/env node

const fs = require('fs');

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(inputData);

    // Estimate token usage (rough)
    const estimateTokens = (text) => Math.ceil(text.length / 4);

    const prompt = hookData.prompt || '';
    const tokens = estimateTokens(prompt);

    // Track usage
    const usageFile = '.claude/token-usage.json';
    let usage = { total: 0, sessions: [] };

    if (fs.existsSync(usageFile)) {
      usage = JSON.parse(fs.readFileSync(usageFile, 'utf8'));
    }

    usage.total += tokens;
    usage.sessions.push({
      timestamp: new Date().toISOString(),
      tokens: tokens
    });

    fs.writeFileSync(usageFile, JSON.stringify(usage, null, 2));

    // Warn if high usage
    if (tokens > 5000) {
      console.log(`⚠️ Large prompt: ~${tokens} tokens`);
    }

    process.exit(0);
  } catch (error) {
    process.exit(0);
  }
});
```

---

## Module 5C Complete! 🪝

You've mastered:
✓ Hook types and when they trigger
✓ Hook file formats (JavaScript, Shell, Python)
✓ Reading stdin and writing stdout/stderr
✓ Environment variables in hooks
✓ Exit codes and blocking operations
✓ Debugging broken hooks
✓ Advanced hook patterns

### Hook Creation Checklist

Before moving on, ensure you've created:
- [ ] commit-validator.js - Validates commit messages
- [ ] achievement-system.js - Awards achievements
- [ ] tool-logger.js - Logs all tool usage
- [ ] Fixed the broken hook exercise
- [ ] Tested all hooks thoroughly

**You're now a hooks expert!** You can automate event-driven workflows and build sophisticated validation systems.

**Next up**: Module 7B - MCP Hands-On Setup! Ready to extend Claude Code with external tools?

Type "continue" when ready! 🚀
