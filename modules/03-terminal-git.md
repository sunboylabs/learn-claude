# Module 3: Terminal & Git Workflow

## What You'll Learn
- Running bash commands through Claude
- Git operations (status, diff, commit, push)
- Creating commits with proper messages
- Branch management
- When to use Bash vs specialized tools

## ⚡ Quick Summary

- Execute terminal commands safely through Claude Code
- Master Git workflows with built-in safety protocols
- Learn when to use Bash tool vs specialized file tools
- Create professional commits with proper formatting
- **Estimated time: 10-12 minutes**

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

### 💡 Real-World Example

**Scenario:** You've made changes across 10 files to implement a new feature.

**How Claude Code helps:**
- Ask: "Review my changes and create a commit"
- Claude analyzes all diffs, understands the purpose
- Creates a comprehensive commit message that explains the "why"
- Follows your team's commit conventions automatically
- Never commits secrets or unintended files

One command, professional result!

## Hands-On Exercise 3.1: Check Git Status

**Task**: Ask me to show you the current git status of your repository.

Try it: "Show me the git status" or "What files have changed?"

---

*[WAIT FOR USER]*

---

📍 **Section 2 of 4** • ⏱️ ~8 min remaining

---

### 🎯 Quick Win (30 seconds)

Try this: Ask me to check your current git branch.
Example: "What branch am I on?"

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

📍 **Section 3 of 4** • ⏱️ ~5 min remaining

---

## Exercise 3.4: Create a Commit (Optional)

**Note**: Only do this if you have uncommitted changes you want to commit.

**Task**: Ask me to commit your changes with a descriptive message.

Try it: "Commit these changes" or "Create a git commit for these updates"

---

*[WAIT FOR USER OR SKIP]*

---

📍 **Section 4 of 4** • ⏱️ ~2 min remaining

---

## 📋 Quick Reference Card

### Bash Command Patterns

| Task | Command Example | Notes |
|------|----------------|-------|
| **Git Status** | `git status` | See working tree state |
| **View Changes** | `git diff` | Unstaged changes |
| **Staged Changes** | `git diff --staged` | Changes ready to commit |
| **Branch Info** | `git branch -vv` | Current branch + tracking |
| **Recent Commits** | `git log -5 --oneline` | Last 5 commits |
| **Install Package** | `npm install <package>` | Add dependency |
| **Run Tests** | `npm test` or `pytest` | Execute test suite |
| **Check Version** | `node --version` | Verify installation |

### Git Workflow with Claude

```bash
# 1. Check what changed
"Show me git status and diff"

# 2. Review changes
Claude analyzes all diffs automatically

# 3. Create commit
"Commit these changes"
→ Claude writes descriptive message
→ Follows team conventions
→ Never commits secrets

# 4. Push (optional)
"Push to remote"
→ Only when explicitly requested
```

### Commit Message Best Practices

**Good commit messages:**
```
feat: Add user authentication with JWT tokens

Implements login/logout endpoints with token refresh.
Includes rate limiting and secure password hashing.

🤖 Generated with Claude Code
```

**What Claude considers:**
- Type: feat, fix, refactor, docs, test, chore
- Scope: What part of the system changed
- Why: The business reason for the change
- How: Key technical approach (if non-obvious)

### Git Safety Protocols

Claude **NEVER** does this without explicit permission:
- ❌ Force push (`git push --force`)
- ❌ Hard reset (`git reset --hard`)
- ❌ Skip hooks (`--no-verify`)
- ❌ Amend others' commits
- ❌ Push to main/master forcefully
- ❌ Commit secrets (.env, credentials)

Claude **ALWAYS** does this:
- ✅ Checks git status before committing
- ✅ Reviews all diffs to understand changes
- ✅ Asks before destructive operations
- ✅ Warns about committing sensitive files
- ✅ Follows repository's commit conventions

### When to Use Bash vs Specialized Tools

| Use Bash Tool | Use Specialized Tools |
|---------------|----------------------|
| Git operations | Reading files → **Read** |
| Package management | Searching code → **Grep** |
| Running tests | Finding files → **Glob** |
| Starting servers | Editing files → **Edit** |
| System commands | Writing files → **Write** |

**Why?** Specialized tools are faster, safer, and handle permissions correctly.

### Common Patterns

**Pattern 1: Pre-commit workflow**
```
User: "Show me what I'm about to commit"
→ Claude runs: git status && git diff --staged
```

**Pattern 2: Parallel git info**
```
User: "Give me the full git context"
→ Claude runs in parallel:
  - git status
  - git diff
  - git branch -vv
  - git log -5 --oneline
```

**Pattern 3: Safe branch switching**
```
User: "Switch to feature branch"
→ Claude checks for uncommitted changes first
→ Warns if switching would lose work
→ Only proceeds if safe
```

### Quick Commands to Try

1. **"Check git status and show me recent commits"**
   - Parallel execution of status + log

2. **"What branch am I on and is it up to date?"**
   - Branch info + remote tracking status

3. **"Show me what changed in the last commit"**
   - `git show HEAD` with formatted output

4. **"Run the tests and show me the coverage report"**
   - Sequential execution with results

5. **"Install dependencies and start the dev server"**
   - Chained commands with proper error handling

---

## Module 3 Complete! 🎯

You've learned:
✓ Running bash commands through Claude
✓ Checking git status and diffs
✓ Understanding Claude's git safety protocols
✓ Creating commits with proper messages
✓ When to use Bash vs specialized tools

---
**Navigation:** [← Previous: File Operations](02-file-operations.md) | [Menu](../README.md) | [Next: Advanced Tools →](04-advanced-tools.md)

**Progress:** ██████████ 100% through this module
---

**Next**: Advanced tools for power users! Type "continue" when ready.
