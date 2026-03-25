#!/usr/bin/env node

/**
 * Carrd Automation MCP Server
 * Provides Claude with tools to create and manage Carrd websites
 */

const { Server } = require('@anthropic-ai/sdk/lib/mcp');
const { createCarrdSite, updateCarrdSite } = require('./claude-integration');

const server = new Server({
  name: 'carrd-automation',
  version: '1.0.0'
});

// Define tools for Claude to use
const tools = [
  {
    name: 'create_carrd_site',
    description: 'Create a new Carrd website with specified content and styling. Returns the site URL.',
    inputSchema: {
      type: 'object',
      properties: {
        siteName: {
          type: 'string',
          description: 'Name of the website (appears in URL and dashboard)'
        },
        sections: {
          type: 'array',
          description: 'Array of sections to add to the site',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['text', 'image', 'button', 'form'],
                description: 'Type of section'
              },
              title: {
                type: 'string',
                description: 'Section title'
              },
              text: {
                type: 'string',
                description: 'Body text content'
              },
              image: {
                type: 'string',
                description: 'Path to image file'
              },
              link: {
                type: 'string',
                description: 'URL for button or link'
              }
            }
          }
        },
        styling: {
          type: 'object',
          description: 'Site styling options',
          properties: {
            primaryColor: {
              type: 'string',
              description: 'Primary color in hex format (e.g., #3498db)'
            },
            font: {
              type: 'string',
              description: 'Font name (e.g., Montserrat, Open Sans)'
            }
          }
        },
        publish: {
          type: 'boolean',
          default: false,
          description: 'Whether to publish the site immediately'
        }
      },
      required: ['siteName', 'sections']
    }
  },
  {
    name: 'update_carrd_site',
    description: 'Update an existing Carrd website with new content',
    inputSchema: {
      type: 'object',
      properties: {
        siteUrl: {
          type: 'string',
          description: 'URL of the Carrd site to update'
        },
        updates: {
          type: 'object',
          description: 'Object mapping section indices to new content'
        }
      },
      required: ['siteUrl', 'updates']
    }
  }
];

// Handle tool calls from Claude
server.setRequestHandler('tool_call', async (request) => {
  const { name, arguments: args } = request.tool;

  try {
    let result;

    if (name === 'create_carrd_site') {
      // Add credentials from environment
      const config = {
        ...args,
        email: process.env.CARRD_EMAIL,
        password: process.env.CARRD_PASSWORD
      };

      if (!config.email || !config.password) {
        throw new Error('CARRD_EMAIL and CARRD_PASSWORD environment variables required');
      }

      result = await createCarrdSite(config);
    } else if (name === 'update_carrd_site') {
      const config = {
        ...args,
        email: process.env.CARRD_EMAIL,
        password: process.env.CARRD_PASSWORD
      };

      result = await updateCarrdSite(config);
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

// Handle tool list requests
server.setRequestHandler('list_tools', (request) => {
  return {
    tools
  };
});

// Start the server
server.start().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
