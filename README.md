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

## ⚡ The Core Problem: AI Amnesia

Current AI assistants suffer from **session isolation and memory decay**. Every new chat tab wipes the slate clean — forcing software engineers and creators to continuously re-explain their stack architecture, project milestones, personal preferences, and historical decisions.

Traditional single-region databases crash under high-frequency autonomous agent write bursts, while standard vector databases lack strict transactional consistency.

---

## 💡 The Solution: Mirror AI

**Mirror AI** transforms the LLM interaction pattern from a temporary Q&A tool into a **continuous, self-evolving AI Companion**. 

Powered by **CockroachDB multi-region `pgvector`** and **Managed MCP Server (`https://cockroachlabs.cloud/mcp`)**, Mirror constructs a 6-layer cognitive graph before every response, providing true long-term memory across infinite sessions with zero downtime.

---

## 🛠️ Mandatory Hackathon Tooling Matrix

### 🪳 CockroachDB Capabilities (4/4 Implemented)
| Feature | Implementation Detail |
| :--- | :--- |
| **1. Managed MCP Server** | Live connection via `https://cockroachlabs.cloud/mcp` providing audit logging, RBAC, and single-config agent memory inspection. |
| **2. Distributed `pgvector`** | 1536-dimensional vector embedding store for cosine similarity recall without consistency gaps. |
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

## 🌟 Key Features

### 1. 🧠 6-Layer Real-Time Context Engine
Before answering any query, Mirror AI instantly synthesizes 6 contextual vectors:
1. **User Identity & Preferences**: Skill level, preferred frameworks, communication style.
2. **Vector Memory Nodes**: Semantic similarity matches retrieved from CockroachDB `pgvector`.
3. **Active Goals & Velocity**: Deadlines, milestone progress, and streak metrics.
4. **Project Architecture**: Active repositories, task backlogs, and multi-file dependencies.
5. **Session Short-Term Memory**: Conversation window summary across recent turns.
6. **Proactive Architectural Guidance**: Real-time bottleneck detection and suggestions.

### 2. 🎯 Goal & Milestone Velocity Engine
* Breaks ambitious technical projects into actionable daily milestones stored with ACID durability.
* Tracks developer velocity, streak metrics, and milestone completion percentages in real time.

### 3. 🗂️ Project Awareness Workspace
* Maps code file trees, dependencies, and completed benchmarks.
* Runs safety checks via the `ccloud` CLI before introducing structural codebase changes.

### 4. 📑 Automated Daily Reflection Engine
* Synthesizes end-of-day accomplishment logs, focus trends, and commit breakthroughs.
* Automatically archives daily reflection artifacts to Amazon S3.

### 5. 💡 Proactive Nudge Engine
* Identifies impending deadlines, unaddressed edge cases, or architecture bottlenecks and proactively suggests solutions.

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
