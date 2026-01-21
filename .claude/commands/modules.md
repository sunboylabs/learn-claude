---
description: View all available learning modules and jump to any module
---

**IMPORTANT:** Load module metadata and progress, then display the beautiful module selection menu.

## Instructions:

1. **Load module metadata** - Read this file:
   `~/.claude/skills/learn-claude/module-metadata.json`

2. **Load progress file** (if exists) - Try to read:
   `./.learn-progress.json`

   If it doesn't exist, assume new user (no completed modules, current module = 1).

3. **Display the module selection menu** - Format it like this:

```
╔══════════════════════════════════════════════════════════════════════════╗
║  Claude Code Mastery - All Modules                                      ║
╚══════════════════════════════════════════════════════════════════════════╝

📚 FOUNDATIONS (95 min) - Essential for all users
  1. ✅  First Steps                    [15 min] Basic navigation
  2. ✅  File Operations                [25 min] Read, Write, Edit, Grep
  3. 🔄  Terminal & Git                 [25 min] Shell & version control
  4. ⭕  Advanced Tools                 [30 min] Agents & parallel execution

🎨 DEEP CUSTOMIZATION (95 min) - Build your own workflows
  5. ⭕  5A: Skill Creation            [35 min] Reusable AI workflows
  6. ⭕  5B: Slash Commands            [20 min] Custom shortcuts
  7. ⭕  5C: Hooks Mastery             [40 min] Event-driven automation

🔗 INTEGRATION & ADVANCED (150 min) - Professional workflows
  8. ⭕  Web Integration               [35 min] Fetch docs, search, browser
  9. ⭕  7A: Pull Requests & CI/CD     [40 min] GitHub Actions, GitLab CI
 10. ⭕  7B: MCP Hands-On              [45 min] External tool integration
 11. ⭕  Advanced Git                  [30 min] Branches, conflicts, rebase

🚀 ADVANCED MASTERY (85 min) - Power user techniques
 12. ⭕  Context Management            [35 min] Memory optimization
 13. ⭕  Power User Mastery            [50 min] Real-world projects

──────────────────────────────────────────────────────────────────────────
Progress: 2/13 modules (15%) | Time invested: 0.7 hours | 6.4 hours remaining
Current: Module 3 - Terminal & Git
──────────────────────────────────────────────────────────────────────────
```

**Legend:**
- ✅ Completed module
- 🔄 Current module (in progress)
- ⭕ Not started

4. **Ask user for navigation choice:**
```
What would you like to do?

• Type a module number (1-13) to jump to that module
• Type "continue" to resume Module 3 (Terminal & Git)
• Type "status" to see detailed progress with /learn-status

Your choice:
```

5. **When user chooses a module number**:
   - Validate it's between 1-13
   - Show module preview from metadata:
   ```
   ╔══════════════════════════════════════════════════════════════╗
   ║  Module 7: 5C - Hooks Mastery                                ║
   ╚══════════════════════════════════════════════════════════════╝

   ⏱️  Estimated time: 40 minutes
   📝 Exercises: 4 hands-on exercises
   🎯 Difficulty: Advanced

   What you'll learn:
   • Hook types and event interception
   • Node.js scripting for automation
   • Building a commit validator
   • Creating custom validation logic

   Topics covered: Hook types, Node.js scripting, Event interception, Validation

   Ready to start Module 7? (yes/no)
   ```

6. **When user confirms**:
   - Read the module file: `~/.claude/skills/learn-claude/modules/[module-id].md`
   - Update `.learn-progress.json`:
     ```bash
     node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js start-exercise [first-exercise-id]
     ```
   - Display the module content to the user
   - Guide them through exercises

7. **When user types "continue"**:
   - Resume their current module from progress file
   - Load the appropriate module file
   - Continue from where they left off

**This command enables:**
- ✅ Visual overview of all modules with time estimates
- ✅ Easy navigation - jump to any module
- ✅ Clear progress tracking with completion status
- ✅ Flexible learning - go forward, backward, or skip around
- ✅ Module previews before committing time
