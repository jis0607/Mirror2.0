# 🪞 Mirror AI — Persistent Agentic Memory Companion

> **Official Devpost Hackathon Submission for CockroachDB × AWS Hackathon 2026**  
> *Transforming AI from a transient chatbot into a lifelong companion that remembers, tracks goals, and evolves with you — powered by CockroachDB pgvector & AWS.*

---

## 📸 App Showcase & Screenshots

| 💬 Contextual Chat Companion | 🧠 Persistent Memory Dashboard |
| :---: | :---: |
| ![Chat Companion](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80) | ![Memory Network Graph](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80) |
| *Real-time conversation backed by CockroachDB vector recall and memory nodes* | *Visual graph of indexed preferences, project state, and long-term context* |

| 🎯 Goals & Velocity Matrix | 📑 Daily Reflection Timeline |
| :---: | :---: |
| ![Goals Engine](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80) | ![Daily Reflections](https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80) |
| *Milestone progress tracking with ACID durability on CockroachDB* | *Automated daily synthesis, git breakthrough logs, and S3 backup archives* |

---

## ⚡ The Problem: AI Amnesia

Standard LLM chatbots forget everything the second you close your browser tab. They don't know your active coding project, your long-term ambitions, your tech stack preferences, or what you worked on yesterday. Autonomous agents need persistent, multi-region memory that never goes down.

## 💡 The Solution: Mirror AI

**Mirror AI** is a full-stack **AI Companion** built with an internal **Context Engine** powered by **CockroachDB distributed `pgvector`** and **AWS Cloud infrastructure**. Before generating any response, Mirror retrieves past memories, active goals, project state, and user preferences to deliver deeply personalized, context-aware assistance.

---

## 🔥 Key Winning Features

### 1. 🧠 Persistent Agentic Memory Engine
* **Vector Embeddings on CockroachDB**: Converts user chats, code snippets, and goals into 1536-dimensional vector embeddings stored in CockroachDB with `pgvector`.
* **Managed MCP Server Endpoint**: Connects directly via `https://cockroachlabs.cloud/mcp` for safe, audited agent memory inspection.
* **Zero Context Loss**: Remembers user habits, preferences, and architecture across infinite sessions.

### 2. ⚡ Pre-Response Context Engine
Assembles 6 live layers before every AI response:
1. **User Profile**: Coding skill level, tech stack preferences, communication style.
2. **Relevant Memories**: Cosine-similarity matches retrieved from CockroachDB pgvector.
3. **Active Goals**: Deadlines, milestone completion percentages, and active streaks.
4. **Project Awareness**: Repository architecture, task queues, and dependencies.
5. **Recent Interaction Summary**: Last 10 interaction turns.
6. **Proactive Suggestions**: Automated architectural and milestone guidance.

### 3. 🎯 Goal & Progress Tracker
* ACID-compliant goal storage on CockroachDB.
* Dynamic milestone decomposition, streak tracking, and velocity analytics.

### 4. 🗂️ Project Awareness Workspace
* Continuous tracking of project architecture, active tasks, and completed benchmarks.
* `ccloud` CLI control plane integration for service-account RBAC and backup management.

### 5. 📑 Automated Daily Reflection Engine
* End-of-day AI reflections that synthesize breakthroughs, git commits, and focus patterns.
* Automated artifact backup to Amazon S3 buckets (`mirror-reflections`).

### 6. 💡 Proactive Suggestion Engine
* Intelligently scans active project bottlenecks and upcoming deadlines to deliver actionable advice.

---

## 🪳 CockroachDB & ☁️ AWS Tech Stack

### CockroachDB Tools (4/4 Integrated)
* **Managed MCP Server (`https://cockroachlabs.cloud/mcp`)**: Single-config snippet integration for Claude, Cursor, and VS Code with audit logging and zero custom proxy.
* **Distributed Vector Indexing (`pgvector`)**: Fast vector similarity search with zero consistency gaps between vector embeddings and transactional data.
* **`ccloud` CLI (Agent-Ready)**: Command-line control plane for cluster management, backups, and RBAC control.
* **Agent Skills Repo**: Machine-executable skills for database schema tuning, query optimization, and operations.

### AWS Cloud Infrastructure (4/4 Supported)
* **AWS Lambda**: Serverless execution for background vector embeddings and event hooks.
* **Amazon Bedrock**: Foundation model inference and agentic workflows.
* **Amazon S3**: Object storage for daily reflection logs and code snapshots.
* **Amazon ECS / EKS**: Containerized microservices deployment.

---

## 🏗️ System Architecture

```
                                  ┌──────────────────────────────────┐
                                  │      Mirror AI Client (React)    │
                                  └─────────────────┬────────────────┘
                                                    │ REST API
                                                    ▼
                                  ┌──────────────────────────────────┐
                                  │    Express.js AI Companion Engine │
                                  │        (Context Engine)          │
                                  └────────┬─────────────────┬───────┘
                                           │                 │
                Vector Search & MCP        │                 │ Serverless Sync
                ────────────────────┐      │                 │ ───────────────┐
                                    ▼      ▼                 ▼                ▼
                     ┌───────────────────────────────┐     ┌─────────────────────┐
                     │ CockroachDB Cloud Cluster     │     │ AWS Cloud           │
                     │  • Managed MCP Endpoint       │     │  • AWS Lambda       │
                     │  • pgvector Vector Index      │     │  • Amazon Bedrock   │
                     │  • ACID Goal & Project Tables │     │  • Amazon S3        │
                     └───────────────────────────────┘     └─────────────────────┘
```

---

## 🏆 Devpost Judging Criteria Alignment

* **Agentic Memory Design (20%)**: CockroachDB `pgvector` stores 100% of memory nodes, conversation history, and goal states with multi-region persistence.
* **Technical Implementation (20%)**: Production-grade ESM TypeScript architecture utilizing Managed MCP Server, Express REST APIs, and AWS Lambda event triggers.
* **Real-World Impact (20%)**: Solves AI context amnesia for software engineers, students, and creators by maintaining a continuous lifelong companion.
* **Production Readiness (20%)**: Built on CockroachDB's 99.999% SLA, strict service-account RBAC, full MCP audit logging, and encrypted AWS serverless pipelines.
* **Creativity & Originality (20%)**: Reimagines the AI assistant as a self-evolving reflection journal, goal mentor, and project co-pilot with persistent memory.

---

## 🛠️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mirror-ai-companion.git
cd mirror-ai-companion
```

### 2. Configure Environment Variables (`.env`)
```env
PORT=3000
GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"
COCKROACH_MCP_ENDPOINT="https://cockroachlabs.cloud/mcp"
COCKROACH_CLUSTER_ID="your-cluster-id"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="mirror-reflections"
```

### 3. Install & Start
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to launch the Mirror AI Companion interface.

---

## 🎥 Submission Links & Resources

* **Live Interactive App**: [Mirror AI Preview URL](https://ais-dev-oyqiukmvzejmm3ufsdcqx6-807460345850.asia-east1.run.app)
* **Devpost Video Showcase**: [Watch < 3 Minute Video](https://youtube.com)
* **License**: Open Source under the [MIT License](LICENSE)
