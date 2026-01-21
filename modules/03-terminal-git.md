# Module 3: Terminal & Git Workflow

## What You'll Learn
- Running bash commands through Claude
- Git operations (status, diff, commit, push)
- Creating commits with proper messages
- Branch management
- When to use Bash vs specialized tools

## The Bash Tool

Claude can execute terminal commands for you:
- Package management (npm, pip, cargo, etc.)
- Git operations
- Running tests
- Starting servers
- System operations

**Important**: Use specialized tools (Read, Edit, Grep) for file operations—they're more efficient than bash commands like cat, sed, or grep.

### Git Workflow with Claude

Claude follows strict git safety protocols:
- **NEVER** runs destructive commands without permission
- **NEVER** force pushes to main/master
- **NEVER** skips hooks
- Only commits when explicitly asked
- Creates meaningful commit messages

### Commit Message Format

When you ask Claude to commit, it will:
1. Run `git status` to see changes
2. Run `git diff` to understand what changed
3. Create a descriptive commit message
4. Add signature: "🤖 Generated with Claude Code"

## Hands-On Exercise 3.1: Check Git Status

**Task**: Ask me to show you the current git status of your repository.

Try it: "Show me the git status" or "What files have changed?"

---

*[WAIT FOR USER]*

---

## Exercise 3.2: View Changes

**Task**: Ask me to show you the actual code changes (diff) in your working directory.

Try it: "Show me what changed" or "Git diff the current changes"

---

*[WAIT FOR USER]*

---

## Exercise 3.3: Run a Command

**Task**: Ask me to run a bash command. Could be:
- Install a package
- Run tests
- Check a version
- List running processes

Example: "Run npm test" or "Install the axios package"

---

*[WAIT FOR USER]*

---

## Exercise 3.4: Create a Commit (Optional)

**Note**: Only do this if you have uncommitted changes you want to commit.

**Task**: Ask me to commit your changes with a descriptive message.

Try it: "Commit these changes" or "Create a git commit for these updates"

---

*[WAIT FOR USER OR SKIP]*

---

## Module 3 Complete! 🎯

You've learned:
✓ Running bash commands through Claude
✓ Checking git status and diffs
✓ Understanding Claude's git safety protocols
✓ Creating commits with proper messages
✓ When to use Bash vs specialized tools

**Next**: Advanced tools for power users! Type "continue" when ready.
