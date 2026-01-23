---
name: learn-claude-code
description: Interactive tutorial to master Claude Code. Use when user wants to learn Claude Code, understand how to use it effectively, or become a power user. Takes users through progressive hands-on exercises covering all features - from basic file operations to creating skills, hooks, MCP setup, and context management. 13 comprehensive modules with gamified achievements.
model: haiku
version: 1.1.0
commands:
  - name: learn
    description: Start or resume the interactive Claude Code learning tutorial
  - name: learn-status
    description: Check your progress in the Claude Code learning tutorial
  - name: modules
    description: View all available learning modules and jump to any module
  - name: practice
    description: Get a random practice exercise to reinforce your Claude Code skills
  - name: celebrate
    description: Show your learning achievements with epic celebration art
  - name: learn-reset
    description: Reset your learning progress to start fresh
  - name: hint
    description: Get progressive hints when stuck on an exercise
  - name: review
    description: Review previous concepts with spaced repetition quizzes
---

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗     ██████╗ ██████╗      ║
║   ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝    ██╔════╝██╔═══██╗     ║
║   ██║     ██║     ███████║██║   ██║██║  ██║█████╗      ██║     ██║   ██║     ║
║   ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝      ██║     ██║   ██║     ║
║   ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗    ╚██████╗╚██████╔╝     ║
║    ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═════╝      ║
║                                                                               ║
║                   ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗██╗   ██╗║
║                   ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗╚██╗ ██╔╝║
║                   ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝ ╚████╔╝ ║
║                   ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗  ╚██╔╝  ║
║                   ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║   ██║   ║
║                   ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝   ║
║                                                                               ║
║              🎓 Interactive Learning • 13 Modules • Gamified Journey 🏆       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

# SKILL INSTRUCTIONS FOR CLAUDE

**CRITICAL - Module Coordinator System:**

This skill uses a **modular architecture**. Modules 1-10 are in separate files in the `modules/` directory.

## How to Load Modules

Based on user's progress, load and present the appropriate module:

**Module Files:**
1. `modules/01-first-steps.md`
2. `modules/02-file-operations.md`
3. `modules/03-terminal-git.md`
4. `modules/04-advanced-tools.md`
5. `modules/05a-skill-creation.md`
6. `modules/05b-slash-commands.md`
7. `modules/05c-hooks-mastery.md`
8. `modules/06-web-integration.md`
9. `modules/07a-pull-requests-cicd.md`
10. `modules/07b-mcp-hands-on.md`
11. `modules/08-advanced-git.md`
12. `modules/09-context-memory.md`
13. `modules/10-power-user-mastery.md`

## Progress Tracking

**IMPORTANT**: All paths must reference the skill installation directory.

**Check Progress:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
```

This outputs:
```json
{
  "currentModule": 1,
  "currentExercise": "1.1",
  "completedModules": [],
  "exercisesCompleted": []
}
```

**Progress file location:** `.learn-progress.json` (created in user's current working directory)

## Exercise Detection & Auto-Progression

When user successfully completes an exercise, **automatically mark it complete**:

**Exercise-to-Tool Mapping:**
- Exercise 1.1 (Read file): Completed when you use Read tool
- Exercise 1.2 (Glob): Completed when you use Glob tool
- Exercise 1.3 (Understanding): Completed when you explain code
- Exercise 2.1 (Multiple files): Completed when you Read 2+ files in parallel
- Exercise 2.2 (Grep search): Completed when you use Grep successfully
- Exercise 2.3 (Write file): Completed when you use Write to create new file
- Exercise 2.4 (Edit file): Completed when you use Edit to modify file
- Exercise 3.1-3.4 (Bash/Git): Completed when you execute the command
- Exercise 4.1 (TodoWrite): Completed when you create todos
- Exercise 4.2 (Explore agent): Completed when you launch Task with subagent_type=Explore
- Exercise 4.3 (Parallel): Completed when you run 3+ tools in one message

**Mark Completion:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-exercise <exercise-id>
```

**Example:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-exercise 1.1
```

**Module Completion:**
When all exercises in a module done:
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-module <num>
```

## Celebration & Gamification

The learning system includes:
- **Algorithmic art** - Personalized celebrations
- **Pop-culture quotes** - Motivational messages
- **Achievement badges** - Unlocked at milestones
- **Progress visualization** - Skill trees and progress bars

The `learning-progress.js` hook handles this automatically. Just focus on teaching!

## Available Commands

This skill provides 6 slash commands for easy access to learning features:

### `/learn`
- **Purpose**: Start or resume the interactive Claude Code learning tutorial
- **When to use**: When you first want to start learning, or to resume your progress
- **Action**: Loads your progress from `.learn-progress.json` and continues from where you left off

### `/learn-status`
- **Purpose**: Check your learning progress with a detailed dashboard
- **When to use**: To see how many modules you've completed, time invested, achievements
- **Shows**: Progress bar, completed exercises, time per category, achievements unlocked

### `/modules`
- **Purpose**: Browse all 13 modules and jump to any one
- **When to use**: To see all available modules, check status, or skip ahead
- **Allows**: Jumping to any module, resuming current module, viewing completion status

### `/practice`
- **Purpose**: Get a random practice exercise at your current level
- **When to use**: Between modules to reinforce learning, or anytime for extra practice
- **Features**: Level-appropriate exercises (beginner/intermediate/advanced), tool tips

### `/celebrate`
- **Purpose**: View your achievements, progress, and celebrate your learning journey
- **When to use**: To see your accomplishments, unlock badges, get motivation
- **Shows**: Progress visualization, all achievements, module completion, motivational quotes

### `/learn-reset`
- **Purpose**: Reset your learning progress and start fresh
- **When to use**: If you want to restart from Module 1
- **Safety**: Asks for confirmation before deleting progress

---

## How to Start a Session

1. **Check if .learn-progress.json exists:**
   ```bash
   ls .learn-progress.json
   ```

2. **If new user:**
   - **FIRST**: Ask which learning path they want to follow
   - Show all 4 options (Fast Track, Quick Start, Full Journey, Customization Focus)
   - Wait for their choice (1-4, or ENTER for default Fast Track)
   - Store their choice in progress file as `learningPath`
   - **THEN**: Ask which language they want to practice with
   - Show all 5 options (JS, Python, SQL, Java, React)
   - Explain which are most complete vs basic structure
   - Wait for their choice
   - Store language choice and provide setup instructions

3. **Check current progress:**
   ```bash
   node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
   ```

4. **Load appropriate module:**
   - Read module file from `~/.claude/skills/learn-claude/modules/`
   - Present content to user
   - Guide through exercises
   - Auto-detect completions

5. **Advance automatically:**
   - Mark exercises complete as user does them
   - Celebrate milestones
   - Move to next module when ready

---

# Welcome to Claude Code Mastery!

You're about to go through an interactive, gamified learning experience that will transform you from a beginner into a Claude Code power user. This isn't just reading documentation—you'll actually DO things, learn by practice, and build real skills.

## How This Works

This tutorial has **13 progressive modules**, each teaching you specific capabilities:

**Foundations (Modules 1-4):**
1. **First Steps** - Basic navigation and interaction
2. **File Operations** - Reading, writing, editing, searching code
3. **Terminal & Git** - Shell commands and version control
4. **Advanced Tools** - Task management, sub-agents, parallel execution

**Deep Customization (Modules 5A-5C):**
5. **5A: Skill Creation** - Build reusable AI workflows
6. **5B: Slash Commands** - Create custom shortcuts
7. **5C: Hooks Mastery** - Event-driven automation

**Integration & Advanced (Modules 6-10):**
8. **Web Integration** - Fetching docs, searching, browser tools
9. **7A: Pull Requests & CI/CD** - Professional workflows
10. **7B: MCP Hands-On** - Extend Claude with external tools
11. **Advanced Git** - Branches, conflicts, best practices
12. **Context Management** - Memory and optimization
13. **Power User Mastery** - Bring it all together

After each module, you'll complete **hands-on exercises** with automatic detection and celebration!

## ⏱️ Time Investment & Flexibility

**Choose your path:** From 90 minutes to 8 hours - you decide!

### Learning Paths

🚀 **Fast Track (90 minutes)** - Start coding NOW:
- **Modules 1-4 only** (95 min)
- The absolute essentials: Read, Write, Edit, Grep, Bash, Git, TodoWrite, agents
- Perfect for: Time-constrained users, immediate productivity
- **You'll be productive after just 90 minutes!**
- Can explore other modules anytime later

⚡ **Quick Start (2-3 hours)** - Essential + web tools:
- Modules 1-4: Core tools (95 min)
- Module 8: Web integration (35 min)
- Perfect for: Getting productive quickly with web capabilities

🎯 **Full Journey (6-8 hours)** - Complete mastery:
- All 13 modules (425 min)
- Comprehensive coverage of all features
- Recommended for: Power users, custom workflows

🔧 **Customization Focus (3-4 hours)** - Build your own tools:
- Modules 1-4: Foundations (95 min)
- Modules 5A-5C: Skills, commands, hooks (95 min)
- Perfect for: Extending Claude Code with custom skills

---

### 🔥 Recommended: Start with Fast Track

**New to Claude Code?** Start with **🚀 Fast Track** (90 min) to get productive immediately. You'll learn the core tools you need every day. You can always return to explore customization, web tools, and advanced features later.

**Already familiar with basics?** Jump directly to:
- Module 5 (Skills) if you want to build custom workflows
- Module 8 (Web) if you need to fetch documentation
- Use `/modules` to see all options and jump around freely

### Per-Module Time Estimates

**Foundations (95 min total):**
- Module 1: First Steps (15 min)
- Module 2: File Operations (25 min)
- Module 3: Terminal & Git (25 min)
- Module 4: Advanced Tools (30 min)

**Deep Customization (95 min total):**
- Module 5A: Skill Creation (35 min)
- Module 5B: Slash Commands (20 min)
- Module 5C: Hooks Mastery (40 min)

**Integration & Advanced (150 min total):**
- Module 6: Web Integration (35 min)
- Module 7A: Pull Requests & CI/CD (40 min)
- Module 7B: MCP Hands-On (45 min)
- Module 8: Advanced Git (30 min)

**Advanced Mastery (85 min total):**
- Module 9: Context Management (35 min)
- Module 10: Power User Mastery (50 min)

### Your Learning Is Completely Flexible

**You're in control:**
- ✅ **Pause anytime** - Your progress is automatically saved
- ✅ **Resume with `/learn`** - Pick up exactly where you left off
- ✅ **Jump modules with `/modules`** - Skip ahead or review previous modules
- ✅ **Check progress with `/learn-status`** - See completion, time invested, achievements
- ✅ **Learn at your own pace** - No deadlines, no pressure

**Want to jump around?** Go for it! While modules build on each other, you can:
- Start with Module 5C (Hooks) if that's what you need now
- Review Module 2 (File Operations) if you need a refresher
- Skip to Module 7B (MCP) if you want to integrate external tools

**Your progress is tracked automatically** - come back anytime!

---

## 🎯 Choose Your Learning Path

**Which path is right for you?**

**1. 🚀 Fast Track (90 minutes)** [RECOMMENDED FOR NEW USERS]
   - Get productive NOW with core essentials
   - Modules 1-4 only
   - Perfect for time-constrained users

**2. ⚡ Quick Start (2-3 hours)**
   - Core tools + web integration
   - Modules 1-4, 8
   - Great balance of speed and coverage

**3. 🎯 Full Journey (6-8 hours)**
   - Complete mastery of all features
   - All 13 modules
   - For power users and custom workflows

**4. 🔧 Customization Focus (3-4 hours)**
   - Learn to extend Claude Code
   - Modules 1-4, 5A-5C
   - Build custom skills and hooks

**Type 1, 2, 3, or 4 (or just press ENTER for Fast Track):**

---

*[WAIT FOR USER TO CHOOSE PATH BEFORE CONTINUING]*

---

## 🎯 Your Practice Project

**IMPORTANT**: This skill includes practice projects in 5 languages!

Now, **which language would you like to practice with?**

### Option 1: JavaScript/Node.js ⭐ RECOMMENDED - Most Complete
- **What**: Express REST API (16 files, ~900 lines)
- **Includes**: Full test suite, authentication, tasks, bugs, TODOs
- **Best for**: Web developers, full-stack engineers
- **Status**: ✅ Complete with comprehensive examples

### Option 2: Python/Flask ⭐ RECOMMENDED - Most Complete
- **What**: Flask REST API (13 files, ~530 lines)
- **Includes**: pytest tests, Pythonic patterns, bugs, TODOs
- **Best for**: Python developers, data engineers, ML engineers
- **Status**: ✅ Complete with comprehensive examples

### Option 3: SQL ⭐ RECOMMENDED - Most Complete
- **What**: Database schema and queries (7 files, ~355 lines)
- **Includes**: PostgreSQL/MySQL/SQLite, views, indexes, bugs, TODOs
- **Best for**: Database engineers, data analysts, backend devs
- **Status**: ✅ Complete with comprehensive examples

### Option 4: Java/Spring Boot - Basic Structure
- **What**: Spring Boot API (5 core files, ~350 lines)
- **Includes**: pom.xml, models, configuration, bugs, TODOs
- **Best for**: Java developers, enterprise engineers
- **Status**: ⚠️ Basic structure (demonstrates patterns but less complete)

### Option 5: React/TypeScript - Basic Structure
- **What**: React UI (4 core files, ~260 lines)
- **Includes**: Components, types, hooks, bugs, TODOs
- **Best for**: Frontend developers, UI engineers
- **Status**: ⚠️ Basic structure (demonstrates patterns but less complete)

---

**Please choose (1-5):** Which language would you like to use?

---

*[WAIT FOR USER TO CHOOSE BEFORE CONTINUING]*
