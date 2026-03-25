/**
 * Claude Integration for Carrd Automation
 * This module provides tools that Claude can call to automate Carrd
 */

const CarrdAutomation = require('./carrd-automation');

/**
 * Tool: Create a new Carrd website with Claude specifications
 * Claude calls this with site configuration
 */
async function createCarrdSite(config) {
  const {
    siteName,
    email,
    password,
    template = null,
    sections = [],
    styling = {},
    publish = false
  } = config;

  const carrd = new CarrdAutomation(email, password);

  try {
    console.log('🚀 Starting Carrd automation...');

    await carrd.init();
    await carrd.login();

    // Create the site
    const siteUrl = await carrd.createSite(siteName, { template });

    // Add sections with content
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      await carrd.addSection(section.type || 'text');
      await carrd.updateSectionContent(i, section);
    }

    // Apply styling
    if (styling.primaryColor) {
      await carrd.setSiteColor('primary', styling.primaryColor);
    }
    if (styling.font) {
      await carrd.setSiteFont(styling.font);
    }

    // Publish if requested
    if (publish) {
      await carrd.publishSite();
    }

    await carrd.close();

    return {
      success: true,
      siteUrl,
      message: `✓ Site created successfully: ${siteUrl}`
    };
  } catch (error) {
    await carrd.close();
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Tool: Update an existing Carrd site
 */
async function updateCarrdSite(config) {
  const {
    siteUrl,
    email,
    password,
    updates = {}
  } = config;

  const carrd = new CarrdAutomation(email, password);

  try {
    await carrd.init();
    await carrd.page.goto(siteUrl);

    // Apply updates
    for (const [sectionIndex, content] of Object.entries(updates)) {
      await carrd.updateSectionContent(parseInt(sectionIndex), content);
    }

    await carrd.close();

    return {
      success: true,
      message: 'Site updated successfully'
    };
  } catch (error) {
    await carrd.close();
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  createCarrdSite,
  updateCarrdSite,
  CarrdAutomation
};
