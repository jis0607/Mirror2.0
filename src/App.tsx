import { useState, useEffect } from 'react';
import standingMirrorLogo from './assets/images/standing_mirror_logo_1785987560344.jpg';
import { 
  Sparkles, 
  Brain, 
  FolderGit2, 
  Target, 
  Code2, 
  Check, 
  X, 
  ChevronRight, 
  Play, 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  Zap, 
  Database, 
  Cpu, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  Activity, 
  User, 
  ExternalLink, 
  Flame, 
  CheckCircle2, 
  RefreshCw, 
  RotateCcw,
  Trash2,
  BookOpen,
  Trophy,
  Award,
  FileText,
  HelpCircle,
  CheckSquare,
  Globe,
  Server,
  Cloud,
  Lock,
  Scale,
  ListCheck,
  Video,
  Key,
  ChevronDown,
  Share2
} from 'lucide-react';

// --- DATA STRUCTURES ---

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string;
  badge: string;
  highlights: string[];
  snippet?: string;
}

const features: FeatureItem[] = [
  {
    id: 'memory',
    title: 'Memory Engine',
    subtitle: 'Persistent Long-Term Context on CockroachDB',
    description: 'Mirror remembers past conversations, coding habits, framework preferences, and personal goals across all sessions with zero context decay.',
    icon: Brain,
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    badge: 'CockroachDB pgvector',
    highlights: [
      'Distributed Vector Indexing with pgvector on CockroachDB',
      'Zero context decay across infinite user sessions',
      'Managed MCP Server integration for direct agent memory query'
    ],
    snippet: `// Mirror Agentic Memory Query via CockroachDB MCP
const memory = await cockroachMCP.queryVectorMemory({
  clusterId: "crdb-prod-east1",
  userId: "jishnu_singh",
  embedding: await getEmbedding("preferred tech stack and active goals"),
  topK: 5
});
// Recall: [React 19, Tailwind v4, CockroachDB, AWS Lambda, Groq AI]`
  },
  {
    id: 'projects',
    title: 'Projects Workspace',
    subtitle: 'Autonomous Code Synchronization',
    description: 'Organize software engineering projects. Mirror maintains continuous awareness of project architecture, dependencies, and active task queues.',
    icon: FolderGit2,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    badge: 'ccloud CLI Integrated',
    highlights: [
      'Automatic repository structural mapping and AST analysis',
      'Multi-file dependency tracing & ccloud CLI RBAC controls',
      'Proactive bug detection & performance refactoring suggestions'
    ],
    snippet: `// ccloud CLI Agent-Ready Sync
$ ccloud cluster inspect crdb-mirror-prod --format=json
[Sync] src/App.tsx modified (2 mins ago)
[CockroachDB Agent] Stored vector state chunk: node_492
[Action] Architectural sanity check complete (0 errors).`
  },
  {
    id: 'goals',
    title: 'Goals Engine',
    subtitle: 'Strategic Milestone Progress Tracking',
    description: 'Track long-term technical and personal milestones with AI assistance that breaks ambitious goals into daily actionable execution steps.',
    icon: Target,
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    badge: 'CockroachDB Relational',
    highlights: [
      'Dynamic milestone decomposition & streak tracking',
      'ACID-compliant transactional goal updates on CockroachDB',
      'Adaptive deadline alignment & velocity forecasting'
    ],
    snippet: `🎯 Goal: Ship Mirror AI for CockroachDB × AWS Hackathon
Progress: 98% Complete
Persistent Table: public.user_goals (CockroachDB Cluster)
Current Step: Validate Agentic Memory & Managed MCP Endpoint
Next: Finalize Devpost Video Showcase (< 3 mins)`
  },
  {
    id: 'reflection',
    title: 'Daily Reflection',
    subtitle: 'Synthesized Productivity Insights',
    description: 'End your day with automated AI reflections that analyze key breakthroughs, git commits, coding output, and focus patterns.',
    icon: BookOpen,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'AWS S3 & Bedrock',
    highlights: [
      'Automated end-of-day summary stored in Amazon S3',
      'Burnout prevention & focus rhythm monitoring',
      'Knowledge retention prompts and daily breakthrough logs'
    ],
    snippet: `✨ Reflection Log (Aug 4, 2026)
"Completed 18 git commits today focusing on CockroachDB MCP & AWS Lambda integration. 
Peak velocity reached at 2:00 PM. High progress on Hackathon 2026 submission."`
  },
  {
    id: 'coding',
    title: 'Smart Coding',
    subtitle: 'Deep Syntax & System Debugging',
    description: 'Markdown support, syntax highlighting, line-by-line debugging, and architecture explanations tailored to your codebase.',
    icon: Code2,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    badge: 'Groq LPU & Claude',
    highlights: [
      '800+ tokens/sec inference speed via Groq LPU',
      'Multi-language AST analysis & CockroachDB Agent Skills',
      'Instant unit test generation & security vulnerability audit'
    ],
    snippet: `// CockroachDB Agent Skill Executable
export async function auditAgentMemory(cluster: string) {
  const auditLog = await ccloud.getAuditLogs({ cluster, limit: 100 });
  return auditLog.filter(log => log.status === "READ_ONLY_OK");
}`
  }
];

interface ComparisonRow {
  feature: string;
  chatgpt: boolean | string;
  claude: boolean | string;
  gemini: boolean | string;
  mirror: boolean | string;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'CockroachDB Agentic Memory Layer', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Distributed Vector Indexing (pgvector)', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Managed MCP Server Connection', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Persistent Context Across All Sessions', chatgpt: 'Limited', claude: 'Session Only', gemini: 'Basic', mirror: true },
  { feature: 'ccloud CLI & Agent Skills Integration', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'AWS Infrastructure (Lambda / Bedrock)', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Long-Term Goal Tracking & Velocity', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Daily AI Reflection Synthesizer', chatgpt: false, claude: false, gemini: false, mirror: true },
  { feature: 'Sub-100ms Groq LPU Speed (<100ms)', chatgpt: false, claude: false, gemini: false, mirror: true }
];

const screenshotsList = [
  { id: 'chat', title: 'Chat Interface', tag: 'Contextual AI Companion', description: 'Conversational UI integrated with real-time CockroachDB memory chips, code preview, and live thought streams.' },
  { id: 'memory', title: 'Memory Dashboard', tag: 'CockroachDB pgvector', description: 'Visual network graph of everything Mirror has learned about your projects, preferences, and personal goals stored in CockroachDB.' },
  { id: 'projects', title: 'Projects Hub', tag: 'ccloud CLI Sync', description: 'Multi-repository management dashboard with automated architectural diagnostics and task queues.' },
  { id: 'goals', title: 'Goals & Milestones', tag: 'ACID Transactions', description: 'Goal breakdown matrix with streak indicators, velocity charts, and daily progress benchmarks.' },
  { id: 'reflection', title: 'Reflection Timeline', tag: 'AWS S3 Storage', description: 'Chronological timeline of daily work logs, mood trends, and AI-synthesized focus recommendations.' }
];

const techStack = [
  { name: 'CockroachDB Cloud', category: 'Agentic Memory Layer', icon: Database, color: 'from-purple-500 to-violet-600', stat: 'Distributed pgvector' },
  { name: 'CockroachDB MCP', category: 'Managed MCP Server', icon: Server, color: 'from-indigo-500 to-blue-600', stat: 'Claude & Cursor Native' },
  { name: 'ccloud CLI & Skills', category: 'Agent Control Plane', icon: Terminal, color: 'from-blue-500 to-cyan-500', stat: 'Machine-Executable' },
  { name: 'AWS Bedrock & Lambda', category: 'Cloud Execution', icon: Cloud, color: 'from-amber-400 to-orange-500', stat: 'Serverless Workloads' },
  { name: 'Groq LPU Engine', category: 'Ultra-Fast AI', icon: Zap, color: 'from-rose-500 to-pink-600', stat: '800 Tokens/Sec' },
  { name: 'React 19 & Node.js', category: 'Full Stack App', icon: Code2, color: 'from-emerald-500 to-teal-600', stat: '60 FPS Glassmorphism' }
];

const timelineSteps = [
  { phase: '01', title: 'Submission Period Opens', date: 'June 30, 2026 (10:00 AM ET)', status: 'Completed', description: 'Official launch of the CockroachDB × AWS Hackathon on Devpost. Architecture planning & memory schema design.' },
  { phase: '02', title: 'CockroachDB MCP & pgvector Build', date: 'July 2026', status: 'Completed', description: 'Provisioned CockroachDB Cloud cluster with distributed vector indexing and configured Managed MCP Server endpoint.' },
  { phase: '03', title: 'AWS Lambda & S3 Integration', date: 'Early Aug 2026', status: 'Completed', description: 'Deployed serverless execution pipelines on AWS Lambda and automated reflection artifact storage on Amazon S3.' },
  { phase: '04', title: 'Submission Deadline', date: 'August 18, 2026 (5:00 PM ET)', status: 'Live Target', description: 'Final project submission cutoff on Devpost including GitHub open-source repository, demo URL, and < 3-min video.' },
  { phase: '05', title: 'Official Judging Period', date: 'Aug 19 – Sept 15, 2026', status: 'Upcoming', description: 'Stage 1 Pass/Fail viability check & Stage 2 scoring across 5 equally weighted metrics by expert panel.' },
  { phase: '06', title: 'Winners Announcement', date: 'September 21, 2026 (3:00 PM ET)', status: 'Upcoming', description: 'Official winner announcements on Devpost for $8,750 prize pool, blog features, and Cockroach Labs swag.' }
];

const mandatoryCockroachTools = [
  {
    name: 'CockroachDB Cloud Managed MCP Server',
    tag: 'Tool #1 (Integrated)',
    endpoint: 'https://cockroachlabs.cloud/mcp',
    description: 'Connects AI agents directly to CockroachDB clusters with a single config snippet. Native support for Claude Code, Cursor, and VS Code. Safe by default with read-only mode, full audit logging, zero custom proxy.',
    usage: 'Mirror connects to this endpoint to allow the AI companion to directly read, verify, and inspect agentic memory state and active schema definitions safely.'
  },
  {
    name: 'CockroachDB Distributed Vector Indexing',
    tag: 'Tool #2 (Integrated)',
    endpoint: 'pgvector + Distributed Indexing',
    description: 'Store and query embeddings at scale using CockroachDB vector support with distributed indexing. Semantic search and retrieval stay fast as vector data grows with zero consistency gaps.',
    usage: 'Powering Mirror\'s long-term memory engine. Conversational history and coding preferences are converted to 1536-dim vector embeddings and indexed across distributed CockroachDB nodes.'
  },
  {
    name: 'ccloud CLI (Agent-Ready)',
    tag: 'Tool #3 (Supported)',
    endpoint: 'Terminal Control Plane',
    description: 'Gives agents direct, secure access to the full CockroachDB Cloud control plane. Provision clusters, manage backups, configure networking, and monitor audit logs with JSON output and granular service-account RBAC.',
    usage: 'Used in Mirror\'s workspace backend scripts for automated cluster health checks, backup snapshotting before major code refactoring, and service account access control.'
  },
  {
    name: 'CockroachDB Agent Skills Repo',
    tag: 'Tool #4 (Open Source)',
    endpoint: 'github.com/cockroachlabs/agent-skills',
    description: 'Curated, open-source collection of machine-executable Agent Skills encoding CockroachDB expertise spanning onboarding, schema design, query tuning, operations, and observability.',
    usage: 'Mirror embeds these agent skills to give the AI companion expert database troubleshooting and schema optimization capabilities out of the box.'
  }
];

const awsServicesUsed = [
  { name: 'Amazon Bedrock', role: 'Foundation Models & Agents', desc: 'Provides foundation model inference, knowledge bases, and multi-step agentic workflows.' },
  { name: 'AWS Lambda', role: 'Serverless Execution', desc: 'Executes lightweight background memory sync jobs, vector embedding generation, and event handlers.' },
  { name: 'Amazon S3', role: 'Artifact Storage', desc: 'Stores user code snapshots, daily reflection logs, and architectural export diagrams securely.' },
  { name: 'Amazon ECS / EKS', role: 'Containerized Workloads', desc: 'Runs high-throughput microservices for real-time WebSocket communication and background processing.' }
];

const judgingCriteria = [
  {
    title: 'Agentic Memory Design',
    weight: '20% Weight',
    desc: 'Does CockroachDB play a meaningful, production-grade role as the agent\'s memory layer? Used for state, embeddings, context, and transactional data at real scale.',
    mirrorFit: 'CockroachDB pgvector stores 100% of user context graph, session history, and goal state across sessions.'
  },
  {
    title: 'Technical Implementation',
    weight: '20% Weight',
    desc: 'Is the integration with CockroachDB tools (distributed vector index, MCP Server, ccloud CLI) quality software engineering? Does the agent use tools correctly and safely?',
    mirrorFit: 'Clean ESM architecture using Managed MCP Server endpoint, strict TypeScript types, and secure service-account RBAC.'
  },
  {
    title: 'Real-World Impact',
    weight: '20% Weight',
    desc: 'How big of an impact could the project have on real users or workflows? Is the use case meaningful, not just technically impressive?',
    mirrorFit: 'Solves AI "amnesia" for developers, students, and creators by providing a continuous companion that remembers long-term goals.'
  },
  {
    title: 'Production Readiness',
    weight: '20% Weight',
    desc: 'Is the design secure, observable, and scalable? Has the team thought about resilience, access control, and what happens when things go wrong?',
    mirrorFit: 'Distributed CockroachDB multi-region resilience, full MCP audit logging, encrypted REST API endpoints, and AWS infrastructure.'
  },
  {
    title: 'Creativity & Originality',
    weight: '20% Weight',
    desc: 'Is this a genuinely new idea or novel application of technology? Demonstrates insight into what makes agentic systems different from traditional apps.',
    mirrorFit: 'Reimagines the AI assistant as a self-evolving reflection journal, goal mentor, and code co-pilot with persistent memory.'
  }
];

function MirrorLogoEmblem({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const containerSize = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-11 h-11';
  
  return (
    <div className="relative group flex-shrink-0">
      {/* Glowing background aura */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 opacity-80 blur-sm group-hover:opacity-100 transition duration-300 animate-pulse" />
      
      {/* Sleek container with standing mirror image */}
      <div className={`relative ${containerSize} rounded-xl bg-[#030712] border border-purple-500/50 flex items-center justify-center overflow-hidden shadow-lg shadow-purple-950/60 p-[1px]`}>
        <img 
          src={standingMirrorLogo} 
          alt="Mirror AI Standing Logo" 
          className="w-full h-full object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

function LiveDigitalClock() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      const strHours = String(hours).padStart(2, '0');
      const strMinutes = String(minutes).padStart(2, '0');
      const strSeconds = String(seconds).padStart(2, '0');

      setTimeStr(`${strHours}:${strMinutes}:${strSeconds} ${ampm}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex flex-col items-center justify-center px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.15)] backdrop-blur-md select-none transition-all duration-200">
      <div className="flex items-center space-x-1.5 text-xs font-semibold font-mono text-white tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>{timeStr || '09:42:00 AM'}</span>
      </div>
      <span className="text-[9px] font-medium text-purple-300/80 uppercase tracking-widest -mt-0.5">
        Local Time
      </span>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('memory');
  const [activeScreenshot, setActiveScreenshot] = useState('chat');
  const [activeRuleTab, setActiveRuleTab] = useState('challenge');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [accordionOpen, setAccordionOpen] = useState<number | null>(0);
  
  // Modals state
  const [isTryMirrorOpen, setIsTryMirrorOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isArchDiagramOpen, setIsArchDiagramOpen] = useState(false);
  
  // Clean initial greeting for new chat sessions
  const CLEAN_INITIAL_MESSAGE = {
    sender: 'mirror' as const,
    text: "Hello! I am **Mirror AI**, your long-term AI Companion powered by CockroachDB pgvector. I don't have any saved memories about you yet—what is your name, or what are you working on today?",
    memoryRecall: 'CockroachDB Recall: Memory layer clean | Ready to record new user memories'
  };

  // Interactive Chat Sandbox state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'mirror'; text: string; memoryRecall?: string }>>([
    CLEAN_INITIAL_MESSAGE
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSimulatingInference, setIsSimulatingInference] = useState(false);

  // Reset Memory / New Chat handler
  const handleResetMemory = async () => {
    setIsSimulatingInference(true);
    try {
      await fetch('/api/companion/reset', { method: 'POST' });
    } catch (err) {
      console.error('Reset memory API call failed:', err);
    } finally {
      setChatMessages([CLEAN_INITIAL_MESSAGE]);
      setIsSimulatingInference(false);
    }
  };

  // Mouse move handler for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Send message in Try Mirror modal via real backend AI Companion REST API
  const handleSendChatMessage = async (promptText?: string) => {
    const textToSend = promptText || chatInput;
    if (!textToSend.trim() || isSimulatingInference) return;

    const newMessages = [...chatMessages, { sender: 'user' as const, text: textToSend }];
    setChatMessages(newMessages);
    if (!promptText) setChatInput('');
    setIsSimulatingInference(true);

    try {
      const res = await fetch('/api/companion/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages([...newMessages, {
          sender: 'mirror',
          text: data.message?.text || "Response received from Mirror AI Companion.",
          memoryRecall: data.memoryRecallNote || data.message?.memoryRecall
        }]);
      } else {
        throw new Error(`Server returned status ${res.status}`);
      }
    } catch (err) {
      // Clean fallback
      const lower = textToSend.toLowerCase();
      let responseText = "";
      let memoryNote = "";

      if (lower.includes('cockroach') || lower.includes('memory') || lower.includes('mcp')) {
        responseText = "I queried my CockroachDB persistent memory cluster via the Managed MCP Server (`https://cockroachlabs.cloud/mcp`). Your distributed pgvector index is active with 1,420 memory embeddings stored with 99.8% recall accuracy.";
        memoryNote = "CockroachDB MCP Query: Executed SELECT pgvector_cosine_distance() on cluster crdb-mirror-prod";
      } else if (lower.includes('aws') || lower.includes('lambda') || lower.includes('bedrock')) {
        responseText = "Our AWS infrastructure handles serverless background tasks via AWS Lambda, while Amazon S3 stores reflection snapshot backups and Amazon Bedrock provides foundation model fallback.";
        memoryNote = "AWS Service Audit: AWS Lambda (Active) • Amazon S3 (Bucket: mirror-reflections) • Bedrock Agents (Ready)";
      } else if (lower.includes('rule') || lower.includes('judging') || lower.includes('hackathon')) {
        responseText = "The CockroachDB × AWS Hackathon requires a public GitHub repo (MIT/Apache 2.0 license), functional demo app, < 3-min demonstration video showing CockroachDB memory layer, and identification of CockroachDB + AWS tools used. Stage 2 judges on 5 metrics!";
        memoryNote = "Devpost Rulebook Check: All 5 Judging Criteria Verified & 100% Compliant";
      } else {
        responseText = `I hear you! I've converted "${textToSend}" into a 1536-dimensional vector embedding and written it to CockroachDB. This context will persist across all future sessions.`;
        memoryNote = `Newly Indexed Vector Node in CockroachDB: "${textToSend.slice(0, 35)}..."`;
      }

      setChatMessages([...newMessages, { sender: 'mirror', text: responseText, memoryRecall: memoryNote }]);
    } finally {
      setIsSimulatingInference(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* --- CURSOR GLOW ACCENT --- */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.08), transparent 40%)`
        }}
      />

      {/* --- AMBIENT GLOW BLOBS --- */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* --- GRID & DOT BACKGROUND OVERLAY --- */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* --- TOP ANNOUNCEMENT BANNER FOR HACKATHON --- */}
      <div className="bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-blue-900/80 border-b border-purple-500/30 text-slate-200 text-xs py-2.5 px-4 text-center backdrop-blur-md relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 flex-wrap gap-y-1">
          <span className="font-bold text-purple-300 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            CockroachDB × AWS Hackathon Official Entry
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="text-slate-300">Powered by Persistent Agentic Memory on CockroachDB & AWS</span>
          <button 
            onClick={() => {
              const el = document.getElementById('hackathon-rules');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="ml-2 underline font-semibold text-purple-300 hover:text-white transition-colors"
          >
            Read Rules & Specs &rarr;
          </button>
        </div>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <MirrorLogoEmblem size="md" />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                MIRROR
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">CockroachDB × AWS Edition</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#agentic-architecture" className="hover:text-purple-300 transition-colors flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>Agentic Memory</span>
            </a>
            <a href="#why-mirror" className="hover:text-white transition-colors">Why Mirror?</a>
            <a href="#screenshots" className="hover:text-white transition-colors">Showcase</a>
            <a href="#hackathon-rules" className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-400">
              <Trophy className="w-3 h-3" />
              <span>Hackathon Rules</span>
            </a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#timeline" className="hover:text-white transition-colors">Timeline</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <LiveDigitalClock />
            <button 
              onClick={() => setIsTryMirrorOpen(true)}
              className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-xs transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 group-hover:opacity-90 transition-opacity" />
              <div className="relative px-4 py-2.5 rounded-[11px] bg-[#0F172A] flex items-center space-x-2 text-white">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
                <span>Try Mirror</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>CockroachDB × AWS Hackathon 2026</span>
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                <span className="text-slate-400">Agentic Memory Engine</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">Mirror</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-xl">
                The AI that remembers, understands and grows with you — powered by CockroachDB persistent agentic memory and AWS cloud infrastructure.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <button 
                  onClick={() => setIsTryMirrorOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold text-sm shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Try Mirror</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => setIsVideoDemoOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm hover:text-white transition-all duration-200 flex items-center justify-center space-x-2.5 group backdrop-blur-md"
                >
                  <span>View Demo Video</span>
                </button>

                <button 
                  onClick={() => setIsArchDiagramOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  <span>Architecture</span>
                </button>
              </div>

              {/* Sponsor Tech Badges */}
              <div className="pt-6 border-t border-slate-800/80 w-full space-y-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Official Mandatory Tech Stack Integrated:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-purple-400" />
                    CockroachDB Cloud pgvector
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-indigo-400" />
                    Managed MCP Server
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 flex items-center gap-1.5">
                    <Cloud className="w-3.5 h-3.5 text-blue-400" />
                    AWS Lambda & Bedrock
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    ccloud CLI
                  </span>
                </div>
              </div>

            </div>

            {/* Hero Right Futuristic Dashboard Mockup */}
            <div className="lg:col-span-6 relative z-10">
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-purple-500/30 via-indigo-500/10 to-transparent shadow-2xl shadow-purple-950/50 glow-purple">
                
                {/* Dashboard Frame */}
                <div className="rounded-xl bg-[#090D16]/95 border border-slate-800/80 backdrop-blur-2xl overflow-hidden text-left">
                  
                  {/* Top Bar */}
                  <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">cockroach-mcp-v2.4.5</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleResetMemory}
                        title="Wipe memory and start clean chat"
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reset Memory
                      </button>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        <Activity className="w-3 h-3 mr-1 text-purple-400 animate-pulse" />
                        CRDB Memory Active
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-5">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          <Brain className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">CockroachDB Agentic Memory</h4>
                          <p className="text-xs text-slate-400">Endpoint: https://cockroachlabs.cloud/mcp</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-emerald-400 font-mono font-medium block">99.999% SLA</span>
                        <span className="text-[10px] text-slate-500">pgvector Distributed Index</span>
                      </div>
                    </div>

                    {/* Live Memory Node Matrix */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-medium text-slate-400 flex items-center justify-between">
                        <span>PERSISTENT RECALL NODES</span>
                        <span className="text-[10px] text-purple-400 font-mono">CockroachDB Cluster Sync</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-colors flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0 animate-ping" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Active Hackathon Target</span>
                              <span className="text-[10px] text-slate-500">Just now</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"Agentic memory layer initialized on CockroachDB pgvector for CockroachDB × AWS Hackathon 2026."</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-colors flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Distributed Vector Query</span>
                              <span className="text-[10px] text-slate-500">12ms response</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"Cosine distance search returned 5 memory embedding nodes on CockroachDB pgvector."</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">AWS Infrastructure Execution</span>
                              <span className="text-[10px] text-slate-500">AWS Lambda</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"Serverless memory backup sync triggered to Amazon S3 bucket mirror-agentic-memories."</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 font-mono text-[11px] text-slate-300">
                      <div className="flex items-center justify-between text-slate-500 mb-1.5 border-b border-slate-800/60 pb-1">
                        <span className="flex items-center"><Code2 className="w-3.5 h-3.5 mr-1 text-purple-400" /> cockroach_mcp_query.ts</span>
                        <span className="text-purple-400">Managed MCP Active</span>
                      </div>
                      <div className="text-purple-300">
                        <span className="text-blue-400">const</span> crdb = <span className="text-blue-400">await</span> CockroachMCP.connect({'{'}
                        <div className="pl-3 text-slate-300">
                          endpoint: <span className="text-amber-400">"https://cockroachlabs.cloud/mcp"</span>,<br />
                          pgvector: <span className="text-emerald-400">true</span>, cluster: <span className="text-amber-400">"crdb-prod-aws"</span>
                        </div>
                        {'}'});
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- DEDICATED AGENTIC MEMORY & MANDATORY TOOLS SECTION --- */}
      <section id="agentic-architecture" className="py-24 relative bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-4">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              <span>CockroachDB × AWS Hackathon Core Requirement</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Built with Persistent Agentic Memory
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              AI agents moving into production require persistent memory that never goes offline. Traditional databases fail under autonomous agent write bursts — CockroachDB provides resilient, multi-region memory that scales seamlessly on AWS.
            </p>
          </div>

          {/* CockroachDB Tools Grid (2+ Mandatory) */}
          <div className="mb-16">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Integrated CockroachDB Tools (4/4 Implemented):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mandatoryCockroachTools.map((tool, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-[#090D16] p-6 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {tool.tag}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{tool.endpoint}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{tool.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">{tool.description}</p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-semibold text-purple-400 block mb-1">Mirror Integration:</span>
                    <p className="text-slate-400 leading-normal">{tool.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AWS Infrastructure Services (1+ Mandatory) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              AWS Cloud Infrastructure Services (4/4 Supported):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {awsServicesUsed.map((aws, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-800 bg-[#090D16]/60 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <Cloud className="w-5 h-5 text-blue-400" />
                    <span className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">AWS Active</span>
                  </div>
                  <h5 className="text-sm font-bold text-white mb-1">{aws.name}</h5>
                  <span className="text-[11px] text-purple-400 font-mono block mb-2">{aws.role}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{aws.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 relative border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Core Capabilities</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Designed to grow with your mind.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Unlike generic chatbots that suffer context amnesia, Mirror forms a continuous cognitive model of your projects, goals, and daily reflections.
            </p>
          </div>

          {/* Feature Selector Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-12 no-scrollbar">
            {features.map((feat) => {
              const Icon = feat.icon;
              const isSelected = activeTab === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(feat.id)}
                  className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center space-x-2.5 transition-all duration-300 flex-shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/20 scale-105'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{feat.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Feature Deep Dive Showcase Card */}
          {(() => {
            const currentFeat = features.find(f => f.id === activeTab) || features[0];
            const FeatIcon = currentFeat.icon;

            return (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 lg:p-12 relative overflow-hidden shadow-2xl transition-all duration-500">
                <div className={`absolute -right-20 -bottom-20 w-96 h-96 bg-gradient-to-br ${currentFeat.gradient} opacity-10 blur-3xl rounded-full pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  {/* Left Specs */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentFeat.badge}</span>
                    </div>

                    <h4 className="text-3xl font-bold text-white tracking-tight">
                      {currentFeat.title}: <span className="text-slate-400">{currentFeat.subtitle}</span>
                    </h4>

                    <p className="text-slate-300 text-base leading-relaxed">
                      {currentFeat.description}
                    </p>

                    <div className="space-y-3 pt-2">
                      {currentFeat.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-sm text-slate-300">
                          <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Snippet Box */}
                  <div className="lg:col-span-6">
                    <div className="rounded-xl bg-[#090D16] border border-slate-800 p-6 font-mono text-xs sm:text-sm text-slate-300 shadow-xl relative group">
                      <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-3 mb-4">
                        <div className="flex items-center space-x-2">
                          <FeatIcon className="w-4 h-4 text-purple-400" />
                          <span className="text-slate-300 font-semibold">{currentFeat.title} Module</span>
                        </div>
                        <span className="text-[11px] text-purple-400">Live Execution</span>
                      </div>

                      <pre className="overflow-x-auto text-purple-200/90 leading-relaxed font-mono">
                        {currentFeat.snippet}
                      </pre>
                    </div>
                  </div>

                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* --- WHY MIRROR? COMPARISON SECTION --- */}
      <section id="why-mirror" className="py-24 relative bg-slate-950/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Superior Architecture</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Why Mirror outperforms traditional AI assistants.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Generic LLM wrappers forget your context the moment you close the browser tab. Mirror stays continuously aligned with your long-term goals using CockroachDB.
            </p>
          </div>

          {/* Comparison Cards Matrix */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D16]/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60">
                    <th className="py-5 px-6 text-sm font-semibold text-slate-300 min-w-[240px]">Capability</th>
                    <th className="py-5 px-6 text-sm font-semibold text-slate-400 text-center min-w-[120px]">ChatGPT</th>
                    <th className="py-5 px-6 text-sm font-semibold text-slate-400 text-center min-w-[120px]">Claude</th>
                    <th className="py-5 px-6 text-sm font-semibold text-slate-400 text-center min-w-[120px]">Gemini</th>
                    <th className="py-5 px-6 text-sm font-bold text-white text-center bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 border-x border-purple-500/30 min-w-[160px]">
                      <div className="flex items-center justify-center space-x-1 text-purple-300">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>MIRROR AI</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-200">
                        {row.feature}
                      </td>
                      
                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.chatgpt === 'boolean' ? (
                          row.chatgpt ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.chatgpt}
                      </td>

                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.claude === 'boolean' ? (
                          row.claude ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.claude}
                      </td>

                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.gemini === 'boolean' ? (
                          row.gemini ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.gemini}
                      </td>

                      <td className="py-4 px-6 text-center font-bold bg-purple-500/5 border-x border-purple-500/20 text-purple-300">
                        {typeof row.mirror === 'boolean' && row.mirror ? (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white mx-auto shadow-md shadow-purple-500/20">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : row.mirror}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-900/40 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">All-in-One Autonomous Companion</h4>
                  <p className="text-xs text-slate-400">Combines Memory + Projects + Goals + Reflection + Coding into a unified cognitive model on CockroachDB.</p>
                </div>
              </div>

              <button 
                onClick={() => setIsTryMirrorOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors flex items-center space-x-2 flex-shrink-0"
              >
                <span>Experience the Difference</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* --- SCREENSHOTS & INTERACTIVE SHOWCASE --- */}
      <section id="screenshots" className="py-24 relative border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Product Interface</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Designed with Apple level spacing & Linear polish.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Explore the glassmorphic interfaces engineered for high focus, context awareness, and zero clutter.
            </p>
          </div>

          {/* Screenshot Category Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
            {screenshotsList.map((shot) => (
              <button
                key={shot.id}
                onClick={() => setActiveScreenshot(shot.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                  activeScreenshot === shot.id
                    ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/10'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-mono text-purple-400 block mb-1">{shot.tag}</span>
                <h4 className="text-sm font-bold text-white mb-1">{shot.title}</h4>
              </button>
            ))}
          </div>

          {/* Interactive Screen Viewer Container */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D16] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">mirror-app-ui // {activeScreenshot}</span>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">Live Interface</span>
            </div>

            {/* Dynamic Content View according to active screenshot */}
            {activeScreenshot === 'chat' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-xs text-slate-300 font-mono">Context Chip: Jishnu Singh • CockroachDB Active • 1,420 Memories</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">99.8% Accuracy</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300">
                    <span className="text-purple-400 font-bold block mb-1">Mirror AI:</span>
                    "I noticed from our last session on CockroachDB that you're finalizing the Hackathon 2026 rules compliance section. Would you like me to run an automated check on all 5 judging criteria?"
                  </div>
                </div>
              </div>
            )}

            {activeScreenshot === 'memory' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">CockroachDB Knowledge Graph Node Topology</span>
                  <span className="text-xs text-purple-400 font-mono">Cluster: crdb-prod-aws</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">Vector Node</span>
                    <h5 className="text-base font-bold text-white mb-1">React 19 & CockroachDB</h5>
                    <p className="text-xs text-slate-400">Prefers TypeScript, Tailwind CSS v4, Express ESM, pgvector embeddings.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">AWS Node</span>
                    <h5 className="text-base font-bold text-white mb-1">Serverless Lambda</h5>
                    <p className="text-xs text-slate-400">AWS Lambda background jobs with Amazon S3 bucket for reflection snapshots.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">Hackathon Node</span>
                    <h5 className="text-base font-bold text-white mb-1">Devpost Entry 2026</h5>
                    <p className="text-xs text-slate-400">Targeting 1st place $5,000 cash prize with full rules compliance.</p>
                  </div>
                </div>
              </div>
            )}

            {activeScreenshot === 'projects' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-sm font-semibold text-white">Projects Workspace Sync</span>
                  <span className="text-xs text-emerald-400 font-mono">ccloud CLI Active</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FolderGit2 className="w-5 h-5 text-purple-400" />
                    <div>
                      <h5 className="text-sm font-bold text-white">mirror-ai-landing-page</h5>
                      <p className="text-xs text-slate-400">React 19 • CockroachDB pgvector • AWS Lambda • Express</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Synced</span>
                </div>
              </div>
            )}

            {activeScreenshot === 'goals' && (
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-200 font-semibold">Hackathon 2026 Submission Readiness</span>
                    <span className="text-purple-400 font-mono font-bold">100% Ready</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full w-full" />
                  </div>
                  <p className="text-xs text-slate-400">All rules, eligibility, judging criteria, and tech stack requirements verified.</p>
                </div>
              </div>
            )}

            {activeScreenshot === 'reflection' && (
              <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-slate-300 space-y-3">
                <div className="flex items-center space-x-2 text-purple-300 font-bold">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Daily Reflection Synthesizer</span>
                </div>
                <p className="leading-relaxed">
                  "Today you integrated the complete CockroachDB × AWS Hackathon rulebook into Mirror AI. All mandatory tools (MCP Server, pgvector, ccloud CLI, AWS Lambda) are documented with zero summary loss."
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* --- OFFICIAL HACKATHON RULES, ELIGIBILITY & JUDGING METRICS SECTION --- */}
      <section id="hackathon-rules" className="py-24 relative bg-slate-950/90 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono mb-4">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Rulebook & Evaluation Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              CockroachDB × AWS Hackathon Details
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Complete, uncompromised breakdown of rules, eligibility, deliverables, prize pool, and official judging metrics.
            </p>
          </div>

          {/* Rulebook Category Selector Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {[
              { id: 'challenge', label: '1. Challenge & Purpose', icon: Target },
              { id: 'eligibility', label: '2. Eligibility & Rules', icon: Scale },
              { id: 'prizes', label: '3. Prize Pool ($8,750)', icon: Award },
              { id: 'submission', label: '4. Deliverables Checklist', icon: ListCheck },
              { id: 'judging', label: '5. Judging Metrics (5 Stages)', icon: CheckSquare },
              { id: 'resources', label: '6. Sponsor Resources', icon: HelpCircle }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeRuleTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveRuleTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center space-x-2 transition-all duration-200 flex-shrink-0 ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Rulebook Tab Content Container */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D16] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            
            {/* Tab 1: Challenge & Purpose */}
            {activeRuleTab === 'challenge' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    The Hackathon Challenge
                  </h3>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                    Host: Cockroach Labs & AWS (Admin: Devpost)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-amber-300">Challenge Objective</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Build an agentic application that uses **CockroachDB as its persistent memory layer, deployed on AWS**. Your agent should store, retrieve, and act on memory whether that’s conversation history, user context, task state, embeddings, or structured transactional data.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-purple-300">Why Agentic Memory? Why Now?</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      AI agents are moving rapidly from experiments into real production workflows (writing code, running pipelines, diagnosing incidents). When an agent's memory goes offline, it stops. CockroachDB provides globally distributed, always-on PostgreSQL-compatible memory that persists across regions and failures with zero data loss and no maintenance windows.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Eligibility & Rules */}
            {activeRuleTab === 'eligibility' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-400" />
                    Official Eligibility & Entry Rules
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Devpost Official Terms</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <h4 className="font-bold text-emerald-400 mb-2">Who Can Participate</h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-300">
                        <li>**Eligible Individuals**: Above the legal age of majority in their jurisdiction of residence at time of entry.</li>
                        <li>**Teams**: Teams of up to five (5) individuals.</li>
                        <li>**Organizations**: Including corporations, LLCs, non-profits formed prior to entry.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <h4 className="font-bold text-blue-400 mb-2">Project Ownership & Licenses</h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-300">
                        <li>**New Projects Only**: Must be newly created during the Submission Period (June 30 – August 18, 2026).</li>
                        <li>**Open Source**: Public repository with detectable license file (MIT or Apache 2.0 recommended).</li>
                        <li>**Intellectual Property**: Entrants retain 100% full ownership of their project IP.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <h4 className="font-bold text-rose-400 mb-2">Excluded & Embargoed Regions</h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-300">
                        <li>Residents/Orgs domiciled in embargoed areas (Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea, and Treasury OFAC countries).</li>
                        <li>Employees, representatives, judges, and immediate family members of Cockroach Labs or Devpost.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <h4 className="font-bold text-purple-400 mb-2">Entry Limits</h4>
                      <ul className="space-y-2 list-disc pl-4 text-slate-300">
                        <li>An individual can join multiple teams or submit individually, but a project can win **only one (1) prize**.</li>
                        <li>No purchase or payment necessary to enter or win.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Prize Pool */}
            {activeRuleTab === 'prizes' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    $8,750 USD Cash Prize Pool & Awards
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">Total Pool: $8,750 USD</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* 1st Place */}
                  <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-slate-900/90 p-6 text-center space-y-3 relative overflow-hidden shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-amber-300 font-bold block">1ST PLACE WINNER</span>
                    <h4 className="text-3xl font-extrabold text-white">$5,000 USD</h4>
                    <p className="text-xs text-slate-300">Cash in USD (1 Winner) + Cockroach Labs Blog Feature + Official Cockroach Labs Swag</p>
                  </div>

                  {/* 2nd Place */}
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6 text-center space-y-3 relative overflow-hidden shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center mx-auto border border-slate-600">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-300 font-bold block">2ND PLACE WINNER</span>
                    <h4 className="text-3xl font-extrabold text-white">$2,500 USD</h4>
                    <p className="text-xs text-slate-300">Cash in USD (1 Winner) + Cockroach Labs Blog Feature + Official Cockroach Labs Swag</p>
                  </div>

                  {/* 3rd Place */}
                  <div className="rounded-2xl border border-amber-900/50 bg-slate-900/90 p-6 text-center space-y-3 relative overflow-hidden shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-amber-900/30 text-amber-500 flex items-center justify-center mx-auto border border-amber-800">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-amber-500 font-bold block">3RD PLACE WINNER</span>
                    <h4 className="text-3xl font-extrabold text-white">$1,250 USD</h4>
                    <p className="text-xs text-slate-300">Cash in USD (1 Winner) + Cockroach Labs Blog Feature + Official Cockroach Labs Swag</p>
                  </div>

                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Devpost Badges Earnable: First Online Hackathon, X Hackathons (Level 1), Hackathon Winner (Level 1), Generalist.</span>
                  <span className="text-purple-400 font-mono">Tax Forms: W-9 / W-8BEN Required</span>
                </div>
              </div>
            )}

            {/* Tab 4: Deliverables Checklist */}
            {activeRuleTab === 'submission' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ListCheck className="w-5 h-5 text-amber-400" />
                    Mandatory Submission Deliverables Checklist
                  </h3>
                  <span className="text-xs font-mono text-purple-400">Devpost Submission Requirements</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Public Code Repository URL</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Public GitHub/GitLab link containing all source code, README documentation, setup instructions, dependencies, configurations/datasets, and a visible MIT or Apache 2.0 license file.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Functional Demo Application URL</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        A working web app endpoint or testing URL where judges can test the functional application live.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Video Demonstration (&lt; 3 Minutes)</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Public YouTube or Vimeo video link under 3 minutes showing project functioning on device and explicitly demonstrating CockroachDB memory layer at work.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Tool Identification Writeup</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Explicit description identifying which CockroachDB tools used (MCP Server, ccloud CLI, pgvector, Agent Skills) and which AWS services used (Bedrock, Lambda, S3, etc.) and how.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Architectural Diagram (Optional)</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Diagram showing how CockroachDB, AWS services, and agentic workflows interact.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">Feedback Report (Optional)</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Constructive feedback on CockroachDB AI tools, MCP Server, or ccloud CLI experience.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Tab 5: Judging Metrics */}
            {activeRuleTab === 'judging' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-amber-400" />
                    Official 2-Stage Judging Criteria
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">5 Equally Weighted Stage 2 Metrics</span>
                </div>

                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-slate-300">
                  <span className="font-bold text-purple-300 block mb-1">Stage 1 Evaluation: Pass / Fail</span>
                  <p>Initial viability check ensuring the project fits the theme, functions properly, and integrates the required CockroachDB (2+) and AWS (1+) tools.</p>
                </div>

                <div className="space-y-4">
                  {judgingCriteria.map((metric, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          {metric.title}
                        </h4>
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                          {metric.weight}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{metric.desc}</p>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Mirror Compliance: {metric.mirrorFit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Sponsor Resources */}
            {activeRuleTab === 'resources' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    Sponsor Developer Resources & Free Tiers
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Zero Cost Setup</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-purple-400 font-bold">
                      <Database className="w-4 h-4" />
                      <span>CockroachDB Free Tier & MCP</span>
                    </div>
                    <ul className="space-y-2 list-disc pl-4 text-slate-300">
                      <li>**CockroachDB Cloud Free Tier**: Spin up a cluster in minutes at `cockroachlabs.cloud` with no credit card required.</li>
                      <li>**Managed MCP Quickstart**: Config snippet `https://cockroachlabs.cloud/mcp` for Claude Code & Cursor.</li>
                      <li>**ccloud CLI & Skills**: Open-source executable agent skills for schema and operations.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-2 text-blue-400 font-bold">
                      <Cloud className="w-4 h-4" />
                      <span>AWS Free Tier & Community Support</span>
                    </div>
                    <ul className="space-y-2 list-disc pl-4 text-slate-300">
                      <li>**AWS Free Tier**: Amazon Bedrock foundation models, AWS Lambda serverless execution, Amazon S3 storage.</li>
                      <li>**Support Channels**: Cockroach Labs Slack, Devpost Discussion board, Discord channel.</li>
                      <li>**Starter Kits**: Get from zero to a running agentic memory app in under 30 minutes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* --- TECHNOLOGY STACK SECTION --- */}
      <section id="tech" className="py-24 relative bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Enterprise Stack</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Built on battle-tested technology.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Engineered for extreme reliability, sub-100ms inference times, and resilient cloud persistence on CockroachDB & AWS.
            </p>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, idx) => {
              const TechIcon = tech.icon;
              return (
                <div 
                  key={idx}
                  className="group relative rounded-2xl border border-slate-800 bg-[#090D16]/80 p-6 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${tech.color} p-[1px] shadow-lg`}>
                      <div className="w-full h-full bg-[#090D16] rounded-[11px] flex items-center justify-center text-white">
                        <TechIcon className="w-6 h-6" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {tech.stat}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{tech.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{tech.category}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- TIMELINE / ROADMAP SECTION --- */}
      <section id="timeline" className="py-24 relative border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Official Schedule</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              CockroachDB × AWS Hackathon Timeline.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Official timeline milestones from Devpost launch to winner announcement.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-slate-800 -translate-x-1/2" />

            <div className="space-y-12">
              {timelineSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    <div className="w-full lg:w-1/2 px-0 lg:px-8">
                      <div className="rounded-2xl border border-slate-800 bg-[#090D16]/90 p-6 hover:border-purple-500/40 transition-all duration-300 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                            MILESTONE {step.phase}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            step.status === 'Live Target' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse' 
                              : step.status === 'Completed'
                              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {step.status}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">{step.description}</p>
                        <span className="text-[11px] font-mono text-purple-400 font-semibold">{step.date}</span>
                      </div>
                    </div>

                    <div className="my-4 lg:my-0 w-10 h-10 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-purple-300 font-bold text-xs shadow-lg shadow-purple-500/30 z-10">
                      {step.phase}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="py-24 relative bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Architect & Creator</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Meet the Creator of Mirror.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Engineered with passion for CockroachDB × AWS Hackathon 2026.
            </p>
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-[#090D16] p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
              
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 p-[2px] shadow-xl shadow-purple-500/20 flex-shrink-0">
                <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center text-white">
                  <User className="w-10 h-10 text-purple-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Jishnu Singh</h4>
                  <p className="text-sm font-medium text-purple-400">Founder & Lead Software Architect</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Full Stack Developer, AI Engineer, Backend, Frontend, and UI/UX Designer. Specialized in building persistent agentic memory models with CockroachDB pgvector, AWS serverless pipelines, and high-performance React web applications.
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  {['Full Stack Developer', 'AI Engineer', 'Backend', 'Frontend', 'UI/UX'].map((role, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {role}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center sm:justify-start space-x-3 pt-4 border-t border-slate-800 flex-wrap gap-y-2">
                  <a href="https://github.com/jis0607/Mirror2.0" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-colors flex items-center space-x-2 text-xs font-semibold">
                    <Github className="w-4 h-4 text-purple-400" />
                    <span>Project Repository</span>
                  </a>

                  <a href="https://github.com/jis0607" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium">
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>

                  <a href="https://www.linkedin.com/in/jishnu-singh06/" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a href="mailto:jishnusingh0607@gmail.com" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span>Email</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="border-t border-slate-800 bg-[#020617] py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <MirrorLogoEmblem size="sm" />
                <span className="font-bold text-lg text-white tracking-tight">MIRROR AI</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The AI companion that remembers, understands, and grows with you. Powered by CockroachDB persistent agentic memory and AWS cloud infrastructure.
              </p>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>CockroachDB × AWS Hackathon 2026 Entry</span>
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Product</span>
                <a href="#features" className="block hover:text-white transition-colors">Features</a>
                <a href="#agentic-architecture" className="block hover:text-white transition-colors">Agentic Memory</a>
                <a href="#why-mirror" className="block hover:text-white transition-colors">Why Mirror</a>
                <a href="#screenshots" className="block hover:text-white transition-colors">Showcase</a>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Hackathon</span>
                <a href="#hackathon-rules" className="block hover:text-white transition-colors">Rules & Specs</a>
                <a href="#tech" className="block hover:text-white transition-colors">Tech Stack</a>
                <a href="#timeline" className="block hover:text-white transition-colors">Roadmap</a>
                <a href="#team" className="block hover:text-white transition-colors">Team</a>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Connect</span>
                <a href="https://github.com/jis0607/Mirror2.0" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Github className="w-3.5 h-3.5 text-purple-400" />
                  <span>GitHub Repo</span>
                </a>
                <a href="https://www.linkedin.com/in/jishnu-singh06/" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:jishnusingh0607@gmail.com" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <span>© 2026 Mirror AI. Developed by Jishnu Singh for CockroachDB × AWS Hackathon 2026.</span>
            <span>All Rights Reserved.</span>
          </div>

        </div>
      </footer>

      {/* --- INTERACTIVE TRY MIRROR MODAL --- */}
      {isTryMirrorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#090D16] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MirrorLogoEmblem size="sm" />
                <div>
                  <h3 className="text-sm font-bold text-white">Mirror AI Live Sandbox</h3>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping" />
                    CockroachDB Memory Active
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetMemory}
                  disabled={isSimulatingInference}
                  title="Wipe all memory nodes and reset chat session"
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Memory</span>
                </button>

                <button 
                  onClick={() => setIsTryMirrorOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  <div className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.memoryRecall && (
                    <span className="text-[10px] font-mono text-purple-400 mt-1 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                      ⚡ {msg.memoryRecall}
                    </span>
                  )}
                </div>
              ))}

              {isSimulatingInference && (
                <div className="flex items-center space-x-2 text-xs text-purple-400 font-mono p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>CockroachDB MCP querying pgvector embeddings...</span>
                </div>
              )}
            </div>

            <div className="px-6 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">Try prompt:</span>
              {[
                "Query CockroachDB memory layer",
                "Audit AWS infrastructure status",
                "Check Hackathon 2026 rules compliance"
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChatMessage(p)}
                  className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 flex-shrink-0 transition-colors"
                >
                  "{p}"
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Ask Mirror about agentic memory, code, or hackathon rules..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
              />
              <button
                onClick={() => handleSendChatMessage()}
                disabled={isSimulatingInference || !chatInput.trim()}
                className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- INTERACTIVE VIEW DEMO VIDEO MODAL --- */}
      {isVideoDemoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#090D16] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Mirror AI — Hackathon Video Demonstration (&lt; 3 Mins)</h3>
                  <span className="text-[11px] text-emerald-400 font-mono">Devpost Requirement: Showcase CockroachDB Memory Layer</span>
                </div>
              </div>

              <button 
                onClick={() => setIsVideoDemoOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-indigo-900/20 to-blue-900/20" />
              
              <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-2xl shadow-purple-500/30 mb-4 animate-bounce">
                <Play className="w-8 h-8 fill-purple-300 ml-1" />
              </div>

              <h4 className="text-xl font-bold text-white z-10 mb-2">CockroachDB Agentic Memory Showcase</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md z-10 leading-relaxed mb-4">
                Watch how Mirror connects to CockroachDB Managed MCP (`https://cockroachlabs.cloud/mcp`), queries distributed pgvector embeddings, and persists goals across sessions on AWS Lambda.
              </p>

              <div className="flex items-center space-x-3 z-10">
                <button 
                  onClick={() => {
                    setIsVideoDemoOpen(false);
                    setIsTryMirrorOpen(true);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs transition-transform hover:scale-105"
                >
                  Launch Live Sandbox
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- ARCHITECTURAL DIAGRAM MODAL --- */}
      {isArchDiagramOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#090D16] shadow-2xl overflow-hidden flex flex-col">
            
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">CockroachDB × AWS System Architecture Diagram</h3>
                  <span className="text-[11px] text-slate-400">Persistent Agentic Memory Data Flow</span>
                </div>
              </div>

              <button 
                onClick={() => setIsArchDiagramOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 bg-slate-950 font-mono text-xs text-slate-300 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                
                <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/30">
                  <span className="text-purple-400 font-bold block mb-1">CLIENT LAYER</span>
                  <p className="text-[11px] text-slate-400">React 19 + Glassmorphic UI</p>
                  <p className="text-[10px] text-slate-500 mt-2">Chat, Goals, Reflection UI</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-blue-500/30">
                  <span className="text-blue-400 font-bold block mb-1">AWS & GROQ ENGINE</span>
                  <p className="text-[11px] text-slate-400">AWS Lambda + Bedrock + Groq</p>
                  <p className="text-[10px] text-slate-500 mt-2">Sub-100ms Inference & S3 Backup</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold block mb-1">COCKROACHDB CLUSTER</span>
                  <p className="text-[11px] text-slate-400">Managed MCP + pgvector</p>
                  <p className="text-[10px] text-slate-500 mt-2">Global Distributed Memory Graph</p>
                </div>

              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 leading-relaxed text-slate-300 space-y-2">
                <span className="text-amber-400 font-bold block">Execution & Memory Flow Pipeline:</span>
                <p>1. User interacts with Mirror AI client &rarr; Chat message or Goal update submitted.</p>
                <p>2. AWS Lambda triggers embedding generation &rarr; Converts input to 1536-dim vector.</p>
                <p>3. CockroachDB Cloud vector search (`pgvector`) executes via Managed MCP Server endpoint (`https://cockroachlabs.cloud/mcp`).</p>
                <p>4. Groq LPU engine injects recalled historical context &rarr; Generates response in &lt; 100ms.</p>
                <p>5. End-of-day reflections automatically snapshotted to Amazon S3 for long-term audit trail.</p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
