# Module 5B: Slash Command Deep Dive ⚡

## What You'll Learn

Slash commands are **quick shortcuts** that invoke specific instructions instantly. They're perfect for repetitive tasks you do often!

You'll master:
- **Command anatomy** - Structure and file format
- **Argument handling** - Making commands flexible
- **Multi-step commands** - Complex workflows
- **Testing commands** - Ensuring reliability
- **Command organization** - Best practices

## What is a Slash Command?

A slash command is a markdown file in `.claude/commands/` that gets invoked with `/command-name`.

**Think of it as:** A keyboard shortcut or alias for common tasks!

### Slash Command vs Skill

| Feature | Slash Command | Skill |
|---------|---------------|-------|
| **Invocation** | `/command` (explicit) | Natural language or Skill tool |
| **Purpose** | Quick, specific tasks | Complex, role-based workflows |
| **Length** | Usually brief | Can be very detailed |
| **Arguments** | Can accept arguments | Context-based |
| **Examples** | `/deploy`, `/test`, `/check` | "code-reviewer", "test-generator" |

**When to create a slash command:**
- You repeat the same request often
- The task is straightforward and focused
- You want a quick shortcut
- The command benefits from arguments

---

## Command Anatomy

### File Location

Commands live in `.claude/commands/`:

```
.claude/
└── commands/
    ├── deploy.md
    ├── check-quality.md
    ├── new-component.md
    └── review-pr.md
```

**Naming Convention:**
- Use kebab-case (lowercase with hyphens)
- Descriptive but concise
- `.md` extension
- Name becomes the command: `check-quality.md` → `/check-quality`

### File Structure

Commands have optional frontmatter + instructions:

```markdown
---
description: Brief description of what this command does
---

[Instructions for Claude in markdown]

Do the following:
1. First step
2. Second step
3. Third step
```

**Frontmatter is optional** but recommended:
```yaml
---
description: Runs linter, tests, and build to check code quality
---
```

The description shows up when users type `/` to see available commands.

---

## Hands-On Exercise 5B.1: Create a Simple Command

Let's create `/check-quality` that runs linter, tests, and build!

**Task: Create `.claude/commands/check-quality.md`**

The command should:
1. Run the linter
2. Run all tests
3. Run the build
4. Report results with pass/fail for each step

**Step-by-Step:**

1. **Create the file**
   Tell me: "Create a new file at `.claude/commands/check-quality.md`"

2. **Add frontmatter**
   ```yaml
   ---
   description: Runs linter, tests, and build to check code quality
   ---
   ```

3. **Write the command instructions**
   ```markdown
   Run a comprehensive quality check:

   1. Run the linter (npm run lint or appropriate command)
   2. Run all tests (npm test or pytest or appropriate)
   3. Run the build (npm run build or appropriate)

   For each step:
   - Show the command you're running
   - Show the output
   - Report ✅ PASS or ❌ FAIL

   At the end, provide a summary:
   - Total checks: 3
   - Passed: X
   - Failed: Y

   If any step fails, suggest how to fix it.
   ```

4. **Test the command**
   Type: `/check-quality`

Watch how I execute all three checks!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5B.1]*

---

## Command Patterns

### Pattern 1: Simple Task

Basic command that does one thing:

```markdown
---
description: Formats all code files in the project
---

Format all code files:
1. Find all source files (use Glob)
2. Run the formatter (prettier, black, etc.)
3. Report how many files were formatted
```

### Pattern 2: Sequential Steps

Command with multiple ordered steps:

```markdown
---
description: Deploys the application to production
---

Deploy to production:

1. **Pre-flight checks:**
   - Verify we're on main branch (git branch --show-current)
   - Verify tests pass (npm test)
   - Verify no uncommitted changes (git status)

2. **Build:**
   - Run production build (npm run build)
   - Verify build succeeded

3. **Deploy:**
   - Deploy to hosting (npm run deploy or appropriate)
   - Wait for deployment to complete

4. **Post-deploy:**
   - Run smoke tests
   - Report deployment URL
   - Tag this release (git tag v$(date +%Y%m%d-%H%M%S))

Report each step as you go.
```

### Pattern 3: Conditional Logic

Command with decision points:

```markdown
---
description: Runs tests, running only changed tests if possible
---

Run tests intelligently:

1. Check git status - are there unstaged changes?
   - If yes: Ask "Commit changes first or test anyway?"

2. Detect test framework:
   - If package.json has "jest": Run jest
   - If requirements.txt has "pytest": Run pytest
   - Otherwise: Ask which test command to use

3. Run tests:
   - If possible, run only tests for changed files
   - Otherwise, run all tests

4. Report results
```

### Pattern 4: Information Gathering

Command that collects and presents data:

```markdown
---
description: Shows comprehensive project information
---

Gather and display project information:

1. **Project basics:**
   - Read package.json or requirements.txt
   - Name, version, description

2. **Dependencies:**
   - List main dependencies (5 most important)
   - Note any outdated dependencies

3. **Structure:**
   - Count source files
   - Count test files
   - Lines of code estimate

4. **Git status:**
   - Current branch
   - Uncommitted changes
   - Last commit message

Present in a nice formatted table or summary.
```

---

## Handling Arguments

Commands can accept arguments that users provide!

### Basic Argument Usage

In your command file:

```markdown
---
description: Creates a new React component with tests and styles
---

Create a new component:

1. Get the component name from the user's command
   - If they provided: /new-component ButtonWidget
   - Component name = "ButtonWidget"
   - If not provided, ask: "What should the component be named?"

2. Create component file: src/components/{ComponentName}.tsx
3. Create test file: src/components/{ComponentName}.test.tsx
4. Create style file: src/components/{ComponentName}.module.css

Use the provided name throughout.
```

### Multiple Arguments

```markdown
---
description: Creates a new API endpoint with method and path
---

Create a new API endpoint:

1. Parse arguments:
   - Format: /new-endpoint GET /api/users/:id
   - Extract: method = "GET", path = "/api/users/:id"
   - If not provided, ask for method and path

2. Create endpoint file in appropriate location
3. Add route handler
4. Add input validation
5. Generate tests

Use the method and path throughout.
```

### Named Arguments

```markdown
---
description: Runs tests with various options
---

Run tests with options:

1. Check for flags in the command:
   - /run-tests --watch → Run in watch mode
   - /run-tests --coverage → Run with coverage
   - /run-tests --verbose → Run with verbose output
   - /run-tests --file=auth.test.js → Run specific file

2. Build the appropriate test command based on flags

3. Execute and report results
```

---

## Hands-On Exercise 5B.2: Create a Command with Arguments

Create `/new-file` that accepts a filename!

**Task: Create `.claude/commands/new-file.md`**

The command should:
- Accept a filename as an argument: `/new-file utils/helper.js`
- Create the file at the specified path
- Add appropriate boilerplate code based on file extension
- Create parent directories if they don't exist

**Requirements:**
- Handle different file types (.js, .py, .sql, .md, .test.js)
- Add appropriate boilerplate:
  - `.js` → module.exports boilerplate
  - `.py` → docstring and main guard
  - `.test.js` → test suite structure
  - `.sql` → comment header
  - `.md` → title and basic structure
- If no argument provided, ask for filename

Test it with: `/new-file src/utils/math-helper.js`

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5B.2]*

---

## Multi-Step Commands

Complex commands can orchestrate entire workflows!

### Example: Pull Request Workflow

```markdown
---
description: Creates a pull request with quality checks
---

Create a pull request:

1. **Pre-PR checks:**
   - Verify tests pass (npm test)
   - Verify linter passes (npm run lint)
   - Verify build succeeds (npm run build)
   - If any fail, stop and report errors

2. **Git operations:**
   - Verify current branch is not main/master
   - Verify branch has commits to push
   - Push branch to remote (git push -u origin HEAD)

3. **Create PR:**
   - Get commit messages for PR description
   - Use gh pr create with title and description
   - Add labels if specified

4. **Post-PR:**
   - Output PR URL
   - Ask: "Would you like me to request reviewers?"
```

### Example: Project Setup

```markdown
---
description: Sets up a new project with all configurations
---

Set up new project:

1. **Initialize:**
   - git init
   - npm init or python -m venv venv
   - Create .gitignore

2. **Configuration files:**
   - Create .prettierrc
   - Create .eslintrc (or .flake8)
   - Create .editorconfig

3. **Directory structure:**
   - Create src/ directory
   - Create tests/ directory
   - Create docs/ directory

4. **Initial files:**
   - Create README.md with project template
   - Create LICENSE
   - Create CONTRIBUTING.md

5. **First commit:**
   - git add .
   - git commit -m "Initial project setup"

Report each step as you complete it.
```

---

## Hands-On Exercise 5B.3: Create a Multi-Step Command

Create `/setup-feature` that sets up everything for a new feature!

**Task: Create `.claude/commands/setup-feature.md`**

The command should:
1. Accept a feature name as argument: `/setup-feature user-authentication`
2. Create a feature branch: `feature/user-authentication`
3. Create necessary files:
   - Main implementation file
   - Test file
   - Documentation file
4. Add boilerplate code to each file
5. Make initial commit: "Setup: user-authentication feature scaffold"
6. Output summary of what was created

**Requirements:**
- Use the feature name throughout (kebab-case for branch, PascalCase for file names)
- Detect project language (JavaScript vs Python) and create appropriate files
- Add TODO comments in the files marking where to implement
- Handle errors gracefully (e.g., branch already exists)

Test it: `/setup-feature task-filtering`

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5B.3]*

---

## Command Composition

Commands can invoke other commands or skills!

### Calling Other Commands

```markdown
---
description: Full release workflow: checks, tag, deploy, announce
---

Full release process:

1. Run quality checks:
   - /check-quality (invoke the check-quality command)

2. If all checks pass:
   - Create git tag with version
   - Push tag to remote

3. Deploy:
   - /deploy (invoke the deploy command)

4. Announce:
   - Generate release notes from commits
   - Ask: "Should I post release notes?"
```

### Calling Skills

```markdown
---
description: Review code and create PR
---

Review and PR workflow:

1. Code review:
   - Invoke code-reviewer skill on changed files
   - Report findings

2. Ask: "Issues found. Fix them first or create PR anyway?"

3. If fix first:
   - Wait for user to fix
   - Re-review

4. Create PR:
   - /create-pr (invoke create-pr command)
```

---

## Testing Commands

### Test Checklist

Before considering a command complete:

1. **Invocation** - Can you call it easily?
   - Type `/command-name` and it triggers

2. **Functionality** - Does it work?
   - Test with expected inputs
   - Test with missing arguments
   - Test with invalid arguments
   - Test error conditions

3. **Output** - Is it helpful?
   - Clear progress indicators
   - Useful error messages
   - Success confirmation

4. **Efficiency** - Is it fast enough?
   - No unnecessary steps
   - Parallel operations where possible

### Testing Strategy

```markdown
Test matrix:

| Test Case | Command | Expected Result |
|-----------|---------|-----------------|
| Happy path | /cmd arg | Success |
| No args | /cmd | Asks for args or uses defaults |
| Invalid args | /cmd badarg | Clear error message |
| Missing deps | /cmd | Detects and reports |
| Already exists | /cmd existing | Handles gracefully |
```

---

## Hands-On Exercise 5B.4: Test and Debug

Test all your commands with various inputs!

**Task:**
1. Test `/check-quality` in the practice project
2. Test `/new-file` with:
   - Valid path: `/new-file src/test.js`
   - No arguments: `/new-file`
   - Nested path: `/new-file src/utils/deep/nested.js`
3. Test `/setup-feature` with different feature names
4. Fix any issues you discover

**Debug Questions:**
- What happens when something goes wrong?
- Are error messages clear?
- Does it handle edge cases?
- Could instructions be clearer?

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5B.4]*

---

## Advanced Command Techniques

### Technique 1: Environment Detection

```markdown
Detect project environment:

1. Check for package.json → Node.js project
   - Use npm/yarn commands
2. Check for requirements.txt → Python project
   - Use pip/python commands
3. Check for pom.xml → Java/Maven project
   - Use mvn commands
4. Check for build.gradle → Java/Gradle project
   - Use gradle commands

Adapt your commands based on detected environment.
```

### Technique 2: Interactive Prompts

```markdown
Interactive deployment:

1. Ask: "Which environment? (staging/production)"
2. Show current git status
3. Ask: "Proceed with deployment to {environment}? (yes/no)"
4. If production, ask: "Have you notified the team? (yes/no)"
5. Proceed only after all confirmations
```

### Technique 3: Progress Tracking

```markdown
Long-running command progress:

1. Run tests (Step 1/5) ⏳
   ✅ Tests passed

2. Build production bundle (Step 2/5) ⏳
   ✅ Build succeeded

3. Upload to server (Step 3/5) ⏳
   ✅ Upload complete

[Continue for all steps]

━━━━━━━━━━━━━━━━━━━━
✅ All steps complete!
```

### Technique 4: Rollback on Failure

```markdown
Safe deployment with rollback:

1. **Create backup:**
   - Save current state
   - Tag as pre-deploy-backup

2. **Deploy:**
   - Run deployment steps
   - If any step fails:
     → Restore from backup
     → Rollback changes
     → Report error

3. **Verify:**
   - Run smoke tests
   - If tests fail:
     → Automatic rollback
```

---

## Real-World Command Examples

### Example 1: `/fix-issues`

```markdown
---
description: Automatically fixes common code issues (formatting, imports, etc.)
---

Fix common issues:

1. **Auto-fix with tools:**
   - Run prettier --write (formatting)
   - Run eslint --fix (linting)
   - Sort imports

2. **Report changes:**
   - Files modified: X
   - Issues fixed: Y

3. **Git status:**
   - Show which files changed
   - Ask: "Commit these fixes?"
```

### Example 2: `/analyze-perf`

```markdown
---
description: Analyzes application performance and suggests optimizations
---

Performance analysis:

1. **Gather metrics:**
   - Bundle size (use webpack-bundle-analyzer or similar)
   - Dependencies size (use npm ls --depth=0)
   - Test execution time

2. **Identify issues:**
   - Large dependencies
   - Unused dependencies
   - Slow tests
   - Large files

3. **Suggest optimizations:**
   - Dependencies to remove or replace
   - Code to lazy-load
   - Tests to optimize

4. **Generate report** in markdown
```

### Example 3: `/sync-deps`

```markdown
---
description: Syncs dependencies across package.json and lock file
---

Sync dependencies:

1. Check for mismatches:
   - Compare package.json versions
   - Compare lock file versions

2. Update if needed:
   - npm install (or yarn install)
   - Report what changed

3. Audit for vulnerabilities:
   - npm audit
   - Report any issues
   - Suggest fixes
```

---

## Command Organization

### Grouping Commands

Use prefixes to organize related commands:

```
.claude/commands/
├── git-clean.md      # Git operations
├── git-sync.md
├── test-all.md       # Testing
├── test-watch.md
├── test-coverage.md
├── deploy-staging.md # Deployment
├── deploy-prod.md
└── new-component.md  # Generators
```

### Command Naming Best Practices

**DO:**
- ✅ Use action verbs: `create-`, `run-`, `check-`, `deploy-`
- ✅ Be specific: `deploy-production` not just `deploy`
- ✅ Use consistent prefixes: `test-*`, `git-*`
- ✅ Keep names short but clear

**DON'T:**
- ❌ Use generic names: `do`, `run`, `go`
- ❌ Use unclear abbreviations: `cr`, `dp`
- ❌ Make names too long: `create-new-component-with-tests-and-styles`

---

## Module 5B Complete! ⚡

You've mastered:
✓ Command anatomy and structure
✓ Handling arguments and flags
✓ Multi-step command workflows
✓ Testing and debugging commands
✓ Advanced command techniques
✓ Command organization

### Command Creation Checklist

Before moving on, ensure you've created:
- [ ] check-quality.md - Quality checking command
- [ ] new-file.md - File generator with arguments
- [ ] setup-feature.md - Multi-step feature setup
- [ ] Tested all commands thoroughly
- [ ] Fixed any bugs discovered

**You're now a command master!** You can create quick shortcuts for any repetitive task.

**Next up**: Module 5C - Hooks Mastery! Ready to automate event-driven workflows?

Type "continue" when ready! 🚀
