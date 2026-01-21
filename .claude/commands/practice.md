---
description: Get a random practice exercise to reinforce your Claude Code skills
---

Generate a practice exercise based on the user's learning progress.

If they haven't started learning yet (.learn-progress.json doesn't exist), give them a basic exercise:
- Module 1-2 level: Simple file operations
- Example: "Find all JavaScript files in the src directory and count how many use async/await"

If they have progress, generate an exercise appropriate to their level:
- Modules 1-2: File operations (Read, Glob, Grep)
- Modules 3-4: Git operations, TodoWrite, sub-agents
- Modules 5-6: Custom slash commands, web fetching
- Modules 7-8: Complex multi-step tasks, PRs, advanced workflows

Make the exercises realistic and useful for their actual codebase.

After they complete the exercise, update their .learn-progress.json to track the exercise completion.
