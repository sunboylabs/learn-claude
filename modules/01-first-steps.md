# Module 1: First Steps

## What You'll Learn
- How to communicate with Claude Code effectively
- Basic commands you can use
- How to ask questions about your codebase
- Understanding tool usage (Read, Glob, Grep basics)

## ⚡ Quick Summary

- Learn to give Claude clear, specific requests for maximum effectiveness
- Master basic file reading and pattern matching with Read and Glob tools
- Understand what Claude can and cannot do in your codebase
- Practice hands-on exercises to build confidence
- **Estimated time: 8-10 minutes**

## Core Concepts

Claude Code is an AI assistant that lives in your terminal and can:
- **Read and analyze** any file in your project
- **Search and explore** codebases of any size
- **Write and edit** code with surgical precision
- **Execute commands** via bash
- **Manage complex tasks** with built-in project management
- **Access the web** to fetch docs and search for information

### Communication Style
- Be direct and specific with requests
- Claude can see your entire project but needs you to guide focus
- You can run multiple operations in parallel
- Tool results show you exactly what Claude is doing

### Basic Interaction Patterns

**Good requests:**
- "Read the main.py file and explain what it does"
- "Find all TypeScript files that import React"
- "Create a new function to validate email addresses"

**Even better requests:**
- "Search for all TODO comments in Python files and create a task list"
- "Read app.py and tests/test_app.py, then add tests for the missing edge cases"
- "Find where the authentication logic is implemented and explain the flow"

### 💡 Real-World Example

**Scenario:** You join a new team and need to understand a legacy codebase quickly.

**How Claude Code helps:** Instead of spending hours clicking through files, you can ask:
- "Find all database models and explain the schema"
- "Where is user authentication handled and what library does it use?"
- "Show me all API endpoints and their purposes"

Claude explores the entire codebase in seconds and gives you a comprehensive overview.

## Hands-On Exercise 1.1

Let's start simple. I want you to practice giving me a clear request:

**Task**: Ask me to find and read a specific file in your current project, then explain what it does.

Try it now! Give me a command like: "Find the [file type] file that handles [functionality] and explain it to me"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 1.1 BEFORE CONTINUING]*

---

📍 **Section 2 of 3** • ⏱️ ~5 min remaining

---

### 🎯 Quick Win (30 seconds)

Try this: Ask me to list all files in your current directory.
Example: "Show me all files here" or "List files in this directory"

---

## Exercise 1.2: Using Glob

Now let's practice file searching.

**What is Glob?** It's a tool for finding files by pattern:
- `**/*.py` - All Python files in any directory
- `src/**/*.ts` - All TypeScript files under src/
- `*.json` - JSON files in current directory

**Task**: Ask me to find all files of a specific type in your project. Use a pattern like "Find all [file extension] files" or "Show me all test files".

Try it now!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 1.2]*

---

## Exercise 1.3: Basic Code Understanding

**Task**: Now ask me to explain how a specific feature or function works in your codebase. Be specific about what you want to understand.

Example: "Explain how user authentication works" or "Show me how the database connection is configured"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 1.3]*

---

📍 **Section 3 of 3** • ⏱️ ~2 min remaining

---

## 📋 Quick Reference Card

### Communication Patterns
**Structure your requests clearly:**
- **Good**: "Read file.py and explain what it does"
- **Better**: "Read file.py and explain the authentication logic"
- **Best**: "Read file.py and app.py, then explain how authentication flows between them"

### Read Tool Usage
```bash
# Read single file
"Read src/main.py"

# Read specific line range
"Read lines 50-100 of server.js"

# Read multiple files in parallel
"Read both component.tsx and component.test.tsx"
```

### Glob Patterns
| Pattern | Matches | Example Use |
|---------|---------|-------------|
| `*.py` | Python files in current dir | "Find all Python files here" |
| `**/*.js` | All JS files recursively | "Show me all JavaScript files" |
| `src/**/*.ts` | TypeScript files under src/ | "Find TypeScript files in src/" |
| `test_*.py` | Test files starting with test_ | "Find all test files" |
| `*.{json,yaml}` | Config files | "Find config files" |

### Key Concepts
- **File Navigation**: Claude can access any file in your project
- **Parallel Operations**: Request multiple files at once for speed
- **Specificity**: More specific requests = better results
- **Context Awareness**: Claude sees your full project structure

### Common Tasks with Claude
```
# Explore codebase
"Show me the project structure"
"Find all configuration files"

# Understand code
"Explain how [feature] works"
"What does [function] do?"

# Locate functionality
"Where is [feature] implemented?"
"Find all files that use [library]"
```

### What Claude Can Do
✓ Read any file in your project
✓ Search across entire codebase
✓ Understand multiple programming languages
✓ Execute parallel operations
✓ Navigate complex directory structures

### What to Remember
- Be specific about what you want
- Reference exact file names when known
- Ask for multiple files together for context
- Use natural language - no special syntax needed

---

## Module 1 Complete! 🎯

You've learned:
✓ How to communicate effectively with Claude Code
✓ Basic file reading with Read tool
✓ File pattern matching with Glob
✓ Asking for code explanations

---
**Navigation:** [← Top](#module-1-first-steps) | [Menu](../README.md) | [Next: File Operations →](02-file-operations.md)

**Progress:** ██████████ 100% through this module
---

**Ready for Module 2?** Type "continue" or "next module" to proceed.
