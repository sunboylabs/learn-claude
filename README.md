# Claude Code Learning System

Interactive tutorial to master Claude Code in 90 minutes to 8 hours. Choose your path, pick a language, and learn by doing with 13 progressive modules and 5 practice projects.

## Quick Start

Just say: **"I want to learn Claude Code"** or run `/learn`

Then choose:
- **Learning path** (Fast Track / Quick Start / Full Journey / Customization Focus)
- **Practice language** (JavaScript, Python, SQL, Java, or React)

**💡 Tip:** For faster interactions while learning, switch to Haiku with:
```
Settings → Model → Claude 3.5 Haiku
```
Haiku is faster and cheaper for exercises, and you can switch back to Claude Sonnet for more complex tasks.

## Features

- **13 comprehensive modules** from basics to power user
- **4 learning paths** - pick your speed (90 min to 8 hours)
- **5 practice projects** in different languages with real bugs
- **Auto-detected progression** - exercises complete as you use tools
- **Gamified** - achievements, celebrations, progress tracking
- **100% local** - all data stays on your machine

## Commands

All commands are fully implemented with colorful dashboards and progress tracking:

```
/learn              Start or resume learning (loads your progress or starts fresh)
/learn-status       Check your progress with detailed dashboard
/modules            Browse all 13 modules and jump to any one
/practice           Get a level-appropriate random exercise
/celebrate          Show your achievements and mastery progress
/learn-reset        Reset your progress (with confirmation)
```

## The 13 Modules

**Foundations (90 min):**
- Module 1: First Steps
- Module 2: File Operations
- Module 3: Terminal & Git
- Module 4: Advanced Tools

**Customization (95 min):**
- Module 5A: Skill Creation
- Module 5B: Slash Commands
- Module 5C: Hooks Mastery

**Integration & Advanced (150 min):**
- Module 6: Web Integration
- Module 7A: Pull Requests & CI/CD
- Module 7B: MCP Hands-On
- Module 8: Advanced Git

**Mastery (85 min):**
- Module 9: Context Management
- Module 10: Power User Mastery

## Practice Projects

Choose the language that fits your workflow:

| Language | Status | Best For |
|----------|--------|----------|
| JavaScript/Node.js | ✅ Complete | Web developers, full-stack |
| Python/Flask | ✅ Complete | Python devs, data engineers |
| SQL | ✅ Complete | Database/backend engineers |
| Java/Spring Boot | ⚠️ Basic | Enterprise Java developers |
| React/TypeScript | ⚠️ Basic | Frontend developers |

## How It Works

The system auto-detects your progress. Use a tool (Read, Write, Grep, Bash, etc.) and exercises complete automatically. No friction—just keep learning.

Progress saves locally in `.learn-progress.json`. Resume anytime with `/learn`.

## Recent Improvements

- **Implemented all slash commands** with full JavaScript functionality
  - `/celebrate` - ASCII art dashboard showing achievements and progress
  - `/learn-status` - Beautiful progress dashboard with time tracking by category
  - `/modules` - Browse all modules with status indicators and jump to any one
  - `/practice` - Level-appropriate random exercises (beginner/intermediate/advanced)
  - `/learn-reset` - Safe progress reset with confirmation
- **Consistent styling** - All commands use the shared colors library for a unified experience
- **Smart progression** - Commands auto-detect your current level and adapt content
- **Progress tracking** - All data persists in `.learn-progress.json` for seamless resumption

## Setup (Optional - comes with the skill)

If installing manually:
```bash
# Add to your .claude/hooks/learning-progress.js
# Enable progress tracking in .claude/config.json
```

That's it. No external data collection, no cloud sync.
