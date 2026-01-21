# Claude Code Learning System

An interactive, hands-on tutorial system that teaches users to become Claude Code power users through progressive exercises on a real practice project.

## 🎯 Complete Practice Project Included!

**No more "what should I practice on?"** - This skill includes a full Node.js Task Management API with intentional bugs, TODOs, and incomplete features for you to work on. Just copy it and start learning!

## Features

### 📚 Comprehensive 8-Module Curriculum
1. **First Steps** - Basic navigation and interaction
2. **File Operations** - Read, Write, Edit, Grep, Glob mastery
3. **Terminal & Git** - Shell commands and version control
4. **Advanced Tools** - TodoWrite, sub-agents, parallel execution
5. **Customization** - Skills, slash commands, hooks, styles
6. **Web Integration** - WebFetch, WebSearch, Chrome tools
7. **Advanced Workflows** - PRs, CI/CD, MCP, IDE integration
8. **Power User Mastery** - Best practices and real-world scenarios

### 🎮 Interactive Learning
- Hands-on exercises after each concept
- Real tasks in the included practice project
- Progressive difficulty that builds on prior learning
- Checkpoints ensure mastery before advancing
- All exercises reference specific files

### 📊 Progress Tracking
- Automatic progress saving (`.learn-progress.json`)
- Achievement system with milestones
- Encouraging messages throughout
- Resume from where you left off

### ⚡ Slash Commands
- `/learn` - Start or resume the tutorial
- `/learn-status` - Check your progress
- `/practice` - Get random practice exercises
- `/learn-reset` - Start fresh

### 🪝 Smart Hook Integration
- Tracks learning activity automatically
- Awards achievements at milestones
- Provides contextual encouragement
- Seamless progress persistence

## Quick Start

### Step 1: Copy the Practice Project

```bash
# Navigate to where you want to learn
cd ~/learning  # or wherever you like

# Copy the practice project
cp -r /path/to/skills/learn-claude/practice-project ./

# Enter the project
cd practice-project
```

### Step 2: Install the Skill

**For Project-Specific Learning:**
```bash
cp -r /path/to/skills/learn-claude .claude/skills/
```

### For Global Learning (All Projects)
Install globally in your Claude config:

```bash
cp -r learn-claude ~/.claude/skills/
```

### Hook Setup (Optional but Recommended)
If you want progress tracking and achievements:

```bash
# Copy hooks to your project
cp learn-claude/.claude/hooks/learning-progress.js /path/to/your/project/.claude/hooks/

# Make executable
chmod +x /path/to/your/project/.claude/hooks/learning-progress.js
```

Add to your `.claude/config.json`:
```json
{
  "hooks": {
    "user-prompt-submit": [
      ".claude/hooks/learning-progress.js"
    ]
  }
}
```

### Command Setup (Optional)
Copy slash commands to your project or global config:

```bash
# Project-specific
cp -r learn-claude/.claude/commands/* /path/to/your/project/.claude/commands/

# Global
cp -r learn-claude/.claude/commands/* ~/.claude/commands/
```

## Usage

### Start Learning
Simply say to Claude Code:
- "I want to learn how to use Claude Code"
- "Teach me Claude Code"
- "Start the Claude Code tutorial"
- Or use: `/learn`

### Check Progress
- "How's my learning progress?"
- Or use: `/learn-status`

### Practice Skills
- "Give me a practice exercise"
- Or use: `/practice`

### Reset Progress
- Use: `/learn-reset` (asks for confirmation)

## How It Works

### 🤖 Smart Automatic Progression

The system automatically detects when you complete exercises and advances you to the next one!

**How it works:**
1. **Exercise Detection** - Claude watches for successful tool usage:
   - Exercise 1.1: Completes when you use Read tool
   - Exercise 2.3: Completes when you use Write tool
   - Exercise 4.2: Completes when you launch Explore agent
   - And so on for all 20+ exercises

2. **Automatic Advancement** - No need to say "continue":
   - ✅ "Exercise 1.2 complete! You just learned Glob patterns!"
   - 📊 Progress: 2/22 exercises | Module 1/8
   - 🎯 Automatically moves to Exercise 1.3

3. **Module Completion** - When all exercises in a module are done:
   - 🎉 Module summary and celebration
   - Automatically introduces next module
   - Updates progress file

4. **Smart Resuming** - Never lose your place:
   - "📍 Resuming at Module 2, Exercise 2.3"
   - Shows context of current exercise
   - Never repeats completed work

### The Skill
The main `skill.md` contains:
- Complete curriculum with 8 progressive modules
- Smart progression instructions for Claude
- Automatic exercise completion detection
- Detailed explanations of every Claude Code feature
- Hands-on exercises that require user completion
- Real-world scenarios and best practices
- Quick reference card for graduates

### The Hook
`learning-progress.js` runs automatically:
- Detects learning-related activity
- Saves progress to `.learn-progress.json`
- Awards achievements at milestones
- Provides encouraging messages

### The Progress Helper
`progress-helper.js` manages state:
- Tracks current module and exercise
- Marks exercises complete
- Determines next exercise in sequence
- Checks if modules are complete
- Called by Claude to update progress

### The Commands
Slash commands provide quick access:
- `/learn` - Invokes the skill and loads progress
- `/learn-status` - Shows detailed progress stats
- `/practice` - Generates level-appropriate exercises
- `/learn-reset` - Fresh start option

### Progress File
`.learn-progress.json` tracks:
```json
{
  "currentModule": 2,
  "currentExercise": "2.3",
  "completedModules": [1],
  "exercisesCompleted": ["1.1", "1.2", "1.3", "2.1", "2.2"],
  "moduleCompletionStatus": {
    "1": "completed",
    "2": "in_progress"
  },
  "startedAt": "2025-01-19T...",
  "lastActiveAt": "2025-01-19T...",
  "lastActivity": "completed exercise 2.2",
  "achievements": ["first-module"],
  "toolsUsedInSession": ["Read", "Glob", "Grep"]
}
```

## Learning Path

### Beginner Path (Modules 1-3)
Perfect for new users:
- Basic interaction and file operations
- Terminal commands and git workflow
- Builds foundational understanding

### Intermediate Path (Modules 4-6)
For users with some experience:
- Advanced tools and automation
- Customization and personalization
- Web integration and external resources

### Advanced Path (Modules 7-8)
For power users:
- Complex workflows and CI/CD
- MCP servers and extensions
- Best practices and real-world mastery

## Features

### ✅ What Makes This Great

1. **Learn by Doing** - Not just reading, actual practice
2. **Progressive** - Each module builds on the last
3. **Personalized** - Uses user's actual codebase
4. **Tracked** - Progress saved automatically
5. **Gamified** - Achievements and encouragement
6. **Comprehensive** - Covers every Claude Code feature
7. **Practical** - Real-world scenarios and best practices
8. **Flexible** - Skip ahead or go slow

### 🎯 Learning Outcomes

After completing this tutorial, users will be able to:
- Navigate and interact with Claude Code efficiently
- Use all file operation tools correctly
- Execute git workflows with confidence
- Manage complex tasks with TodoWrite
- Create custom skills and slash commands
- Integrate external resources via web tools
- Set up CI/CD and IDE integration
- Apply best practices to real projects
- Debug and troubleshoot effectively
- Work at power user speed and efficiency

## Advanced Usage

### Custom Practice Exercises
The `/practice` command generates exercises based on:
- Current module level
- User's codebase characteristics
- Previously completed exercises
- Realistic, useful tasks

### Achievement System
Unlock achievements:
- 👣 **First Steps** - Complete Module 1
- ⭐ **Halfway There** - Complete 4 modules
- 💪 **Practice Makes Perfect** - Complete 10 exercises
- 🏆 **Claude Code Master** - Complete all 8 modules

### Integration with Other Skills
This skill can work alongside:
- `frontend-design` - Learn then build
- `doc-coauthoring` - Learn then document
- `webapp-testing` - Learn then test
- Any custom skill - Learn the system, create your own

## Troubleshooting

### Progress Not Saving?
- Ensure hook is executable: `chmod +x .claude/hooks/learning-progress.js`
- Check hook is configured in `.claude/config.json`
- Verify Node.js is installed

### Commands Not Working?
- Confirm commands are in `.claude/commands/` or `~/.claude/commands/`
- Check file names match: `learn.md`, `learn-status.md`, etc.
- Restart Claude Code session

### Skill Not Activating?
- Verify `skill.md` is in `.claude/skills/learn-claude/`
- Try explicit invocation: "Use the learn-claude-code skill"
- Check skill frontmatter is valid YAML

## Contributing

Ideas for enhancements:
- Additional practice exercise types
- More achievements and milestones
- Integration with team learning (shared progress)
- Certification/badges system
- Advanced module on custom MCP servers
- Video walkthrough integration

## License

This learning system is designed to help everyone master Claude Code. Use it, modify it, share it!

## Credits

Built with Claude Code, for Claude Code learners everywhere.

---

**Ready to become a Claude Code power user?** Start now:

```
I want to learn how to use Claude Code
```
