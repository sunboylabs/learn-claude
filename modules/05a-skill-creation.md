# Module 5A: Skill Creation Mastery 🛠️

## What You'll Learn

Skills are **specialized, reusable prompts** that extend Claude Code's capabilities. Instead of explaining the same task repeatedly, you create a skill once and invoke it anytime!

You'll master:
- **Skill anatomy** - Structure and components
- **When to create skills** - vs slash commands vs hooks
- **Prompt engineering** - Writing effective skill prompts
- **Testing skills** - Ensuring they work correctly
- **Sharing skills** - Distribution and best practices

## What is a Skill?

A skill is a markdown file with:
1. **Frontmatter** (YAML) - Metadata about the skill
2. **Prompt** (Markdown) - Instructions for Claude

**Think of it as:** A specialized persona or expert you can summon on demand!

### Skill vs Slash Command vs Hook

| Feature | Skill | Slash Command | Hook |
|---------|-------|---------------|------|
| **Purpose** | Complex, multi-step workflows | Quick shortcuts | Event reactions |
| **Invocation** | Natural language or Skill tool | `/command` | Automatic (on events) |
| **Length** | Can be very long | Usually short | Short scripts |
| **Examples** | "code-reviewer", "test-generator" | "/deploy", "/check" | Commit validation |

**When to create a skill:**
- You need Claude to adopt a specific persona or expertise
- The task requires detailed, multi-step instructions
- You want reusable workflows across projects
- The task benefits from context and background knowledge

**When to use slash command instead:**
- Simple, single-purpose tasks
- Quick automation shortcuts
- Commands with arguments
- Tasks that don't need much context

---

## Skill Anatomy

### File Location

Skills live in your `.claude/skills/` directory:

```
.claude/
└── skills/
    ├── code-reviewer.md
    ├── test-generator.md
    └── bug-finder.md
```

**Naming Convention:**
- Use kebab-case (lowercase with hyphens)
- Descriptive names (not too long)
- `.md` extension

### File Structure

Every skill has two parts:

```markdown
---
name: skill-name
description: Brief description of what this skill does
---

# Skill Title

[Detailed instructions for Claude in markdown]

## Your Role

You are a [expert/specialist] who...

## Your Task

When invoked, you should:
1. First step
2. Second step
3. Third step

## Guidelines

- Important rule 1
- Important rule 2

## Output Format

Provide your response as...
```

### Frontmatter (YAML)

The frontmatter is **required** and goes at the top:

```yaml
---
name: code-reviewer
description: Reviews code for bugs, performance issues, and best practices
---
```

**Fields:**
- **name** (required) - How you invoke the skill (kebab-case, no spaces)
- **description** (required) - Shows up in skill list, helps Claude understand when to use it

**Best Practices:**
- Keep name concise but clear
- Description should be 1-2 sentences
- Description should mention key capabilities

### Prompt Content

The prompt is the **instructions for Claude**. This is where you define:

**1. Role/Persona**
```markdown
## Your Role

You are an experienced senior software engineer specializing in code review. You have:
- 10+ years of experience across multiple languages
- Deep knowledge of security vulnerabilities
- Expertise in performance optimization
- Strong understanding of testing best practices
```

**2. Task Definition**
```markdown
## Your Task

When invoked, you should:
1. Read the specified files or code
2. Analyze for bugs, security issues, and performance problems
3. Check adherence to best practices
4. Suggest improvements with specific examples
5. Provide a prioritized list of issues
```

**3. Guidelines/Rules**
```markdown
## Guidelines

- Focus on critical issues first (security, bugs, performance)
- Provide specific line numbers and code examples
- Explain WHY something is an issue, not just WHAT
- Suggest concrete fixes, not just "improve this"
- Be constructive and educational
- Don't nitpick minor style issues unless they impact readability
```

**4. Output Format**
```markdown
## Output Format

Structure your review as:

### Critical Issues
[High priority bugs, security vulnerabilities]

### Performance Concerns
[Efficiency improvements, optimization opportunities]

### Best Practices
[Code quality improvements, maintainability suggestions]

### Positive Observations
[What the code does well]
```

---

## Hands-On Exercise 5A.1: Create Your First Skill

Let's create a **code-review** skill from scratch!

**Task: Create `.claude/skills/code-reviewer.md`**

The skill should:
- Review code for bugs, security issues, and best practices
- Provide specific feedback with line numbers
- Prioritize critical issues over minor ones
- Be constructive and educational

**Step-by-Step:**

1. **Create the file**
   Tell me: "Create a new file at `.claude/skills/code-reviewer.md`"

2. **Write the frontmatter**
   ```yaml
   ---
   name: code-reviewer
   description: Comprehensive code review focusing on bugs, security, and best practices
   ---
   ```

3. **Write the skill prompt**
   Include:
   - Role definition (experienced senior engineer)
   - Task breakdown (what to analyze)
   - Guidelines (how to review)
   - Output format (how to structure feedback)

4. **Test the skill**
   Once created, invoke it: "Use the code-reviewer skill to review src/auth.js"

Watch how I adopt the code-reviewer persona!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5A.1]*

---

## Prompt Engineering for Skills

### Principle 1: Be Specific

❌ **Vague:**
```markdown
Review the code and find issues.
```

✅ **Specific:**
```markdown
Analyze the code for:
1. Security vulnerabilities (SQL injection, XSS, authentication flaws)
2. Logic bugs (edge cases, off-by-one errors, null handling)
3. Performance issues (N+1 queries, unnecessary loops, memory leaks)
4. Best practices violations (error handling, input validation, code duplication)

For each issue:
- Specify the file and line number
- Explain the impact
- Provide a concrete fix with code example
```

### Principle 2: Define the Persona

❌ **Generic:**
```markdown
You help with code review.
```

✅ **Well-Defined:**
```markdown
You are a senior security engineer with expertise in:
- OWASP Top 10 vulnerabilities
- Common attack vectors (injection, XSS, CSRF)
- Secure authentication and authorization patterns
- Cryptography best practices
- Input validation and sanitization

Your reviews prioritize security above all else, but you also consider:
- Code maintainability and readability
- Performance and scalability
- Testing coverage
```

### Principle 3: Structure the Output

❌ **Unstructured:**
```markdown
Provide feedback on the code.
```

✅ **Structured:**
```markdown
Provide your review in this format:

## Summary
[2-3 sentence overview of code quality]

## Critical Issues (Priority 1)
- **File:Line** - Issue description
  - **Impact**: Why this matters
  - **Fix**: Specific code example

## Important Issues (Priority 2)
[Same format]

## Suggestions (Priority 3)
[Same format]

## Strengths
[What the code does well]
```

### Principle 4: Provide Examples

❌ **Abstract:**
```markdown
Find performance issues.
```

✅ **With Examples:**
```markdown
Look for performance issues such as:

**N+1 Query Problem:**
```javascript
// BAD: Queries in loop
users.forEach(user => {
  const tasks = db.query('SELECT * FROM tasks WHERE user_id = ?', user.id);
});
```

**Unnecessary Recomputation:**
```javascript
// BAD: Recomputing same value
for (let i = 0; i < array.length; i++) {  // .length evaluated each iteration
  // ...
}
```

When you find issues, reference these patterns.
```

### Principle 5: Set Constraints

```markdown
## Constraints

- Spend no more than 2 minutes per file
- Focus on files changed in the last commit (use git diff)
- Limit to top 5 issues maximum
- Provide at least 1 positive observation
- Do not suggest reformatting unless it impacts readability
```

---

## Hands-On Exercise 5A.2: Create a Bug-Finder Skill

Now create a more specialized skill!

**Task: Create `.claude/skills/bug-finder.md`**

This skill should:
- Focus ONLY on finding bugs (not style or performance)
- Look for common bug patterns (null checks, edge cases, race conditions)
- Provide severity ratings (critical, high, medium, low)
- Suggest specific test cases to catch the bugs

**Requirements:**
- Frontmatter with name and description
- Clear role definition (bug hunter, QA expert)
- Specific bug patterns to look for
- Structured output with severity ratings
- Test case suggestions

After creating it, test it: "Use the bug-finder skill on src/utils/validator.js"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5A.2]*

---

## Advanced Skill Patterns

### Pattern 1: Multi-File Analysis

Skills can work across multiple files:

```markdown
## Your Task

1. First, use Grep to find all files matching the pattern
2. For each file found:
   - Read the file
   - Analyze the code
   - Collect findings
3. Aggregate findings across all files
4. Provide a summary report
```

### Pattern 2: Contextual Skills

Skills can reference project context:

```markdown
## Before You Start

1. Read .gitignore to understand project structure
2. Read package.json/requirements.txt to know dependencies
3. Check README.md for project-specific conventions
4. Use this context to inform your review
```

### Pattern 3: Interactive Skills

Skills can ask questions:

```markdown
## Your Approach

1. First, ask the user: "What files or areas should I focus on?"
2. Then ask: "Are there specific concerns (security, performance, bugs)?"
3. Based on their answers, tailor your analysis
4. Provide targeted, relevant feedback
```

### Pattern 4: Progressive Skills

Skills can work in stages:

```markdown
## Your Process

Stage 1: Quick Scan (30 seconds)
- Identify files that likely contain issues
- Highlight critical problems that jump out

Stage 2: Deep Analysis (If user says "continue")
- Detailed line-by-line review
- Comprehensive issue documentation

Stage 3: Fixes (If user says "fix them")
- Implement the suggested fixes
- Run tests to verify
```

---

## Hands-On Exercise 5A.3: Create a Test-Generator Skill

Create a more complex skill!

**Task: Create `.claude/skills/test-generator.md`**

This skill should:
- Analyze existing code functions
- Generate unit tests with multiple test cases
- Cover edge cases and error conditions
- Use the project's testing framework (Jest, pytest, etc.)
- Generate tests that actually work

**Advanced Requirements:**
- Check project's test framework before generating tests
- Generate at least 5 test cases per function
- Include positive tests, negative tests, and edge cases
- Use descriptive test names
- Add comments explaining what each test validates

Test it: "Use the test-generator skill to create tests for the authenticateUser function"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5A.3]*

---

## Testing Your Skills

### Test Checklist

Before considering a skill complete, test:

1. **Invocation** - Can you invoke it naturally?
   - Try: "Use the [skill-name] skill to..."
   - Try: "Invoke [skill-name] on..."

2. **Functionality** - Does it do what it should?
   - Test on the practice project
   - Try edge cases
   - Verify output format

3. **Clarity** - Does it provide clear guidance?
   - Are responses actionable?
   - Is the output well-structured?
   - Does it reference specific lines/files?

4. **Scope** - Does it stay focused?
   - Doesn't try to do too much
   - Stays within its defined role
   - Doesn't overlap with other skills

### Iterating on Skills

Skills are never "done" - improve them over time:

```markdown
## Version History

v1.0 - Initial version
v1.1 - Added security focus
v1.2 - Improved output format
v1.3 - Added example patterns
```

**Improvement Process:**
1. Use the skill on real code
2. Notice what's missing or unclear
3. Edit the skill file to improve it
4. Test again
5. Repeat

---

## Hands-On Exercise 5A.4: Test and Improve

Take one of your created skills and improve it!

**Task:**
1. Use your bug-finder or code-reviewer skill on multiple files
2. Notice what could be better:
   - Is the output too verbose? Too brief?
   - Does it miss important issues?
   - Is the format helpful?
3. Edit the skill file to improve it
4. Test again and compare results

**Reflection Questions:**
- What made the skill better?
- What patterns emerged from testing?
- How would you improve it further?

---

*[WAIT FOR USER TO COMPLETE EXERCISE 5A.4]*

---

## Sharing and Distributing Skills

### Gitignore Considerations

By default, `.claude/` is often gitignored. To share skills:

**Option 1: Keep Gitignored (Private)**
```gitignore
.claude/
```
Use for: Personal workflows, company-specific tools

**Option 2: Share Specific Skills**
```gitignore
.claude/*
!.claude/skills/
!.claude/skills/code-reviewer.md
```

**Option 3: Share All Skills**
```gitignore
.claude/*
!.claude/skills/
```

### Skill Repositories

Create a dedicated skill repo:

```
my-claude-skills/
├── README.md
├── code-reviewer.md
├── test-generator.md
├── bug-finder.md
└── doc-writer.md
```

Users can clone or copy skills they need!

### Skill Best Practices

**DO:**
- ✅ Use clear, descriptive names
- ✅ Write detailed descriptions
- ✅ Provide examples in the skill prompt
- ✅ Test thoroughly before sharing
- ✅ Document any dependencies or requirements
- ✅ Version your skills

**DON'T:**
- ❌ Include secrets or credentials in skills
- ❌ Make skills too broad (do everything)
- ❌ Assume project structure without checking
- ❌ Forget to test on different codebases
- ❌ Use overly complex language

---

## Real-World Skill Examples

### Example 1: API Endpoint Generator

```markdown
---
name: api-generator
description: Generates REST API endpoints with routes, validation, tests, and docs
---

# API Endpoint Generator

## Your Role
You are a full-stack engineer specializing in building robust REST APIs.

## Your Task
When asked to create an API endpoint, you should:
1. Ask for: method, path, request body, response format
2. Generate the route handler with input validation
3. Generate corresponding tests
4. Add API documentation comments
5. Update API docs (if README or docs/ exists)

## Output
Provide complete, working code in this order:
1. Route definition
2. Request validation
3. Business logic
4. Response formatting
5. Error handling
6. Unit tests
```

### Example 2: Refactoring Assistant

```markdown
---
name: refactor-assistant
description: Suggests and implements code refactoring with safety checks
---

# Refactoring Assistant

## Your Role
You are a refactoring expert who improves code while maintaining functionality.

## Your Process
1. Read the code to refactor
2. Identify refactoring opportunities:
   - Extract functions/methods
   - Remove duplication
   - Simplify complex logic
   - Improve naming
3. Explain proposed changes
4. Ask: "Should I proceed with these refactorings?"
5. If yes, implement changes
6. Run tests to verify nothing broke

## Safety Rules
- ALWAYS run tests before and after refactoring
- NEVER change behavior, only structure
- Keep commits atomic (one refactoring per commit)
- Preserve all comments and documentation
```

### Example 3: Documentation Writer

```markdown
---
name: doc-writer
description: Writes comprehensive documentation for code, APIs, and projects
---

# Documentation Writer

## Your Role
You are a technical writer who creates clear, comprehensive documentation.

## Your Task
When asked to document code:
1. Read the code to understand functionality
2. Generate documentation including:
   - Purpose and overview
   - Parameters and return values
   - Usage examples
   - Edge cases and error handling
   - Related functions/files

## Format
Use JSDoc, docstrings, or markdown depending on the file type.

## Examples
For functions, include:
- Brief description
- @param descriptions
- @returns description
- @throws/exceptions
- @example with working code
```

---

## Module 5A Complete! 🛠️

You've mastered:
✓ Skill anatomy (frontmatter + prompt)
✓ When to create skills vs commands vs hooks
✓ Prompt engineering for skills
✓ Testing and iterating on skills
✓ Sharing and distributing skills
✓ Real-world skill patterns

### Skill Creation Checklist

Before moving on, ensure you've created:
- [ ] code-reviewer.md - Comprehensive code review skill
- [ ] bug-finder.md - Bug detection specialist
- [ ] test-generator.md - Test case generator
- [ ] Tested all skills on practice project
- [ ] Improved at least one skill based on testing

**You're now a skill creator!** You can build reusable, powerful workflows that extend Claude Code's capabilities.

**Next up**: Module 5B - Slash Command Deep Dive! Ready to learn quick automation shortcuts?

Type "continue" when ready! 🚀
