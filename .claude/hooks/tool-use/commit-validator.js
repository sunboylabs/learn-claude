#!/usr/bin/env node

const fs = require('fs');

// Read hook data from stdin
let inputData = '';
process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookData = JSON.parse(inputData);

    // Check if this is a Bash tool with git commit
    if (hookData.tool === 'Bash' &&
        hookData.parameters &&
        hookData.parameters.command &&
        hookData.parameters.command.includes('git commit')) {

      const command = hookData.parameters.command;

      // Extract commit message
      const messageMatch = command.match(/-m\s+["'](.+?)["']/);

      if (messageMatch) {
        const message = messageMatch[1];

        // Validation rules
        const errors = [];

        // Must be at least 10 characters
        if (message.length < 10) {
          errors.push('Commit message too short (minimum 10 characters)');
        }

        // Should start with capital letter
        if (!/^[A-Z]/.test(message)) {
          errors.push('Commit message should start with capital letter');
        }

        // Should not end with period
        if (message.endsWith('.')) {
          errors.push('Commit message should not end with period');
        }

        // If errors, block the commit
        if (errors.length > 0) {
          console.error('❌ Commit message validation failed:');
          errors.forEach(err => console.error(`  - ${err}`));
          console.error(`\nMessage: "${message}"`);
          console.error('\nPlease improve your commit message.');
          process.exit(1); // Block the commit
        }
      }
    }

    // Allow the tool to proceed
    process.exit(0);

  } catch (error) {
    // On error, allow the tool (fail open)
    process.exit(0);
  }
});
