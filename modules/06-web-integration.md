# Module 6: Web Integration 🌐

## What You'll Learn

Claude Code can access the web to fetch documentation, search for current information, and interact with browsers. This makes it incredibly powerful for real-world development tasks!

You'll master:
- **WebFetch** - Fetching and analyzing web pages and documentation
- **WebSearch** - Searching for up-to-date information (US only)
- **Chrome/Playwright** - Browser automation and testing
- **Integration patterns** - Combining tools for powerful workflows
- **Real-world scenarios** - Practical web-enabled development

---

## Why Web Integration Matters

Claude's training data has a cutoff date (January 2025). Web integration solves this by:
- Accessing latest documentation for libraries and frameworks
- Finding current best practices and security advisories
- Checking latest versions and changelogs
- Automating browser testing and interactions
- Gathering real-time data from live websites

**Without web integration:**
```
You: "How do I use React 19's new features?"
Claude: "Based on my training data, React 19 isn't released yet..."
```

**With web integration:**
```
You: "Fetch the React 19 docs and show me the new features"
Claude: *fetches latest docs* "React 19 introduces Actions, useFormStatus..."
```

---

## WebFetch: Documentation Access

WebFetch retrieves web content and processes it with AI to extract relevant information.

### How WebFetch Works Internally

**Process flow:**
1. You request a URL to be fetched
2. Claude Code downloads the page (server-side request)
3. HTML is converted to markdown (clean, readable format)
4. Content is analyzed by a small, fast AI model
5. Relevant information is extracted based on your prompt
6. Results are integrated into Claude's context
7. Claude uses this information to help you

**What makes it powerful:**
- Handles complex HTML and JavaScript-rendered sites
- Extracts meaningful content from documentation
- Filters out navigation, ads, and irrelevant content
- Processes with AI to answer specific questions
- Returns structured, useful information
- Caches for 15 minutes to avoid rate limits

**Technical note:** WebFetch is server-side, so it bypasses CORS restrictions and doesn't require browser JavaScript execution (unlike Playwright).

### WebFetch Syntax

**Basic usage:**
```
"Fetch [URL] and [what you want to do with it]"
```

**Examples:**
```
"Fetch https://react.dev/reference/react/useEffect and explain the cleanup function"

"Get the TypeScript handbook page on generics and help me write a generic function"

"Fetch the Tailwind CSS flexbox docs and show me how to center content vertically"

"Retrieve the Express.js routing documentation and summarize route parameters"
```

### Step-by-Step WebFetch Tutorial

**Scenario:** You need to implement React hooks but want the latest documentation.

**Step 1: Request the fetch**
```
"Fetch the React hooks documentation from react.dev and summarize the useState hook"
```

**What happens:**
- Claude Code accesses https://react.dev/reference/react/useState
- HTML is converted to clean markdown
- Content is analyzed by AI
- useState information is extracted

**Step 2: Claude processes the content**

You'll see output like:
```
I've fetched the useState documentation. Here's a summary:

useState is a React Hook that lets you add state to function components...
[detailed summary based on current docs]
```

**Step 3: Use the information in context**

The fetched docs are now in Claude's context! You can reference them:
```
"Based on the React docs you fetched, help me refactor this class component to use hooks"

"Show me examples from the docs of useState with objects"

"What does the documentation say about lazy initial state?"

"According to the docs, how should I update state that depends on previous state?"
```

**Step 4: Apply to your code**
```
"Using the useState patterns from the docs, update my counter component in src/Counter.js"
```

Claude will implement the patterns correctly based on official documentation!

### WebFetch Use Cases

**Use Case 1: API Documentation**
```
"Fetch the Stripe API docs for creating a payment intent and help me implement it"
```

**Why it's powerful:**
- Gets current API version (not outdated training data)
- Ensures you use latest parameters and best practices
- Includes recent security recommendations
- Shows current code examples

**Use Case 2: Framework Migration**
```
"Fetch the Vue 3 migration guide and analyze my Vue 2 components for required changes"
```

**Why it's essential:**
- Official migration guidance from framework authors
- Identifies breaking changes specific to your code
- Suggests safe upgrade paths
- References current version's features

**Use Case 3: Library Configuration**
```
"Fetch the Vite configuration reference and help me set up a custom build"
```

**Why it helps:**
- Complex config options change frequently
- Documentation has examples for your exact use case
- Explains defaults and advanced options
- Shows plugin integration patterns

**Use Case 4: Error Resolution**
```
"Fetch the Next.js error page for NEXT_REDIRECT and explain why I'm getting this error"
```

**Why it's effective:**
- Official error explanations from framework docs
- Context-specific troubleshooting steps
- Common causes and solutions
- Links to related issues

**Use Case 5: Learning New Features**
```
"Fetch the Python 3.12 release notes and explain the new f-string syntax features"
```

**Why it matters:**
- Training data might not include latest features
- Official docs explain design decisions
- Includes migration examples
- Shows compatibility notes

---

## Hands-On Exercise 6.1: Fetch Documentation

Let's practice fetching documentation!

**Task:** Choose a library or framework you use and fetch its documentation.

**Easy Examples to Try:**

1. **React Hooks:**
   ```
   "Fetch the React useEffect documentation and explain the dependency array"
   ```

2. **Tailwind CSS:**
   ```
   "Get the Tailwind CSS grid documentation and help me create a responsive 3-column layout"
   ```

3. **Express.js:**
   ```
   "Fetch the Express.js middleware documentation and show me how to create custom middleware"
   ```

4. **Playwright Testing:**
   ```
   "Fetch the Playwright assertions docs and show me how to test element visibility"
   ```

**Your turn:** Pick a technology you're working with and ask me to fetch its documentation!

**Challenge Questions After Fetching:**
- "From those docs, implement [specific feature]"
- "According to the docs, what's the difference between [X] and [Y]?"
- "Show me the example code from the docs for [use case]"

---

*[WAIT FOR USER TO COMPLETE EXERCISE 6.1]*

---

## WebSearch: Current Information

WebSearch queries search engines and returns up-to-date results from multiple sources.

### How WebSearch Works

**Process:**
1. You request a search query
2. Claude Code performs web search via search API
3. Multiple results are retrieved and ranked
4. Content from top results is processed
5. Information is synthesized into a comprehensive answer
6. Sources are cited

**Key difference from WebFetch:**
- **WebFetch:** Gets ONE specific URL you provide
- **WebSearch:** Searches MULTIPLE sources and finds URLs

**Analogy:**
- WebFetch = Opening a specific book to a specific page
- WebSearch = Going to a library and searching for books on a topic

### WebSearch Syntax

**Basic usage:**
```
"Search for [your query]"
"Find recent [topic]"
"What are the latest [thing]"
"Look up current [information]"
```

**Examples:**
```
"Search for React 19 new features"

"Find the latest security vulnerabilities in Express.js"

"What is the current stable version of Python?"

"Search for best practices for JWT authentication 2025"

"Look up Next.js 14 vs 15 comparison"
```

### Comprehensive WebSearch Use Cases

**Use Case 1: Latest Versions**
```
"Search for the latest stable version of Node.js and its release notes"
```

**Why it matters:**
- Package managers might cache old versions
- Release schedules change
- You want LTS (Long Term Support) recommendations
- Need to know EOL (End of Life) dates

**Use Case 2: Security Advisories**
```
"Search for recent security vulnerabilities in lodash"
```

**Why it's critical:**
- Security issues are discovered constantly
- Training data is outdated for security
- CVE databases are updated daily
- Patch recommendations change

**Use Case 3: Best Practices Evolution**
```
"Search for current React performance optimization best practices"
```

**Why it helps:**
- Best practices evolve with framework versions
- Community learns new patterns
- Anti-patterns are discovered
- Performance characteristics change

**Use Case 4: Breaking Changes**
```
"Search for breaking changes in TypeScript 5.5"
```

**Why it's essential:**
- Plan migrations before upgrading
- Understand effort required
- Find migration guides
- Discover compatibility issues

**Use Case 5: Compatibility Checking**
```
"Search for Next.js 15 compatibility with React 19"
```

**Why you need it:**
- Framework versions have strict dependencies
- Avoid incompatibility issues
- Find recommended pairings
- Discover workarounds if needed

**Use Case 6: Package Comparison**
```
"Search for comparison of axios vs fetch in 2025"
```

**Why it's valuable:**
- Recommendations change over time
- New alternatives emerge
- Performance characteristics shift
- Community preferences evolve

**Use Case 7: Debugging Production Issues**
```
"Search for common causes of CORS errors in Next.js API routes"
```

**Why it's practical:**
- Find solutions from others with same issue
- Discover recent bugs and fixes
- Get workarounds while waiting for patches
- Learn from Stack Overflow discussions

### WebSearch vs WebFetch Decision Guide

**Use WebSearch when:**
- You need current information (versions, dates, recent news)
- You want to compare multiple sources
- The specific URL is unknown
- You need broad coverage of a topic
- Looking for "best practices" or community opinions
- Researching multiple options
- Finding recent discussions or issues

**Use WebFetch when:**
- You have a specific URL to retrieve
- You need detailed documentation from one source
- You want official docs, not blog posts
- You need complete reference material
- The content is extensive (like full API docs)
- You're implementing based on official specs
- You need exact code examples from docs

**Example decision matrix:**

| Goal | Tool | Query |
|------|------|-------|
| Latest Next.js version | WebSearch | "Search for Next.js latest version" |
| Next.js API reference | WebFetch | "Fetch nextjs.org/docs/api-reference" |
| Security vulnerabilities | WebSearch | "Search for Next.js security issues 2025" |
| Specific error explanation | WebFetch | "Fetch Next.js error page for ERR_CODE" |
| Best date picker library | WebSearch | "Search for best React date picker 2025" |
| Date picker docs | WebFetch | "Fetch react-datepicker documentation" |
| Framework comparison | WebSearch | "Search for Vue vs React 2025" |
| Framework tutorial | WebFetch | "Fetch Vue.js getting started guide" |

---

## Hands-On Exercise 6.2: Web Search Practice

Practice using WebSearch for current information!

**Task 1: Version Checking**
```
"Search for the latest stable versions of React, Vue, and Angular"
```

**Task 2: Security Research**
```
"Search for recent security best practices for REST API authentication"
```

**Task 3: Breaking Changes**
Choose a library you use and search for recent breaking changes:
```
"Search for [library name] breaking changes 2025"
```

**Task 4: Performance Optimization**
```
"Search for current JavaScript bundle size optimization techniques"
```

**Task 5: Tool Comparison**
```
"Search for comparison of Vite vs webpack in 2025"
```

**Your turn:** Ask me to search for current information about a technology you're interested in!

**Bonus Challenge:**
Combine search results with your existing knowledge:
```
"Based on the search results, how should I upgrade my project from [old version] to [new version]?"
```

---

*[WAIT FOR USER TO COMPLETE EXERCISE 6.2]*

---

## Important: WebSearch Limitations

### Availability: US Only

**Critical limitation:** WebSearch is only available in the United States.

**If you're outside the US:**
- WebSearch will not work (you'll get an error)
- Claude Code doesn't have access to the search API
- VPNs likely won't help (may violate ToS)

**Error you'll see:**
```
"WebSearch is not available in your region"
```

**Effective Workarounds:**

**1. Use WebFetch with Known URLs**
```
Instead of: "Search for React latest version"
Use: "Fetch https://github.com/facebook/react/releases and show the latest version"
```

**2. Check GitHub Releases**
```
"Fetch the GitHub releases page for facebook/react and summarize recent changes"
```

**3. Use Package Registries**
```
"Fetch https://registry.npmjs.org/react and show the latest version and dependencies"
```

**4. Fetch Changelog Files**
```
"Fetch https://raw.githubusercontent.com/[org]/[repo]/main/CHANGELOG.md"
```

**5. Use Official Blogs**
```
"Fetch the React blog at react.dev/blog and summarize recent posts"
```

### Rate Limits and Caching

**WebFetch caching:**
- Results are cached for 15 minutes automatically
- Repeat requests use cached content
- Saves time and avoids rate limits
- Cache is transparent (no action needed)

**Best practices:**
```
Good pattern:
1. "Fetch the React docs on useEffect"
2. "From those docs, explain cleanup functions"
3. "From the same docs, show dependency array examples"
4. "Based on the docs, refactor my code"

Bad pattern:
1. "Fetch React useEffect docs"
2. "Fetch React useEffect docs again"  ← Unnecessary!
3. "Fetch the same docs once more"    ← Wasteful!
```

**How to leverage caching:**
- Ask multiple questions about cached content
- Reference "the docs you fetched" or "from those docs"
- Chain related queries without re-fetching
- Use cached docs for implementation

---

## Chrome/Playwright Integration

Claude Code can control Chrome via Playwright for browser automation and testing!

### What is Playwright Integration?

**Playwright** is a browser automation framework maintained by Microsoft. Claude Code uses it to:
- Navigate web pages programmatically
- Click buttons and links
- Fill forms and input data
- Extract data from pages
- Take screenshots and snapshots
- Run automated tests
- Monitor browser console

**Think of it as:** Claude Code controlling a real browser to interact with websites on your behalf.

**Key difference from WebFetch:**
- **WebFetch:** Server-side, gets static HTML
- **Playwright:** Browser-side, executes JavaScript, handles dynamic content

### Playwright Capabilities

**Navigation:**
- Open URLs (local or remote)
- Click links and navigate
- Go back/forward in history
- Reload pages
- Switch between tabs
- Handle pop-ups

**User Interactions:**
- Fill text fields
- Click buttons
- Select dropdown options
- Check/uncheck checkboxes
- Upload files
- Press keyboard keys
- Hover over elements
- Drag and drop

**Data Extraction:**
- Read page content
- Extract specific elements by role, text, selector
- Scrape tables and lists
- Get page snapshots (accessibility tree)
- Capture screenshots (full page or specific elements)
- Read element attributes

**Testing & Validation:**
- Verify element visibility
- Check page content
- Test form submissions
- Validate navigation flows
- Monitor console errors and warnings
- Check network requests
- Assert element states

### Playwright Setup

**Check if Playwright is available:**
```
"Navigate to https://example.com"
```

**If not installed:**
Claude Code will detect this and may prompt you to install Playwright browsers.

**Manual installation (if needed):**
```bash
npm install -D @playwright/test
npx playwright install chromium
```

Or just the browsers:
```bash
npx playwright install chromium
```

### Comprehensive Playwright Tutorial

**Scenario:** Test a login form on your local web application.

**Step 1: Navigate to page**
```
"Open http://localhost:3000/login in Playwright"
```

**What happens:**
- Playwright launches headless Chrome
- Navigates to your local app
- Waits for page to load
- Returns status

**Step 2: Take snapshot to see page structure**
```
"Take a snapshot of the current page"
```

**What you get:**
- Accessibility tree showing all interactive elements
- Element roles (button, textbox, link, etc.)
- Element labels and text
- Page structure in markdown format

**Example snapshot:**
```
heading "Login to Your Account" [level=1]
textbox "Email" [required]
textbox "Password" [required, type=password]
checkbox "Remember me"
button "Sign In"
link "Forgot password?"
```

**Step 3: Fill form fields**
```
"Fill the Email field with 'test@example.com' and the Password field with 'SecurePass123!'"
```

**What happens:**
- Playwright locates text fields by label
- Types the values you specified
- Validates field types match

**Step 4: Submit the form**
```
"Click the Sign In button"
```

**Alternative:**
```
"Fill the form and press Enter to submit"
```

**Step 5: Verify result**
```
"Take a screenshot and check if login was successful"
```

Or:
```
"Wait for navigation to complete and take a snapshot of the dashboard"
```

**Step 6: Extract data**
```
"Read the welcome message from the page"
```

Or:
```
"Extract the user's name displayed in the header"
```

**Step 7: Check for errors**
```
"Show me any browser console errors or warnings"
```

This helps debug JavaScript issues!

### Real-World Playwright Use Cases

**Use Case 1: Automated End-to-End Testing**
```
"Navigate to my local app at http://localhost:3000, test the complete user registration flow:
1. Fill registration form
2. Submit and verify confirmation email message
3. Click email verification link (simulate)
4. Verify redirect to dashboard
5. Take screenshots at each step
6. Report any console errors"
```

**Use Case 2: Web Scraping Dynamic Content**
```
"Go to https://example.com/products, wait for products to load via JavaScript, scroll to load all items with infinite scroll, then extract product names, prices, and availability status"
```

**Why Playwright over WebFetch:** Dynamic content loaded by JavaScript.

**Use Case 3: Form Automation**
```
"Open the complex multi-step registration form at [URL]:
1. Fill personal information (step 1)
2. Click Next
3. Fill address details (step 2)
4. Click Next
5. Select preferences (step 3)
6. Submit and capture success message"
```

**Use Case 4: Visual Regression Testing**
```
"Take screenshots of my app at these breakpoints:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1920px width)
Save as mobile.png, tablet.png, desktop.png"
```

**Use Case 5: Debugging Production Issues**
```
"Navigate to my production app, open developer console, perform the failing action, and show me:
1. Console errors
2. Failed network requests
3. Current page snapshot
4. Screenshot of error state"
```

**Use Case 6: Competitive Analysis**
```
"Visit competitor websites [list], extract:
1. Pricing tiers and features
2. Main call-to-action text
3. Screenshots of hero sections
4. Product descriptions
Create a comparison table"
```

---

## Hands-On Exercise 6.3: Browser Automation

Practice browser automation with Playwright!

**Task 1: Basic Navigation**
```
"Navigate to https://example.com, take a screenshot, and describe what you see"
```

**Task 2: Form Interaction**
Try a public search engine:
```
"Go to https://duckduckgo.com, search for 'web development', and take a screenshot of the results"
```

**Task 3: Local App Testing**
If you have a local web app running:
```
"Open http://localhost:3000, take a snapshot to see available interactions, then navigate through the main user flows"
```

**Task 4: Data Extraction**
```
"Go to a news website, extract the top 5 headlines, and list them with their links"
```

**Task 5: Multi-Step Flow**
```
"Visit [e-commerce site], search for a product, click the first result, extract the product details (name, price, description), and take a screenshot"
```

**Your turn:** Ask me to interact with a website using Playwright!

**Challenge:** Test a complete user flow on your own application.

---

*[WAIT FOR USER TO COMPLETE EXERCISE 6.3]*

---

## Real-World Scenario 1: Implement Feature from Latest API Docs

**Scenario:** You need to implement Stripe payment processing using the latest API.

**Step 1: Fetch the documentation**
```
"Fetch the Stripe API documentation for Payment Intents at https://stripe.com/docs/api/payment_intents/create and summarize how to create a payment intent"
```

**Step 2: Review your current code**
```
"Here's my current payment processing code in server/payment.js:

[paste your code]

Based on the Stripe docs you fetched, is this implementation correct and using the latest API?"
```

**Step 3: Implement the feature**
```
"Using the official Stripe API docs you fetched, update my payment.js to properly create a payment intent with:
- Amount and currency
- Automatic payment methods
- Error handling
- Webhook setup"
```

**Step 4: Validate against docs**
```
"Check if my implementation matches all the best practices mentioned in the Stripe docs, especially around:
- Security
- Error handling
- Idempotency
- Testing"
```

**Step 5: Test the implementation**
```
"Create a test file that simulates payment intent creation using Stripe test mode"
```

**Result:** You've implemented a critical payment feature using current, official documentation, ensuring correctness and security!

---

## Real-World Scenario 2: Security Audit with Current Best Practices

**Scenario:** You're implementing JWT authentication and want to ensure you follow current security best practices.

**Step 1: Search for current best practices**
```
"Search for JWT authentication security best practices 2025"
```

**Step 2: Fetch specific security resources**
```
"Fetch the OWASP JWT security cheat sheet and summarize the key recommendations"
```

**Step 3: Audit your existing code**
```
"Here's my JWT implementation in auth/jwt.js:

[paste code]

Based on the OWASP security best practices you fetched, identify any vulnerabilities or security issues"
```

**Step 4: Search for recent vulnerabilities**
```
"Search for recent JWT library vulnerabilities in jsonwebtoken npm package"
```

**Step 5: Apply improvements**
```
"Update my JWT implementation to follow OWASP recommendations, including:
- Proper token expiration
- Refresh token rotation
- Algorithm specification
- Signature verification
- Secret management"
```

**Step 6: Create security tests**
```
"Create security test cases for my JWT implementation covering:
- Token expiration
- Invalid signatures
- Algorithm confusion attacks
- Token replay"
```

**Result:** Security-hardened authentication system following current best practices and protected against known vulnerabilities!

---

## Real-World Scenario 3: Automated Multi-Step Form Testing

**Scenario:** You built a complex multi-step registration form and need comprehensive testing.

**Step 1: Navigate to your app**
```
"Open http://localhost:3000/register in Playwright"
```

**Step 2: Understand form structure**
```
"Take a snapshot of the registration form and describe all the fields and steps"
```

**Step 3: Test Step 1 - Personal Info**
```
"Fill the registration form step 1:
- Email: test@example.com
- Password: SecurePass123!
- Confirm Password: SecurePass123!
Then click Next"
```

**Step 4: Test Step 2 - Profile Details**
```
"Fill step 2:
- First Name: Test
- Last Name: User
- Phone: 555-123-4567
- Date of Birth: 01/15/1990
Then click Next"
```

**Step 5: Test Step 3 - Preferences**
```
"On step 3:
- Check 'Email notifications'
- Select 'Weekly' for digest frequency
- Uncheck 'SMS notifications'
Then click Submit"
```

**Step 6: Verify success**
```
"Wait for submission to complete, take a screenshot, and verify:
1. Success message appears
2. User is redirected to dashboard
3. Welcome message shows correct name"
```

**Step 7: Test validation**
```
"Go back to the registration form and test validation:
1. Try submitting empty form
2. Try mismatched passwords
3. Try invalid email format
4. Verify error messages appear correctly"
```

**Step 8: Check console for errors**
```
"Show me all browser console errors and warnings from the registration flow"
```

**Result:** Comprehensive automated testing of complex form with validation coverage!

---

## Real-World Scenario 4: Competitive Analysis Automation

**Scenario:** You need to collect and compare product pricing data from competitor websites.

**Step 1: Navigate and analyze first competitor**
```
"Open https://competitor1.com/pricing in Playwright and take a snapshot to understand the page structure"
```

**Step 2: Extract pricing data**
```
"From the competitor1 pricing page, extract:
- All pricing tiers (names)
- Prices for each tier
- Features included in each tier
- Any promotional discounts mentioned"
```

**Step 3: Navigate to second competitor**
```
"Open https://competitor2.com/pricing and extract the same information"
```

**Step 4: Handle dynamic content**
```
"If the pricing loads dynamically, wait for all content to load before extracting data"
```

**Step 5: Format and analyze**
```
"Create a comparison table showing:
- Feature comparison across all competitors
- Price positioning
- Value propositions
- Unique features"
```

**Step 6: Save data**
```
"Save all extracted competitor data to data/competitor-analysis.json with today's date"
```

**Step 7: Generate insights**
```
"Based on the competitor pricing data, suggest pricing strategies for our product"
```

**Step 8: Automate with script**
```
"Create a script that I can run weekly to automatically collect this competitive intelligence"
```

**Result:** Automated competitive analysis with regular data collection!

---

## Hands-On Exercise 6.4: Complete Web Workflow

Combine WebFetch, WebSearch, and Playwright in one complete workflow!

**Scenario:** Research a library, implement a feature, and test it end-to-end.

**Part 1: Research (WebSearch)**
```
"Search for the best React date picker libraries in 2025"
```

**Part 2: Get Documentation (WebFetch)**
```
"Fetch the documentation for [chosen library] and show me:
- Installation instructions
- Basic usage example
- Props/configuration options
- Styling customization"
```

**Part 3: Implement Feature**
```
"Create a React component DatePickerExample.jsx that uses the date picker according to the docs, with:
- Basic date selection
- Custom styling
- Form integration
- Validation"
```

**Part 4: Create Test Page**
```
"Create a test HTML page that imports and displays this component"
```

**Part 5: Test with Playwright**
```
"Start a local server, open the test page in Playwright, interact with the date picker (select a date), and verify it works correctly"
```

**Part 6: Document**
```
"Create a README.md documenting:
- Library choice and rationale (from search)
- Implementation details (from docs)
- Test results (from Playwright)
- Screenshots"
```

Complete this full workflow for any library/feature you choose!

---

*[WAIT FOR USER TO COMPLETE EXERCISE 6.4]*

---

## Common Pitfalls

### Pitfall 1: URL Redirects

**Problem:** Some URLs redirect to different domains, and WebFetch handles them specially.

**What happens:**
```
"Fetch https://bit.ly/react-docs"
→ Redirects to https://react.dev/docs
→ WebFetch informs you of the redirect
```

**WebFetch behavior:**
- If redirect is to same domain: Follows automatically
- If redirect is to different domain: Reports redirect, requires confirmation

**Solution:**
```
"Fetch the redirected URL at https://react.dev/docs"
```

**Best practice:** Use canonical URLs (the final destination) to avoid redirects entirely.

**How to find canonical URL:**
1. Open URL in browser
2. Check final URL in address bar
3. Use that URL with WebFetch

### Pitfall 2: JavaScript-Heavy Sites

**Problem:** Some sites require JavaScript to render content (SPAs, React apps).

**Symptoms:**
- WebFetch returns minimal content
- Only sees loading spinners or "Please enable JavaScript"
- Missing navigation or main content
- Empty placeholder divs

**Why it happens:**
- WebFetch gets initial HTML only
- No JavaScript execution
- Dynamic content never loads

**Solution: Use Playwright instead**
```
Bad: "Fetch https://js-heavy-docs.com/guide"
Good: "Open https://js-heavy-docs.com/guide in Playwright, wait for content to load, then extract the documentation"
```

**When to suspect JavaScript-heavy sites:**
- Modern single-page apps (SPAs)
- React/Vue/Angular documentation sites
- Interactive documentation
- Sites that feel like "web apps"

### Pitfall 3: Authentication Required

**Problem:** Some pages require login to access.

**WebFetch limitation:** Cannot authenticate (no cookies, no login).

**Symptoms:**
- Returns login page instead of content
- "Unauthorized" or "Please log in" messages
- Redirected to authentication page

**Playwright solution:**
```
"Open https://app.example.com in Playwright, fill login form with username 'demo' and password 'password123', submit, wait for dashboard to load, then navigate to /protected/data and extract the information"
```

**For APIs requiring authentication:**
```
Use Bash with curl:
"Use curl to fetch https://api.example.com/data with Bearer token authentication"
```

### Pitfall 4: Rate Limiting

**Problem:** Fetching same domain repeatedly may hit rate limits.

**Good news:** WebFetch caches for 15 minutes automatically!

**Best practices:**
```
Good approach:
1. "Fetch the React docs"
2. "From those docs, explain hooks"
3. "From the same docs, show examples"
4. "Based on the docs, implement my component"

Bad approach:
1. "Fetch React docs"
2. "Fetch React docs again"  ← Uses cache, but wasteful
3. [5 minutes later]
4. "Fetch React docs once more"  ← Still cached
```

**If you hit rate limits:**
- Wait a few minutes
- Use cached content with "from the docs you fetched"
- Check if site has API with higher limits

### Pitfall 5: Dynamic Content and Infinite Scroll

**Problem:** Content loads as you scroll (infinite scroll, lazy loading).

**WebFetch limitation:** Gets only initially visible content.

**Playwright solution:**
```
"Open [URL] in Playwright, scroll down to load all content with infinite scroll, then extract all items"
```

**Explicit scrolling:**
```
"Scroll to the bottom of the page 5 times with 2 second pauses between scrolls to load all content"
```

### Pitfall 6: CORS Issues (Playwright Only)

**Problem:** CORS restrictions apply to Playwright (it's a real browser).

**Understanding:**
- **WebFetch:** Server-side, no CORS restrictions
- **Playwright:** Browser-side, CORS applies

**Symptoms in Playwright:**
- API calls fail with CORS errors
- Console shows "blocked by CORS policy"
- Some features don't work

**Solutions:**

**For testing APIs directly:**
```
Use WebFetch instead:
"Fetch https://api.example.com/data"
```

**For local development:**
Configure CORS in your server:
```javascript
// Express example
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

**For testing production:**
- Test CORS-compliant endpoints
- Use proxy for testing
- Test full user flows (not direct API calls)

### Pitfall 7: Stale Documentation

**Problem:** Even fetched docs can be outdated if the page itself is old.

**Solution: Verify freshness**
```
"Fetch the docs and check the last updated date or version number"
```

**Combine with search:**
```
"Search for [library] latest version, then fetch the docs for that specific version"
```

**Check changelog:**
```
"Fetch the CHANGELOG.md from GitHub to see recent changes"
```

---

## Troubleshooting Guide

### Issue: WebFetch Returns Minimal Content

**Symptoms:**
- Only navigation and headers returned
- Main content missing
- Says "loading..." or "Please enable JavaScript"

**Diagnosis:**
Site requires JavaScript to render content (SPA).

**Solutions:**

**Solution 1: Use Playwright**
```
"Open [URL] in Playwright, wait for content to load, then take a snapshot and extract the information"
```

**Solution 2: Find alternative documentation**
```
"Search for [topic] and find documentation that works without JavaScript"
```

**Solution 3: Check for API docs**
Some sites have API docs that are static HTML:
```
"Fetch [site]/api-reference instead of [site]/docs"
```

### Issue: WebSearch Not Working

**Symptoms:**
- "WebSearch unavailable" error
- "Not available in your region"
- No results returned

**Diagnosis and Solutions:**

**1. Region Check**
- WebSearch is US-only
- If outside US, use alternatives

**Alternatives to WebSearch:**

```
Option 1: GitHub releases
"Fetch https://github.com/[org]/[repo]/releases"

Option 2: npm registry
"Fetch https://registry.npmjs.org/[package]"

Option 3: Official blogs
"Fetch [project-site]/blog"

Option 4: Changelog files
"Fetch raw.githubusercontent.com/[org]/[repo]/main/CHANGELOG.md"
```

**2. Network Check**
- Verify internet connection
- Try WebFetch to test connectivity

**3. Query Issues**
- Rephrase search query
- Be more specific
- Add year to query

### Issue: Playwright Element Not Found

**Symptoms:**
- "Element not found" error
- "Cannot find button/input/link"
- Operation fails

**Diagnosis:**
Element selector is incorrect, or element loads dynamically.

**Solution Process:**

**Step 1: Take snapshot**
```
"Take a snapshot of the current page"
```

**Step 2: Review structure**
Look at the snapshot to see actual element labels and roles.

**Step 3: Use correct reference**
```
Instead of: "Click the submit button"
Use: "Click the button with text 'Submit Form'"
```

**Step 4: Wait for element**
```
"Wait for the submit button to appear, then click it"
```

**Step 5: Try alternative selectors**
```
"Click the button with aria-label 'Submit'"
```

### Issue: Playwright Timeout

**Symptoms:**
- Operation times out after 30 seconds
- "Timeout exceeded" error
- Page doesn't load

**Diagnosis:**
- Slow network connection
- Page takes long to load
- Element never appears
- Waiting for wrong condition

**Solutions:**

**Solution 1: Increase wait time**
```
"Wait for 10 seconds for the page to fully load, then proceed"
```

**Solution 2: Wait for specific element**
```
"Wait for the main content to appear before taking action"
```

**Solution 3: Check network conditions**
```
"Show me any failed network requests that might be blocking page load"
```

**Solution 4: Try simpler approach**
```
Instead of: "Wait for all animations to complete"
Use: "Wait 5 seconds then continue"
```

### Issue: Playwright Browser Not Installed

**Symptoms:**
- "Browser not found" error
- "Playwright not installed"
- Commands fail immediately

**Solution:**
```bash
# Install Playwright and browsers
npm install -D @playwright/test
npx playwright install chromium

# Or just browsers
npx playwright install
```

**Verify installation:**
```
"Check if Playwright is installed by navigating to example.com"
```

### Issue: WebFetch Returns Login Page

**Symptoms:**
- Gets login page instead of content
- "Please sign in" messages
- Redirected to authentication

**Diagnosis:**
Content requires authentication.

**Solutions:**

**Solution 1: Use Playwright with login**
```
"Open [site] in Playwright, log in with [credentials], then navigate to [protected page] and extract content"
```

**Solution 2: Find public documentation**
```
"Search for public documentation for [topic]"
```

**Solution 3: Use API with authentication**
```
"Use curl with bearer token to fetch [API endpoint]"
```

---

## Best Practices

### DO: Be Specific with WebFetch Requests

**Good:**
```
"Fetch the React useEffect documentation at react.dev/reference/react/useEffect and explain:
1. The cleanup function's purpose
2. When cleanup runs
3. Common cleanup use cases"
```

**Bad:**
```
"Fetch React docs"  ← Which docs? What are you looking for?
```

**Why:** Specific requests get better results. The AI model processing the page knows what to extract.

### DO: Use WebSearch for Truly Current Information

**Good:**
```
"Search for the latest security vulnerabilities in Express.js discovered in 2025"
```

**Bad:**
```
"What are Express.js security vulnerabilities?"  ← Uses training data, might be outdated
```

**Why:** WebSearch gets current information; asking without searching uses potentially outdated training data.

### DO: Take Snapshots Before Playwright Actions

**Good pattern:**
```
"Open [URL] in Playwright"
"Take a snapshot to see the page structure"
[Review snapshot]
"Fill the email field and click the blue Submit button"
```

**Bad pattern:**
```
"Open [URL] and fill the email field"  ← Might fail if structure is unclear
```

**Why:** Snapshots show exact page structure, making interactions more reliable and failures easier to debug.

### DO: Leverage WebFetch Cache

**Good:**
```
"Fetch the TypeScript handbook page on generics"
"From that handbook page, explain type parameters"
"From the same page, show me constraint examples"
"Based on the handbook, implement a generic cache class"
```

**Bad:**
```
"Fetch TypeScript generics docs"
"Fetch TypeScript generics docs again"  ← Unnecessary
"Fetch the same docs one more time"  ← Wasteful
```

**Why:** Cache is free for 15 minutes. Reference "those docs" or "from the page you fetched" to use cached content.

### DO: Combine Tools for Complete Workflows

**Good:**
```
"Search for the best React state management libraries, fetch the docs for the top recommendation, implement it in my app, then use Playwright to test the state management works correctly"
```

**Why:** Leverages each tool's strengths:
- WebSearch: Find current options
- WebFetch: Get detailed docs
- Implementation: Apply knowledge
- Playwright: Verify it works

### DO: Handle Errors Gracefully

**Good:**
```
"Try to fetch [URL]. If it doesn't work, search for alternative documentation for [topic]"
```

**Why:** Provides fallback strategy if primary approach fails.

### DON'T: Assume All Sites Work with WebFetch

**Bad assumption:**
```
"Fetch every page with WebFetch"
```

**Good approach:**
```
"Try fetching [URL]. If content is minimal, open it in Playwright instead"
```

**Why:** JavaScript-heavy sites need Playwright, not WebFetch.

### DON'T: Skip Error Checking with Playwright

**Bad:**
```
"Click the submit button"  ← What if it doesn't exist?
```

**Good:**
```
"Take a snapshot, verify the submit button exists, then click it. If any errors occur, show me the console messages"
```

**Why:** Playwright interactions can fail. Verify elements exist and handle errors.

### DON'T: Forget WebSearch Limitations

**Bad (if outside US):**
```
"Search for [topic]"  ← Will fail outside US
```

**Good:**
```
"Fetch https://github.com/[org]/[repo]/releases to see latest versions"
```

**Why:** WebSearch is US-only. Have fallback strategies.

### DON'T: Mix Up WebFetch and Playwright Use Cases

**Bad choices:**
```
"Use Playwright to fetch static API documentation"  ← Use WebFetch
"Use WebFetch on a React SPA"  ← Use Playwright
```

**Good choices:**
```
"Use WebFetch for static HTML documentation"
"Use Playwright for JavaScript-heavy applications"
```

**Why:** Each tool has optimal use cases. Use the right tool for the job.

---

## Advanced Techniques

### Technique 1: Chained WebFetch Pipeline

**Use case:** Research multiple sources for comprehensive understanding.

**Example:**
```
"Fetch the official React documentation on Context API, then fetch a popular blog post comparing Context vs Redux from kentcdodds.com, then fetch the Redux Toolkit getting started guide, and finally summarize the trade-offs between all three approaches"
```

**When to use:**
- Comparing different approaches
- Gathering multiple perspectives
- Building comprehensive understanding

### Technique 2: WebSearch → WebFetch → Implement Pipeline

**Use case:** Find current information, get details, then apply.

**Example:**
```
"Search for the latest Next.js version, then fetch the release notes for that specific version from nextjs.org, summarize the new features, and update my next.config.js to use the new features appropriately"
```

**Pipeline:**
1. WebSearch: Find current version
2. WebFetch: Get detailed release notes
3. Implementation: Apply changes
4. Validation: Test changes

### Technique 3: Playwright Data Extraction → Analysis

**Use case:** Scrape data and perform analysis.

**Example:**
```
"Open [competitor site] in Playwright, extract all product data including names, prices, and features, save to products.json, then analyze pricing strategies and suggest how we should position our product"
```

**Workflow:**
1. Navigate with Playwright
2. Extract structured data
3. Save to file
4. Analyze data
5. Generate insights

### Technique 4: Automated Testing Suite

**Use case:** Comprehensive testing of web application.

**Example:**
```
"Create a complete test suite for my app at localhost:3000:
1. Test user registration flow
2. Test login with valid credentials
3. Test login with invalid credentials
4. Test creating a new item
5. Test editing an item
6. Test deleting an item
7. Take screenshots at each step
8. Report all console errors
9. Verify no failed network requests
10. Save test report to test-results.md"
```

### Technique 5: Documentation-Driven Development

**Use case:** Let official documentation guide implementation.

**Example:**
```
"Fetch the official [library] documentation, analyze my current implementation in src/component.js against the docs, identify any deviations from best practices, suggest improvements, implement the improvements, and verify the code matches the documentation's recommendations"
```

**Process:**
1. Fetch docs (source of truth)
2. Compare current code
3. Identify gaps
4. Implement corrections
5. Verify against docs

### Technique 6: Continuous Competitive Monitoring

**Use case:** Regular monitoring of competitor sites.

**Example:**
```
"Create a monitoring script that:
1. Visits competitor websites daily
2. Extracts pricing, features, and new announcements
3. Compares with previous day's data
4. Highlights any changes
5. Saves daily snapshot to data/competitors-YYYY-MM-DD.json
6. Generates weekly summary report"
```

### Technique 7: Multi-Browser Testing

**Use case:** Test across different viewport sizes.

**Example:**
```
"Test my app at localhost:3000 at different screen sizes:
1. Mobile (375x667) - iPhone SE
2. Tablet (768x1024) - iPad
3. Desktop (1920x1080) - Full HD
Take screenshots of the homepage, dashboard, and settings page at each size. Report any layout issues or overflow problems"
```

### Technique 8: Progressive Enhancement Testing

**Use case:** Verify graceful degradation.

**Example:**
```
"Test my app with Playwright:
1. Test with JavaScript enabled (full functionality)
2. Test with JavaScript disabled (basic functionality)
3. Test with slow network (3G simulation)
4. Test with high latency
Report which features work in each scenario"
```

---

## Module 6 Complete! 🌐

You've mastered:
✓ WebFetch for retrieving documentation and web pages
✓ WebSearch for finding current information (US-only)
✓ Playwright for browser automation and testing
✓ Real-world scenarios combining all tools
✓ Troubleshooting web integration issues
✓ Best practices for web-enabled workflows
✓ Advanced techniques for complex tasks
✓ Common pitfalls and how to avoid them

### Web Integration Mastery Checklist

Ensure you've completed:
- [ ] Successfully fetched documentation using WebFetch
- [ ] Searched for current information with WebSearch (if in US) or used alternatives
- [ ] Automated browser interactions with Playwright
- [ ] Combined tools in a real-world workflow
- [ ] Tested your own web application
- [ ] Extracted data from a website
- [ ] Understood and avoided common pitfalls
- [ ] Troubleshot at least one issue
- [ ] Implemented a complete web-enabled workflow

### Key Takeaways

**WebFetch:**
- Use for specific URLs
- Gets official documentation
- Best for static content
- Caches for 15 minutes

**WebSearch:**
- Use for current information
- Finds latest versions and news
- US-only (use alternatives elsewhere)
- Searches multiple sources

**Playwright:**
- Use for browser automation
- Handles JavaScript-heavy sites
- Perfect for testing
- Real browser environment

**Decision Matrix:**
| Need | Tool |
|------|------|
| Official docs | WebFetch |
| Latest version | WebSearch (or GitHub) |
| Dynamic content | Playwright |
| Testing flows | Playwright |
| Multiple sources | WebSearch |
| API reference | WebFetch |

### Integration Strategy

**For research projects:**
1. WebSearch → Find current options
2. WebFetch → Get detailed docs
3. Implementation → Apply knowledge

**For development:**
1. WebFetch → Get API docs
2. Implementation → Build feature
3. Playwright → Test functionality

**For analysis:**
1. Playwright → Scrape data
2. Processing → Analyze patterns
3. Reporting → Generate insights

**Pro Tips:**
- Always start with a snapshot when using Playwright
- Reference cached docs with "from the docs you fetched"
- Combine tools for maximum power
- Have fallback strategies (especially for WebSearch)

**Next up:** Module 7 - Advanced Workflows! Ready to combine everything you've learned into powerful automation?

Type "continue" when ready! 🚀
