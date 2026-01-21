# Installation Guide

## Quick Start

The Claude Code Learning System consists of:
- **Main Skill** (`skill.md`) - The interactive tutorial
- **Slash Commands** (`.claude/commands/`) - Quick shortcuts
- **Progress Hook** (`.claude/hooks/`) - Automatic tracking
- **Documentation** (`README.md`) - Complete guide

## Installation Methods

### Method 1: Install to Current Project

```bash
# From the skills directory
cd /path/to/your/project

# Create directories if they don't exist
mkdir -p .claude/skills .claude/commands .claude/hooks

# Copy the skill
cp -r /path/to/skills/learn-claude .claude/skills/

# Copy slash commands (optional)
cp learn-claude/.claude/commands/* .claude/commands/

# Copy hook for progress tracking (optional)
cp learn-claude/.claude/hooks/learning-progress.js .claude/hooks/
chmod +x .claude/hooks/learning-progress.js
```

### Method 2: Install Globally (All Projects)

```bash
# Install skill globally
mkdir -p ~/.claude/skills
cp -r /path/to/skills/learn-claude ~/.claude/skills/

# Install commands globally
mkdir -p ~/.claude/commands
cp /path/to/skills/learn-claude/.claude/commands/* ~/.claude/commands/

# Install hook globally
mkdir -p ~/.claude/hooks
cp /path/to/skills/learn-claude/.claude/hooks/learning-progress.js ~/.claude/hooks/
chmod +x ~/.claude/hooks/learning-progress.js
```

### Method 3: Symlink for Development

```bash
# Symlink skill (updates automatically)
ln -s /path/to/skills/learn-claude ~/.claude/skills/learn-claude

# Symlink commands
ln -s /path/to/skills/learn-claude/.claude/commands/* ~/.claude/commands/

# Symlink hook
ln -s /path/to/skills/learn-claude/.claude/hooks/learning-progress.js ~/.claude/hooks/
```

## Configure the Hook (Optional but Recommended)

Edit or create `.claude/config.json`:

```json
{
  "hooks": {
    "user-prompt-submit": [
      ".claude/hooks/learning-progress.js"
    ]
  }
}
```

For global installation:
```json
{
  "hooks": {
    "user-prompt-submit": [
      "~/.claude/hooks/learning-progress.js"
    ]
  }
}
```

## Verify Installation

### Check Skill is Available

In Claude Code, say:
```
What skills do I have?
```

You should see `learn-claude-code` listed.

### Test Invocation

Say to Claude Code:
```
I want to learn how to use Claude Code
```

The skill should activate automatically.

Or invoke directly:
```
Use the learn-claude-code skill
```

### Check Slash Commands

Type `/` in Claude Code to see available commands. You should see:
- `/learn` - Start/resume tutorial
- `/learn-status` - Check progress
- `/practice` - Get practice exercise
- `/learn-reset` - Reset progress

### Test Progress Hook

If the hook is installed correctly:
1. Say: "I want to learn Claude Code"
2. You should see an encouraging welcome message
3. Progress will be tracked in `.learn-progress.json`

## Troubleshooting

### Skill Not Found
- Verify `skill.md` is in `.claude/skills/learn-claude/`
- Check the frontmatter has correct `name: learn-claude-code`
- Restart Claude Code session

### Slash Commands Not Working
- Commands should be in `.claude/commands/` (not in subdirectories)
- File names: `learn.md`, `learn-status.md`, `practice.md`, `learn-reset.md`
- Check each file has proper frontmatter with `description:`

### Hook Not Running
- Verify file is executable: `ls -l .claude/hooks/learning-progress.js`
- Make executable: `chmod +x .claude/hooks/learning-progress.js`
- Check Node.js is installed: `node --version`
- Verify config.json has correct hook configuration
- Check hook permissions aren't blocking execution

### Progress Not Saving
- Ensure current directory is writable
- `.learn-progress.json` should appear after first interaction
- Check file permissions: `ls -la .learn-progress.json`

## File Structure After Installation

### Project-Specific
```
your-project/
├── .claude/
│   ├── config.json (with hook config)
│   ├── skills/
│   │   └── learn-claude/
│   │       ├── skill.md
│   │       ├── README.md
│   │       └── .claude/
│   │           ├── commands/
│   │           └── hooks/
│   ├── commands/
│   │   ├── learn.md
│   │   ├── learn-status.md
│   │   ├── practice.md
│   │   └── learn-reset.md
│   └── hooks/
│       └── learning-progress.js
└── .learn-progress.json (created after first use)
```

### Global
```
~/.claude/
├── config.json (with hook config)
├── skills/
│   └── learn-claude/
│       ├── skill.md
│       └── ...
├── commands/
│   ├── learn.md
│   ├── learn-status.md
│   ├── practice.md
│   └── learn-reset.md
└── hooks/
    └── learning-progress.js
```

## Usage After Installation

### Start Learning
Just say one of:
- "I want to learn how to use Claude Code"
- "Teach me Claude Code"
- "Start the Claude Code tutorial"
- Or use: `/learn`

### Quick Commands
- `/learn` - Start or resume
- `/learn-status` - See progress
- `/practice` - Get exercise
- `/learn-reset` - Start over

### What Gets Created
- `.learn-progress.json` - Your progress file (can be gitignored)

## Recommended .gitignore Entry

Add to your `.gitignore`:
```
.learn-progress.json
```

This keeps learning progress local to each developer.

## Uninstallation

```bash
# Remove skill
rm -rf .claude/skills/learn-claude

# Remove commands
rm .claude/commands/learn*.md .claude/commands/practice.md

# Remove hook
rm .claude/hooks/learning-progress.js

# Remove progress file
rm .learn-progress.json

# Update config.json to remove hook configuration
```

## Next Steps

Once installed, start learning:

```
I want to learn how to use Claude Code
```

Happy learning! 🚀
