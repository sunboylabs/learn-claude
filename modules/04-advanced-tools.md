# Module 4: Advanced Tools

## What You'll Learn
- **TodoWrite** - Task tracking and project management
- **Task tool** - Launching sub-agents for complex work
- **Parallel execution** - Running multiple operations simultaneously
- **Explore agent** - Specialized codebase exploration

## TodoWrite: Your Project Manager

Claude can maintain a TODO list to track complex tasks:

```
[x] Complete - Task finished
[→] In Progress - Currently working on
[ ] Pending - Not started yet
```

**When Claude uses todos:**
- Multi-step tasks with 3+ actions
- Complex features requiring planning
- User provides multiple requests at once
- Any non-trivial work requiring organization

**Why it matters:**
- See progress in real-time
- Never lose track of what's next
- Understand the full scope of work

## The Task Tool: Sub-Agents

Claude can launch specialized sub-agents for specific jobs:

**Explore Agent** - Fast codebase exploration
- Quick pattern matching
- Keyword searching
- Architecture understanding

**Example**: Instead of running multiple grep/glob commands, the Explore agent searches thoroughly and reports back.

**When to use:**
- "How does authentication work across the codebase?"
- "Find all API endpoints"
- "Where is error handling implemented?"

## Parallel Tool Execution

Claude can run multiple operations simultaneously:

**Examples:**
- Read 5 files at once
- Search multiple patterns in parallel
- Run git status + git diff together
- Install dependencies while analyzing code

**Why it matters**: Speed! Complex tasks finish faster.

## Hands-On Exercise 4.1: TodoWrite in Action

**Task**: Give me a complex request that requires multiple steps.

Examples:
- "Refactor the authentication module to use async/await and add error handling"
- "Set up a new Express API with CORS, logging, and error middleware"
- "Add TypeScript to this project with proper configuration"

Watch how I use TodoWrite to plan and track the work!

---

*[WAIT FOR USER]*

---

## Exercise 4.2: Using the Explore Agent

**Task**: Ask me to explore and explain something complex in your codebase.

Examples:
- "How does the routing system work?"
- "Find and explain all database queries"
- "Where are environment variables used?"

I'll use the Explore agent to thoroughly investigate!

---

*[WAIT FOR USER]*

---

## Exercise 4.3: Parallel Operations

**Task**: Ask me to do multiple independent things at once.

Example: "Show me the package.json, README, and main entry file"

Watch how I execute all three in parallel!

---

*[WAIT FOR USER]*

---

## Module 4 Complete! 🎯

You've mastered:
✓ Understanding TodoWrite for task tracking
✓ Using sub-agents for complex exploration
✓ Parallel tool execution for speed
✓ When to use specialized agents

**Next**: Customization and personalization! Type "continue" when ready.
