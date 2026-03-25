# Quick Start: Carrd Automation

## 1. Install & Configure

```bash
cd carrd-automation
npm install

# Copy env template
cp .env.example .env

# Edit .env with your Carrd credentials
nano .env
```

## 2. Test It Out

```bash
# Create a test site via CLI
node cli.js create "Test Site"
```

## 3. Use with Claude

### Option A: Via MCP Server (Recommended)
```bash
# Start the MCP server
node carrd-mcp-server.js
```

Configure Claude Code settings to use this server, then ask Claude:
```
"Create a portfolio website with my name, bio, and 3 project samples"
```

### Option B: Direct Integration
Import and use in your Node.js app:
```javascript
const { createCarrdSite } = require('./claude-integration');

await createCarrdSite({
  siteName: 'My Site',
  email: process.env.CARRD_EMAIL,
  password: process.env.CARRD_PASSWORD,
  sections: [
    { type: 'text', title: 'Hello', text: 'Welcome' }
  ],
  publish: true
});
```

## Key Files

- **carrd-automation.js** - Core automation logic with Playwright
- **claude-integration.js** - High-level functions for Claude
- **carrd-mcp-server.js** - MCP server to integrate with Claude
- **cli.js** - Command-line interface

## Features

✅ Login to Carrd
✅ Create new sites
✅ Add content sections
✅ Upload images
✅ Configure styling
✅ Publish sites

## Next Steps

1. Test with your Carrd account
2. Inspect Carrd UI to verify current selectors
3. Add error handling for your use cases
4. Set up MCP server in Claude Code
5. Start creating sites with Claude!

## Troubleshooting

**Selectors not working?**
- Carrd's frontend may have changed
- Open Carrd in browser, inspect the HTML
- Update selectors in `carrd-automation.js`

**Login fails?**
- Check credentials in `.env`
- Ensure 2FA is disabled or supported
- Check for bot protection

**Timeouts?**
- Increase `waitForTimeout` values
- Carrd.co might be slow
- Check your internet connection
