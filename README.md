<p align="center">
  <img src="public/logo.png" width="150" alt="<img width="104" height="107" alt="image" src="https://github.com/user-attachments/assets/8d358027-59c6-48f4-8878-7430ce569141" />
">
</p>

<h1 align="center">🪞 Mirror 2.0</h1>

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

<a href="https://mirror2-0.onrender.com">🌐 Live Demo</a> •
<a href="YOUR_VIDEO_LINK">🎥 Demo Video</a> •
<a href="#features">✨ Features</a> •
<a href="#architecture">🏗 Architecture</a> •
<a href="#getting-started">🚀 Getting Started</a>

</p>

---

# 🎬 Watch the Demo First

> ⭐ **Recommended for judges:** Watch the **3-minute demo** to see how Mirror 2.0 stores, retrieves, and reasons over long-term memories using CockroachDB pgvector and AWS.

<p align="center">

<a href="YOUR_VIDEO_LINK">

<img src="assets/demo-thumbnail.png" width="100%">

</a>

</p>

<p align="center">

<a href="YOUR_VIDEO_LINK">

<img src="https://img.shields.io/badge/▶️%20WATCH%20DEMO%20VIDEO-red?style=for-the-badge">

</a>

</p>

---

# 📑 Table of Contents

- Overview
- Problem
- Solution
- Features
- Architecture
- Memory Flow
- Screenshots
- Technology Stack
- Repository Structure
- Getting Started
- Future Work
- License

---

# 🌟 Overview

Traditional AI assistants suffer from **context amnesia**.

Once a conversation ends, they forget everything.

Mirror 2.0 introduces a production-grade persistent memory system where conversations become searchable long-term memories using CockroachDB pgvector.

---

# ❗ Problem

Current AI assistants:

- Forget conversations
- Lose project context
- Cannot build long-term relationships
- Restart from zero every session

---

# 💡 Solution

Mirror 2.0 stores every important interaction as semantic memory.

Instead of remembering chat history,

it remembers **meaning**.

Using vector embeddings, the assistant retrieves relevant memories before generating every response.

---

# ✨ Features

- 🧠 Persistent AI Memory
- 🔍 Semantic Vector Search
- ⚡ CockroachDB pgvector
- ☁ AWS Lambda Memory Sync
- 🤖 Gemini Powered Responses
- 💬 Multiple Chat Sessions
- 📈 Memory Timeline
- 🔄 Long-term Context Recall
- 🎯 Agentic Memory Architecture
- 🌍 Production Ready Deployment

---

# 🏗 Architecture

<p align="center">

<img src="assets/architecture.png" width="900">

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

1. User sends a message

2. Important information extracted

3. Embedding generated

4. Stored inside CockroachDB pgvector

5. Future queries perform similarity search

6. Relevant memories injected into Gemini prompt

7. Personalized response generated

---

# 📸 Screenshots

## Landing Page

<p align="center">
<img src="screenshots/home.png">
</p>

---

## AI Chat

<p align="center">
<img src="screenshots/chat.png">
</p>

---

## Persistent Memory

<p align="center">
<img src="screenshots/memory.png">
</p>

---

## Architecture

<p align="center">
<img src="screenshots/architecture.png">
</p>

---

# ⚙ Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | React |
| Backend | Express + TypeScript |
| AI | Google Gemini |
| Database | CockroachDB |
| Vector DB | pgvector |
| Cloud | AWS Lambda |
| Deployment | Render |
| Styling | Tailwind CSS |

---

# 📂 Repository Structure

```text
Mirror2.0
│
├── public/
├── src/
├── server/
├── screenshots/
├── assets/
├── README.md
├── LICENSE
└── package.json
```

---

# 🚀 Getting Started

```bash
git clone https://github.com/jis0607/Mirror2.0

cd Mirror2.0

npm install

npm run dev
```

Create

```
.env
```

```
GEMINI_API_KEY=

GROQ_API_KEY=

DATABASE_URL=
```

Run

```
npm run dev
```

---

# 🔮 Future Roadmap

- Voice Conversations
- Memory Editing
- Cross-device Sync
- Multi-Agent Collaboration
- Emotion Detection
- Calendar Integration
- RAG Knowledge Base

---

# 📜 License

MIT License

---

<p align="center">

Built with ❤️ by **Jishnu Singh**

**Mirror 2.0 — AI that remembers.**

</p>
