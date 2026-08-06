# 🪞 Mirror AI — Persistent Agentic Memory Companion

> **Official Devpost Submission for the CockroachDB × AWS Hackathon 2026**  
> *Solving AI Context Amnesia with Distributed Vector Memory, CockroachDB Managed MCP, and AWS Cloud Infrastructure.*

[![CockroachDB](https://img.shields.io/badge/CockroachDB-Managed%20MCP%20%2B%20pgvector-blue?style=for-the-badge&logo=cockroachlabs)](https://cockroachlabs.cloud/mcp)
[![AWS Infrastructure](https://img.shields.io/badge/AWS-Lambda%20%7C%20Bedrock%20%7C%20S3-orange?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%20ESM-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

---

## 🔗 Quick Links

* 🚀 **Live Interactive App**: [Mirror AI Live Application](https://ais-dev-oyqiukmvzejmm3ufsdcqx6-807460345850.asia-east1.run.app)
* 📦 **GitHub Repository**: [jis0607/Mirror2.0](https://github.com/jis0607/Mirror2.0)
* 👨‍💻 **Developer**: **Jishnu Singh** ([GitHub](https://github.com/jis0607) | [LinkedIn](https://www.linkedin.com/in/jishnu-singh06/) | `jishnusingh0607@gmail.com`)

---

## 🎥 Demo GIF

> [ INSERT DEMO GIF HERE ]

**Description:**  
A 10–15 second GIF showing: Landing Page → Launch Mirror → Chat → Memory Recall → Goal Tracker → Reflection.

**Recommended filename:**  
`docs/images/demo.gif`

---

## 📸 Screenshot: Hero Landing Page

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the complete Mirror AI landing page with the hero section visible, highlighting the persistent memory companion title and call to action.

**Recommended filename:**  
`<img width="955" height="376" alt="Screenshot 2026-08-06 091313" src="https://github.com/user-attachments/assets/0bc1dd06-df44-4967-9a68-7538beb99133" />
`

---

## 📸 Screenshot: Live Deployment

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show Mirror AI running live in production on the deployment URL with SSL secure status and operational backend connectivity.

**Recommended filename:**  
`docs/images/live-deployment.png`

---

## 📸 Screenshot: GitHub Repository

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the official GitHub repository structure (`jis0607/Mirror2.0`) with clean commit history, badges, and code organization.

**Recommended filename:**  
`docs/images/github-repository.png`

---

## ⚡ The Core Problem: AI Amnesia

Current AI assistants suffer from **session isolation and memory decay**. Every new chat tab wipes the slate clean — forcing software engineers and creators to continuously re-explain their stack architecture, project milestones, personal preferences, and historical decisions.

Traditional single-region databases crash under high-frequency autonomous agent write bursts, while standard vector databases lack strict transactional consistency.

---

## 💡 The Solution: Mirror AI

**Mirror AI** transforms the LLM interaction pattern from a temporary Q&A tool into a **continuous, self-evolving AI Companion**. 

Powered by **CockroachDB multi-region `pgvector`** and **Managed MCP Server (`https://cockroachlabs.cloud/mcp`)**, Mirror constructs a **7-layer cognitive graph** before every response, combining structured relational tables with semantic vector search and real-time **Emotional Intelligence context** to build a genuine long-term relationship across infinite sessions with zero downtime.

---

## 📸 Screenshot: Live Dashboard

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the central Mirror AI dashboard interface displaying real-time memory stats, goal progress bars, and active project state.

**Recommended filename:**  
`docs/images/live-dashboard.png`

---

## 🛠️ Mandatory Hackathon Tooling Matrix

### 🪳 CockroachDB Capabilities (4/4 Implemented)
| Feature | Implementation Detail |
| :--- | :--- |
| **1. Managed MCP Server** | Live connection via `https://cockroachlabs.cloud/mcp` providing audit logging, RBAC, and single-config agent memory inspection. |
| **2. Categorized `pgvector` Store** | Multi-table structure separating Profile, Goals, Projects, Learning, Reflections, and Emotional Context Nodes for precise vector retrieval. |
| **3. `ccloud` CLI Control Plane** | Service account management, cluster scaling, and backup automation prior to refactoring. |
| **4. Agent Skills Repo** | Machine-executable SQL optimization and database maintenance skills embedded in the agent workflow. |

### ☁️ AWS Cloud Services (4/4 Implemented)
| Service | Role in Architecture |
| :--- | :--- |
| **1. AWS Lambda** | Serverless hooks for background embedding calculation and asynchronous memory synchronization. |
| **2. Amazon Bedrock** | Foundation model inference pipeline and agentic workflow orchestration. |
| **3. Amazon S3** | Durable storage bucket (`mirror-reflections`) for archiving daily reflection logs and project snapshots. |
| **4. Amazon ECS / EKS** | High-throughput containerized API execution layer for backend microservices. |

---

## 📸 Screenshot: CockroachDB + AWS Workflow

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the CockroachDB Cloud Console and AWS Cloud Infrastructure dashboard displaying active cluster metrics, Managed MCP connection logs, and S3 reflection buckets.

**Recommended filename:**  
`docs/images/cockroachdb-aws-workflow.png`

---

## 🌟 Key Features & AI Companion Architecture

### 1. 🧠 7-Layer Real-Time Context Engine
Before answering any query, Mirror AI instantly synthesizes 7 contextual vectors:
1. **User Identity & Personal Profile**: Skill level, preferred frameworks, communication style.
2. **Emotional Context Layer**: Tracked motivation levels, stress indicators, confidence, and recent setbacks/achievements.
3. **Categorized Vector Memory Nodes**: Semantic similarity matches retrieved from CockroachDB `pgvector`.
4. **Active Goals & Velocity**: Deadlines, milestone progress, and streak metrics.
5. **Project Architecture**: Active repositories, task backlogs, and multi-file dependencies.
6. **Session Short-Term Memory**: Conversation window summary across recent turns.
7. **Proactive Relationship & Nudge Engine**: Contextual follow-ups, milestone celebrations, and architectural suggestions.

---

## 📸 Screenshot: Chat Interface

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the main conversational AI Companion chat view displaying context-aware responses, Markdown rendering, and personalized dialogue.

**Recommended filename:**  
`docs/images/chat-interface.png`

---

## 📸 Screenshot: Persistent Memory Recall

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the memory recall interface displaying retrieved CockroachDB `pgvector` memory nodes, match confidence scores, and categorical tags (Profile, Goals, Projects, Learning).

**Recommended filename:**  
`docs/images/memory-recall.png`

---

### 2. ❤️ Emotional Intelligence & Relationship Engine
* **Contextual Awareness, Not Fake Sycophancy**: Never pretends to be human or use cheap boilerplate sympathy ("I'm sorry"). Instead, grounds empathy in real shared history (e.g., *"I remember last week you were excited about this opportunity. I know this is disappointing, but look at the backend progress you've achieved."*).
* **Categorized Emotional Nodes**: Detects stress, frustration, burnout signals, and milestone pride, persisting them as structured `emotion` nodes in CockroachDB.
* **Calm Milestone Celebrations**: Acknowledges real developer achievements and goal completions without hyperbolic exaggeration.

---

## 📸 Screenshot: Emotional Intelligence

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the Emotional Intelligence context layer panel displaying tracked motivation level, stress indicators, confidence gauges, and historical emotional memory nodes.

**Recommended filename:**  
`docs/images/emotional-intelligence.png`

---

### 3. 🎯 Goal & Milestone Velocity Engine
* Breaks ambitious technical projects into actionable daily milestones stored with ACID durability.
* Tracks developer velocity, streak metrics, and milestone completion percentages in real time.

---

## 📸 Screenshot: Goal Tracker

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the Goal Velocity Engine displaying active project deadlines, completion percentages, milestone breakdown lists, and streak metrics.

**Recommended filename:**  
`docs/images/goal-tracker.png`

---

### 4. 🗂️ Project Awareness Workspace
* Maps code file trees, dependencies, and completed benchmarks.
* Runs safety checks via the `ccloud` CLI before introducing structural codebase changes.

---

## 📸 Screenshot: Project Awareness

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the Project Workspace panel mapping the active codebase structure, repository dependencies, task backlog, and current architectural decisions.

**Recommended filename:**  
`docs/images/project-awareness.png`

---

### 5. 📑 Automated Daily Reflection Engine
* Synthesizes end-of-day accomplishment logs, focus trends, and commit breakthroughs.
* Automatically archives daily reflection artifacts to Amazon S3.

---

## 📸 Screenshot: Reflection Engine

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the Daily Reflection Timeline displaying synthesized wins, lessons learned, focus trends, and AWS S3 archive synchronization status.

**Recommended filename:**  
`docs/images/reflection-engine.png`

---

### 6. 💡 Proactive Check-Ins & Nudge Engine
* Automatically greets users with context-aware follow-ups on past blockers (*"Welcome back! Yesterday you were debugging the memory engine. Did you solve it?"*).

---

## 📸 Screenshot: Suggestion Engine

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show the Proactive Nudge Engine generating real-time architectural recommendations, bug warnings, and contextual follow-up prompts.

**Recommended filename:**  
`docs/images/suggestion-engine.png`

---

## 📐 System Architecture

```
                   ┌─────────────────────────────────────────┐
                   │        Mirror AI Client (React 19)      │
                   └────────────────────┬────────────────────┘
                                        │ REST API (JSON)
                                        ▼
                   ┌─────────────────────────────────────────┐
                   │    Express.js Context Assembly Server    │
                   └───────────┬─────────────────┬───────────┘
                               │                 │
      Vector Search & MCP Sync │                 │ Serverless Events & Storage
   ┌───────────────────────────┘                 └───────────────────────────┐
   ▼                                                                         ▼
┌─────────────────────────────────┐                       ┌─────────────────────────────────┐
│ CockroachDB Cloud Cluster       │                       │ AWS Cloud Infrastructure        │
│  • Managed MCP Endpoint         │                       │  • AWS Lambda Triggers          │
│  • pgvector Embedding Index     │                       │  • Amazon Bedrock Agent         │
│  • ACID Goals & Project Tables  │                       │  • Amazon S3 (`mirror-bucket`)  │
└─────────────────────────────────┘                       └─────────────────────────────────┘
```

---

## 📸 Screenshot: Architecture Diagram

> [ INSERT SCREENSHOT HERE ]

**Description:**  
Show a visual diagram or schematic rendering of the full-stack system data flow between React 19, Express.js, CockroachDB Managed MCP, pgvector, and AWS Cloud infrastructure.

**Recommended filename:**  
`docs/images/architecture-diagram.png`

---

## 🏆 Devpost Judging Criteria Matrix

| Judging Criteria | Weight | How Mirror AI Exceeds Expectations |
| :--- | :---: | :--- |
| **Agentic Memory Design** | **20%** | CockroachDB `pgvector` serves as the primary cognitive memory bank for 100% of user context, past conversations, and goal graphs with multi-region consistency. |
| **Technical Implementation** | **20%** | Modular ESM TypeScript architecture with Express middleware, Managed MCP Server integration, and AWS Lambda serverless execution. |
| **Real-World Impact** | **20%** | Solves context decay for developers, creators, and students by providing a continuous companion that remembers goals and technical decisions. |
| **Production Readiness** | **20%** | Leverages CockroachDB's 99.999% SLA, strict service-account RBAC via `ccloud` CLI, full MCP audit logging, and encrypted AWS pipelines. |
| **Creativity & Originality** | **20%** | Reimagines AI from a transient chat box into a self-evolving reflection journal, goal mentor, and project co-pilot with persistent memory. |

---

## 🚀 Local Installation & Setup

### Prerequisites
* **Node.js**: v18.0+ or v20.0+
* **npm**: v9.0+
* **CockroachDB Account**: Free cluster on [cockroachlabs.cloud](https://cockroachlabs.cloud)

### 1. Clone Repo
```bash
git clone https://github.com/jis0607/Mirror2.0.git
cd Mirror2.0
```

### 2. Environment Variables (`.env`)
```env
PORT=3000
GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"
COCKROACH_MCP_ENDPOINT="https://cockroachlabs.cloud/mcp"
COCKROACH_CLUSTER_ID="your-cockroach-cluster-id"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="mirror-reflections"
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to interact with Mirror AI.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
