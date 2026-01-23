# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **learn-claude**, an interactive learning system (skill) for Claude Code that teaches users to master Claude Code through 13 progressive modules with hands-on exercises, gamification, and automatic progress detection.

**NPM Package:** `@sunboylabs/oneskill-learn-claude` (https://www.npmjs.com/package/@sunboylabs/oneskill-learn-claude)
**GitHub:** https://github.com/sunboylabs/learn-claude

## Installation & Setup

### For Users (Installing the Skill)

```bash
# Easiest: Use the installation script
bash /path/to/learn-claude/install.sh

# Or manual installation
cp -r /path/to/learn-claude ~/.claude/skills/learn-claude
cp ~/.claude/skills/learn-claude/.claude/commands/*.md ~/.claude/commands/
```

This installs:
- Skill definition to `~/.claude/skills/learn-claude/`
- All slash commands globally to `~/.claude/commands/`
- Progress tracking system (creates `.learn-progress.json` in user's working directory)

### For Development (Working on This Repo)

No build step required - this is a pure markdown + Node.js skill.

Test locally by symlinking:
```bash
ln -s $(pwd) ~/.claude/skills/learn-claude
cp .claude/commands/*.md ~/.claude/commands/
```

## Architecture

### Core Components

1. **skill.md** - Main skill definition with frontmatter declaring commands
   - Contains orchestration instructions for Claude
   - Declares all 6 slash commands in YAML frontmatter
   - Uses `model: haiku` for faster, cheaper interactions during learning
   - Links to modular content in `modules/` directory

2. **modules/** - 13 separate module files (01-first-steps.md through 10-power-user-mastery.md)
   - Each module is self-contained with exercises and instructions
   - Module IDs: Some use letter suffixes (5A, 5B, 5C, 7A, 7B) to group related content
   - Categories: foundations (1-4), customization (5A-5C), integration (6-8), advanced (9-10)

3. **Progress Tracking System**
   - `.learn-progress.json` - Created in user's working directory, tracks progress
   - `.claude/hooks/progress-helper.js` - Node.js CLI for progress operations
   - `.claude/hooks/learning-progress.js` - Hook that auto-detects tool usage
   - `.claude/hooks/lib/` - Shared libraries (art-generator, colors, etc.)

4. **Practice Projects** - 5 language options in `practice-projects/`
   - JavaScript/Node.js (most complete)
   - Python/Flask (most complete)
   - SQL (most complete)
   - Java/Spring Boot (basic structure)
   - React/TypeScript (basic structure)

5. **Slash Commands** - `.claude/commands/*.md`
   - `/learn` - Start/resume learning
   - `/learn-status` - Progress dashboard
   - `/modules` - Browse all modules
   - `/practice` - Random practice exercises
   - `/celebrate` - Show achievements
   - `/learn-reset` - Reset progress

### Progress Helper CLI

All progress operations use Node.js scripts **installed with the skill** in `~/.claude/skills/learn-claude/.claude/hooks/`:

```bash
# Check current progress
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check

# Mark exercise complete (auto-advances to next)
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-exercise 1.2

# Start exercise
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js start-exercise 2.1

# Complete module (shows celebration art)
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-module 1
```

**CRITICAL:** Always use the full path `~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js` - the skill may be running from a different directory than where it's installed.

### Module Loading Pattern

Claude reads and presents modules dynamically based on user progress:

1. Check progress: `node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check`
2. Load appropriate module: `~/.claude/skills/learn-claude/modules/XX-module-name.md`
3. Present content and exercises to user
4. Auto-detect tool usage and mark exercises complete
5. Celebrate milestones with generated ASCII art

### Exercise-to-Tool Mapping

Exercises complete automatically when user uses specific tools:
- 1.1: Read file → Read tool
- 1.2: Find files → Glob tool
- 2.2: Search code → Grep tool
- 3.1-3.4: Shell/Git → Bash tool
- 4.1: Task management → TodoWrite tool
- 4.2: Explore agent → Task tool with subagent_type=Explore
- 4.3: Parallel execution → 3+ tools in one message

## Learning Paths

Users choose a path at the start:

1. **Fast Track (90 min)** - Modules 1-4 only (RECOMMENDED for new users)
2. **Quick Start (2-3 hours)** - Modules 1-4, 8
3. **Full Journey (6-8 hours)** - All 13 modules
4. **Customization Focus (3-4 hours)** - Modules 1-4, 5A-5C

Stored in `.learn-progress.json` as `learningPath`.

## Configuration Files

- **module-metadata.json** - Structured metadata for all 13 modules (time estimates, topics, difficulty)
- **.learn-config.json** - User preferences (colors, animations, learning pace)
- **.learn-progress.json** - User's learning progress (created in their working directory)

## Important Development Notes

### When Modifying Modules

- Keep module time estimates accurate in both `module-metadata.json` and module files
- Exercise IDs follow pattern: `<module>.<exercise>` (e.g., "1.1", "2.3")
- Module IDs can have letter suffixes: "05a-skill-creation" → Module 5A

### When Adding New Commands

1. Add command to `skill.md` frontmatter under `commands:`
2. Create `.claude/commands/<name>.md` with description in frontmatter
3. Update README.md with command documentation
4. Test command discovery with `/` in Claude Code

### Git Commit Messages

**IMPORTANT:** Do NOT include Claude as co-author in commits. Git commit messages should NOT include:
```
Co-Authored-By: Claude <noreply@anthropic.com>
```

This is a user-specific preference from CLAUDE.md.

### Testing Changes

1. Make changes to skill.md or modules
2. If installed via symlink, changes are immediately live
3. Test with: `/learn` or say "I want to learn Claude Code"
4. Check progress tracking: `node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check`
5. Verify slash commands: Type `/` in Claude Code to see all commands

### Files to Ignore

See `.gitignore` for development/planning docs that aren't part of the skill package:
- Development notes (ENHANCEMENT-PLAN.md, etc.)
- Demo assets (demo.mp4, landing_page.html)
- Brainstorm directory
- User progress files (.learn-progress.json)

## Common Tasks

### Adding a New Module

1. Create `modules/XX-module-name.md` with exercises
2. Update `module-metadata.json` with metadata
3. Update `EXERCISE_SEQUENCE` in `.claude/hooks/progress-helper.js`
4. Update time estimates in skill.md and README.md
5. Add to appropriate learning path in `module-metadata.json`

### Updating Slash Command Logic

Commands are invoked via skill - they expand prompts that reference the skill.
- Command files in `.claude/commands/` are minimal triggers
- Actual logic is in `skill.md` instructions for Claude
- Some commands use Node.js scripts (e.g., `/celebrate` calls art generator)

### Publishing to NPM

Package is `@sunboylabs/oneskill-learn-claude`. Key files for NPM:
- Include: skill.md, modules/, .claude/, practice-projects/, README.md, install.sh
- Exclude: Development docs, .learn-progress.json, demo assets (per .gitignore)

## Key Conventions

- **Progress file location:** Always `.learn-progress.json` in user's current working directory
- **Skill installation path:** `~/.claude/skills/learn-claude/`
- **Module numbering:** 1-13, some with letter suffixes (5A, 5B, 5C, 7A, 7B)
- **Exercise IDs:** `<module>.<number>` format (e.g., "1.1", "2.3", "5.1")
- **Model preference:** Uses Haiku model for faster/cheaper learning interactions
- **Celebration style:** ASCII art with pop culture references and personalization
