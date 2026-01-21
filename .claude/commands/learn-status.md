---
description: Check your progress in the Claude Code learning tutorial
---

**IMPORTANT:** Load module metadata and progress, then display a beautiful status dashboard.

## Instructions:

1. **Load module metadata** - Read this file:
   `~/.claude/skills/learn-claude/module-metadata.json`

2. **Load progress file** (if exists) - Try to read:
   `./.learn-progress.json`

## If .learn-progress.json doesn't exist:
```
You haven't started the Claude Code tutorial yet!

Run /learn to begin your journey to Claude Code mastery.

Total time: 6-8 hours | 13 comprehensive modules | Pause/resume anytime
```

## If progress file exists, show beautiful status:

Use the UI components from `~/.claude/skills/learn-claude/.claude/hooks/lib/ui-components.js` to display:

### 1. Progress Overview
```
╔══════════════════════════════════════════════════════════════╗
║  Claude Code Mastery - Your Progress                        ║
╚══════════════════════════════════════════════════════════════╝

Progress: [████████████░░░░░░░░] 60% (8/13 modules)

⏱️  Time Invested: 4.2 hours
🎯 Current Module: Module 9 - Context Management
✨ Achievements: 5 unlocked
🔥 Streak: 3 days
```

### 2. Module Status List
Show all 13 modules with status:
- ✅ for completed modules
- 🔄 for current module (in progress)
- ⭕ for incomplete modules

Include time estimate for each module.

### 3. Key Stats
- Total exercises completed (e.g., "32/45 exercises")
- Time invested per category:
  - Foundations: X.X hours
  - Customization: X.X hours
  - Integration: X.X hours
  - Advanced: X.X hours
- Estimated time remaining (based on incomplete modules)

### 4. Achievements (if any unlocked)
Display earned achievements with icons and dates

### 5. Encouraging Message
Based on their progress percentage:
- 0-25%: "Great start! You're building a strong foundation."
- 25-50%: "Excellent progress! You're mastering the core tools."
- 50-75%: "You're becoming a power user! Keep it up."
- 75-100%: "Almost there! You're nearly a Claude Code master."
- 100%: "🎉 Congratulations! You've completed the full journey!"

### 6. Next Steps
Suggest what to do next:
- If not finished: "Continue with /learn or jump to any module with /modules"
- If finished: "Review any module with /modules or start building your own workflows!"

**Implementation:** Use `showProgressDashboard()` from ui-components.js and enhance with time data from module-metadata.json.
