# Module 2: File Operations Master

## What You'll Learn
- **Read** - Reading files with precision (ranges, multiple files)
- **Write** - Creating new files
- **Edit** - Making surgical changes to existing files
- **Grep** - Content-based searching (finding code patterns)
- **Glob** - Advanced pattern matching

## ⚡ Quick Summary

- Master the four core file operation tools: Read, Write, Edit, and Grep
- Learn when to use each tool for maximum efficiency
- Practice parallel file operations for speed
- Understand the difference between creating new files vs editing existing ones
- **Estimated time: 12-15 minutes**

## The File Operation Tools

### Read Tool
- Reads entire files or specific line ranges
- Can read multiple files in parallel
- Shows line numbers for easy reference

**Examples:**
- "Read package.json"
- "Read lines 50-100 of server.js"
- "Read both the component and its test file"

### Write Tool
- Creates new files from scratch
- MUST read existing file first before overwriting
- Use for NEW files only

**Examples:**
- "Create a new utils/validator.js file with email validation"
- "Write a README.md explaining the project"

### Edit Tool
- Makes precise changes using string replacement
- Preserves everything else in the file
- Can replace all occurrences or just first match
- Must provide exact old string to replace

**Examples:**
- "Change the port from 3000 to 8080"
- "Rename the function getUserData to fetchUserData"
- "Update the error message in the login function"

### Grep Tool
- Searches file CONTENTS (not just filenames)
- Uses regex patterns
- Can filter by file type
- Shows context lines around matches

**Examples:**
- "Find all TODO comments in the codebase"
- "Search for console.log statements in JavaScript files"
- "Find where the API_KEY constant is used"

### 💡 Real-World Example

**Scenario:** You need to refactor a function name across a large codebase.

**How Claude Code helps:**
1. **Grep** to find all occurrences: "Search for all uses of the old function name"
2. **Read** the files to understand context
3. **Edit** each file to replace the function name precisely
4. **Bash** to run tests and verify nothing broke

All in one conversation, with surgical precision!

## Hands-On Exercise 2.1: Read Multiple Files

**Task**: Ask me to read 2-3 related files in parallel (like a component and its test, or a config file and its usage).

Try it: "Read [file1] and [file2] together"

---

*[WAIT FOR USER]*

---

📍 **Section 2 of 4** • ⏱️ ~10 min remaining

---

### 🎯 Quick Win (30 seconds)

Try this: Ask me to find how many files of a specific type exist in your project.
Example: "How many JavaScript files are in this project?"

---

## Exercise 2.2: Content Search with Grep

**Task**: Search for a specific function, variable, or pattern in your codebase.

Examples:
- "Find all files that import the express library"
- "Search for functions that return promises"
- "Find all error handling code"

Try it now!

---

*[WAIT FOR USER]*

---

## Exercise 2.3: Write a New File

**Task**: Ask me to create a completely new file. Could be:
- A utility function
- A configuration file
- A test file
- Documentation

Example: "Create a new file utils/helpers.js with a function to format dates"

---

*[WAIT FOR USER]*

---

📍 **Section 3 of 4** • ⏱️ ~5 min remaining

---

## Exercise 2.4: Edit an Existing File

**Task**: Ask me to make a specific change to an existing file. This could be:
- Changing a value
- Renaming something
- Updating a string
- Fixing a bug

Example: "In config.js, change the timeout from 5000 to 10000"

---

*[WAIT FOR USER]*

---

📍 **Section 4 of 4** • ⏱️ ~2 min remaining

---

## 📋 Quick Reference Card

### Tool Selection Guide
| Task | Tool | Example |
|------|------|---------|
| Read existing file | Read | "Read config.json" |
| Search file contents | Grep | "Find all TODO comments" |
| Create new file | Write | "Create utils/helper.js" |
| Modify existing file | Edit | "Change port from 3000 to 8080" |
| Find files by name | Glob | "Find all *.test.js files" |

### Read Tool
```bash
# Basic read
"Read src/app.py"

# Line range
"Read lines 100-150 of server.js"

# Multiple files (parallel)
"Read both auth.js and auth.test.js"

# With context
"Read the main config file and explain the database settings"
```

### Write Tool
```bash
# Create new file
"Create a new file utils/validator.js with email validation"

# Create with structure
"Write a new test file for the User model"

# Important: Write is for NEW files only
# For existing files, use Edit instead
```

### Edit Tool
```bash
# Simple replacement
"In config.js, change timeout from 5000 to 10000"

# Function rename
"Rename getUserData to fetchUserData throughout the file"

# Multiple replacements
"Replace all instances of 'oldClassName' with 'newClassName'"

# Preserve exact formatting
# Edit matches exact strings including whitespace
```

### Grep Tool
```bash
# Basic search
"Find all TODO comments in Python files"

# With context lines
"Search for error handling and show surrounding code"

# File type filtering
"Find console.log statements in JavaScript files only"

# Regex patterns
"Find all functions that start with 'get' or 'fetch'"
```

### Grep Pattern Examples
| Pattern | Matches | Use Case |
|---------|---------|----------|
| `TODO` | Literal TODO | Find all TODOs |
| `console\.log` | console.log calls | Debug logging |
| `function \w+` | Function declarations | Find all functions |
| `import.*React` | React imports | Track dependencies |
| `async.*=>` | Async arrow functions | Find async code |

### Best Practices

**DO:**
- ✓ Read files before editing them
- ✓ Use Edit for existing files, Write for new ones
- ✓ Request multiple file reads in parallel
- ✓ Use specific Grep patterns to narrow results
- ✓ Provide exact strings for Edit operations

**DON'T:**
- ✗ Use Write to overwrite existing files without reading first
- ✗ Use Bash commands (cat, echo, sed) for file operations
- ✗ Make multiple sequential read requests - batch them
- ✗ Use vague Edit patterns - be exact
- ✗ Forget file extensions in Glob patterns

### Parallel Operations
```bash
# Sequential (slow)
"Read file1.js"
[wait]
"Read file2.js"
[wait]

# Parallel (fast)
"Read file1.js and file2.js together"
```

### Common Workflows

**Refactoring:**
1. Grep to find all occurrences
2. Read affected files
3. Edit each file with precise replacements
4. Test changes

**Adding Features:**
1. Read existing related code
2. Write new files if needed
3. Edit existing files to integrate
4. Write tests

**Code Review:**
1. Read the modified files
2. Grep for potential issues
3. Suggest improvements
4. Edit to implement fixes

### Tool Capabilities

**Read:**
- Line numbers shown (cat -n format)
- Can read any text file
- Supports line ranges
- Parallel reading for multiple files

**Write:**
- Creates new files
- MUST read existing files first
- Overwrites if file exists (with warning)
- Best for completely new files

**Edit:**
- String replacement (old → new)
- Must provide exact old_string
- Can replace all occurrences
- Preserves formatting and line structure

**Grep:**
- Full regex support
- Shows matching lines
- File type filtering
- Context lines (before/after matches)
- Count matches or show filenames only

---

## Module 2 Complete! 🎯

You've mastered:
✓ Reading single and multiple files
✓ Searching code content with Grep
✓ Creating new files with Write
✓ Making surgical edits with Edit
✓ Understanding when to use each tool

---
**Navigation:** [← Previous: First Steps](01-first-steps.md) | [Menu](../README.md) | [Next: Terminal & Git →](03-terminal-git.md)

**Progress:** ██████████ 100% through this module
---

**Next up**: Terminal & Git workflows! Type "continue" when ready.
