#!/usr/bin/env node
---
description: View all available learning modules and jump to any module
---

// Browse and jump to any learning module

const fs = require('fs');
const path = require('path');

const PROGRESS_FILE = path.join(process.cwd(), '.learn-progress.json');
const colors = require('../../../learn-claude/.claude/hooks/lib/colors.js');

const MODULES = [
  { id: 1, name: 'First Steps', category: 'Foundations', duration: 15, topics: 'Navigation, basic interactions' },
  { id: 2, name: 'File Operations', category: 'Foundations', duration: 25, topics: 'Read, Write, Edit, Grep, Glob' },
  { id: 3, name: 'Terminal & Git', category: 'Foundations', duration: 25, topics: 'Shell commands, version control' },
  { id: 4, name: 'Advanced Tools', category: 'Foundations', duration: 30, topics: 'TodoWrite, agents, parallel execution' },
  { id: '5a', name: 'Skill Creation', category: 'Customization', duration: 35, topics: 'Reusable AI workflows' },
  { id: '5b', name: 'Slash Commands', category: 'Customization', duration: 20, topics: 'Custom shortcuts' },
  { id: '5c', name: 'Hooks Mastery', category: 'Customization', duration: 40, topics: 'Event-driven automation' },
  { id: 6, name: 'Web Integration', category: 'Integration', duration: 35, topics: 'WebFetch, WebSearch, browser tools' },
  { id: '7a', name: 'Pull Requests & CI/CD', category: 'Integration', duration: 40, topics: 'GitHub Actions, workflows' },
  { id: '7b', name: 'MCP Hands-On', category: 'Integration', duration: 45, topics: 'External tool integration' },
  { id: 8, name: 'Advanced Git', category: 'Integration', duration: 30, topics: 'Branches, conflicts, rebase' },
  { id: 9, name: 'Context Management', category: 'Advanced', duration: 35, topics: 'Memory optimization' },
  { id: 10, name: 'Power User Mastery', category: 'Advanced', duration: 50, topics: 'Real-world projects' }
];

function main() {
  let progress = { completedModules: [], currentModule: 1 };

  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch (error) {
      console.error('Error reading progress:', error.message);
    }
  }

  displayModuleMenu(progress);
}

function displayModuleMenu(progress) {
  console.log('\n' + colors.bold(colors.cyan('╔════════════════════════════════════════════════════════════════════╗')));
  console.log(colors.cyan('║') + colors.bold('  Claude Code Mastery - All Modules  ') + colors.cyan('║'));
  console.log(colors.cyan('╚════════════════════════════════════════════════════════════════════╝\n'));

  // Group by category and display
  const categories = ['Foundations', 'Customization', 'Integration', 'Advanced'];
  let moduleNum = 1;

  categories.forEach(category => {
    const categoryModules = MODULES.filter(m => m.category === category);
    const categoryCompleted = categoryModules.filter(m => progress.completedModules.includes(m.id)).length;
    const icon = getCategoryIcon(category);

    console.log(colors.bold(icon + ' ' + category.toUpperCase() + ' (' + categoryCompleted + '/' + categoryModules.length + ')\n'));

    categoryModules.forEach(module => {
      const isCompleted = progress.completedModules.includes(module.id);
      const isCurrent = progress.currentModule === module.id;

      let status = '⭕ ';
      if (isCompleted) {
        status = colors.green('✅ ');
      } else if (isCurrent) {
        status = colors.cyan('🔄 ');
      }

      const moduleLabel = typeof module.id === 'string' ? module.id.toUpperCase() : module.id;
      console.log('  ' + moduleNum + '. ' + status + ' Module ' + moduleLabel + ': ' + module.name);
      console.log('     [' + module.duration + ' min] ' + colors.gray(module.topics) + '\n');

      moduleNum++;
    });
  });

  // Progress stats
  const completed = progress.completedModules.length;
  const percent = Math.round((completed / 13) * 100);
  console.log(colors.gray('─'.repeat(70)));
  console.log(colors.bold('Progress: ') + colors.cyan(completed + '/13') + ' modules (' + percent + '%)');
  console.log(colors.bold('Current: ') + colors.yellow('Module ' + progress.currentModule));
  console.log(colors.gray('─'.repeat(70)) + '\n');

  console.log(colors.bold('Navigation:\n'));
  console.log('  Type a module number (1-13) to jump to that module');
  console.log('  Type "continue" to resume your current module');
  console.log('  Type "status" to see detailed progress\n');
}

function getCategoryIcon(category) {
  const icons = {
    'Foundations': '📚',
    'Customization': '🎨',
    'Integration': '🔗',
    'Advanced': '🚀'
  };
  return icons[category] || '📖';
}

if (require.main === module) {
  main();
}

module.exports = { displayModuleMenu };
