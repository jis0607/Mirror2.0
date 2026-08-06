<p align="center">
  <img src="public/standing_mirror_logo.jpg" width="150" alt="Mirror 2.0 Logo" style="border-radius: 20px;">
</p>

<h1 align="center"><img width="169" height="170" alt="image" src="https://github.com/user-attachments/assets/25ac38f8-ffad-43e4-bb87-90342bdeb62c" />
</h1>

<p align="center">
An AI Companion that <b>remembers</b>, <b>understands</b>, and <b>grows with you</b> using persistent memory powered by CockroachDB pgvector and AWS.
</p>

<p align="center">

![License](https://img.shields.io/badge/License-MIT-blue)
![CockroachDB](https://img.shields.io/badge/CockroachDB-pgvector-red)
![AWS](https://img.shields.io/badge/AWS-Lambda-orange)
![React](https://img.shields.io/badge/React-19-blue)
![Express](https://img.shields.io/badge/Express-TypeScript-black)
![Gemini](https://img.shields.io/badge/Google-Gemini-4285F4)
![Production](https://img.shields.io/badge/Production-Ready-brightgreen)

</p>

<p align="center">

<a href="https://github.com/jis0607/Mirror2.0">🌐 Live Demo</a> •
<a href="https://github.com/jis0607/Mirror2.0">🎥 Demo Video</a> •
<a href="#-features">✨ Features</a> •
<a href="#-architecture">🏗 Architecture</a> •
<a href="#-getting-started">🚀 Getting Started</a>

</p>

---

# 🎬 Watch the Demo First

> ⭐ **Recommended for judges:** Watch the **3-minute demo** to see how Mirror 2.0 stores, retrieves, and reasons over long-term memories using CockroachDB pgvector and AWS.

<p align="center">

<a href="https://github.com/jis0607/Mirror2.0">

<img src="assets/demo-thumbnail.png" width="100%" alt="Demo Video Thumbnail">

</a>

</p>

<p align="center">

<a href="https://github.com/jis0607/Mirror2.0">

<img src="https://img.shields.io/badge/▶️%20WATCH%20DEMO%20VIDEO-red?style=for-the-badge">

</a>

</p>

---

# 📑 Table of Contents

- [Overview](#-overview)
- [Problem](#-problem)
- [Solution](#-solution)
- [Features](#-features)
- [Architecture](#-architecture)
- [Memory Pipeline](#-memory-pipeline)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)

---

# 🌟 Overview

Traditional AI assistants suffer from **context amnesia**.

Once a conversation ends, they forget everything.

Mirror 2.0 introduces a production-grade persistent memory system where conversations become searchable long-term memories using CockroachDB pgvector.

---

# ❗ Problem

Current AI assistants:

- Forget past conversations & preferences
- Lose project context across sessions
- Cannot build genuine, long-term relationships
- Restart from zero context on every session

---

# 💡 Solution

Mirror 2.0 stores every important interaction as semantic memory.

Instead of remembering raw chat history,

it remembers **meaning**.

Using vector embeddings, the assistant retrieves relevant memories before generating every response.

---

# ✨ Features

- 🧠 **Persistent AI Memory**: Long-term context indexing powered by CockroachDB.
- 🔍 **Semantic Vector Search**: High-dimensional `pgvector` similarity retrieval.
- ⚡ **CockroachDB pgvector**: Managed vector database engine via MCP server integration.
- ☁ **AWS Cloud Infrastructure**: Serverless Lambda pipeline and S3 backups.
- 🤖 **Gemini Powered Responses**: Deep contextual reasoning using Google Gemini models.
- 💬 **Multiple Chat Sessions**: ChatGPT & Claude style sidebar with local storage persistence.
- 📈 **Memory Graph Inspector**: Real-time vector node browser with cosine similarity testing.
- 🔄 **Long-term Context Recall**: Recalls goals, preferences, emotional state, and milestones.
- 🎯 **Agentic Memory Architecture**: Proactive nudges, milestone tracking, and relationship intelligence.
- 🌍 **Production Ready Deployment**: Full-stack Express + React 19 architecture ready for Cloud Run.

---

# 🏗 Architecture

<p align="center">

<img src="assets/architecture.png" width="900" alt="Mirror 2.0 System Architecture">

</p>

```text
User
   │
   ▼
React Frontend
   │
Express Backend
   │
Embedding Generation
   │
CockroachDB pgvector
   │
Semantic Search
   │
Relevant Memories
   │
Gemini
   │
Final Personalized Response
```

---

# 🧠 Memory Pipeline

1. **User sends a message** in the chat UI
2. **Important information extracted** (identity, goals, preferences, emotional cues)
3. **1536-dimensional Embedding generated** for key concepts
4. **Stored inside CockroachDB pgvector** cluster
5. **Future queries perform similarity search** to retrieve context vectors
6. **Relevant memories injected** into the Gemini system prompt
7. **Personalized, context-aware response generated**

---

# 📸 Screenshots

## Landing Page

<p align="center">
<img src="screenshots/home.png" alt="Home Landing Page">
</p>

---

## AI Chat & History Sidebar

<p align="center">
<img src="screenshots/chat.png" alt="Interactive AI Chat Sandbox">
</p>

---

## Persistent Memory Graph

<p align="center">
<img src="screenshots/memory.png" alt="CockroachDB Vector Memory Graph">
</p>

---

## Architecture Diagram

<p align="center">
<img src="screenshots/architecture.png" alt="System Architecture Diagram">
</p>

---

# ⚙ Technology Stack

| Category | Technology |
|-----------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Express.js + TypeScript |
| **AI Model** | Google Gemini API (`@google/genai`) |
| **Database** | CockroachDB (Managed MCP Server) |
| **Vector Engine** | `pgvector` embeddings |
| **Cloud** | AWS Lambda + S3 Infrastructure |
| **Styling** | Tailwind CSS + Lucide Icons |

---

# 📂 Repository Structure

```text
Mirror2.0
│
├── public/
│   └── standing_mirror_logo.jpg
├── src/
│   ├── components/
│   │   ├── ChatSidebar.tsx
│   │   └── MemoryGraphModal.tsx
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   └── index.css
├── server/
│   ├── AICompanion.ts
│   ├── MemoryEngine.ts
│   └── ProjectTracker.ts
├── screenshots/
├── assets/
├── README.md
├── LICENSE
└── package.json
```

---

# 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jis0607/Mirror2.0
cd Mirror2.0
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=your_cockroachdb_connection_string
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 🔮 Future Roadmap

- 🎙 **Voice Conversations**: Real-time voice interaction with emotional tone synthesis.
- ✏ **Memory Editing**: User-facing controls to edit or prune indexed memories.
- 🔄 **Cross-device Sync**: Cloud-synced chat history across browser sessions.
- 🤖 **Multi-Agent Collaboration**: Specialized sub-agents for coding, planning, and review.
- 💡 **Emotion Detection**: Deep sentiment analysis for nuanced companion responses.
- 📅 **Calendar & Tasks Integration**: Proactive reminder triggers for upcoming deadlines.
- 📚 **RAG Knowledge Base**: Upload personal documents and codebases into memory.

---

# 📜 License

Distributed under the [MIT License](LICENSE).

---

<p align="center">

Built with ❤️ by **Jishnu Singh**

**Mirror 2.0 — AI that remembers.**

</p>
