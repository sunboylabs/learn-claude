# Module 8: Advanced Git & Best Practices

## ⚡ Quick Summary

- **Master complex Git operations**: rebase, cherry-pick, merge conflict resolution
- **Professional workflows**: branch strategies, PR creation, commit best practices
- **Claude's Git safety protocol**: Never destructive without permission
- **Real-world scenarios**: Emergency hotfixes, refactoring, debugging production issues
- **Power user techniques**: Parallel operations, context management, smart tool selection
- **Estimated time**: ~40 minutes

---

## What You'll Learn
- **Advanced Git operations** - Branches, merges, conflicts, rebase, cherry-pick
- **Best practices** - Pro patterns and techniques
- **Performance optimization** - Speed up workflows
- **Common pitfalls** - What to avoid
- **Real-world scenarios** - Complex problem-solving
- **Troubleshooting** - Debug common issues

## Advanced Git Operations

### Understanding Git Workflow with Claude

Claude Code integrates deeply with Git to make version control intuitive and powerful. When you ask Claude to work with Git, it follows these safety protocols:

**Git Safety Protocol:**
- NEVER updates git config
- NEVER runs destructive commands without explicit permission
- NEVER skips hooks (--no-verify) unless requested
- NEVER force pushes to main/master branches
- Always checks authorship before amending commits
- Only commits when explicitly asked

---
📍 **Section 1 of 5** • ⏱️ ~36 min remaining
---

### 🎯 Quick Win (60 seconds)

Try this: "Show me the current branch and recent commits"
Get instant visibility into your Git status!

---

### Branch Management

#### Creating and Switching Branches

**Ask Claude:**
```
"Create a new branch called feature/user-authentication and switch to it"
```

Claude will execute:
```bash
git checkout -b feature/user-authentication
```

**Best Practice:** Use descriptive branch names:
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

#### Managing Multiple Branches

**Ask Claude:**
```
"Show me all branches and their last commit"
```

Claude can help you:
- List all local and remote branches
- See which branch is active
- Identify stale branches
- Clean up merged branches

### Handling Merge Conflicts

Merge conflicts occur when Git can't automatically reconcile differences between branches.

#### Step-by-Step Conflict Resolution

**Ask Claude:**
```
"I'm merging feature/login into main and there are conflicts in auth.js.
Help me resolve them while keeping the new authentication logic."
```

Claude will:
1. Read the conflicted file
2. Show you both versions (HEAD vs incoming)
3. Analyze the differences
4. Propose a resolution that combines both changes appropriately
5. Edit the file to resolve conflicts
6. Mark conflicts as resolved
7. Complete the merge

**Example conflict markers:**
```javascript
<<<<<<< HEAD
function authenticate(user) {
  return bcrypt.compare(user.password, hash);
}
=======
async function authenticate(user) {
  return await jwt.verify(user.token, secret);
}
>>>>>>> feature/login
```

**Ask Claude to resolve:**
```
"Keep both authentication methods - password for initial login,
JWT for subsequent requests. Combine these conflict sections."
```

📚 **Learn more:** [Git Merge Conflicts](https://git-scm.com/docs/git-merge#_how_conflicts_are_presented)

### 💡 Real-World Example

**Scenario:** Two developers modified the same authentication file - one added OAuth, the other added 2FA
**Solution:** Ask Claude to merge both features, keeping OAuth flow as primary with 2FA as optional enhancement
**Impact:** Both features integrated seamlessly, no code lost, functionality preserved

---

### Git Rebase

Rebase rewrites commit history by replaying commits on top of another branch. This creates a cleaner, linear history.

#### When to Use Rebase

**Interactive Rebase - Cleaning up commits:**
```
"I have 5 messy commits on my feature branch.
Help me squash them into 2 meaningful commits before creating a PR."
```

**Rebase vs Merge:**
- **Merge**: Preserves complete history, creates merge commits
- **Rebase**: Creates linear history, cleaner but rewrites commits

⚠️ **Warning:** Never rebase commits that have been pushed to shared branches!

#### Typical Rebase Workflow

**Ask Claude:**
```
"Rebase my feature branch onto main to incorporate the latest changes"
```

Claude will:
1. Fetch latest changes from main
2. Execute `git rebase main`
3. Help resolve any conflicts that arise
4. Continue rebase after conflicts are resolved

📚 **Learn more:** [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)

### Cherry-Picking Commits

Cherry-pick lets you apply specific commits from one branch to another.

**Ask Claude:**
```
"Cherry-pick commit abc123 from the feature/api branch into my current branch"
```

**Use cases:**
- Backporting bug fixes to release branches
- Applying specific features without merging entire branches
- Recovering commits from deleted branches

**Example scenario:**
```
"I need the database migration commit from develop branch,
but I don't want the other changes yet. Cherry-pick commit def456."
```

📚 **Learn more:** [Git Cherry-Pick](https://git-scm.com/docs/git-cherry-pick)

### Stashing Changes

Save uncommitted changes temporarily without committing.

**Ask Claude:**
```
"Stash my current changes, switch to main, then reapply them"
```

**Common stash operations:**
- `git stash` - Save changes
- `git stash pop` - Apply and remove from stash
- `git stash list` - View all stashes
- `git stash apply` - Apply without removing

### Viewing History and Diffs

**Ask Claude:**
```
"Show me all commits in the last week that touched the authentication files"
```

Or:
```
"What changed in user.js between main and my feature branch?"
```

Claude will use `git log` and `git diff` to provide detailed analysis.

📚 **Learn more:** [Git Log](https://git-scm.com/docs/git-log) | [Git Diff](https://git-scm.com/docs/git-diff)

---
📍 **Section 2 of 5** • ⏱️ ~28 min remaining
---

### 🎯 Quick Win (90 seconds)

Try this: "Help me create a hotfix branch from main, fix a typo in README.md, and create a commit"
Practice the complete hotfix workflow!

---

## Git Best Practices with Claude

### 1. Meaningful Commit Messages

Claude automatically generates descriptive commit messages following best practices:

**Structure:**
```
Short summary (50 chars or less)

Detailed explanation of changes:
- What was changed
- Why it was changed
- Any breaking changes or important notes

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

**Ask Claude:**
```
"Commit these changes with a message explaining the new caching layer"
```

### 2. Commit Granularity

**One logical change per commit:**
- ✓ "Add user email validation"
- ✓ "Fix memory leak in WebSocket handler"
- ✗ "Update multiple files with various changes"

**Ask Claude:**
```
"Review my changes and suggest how to split them into logical commits"
```

### 3. Branch Naming Conventions

Consistent naming helps teams understand branch purposes:

```
<type>/<short-description>
```

Examples:
- `feature/two-factor-auth`
- `bugfix/login-timeout`
- `refactor/database-layer`
- `docs/api-endpoints`

### 4. Pull Request Best Practices

**Ask Claude to create PRs:**
```
"Create a pull request for my authentication feature with a detailed description"
```

Claude will:
1. Analyze all commits in the branch
2. Generate comprehensive PR description
3. Include summary of changes
4. Add test plan
5. Push to remote if needed
6. Create PR via `gh` CLI

**PR Description Template:**
```markdown
## Summary
- Bullet points of main changes

## Test Plan
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

🤖 Generated with Claude Code
```

### 5. Code Review Before Committing

**Always review changes:**
```
"Show me all the changes I'm about to commit"
```

Claude will run `git diff` and explain what changed.

### 6. Keeping Branches Updated

**Stay current with main:**
```
"My feature branch is 20 commits behind main. Help me update it safely."
```

Claude will recommend merge or rebase based on your situation.

### 7. Clean Up After Merging

**Remove merged branches:**
```
"Delete local branches that have been merged to main"
```

Keeps your branch list manageable.

### 💡 Real-World Example

**Scenario:** Feature branch 50 commits behind main, causing integration nightmares
**Solution:** Claude rebases feature branch onto latest main, resolves conflicts incrementally
**Impact:** Clean integration, all tests pass, PR merged in 1 hour instead of 2 days of manual conflict fixing

---
**Navigation:** [← Previous](#advanced-git-operations) | [Menu](#top) | [Next →](#power-user-best-practices)
---

## Power User Best Practices

### 1. Be Specific and Direct
❌ "Can you help with the code?"
✓ "Refactor the getUserData function in api/users.js to use async/await and add error handling"

### 2. Use Parallel Operations
❌ Sequential: "Read file1" → wait → "Read file2" → wait
✓ Parallel: "Read file1 and file2 together"

### 3. Leverage Sub-Agents for Exploration
❌ "Search for 'auth' in Python files" → "Search for 'login'" → "Search for 'token'"
✓ "How does authentication work across the codebase?" (uses Explore agent)

### 4. Let Claude Manage Complex Tasks
❌ Breaking down steps yourself and asking one at a time
✓ "Implement user authentication with JWT, refresh tokens, and middleware"
(Claude uses TodoWrite to plan and execute)

### 5. Use the Right Tool for the Job
- **Grep** - Search file contents
- **Glob** - Find files by name pattern
- **Read** - Read specific files
- **Edit** - Modify existing files (not sed/awk)
- **Write** - Create new files (not echo)
- **Bash** - Terminal commands (not file operations)

### 6. Context Management
- Reference specific files: "In src/app.js:45"
- Point to line numbers when discussing code
- Use file paths consistently
- Provide relevant error messages

### 7. Git Workflow Excellence
- Let Claude create meaningful commit messages
- Review diffs before committing
- Use descriptive branch names
- Create comprehensive PRs
- Regular commits to save progress

### 8. Efficient Problem Solving
**Instead of:**
"Is there a function that handles users?"
"Where is it defined?"
"Can you show me the code?"

**Ask:**
"Find all user-related functions and show me their implementations"

### 9. Trust Claude's Planning
For complex tasks, Claude will:
- Create a todo list
- Break down steps
- Execute systematically
- Mark progress

Don't micromanage - let Claude work through the plan.

### 10. Iterative Refinement
First attempt not perfect? Refine:
"Good start, but can you also add input validation and error logging?"

---
📍 **Section 3 of 5** • ⏱️ ~18 min remaining
---

## Performance Optimization

### Speed Up Complex Tasks
1. **Parallel reads**: Read multiple files simultaneously
2. **Specific patterns**: Use precise glob/grep patterns
3. **Sub-agents**: Let specialized agents handle complex exploration
4. **Focused requests**: Tell Claude exactly what you need

### Reduce Context Usage
1. **Avoid reading huge files** unnecessarily
2. **Use line ranges** for large files: "Read lines 100-200"
3. **Targeted searches** instead of broad sweeps
4. **Let agents explore** instead of loading everything into context

### Git Performance Tips
1. **Shallow clones** for large repositories
2. **Sparse checkout** for monorepos
3. **Git LFS** for large binary files
4. **Regular garbage collection**: `git gc`

## Common Pitfalls to Avoid

### ❌ Don't Do This:
1. **Asking vague questions** - "Fix the bug"
2. **Reading files manually then pasting** - Claude can read them
3. **Making Claude use echo/cat for files** - Use Read/Write/Edit
4. **Forgetting to commit work** - Secure your progress
5. **Skipping git diffs** - Always review changes
6. **Not using todos for complex tasks** - You'll lose track
7. **Fighting with Claude** - If confused, clarify the request
8. **Committing sensitive data** - Always review before committing
9. **Force pushing without understanding** - Can lose work permanently
10. **Ignoring merge conflicts** - Must resolve properly

### 💡 Real-World Example

**Scenario:** Junior developer accidentally committed .env file with production database credentials
**Solution:** Ask Claude to remove file from history, update .gitignore, rotate credentials
**Impact:** Security breach prevented, proper practices established, team educated

---

### ✓ Do This Instead:
1. **Be specific** - "Fix the TypeError in line 45 of auth.js"
2. **Direct file access** - "Read src/config.json"
3. **Use proper tools** - Edit tool for file modifications
4. **Regular commits** - "Commit these changes with a message about..."
5. **Review first** - "Show me the diff of my changes"
6. **Trust the system** - Claude manages complex tasks well
7. **Iterate** - Refine requests based on results
8. **Check .gitignore** - "Make sure .env files aren't being committed"
9. **Understand before forcing** - Ask Claude to explain
10. **Resolve thoughtfully** - "Help me understand both sides of this conflict"

---
📍 **Section 4 of 5** • ⏱️ ~12 min remaining
---

### 🎯 Quick Win (60 seconds)

Try this: "Show me uncommitted changes and help me decide what to commit first"
Master the art of selective staging!

---

## Real-World Scenarios

### Scenario 1: Refactoring a Feature
```
"I need to refactor the user authentication system to:
1. Use async/await instead of callbacks
2. Add input validation
3. Improve error handling
4. Add unit tests
Please analyze the current implementation and create a plan."
```

**Claude will:**
- Create todos for each step
- Read relevant files
- Propose refactoring approach
- Implement changes incrementally
- Run tests
- Commit changes with meaningful messages

### Scenario 2: Debugging Production Issue
```
"Users are reporting intermittent 500 errors in the payment flow.
Search the codebase for:
- Error handling in payment processing routes
- Database connection issues
- Timeout configurations
- External API integrations
Help me identify potential causes."
```

**Claude will:**
- Use Explore agent to search comprehensively
- Read relevant error handling code
- Analyze configurations
- Check external service integrations
- Propose fixes with explanations
- Create a fix branch

### Scenario 3: Adding a New Feature
```
"Add a password reset feature with:
- Email token generation
- Expiring reset links (15 min)
- Secure password update
- Email notifications
- Rate limiting to prevent abuse
Follow our existing auth patterns."
```

**Claude will:**
- Explore existing auth implementation
- Plan the feature with todos
- Implement incrementally
- Add tests for each component
- Handle edge cases
- Create a PR with comprehensive description

### Scenario 4: Emergency Hotfix
```
"Production has a critical bug - user sessions are expiring immediately.
1. Create a hotfix branch from main
2. Find and fix the session timeout issue
3. Test locally
4. Commit and create urgent PR"
```

**Claude will:**
- Create `hotfix/session-timeout` branch
- Search for session configuration
- Identify the issue
- Apply fix
- Verify the solution
- Create PR with clear urgency markers

### 💡 Real-World Example

**Scenario:** Startup preparing for investor demo, multiple features half-done across 8 branches
**Solution:** Claude analyzes all branches, cherry-picks working features, creates demo branch
**Impact:** Polished demo ready in 3 hours, secured funding, avoided "demo hell"

---
**Navigation:** [← Previous](#power-user-best-practices) | [Menu](#top) | [Next →](#troubleshooting-guide)
---

## Troubleshooting Guide

### Claude seems confused?

**Symptoms:**
- Irrelevant responses
- Wrong file operations
- Unexpected behavior

**Solutions:**
- **Clarify your request** - Be more specific about what you want
- **Provide context** - Point to specific files and line numbers
- **Break it down** - Split complex requests into smaller steps
- **Share error messages** - Include full error output
- **Describe expected behavior** - "Should return user object with email field"

**Example:**
Instead of: "The login isn't working"
Try: "When I submit the login form in src/components/Login.jsx, the API call to /api/auth/login returns 401 even with correct credentials. Check the authentication logic."

### Tools not working as expected?

**Common issues:**

1. **File paths must be absolute**
   - ❌ `src/app.js`
   - ✓ `/Users/username/project/src/app.js`

2. **Permission errors**
   - Check file permissions: `ls -la`
   - Verify Claude can access the directory

3. **Read errors**
   - File might not exist - check path
   - File might be binary - specify if intentional

**Debugging steps:**
```
"List files in /path/to/directory to verify structure"
"Check if /path/to/file.js exists and show its permissions"
```

### Git operations failing?

**Issue: "Not a git repository"**
```
"Initialize git in this directory"
```

**Issue: "Merge conflicts"**
```
"Show me the conflicted files and help resolve conflicts in auth.js"
```

**Issue: "Detached HEAD state"**
```
"I'm in detached HEAD state. Create a branch to save this work."
```

**Issue: "Remote rejected"**
```
"The push was rejected. Check if I need to pull first and help me resolve."
```

**Issue: "Cannot push to protected branch"**
```
"Create a feature branch for these changes instead of committing to main"
```

📚 **Common Git problems:** [Git Troubleshooting Guide](https://git-scm.com/docs/git-help)

---
📍 **Section 5 of 5** • ⏱️ ~5 min remaining
---

### Performance is slow?

**Causes and solutions:**

1. **Too many sequential operations**
   - Use parallel operations when possible
   - Let Claude handle multiple tools at once

2. **Unnecessary file reads**
   - Be specific about what files are needed
   - Use targeted searches instead of reading everything

3. **Large repository searches**
   - Use specific glob patterns: `*.js` instead of `*`
   - Leverage sub-agents for exploration
   - Use type filters in grep: `--type js`

4. **Context overload**
   - Break large tasks into smaller chunks
   - Clear context and start fresh if needed

### Commit/Push Issues

**Issue: Pre-commit hooks failing**
Claude will:
- Run hooks automatically
- Show you the errors
- Fix issues (linting, formatting)
- Amend commit if safe
- Otherwise create new commit

**Issue: Commit message rejected**
Some teams enforce commit message formats.
```
"Create commit following the Conventional Commits format"
```

**Issue: Can't push to remote**
```
"Set up remote tracking for this branch and push"
```

## Hands-On Exercise 8.1: Branch and Merge

**Task:** Practice branch management and merging.

**Instructions:**
1. Ask Claude: "Create a new branch called feature/add-logging"
2. Make some changes to a file
3. Commit the changes
4. Switch back to main
5. Merge the feature branch
6. Delete the feature branch

**What you'll learn:**
- Creating branches
- Committing changes
- Merging branches
- Cleaning up branches

---

*[WAIT FOR USER TO COMPLETE EXERCISE]*

---

## Hands-On Exercise 8.2: Handling Merge Conflicts

**Task:** Create and resolve a merge conflict.

**Instructions:**
1. Create a test file with some content
2. Commit it to main
3. Create a branch and modify the same lines
4. Commit in the branch
5. Switch to main and modify the same lines differently
6. Commit in main
7. Try to merge the branch
8. Ask Claude to help resolve the conflict

**What you'll learn:**
- Understanding merge conflicts
- Conflict resolution strategies
- Keeping desired changes
- Completing merges

---

*[WAIT FOR USER TO COMPLETE EXERCISE]*

---

## Hands-On Exercise 8.3: Git History Analysis

**Task:** Explore your repository's history.

**Instructions:**
Ask Claude to:
1. "Show me the last 10 commits with their messages"
2. "What files were changed in the last commit?"
3. "Show me all commits that modified [specific file]"
4. "Find commits from the last week"
5. "Who made the most commits to this file?"

**What you'll learn:**
- Using git log effectively
- Understanding repository history
- Tracking file changes
- Analyzing contributions

---

*[WAIT FOR USER TO COMPLETE EXERCISE]*

---

## Hands-On Exercise 8.4: Cherry-Pick Practice

**Task:** Cherry-pick a commit from another branch.

**Instructions:**
1. Create two feature branches
2. Make different commits in each
3. Ask Claude: "Cherry-pick commit [hash] from branch A into branch B"
4. Verify the commit was applied
5. Check the git log to see the new commit

**What you'll learn:**
- When to use cherry-pick
- Applying specific commits
- Managing commit history
- Cross-branch operations

---

*[WAIT FOR USER TO COMPLETE EXERCISE]*

---

## Hands-On Exercise 8.5: Pull Request Creation

**Task:** Create a comprehensive pull request.

**Instructions:**
1. Create a feature branch with meaningful changes
2. Make multiple commits with good messages
3. Ask Claude: "Create a pull request for this feature with a detailed description"
4. Review the PR description Claude generates
5. Note how it summarizes all commits

**What you'll learn:**
- Creating professional PRs
- Summarizing changes effectively
- Test plan creation
- PR best practices

---

*[WAIT FOR USER TO COMPLETE EXERCISE]*

---

## Hands-On Exercise 8.6: Complex Real-World Task

**Final Challenge**: Give Claude a complex, real-world task that requires multiple tools and steps.

This should be something you actually need done in your project. Examples:

1. **Feature Implementation**
   "Add rate limiting to all API endpoints with Redis caching and monitoring"

2. **Codebase Refactoring**
   "Convert all class components to functional components with hooks and add TypeScript"

3. **Testing & Quality**
   "Add integration tests for the authentication flow, set up CI, and configure test coverage reporting"

4. **Documentation & Setup**
   "Create comprehensive API documentation, set up a documentation site, and add example requests"

5. **Database Migration**
   "Migrate from MongoDB to PostgreSQL, including schema design, data migration script, and updated queries"

6. **Performance Optimization**
   "Profile the application, identify bottlenecks, implement caching, and optimize database queries"

Give Claude your challenge, and watch it use everything you've learned:
- TodoWrite for planning
- Parallel operations for speed
- Sub-agents for exploration
- Proper tool selection
- Git workflow
- Best practices

---

*[WAIT FOR USER TO COMPLETE FINAL CHALLENGE]*

---

## Additional Resources

### Git Documentation
- [Official Git Documentation](https://git-scm.com/doc)
- [Pro Git Book (Free)](https://git-scm.com/book/en/v2)
- [Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

### Advanced Topics
- [Git Internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
- [Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Git Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

### Claude Code Resources
- Use `/help` command for quick reference
- Check `.claude/` directory for project configuration
- Review skills in `.claude/skills/` for custom capabilities

## Module 8 Complete! 🎯

You've mastered:
✓ Advanced Git operations (merge, rebase, cherry-pick)
✓ Merge conflict resolution strategies
✓ Git best practices with Claude
✓ Power user techniques
✓ Performance optimization
✓ Common pitfalls and solutions
✓ Comprehensive troubleshooting
✓ Real-world problem-solving
✓ Professional Git workflows

**You're now a Claude Code power user!**

---

## 📋 Git Quick Reference Card

### Branch Management
```bash
# Create and switch
git checkout -b feature/name

# Merge branch
git merge feature/name

# Delete merged branch
git branch -d feature/name
```

### Conflict Resolution
```
1. Identify conflicts: git status
2. Read conflicted files
3. Resolve markers: <<<< ==== >>>>
4. Stage resolved: git add file
5. Complete: git commit
```

### Rebase vs Merge
| Operation | When to Use | Result |
|-----------|-------------|--------|
| Merge | Shared branches | Preserves history |
| Rebase | Local cleanup | Linear history |

### Claude Git Commands
- "Create branch feature/X and switch to it"
- "Help resolve merge conflicts in file.js"
- "Rebase my feature onto main"
- "Cherry-pick commit abc123"
- "Create PR with detailed description"
- "Show uncommitted changes"

### Safety Checklist
- [ ] Reviewed changes with git diff?
- [ ] Commit message descriptive?
- [ ] No sensitive data being committed?
- [ ] Branch name follows convention?
- [ ] Tests pass before committing?

---

**Next**: Module 9 - Context & Memory Management! Type "continue" when ready.
