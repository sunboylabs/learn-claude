# Module 1: First Steps

## What You'll Learn
- How to communicate with Claude Code effectively
- Basic commands you can use
- How to ask questions about your codebase
- Understanding tool usage (Read, Glob, Grep basics)

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

## Hands-On Exercise 1.1

Let's start simple. I want you to practice giving me a clear request:

**Task**: Ask me to find and read a specific file in your current project, then explain what it does.

Try it now! Give me a command like: "Find the [file type] file that handles [functionality] and explain it to me"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 1.1 BEFORE CONTINUING]*

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

## Module 1 Complete! 🎯

You've learned:
✓ How to communicate effectively with Claude Code
✓ Basic file reading with Read tool
✓ File pattern matching with Glob
✓ Asking for code explanations

**Ready for Module 2?** Type "continue" or "next module" to proceed.
