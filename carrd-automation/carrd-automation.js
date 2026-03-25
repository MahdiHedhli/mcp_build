const { chromium } = require('playwright');
const fs = require('fs');

class CarrdAutomation {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.browser = null;
    this.page = null;
    this.context = null;
  }

  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async login() {
    console.log('Logging into Carrd...');
    await this.page.goto('https://carrd.co/login');

    // Fill in email
    await this.page.fill('input[type="email"]', this.email);

    // Fill in password
    await this.page.fill('input[type="password"]', this.password);

    // Click login button
    await this.page.click('button[type="submit"]');

    // Wait for dashboard to load
    await this.page.waitForURL('**/dashboard');
    console.log('✓ Logged in successfully');
  }

  async createSite(siteName, options = {}) {
    console.log(`Creating site: ${siteName}`);

    // Click "Create New Site" button
    await this.page.click('button:has-text("Create New Site")');

    // Fill site name
    await this.page.fill('input[placeholder*="Name"]', siteName);

    // Select template if provided
    if (options.template) {
      await this.page.click(`div[data-template="${options.template}"]`);
    }

    // Create button
    await this.page.click('button:has-text("Create")');

    // Wait for site editor to load
    await this.page.waitForURL('**/build/**');
    console.log(`✓ Site created: ${siteName}`);

    return this.page.url();
  }

  async addSection(sectionType = 'text') {
    console.log(`Adding ${sectionType} section...`);

    // Click add section button
    await this.page.click('[data-action="add-section"]');

    // Select section type
    await this.page.click(`[data-section-type="${sectionType}"]`);

    console.log(`✓ Added ${sectionType} section`);
  }

  async updateSectionContent(sectionIndex, content) {
    console.log(`Updating section ${sectionIndex} content...`);

    // Click on the section
    const sections = await this.page.locator('[data-section]').all();
    if (sectionIndex >= sections.length) {
      throw new Error(`Section ${sectionIndex} not found`);
    }

    await sections[sectionIndex].click();

    // Update content based on type
    if (content.title) {
      await this.page.fill('input[data-field="title"]', content.title);
    }

    if (content.text) {
      // For rich text editor, we may need to use a different approach
      const editor = await this.page.$('[data-field="text"]');
      if (editor) {
        await editor.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.type(content.text);
      }
    }

    if (content.image) {
      await this.uploadImage(content.image);
    }

    if (content.link) {
      await this.page.fill('input[data-field="link"]', content.link);
    }

    console.log(`✓ Section ${sectionIndex} updated`);
  }

  async uploadImage(imagePath) {
    console.log(`Uploading image: ${imagePath}`);

    const fileInput = await this.page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.setInputFiles(imagePath);
      await this.page.waitForTimeout(2000); // Wait for upload
    }

    console.log('✓ Image uploaded');
  }

  async setSiteColor(colorField, hexColor) {
    console.log(`Setting ${colorField} to ${hexColor}`);

    // Click color picker
    await this.page.click(`[data-color-field="${colorField}"]`);

    // Fill in hex value
    await this.page.fill('input[placeholder*="hex"]', hexColor);

    console.log(`✓ Color updated`);
  }

  async setSiteFont(fontName) {
    console.log(`Setting font to ${fontName}`);

    // Click font selector
    await this.page.click('[data-field="font"]');

    // Select font
    await this.page.click(`[data-font="${fontName}"]`);

    console.log(`✓ Font updated`);
  }

  async publishSite() {
    console.log('Publishing site...');

    // Click publish button
    await this.page.click('button:has-text("Publish")');

    // Confirm publish
    await this.page.click('button:has-text("Yes")');

    // Wait for confirmation
    await this.page.waitForTimeout(3000);

    console.log('✓ Site published');
  }

  async getSiteUrl() {
    // Get the site URL from the address bar or dashboard
    const url = this.page.url();
    return url;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

module.exports = CarrdAutomation;
