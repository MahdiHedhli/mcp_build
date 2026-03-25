# Carrd Automation with Playwright

Automate Carrd website creation and management using Playwright. This tool allows Claude (or other AI assistants) to programmatically create and update Carrd websites without relying on a public API.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Credentials
Create a `.env` file from the template:
```bash
cp .env.example .env
```

Then edit `.env` with your Carrd login credentials:
```
CARRD_EMAIL=your_email@example.com
CARRD_PASSWORD=your_password
```

## Usage

### Direct CLI Usage
```bash
# Create a new site
node cli.js create "My Portfolio"
```

### Claude Integration

Claude can call the automation functions to create sites:

```javascript
const { createCarrdSite } = require('./claude-integration');

const result = await createCarrdSite({
  siteName: 'Portfolio',
  email: 'user@example.com',
  password: 'password',
  sections: [
    {
      type: 'text',
      title: 'About Me',
      text: 'I am a developer...'
    },
    {
      type: 'image',
      image: './photo.jpg'
    }
  ],
  styling: {
    primaryColor: '#3498db',
    font: 'Montserrat'
  },
  publish: true
});
```

## Features

- ✅ Login to Carrd
- ✅ Create new sites
- ✅ Add sections (text, images, etc.)
- ✅ Update section content
- ✅ Upload images
- ✅ Configure colors and fonts
- ✅ Publish sites
- ✅ Close and cleanup

## How It Works

1. **Initialization**: Launches a Chromium browser with Playwright
2. **Authentication**: Logs into Carrd using provided credentials
3. **Automation**: Interacts with Carrd's web UI to create/update sites
4. **Publishing**: Publishes the site when ready
5. **Cleanup**: Closes the browser session

## Important Notes

⚠️ **Browser Automation Considerations:**
- Carrd's UI may change, requiring selector updates
- Rate limiting: Add delays between operations if creating multiple sites
- Selectors may vary based on Carrd's current frontend

## Next Steps

1. Test with actual Carrd account
2. Refine selectors based on current Carrd UI
3. Add error handling for edge cases
4. Integrate with MCP server for Claude access
5. Add support for more section types and styling options

## Troubleshooting

- **Login fails**: Verify credentials and check if Carrd requires 2FA
- **Selectors not found**: Carrd's UI may have changed - inspect elements and update selectors
- **Upload timeouts**: Increase timeout values in the code

## Future Enhancements

- [ ] Support for custom domains
- [ ] Template detection and selection
- [ ] Form section automation
- [ ] Gallery/lightbox creation
- [ ] Social media integration
- [ ] Analytics tracking
- [ ] Site cloning/duplication
