# Module 2: File Operations Master

## What You'll Learn
- **Read** - Reading files with precision (ranges, multiple files)
- **Write** - Creating new files
- **Edit** - Making surgical changes to existing files
- **Grep** - Content-based searching (finding code patterns)
- **Glob** - Advanced pattern matching

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

## Hands-On Exercise 2.1: Read Multiple Files

**Task**: Ask me to read 2-3 related files in parallel (like a component and its test, or a config file and its usage).

Try it: "Read [file1] and [file2] together"

---

*[WAIT FOR USER]*

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

## Module 2 Complete! 🎯

You've mastered:
✓ Reading single and multiple files
✓ Searching code content with Grep
✓ Creating new files with Write
✓ Making surgical edits with Edit
✓ Understanding when to use each tool

**Next up**: Terminal & Git workflows! Type "continue" when ready.
