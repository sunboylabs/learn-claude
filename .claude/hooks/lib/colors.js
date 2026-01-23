#!/usr/bin/env node

/**
 * Terminal Colors and Typography System
 * Provides consistent, beautiful formatting across the learn-claude skill
 */

// ANSI Color Codes
const COLORS = {
  // Primary action colors
  primary: '\x1b[36m',      // Cyan - prompts, primary actions
  success: '\x1b[32m',      // Green - completions, success states
  error: '\x1b[31m',        // Red - errors, failures
  warning: '\x1b[33m',      // Yellow - warnings, important tips
  info: '\x1b[34m',         // Blue - informational messages

  // Content colors
  heading: '\x1b[1m\x1b[35m',     // Bold Magenta - module headings
  subheading: '\x1b[1m\x1b[36m',  // Bold Cyan - section headings
  emphasis: '\x1b[1m',             // Bold - emphasized text
  code: '\x1b[36m',                // Cyan - inline code
  command: '\x1b[33m',             // Yellow - command examples

  // UI element colors
  border: '\x1b[90m',       // Gray - borders, separators
  muted: '\x1b[2m',         // Dim - less important text
  link: '\x1b[4m\x1b[34m',  // Underline Blue - links

  // Progress indicators
  complete: '\x1b[32m',     // Green - completed items
  incomplete: '\x1b[90m',   // Gray - incomplete items
  current: '\x1b[33m',      // Yellow - current/active item
  inProgress: '\x1b[36m',   // Cyan - in progress

  // Special colors
  highlight: '\x1b[43m\x1b[30m',  // Black on Yellow background
  inverse: '\x1b[7m',              // Inverse colors

  reset: '\x1b[0m'          // Reset to default
};

// Typography styles (can be combined with colors)
const STYLES = {
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',
  reset: '\x1b[0m'
};

// Icon/Emoji library
const ICONS = {
  // Status
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  question: '❓',

  // Progress
  complete: '✓',
  incomplete: '○',
  current: '◉',
  arrow: '→',

  // Actions
  play: '▶️',
  pause: '⏸️',
  stop: '⏹️',
  next: '⏭️',

  // Learning
  book: '📚',
  pencil: '✏️',
  target: '🎯',
  trophy: '🏆',
  star: '⭐',
  fire: '🔥',
  lightning: '⚡',
  brain: '🧠',
  rocket: '🚀',

  // Tools
  search: '🔍',
  folder: '📁',
  file: '📄',
  code: '💻',
  terminal: '⌨️',
  git: '🔀',
  web: '🌐',

  // Celebrations
  party: '🎉',
  confetti: '🎊',
  medal: '🏅',
  crown: '👑',
  sparkles: '✨',

  // Misc
  clock: '⏱️',
  calendar: '📅',
  chart: '📊',
  bulb: '💡',
  tools: '🔧',
  lock: '🔒',
  unlock: '🔓'
};

/**
 * Apply color to text
 */
function colorize(text, color) {
  if (!color || typeof color !== 'string') return text;
  const colorCode = COLORS[color] || color;
  return `${colorCode}${text}${COLORS.reset}`;
}

/**
 * Apply style to text
 */
function stylize(text, style) {
  if (!style || typeof style !== 'string') return text;
  const styleCode = STYLES[style] || style;
  return `${styleCode}${text}${STYLES.reset}`;
}

/**
 * Apply both color and style
 */
function format(text, color, style) {
  let formatted = text;
  if (color) formatted = colorize(formatted, color);
  if (style) formatted = stylize(formatted, style);
  return formatted;
}

/**
 * Create a heading
 */
function heading(text, level = 1) {
  const icons = ['🎯', '📌', '▸'];
  const icon = icons[Math.min(level - 1, icons.length - 1)];

  if (level === 1) {
    return `\n${colorize(icon + ' ' + text.toUpperCase(), 'heading')}\n${'═'.repeat(Math.min(text.length + 2, 60))}\n`;
  } else if (level === 2) {
    return `\n${colorize(icon + ' ' + text, 'subheading')}\n${'─'.repeat(Math.min(text.length + 2, 60))}\n`;
  } else {
    return `\n${colorize(icon + ' ' + text, 'emphasis')}\n`;
  }
}

/**
 * Create a box around text
 */
function box(content, options = {}) {
  const {
    title = '',
    width = 60,
    padding = 1,
    style = 'single', // 'single', 'double', 'rounded', 'bold'
    color = 'border'
  } = options;

  const borders = {
    single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
    double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
    bold: { tl: '┏', tr: '┓', bl: '┗', br: '┛', h: '━', v: '┃' }
  };

  const b = borders[style] || borders.single;
  const lines = [];

  // Top border
  if (title) {
    const titleText = ` ${title} `;
    const leftPad = Math.floor((width - titleText.length) / 2);
    const rightPad = width - titleText.length - leftPad;
    lines.push(colorize(b.tl + b.h.repeat(leftPad) + titleText + b.h.repeat(rightPad) + b.tr, color));
  } else {
    lines.push(colorize(b.tl + b.h.repeat(width) + b.tr, color));
  }

  // Padding top
  for (let i = 0; i < padding; i++) {
    lines.push(colorize(b.v + ' '.repeat(width) + b.v, color));
  }

  // Content lines
  const contentLines = content.split('\n');
  contentLines.forEach(line => {
    const stripped = line.replace(/\x1b\[[0-9;]*m/g, ''); // Remove ANSI codes for length calc
    const lineWidth = stripped.length;
    const padRight = width - lineWidth;
    lines.push(colorize(b.v, color) + ' ' + line + ' '.repeat(Math.max(0, padRight - 1)) + colorize(b.v, color));
  });

  // Padding bottom
  for (let i = 0; i < padding; i++) {
    lines.push(colorize(b.v + ' '.repeat(width) + b.v, color));
  }

  // Bottom border
  lines.push(colorize(b.bl + b.h.repeat(width) + b.br, color));

  return lines.join('\n');
}

/**
 * Create a progress bar
 */
function progressBar(current, total, options = {}) {
  const {
    width = 30,
    showPercentage = true,
    showNumbers = true,
    filledChar = '█',
    emptyChar = '░',
    completeColor = 'complete',
    incompleteColor = 'incomplete'
  } = options;

  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const empty = width - filled;

  const bar = colorize(filledChar.repeat(filled), completeColor) +
              colorize(emptyChar.repeat(empty), incompleteColor);

  let result = `  ${bar}`;

  if (showPercentage) {
    result += `  ${percentage}%`;
  }

  if (showNumbers) {
    result += `  (${current}/${total})`;
  }

  return result;
}

/**
 * Create a list with status icons
 */
function statusList(items, options = {}) {
  const {
    completeIcon = ICONS.success,
    incompleteIcon = ICONS.incomplete,
    currentIcon = ICONS.current,
    indent = 2
  } = options;

  const indentation = ' '.repeat(indent);

  return items.map(item => {
    let icon;
    if (item.status === 'completed') {
      icon = colorize(completeIcon, 'complete');
    } else if (item.status === 'current') {
      icon = colorize(currentIcon, 'current');
    } else {
      icon = colorize(incompleteIcon, 'incomplete');
    }

    return `${indentation}${icon} ${item.label}`;
  }).join('\n');
}

/**
 * Center text within a given width
 */
function center(text, width = 60) {
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, '');
  const padding = Math.max(0, width - stripped.length);
  const leftPad = Math.floor(padding / 2);
  const rightPad = padding - leftPad;
  return ' '.repeat(leftPad) + text + ' '.repeat(rightPad);
}

/**
 * Create a divider line
 */
function divider(char = '─', width = 60, color = 'border') {
  return colorize(char.repeat(width), color);
}

/**
 * Create a table
 */
function table(headers, rows, options = {}) {
  const {
    headerColor = 'heading',
    borderColor = 'border',
    padding = 1
  } = options;

  // Calculate column widths
  const colWidths = headers.map((header, i) => {
    const headerLen = header.length;
    const maxRowLen = Math.max(...rows.map(row => {
      const cell = String(row[i] || '');
      return cell.replace(/\x1b\[[0-9;]*m/g, '').length;
    }));
    return Math.max(headerLen, maxRowLen) + padding * 2;
  });

  const lines = [];
  const totalWidth = colWidths.reduce((sum, w) => sum + w, 0) + colWidths.length + 1;

  // Top border
  lines.push(colorize('┌' + colWidths.map(w => '─'.repeat(w)).join('┬') + '┐', borderColor));

  // Headers
  const headerLine = '│' + headers.map((header, i) => {
    return ' '.repeat(padding) + colorize(header.padEnd(colWidths[i] - padding * 2), headerColor) + ' '.repeat(padding);
  }).join('│') + '│';
  lines.push(headerLine);

  // Header separator
  lines.push(colorize('├' + colWidths.map(w => '─'.repeat(w)).join('┼') + '┤', borderColor));

  // Rows
  rows.forEach((row, rowIndex) => {
    const rowLine = '│' + row.map((cell, i) => {
      const cellStr = String(cell || '');
      const stripped = cellStr.replace(/\x1b\[[0-9;]*m/g, '');
      const padRight = colWidths[i] - stripped.length - padding * 2;
      return ' '.repeat(padding) + cellStr + ' '.repeat(Math.max(0, padRight)) + ' '.repeat(padding);
    }).join('│') + '│';
    lines.push(rowLine);

    // Row separator (except for last row)
    if (rowIndex < rows.length - 1) {
      lines.push(colorize('├' + colWidths.map(w => '─'.repeat(w)).join('┼') + '┤', borderColor));
    }
  });

  // Bottom border
  lines.push(colorize('└' + colWidths.map(w => '─'.repeat(w)).join('┴') + '┘', borderColor));

  return lines.join('\n');
}

/**
 * Clear the terminal screen
 */
function clear() {
  process.stdout.write('\x1b[2J\x1b[H');
}

/**
 * Move cursor to position
 */
function moveCursor(x, y) {
  process.stdout.write(`\x1b[${y};${x}H`);
}

/**
 * Hide cursor
 */
function hideCursor() {
  process.stdout.write('\x1b[?25l');
}

/**
 * Show cursor
 */
function showCursor() {
  process.stdout.write('\x1b[?25h');
}

// Convenience color wrappers for common colors
const cyan = (text) => colorize(text, 'primary');
const green = (text) => colorize(text, 'success');
const red = (text) => colorize(text, 'error');
const yellow = (text) => colorize(text, 'warning');
const blue = (text) => colorize(text, 'info');
const magenta = (text) => colorize(text, 'heading');
const gray = (text) => colorize(text, 'border');

// Convenience style wrappers
const bold = (text) => stylize(text, 'bold');
const italic = (text) => stylize(text, 'italic');
const dim = (text) => stylize(text, 'dim');
const underline = (text) => stylize(text, 'underline');

// Export everything
module.exports = {
  COLORS,
  STYLES,
  ICONS,
  colorize,
  stylize,
  format,
  heading,
  box,
  progressBar,
  statusList,
  center,
  divider,
  table,
  clear,
  moveCursor,
  hideCursor,
  showCursor,
  // Convenience wrappers
  cyan,
  green,
  red,
  yellow,
  blue,
  magenta,
  gray,
  bold,
  italic,
  dim,
  underline
};

// Test if run directly
if (require.main === module) {
  console.log('\n=== Color & Typography System Test ===\n');

  console.log(heading('This is a Level 1 Heading', 1));
  console.log(heading('This is a Level 2 Heading', 2));
  console.log(heading('This is a Level 3 Heading', 3));

  console.log('\n=== Color Examples ===\n');
  console.log(colorize('Primary color text', 'primary'));
  console.log(colorize('Success color text', 'success'));
  console.log(colorize('Error color text', 'error'));
  console.log(colorize('Warning color text', 'warning'));
  console.log(colorize('Info color text', 'info'));

  console.log('\n=== Box Examples ===\n');
  console.log(box('This is content in a box!', { title: 'Simple Box', style: 'single' }));
  console.log(box('Double border box\nWith multiple lines', { title: 'Double Box', style: 'double' }));
  console.log(box('Rounded corners!', { style: 'rounded' }));

  console.log('\n=== Progress Bar ===\n');
  console.log(progressBar(7, 10));
  console.log(progressBar(5, 13, { width: 40 }));

  console.log('\n=== Status List ===\n');
  console.log(statusList([
    { label: 'Module 1: First Steps', status: 'completed' },
    { label: 'Module 2: File Operations', status: 'current' },
    { label: 'Module 3: Terminal & Git', status: 'incomplete' }
  ]));

  console.log('\n=== Table ===\n');
  console.log(table(
    ['Module', 'Status', 'Progress'],
    [
      ['Module 1', colorize('✓ Complete', 'success'), '100%'],
      ['Module 2', colorize('○ In Progress', 'current'), '50%'],
      ['Module 3', colorize('○ Not Started', 'incomplete'), '0%']
    ]
  ));

  console.log('\n=== Icons ===\n');
  console.log(`Success: ${ICONS.success}  Error: ${ICONS.error}  Warning: ${ICONS.warning}`);
  console.log(`Target: ${ICONS.target}  Trophy: ${ICONS.trophy}  Fire: ${ICONS.fire}  Rocket: ${ICONS.rocket}`);

  console.log('\n');
}
