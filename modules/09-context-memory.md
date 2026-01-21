# Module 9: Context & Memory Management 🧠

## What You'll Learn

Claude Code has a **limited context window** (like short-term memory). Learning to manage it efficiently is crucial for working with large codebases!

You'll master:
- **# Annotations** - Helping Claude remember important information
- **Context-efficient file reading** - Only loading what you need
- **Avoiding context pollution** - Keeping conversations focused
- **Agent context isolation** - How sub-agents work separately
- **When to start fresh** - Recognizing context overflow

## Understanding Context

Claude's context window is like RAM - it holds:
- This conversation history
- All files you've read
- All tool results
- All my responses

**Think of it as:** A whiteboard that has limited space. Once full, old information gets erased!

### Context Limits

Typical Claude Code session can handle:
- ~50-100 files read (depending on size)
- Thousands of lines of code
- But context fills up faster with:
  - Large files
  - Long conversations
  - Many tool calls
  - Repeated information

### Signs You're Running Low on Context

- Claude seems to "forget" earlier information
- Responses become less accurate
- References to early files are missing
- Performance slows down

**Solution:** Use efficient context management techniques!

---

## # Annotations: Claude's Memory Aid

The **# annotation** is a special comment that helps Claude remember key information across the conversation.

### How It Works

When you use `# context:` or just `#` at the start of your message, you're giving Claude metadata to remember.

### Basic Usage

```
# context: This project uses Python 3.11 with FastAPI

"Now help me add a new endpoint"
```

Claude will remember the Python/FastAPI context even after many exchanges!

### Types of Useful Annotations

**Project Context:**
```
# context: Node.js project, Express v4, MongoDB database, testing with Jest
```

**Current Focus:**
```
# working on: Authentication module refactoring
```

**Important Files:**
```
# key files: src/auth.js (main logic), tests/auth.test.js (tests)
```

**Decisions Made:**
```
# decision: Using bcrypt for password hashing, JWT for tokens
```

**Architecture Notes:**
```
# architecture: MVC pattern, controllers in src/controllers/, models in src/models/
```

---

## Hands-On Exercise 9.1: Using # Annotations

Let's practice using # annotations effectively!

**Task 1: Set Project Context**

At the start of your session, give me context about the practice project:

```
# context: Task Management API, Express.js, has auth and task modules, currently fixing bugs
```

Then ask: "What bugs should I fix first?"

Watch how I use that context!

**Task 2: Update Context as You Work**

After fixing a bug, update the context:

```
# completed: Fixed password validation bug in src/utils/validator.js
# next: Add bcrypt hashing to auth.js
```

Then ask: "Help me implement bcrypt"

I'll remember what you've completed!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 9.1]*

---

## Context-Efficient File Reading

Instead of reading entire files, read **only what you need**.

### Strategy 1: Use Line Ranges

❌ **Inefficient:**
```
"Read src/index.js"  (loads all 300 lines)
```

✅ **Efficient:**
```
"Read lines 50-80 of src/index.js where the auth routes are"
```

### Strategy 2: Parallel Reading with Purpose

❌ **Inefficient:**
```
"Read all files in src/"  (loads everything)
```

✅ **Efficient:**
```
"Read src/auth.js and src/tasks.js, focusing on the authentication logic"
```

### Strategy 3: Use Grep Instead of Reading

❌ **Inefficient:**
```
"Read all files and find TODO comments"  (loads all files)
```

✅ **Efficient:**
```
"Use Grep to find all TODO comments"  (shows only matches)
```

---

## Hands-On Exercise 9.2: Efficient File Reading

Practice context-efficient file operations!

**Task 1: Targeted Line Reading**

The practice project's `src/auth.js` has about 100 lines. Instead of reading the whole file:

Try: "Read lines 30-50 of src/auth.js where the password validation happens"

**Task 2: Grep Instead of Read**

Don't read all files to find bugs. Use:

Try: "Use Grep to find all lines with 'BUG:' in the src/ directory"

**Task 3: Focused Parallel Reading**

Try: "Read the authenticateUser function from src/auth.js and the validatePassword function from src/utils/validator.js"

Watch how I load only what's needed!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 9.2]*

---

## Avoiding Context Pollution

Some operations waste context space without adding value.

### Common Context Wasters

**1. Reading Large Generated Files**
```
❌ "Read package-lock.json"  (10,000+ lines of dependencies)
✅ "Read package.json"  (just what you need)
```

**2. Reading Binary or Minified Files**
```
❌ "Read dist/bundle.min.js"  (compressed, unreadable)
✅ "Read src/index.js"  (source code)
```

**3. Repeated Reading**
```
❌ Reading the same file multiple times
✅ Ask for what you need once, then reference it
```

**4. Overly Broad Searches**
```
❌ "Show me all files"  (too much)
✅ "Find Python files in the src/ directory"  (specific)
```

### Clean Context Strategies

**Strategy 1: Start Fresh When Needed**

If you've been working for a while and context feels cluttered:
- Start a new conversation
- Use # annotations to quickly rebuild context
- Continue where you left off

**Strategy 2: Focus on One Task at a Time**

Don't mix multiple unrelated tasks in one conversation:
```
❌ "Help me with auth, then refactor tasks, then update tests, then fix CI"
✅ "Help me fix the authentication bugs" → complete → new conversation for next task
```

**Strategy 3: Use Summaries**

After completing work, summarize:
```
# summary: Fixed 3 bugs in auth.js - password validation, case sensitivity, token generation
# next session: Need to add bcrypt hashing
```

---

## Hands-On Exercise 9.3: Context Awareness

Practice recognizing and managing context limits!

**Task 1: Context-Heavy vs Context-Light**

Compare these two approaches:

**Approach A (Heavy):**
1. "Read all files in src/"
2. "Read all files in tests/"
3. "Read config.py"
4. "Read README.md"
5. "Now help me fix the auth bug"

**Approach B (Light):**
1. "Use Grep to find 'BUG:' in src/auth.js"
2. "Read just the authenticateUser function from src/auth.js"
3. "Help me fix the bug"

Try Approach B and see how much cleaner it is!

**Task 2: Recognize Context Overflow**

If you notice I'm not referencing earlier information, it might be context overflow.

Try asking: "Do you remember the bug we fixed earlier?"

If I don't, use a # annotation to remind me:
```
# context: We fixed the password validation bug in validator.js by adding min length check
```

---

*[WAIT FOR USER TO COMPLETE EXERCISE 9.3]*

---

## Agent Context Isolation

Sub-agents (like the Explore agent) have their **own separate context**!

### How It Works

When you ask me to launch a sub-agent:
```
"How does authentication work across the codebase?"
```

I launch an Explore agent that:
1. Starts with a **fresh context** (doesn't have our conversation history)
2. Gets the task: "Find authentication-related code"
3. Does its work independently
4. Reports back to me
5. I share the summary with you

### Why This Matters

**Benefits:**
- Sub-agents don't pollute main context
- Can explore large sections without using your context
- Multiple agents can work in "parallel" (conceptually)

**Implications:**
- Agents don't know what we've discussed
- They work from task description only
- Their findings get summarized before coming back

### When to Use Agents

✅ **Use agents for:**
- Exploring large codebases
- Finding patterns across many files
- Complex searches
- When you want to preserve main context

❌ **Don't use agents for:**
- Single file operations (use Read)
- Quick grep tasks (use Grep directly)
- When you need conversation context

---

## Hands-On Exercise 9.4: Agent Context Management

Practice using agents strategically!

**Task 1: Large Exploration with Agent**

Try: "Use the Explore agent to find all TODO comments and BUG markers across the entire practice project"

Watch how the agent works independently and reports back without cluttering our context!

**Task 2: Direct vs Agent Comparison**

Compare these:

**Direct (uses your context):**
```
"Find all files that import 'express'"
```

**Agent (separate context):**
```
"Use Explore agent to map out how the Express app is structured"
```

The agent approach is better for comprehensive exploration!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 9.4]*

---

## Advanced Context Techniques

### Technique 1: Context Checkpoints

At key milestones, create a summary:

```
# checkpoint: Authentication Module Complete
# done:
# - Fixed password validation
# - Added bcrypt hashing
# - Updated tests
# - All tests passing
# next: Move to task management module
```

### Technique 2: Context-Aware Tool Selection

Choose tools based on context impact:

| Tool | Context Impact | When to Use |
|------|---------------|-------------|
| Read | Medium | Specific files you need |
| Grep | Low | Finding patterns |
| Glob | Very Low | Finding file names |
| Edit | Low | Changing known lines |
| Write | Medium | Creating new files |
| Agent | None (isolated) | Large explorations |

### Technique 3: Lazy Loading

Only load information when you need it:

```
# context: Working on auth bug
"What's the bug?"  → I tell you
"Read the relevant function"  → Load only that
"Fix it"  → Make the change
"Done"
```

Don't preemptively load everything!

---

## Context Management Checklist

Before each request, ask yourself:

- [ ] Do I need the full file or just part of it?
- [ ] Can Grep find this without reading files?
- [ ] Should I use an agent for this exploration?
- [ ] Have I added context annotations for important info?
- [ ] Is my context getting cluttered? Should I start fresh?

---

## Module 9 Complete! 🧠

You've mastered:
✓ Using # annotations for memory
✓ Context-efficient file reading (line ranges, focused reads)
✓ Avoiding context pollution
✓ Understanding agent context isolation
✓ Recognizing when to start fresh
✓ Advanced context management techniques

### Context Management Pro Tips

**Remember:**
1. **# annotations** are your friend - use them liberally
2. **Read less, grep more** - Search first, read second
3. **Use line ranges** - Don't load entire large files
4. **Agents for exploration** - Keep your context clean
5. **Start fresh strategically** - Don't fear new conversations
6. **One task at a time** - Focus prevents context bloat
7. **Summarize checkpoints** - Mark progress with # notes

You're now a **context management expert**! This skill will make you 10x more efficient with Claude Code, especially on large codebases.

**Next up**: Module 5A - Skill Creation Mastery! Ready to build your own automation?

Type "continue" when ready! 🚀
