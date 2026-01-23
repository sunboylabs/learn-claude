# Module 4: Advanced Tools

## What You'll Learn
- **TodoWrite** - Task tracking and project management
- **Task tool** - Launching sub-agents for complex work
- **Parallel execution** - Running multiple operations simultaneously
- **Explore agent** - Specialized codebase exploration

## ⚡ Quick Summary

- Unlock Claude's advanced capabilities for complex tasks
- Learn how TodoWrite helps manage multi-step projects
- Master parallel tool execution for 3-5x speed improvements
- Use specialized sub-agents for deep codebase exploration
- **Estimated time: 12-15 minutes**

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

### 💡 Real-World Example

**Scenario:** You need to set up a new Express.js API from scratch.

**How Claude Code helps:**
Instead of sequential steps, Claude can:
- **Parallel 1**: Create package.json, server.js, and routes folder
- **Parallel 2**: Install Express, configure middleware, add error handling
- **Parallel 3**: Write tests, create README, setup Git hooks

What would take 20+ minutes of manual work happens in seconds with perfect organization!

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

📍 **Section 2 of 3** • ⏱️ ~8 min remaining

---

### 🎯 Quick Win (30 seconds)

Try this: Ask me to count how many functions are defined in a specific file.
Example: "How many functions are in [filename]?"

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

📍 **Section 3 of 3** • ⏱️ ~2 min remaining

---

## 📋 Quick Reference Card

### TodoWrite Task States

| State | Symbol | Meaning | When Used |
|-------|--------|---------|-----------|
| **Pending** | `[ ]` | Not started | Tasks queued for later |
| **In Progress** | `[→]` | Currently working | ONLY 1 task at a time |
| **Completed** | `[x]` | Finished | Marked immediately when done |

**Task Format:**
- **content**: Imperative form ("Run tests", "Fix bug")
- **activeForm**: Present continuous ("Running tests", "Fixing bug")

### When Claude Uses TodoWrite

**Creates todos for:**
- ✅ 3+ distinct steps required
- ✅ Non-trivial, complex tasks
- ✅ User provides multiple requests
- ✅ Multi-file refactoring
- ✅ Feature implementation

**Skips todos for:**
- ❌ Single straightforward task
- ❌ Trivial operations (<3 steps)
- ❌ Purely conversational requests
- ❌ Simple file reads

### TodoWrite Best Practices

```javascript
// Good: Specific, actionable tasks
[ ] Create user authentication module
[→] Add JWT token validation middleware
[ ] Write unit tests for auth endpoints
[ ] Update API documentation

// Bad: Vague, unclear tasks
[ ] Work on auth
[ ] Fix stuff
[ ] Do the thing
```

**Rules:**
1. Exactly ONE task in_progress at a time
2. Complete current task before starting next
3. Mark complete IMMEDIATELY when done (don't batch)
4. Remove tasks that become irrelevant
5. Break complex tasks into smaller steps

### Task Tool: Sub-Agents

| Agent Type | Purpose | Best For | Example Request |
|------------|---------|----------|-----------------|
| **Explore** | Codebase exploration | Pattern discovery, architecture understanding | "How does routing work?" |
| **Research** | Multi-round investigation | Complex questions needing deep analysis | "Analyze all error handling patterns" |
| **Planning** | Project planning | Breaking down large features | "Plan a user dashboard feature" |

**Explore Agent Capabilities:**
- Fast pattern matching across many files
- Keyword and concept searching
- Architecture mapping
- API endpoint discovery
- Dependency tracking

**When to use Explore:**
```
✅ "Find all database queries"
✅ "How is authentication implemented?"
✅ "Where are API keys used?"
✅ "Map out the service layer"

❌ "Read this one file" → Use Read tool
❌ "Search for 'TODO'" → Use Grep tool
❌ "Find *.js files" → Use Glob tool
```

### Parallel Execution Patterns

**Pattern 1: Reading Multiple Files**
```
User: "Show me package.json, README, and main entry file"
→ Claude executes 3 Read calls simultaneously
→ Responses arrive together
→ 3x faster than sequential
```

**Pattern 2: Independent Operations**
```
User: "Check git status and show me the latest test results"
→ git status (Bash)
→ Read test output file
→ Both run in parallel
```

**Pattern 3: Multi-pattern Search**
```
User: "Find all TODO, FIXME, and HACK comments"
→ 3 Grep calls in parallel
→ Results aggregated
→ Single comprehensive report
```

**When Parallel Execution Happens:**
- Multiple independent file reads
- Simultaneous searches (different patterns)
- Git commands that don't depend on each other
- Mixed tool types (Read + Grep + Bash)

**Speed Benefits:**
| Operation | Sequential | Parallel | Speedup |
|-----------|-----------|----------|---------|
| Read 5 files | 5s | 1s | 5x |
| 3 grep searches | 3s | 1s | 3x |
| Git status + diff + log | 3s | 1s | 3x |

### Decision Matrix: Which Tool?

| Goal | Use This | Not That | Why |
|------|----------|----------|-----|
| Read 1 file | **Read** | cat/Bash | Faster, handles permissions |
| Read 5+ files | **Read (parallel)** | Loop with cat | Simultaneous execution |
| Search content | **Grep** | grep/Bash | Optimized, formatted output |
| Find files | **Glob** | find/Bash | Pattern matching, sorted |
| Multi-step task | **TodoWrite** | Mental tracking | Visible progress |
| Complex exploration | **Task (Explore)** | Manual grep/glob | Thorough, intelligent search |
| Simple bash command | **Bash** | N/A | Git, npm, system ops |

### Advanced Patterns

**Pattern 1: Complex Feature Implementation**
```
User: "Add a new API endpoint with validation and tests"

Claude's approach:
1. TodoWrite tracks all steps
2. Read existing code in parallel
3. Edit multiple files
4. Run tests via Bash
5. Mark todos complete in real-time
```

**Pattern 2: Codebase Understanding**
```
User: "Explain how the app handles user sessions"

Claude's approach:
1. Launch Explore agent
2. Agent searches for session-related code
3. Analyzes patterns across files
4. Returns comprehensive report
5. Much faster than manual exploration
```

**Pattern 3: Refactoring Workflow**
```
User: "Refactor all database queries to use prepared statements"

Claude's approach:
1. TodoWrite creates task list
2. Explore agent finds all queries
3. Read files in parallel
4. Edit files with changes
5. Run tests to verify
6. Complete todos as work progresses
```

### Quick Commands to Try

1. **"Create a new Express API with error handling, logging, and tests"**
   - Watch TodoWrite organize the work
   - See parallel file creation
   - Observe real-time progress updates

2. **"Explain how authentication works in this codebase"**
   - Explore agent searches thoroughly
   - Maps out the authentication flow
   - Identifies all related files

3. **"Show me package.json, tsconfig.json, and .gitignore"**
   - 3 files read in parallel
   - Instant results
   - Clean presentation

4. **"Find all functions that interact with the database"**
   - Explore agent does deep search
   - Categorizes by operation type
   - Shows usage patterns

5. **"Set up TypeScript in this project with proper config"**
   - TodoWrite plans 5+ steps
   - Parallel package installation + file creation
   - Tests configuration automatically

### Common Mistakes to Avoid

❌ **Asking for sequential work when parallel is possible**
- Bad: "First show me file A, then show me file B"
- Good: "Show me files A and B"

❌ **Using Bash for file operations**
- Bad: "Run cat on README.md"
- Good: "Show me README.md"

❌ **Not leveraging Explore agent**
- Bad: Asking for 10 separate grep commands
- Good: "Explore how error handling works across the codebase"

❌ **Expecting todos for trivial tasks**
- Bad: Being surprised Claude doesn't create todos for "read this file"
- Good: Understanding todos are for complex, multi-step work

### Pro Tips

💡 **Tip 1:** For large refactors, start with "explain the plan" before execution
- Lets you review the approach
- Claude will use TodoWrite to show the plan

💡 **Tip 2:** Use parallel reads when investigating issues
- "Show me the error log, config file, and relevant source code"
- All info arrives at once

💡 **Tip 3:** Trust the Explore agent for "how does X work" questions
- It's faster and more thorough than manual searching
- Summarizes findings intelligently

💡 **Tip 4:** Watch todo progress to understand scope
- If todo list grows, task is more complex than expected
- Ask Claude to break it down further if needed

💡 **Tip 5:** Combine tools strategically
- Explore → finds what to change
- TodoWrite → tracks the changes
- Parallel execution → implements fast
- Bash → validates with tests

---

## Module 4 Complete! 🎯

You've mastered:
✓ Understanding TodoWrite for task tracking
✓ Using sub-agents for complex exploration
✓ Parallel tool execution for speed
✓ When to use specialized agents

---
**Navigation:** [← Previous: Terminal & Git](03-terminal-git.md) | [Menu](../README.md) | [Next: Customization →](05-customization.md)

**Progress:** ██████████ 100% through this module
---

**Next**: Customization and personalization! Type "continue" when ready.
