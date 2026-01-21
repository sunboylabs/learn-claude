# Practice Project Language Variations

## Overview

The Claude Code learning system now supports **multiple programming languages**! Choose the language you're most comfortable with, and practice on a realistic project in that language.

## Available Languages

### 1. JavaScript/Node.js (Original)
**Location**: `practice-project/`
**Tech Stack**: Express.js, Node.js
**Best For**: Web developers, full-stack engineers

**Features:**
- Express REST API
- Authentication with JWT
- Task CRUD operations
- Jest/Mocha tests
- 16 files, 887 lines
- 6 intentional bugs
- 10+ TODOs

**Files:**
```
practice-project/
├── src/
│   ├── index.js (Express server)
│   ├── auth.js (Auth logic)
│   ├── tasks.js (Task management)
│   └── utils/ (Validation, logging)
├── tests/ (Unit tests)
├── config/ (Configuration)
└── package.json
```

**Exercises:**
- Read package.json and explain dependencies
- Find all TODO comments with Grep
- Fix password validation bug
- Add bcrypt hashing
- Run npm test
- Create git commits

---

### 2. Python/Flask
**Location**: `practice-projects/python-flask/`
**Tech Stack**: Flask, pytest
**Best For**: Python developers, data engineers, ML engineers

**Features:**
- Flask REST API with blueprints
- Authentication system
- Task CRUD operations
- pytest tests
- 13 files, 534 lines
- Pythonic patterns (decorators, list comprehensions)
- 5+ intentional bugs
- 8+ TODOs

**Files:**
```
python-flask/
├── app/
│   ├── __init__.py (Flask factory)
│   ├── auth.py (Auth blueprint)
│   ├── tasks.py (Task blueprint)
│   └── utils/ (Validator, logger)
├── tests/ (pytest tests)
├── config.py (Configuration)
├── run.py (Entry point)
└── requirements.txt
```

**Exercises:**
- Read requirements.txt and explain dependencies
- Find all classes and functions with Grep
- Fix case-insensitive email bug
- Add password strength validation
- Run pytest
- Create git commits with Python changes

**Python-Specific Learning:**
- Flask blueprints and application factory pattern
- List comprehensions and generators
- Decorators (@app.route)
- pytest fixtures
- Type hints (optional TODOs)
- Virtual environment management

---

### 3. SQL Database
**Location**: `practice-projects/sql-database/`
**Tech Stack**: PostgreSQL/MySQL/SQLite compatible
**Best For**: Database engineers, data analysts, backend developers

**Features:**
- Complete database schema (5 tables)
- Sample data (realistic)
- Basic and advanced queries
- Views and indexes
- Query optimization exercises
- 7 files, 355 lines of SQL
- Missing indexes (performance bugs)
- Incomplete queries (TODOs)

**Files:**
```
sql-database/
├── schema/
│   ├── 01_create_tables.sql (Table definitions)
│   ├── 02_create_indexes.sql (Indexes)
│   ├── 03_create_views.sql (Views)
│   └── 04_insert_data.sql (Sample data)
├── queries/
│   ├── basic_queries.sql (SELECT, JOIN, WHERE)
│   └── advanced_queries.sql (CTEs, window functions)
└── procedures/ (Stored procedures)
```

**Exercises:**
- Read schema files and understand relationships
- Find all missing indexes with Grep
- Write query to find overdue tasks
- Optimize slow JOIN query
- Add CHECK constraints
- Create views for common queries
- Explain query plans

**SQL-Specific Learning:**
- Table design and normalization
- Foreign keys and constraints
- Indexes and query optimization
- JOINs (INNER, LEFT, FULL OUTER)
- Subqueries and CTEs
- Window functions (RANK, ROW_NUMBER)
- Views and materialized views
- Query execution plans

---

### 4. Java/Spring Boot (Template)
**Location**: `practice-projects/java-spring/` (to be created)
**Tech Stack**: Spring Boot, Maven/Gradle, JUnit
**Best For**: Java developers, enterprise engineers

**Planned Features:**
- Spring Boot REST API
- Spring Security for auth
- JPA/Hibernate for database
- Task CRUD with repositories
- JUnit 5 tests
- Maven/Gradle build
- Typical Spring patterns

**Structure:**
```
java-spring/
├── src/
│   ├── main/java/com/practice/tasks/
│   │   ├── TaskApplication.java
│   │   ├── controller/ (REST controllers)
│   │   ├── service/ (Business logic)
│   │   ├── repository/ (JPA repositories)
│   │   ├── model/ (Entity classes)
│   │   └── security/ (Auth config)
│   └── test/java/
│       └── com/practice/tasks/ (JUnit tests)
├── src/main/resources/
│   └── application.properties
└── pom.xml / build.gradle
```

**Java-Specific Exercises:**
- Spring dependency injection
- JPA entity relationships
- Spring Security configuration
- RESTful controller design
- Exception handling with @ControllerAdvice
- Unit testing with Mockito
- Maven/Gradle build management

---

### 5. React/TypeScript Frontend (Template)
**Location**: `practice-projects/react-typescript/` (to be created)
**Tech Stack**: React 18, TypeScript, Vite, React Testing Library
**Best For**: Frontend developers, UI engineers

**Planned Features:**
- Task management UI
- TypeScript components
- React hooks (useState, useEffect, custom hooks)
- API integration
- Form validation
- Component tests
- CSS modules or Tailwind

**Structure:**
```
react-typescript/
├── src/
│   ├── components/
│   │   ├── TaskList.tsx
│   │   ├── TaskForm.tsx
│   │   └── LoginForm.tsx
│   ├── hooks/
│   │   ├── useTasks.ts
│   │   └── useAuth.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── tests/ (React Testing Library)
└── package.json
```

**Frontend-Specific Exercises:**
- Component composition
- State management
- TypeScript interfaces
- Custom hooks
- API integration
- Form handling and validation
- Component testing
- Accessibility (a11y)

---

## Choosing Your Language

### When Starting the Tutorial

The skill will ask:
```
Which language would you like to practice with?
1. JavaScript/Node.js (Express)
2. Python (Flask)
3. SQL (Database queries)
4. Java (Spring Boot) - Coming soon
5. React/TypeScript - Coming soon
```

### Language-Specific Exercise Mapping

#### Module 1: First Steps
- **JS**: Read `package.json`, find all `.js` files
- **Python**: Read `requirements.txt`, find all `.py` files
- **SQL**: Read `01_create_tables.sql`, find all tables

#### Module 2: File Operations
- **JS**: Read `src/auth.js` and `tests/auth.test.js` together
- **Python**: Read `app/auth.py` and `tests/test_auth.py` together
- **SQL**: Read schema files and queries together

#### Module 2.2: Find Patterns
- **JS**: `grep -r "TODO" src/` or `grep "BUG:" *.js`
- **Python**: `grep -r "TODO" app/` or `grep "BUG:" *.py`
- **SQL**: `grep "TODO" schema/*.sql` or `grep "BUG:" *.sql`

#### Module 2.3: Create New File
- **JS**: Create `src/utils/helpers.js`
- **Python**: Create `app/utils/helpers.py`
- **SQL**: Create `queries/user_reports.sql`

#### Module 2.4: Fix a Bug
- **JS**: Fix password validation in `src/utils/validator.js`
- **Python**: Fix password validation in `app/utils/validator.py`
- **SQL**: Add missing index in `schema/02_create_indexes.sql`

#### Module 3: Terminal & Git
- **JS**: Run `npm test`, `npm start`
- **Python**: Run `pytest`, `python run.py`
- **SQL**: Run `psql < schema/01_create_tables.sql`

All projects have the same git workflow!

---

## Implementation Status

| Language | Status | Files | Lines | Bugs | TODOs |
|----------|--------|-------|-------|------|-------|
| JavaScript/Node.js | ✅ Complete | 16 | 887 | 6 | 10+ |
| Python/Flask | ✅ Complete | 13 | 534 | 5 | 8+ |
| SQL Database | ✅ Complete | 7 | 355 | 4 | 6+ |
| Java/Spring Boot | 📋 Planned | - | - | - | - |
| React/TypeScript | 📋 Planned | - | - | - | - |

---

## Benefits of Multiple Languages

### For Learners
✅ **Practice in your language** - No language barrier
✅ **Language-specific patterns** - Idioms and best practices
✅ **Real-world code** - Not toy examples
✅ **Same concepts** - Learn Claude Code, not the language
✅ **Portfolio ready** - Actual projects to show

### For Teachers
✅ **Broader audience** - Reach more developers
✅ **Language agnostic** - Focus on Claude Code skills
✅ **Easy to extend** - Add more languages
✅ **Consistent structure** - Same task domain across languages

---

## Adding New Languages

Want to add Go, Rust, C#, or another language?

### Template Structure
Each language variation should have:
1. **Same domain** - Task Management API/System
2. **Similar complexity** - 10-15 files, 400-800 lines
3. **Intentional bugs** - 4-6 realistic issues
4. **TODOs** - 8-12 incomplete features
5. **Tests** - Some complete, some TODO
6. **Git-ready** - Initialized repository
7. **README** - Clear setup instructions

### Common Elements
- Authentication system
- Task CRUD operations
- Input validation
- Error handling
- Tests (unit/integration)
- Configuration
- Logging/utilities

### Language-Specific Elements
- Use idiomatic patterns
- Include language-specific bugs (type errors, null handling, etc.)
- Use popular frameworks (Express, Flask, Spring, Django, etc.)
- Follow community conventions

---

## Setup Instructions

### JavaScript/Node.js
```bash
cp -r practice-project ~/learning/
cd ~/learning/practice-project
npm install  # (optional, no real dependencies)
```

### Python/Flask
```bash
cp -r practice-projects/python-flask ~/learning/
cd ~/learning/python-flask
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

### SQL Database
```bash
cp -r practice-projects/sql-database ~/learning/
cd ~/learning/sql-database

# PostgreSQL
psql -U postgres < schema/01_create_tables.sql

# MySQL
mysql -u root -p < schema/01_create_tables.sql

# SQLite
sqlite3 tasks.db < schema/01_create_tables.sql
```

---

## Future Language Additions

Planned additions:
- **Java/Spring Boot** - Enterprise Java development
- **React/TypeScript** - Modern frontend development
- **Go** - Systems programming, APIs
- **Rust** - Systems programming, memory safety
- **C#/.NET** - Enterprise application development
- **Ruby on Rails** - Web application framework
- **PHP/Laravel** - Web development
- **Kotlin** - Android/JVM development

Community contributions welcome!

---

## Language-Agnostic Skills

Regardless of language, you'll learn:
- **Read**: Reading any file
- **Glob**: Finding files by pattern
- **Grep**: Searching content
- **Write**: Creating new files
- **Edit**: Modifying existing files
- **Bash**: Running commands
- **Git**: Version control operations
- **TodoWrite**: Task management
- **Parallel operations**: Efficiency
- **Sub-agents**: Complex exploration

The language is just the practice vehicle - the Claude Code skills are universal! 🚀
