# Practice Project Guide

## Overview

The practice project is a fully functional Node.js Task Management API that learners use throughout the tutorial. Instead of asking "what should I practice on?", everything is pre-built with specific things to learn from.

## What's Included

### Complete Application
- **Authentication system** (`src/auth.js`) - Login, token generation
- **Task management** (`src/tasks.js`) - CRUD operations
- **Database layer** (`src/database.js`) - Connection management
- **Utilities** (`src/utils/`) - Validation, logging
- **Tests** (`tests/`) - Unit tests (some incomplete)
- **Documentation** (`docs/api.md`) - API reference
- **Configuration** (`config/config.js`) - Settings
- **Git repository** - Already initialized

### Intentional Learning Opportunities

**Bugs to Find & Fix:**
- Case-sensitive username comparison (auth.js:31)
- Plain text password storage (auth.js:37)
- Type coercion issue with userId (tasks.js:32)
- Weak password validation (validator.js:25)

**TODOs to Complete:**
- Add error handling middleware (index.js:66)
- Implement input validation (auth.js:19, tasks.js:44)
- Add JWT token generation (auth.js:53)
- Complete getTasksByStatus function (tasks.js:83)
- Add more test cases (auth.test.js:32, tasks.test.js:37)
- Enhance API documentation (api.md:106)

**Features to Build:**
- Rate limiting
- Request logging
- Password hashing
- Task filtering by status
- Pagination
- Error handling

## Exercise Mapping

### Module 1: First Steps
- **Exercise 1.1**: Read `README.md` or `package.json`
- **Exercise 1.2**: Find all `.js` files or test files
- **Exercise 1.3**: Explain how authentication works (read `src/auth.js`)

### Module 2: File Operations
- **Exercise 2.1**: Read `src/auth.js` and `tests/auth.test.js` together
- **Exercise 2.2**: Find all TODO comments or BUG markers
- **Exercise 2.3**: Create new file `src/utils/helpers.js` or add test
- **Exercise 2.4**: Fix timeout in `config/config.js` or bug in validator

### Module 3: Terminal & Git
- **Exercise 3.1**: Check git status of practice project
- **Exercise 3.2**: View diff of any changes made
- **Exercise 3.3**: Run `npm test` to see test results
- **Exercise 3.4**: Commit a bug fix or feature

### Module 4: Advanced Tools
- **Exercise 4.1**: "Refactor auth.js to use bcrypt for passwords and add validation"
- **Exercise 4.2**: "How does error handling work across the API?"
- **Exercise 4.3**: Read `package.json`, `README.md`, and `src/index.js` in parallel

### Module 5: Customization
- **Exercise 5.1**: Create `/test-all` command that runs tests and shows results
- **Exercise 5.2**: Explore existing skills

### Module 6: Web Integration
- **Exercise 6.1**: Fetch Express.js or bcrypt documentation
- **Exercise 6.2**: Search for "Node.js authentication best practices"
- **Exercise 6.3**: Learn about VS Code or IDE integration

### Module 7: Advanced Workflows
- **Exercise 7.1**: Create PR for bug fixes
- **Exercise 7.2**: Learn about GitHub Actions (`.github/workflows/test.yml` exists!)
- **Exercise 7.3**: Explore MCP servers

### Module 8: Power User
- **Exercise 8.1**: "Add rate limiting, improve error handling, and create comprehensive tests"

## File Structure

```
practice-project/
├── package.json              # Dependencies and scripts
├── README.md                 # Project overview
├── setup.sh                  # Setup script
├── .gitignore               # Git ignore rules
│
├── src/                     # Source code
│   ├── index.js            # Main entry point (Express server)
│   ├── auth.js             # Authentication (has bugs!)
│   ├── tasks.js            # Task management (TODOs!)
│   ├── database.js         # Database connection
│   └── utils/
│       ├── validator.js    # Input validation (incomplete)
│       └── logger.js       # Logging utility
│
├── tests/                   # Test files
│   ├── run-tests.js        # Test runner
│   ├── auth.test.js        # Auth tests (needs more!)
│   └── tasks.test.js       # Task tests (incomplete)
│
├── config/
│   └── config.js           # Configuration settings
│
├── docs/
│   └── api.md              # API documentation
│
└── .github/workflows/
    └── test.yml            # GitHub Actions CI
```

## Key Features for Learning

### 1. Real Code to Read
- Actual Node.js/Express application
- Multiple interconnected files
- Mix of complete and incomplete code
- Realistic project structure

### 2. Intentional Imperfections
- Bugs that need fixing (security issues, type errors)
- TODOs that need implementation
- Missing tests
- Incomplete features

### 3. Git-Ready
- Already initialized as git repo
- Ready for commits, branches, PRs
- Includes .gitignore
- Has GitHub Actions workflow

### 4. Progressive Complexity
- Module 1: Just read and understand
- Module 2: Find patterns, make small changes
- Module 3: Use git, run commands
- Module 4+: Complex refactoring, feature additions

## Setup Instructions

### For Learners

**Option 1: Copy from skill directory**
```bash
# Navigate to practice location
cd ~/learning

# Copy the project
cp -r ~/.claude/skills/learn-claude/practice-project ./

# Enter and start
cd practice-project
```

**Option 2: Use setup script**
```bash
cd practice-project
./setup.sh
```

### What Setup Does
1. Initializes git repository
2. Creates initial commit
3. Shows project structure
4. Provides next steps

## Using the Project

### Running Tests
```bash
npm test
```

### Starting the Server
```bash
npm start
```

### Viewing Structure
```bash
tree  # or
find . -type f -not -path "./.git/*" -not -path "./node_modules/*"
```

### Git Operations
```bash
git status
git diff
git log
git add .
git commit -m "message"
```

## Benefits of This Approach

### 1. Zero Friction
- No "what should I practice on?"
- No "I don't have a project"
- No setup complexity

### 2. Concrete Exercises
- Specific files to read
- Specific bugs to fix
- Specific features to add
- Measurable progress

### 3. Realistic Practice
- Real code patterns
- Actual project structure
- Common bugs and TODOs
- Professional workflows

### 4. Progressive Learning
- Start simple (read files)
- Build complexity (fix bugs)
- Advanced tasks (add features)
- Professional workflows (PRs, CI/CD)

### 5. Repeatable
- Can reset and start over
- Can branch and experiment
- Can compare solutions
- Can share progress

## Example Learning Flow

```
User: "I want to learn Claude Code"

Claude: "Welcome! Let me check if you have the practice project set up..."
        [Checks for practice-project/]

        "Great! I see the practice project. Let's start with Module 1.

         Exercise 1.1: Read the README

         Try this: 'Read the README.md file and explain what this project does'"

User: "Read the README.md and explain it"

Claude: [Reads file, explains]
        "✅ Exercise 1.1 complete! You just learned file reading!

         📊 Progress: 1/23 exercises | Module 1/8

         Exercise 1.2: Using Glob

         The practice project has multiple JavaScript files. Let's find them!

         Try: 'Find all JavaScript files in the src directory'"

User: "Find all .js files in src"

Claude: [Uses Glob, shows results]
        "✅ Exercise 1.2 complete! You found 6 JavaScript files!

        Next: Let's understand how authentication works..."
```

## Customization

Teachers can:
- Add more bugs
- Add more TODOs
- Change the domain (not tasks, something else)
- Add more complexity
- Create different branches for different paths

## Future Enhancements

Potential additions:
- Multiple practice projects (Python, Go, TypeScript)
- Different complexity levels
- Domain-specific projects (web scraping, data processing)
- Challenge modes (find all 10 bugs!)
- Comparison tools (see how others solved it)
