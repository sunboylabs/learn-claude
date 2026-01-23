# Module 7B: MCP Hands-On Setup 🔌

## ⚡ Quick Summary

- **MCP servers** extend Claude Code with specialized external tools (databases, APIs, cloud services)
- **Find servers** in the official registry or npm/PyPI
- **Install & configure** using npx, pip, or docker in ~/.claude/config.json
- **Test & use** MCP tools with natural language commands
- **Hands-on practice** installing filesystem and GitHub MCP servers
- **Estimated time**: ~35 minutes

---

## What You'll Learn

Model Context Protocol (MCP) servers extend Claude Code with powerful external tools! Instead of just reading what they are, you'll **actually install and use** them.

You'll master:
- **Finding MCP servers** - Where to discover useful servers
- **Installing MCP servers** - Using npx, pip, docker
- **Configuring Claude** - Editing claude config
- **Testing connections** - Verifying MCP works
- **Using MCP tools** - Real-world workflows
- **Troubleshooting** - Fixing common issues

## What is MCP? (Quick Recap)

**Model Context Protocol** is a standard that lets Claude Code connect to external tools and services.

**Think of it as:** Plugin system for Claude Code!

### What MCP Servers Provide

MCP servers give Claude access to:
- **Filesystems** - Advanced file operations beyond built-in tools
- **Databases** - Query SQL databases directly
- **APIs** - GitHub, Slack, Google Drive, etc.
- **Cloud services** - AWS, GCP, Azure operations
- **Local tools** - Docker, Kubernetes, system commands
- **Specialized data** - RSS feeds, web scraping, etc.

### MCP vs Built-in Tools

| Feature | Built-in Tools | MCP Servers |
|---------|---------------|-------------|
| **Installation** | Pre-installed | User installs |
| **Scope** | General purpose | Specialized |
| **Examples** | Read, Write, Bash | GitHub API, Database queries |
| **Configuration** | None needed | Config required |

---
📍 **Section 1 of 4** • ⏱️ ~30 min remaining
---

### 🎯 Quick Win (60 seconds)

Try this: "Show me the Claude config file location for my system"
This will help you prepare for MCP server installation!

---

## Finding MCP Servers

### Official MCP Registry

**Primary source:** [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

**Categories:**
- Development tools (Git, GitHub, Docker)
- Databases (PostgreSQL, MySQL, SQLite)
- Cloud platforms (AWS, Google Cloud)
- Productivity (Slack, Google Drive, Calendar)
- Web (Puppeteer, Fetch)
- Data (RSS, Weather, Search)

### Community Servers

Search on:
- GitHub: "mcp server" + your use case
- npm: Search for "@modelcontextprotocol"
- PyPI: Search for "mcp-server"

### Popular MCP Servers

**For Development:**
- `@modelcontextprotocol/server-filesystem` - Enhanced file operations
- `@modelcontextprotocol/server-github` - GitHub API access
- `@modelcontextprotocol/server-git` - Advanced Git operations

**For Databases:**
- `@modelcontextprotocol/server-postgres` - PostgreSQL queries
- `@modelcontextprotocol/server-sqlite` - SQLite databases

**For Web:**
- `@modelcontextprotocol/server-puppeteer` - Browser automation
- `@modelcontextprotocol/server-fetch` - HTTP requests

### 💡 Real-World Example

**Scenario:** A developer needs to analyze database query patterns across multiple projects
**Solution:** Install PostgreSQL MCP server to query databases directly through Claude
**Impact:** Can debug production issues, analyze slow queries, and validate data without switching tools

---
**Navigation:** [← Previous](#what-is-mcp-quick-recap) | [Menu](#top) | [Next →](#hands-on-exercise-7b1-install-filesystem-mcp-server)
---

## Hands-On Exercise 7B.1: Install Filesystem MCP Server

Let's install your first MCP server!

**What it provides:**
- Advanced file search across directories
- File watching capabilities
- Batch file operations
- More powerful than built-in Read/Write tools

### Step 1: Check Prerequisites

MCP servers need to be installed globally or accessible to Claude.

**Check Node.js (for npx servers):**
```bash
node --version  # Should be v18+
```

**Check Python (for pip servers):**
```bash
python3 --version  # Should be v3.10+
```

Ask me: "Check if Node.js and Python are installed"

### Step 2: Install the Server

The filesystem server is available via npx (no installation needed):

```bash
npx -y @modelcontextprotocol/server-filesystem
```

Test it works:
```bash
npx @modelcontextprotocol/server-filesystem --help
```

You should see help output!

Ask me: "Test the filesystem MCP server with npx"

### Step 3: Configure Claude Code

Edit your Claude config file to register the MCP server.

**Config location:**
- macOS/Linux: `~/.claude/config.json`
- Windows: `%APPDATA%\.claude\config.json`

**Add to config.json:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourusername"
      ]
    }
  }
}
```

**Important:** Replace `/Users/yourusername` with the directory you want to grant access to!

**Security Note:** Only grant access to directories you trust. The MCP server will be able to read/write files in that directory.

Ask me: "Help me edit ~/.claude/config.json to add the filesystem MCP server"

### Step 4: Restart Claude Code

For the configuration to take effect:
```bash
# Exit current session
exit

# Start new session
claude
```

Ask me: "Restart Claude Code to load the MCP server"

### Step 5: Verify MCP Connection

Once restarted, check that the MCP server is loaded:

In your conversation, ask: "What MCP servers are available?"

I should respond with information about the filesystem server!

### Step 6: Use MCP Tools

Now try using the filesystem MCP tools:

Ask me: "Use the filesystem MCP server to search for all Python files in my home directory"

Watch how I use tools prefixed with `mcp__filesystem__`!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7B.1]*

---
📍 **Section 2 of 4** • ⏱️ ~22 min remaining
---

### 🎯 Quick Win (90 seconds)

Try this: "Help me validate my config.json syntax"
Catch any configuration errors before restarting Claude!

---

## MCP Configuration Deep Dive

### Configuration Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "executable",
      "args": ["arg1", "arg2"],
      "env": {
        "VAR_NAME": "value"
      }
    }
  }
}
```

**Fields:**
- **server-name** - Unique identifier for the server
- **command** - Executable to run (npx, python, docker, etc.)
- **args** - Array of command-line arguments
- **env** - Environment variables (optional)

### npx Servers

For npm-published MCP servers:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "your_token_here"
      }
    }
  }
}
```

### Python Servers

For pip-installed MCP servers:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "python",
      "args": [
        "-m",
        "mcp_server_postgres",
        "postgresql://user:pass@localhost/dbname"
      ]
    }
  }
}
```

### Docker Servers

For containerized MCP servers:

```json
{
  "mcpServers": {
    "custom-server": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "custom-mcp-server:latest"
      ]
    }
  }
}
```

### Environment Variables

Pass secrets and configuration:

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "SLACK_TEAM_ID": "T1234567"
      }
    }
  }
}
```

**Security:** Never commit tokens to git! Use environment variable references or secret managers.

### 💡 Real-World Example

**Scenario:** Team needs to automate GitHub issue triage across 20+ repositories
**Solution:** Configure GitHub MCP server with organization-level token
**Impact:** Claude can search issues, label them, assign to team members, and generate weekly reports automatically

---

## Hands-On Exercise 7B.2: Install GitHub MCP Server

Now install a more complex MCP server!

**Task: Set up the GitHub MCP server**

This gives Claude access to:
- Repository information
- Issues and pull requests
- File contents from GitHub repos
- Commit history
- Code search

### Prerequisites

1. **GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Create new token (classic)
   - Scopes needed: `repo`, `read:org`
   - Copy the token

2. **Install the server**

Test it's available:
```bash
npx -y @modelcontextprotocol/server-github --help
```

### Configuration

Add to your `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/yourusername"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_YOUR_TOKEN_HERE"
      }
    }
  }
}
```

Replace `ghp_YOUR_TOKEN_HERE` with your actual token!

### Test It

After restarting Claude:

1. Ask: "What MCP servers are available?"
2. Try: "Use the GitHub MCP to get info about the anthropics/claude-code repository"
3. Try: "List recent issues in anthropics/claude-code"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7B.2]*

---
📍 **Section 3 of 4** • ⏱️ ~12 min remaining
---

## Using MCP Tools

### Tool Naming Convention

MCP tools are prefixed with `mcp__<server-name>__`:

**Examples:**
- `mcp__filesystem__search` - From filesystem server
- `mcp__github__get_repo` - From GitHub server
- `mcp__postgres__query` - From PostgreSQL server

### Asking Claude to Use MCP Tools

You don't need to know the exact tool names! Just ask naturally:

**Instead of:**
```
Use mcp__filesystem__search with pattern "*.js"
```

**Just say:**
```
Use the filesystem MCP to find all JavaScript files
```

I'll figure out which MCP tool to use!

### MCP Tools vs Built-in Tools

I'll automatically choose the best tool:

**Scenario: Find files**
- If simple pattern in current project → Use built-in Glob
- If complex search across large directories → Use MCP filesystem

**Scenario: GitHub operations**
- If local git commands → Use built-in Bash with git
- If GitHub API needed (issues, PRs, repo info) → Use MCP GitHub

---

## Hands-On Exercise 7B.3: MCP Workflow

Create a workflow using multiple MCP tools!

**Task: Repository Analysis Workflow**

Use MCP tools to analyze a GitHub repository:

1. **Get repository info**
   - Stars, forks, description
   - Primary language
   - Last updated

2. **List recent issues**
   - Open issues
   - Closed issues in last 30 days
   - Top contributors

3. **Analyze repository structure**
   - Count files by type
   - Identify main directories
   - Find documentation files

4. **Generate report**
   - Create a markdown report with all findings
   - Include visualizations (tables, lists)

**Execute this workflow on a popular open-source repo of your choice!**

Try: "Analyze the facebook/react repository using MCP tools and create a report"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7B.3]*

---
📍 **Section 4 of 4** • ⏱️ ~8 min remaining
---

### 🎯 Quick Win (60 seconds)

Try this: "List all available MCP tools from my configured servers"
See the full arsenal of capabilities you've unlocked!

---

## Troubleshooting MCP

### Issue 1: MCP Server Not Loading

**Symptoms:**
- Server doesn't appear in available servers
- No mcp__ tools available

**Debug steps:**

1. **Check config syntax**
   ```bash
   # Validate JSON
   python -m json.tool ~/.claude/config.json
   ```

   Fix any JSON syntax errors!

2. **Check server command**
   ```bash
   # Test the command manually
   npx -y @modelcontextprotocol/server-filesystem --help
   ```

   Should show help output, not error!

3. **Check server logs**
   - Claude Code logs MCP errors
   - Look for error messages when starting

4. **Restart Claude**
   - Config changes require restart
   - Fully exit and restart Claude Code

### Issue 2: MCP Tools Failing

**Symptoms:**
- Server loads but tools fail
- Error messages when using tools

**Debug steps:**

1. **Check permissions**
   - Filesystem server: Do you have read/write access?
   - GitHub server: Is token valid and has correct scopes?

2. **Check arguments**
   - Filesystem: Is directory path correct?
   - Database: Is connection string valid?

3. **Test server directly**
   ```bash
   # Run server manually
   npx @modelcontextprotocol/server-filesystem /path/to/test
   ```

4. **Check environment variables**
   - Are tokens/secrets set correctly?
   - Are they accessible to Claude process?

### Issue 3: Token/Authentication Errors

**Symptoms:**
- "Unauthorized" or "Authentication failed"
- 401/403 errors

**Solutions:**

1. **Regenerate token**
   - Create fresh token on service (GitHub, etc.)
   - Update config.json

2. **Check token scopes**
   - GitHub: needs `repo`, `read:org`
   - Others: check MCP server docs

3. **Verify token format**
   - GitHub: starts with `ghp_`
   - Others: check expected format

### Issue 4: Performance Issues

**Symptoms:**
- MCP operations very slow
- Timeouts

**Solutions:**

1. **Limit scope**
   - Filesystem: Grant access to specific directories, not entire home
   - Database: Use indexes, optimize queries

2. **Check network**
   - API-based MCP servers need good connection
   - Test API directly

3. **Update server**
   ```bash
   # Clear npx cache and reinstall
   npx clear-npx-cache
   npx -y @modelcontextprotocol/server-github
   ```

---

## Hands-On Exercise 7B.4: Debug MCP Setup

Let's practice troubleshooting!

**Task: Intentionally break and fix MCP configuration**

1. **Break it:**
   - Edit config.json with invalid JSON (missing comma)
   - Restart Claude
   - Observe the error

2. **Fix it:**
   - Validate JSON
   - Fix the syntax error
   - Restart and verify it works

3. **Break it again:**
   - Change filesystem path to non-existent directory
   - Try to use filesystem MCP
   - Observe the error

4. **Fix it:**
   - Correct the path
   - Restart and verify

5. **Document:**
   - What were the symptoms?
   - How did you diagnose?
   - What was the fix?

---

*[WAIT FOR USER TO COMPLETE EXERCISE 7B.4]*

---

## Advanced MCP Usage

### Running Multiple MCP Servers

You can run many servers simultaneously:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    },
    "postgres": {
      "command": "python",
      "args": ["-m", "mcp_server_postgres", "postgresql://localhost/mydb"]
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": { "SLACK_BOT_TOKEN": "..." }
    }
  }
}
```

**I'll automatically choose the right server for each task!**

### Scoped File Access

Grant different filesystem servers to different directories:

```json
{
  "mcpServers": {
    "filesystem-home": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me"]
    },
    "filesystem-projects": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/Projects"]
    },
    "filesystem-docs": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/Documents"]
    }
  }
}
```

**Benefits:**
- Fine-grained access control
- Security isolation
- Easier to audit what Claude can access

### Custom MCP Servers

You can build your own MCP servers!

**Use cases:**
- Company-internal APIs
- Custom databases or data sources
- Specialized tools unique to your workflow
- Integration with proprietary systems

**Resources:**
- MCP SDK: https://github.com/modelcontextprotocol/sdk
- Documentation: https://modelcontextprotocol.io
- Examples: https://github.com/modelcontextprotocol/servers

---

## Real-World MCP Workflows

### Workflow 1: Database Migration

With PostgreSQL MCP server:

```
1. Connect to database using MCP
2. Analyze current schema
3. Generate migration SQL
4. Review changes
5. Execute migration
6. Verify with test queries
```

Ask: "Use the PostgreSQL MCP to help me add a new 'status' column to the users table"

### Workflow 2: GitHub Repository Management

With GitHub MCP server:

```
1. List open issues
2. Analyze issue patterns (labels, milestones)
3. Create new issue for found bug
4. Search codebase for relevant files
5. Suggest fix and create PR
```

Ask: "Use GitHub MCP to find all issues labeled 'bug' and prioritize them"

### Workflow 3: Multi-Repo Analysis

With both Filesystem and GitHub MCP:

```
1. Clone repositories locally (GitHub MCP)
2. Search across all repos (Filesystem MCP)
3. Find common patterns
4. Generate documentation
5. Identify inconsistencies
```

Ask: "Analyze all my repositories for outdated dependencies"

### 💡 Real-World Example

**Scenario:** DevOps team managing infrastructure across AWS, monitoring with Slack
**Solution:** Configure AWS MCP + Slack MCP + PostgreSQL MCP servers together
**Impact:** Claude can query cloud resources, check database metrics, and send automated alerts to Slack channels

---
**Navigation:** [← Previous](#using-mcp-tools) | [Menu](#top) | [Next →](#mcp-best-practices)
---

## MCP Best Practices

### Security

**DO:**
- ✅ Only grant access to directories you need
- ✅ Use read-only tokens when possible
- ✅ Regularly rotate API tokens
- ✅ Never commit tokens to git
- ✅ Use environment variable references

**DON'T:**
- ❌ Grant filesystem access to entire home directory
- ❌ Use tokens with excessive permissions
- ❌ Share config files with secrets
- ❌ Leave old tokens active

### Performance

**DO:**
- ✅ Scope filesystem access to specific directories
- ✅ Use database indexes for queries
- ✅ Cache MCP results when appropriate
- ✅ Close connections properly

**DON'T:**
- ❌ Grant filesystem access to huge directories
- ❌ Run expensive queries repeatedly
- ❌ Keep unused MCP servers loaded

### Organization

**DO:**
- ✅ Use descriptive server names in config
- ✅ Document why each server is needed
- ✅ Group related servers
- ✅ Comment complex configurations

**DON'T:**
- ❌ Use generic names like "server1", "server2"
- ❌ Leave unused servers in config
- ❌ Mix development and production configs

---

## Module 7B Complete! 🔌

You've mastered:
✓ Finding MCP servers in registries
✓ Installing MCP servers (npx, pip, docker)
✓ Configuring Claude Code for MCP
✓ Testing MCP connections
✓ Using MCP tools in workflows
✓ Troubleshooting common issues
✓ Security and best practices

### MCP Setup Checklist

Before moving on, ensure you've:
- [ ] Installed filesystem MCP server
- [ ] Configured claude config.json correctly
- [ ] Tested filesystem MCP operations
- [ ] Installed GitHub MCP server (with token)
- [ ] Used GitHub MCP to analyze a repository
- [ ] Debugged a broken MCP configuration
- [ ] Understood security implications

**You're now an MCP expert!** You can extend Claude Code with any external tool or service.

---

## 📋 MCP Quick Reference Card

### Essential Commands
```bash
# Test MCP server
npx @modelcontextprotocol/server-NAME --help

# Validate config
python -m json.tool ~/.claude/config.json

# Clear npx cache
npx clear-npx-cache
```

### Config Template
```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx|python|docker",
      "args": ["arg1", "arg2"],
      "env": { "TOKEN": "value" }
    }
  }
}
```

### Popular Servers
- **Filesystem**: Advanced file operations
- **GitHub**: Repository & issue management
- **PostgreSQL**: Direct database queries
- **Puppeteer**: Browser automation
- **Slack**: Team notifications

### Troubleshooting Quick Checks
1. Valid JSON in config.json?
2. Server command works standalone?
3. Tokens have correct permissions?
4. Claude restarted after config change?

---

**Next up**: Module 8 - Advanced Git & Best Practices!

Type "continue" when ready! 🚀
