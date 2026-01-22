#!/bin/bash

# Installation script for learn-claude skill

set -e

SKILL_DIR="${HOME}/.claude/skills/learn-claude"
COMMANDS_DIR="${HOME}/.claude/commands"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Installing learn-claude skill..."
echo ""

# Create directories if they don't exist
mkdir -p "${SKILL_DIR}"
mkdir -p "${COMMANDS_DIR}"

# Copy skill to ~/.claude/skills/
echo "📦 Installing skill to ~/.claude/skills/learn-claude"
cp -r "${SCRIPT_DIR}"/* "${SKILL_DIR}/"

# Copy commands to ~/.claude/commands/ for global discovery
echo "⚡ Installing commands to ~/.claude/commands/"
cp "${SKILL_DIR}/.claude/commands"/*.md "${COMMANDS_DIR}/"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Open Claude Code"
echo "2. Say: 'I want to learn Claude Code'"
echo "3. Or run: /learn"
echo ""
