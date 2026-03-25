# Using Carrd Automation with Claude

## How Claude Creates Your Site

When you describe a website to Claude with the Carrd automation tool available, Claude can:

1. **Parse your requirements** - Understand what you want on your site
2. **Plan the structure** - Organize content into sections
3. **Call the automation tool** - Use Playwright to build the site
4. **Handle styling** - Apply colors, fonts, and layouts
5. **Publish automatically** - Launch your site when ready

## Example Conversation

### User Request
```
"Create a professional portfolio website for Sarah Johnson.
Include a hero section with her name and title as a UX Designer.
Add an about section with a photo and bio.
Include a portfolio section with 3 project samples.
Use a clean blue color scheme with Montserrat font.
Publish it when done."
```

### What Claude Does

1. **Analyzes** the request and identifies:
   - Site name: "Sarah Johnson - UX Designer"
   - Sections needed: Hero, About, Portfolio, Footer
   - Styling: Blue color, Montserrat font
   - Action: Publish

2. **Prepares the configuration**:
```javascript
{
  siteName: "Sarah Johnson - UX Designer",
  sections: [
    {
      type: 'text',
      title: 'Sarah Johnson',
      text: 'UX Designer | Creating beautiful user experiences'
    },
    {
      type: 'image',
      image: 'sarah-profile.jpg'
    },
    {
      type: 'text',
      title: 'About',
      text: 'I specialize in user research and interface design...'
    },
    {
      type: 'text',
      title: 'Portfolio',
      text: '[Project 1] [Project 2] [Project 3]'
    }
  ],
  styling: {
    primaryColor: '#3498db',
    font: 'Montserrat'
  },
  publish: true
}
```

3. **Calls the tool** - Executes the automation
4. **Reports back**:
```
✓ Site created successfully: https://sarahjohnson-ux.carrd.co

Your portfolio is now live with:
- Professional hero section
- About page with bio
- Portfolio showcase
- Blue color scheme with Montserrat font
```

## Advanced Examples

### Multi-Page Portfolio
```
"Create a 5-page portfolio with home, services, projects, testimonials, and contact."
```

### Business Website
```
"Build a landing page for my SaaS startup with pricing tiers, features, and CTA buttons."
```

### Event Page
```
"Create an event page with date/time, location, speakers, and registration link."
```

### Product Launch
```
"Set up a product announcement page with email signup form."
```

## Benefits of This Approach

✅ **No Manual Editing** - Claude handles all the web interface interactions
✅ **Natural Language** - Describe what you want in plain English
✅ **Fast** - Takes minutes instead of hours
✅ **Consistent** - Uses native Carrd tools, not workarounds
✅ **Repeatable** - Same process for multiple sites
✅ **Flexible** - Works with any site idea Claude understands

## Current Limitations

⚠️ Browser automation is slower than an API
⚠️ Requires valid Carrd credentials
⚠️ Carrd UI changes may need selector updates
⚠️ Some complex Carrd features may not be automated yet

## Future Enhancements

- Support for Carrd's custom forms
- Integrations with email services
- Custom domain setup
- More styling/layout options
- Template-based site generation
