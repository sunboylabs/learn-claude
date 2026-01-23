# Module 7A: Pull Requests & CI/CD 🚀

## ⚡ Quick Summary

This is a comprehensive module covering professional Git workflows and automation. Here's what you'll master:

- Create professional pull requests with gh CLI
- Set up GitHub Actions and GitLab CI/CD pipelines
- Integrate Claude into your IDE (VS Code, JetBrains)
- Automate code review, testing, and deployment
- Handle CI failures and merge conflicts
- **Estimated time: 40-45 minutes**

**Module sections:** 5 major parts • 5 hands-on exercises • 6 real-world scenarios

---

## 📚 Module Contents

**Part 1: Pull Request Fundamentals** (Lines 1-360)
- [Understanding Pull Requests](#understanding-pull-requests)
- [How Claude Creates Pull Requests](#how-claude-creates-pull-requests)
- [Exercise 7A.1: Create Your First PR](#hands-on-exercise-7a1-create-your-first-pr)
- [PR Best Practices](#pr-best-practices)
- [Exercise 7A.2: Multi-Commit PR](#hands-on-exercise-7a2-multi-commit-pr)

**Part 2: GitHub Actions** (Lines 361-643)
- [CI/CD Integration](#cicd-integration)
- [GitHub Actions Setup](#github-actions-integration)
- [Exercise 7A.3: Setup CI/CD](#hands-on-exercise-7a3-setup-cicd)

**Part 3: GitLab CI/CD** (Lines 644-895)
- [GitLab CI Configuration](#gitlab-ci-integration)
- [Complete Pipeline Example](#complete-gitlab-pipeline)

**Part 4: IDE Integration** (Lines 896-1136)
- [VS Code Deep Dive](#vs-code-integration)
- [JetBrains Integration](#jetbrains-integration)
- [Exercise 7A.4: IDE Workflow](#hands-on-exercise-7a4-ide-workflow)

**Part 5: Real-World Workflows** (Lines 1137-1780)
- [Real-World Scenarios](#real-world-scenarios)
- [Common Pitfalls](#common-pitfalls)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Exercise 7A.5: Handle CI Failure](#hands-on-exercise-7a5-handle-ci-failure)
- [Best Practices Summary](#best-practices-summary)

---

## What You'll Learn

Master professional Git workflows and automation! Instead of just learning commands, you'll **create real PRs** and **build CI/CD pipelines**.

You'll master:
- **Pull request creation** - Professional PR workflow with Claude
- **Multi-commit analysis** - How Claude reviews ALL commits
- **CI/CD integration** - GitHub Actions, GitLab CI, and more
- **IDE integration** - Deep dive into VS Code and JetBrains
- **Team collaboration** - Best practices for working with others
- **Automation strategies** - Code review, testing, deployment

---
📍 **Section 1 of 9** • ⏱️ ~40 min total

---

# 📖 PART 1: Pull Request Fundamentals
*Learn to create professional PRs with Claude Code*

---

### 🎯 Quick Win (30 seconds)

Before diving in, try this: "Show me the status of my git repository"

Watch Claude check your current branch, changes, and commits!

---

## Understanding Pull Requests

### What is a Pull Request?

A **pull request (PR)** is a request to merge changes from one branch into another.

**Think of it as:** A formal proposal to merge your code!

### Why Use Pull Requests?

**Benefits:**
- **Code review** - Team members review before merge
- **Discussion** - Comment on specific lines
- **Testing** - CI/CD runs automated tests
- **Documentation** - PR description explains changes
- **History** - Clear record of what changed and why

### PR Workflow

```
1. Create feature branch
2. Make commits
3. Push branch to remote
4. Create pull request
5. Code review & discussion
6. CI/CD runs tests
7. Make requested changes
8. Merge when approved
```

### Complete PR & CI/CD Workflow Diagram

```
Developer Workflow                    CI/CD Automation
─────────────────                    ─────────────────

1. git checkout -b feature/new
   └─> Code changes
       └─> git commit -m "..."
           └─> git push

2. "Create pull request"
   └─> Claude analyzes ALL commits ─┐
       └─> Reviews full diff        │
           └─> Creates PR desc      │
                                    │
3. PR Created on GitHub <───────────┘
   └─> Triggers GitHub Actions
       ├─> Lint Check
       ├─> Unit Tests
       ├─> Integration Tests
       └─> Claude Code Review
           └─> Posts comments

4. Review Feedback
   ├─> Human reviewers comment
   └─> Claude highlights issues
       └─> Make fixes
           └─> git push (CI re-runs)

5. Approval + CI Passing
   └─> Merge to main
       └─> Deploy to production
```

### The Pull Request Lifecycle

**Draft Phase:**
- Create PR as draft
- Continue development
- Run CI checks
- Self-review changes

**Review Phase:**
- Mark PR as ready for review
- Request reviewers
- Address feedback
- Make changes as needed

**Merge Phase:**
- Approval received
- CI passing
- No conflicts
- Merge to main

---

## How Claude Creates Pull Requests

### The Complete Flow

When you ask me to create a PR, I follow a comprehensive process:

**Step 1: Review ALL Commits**
```bash
git log main..HEAD
```
I analyze **every commit** on the branch, not just the latest one!

**Step 2: Analyze Full Diff**
```bash
git diff main...HEAD
```
I review all changes since the branch diverged from main.

**Step 3: Check Branch Status**
```bash
git status
git remote -v
```
I verify the branch is up to date and can be pushed.

**Step 4: Draft PR Description**

I create a comprehensive description including:
- Summary of all changes
- Key features/fixes added
- Files affected
- Test plan
- Generated with Claude Code signature

**Step 5: Push and Create PR**
```bash
git push -u origin branch-name
gh pr create --title "..." --body "..."
```

### What Makes Claude's PRs Different

**Standard PR (manual):**
```
Title: Fixed bug
Body: Fixed the bug in the login function
```

**Claude-generated PR:**
```markdown
Title: Fix authentication timeout in login flow

## Summary
- Fix race condition causing timeout on slow networks
- Add retry logic with exponential backoff
- Improve error messages for user feedback
- Add unit tests for retry mechanism

## Files Changed
- src/auth/login.js - Add retry logic
- src/auth/errors.js - New error messages
- tests/auth/login.test.js - Test retry behavior

## Test Plan
- [ ] Test login on slow network (3G simulation)
- [ ] Verify retry happens 3 times before failure
- [ ] Check error message displays correctly
- [ ] Run full auth test suite

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

### Why Multi-Commit Analysis Matters

**Scenario:** You worked on a feature for 3 days and made 12 commits:
```
feat: Initial user authentication setup
chore: Add JWT library
feat: Implement login endpoint
fix: Handle missing credentials
test: Add login tests
refactor: Extract validation logic
feat: Add password hashing
feat: Implement refresh tokens
fix: Token expiration bug
docs: Add authentication docs
test: Add integration tests
chore: Clean up unused imports
```

**What Claude does:**
1. Reads ALL 12 commits
2. Understands the progression of work
3. Identifies the main feature (authentication)
4. Notes supporting changes (tests, docs, fixes)
5. Creates comprehensive summary covering everything

**Result:** Professional PR that tells the complete story, not just "chore: Clean up unused imports"

---

## Hands-On Exercise 7A.1: Create Your First PR

Let's create a real pull request!

### Prerequisites

You need:
- A Git repository
- Changes committed on a branch (not main)
- GitHub CLI installed (`gh`)

**Check GitHub CLI:**
```bash
gh --version
gh auth status
```

If not installed, get it from: https://cli.github.com

Ask me: "Check if GitHub CLI is installed and authenticated"

### Step 1: Prepare a Feature Branch

Create a branch with some changes:

```bash
# Create new branch
git checkout -b feature/add-readme-section

# Make changes to a file
# (You can ask me to help!)

# Commit changes
git add README.md
git commit -m "Add installation section to README"

# Optionally make more commits
git commit -m "Add usage examples"
git commit -m "Add troubleshooting section"
```

Ask me: "Create a feature branch and make some commits"

### Step 2: Ask Claude to Create PR

Once you have commits on a branch, simply ask:

```
"Create a pull request for these changes"
```

Watch what I do:
1. Run `git status` to see the current state
2. Run `git diff main...HEAD` to see all changes
3. Run `git log main..HEAD` to review all commits
4. Draft a comprehensive PR description
5. Push the branch if needed
6. Create PR with `gh pr create`

**Important:** I analyze **ALL commits** on the branch, not just the last one!

### Step 3: Review the Created PR

After I create the PR:

1. Open the URL I provide
2. Review the PR description
3. Check the commits included
4. Look at the test plan

**Notice:**
- Summary explains the "why" not just "what"
- All commits are considered
- Test plan is actionable
- Professional formatting

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7A.1]*

---
📍 **Section 2 of 9** • ⏱️ ~35 min remaining

---

## PR Best Practices

### Commit Messages Before PR

**Good commit messages:**
```
✅ Add user authentication with JWT
✅ Fix memory leak in image processing
✅ Refactor database queries for performance
```

**Bad commit messages:**
```
❌ Fix bug
❌ Update code
❌ WIP
```

**Why it matters:** I read all commits to understand the full scope of changes!

### Branch Naming

**Good branch names:**
```
✅ feature/user-authentication
✅ fix/memory-leak-images
✅ refactor/database-queries
✅ docs/api-documentation
```

**Bad branch names:**
```
❌ mybranch
❌ test
❌ asdf
❌ branch1
```

### PR Size

**Ideal PR:**
- 200-400 lines changed
- Single focused feature or fix
- Easy to review in 15-30 minutes

**Too large:**
- 1000+ lines changed
- Multiple unrelated changes
- Takes hours to review

**Solution:** Break large changes into multiple PRs!

### PR Title Guidelines

**Format:** `[Type] Brief description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**
```
✅ feat: Add user authentication with JWT
✅ fix: Resolve memory leak in image processing
✅ refactor: Optimize database queries
✅ docs: Add API documentation
```

---

## Hands-On Exercise 7A.2: Multi-Commit PR

Practice creating a PR with multiple commits!

**Task: Create a feature with multiple logical commits**

1. Create a new branch:
   ```bash
   git checkout -b feature/enhanced-logging
   ```

2. Make three separate commits:
   - Commit 1: Add logging utility function
   - Commit 2: Integrate logging into main module
   - Commit 3: Add tests for logging

3. Ask me to create a PR

Watch how I analyze **all three commits** and create a comprehensive description covering the entire feature!

Try it: "Create a pull request for my enhanced logging feature"

**Expected behavior:**
- I review all 3 commits
- Summary covers the complete feature
- Test plan includes all aspects
- Description shows progression of work

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7A.2]*

---
📍 **Section 3 of 9** • ⏱️ ~30 min remaining

---

# 📖 PART 2: GitHub Actions & CI/CD
*Automate testing and deployment with Claude Code*

---

### 🎯 Quick Win (1 minute)

Try this: "Check if GitHub CLI is installed and show me my authentication status"

Claude will verify your gh CLI setup before you dive into workflows!

---

## CI/CD Integration

### What is CI/CD?

**CI (Continuous Integration):**
- Automatically build and test code on every push
- Catch errors early
- Ensure code quality

**CD (Continuous Deployment/Delivery):**
- Automatically deploy to staging/production
- Consistent deployment process
- Faster release cycles

### Why Use CI/CD with Claude Code?

**Automated code quality:**
- Run linters automatically
- Execute test suites
- Check code coverage
- Generate documentation
- Perform security scans

**Consistent reviews:**
- Claude reviews every PR
- Same quality standards
- Never forgets to check something
- Provides helpful suggestions

### CI/CD Pipeline Stages

**Typical pipeline:**
```
1. Trigger (push, PR, schedule)
2. Checkout code
3. Install dependencies
4. Lint code
5. Run tests
6. Build artifacts
7. Security scan
8. Deploy (if main branch)
9. Notify team
```

---

## GitHub Actions Integration

### Basic GitHub Actions Workflow

Create `.github/workflows/claude-review.yml`:

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Claude Code
        run: |
          curl -fsSL https://claude.ai/install.sh | bash

      - name: Review PR
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude-code review \
            --pr ${{ github.event.pull_request.number }} \
            --format markdown \
            --output review.md

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');

            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });
```

### Complete CI Pipeline with Claude

Full pipeline: lint, test, build, deploy:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  claude-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Claude
        run: curl -fsSL https://claude.ai/install.sh | bash

      - name: Review changes
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude-code review \
            --focus "security,performance,best-practices" \
            --output review.md

      - name: Post review
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: review
            });

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: dist/

  deploy:
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-output
          path: dist/

      - name: Deploy to production
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          # Your deployment script
          ./deploy.sh
```

### Environment Variables and Secrets

**Setting up secrets in GitHub:**

1. Go to repository settings
2. Navigate to Secrets and Variables > Actions
3. Click "New repository secret"
4. Add `ANTHROPIC_API_KEY`

**Using secrets in workflow:**
```yaml
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  AWS_ACCESS_KEY: ${{ secrets.AWS_ACCESS_KEY }}
```

**Security best practices:**
- ✅ Never hardcode secrets in workflows
- ✅ Use GitHub secrets or environment variables
- ✅ Rotate secrets regularly
- ✅ Limit secret access to specific jobs
- ❌ Never log secrets
- ❌ Don't expose secrets in PR comments

### Caching Dependencies

Speed up CI with caching:

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: |
      ~/.npm
      node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```

### Matrix Builds

Test across multiple versions:

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: [16, 18, 20]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node ${{ matrix.node }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm test
```

### 💡 Real-World Example: Automated PR Reviews

**Scenario:** Your team gets 20+ PRs per day. Manual review becomes a bottleneck.

**Solution with Claude Code:**
1. Set up GitHub Actions workflow with Claude review
2. Every PR automatically gets reviewed for:
   - Security vulnerabilities
   - Performance issues
   - Best practice violations
   - Code quality concerns
3. Claude posts detailed review comments
4. Human reviewers focus on business logic
5. PR cycle time drops from 2 days to 4 hours

**Result:** Team velocity increases 3x while maintaining code quality!

---
📍 **Section 4 of 9** • ⏱️ ~22 min remaining

---

# 📖 PART 3: GitLab CI/CD
*Continuous Integration with GitLab*

---

### 🎯 Quick Win (30 seconds)

Try this: "Show me the structure of my project's CI/CD configuration files"

Claude will find and display any existing CI/CD files (GitHub Actions, GitLab CI, etc.)!

---

## GitLab CI Integration

### Basic GitLab CI Configuration

Create `.gitlab-ci.yml`:

```yaml
stages:
  - lint
  - test
  - review
  - build
  - deploy

variables:
  NODE_VERSION: "18"

lint:
  stage: lint
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run lint
  only:
    - merge_requests
    - main

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm test
    - npm run test:coverage
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

claude-review:
  stage: review
  image: ubuntu:latest
  before_script:
    - apt-get update && apt-get install -y curl git
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - claude-code review --pr $CI_MERGE_REQUEST_IID --output review.md
    - cat review.md
  variables:
    ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY
  only:
    - merge_requests
  artifacts:
    paths:
      - review.md

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main
    - develop

deploy:production:
  stage: deploy
  image: ubuntu:latest
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual
```

### Complete GitLab Pipeline

Full example with all stages:

```yaml
stages:
  - prepare
  - lint
  - test
  - review
  - build
  - deploy
  - notify

.node_template: &node_template
  image: node:18
  before_script:
    - npm ci
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/

prepare:dependencies:
  stage: prepare
  <<: *node_template
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/

lint:code:
  stage: lint
  <<: *node_template
  script:
    - npm run lint

lint:types:
  stage: lint
  <<: *node_template
  script:
    - npm run type-check

test:unit:
  stage: test
  <<: *node_template
  script:
    - npm run test:unit
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

test:integration:
  stage: test
  <<: *node_template
  services:
    - postgres:14
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
  script:
    - npm run test:integration

claude:security-review:
  stage: review
  image: ubuntu:latest
  before_script:
    - apt-get update && apt-get install -y curl git
    - curl -fsSL https://claude.ai/install.sh | bash
  script:
    - |
      claude-code review \
        --focus security \
        --severity high \
        --output security-review.md
  variables:
    ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY
  only:
    - merge_requests
  artifacts:
    paths:
      - security-review.md

build:application:
  stage: build
  <<: *node_template
  script:
    - npm run build
    - npm run test:build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy:staging:
  stage: deploy
  image: ubuntu:latest
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy:production:
  stage: deploy
  image: ubuntu:latest
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://example.com
  only:
    - main
  when: manual

notify:success:
  stage: notify
  script:
    - 'curl -X POST -H "Content-Type: application/json" -d "{\"text\":\"Pipeline succeeded for $CI_COMMIT_REF_NAME\"}" $SLACK_WEBHOOK'
  when: on_success
  only:
    - main

notify:failure:
  stage: notify
  script:
    - 'curl -X POST -H "Content-Type: application/json" -d "{\"text\":\"Pipeline failed for $CI_COMMIT_REF_NAME\"}" $SLACK_WEBHOOK'
  when: on_failure
```

---

## Hands-On Exercise 7A.3: Setup CI/CD

Add Claude Code to your CI/CD pipeline!

**Task: Create a GitHub Actions workflow**

1. **Create workflow file:**
   ```bash
   mkdir -p .github/workflows
   touch .github/workflows/claude-review.yml
   ```

2. **Add basic workflow:**
   - Copy the basic GitHub Actions example above
   - Customize for your project
   - Add your API key as a secret

3. **Test the workflow:**
   - Create a PR
   - Watch the action run
   - Review Claude's comments

4. **Enhance the workflow:**
   - Add linting
   - Add testing
   - Add build step

Ask me: "Help me create a GitHub Actions workflow with Claude Code review"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7A.3]*

---
📍 **Section 5 of 9** • ⏱️ ~18 min remaining

---

# 📖 PART 4: IDE Integration
*Deep VS Code and JetBrains integration*

---

### 🎯 Quick Win (1 minute)

Try this: "Help me check if I have VS Code or any JetBrains IDEs installed"

Claude will scan for installed IDEs and suggest the best integration path!

---

## IDE Integration Deep Dive

### VS Code Integration

**Installation:**

1. Open VS Code
2. Go to Extensions (Cmd+Shift+X / Ctrl+Shift+X)
3. Search for "Claude Code"
4. Click Install

**Features:**

**Inline Suggestions:**
- Type naturally and get completions
- Press Tab to accept
- Press Esc to dismiss

**Chat Panel:**
- Open with Cmd+Shift+C (Mac) or Ctrl+Shift+C (Windows)
- Ask questions about code
- Request refactoring
- Generate tests

**File Context Awareness:**
- Claude sees your open files
- Understands project structure
- Makes context-aware suggestions

**Terminal Integration:**
- Run commands from chat
- See output inline
- Execute multi-step workflows

**Command Palette:**
- Press Cmd+Shift+P / Ctrl+Shift+P
- Type "Claude:"
- See all available commands

**Configuration:**

Create `.vscode/settings.json`:

```json
{
  "claude.apiKey": "${env:ANTHROPIC_API_KEY}",
  "claude.model": "claude-sonnet-4.5",
  "claude.autoSuggest": true,
  "claude.contextFiles": [
    "src/**/*.ts",
    "tests/**/*.test.ts",
    "*.md"
  ],
  "claude.excludePatterns": [
    "node_modules/**",
    "dist/**",
    ".git/**"
  ]
}
```

**Keyboard Shortcuts:**

Create `.vscode/keybindings.json`:

```json
[
  {
    "key": "cmd+shift+c",
    "command": "claude.openChat",
    "when": "editorTextFocus"
  },
  {
    "key": "cmd+shift+r",
    "command": "claude.refactor",
    "when": "editorHasSelection"
  },
  {
    "key": "cmd+shift+t",
    "command": "claude.generateTests",
    "when": "editorTextFocus"
  },
  {
    "key": "cmd+shift+d",
    "command": "claude.explainCode",
    "when": "editorHasSelection"
  }
]
```

**Workflow Example:**

1. **Writing code:**
   - Start typing function
   - Accept inline suggestions
   - Tab through parameters

2. **Refactoring:**
   - Select code block
   - Press Cmd+Shift+R
   - Review suggestions
   - Accept or modify

3. **Testing:**
   - Open file to test
   - Press Cmd+Shift+T
   - Claude generates tests
   - Review and run

4. **Debugging:**
   - Select error
   - Press Cmd+Shift+D
   - Claude explains issue
   - Suggests fixes

### JetBrains Integration

**Supported IDEs:**
- IntelliJ IDEA
- PyCharm
- WebStorm
- PhpStorm
- GoLand
- RubyMine
- CLion
- Rider

**Installation:**

1. Open IDE
2. Go to Settings/Preferences
3. Select Plugins
4. Search "Claude Code"
5. Install and restart

**Features:**

**Intelligent Completions:**
- Context-aware suggestions
- Multi-line completions
- Import statement generation
- Documentation generation

**Code Actions:**
- Quick fixes
- Refactoring suggestions
- Test generation
- Documentation creation

**Tool Windows:**
- Claude Chat window
- Code review panel
- Test generation panel

**Configuration:**

In IDE settings (Settings > Tools > Claude Code):

```
API Key: ${ANTHROPIC_API_KEY}
Model: claude-sonnet-4.5
Context Limit: 200000 tokens
Auto-suggest: Enabled
File Types: *.java, *.kt, *.py, *.js, *.ts
Excluded Paths: build/, .gradle/, node_modules/
```

**Keyboard Shortcuts (IntelliJ):**

```
Cmd+J / Ctrl+J - Show suggestions
Cmd+Shift+A - Open Claude actions
Cmd+Alt+C - Open Claude chat
Cmd+Alt+T - Generate tests
Cmd+Alt+D - Explain code
```

**Workflow Example:**

1. **Writing code:**
   - Type method signature
   - Press Cmd+J for suggestions
   - Select implementation
   - Claude fills in body

2. **Refactoring:**
   - Right-click code
   - Select "Claude > Refactor"
   - Choose refactoring type
   - Preview changes
   - Apply

3. **Testing:**
   - Right-click class
   - Select "Claude > Generate Tests"
   - Claude creates test class
   - Review and customize

4. **Code review:**
   - Open Claude review panel
   - Select files to review
   - Claude analyzes code
   - View suggestions
   - Apply fixes

---

## Hands-On Exercise 7A.4: IDE Workflow

Practice using Claude in your IDE!

**Task: Complete a coding workflow**

**For VS Code users:**

1. Install Claude Code extension
2. Configure API key
3. Open a project
4. Write a new function and accept suggestions
5. Refactor existing code
6. Generate tests for a function

**For JetBrains users:**

1. Install Claude Code plugin
2. Configure in settings
3. Open a project
4. Use intelligent completions
5. Try code actions
6. Generate tests

Ask me: "Help me set up Claude Code in VS Code" or "Help me configure Claude in IntelliJ"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7A.4]*

---
📍 **Section 6 of 9** • ⏱️ ~12 min remaining

---

# 📖 PART 5: Advanced Workflows & Troubleshooting
*Handle real-world challenges with confidence*

---

### 🎯 Quick Win (30 seconds)

Try this: "Show me the most recent commits and check for any potential issues"

Claude will review recent work and flag any concerns before you create a PR!

---

## Real-World Scenarios

### Scenario 1: Feature Branch with Multiple Commits

**Situation:**
You've been working on a feature for 3 days, made 12 commits, and now need to create a PR.

**Workflow:**

1. **Review your commits:**
   ```bash
   git log main..HEAD --oneline
   ```

2. **Check the diff:**
   ```bash
   git diff main...HEAD --stat
   ```

3. **Ask Claude to create PR:**
   ```
   "Create a pull request for my authentication feature"
   ```

4. **Claude analyzes ALL 12 commits:**
   - Understands the progression
   - Identifies key changes
   - Creates comprehensive summary
   - Generates test plan

5. **Result:**
   Professional PR that explains the complete feature, not just the last commit!

### Scenario 2: Handling CI Failures

**Situation:**
You created a PR but CI is failing.

**Workflow:**

1. **Check CI logs:**
   - Open PR
   - Click on failing check
   - Read error messages

2. **Ask Claude for help:**
   ```
   "The CI is failing with this error: [paste error]. Help me fix it."
   ```

3. **Claude analyzes:**
   - Reads error message
   - Checks related code
   - Identifies issue
   - Suggests fix

4. **Apply fix:**
   ```bash
   # Make the fix
   git add .
   git commit -m "Fix CI error: missing dependency"
   git push
   ```

5. **CI re-runs:**
   - Automatically triggered
   - Tests pass
   - PR ready for review

### Scenario 3: Automated Code Review

**Situation:**
You want Claude to review PRs automatically.

**Workflow:**

1. **Setup GitHub Action:**
   ```yaml
   on:
     pull_request:
       types: [opened, synchronize]
   ```

2. **Claude reviews every PR:**
   - Checks code quality
   - Identifies bugs
   - Suggests improvements
   - Posts as comment

3. **Team benefits:**
   - Consistent reviews
   - Catches common issues
   - Frees human reviewers for complex logic
   - Improves code quality

### Scenario 4: Fixing Merge Conflicts

**Situation:**
Your PR has merge conflicts with main.

**Workflow:**

1. **Update your branch:**
   ```bash
   git checkout main
   git pull
   git checkout your-branch
   git merge main
   ```

2. **Conflicts appear:**
   ```
   CONFLICT (content): Merge conflict in src/auth.js
   ```

3. **Ask Claude for help:**
   ```
   "Help me resolve merge conflicts in src/auth.js"
   ```

4. **Claude assists:**
   - Reads both versions
   - Understands intent
   - Suggests resolution
   - Explains choices

5. **Complete merge:**
   ```bash
   git add src/auth.js
   git commit -m "Resolve merge conflicts with main"
   git push
   ```

6. **PR updated:**
   - Conflicts resolved
   - CI runs again
   - Ready for review

### 💡 Real-World Example: CI Pipeline Failure Debug

**Scenario:** Your CI pipeline fails with a cryptic error after 10 minutes of running.

**Problem:** "Error: Cannot find module 'lodash/merge'"

**Claude's Debug Process:**
1. Analyzes error message
2. Checks package.json for dependencies
3. Reviews CI workflow file
4. Identifies issue: dependency not in dependencies, only in devDependencies
5. Suggests fix: Move lodash to dependencies or install with --production=false

**Solution:**
```json
{
  "dependencies": {
    "lodash": "^4.17.21"  // Moved from devDependencies
  }
}
```

**Result:** CI passes, PR merges, team saves hours of debugging time!

---
📍 **Section 7 of 9** • ⏱️ ~8 min remaining

---

## Common Pitfalls

### Pitfall 1: PR Merge Conflicts

**Problem:**
Your branch is behind main and has conflicts.

**Symptoms:**
- "This branch has conflicts that must be resolved"
- Can't merge PR
- CI might not run

**Solution:**
```bash
# Update main
git checkout main
git pull

# Merge main into your branch
git checkout your-branch
git merge main

# Resolve conflicts
# (Use Claude to help!)

# Commit and push
git add .
git commit -m "Resolve merge conflicts"
git push
```

**Prevention:**
- Keep branches short-lived
- Regularly merge main into feature branches
- Create smaller, focused PRs

### Pitfall 2: CI Timeouts

**Problem:**
CI jobs timeout before completing.

**Symptoms:**
- "Job exceeded maximum time limit"
- Builds fail after 1+ hours
- Inconsistent failures

**Causes:**
- Tests take too long
- Installing dependencies is slow
- Inefficient build process

**Solutions:**

1. **Cache dependencies:**
   ```yaml
   - uses: actions/cache@v3
     with:
       path: node_modules
       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
   ```

2. **Parallelize tests:**
   ```yaml
   strategy:
     matrix:
       test-group: [unit, integration, e2e]
   ```

3. **Optimize builds:**
   ```yaml
   - run: npm run build --production
   ```

4. **Increase timeout:**
   ```yaml
   jobs:
     test:
       timeout-minutes: 30
   ```

### Pitfall 3: Missing Environment Variables

**Problem:**
CI fails because required env vars are not set.

**Symptoms:**
- "Error: DATABASE_URL is not defined"
- Tests fail with connection errors
- Deployment fails

**Solution:**

1. **Add secrets in GitHub:**
   - Settings > Secrets and variables > Actions
   - New repository secret

2. **Use in workflow:**
   ```yaml
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL }}
     API_KEY: ${{ secrets.API_KEY }}
   ```

3. **Check in logs:**
   ```yaml
   - name: Check environment
     run: |
       echo "DATABASE_URL is set: ${{ env.DATABASE_URL != '' }}"
   ```

### Pitfall 4: Force Pushing to Main

**Problem:**
Someone force-pushed to main, rewriting history.

**Symptoms:**
- "Your branch is behind and ahead of main"
- Lost commits
- Team confusion

**Prevention:**

1. **Protect main branch:**
   - Settings > Branches > Add rule
   - Branch name pattern: `main`
   - Check "Do not allow force pushes"

2. **Use PRs:**
   - Never push directly to main
   - All changes via PR
   - Require approvals

3. **Train team:**
   - Explain dangers of force push
   - Use `--force-with-lease` if necessary
   - Communicate before any force push

**If it happens:**
```bash
# Find lost commits
git reflog

# Restore from reflog
git reset --hard HEAD@{n}

# Or reset to remote
git fetch origin
git reset --hard origin/main
```

### Pitfall 5: Ignoring Code Review Feedback

**Problem:**
Dismissing reviewer comments without addressing them.

**Symptoms:**
- Multiple back-and-forth rounds
- Frustrated reviewers
- Delayed merges

**Solution:**
- Address every comment
- Ask questions if unclear
- Mark resolved when fixed
- Thank reviewers for feedback

### Pitfall 6: Breaking Production with CI

**Problem:**
CI passes but production breaks.

**Causes:**
- Tests don't cover production scenarios
- Environment differences
- Missing integration tests

**Prevention:**
- Add smoke tests
- Test with production-like data
- Use staging environment
- Monitor deployments

---
📍 **Section 8 of 9** • ⏱️ ~5 min remaining

---

## Troubleshooting Guide

### CI/CD Troubleshooting Workflow

When things go wrong, follow this systematic approach:

```
1. Check CI Logs
   └─> Identify exact error message
       └─> Ask Claude: "Help me understand this CI error: [error]"
           └─> Review suggested fixes
               └─> Apply fix and test
                   └─> Commit and push
                       └─> Monitor CI run

2. If CI Still Fails
   └─> Check environment variables
       └─> Verify dependencies
           └─> Test locally
               └─> Review workflow file
                   └─> Ask Claude for advanced debugging
```

### Common Issues & Solutions

### Issue 1: "gh: command not found"

**Problem:**
GitHub CLI is not installed.

**Solution:**

**macOS:**
```bash
brew install gh
gh auth login
```

**Ubuntu/Debian:**
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
gh auth login
```

**Windows:**
```bash
winget install --id GitHub.cli
gh auth login
```

### Issue 2: CI Action Fails to Authenticate

**Problem:**
Claude Code can't authenticate in CI.

**Symptoms:**
```
Error: ANTHROPIC_API_KEY is not set
Authentication failed
```

**Solution:**

1. **Generate API key:**
   - Visit https://console.anthropic.com
   - Create new API key
   - Copy key

2. **Add to GitHub secrets:**
   - Repository settings
   - Secrets and variables > Actions
   - New repository secret
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key

3. **Use in workflow:**
   ```yaml
   env:
     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
   ```

### Issue 3: PR Description is Empty

**Problem:**
Claude created PR but description is blank.

**Causes:**
- No commits on branch
- Branch is identical to main
- Git history issues

**Solution:**

1. **Check commits:**
   ```bash
   git log main..HEAD
   ```

2. **Check diff:**
   ```bash
   git diff main...HEAD
   ```

3. **If no changes:**
   - Make meaningful commits
   - Ensure changes are committed
   - Push commits

4. **Try again:**
   ```
   "Create a pull request for these changes"
   ```

### Issue 4: IDE Extension Not Working

**Problem:**
Claude Code extension installed but not functioning.

**Symptoms:**
- No suggestions
- Chat panel doesn't open
- Commands not available

**Solution:**

**VS Code:**
1. Check API key is set
2. Reload window (Cmd+Shift+P > Reload Window)
3. Check extension logs (Output > Claude Code)
4. Reinstall extension

**JetBrains:**
1. Verify plugin is enabled
2. Check API key in settings
3. Restart IDE
4. Invalidate caches (File > Invalidate Caches)

### Issue 5: CI Running on Every Commit

**Problem:**
CI runs too frequently, wasting resources.

**Solution:**

Limit when CI runs:
```yaml
on:
  push:
    branches: [main]  # Only main
  pull_request:
    branches: [main]  # Only PRs to main
```

Or use paths:
```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'tests/**'
    paths-ignore:
      - '**.md'
```

### Issue 6: Slow CI Builds

**Problem:**
CI takes 15+ minutes to complete.

**Solutions:**

1. **Cache dependencies:**
   ```yaml
   - uses: actions/cache@v3
   ```

2. **Parallelize jobs:**
   ```yaml
   strategy:
     matrix:
       node: [16, 18, 20]
   ```

3. **Skip unnecessary steps:**
   ```yaml
   if: github.event_name == 'pull_request'
   ```

4. **Use faster runners:**
   ```yaml
   runs-on: ubuntu-latest-4-cores
   ```

---

## Hands-On Exercise 7A.5: Handle CI Failure

Practice debugging CI issues!

**Task: Intentionally break CI and fix it**

1. **Add failing test:**
   ```javascript
   test('this will fail', () => {
     expect(1).toBe(2);
   });
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add failing test"
   git push
   ```

3. **Create PR:**
   ```
   "Create a pull request"
   ```

4. **Watch CI fail:**
   - Open PR
   - See red X
   - Read error

5. **Ask Claude for help:**
   ```
   "The CI is failing. Help me understand why and fix it."
   ```

6. **Fix and push:**
   ```bash
   git add .
   git commit -m "Fix failing test"
   git push
   ```

7. **Watch CI pass:**
   - Green checkmark
   - PR ready

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7A.5]*

---
📍 **Section 9 of 9** • ⏱️ ~2 min remaining

---

### 💡 Real-World Example: Branch Protection Saves the Day

**Scenario:** Junior developer accidentally force-pushes to main, overwriting 3 days of team work.

**Problem:** Without branch protection, commits are lost.

**Solution with Branch Protection:**
1. Repository Settings > Branches > Add Rule
2. Enable:
   - Require pull request reviews (2 reviewers)
   - Require status checks (CI must pass)
   - Do not allow force pushes
   - Do not allow deletions
3. Enable "Require conversation resolution before merging"

**Result:**
- Force push attempt is blocked
- Developer gets clear error message
- Work is safe, developer creates proper PR
- Team avoids 3-day rollback nightmare!

**Prevention is better than recovery!**

---

## Best Practices Summary

### DO ✅

**Pull Requests:**
- ✅ Keep PRs small and focused
- ✅ Write descriptive commit messages
- ✅ Use meaningful branch names
- ✅ Include test plan in PR description
- ✅ Let Claude analyze ALL commits
- ✅ Review PR description before creating
- ✅ Address all review comments
- ✅ Keep PR updated with main

**CI/CD:**
- ✅ Use secrets for sensitive data
- ✅ Cache dependencies
- ✅ Parallelize tests
- ✅ Set reasonable timeouts
- ✅ Test CI locally when possible
- ✅ Monitor CI performance
- ✅ Use matrix builds for multiple versions
- ✅ Add status badges to README

**IDE Integration:**
- ✅ Learn keyboard shortcuts
- ✅ Configure file exclusions
- ✅ Use environment variables for keys
- ✅ Keep extension updated
- ✅ Review suggestions before accepting
- ✅ Customize settings for your workflow

### DON'T ❌

**Pull Requests:**
- ❌ Create massive PRs (1000+ lines)
- ❌ Use vague commit messages
- ❌ Force push to main
- ❌ Skip PR description
- ❌ Ignore merge conflicts
- ❌ Push directly to main
- ❌ Ignore CI failures
- ❌ Dismiss review feedback

**CI/CD:**
- ❌ Hardcode secrets in workflows
- ❌ Skip testing before push
- ❌ Ignore CI failures
- ❌ Run all tests sequentially
- ❌ Leave broken CI for days
- ❌ Deploy without CI passing
- ❌ Use overly permissive secrets
- ❌ Forget to update CI when code changes

**IDE Integration:**
- ❌ Accept all suggestions blindly
- ❌ Commit API keys
- ❌ Ignore security warnings
- ❌ Disable code review
- ❌ Skip testing generated code
- ❌ Install untrusted extensions

---

## 📋 Quick Reference Card

**Essential PR & CI/CD Commands**

### Pull Request Creation

**Basic PR workflow:**
```
"Create a pull request"
"Create a pull request for my [feature] changes"
"Make a PR titled '[Title]' with description '[Summary]'"
```

**What Claude does automatically:**
1. Runs `git status` - Check current state
2. Runs `git log main..HEAD` - Review ALL commits
3. Runs `git diff main...HEAD` - Analyze full diff
4. Drafts comprehensive PR description
5. Pushes branch (if needed)
6. Creates PR with `gh pr create`

**Key point:** Claude analyzes ALL commits on your branch, not just the latest one!

### GitHub CLI (gh) Commands

**Check installation:**
```bash
gh --version
gh auth status
gh auth login
```

**PR management:**
```bash
gh pr create --title "Title" --body "Description"
gh pr list
gh pr view [number]
gh pr status
gh pr checks
gh pr merge [number]
gh pr review [number] --approve
gh pr comment [number] --body "Comment"
```

**Repository info:**
```bash
gh repo view
gh issue list
gh run list
gh run view [run-id]
```

### Git Workflow Commands

**Branch management:**
```bash
# Create feature branch
git checkout -b feature/my-feature

# Check status
git status
git log main..HEAD --oneline

# Review changes
git diff main...HEAD
git diff main...HEAD --stat

# Update from main
git checkout main
git pull
git checkout feature/my-feature
git merge main

# Push to remote
git push -u origin feature/my-feature
```

**Multi-commit workflow:**
```bash
# View all commits on branch
git log main..HEAD

# See detailed commit history
git log --oneline --graph --all

# Review specific commit
git show <commit-hash>

# Amend last commit
git commit --amend -m "Updated message"

# Rebase to clean up history (use carefully!)
git rebase -i main
```

### CI/CD Pipeline Setup

**GitHub Actions basics:**

Create `.github/workflows/ci.yml`:
```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
```

**GitLab CI basics:**

Create `.gitlab-ci.yml`:
```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm test
```

### Environment Variables & Secrets

**GitHub secrets:**
```yaml
# In workflow file
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**Set in GitHub:**
1. Repository Settings
2. Secrets and variables → Actions
3. New repository secret
4. Add name and value

**GitLab variables:**
```yaml
# In .gitlab-ci.yml
variables:
  ANTHROPIC_API_KEY: $ANTHROPIC_API_KEY
```

**Set in GitLab:**
1. Settings → CI/CD
2. Variables → Expand
3. Add Variable
4. Protect if needed

### Common CI Patterns

**Caching dependencies:**
```yaml
# GitHub Actions
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# GitLab CI
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
```

**Matrix builds (test multiple versions):**
```yaml
# GitHub Actions
strategy:
  matrix:
    node: [16, 18, 20]
    os: [ubuntu-latest, macos-latest]
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node }}
```

**Conditional jobs:**
```yaml
# GitHub Actions
if: github.ref == 'refs/heads/main'
if: github.event_name == 'pull_request'

# GitLab CI
only:
  - main
  - merge_requests
```

### Troubleshooting Quick Fixes

**Problem:** "gh: command not found"
```bash
# macOS
brew install gh
gh auth login

# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list
sudo apt update && sudo apt install gh
gh auth login

# Windows
winget install --id GitHub.cli
gh auth login
```

**Problem:** PR has merge conflicts
```bash
git checkout main
git pull
git checkout your-branch
git merge main
# Resolve conflicts in files
git add .
git commit -m "Resolve merge conflicts"
git push
```

**Problem:** CI failing with "Cannot find module"
- **Check:** Is dependency in package.json?
- **Fix:** Add to dependencies (not devDependencies)
- **Or:** Install with `npm ci --include=dev`

**Problem:** CI timeout
- **Add caching:** Cache node_modules
- **Parallelize:** Use matrix builds
- **Increase timeout:** `timeout-minutes: 30`

**Problem:** Secrets not working in CI
- **Check:** Secret name matches exactly
- **Check:** Using correct syntax `${{ secrets.NAME }}`
- **Verify:** Secret is set in repository settings
- **Test:** Echo check (don't echo secret value!)

**Problem:** Empty PR description
- **Check:** `git log main..HEAD` shows commits
- **Check:** `git diff main...HEAD` shows changes
- **Fix:** Make commits, push, try again

### Real-World Workflows

**Complete feature workflow:**
```bash
# 1. Create branch
git checkout -b feature/user-auth

# 2. Make changes and commits
git add .
git commit -m "Add login endpoint"
git commit -m "Add password hashing"
git commit -m "Add tests"

# 3. Ask Claude to create PR
"Create a pull request for my user authentication feature"

# 4. Claude does this automatically:
# - git status
# - git log main..HEAD (reviews ALL 3 commits)
# - git diff main...HEAD
# - Creates comprehensive description
# - git push -u origin feature/user-auth
# - gh pr create --title "..." --body "..."

# 5. CI runs automatically
# 6. Address review feedback
git add .
git commit -m "Address review comments"
git push

# 7. CI re-runs
# 8. Merge when approved
gh pr merge [number]
```

**Handle CI failure workflow:**
```bash
# 1. Check CI logs
gh pr checks

# 2. Ask Claude for help
"The CI is failing with error: [paste error]. Help me fix it."

# 3. Apply fix
git add .
git commit -m "Fix CI error: [description]"
git push

# 4. CI automatically re-runs
# 5. Verify it passes
gh pr checks
```

**Update branch from main:**
```bash
# 1. Fetch latest main
git checkout main
git pull origin main

# 2. Merge into your branch
git checkout feature/my-feature
git merge main

# 3. Resolve any conflicts
# (Ask Claude: "Help me resolve merge conflicts in [file]")

# 4. Push updated branch
git push
```

### PR Best Practices Checklist

**Before creating PR:**
- [ ] Branch has descriptive name (`feature/`, `fix/`, `refactor/`)
- [ ] All commits have meaningful messages
- [ ] Changes are focused (not mixing features)
- [ ] Tests are included
- [ ] Code is formatted/linted
- [ ] No debug code or console.logs
- [ ] No hardcoded secrets

**PR description should include:**
- [ ] Clear title describing the change
- [ ] Summary of what changed (bullet points)
- [ ] Why the change was needed
- [ ] Test plan (how to verify)
- [ ] Screenshots (if UI changes)
- [ ] Related issues/tickets

**During review:**
- [ ] Address all review comments
- [ ] Ask questions if unclear
- [ ] Make requested changes
- [ ] Mark conversations as resolved
- [ ] Keep PR updated with main
- [ ] Ensure CI passes

**Before merging:**
- [ ] All reviews approved
- [ ] CI/CD passing (green checkmarks)
- [ ] No merge conflicts
- [ ] Branch is up to date with main
- [ ] Final testing complete

### Branch Protection Settings

**Recommended protection rules:**

GitHub: Settings → Branches → Add rule

```
Branch name pattern: main

✅ Require pull request reviews before merging
   - Required approvals: 2
   - Dismiss stale approvals

✅ Require status checks to pass before merging
   - Require branches to be up to date
   - Status checks: CI, Tests, Linting

✅ Require conversation resolution before merging

✅ Do not allow force pushes

✅ Do not allow deletions
```

**Why this matters:**
- Prevents accidental direct commits to main
- Ensures code is reviewed
- Guarantees tests pass
- Protects against force push disasters
- Maintains clean history

### IDE Integration Quick Start

**VS Code:**
1. Install "Claude Code" extension
2. Set API key: Settings → Claude → API Key
3. Use shortcuts:
   - `Cmd+Shift+C`: Open chat
   - `Cmd+Shift+R`: Refactor
   - `Cmd+Shift+T`: Generate tests
   - `Cmd+Shift+D`: Explain code

**JetBrains (IntelliJ, PyCharm, WebStorm):**
1. Settings → Plugins → Search "Claude Code"
2. Install and restart
3. Settings → Tools → Claude Code → API Key
4. Use shortcuts:
   - `Cmd+J`: Show suggestions
   - `Cmd+Alt+C`: Open chat
   - `Cmd+Alt+T`: Generate tests

### CI Performance Optimization

**Speed up CI by 3-5x:**

1. **Cache dependencies:**
   ```yaml
   - uses: actions/cache@v3
     with:
       path: |
         ~/.npm
         node_modules
       key: ${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
   ```

2. **Parallelize jobs:**
   ```yaml
   strategy:
     matrix:
       task: [lint, test, build]
   ```

3. **Skip unnecessary jobs:**
   ```yaml
   on:
     push:
       paths-ignore:
         - '**.md'
         - 'docs/**'
   ```

4. **Use faster runners:**
   ```yaml
   runs-on: ubuntu-latest-4-cores
   ```

5. **Optimize test execution:**
   ```yaml
   - run: npm test -- --maxWorkers=2
   ```

### Common Error Messages & Solutions

**"refusing to merge unrelated histories"**
```bash
# Solution: Allow unrelated histories
git pull origin main --allow-unrelated-histories
```

**"Your branch is behind 'origin/main'"**
```bash
# Solution: Pull latest changes
git pull origin main
```

**"CONFLICT (content): Merge conflict in [file]"**
```bash
# Solution: Resolve manually or ask Claude
"Help me resolve merge conflicts in [file]"
```

**"API rate limit exceeded"**
```bash
# Solution: Authenticate gh CLI
gh auth login
```

**"error: failed to push some refs"**
```bash
# Solution: Pull first, then push
git pull origin your-branch
git push origin your-branch
```

### Multi-Commit PR Strategy

**Why Claude reviews ALL commits:**
- Understands progression of work
- Captures complete feature story
- Identifies related changes
- Creates better PR descriptions
- Suggests comprehensive test plans

**Example:** 5-commit feature branch
```
Commit 1: feat: Add database schema
Commit 2: feat: Implement API endpoints
Commit 3: test: Add API tests
Commit 4: docs: Update API documentation
Commit 5: fix: Handle edge case in validation
```

**Claude's PR summary covers:**
- Complete feature (database + API + tests + docs)
- Notes the bug fix
- Suggests testing all components
- Explains the full implementation

**vs. manual PR (often only describes last commit):**
"Fix edge case in validation" ← Misses 90% of the work!

### Advanced Git Commands

**Interactive rebase (clean up commits):**
```bash
git rebase -i main
# Use 'squash' to combine commits
# Use 'reword' to change messages
# Use 'drop' to remove commits
```

**Cherry-pick (apply specific commit):**
```bash
git cherry-pick <commit-hash>
```

**Stash (save work temporarily):**
```bash
git stash save "WIP: feature work"
git stash list
git stash pop
```

**Reset (undo commits):**
```bash
git reset --soft HEAD~1  # Keep changes, undo commit
git reset --hard HEAD~1  # Discard changes and commit
```

**Reflog (recover lost commits):**
```bash
git reflog
git reset --hard HEAD@{n}
```

### Pro Tips

🎯 **Let Claude handle PR complexity:**
Don't summarize yourself - just say "Create a pull request" and Claude analyzes all commits and diffs automatically.

🎯 **Keep branches short-lived:**
Merge within 1-3 days to avoid conflicts and reduce review burden.

🎯 **Use draft PRs for WIP:**
```bash
gh pr create --draft
```
Mark ready when done:
```bash
gh pr ready [number]
```

🎯 **Automate everything:**
- Linting → Pre-commit hooks
- Testing → CI on every push
- Code review → Claude in CI
- Deployment → CD on merge to main

🎯 **Monitor CI performance:**
```bash
gh run list
gh run view [run-id] --log
```

🎯 **Use PR templates:**
Create `.github/pull_request_template.md`:
```markdown
## Summary
[Describe changes]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

---

## Module 7A Complete! 🎯

You've mastered:
✓ Creating professional pull requests with Claude
✓ Understanding how Claude analyzes ALL commits
✓ Setting up GitHub Actions and GitLab CI
✓ Integrating Claude into CI/CD pipelines
✓ Deep VS Code and JetBrains integration
✓ Handling real-world scenarios
✓ Troubleshooting common issues
✓ Best practices for team collaboration

### PR & CI/CD Checklist

Before moving on, ensure you:
- [ ] Created a PR with Claude
- [ ] Understand multi-commit analysis
- [ ] Set up CI/CD workflow
- [ ] Configured IDE integration
- [ ] Handled a CI failure
- [ ] Resolved merge conflicts
- [ ] Know security best practices
- [ ] Understand branch protection

**You're now a PR and CI/CD expert!** You can automate code review, testing, and deployment with confidence.

**Next**: Module 7B - MCP Hands-On Setup!

Type "continue" when ready! 🚀
