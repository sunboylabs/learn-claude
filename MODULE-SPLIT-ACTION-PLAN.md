# Module Splitting Action Plan

## Overview
Detailed plan for splitting Module 6 (1,890 lines) and Module 7a (2,043 lines) into smaller, digestible modules as specified in the Enhancement Plan.

**Target**: Max 400 lines per module section
**Timeline**: Estimated 4-6 hours total

---

## Module 6: Web Integration (1,890 lines → 3 modules)

### Current Structure
- **File**: `modules/06-web-integration.md`
- **Size**: 1,890 lines
- **Sections**: 6 major parts (WebFetch, WebSearch, Playwright, Workflows, Troubleshooting, Best Practices)

### Proposed Split

#### 06a: WebFetch & WebSearch (Lines 1-630, ~450 lines)
**New File**: `modules/06a-web-fetch-search.md`

**Content**:
- Module intro & Quick Summary
- Part 1: WebFetch Tool (basics, syntax, examples)
- Part 2: WebSearch Tool (usage, limitations, alternatives)
- Exercise 6.1: Fetching documentation
- Exercise 6.2: Searching for solutions
- Quick Reference Card (WebFetch/WebSearch commands)
- Navigation to 06b

**Exercises**:
- 6.1: WebFetch practice
- 6.2: WebSearch practice

---

#### 06b: Playwright Browser Automation (Lines 631-1260, ~450 lines)
**New File**: `modules/06b-playwright-automation.md`

**Content**:
- Module intro (building on 06a)
- Part 3: Playwright Introduction
- Part 4: Browser automation workflows
- Common commands (navigate, click, snapshot, screenshot)
- Exercise 6.3: Browser interaction
- Debugging techniques
- Quick Reference Card (Playwright commands)
- Navigation to 06c

**Exercises**:
- 6.3: Browser automation practice

---

#### 06c: Real-World Web Workflows (Lines 1261-1890, ~450 lines)
**New File**: `modules/06c-web-workflows.md`

**Content**:
- Module intro (advanced integration)
- Part 5: Complete real-world workflows
  - Research workflow
  - Testing workflow
  - Documentation workflow
  - Debugging workflow
- Part 6: Best Practices & Troubleshooting
- Common pitfalls and solutions
- Pro tips
- Performance optimization
- Comprehensive Quick Reference Card
- Module completion celebration
- Navigation to Module 7

---

### Implementation Steps for Module 6

1. **Create new files**:
   ```bash
   cp modules/06-web-integration.md modules/06a-web-fetch-search.md
   cp modules/06-web-integration.md modules/06b-playwright-automation.md
   cp modules/06-web-integration.md modules/06c-web-workflows.md
   ```

2. **Edit 06a**: Keep lines 1-630, update navigation, add cheat sheet
3. **Edit 06b**: Keep lines 631-1260, update intro/navigation, add cheat sheet
4. **Edit 06c**: Keep lines 1261-1890, update intro/navigation, keep existing cheat sheet

5. **Update metadata**:
   - `module-metadata.json`: Add entries for 06a, 06b, 06c
   - Time estimates: 06a (15 min), 06b (20 min), 06c (15 min)

6. **Update progress tracking**:
   - `progress-helper.js`: Update EXERCISE_SEQUENCE
     ```javascript
     '6a.1', '6a.2',
     '6b.3',
     '6c.4' // or keep as '6.1', '6.2', '6.3' if preferred
     ```

7. **Update references**:
   - `skill.md`: Update module list
   - `README.md`: Update module count and descriptions
   - `.claude/commands/modules.md`: Update module listing

8. **Delete original**: `rm modules/06-web-integration.md`

---

## Module 7a: Pull Requests & CI/CD (2,043 lines → 5-6 modules)

### Current Structure
- **File**: `modules/07a-pull-requests-cicd.md`
- **Size**: 2,043 lines
- **Sections**: 9 major parts (massive module)

### Proposed Split

#### 07a1: Pull Request Basics (Lines 1-400, ~400 lines)
**New File**: `modules/07a1-pr-basics.md`

**Content**:
- Module intro & Quick Summary
- Part 1: Understanding Pull Requests
- Part 2: Creating PRs with Claude
- Git workflow refresher
- PR description best practices
- Exercise 7.1: Create your first PR
- Quick Reference Card (basic PR commands)

---

#### 07a2: GitHub CLI & Automation (Lines 401-800, ~400 lines)
**New File**: `modules/07a2-github-cli.md`

**Content**:
- Part 3: GitHub CLI (gh) mastery
- PR management commands
- Repository operations
- Issue tracking
- Exercise 7.2: Advanced gh usage
- Quick Reference Card (gh commands)

---

#### 07a3: GitLab CI/CD (Lines 801-1200, ~400 lines)
**New File**: `modules/07a3-gitlab-ci.md`

**Content**:
- Part 4: GitLab CI/CD introduction
- .gitlab-ci.yml structure
- Pipeline configuration
- Common patterns
- Exercise 7.3: Create a pipeline
- Quick Reference Card (GitLab CI)

---

#### 07a4: GitHub Actions (Lines 1201-1600, ~400 lines)
**New File**: `modules/07a4-github-actions.md`

**Content**:
- Part 5: GitHub Actions workflows
- Workflow syntax
- Common actions
- Secrets and environment variables
- Exercise 7.4: Build a workflow
- Quick Reference Card (GHA)

---

#### 07a5: IDE & Advanced Integration (Lines 1601-1900, ~300 lines)
**New File**: `modules/07a5-ide-integration.md`

**Content**:
- Part 6: VS Code integration
- Part 7: JetBrains IDEs
- IDE-specific workflows
- Exercise 7.5: IDE setup
- Quick Reference Card (IDE shortcuts)

---

#### 07a6: Workflows & Troubleshooting (Lines 1901-2043, ~300 lines)
**New File**: `modules/07a6-workflows-troubleshooting.md`

**Content**:
- Part 8: Real-world workflows
- Part 9: Common issues & solutions
- Performance optimization
- CI/CD best practices
- Comprehensive Quick Reference Card
- Module completion celebration

---

### Implementation Steps for Module 7a

1. **Create new files** (6 files):
   ```bash
   for i in {1..6}; do
     cp modules/07a-pull-requests-cicd.md modules/07a${i}-[name].md
   done
   ```

2. **Edit each file**: Extract relevant lines, update navigation

3. **Update metadata**:
   - `module-metadata.json`: Add 6 new entries
   - Time estimates: ~10-15 min each (total 60-90 min for full module)

4. **Update progress tracking**:
   - `progress-helper.js`: Update EXERCISE_SEQUENCE
     ```javascript
     '7a1.1', '7a2.2', '7a3.3', '7a4.4', '7a5.5'
     ```

5. **Update all references** (skill.md, README, commands)

6. **Delete original**: `rm modules/07a-pull-requests-cicd.md`

---

## Testing Plan

After splitting modules, test:

1. **Navigation links**: All prev/next/menu links work
2. **Progress tracking**: Exercises complete correctly
3. **Module metadata**: Correct time estimates
4. **Slash commands**: `/modules` and `/learn-status` show correct counts
5. **Learning paths**: Fast Track, Quick Start, etc. still work
6. **Cheat sheets**: Present in all new modules

### Test Commands
```bash
# Check module loading
/learn

# Verify module count
/modules

# Test progress
node .claude/hooks/progress-helper.js check

# Complete an exercise in new module
node .claude/hooks/progress-helper.js start-exercise 6a.1
node .claude/hooks/progress-helper.js complete-exercise 6a.1
```

---

## Rollback Plan

Before making changes:
1. Create git branch: `git checkout -b feature/split-modules-6-7a`
2. Backup files:
   ```bash
   cp modules/06-web-integration.md modules/06-web-integration.md.backup
   cp modules/07a-pull-requests-cicd.md modules/07a-pull-requests-cicd.md.backup
   ```
3. If issues arise: `git checkout main` and restore from backup

---

## Success Criteria

✅ All new modules < 450 lines
✅ Navigation works seamlessly
✅ Progress tracking functional
✅ All exercises accounted for
✅ Cheat sheets in every module
✅ Metadata updated correctly
✅ No broken links
✅ Learning paths still work

---

## Timeline Estimate

| Task | Time | Status |
|------|------|--------|
| Module 6 split (3 files) | 2-3 hrs | ⏸️ Pending |
| Module 7a split (6 files) | 3-4 hrs | ⏸️ Pending |
| Update metadata & tracking | 1 hr | ⏸️ Pending |
| Testing & validation | 1 hr | ⏸️ Pending |
| **Total** | **7-9 hrs** | |

---

*Last Updated: 2026-01-23*
*Status: Ready for implementation*
