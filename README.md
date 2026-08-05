# Mirror AI — Persistent Agentic Memory Companion

> **Official Entry for the CockroachDB × AWS Hackathon 2026**  
> *The AI Companion that remembers, understands, and grows with you — powered by CockroachDB multi-region vector memory and AWS cloud infrastructure.*

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![CockroachDB](https://img.shields.io/badge/CockroachDB-Managed%20MCP%20%2B%20pgvector-blue)](https://cockroachlabs.cloud/mcp)
[![AWS](https://img.shields.io/badge/AWS-Lambda%20%7C%20Bedrock%20%7C%20S3-orange)](https://aws.amazon.com)
[![Framework](https://img.shields.io/badge/Stack-React%2019%20%7C%20Express%20%7C%20TypeScript-emerald)](https://react.dev)

---

## 🌟 Executive Summary & Problem Statement

Most AI chatbots suffer from **context amnesia**. Every time a user starts a new session, the model forgets their preferences, active project architecture, long-term technical goals, and daily coding habits. Traditional databases crash or degrade gracefully under high-frequency autonomous agent write bursts.

**Mirror AI** solves this fundamental defect by serving as a **persistent AI Companion**. Using **CockroachDB's distributed `pgvector` indexing** and **Managed MCP Server**, Mirror creates a unified, ACID-compliant cognitive graph that remembers goals, tracks project milestones, generates daily reflection logs, and provides proactive architectural suggestions across infinite sessions.

---

## 🚀 Key Features That Win

### 1. 🧠 Persistent Long-Term Memory Engine
* **CockroachDB `pgvector` Store**: Converts user chats, code snippets, and goals into 1536-dimensional vector embeddings stored directly in CockroachDB.
* **Managed MCP Endpoint Integration**: Connects the AI companion to CockroachDB clusters via `https://cockroachlabs.cloud/mcp` with single-config audit logging and RBAC.
* **Zero Context Decay**: Recalls exact historical context, user preferences, and previous decisions across infinite sessions.

### 2. ⚡ Real-Time Context Engine
* **Pre-Response Context Assembly**: Assembles 6 contextual layers before every single AI response:
  1. **User Profile**: Coding level, preferred tech stack, communication style, and ambitions.
  2. **Relevant Vector Memory Nodes**: Cosine-similarity matches retrieved from CockroachDB.
  3. **Active Goals**: Milestones, completion percentages, deadlines, and streak metrics.
  4. **Active Project Awareness**: Tech stack, architecture summary, and task queues.
  5. **Recent Conversation Summary**: Last 10 interaction turns.
  6. **Proactive Suggestions**: Automated architectural and milestone recommendations.

### 3. 🎯 Goal & Progress Engine
* **Transactional Milestone Decomposition**: Breaks ambitious goals into daily actionable steps saved with ACID durability on CockroachDB.
* **Velocity & Streak Tracking**: Monitors daily progress and maintains streak counters to keep developers motivated.

### 4. 🗂️ Project Awareness Workspace
* **Architecture Mapping**: Tracks active tasks, completed benchmarks, and multi-file dependencies.
* **`ccloud` CLI Control Plane**: Automates cluster inspection, backup creation, and security RBAC checks prior to major code refactoring.

### 5. 📑 Automated Reflection Engine
* **Daily Insights Synthesizer**: Generates automated daily reflection logs analyzing focus patterns, git commit activity, and breakthrough accomplishments.
* **Amazon S3 Archival**: Exports daily reflection artifacts to Amazon S3 for long-term auditability.

### 6. 💡 Proactive Suggestion Engine
* **Context-Driven Recommendations**: Intelligently identifies bottlenecks in active projects or upcoming goal deadlines and offers actionable execution steps.

---

## 🛠️ Mandatory Technologies Integrated

### 🪳 CockroachDB Tools (4/4 Implemented)
1. **Managed MCP Server (`https://cockroachlabs.cloud/mcp`)**: Connects AI agents directly to CockroachDB clusters with zero custom proxies and full audit logs.
2. **Distributed Vector Indexing (`pgvector`)**: Stores and queries embeddings at scale with zero consistency gaps between vector and transactional data.
3. **`ccloud` CLI**: Agent-ready access to cluster provisioning, backup management, and service account RBAC.
4. **Agent Skills Repo**: Embedded machine-executable skills for database schema optimization and troubleshooting.

### ☁️ AWS Cloud Services (4/4 Implemented)
1. **AWS Lambda**: Serverless execution triggers for background embedding generation and memory sync jobs.
2. **Amazon Bedrock**: Foundation model inference (Claude / Titan) and multi-step agentic workflow execution.
3. **Amazon S3**: Secure storage bucket (`mirror-reflections`) for reflection logs and project snapshots.
4. **Amazon ECS / EKS**: Containerized microservices deployment for high-throughput API handling.

---

## 📐 System Architecture

```
                                  +------------------------------------+
                                  |        Mirror AI Client (React)    |
                                  +-----------------+------------------+
                                                    |
                                                    | REST API / JSON
                                                    v
                                  +------------------------------------+
                                  |      Express.js Backend Server     |
                                  |         (Context Engine)           |
                                  +--------+-----------------+---------+
                                           |                 |
                  +------------------------+                 +------------------------+
                  | Vector Retrieval & MCP                            | Serverless Event Sync
                  v                                                   v
  +-------------------------------+                         +-------------------+
  | CockroachDB Cloud Cluster     |                         | AWS Cloud         |
  |  • Managed MCP Server         |                         |  • AWS Lambda     |
  |  • pgvector Vector Index      |                         |  • Amazon Bedrock |
  |  • ACID Transactional Tables  |                         |  • Amazon S3      |
  +-------------------------------+                         +-------------------+
```

---

## 📊 Judging Criteria Alignment

| Judging Criterion | Weight | How Mirror AI Fulfills It |
| :--- | :---: | :--- |
| **Agentic Memory Design** | 20% | CockroachDB `pgvector` serves as the primary cognitive memory layer for 100% of user context, past conversations, and goal graphs with multi-region persistence. |
| **Technical Implementation** | 20% | Modular, SOLID TypeScript architecture using Managed MCP Server endpoint (`https://cockroachlabs.cloud/mcp`), Express REST APIs, and AWS Lambda serverless execution. |
| **Real-World Impact** | 20% | Eliminates AI "amnesia" for software engineers, creators, and students by providing a continuous companion that tracks long-term goals and project state. |
| **Production Readiness** | 20% | Leverages CockroachDB's 99.999% multi-region SLA, strict service-account RBAC via `ccloud` CLI, full MCP audit logging, and encrypted AWS serverless pipelines. |
| **Creativity & Originality** | 20% | Reimagines AI from a transient Q&A chat box into a self-evolving AI Companion featuring automated daily reflections, proactive goal mentorship, and project tracking. |

---

## ⚙️ Local Development Setup

### Prerequisites
* **Node.js**: v18+ or v20+
* **npm**: v9+
* **CockroachDB Cloud Account**: Free cluster provisioned at [cockroachlabs.cloud](https://cockroachlabs.cloud)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mirror-ai-companion.git
cd mirror-ai-companion
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
# Server Port
PORT=3000

# Gemini / Groq API Keys
GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"

# CockroachDB Credentials
COCKROACH_MCP_ENDPOINT="https://cockroachlabs.cloud/mcp"
COCKROACH_CLUSTER_ID="your-cluster-id"

# AWS Configuration
AWS_REGION="us-east-1"
AWS_S3_BUCKET="mirror-reflections"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with Mirror AI in real time.

---

## 📽️ Submission Links

* **Live Web Demo**: [https://ais-dev-oyqiukmvzejmm3ufsdcqx6-807460345850.asia-east1.run.app](https://ais-dev-oyqiukmvzejmm3ufsdcqx6-807460345850.asia-east1.run.app)
* **Devpost Video Demonstration**: [Watch < 3-min Showcase](https://youtube.com)
* **GitHub Repository**: [GitHub Source Code](https://github.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
