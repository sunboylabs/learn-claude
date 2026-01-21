# Quick Test Guide - Try It Now! 🚀

This guide helps you verify the skill works end-to-end.

---

## Quick Test (5 minutes)

### Test 1: Invoke the Skill ✅

In a new terminal window (in any directory):

```bash
claude
```

Then type:
```
I want to learn Claude Code
```

**Expected Result:**
- Welcome message appears
- 13 modules are listed
- **Language selection prompt appears** with 5 options
- Asks you to choose (1-5)

**If you see this:** ✅ PASS - Skill working!

---

### Test 2: Choose a Language ✅

When prompted, type a number:
```
1
```

(for JavaScript - or choose your preferred language)

**Expected Result:**
- Setup instructions specific to your choice
- Copy command provided
- Ready to start learning

**If you see this:** ✅ PASS - Language selection working!

---

### Test 3: Test Progress Helper ✅

In your terminal:

```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
```

**Expected Result:**
```json
{
  "status": "ok",
  "currentModule": 1,
  "currentExercise": "1.1",
  "completedModules": [],
  "exercisesCompleted": []
}
```

**If you see JSON:** ✅ PASS - Progress tracking working!

---

### Test 4: Test Art Generator ✅

```bash
node ~/.claude/skills/learn-claude/.claude/hooks/lib/art-generator.js
```

**Expected Result:**
- ASCII art celebrations appear
- Badges displayed
- Skill tree shown
- Fireworks rendered

**If you see art:** ✅ PASS - Gamification working!

---

## Full Walkthrough Test (15 minutes)

### Step 1: Setup Practice Project

Choose your language and copy the practice project:

**For JavaScript:**
```bash
mkdir -p ~/claude-learning
cd ~/claude-learning
cp -r ~/.claude/skills/learn-claude/practice-project ./
cd practice-project
```

**For Python:**
```bash
mkdir -p ~/claude-learning
cd ~/claude-learning
cp -r ~/.claude/skills/learn-claude/practice-projects/python-flask ./
cd python-flask
```

**For SQL:**
```bash
mkdir -p ~/claude-learning
cd ~/claude-learning
cp -r ~/.claude/skills/learn-claude/practice-projects/sql-database ./
cd sql-database
```

### Step 2: Start Learning

```bash
claude
```

Then:
```
I want to learn Claude Code
```

Follow the prompts!

### Step 3: Complete First Exercise

When Module 1 loads, try Exercise 1.1:

```
Read the package.json file and explain what it does
```

**Expected Result:**
- I use the Read tool
- File contents appear
- Explanation provided
- Exercise marked complete automatically
- Celebration appears!

### Step 4: Check Progress

```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
```

**Expected Result:**
```json
{
  "currentModule": 1,
  "currentExercise": "1.2",
  "exercisesCompleted": ["1.1"]
}
```

Progress updated! ✅

### Step 5: Continue Learning

Type:
```
continue
```

Next exercise appears automatically!

---

## Troubleshooting

### Issue: "Cannot find module" error
**Fix:** Use full path:
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
```

### Issue: Language selection doesn't appear
**Fix:** Skill was updated. Try:
```bash
# In claude
forget previous context
I want to learn Claude Code
```

### Issue: Practice project not found
**Fix:** Copy it to your learning directory:
```bash
cp -r ~/.claude/skills/learn-claude/practice-project ~/claude-learning/
```

### Issue: Permission denied
**Fix:** Make hooks executable:
```bash
chmod +x ~/.claude/skills/learn-claude/.claude/hooks/*.js
chmod +x ~/.claude/skills/learn-claude/.claude/hooks/lib/*.js
```

---

## What to Expect

### On First Invocation:
1. ✅ Welcome message
2. ✅ 13 modules listed
3. ✅ **Language selection (5 options)**
4. ✅ Setup instructions
5. ✅ Ready to begin

### During Learning:
1. ✅ Module content loads
2. ✅ Exercises detect completion automatically
3. ✅ Progress saves after each exercise
4. ✅ Celebrations appear at milestones
5. ✅ Can resume anytime

### Gamification Features:
1. ✅ Algorithmic ASCII art
2. ✅ Pop-culture quotes
3. ✅ Achievement badges
4. ✅ Progress bars
5. ✅ Skill trees

---

## Verification Checklist

After testing, verify:

- [ ] Skill invokes successfully
- [ ] Language selection appears
- [ ] Can choose a language
- [ ] Setup instructions are clear
- [ ] Progress helper works
- [ ] Art generator works
- [ ] Can read module files
- [ ] Exercise auto-detection works
- [ ] Celebrations appear
- [ ] Progress persists

**If all checked:** ✅ System fully operational!

---

## Success Criteria

**Minimum:** (Must Work)
- ✅ Skill invokes
- ✅ Language selection appears
- ✅ Progress helper runs
- ✅ Module files load

**Full:** (All Features)
- ✅ All 13 modules accessible
- ✅ Exercise auto-detection works
- ✅ Gamification displays
- ✅ All 5 languages available
- ✅ Progress persists across sessions

---

## Quick Commands Reference

**Check progress:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js check
```

**Complete an exercise manually:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/progress-helper.js complete-exercise 1.1
```

**Test art:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/lib/art-generator.js
```

**Test quotes:**
```bash
node ~/.claude/skills/learn-claude/.claude/hooks/lib/quotes-library.js
```

**View a module:**
```bash
cat ~/.claude/skills/learn-claude/modules/01-first-steps.md
```

---

## Expected File Locations

```
~/.claude/skills/learn-claude/
├── skill.md ✅
├── modules/ (13 files) ✅
├── practice-project/ ✅
├── practice-projects/ ✅
│   ├── python-flask/ ✅
│   ├── sql-database/ ✅
│   ├── java-spring/ ✅
│   └── react-typescript/ ✅
└── .claude/
    └── hooks/
        ├── learning-progress.js ✅
        ├── progress-helper.js ✅
        └── lib/
            ├── art-generator.js ✅
            └── quotes-library.js ✅
```

---

## Ready to Learn!

Everything is set up and tested. You can now:

1. **Invoke the skill:** "I want to learn Claude Code"
2. **Choose your language:** Pick from 5 options
3. **Start learning:** Complete 13 modules with 43+ exercises
4. **Earn achievements:** Unlock badges and celebrations
5. **Become a power user:** Master all Claude Code features!

**Let's go!** 🚀

Type in Claude:
```
I want to learn Claude Code
```
