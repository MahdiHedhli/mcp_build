# 🚀 Docker MCP Tutorial - Build AI Tools with Docker

[![NetworkChuck](https://img.shields.io/badge/NetworkChuck-YouTube-red)](https://youtube.com/@NetworkChuck)
[![Docker](https://img.shields.io/badge/Docker-Desktop-blue)](https://www.docker.com/products/docker-desktop/)
[![MCP](https://img.shields.io/badge/MCP-Protocol-green)](https://modelcontextprotocol.io/)

Learn how to build and deploy MCP (Model Context Protocol) servers using Docker! This repository contains everything from the NetworkChuck Docker MCP video tutorial, including complete examples, templates, and step-by-step guides.

## 🎥 Watch the Tutorial

[**Watch the full video tutorial on YouTube →**](https://youtube.com/@NetworkChuck)

## ⚡ Quick Start (5 Minutes)

Get your first MCP server running in under 5 minutes:

```bash
# 1. Install Docker Desktop (if not already installed)
# Visit: https://docs.docker.com/desktop/

# 2. Enable Docker MCP Toolkit
# Settings → Beta Features → Enable "Docker MCP Toolkit"

# 3. Clone this repository
git clone https://github.com/networkchuck/docker-mcp-tutorial.git
cd docker-mcp-tutorial

# 4. Build the dice roller example
cd examples/dice-roller
docker build -t dice-mcp-server .

# 5. Follow the Quick Start Guide
# See: quick-start/setup-guide.md
```

## 📚 What's Included

### 🎲 **Complete Working Example**
- **Dice Roller** - Fun D&D dice rolling MCP server with all files ready to run

### 🛠️ **MCP Builder Prompt**
NetworkChuck's custom prompt that generates complete MCP servers from simple descriptions. Just describe what you want, and it creates everything!

### 📖 **Comprehensive Documentation**
- Step-by-step installation guides (Mac, Windows, Linux)
- How to build custom MCP servers
- Docker MCP Gateway deep dive
- Troubleshooting common issues

### 🔗 **All Resources & Links**
Every tool, link, and resource mentioned in the video, organized and ready to use.

## 🗂️ Repository Structure

```
docker-mcp-tutorial/
├── examples/                    # Complete working MCP server
│   └── dice-roller/            # D&D dice rolling server
├── mcp-builder-prompt/         # AI prompt to generate MCP servers
├── quick-start/               # Get running in 5 minutes
├── docs/                      # Detailed documentation
│   ├── installation.md       # Platform-specific setup
│   ├── custom-servers.md     # Build your own servers
│   ├── docker-gateway.md     # Gateway architecture
│   └── troubleshooting.md    # Common issues & fixes
└── resources/                 # Links and additional resources
```

## 🎯 What You'll Learn

1. **MCP Fundamentals** - Understand the Model Context Protocol
2. **Docker Integration** - Run MCP servers in containers
3. **Build Custom Servers** - Create your own AI tools
4. **API Integration** - Connect to external services
5. **Security & Secrets** - Manage API keys safely
6. **Remote Access** - Expose servers over network
7. **n8n Integration** - Automation workflows with MCP

## 🚦 Prerequisites

- **Docker Desktop** installed and running
- **Claude Desktop** or another MCP-compatible client
- Basic command line knowledge
- Coffee ☕ (highly recommended)

## 📋 Installation Overview

### 1. Install Docker Desktop
- [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Enable MCP Toolkit in Beta Features

### 2. Configure MCP Client
- Set up Claude Desktop, Cursor, or LM Studio
- Configure MCP gateway connection

### 3. Build & Deploy
- Build Docker containers for MCP servers
- Register servers in catalog
- Start using with your AI!

*Detailed platform-specific instructions in [docs/installation.md](docs/installation.md)*

## 🔨 Building Your First MCP Server

### Using the MCP Builder Prompt

1. Open the prompt template: `mcp-builder-prompt/mcp-builder-prompt.md`
2. Describe your desired functionality
3. Feed to Claude or your preferred AI
4. Get complete, working MCP server code!

### Example: Weather MCP Server
```
"I want to build a weather MCP server that can:
- Get current weather for any city
- Get 5-day forecast
- Convert between Celsius and Fahrenheit
Use the OpenWeather API"
```

The AI will generate all files needed: Dockerfile, Python server, configuration, and installation instructions!

## 🎮 Example Server Included

### 🎲 Dice Roller
Perfect for D&D and tabletop gaming:
- Roll any dice notation (2d6+3, 1d20, etc.)
- D&D stat generation
- Advantage/disadvantage rolls
- Skill checks against DC

**Note:** The video also demonstrates building Toggl Timer and Kali Linux MCP servers. Use the MCP Builder Prompt to create these or any other server you can imagine!

## 🔧 Docker MCP Gateway

The Docker MCP Gateway is the magic that makes this all work:

- **Centralized Management** - One connection, multiple servers
- **Secret Management** - Secure API key storage
- **Transport Options** - Local (stdio) or Network (SSE)
- **Dynamic Containers** - Servers run on-demand

Learn more in [docs/docker-gateway.md](docs/docker-gateway.md)

## 🌐 Remote Access & n8n Integration

Run your MCP servers over the network:

```bash
# Start gateway with network transport
docker mcp gateway run --transport sse

# Access from n8n or remote clients
http://YOUR_IP:8811
```

Perfect for automation workflows and remote AI operations!

## 🐛 Troubleshooting

### Common Issues

**Tools not appearing in Claude?**
- Restart Claude Desktop
- Check catalog and registry files
- Verify Docker image built successfully

**Authentication errors?**
- Verify secrets: `docker mcp secret list`
- Check environment variable names

**Container not running?**
- Check logs: `docker logs [container-name]`
- Verify Dockerfile syntax

*Full troubleshooting guide in [docs/troubleshooting.md](docs/troubleshooting.md)*

## 📚 Resources & Links

### Official Documentation
- [Docker Desktop](https://docs.docker.com/desktop/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)

### APIs Used in Examples
- [Toggl API Documentation](https://developers.toggl.com/docs/)
- [Obsidian Local REST API](https://github.com/coddingtonbear/obsidian-local-rest-api)

### Related NetworkChuck Content
- [n8n Automation Tutorial](https://youtube.com/@NetworkChuck)
- [Docker Basics Series](https://youtube.com/@NetworkChuck)

## 🤝 Contributing

Found a bug? Have an improvement? Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **Docker** for sponsoring and creating the MCP Toolkit
- **Anthropic** for the Model Context Protocol
- The amazing **NetworkChuck community**

## ☕ Support

If this helped you, consider:
- ⭐ Starring this repository
- 🔔 Subscribing to [NetworkChuck on YouTube](https://youtube.com/@NetworkChuck)
- ☕ Buying NetworkChuck a coffee

---

**Remember:** The world of AI tools is evolving rapidly. This is your chance to be part of the revolution. Don't waste it!

*"Hack YouTube ethically, of course."* - NetworkChuck