import { useState, useEffect, useRef } from 'react';
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
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  Maximize2, 
  Clock, 
  Milestone, 
  User, 
  ExternalLink,
  Bot,
  Flame,
  CheckCircle2,
  Sparkle,
  Copy,
  RefreshCw,
  Search,
  BookOpen
} from 'lucide-react';

// --- DATA DEFINITIONS ---

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
    subtitle: 'Persistent Long-Term Context',
    description: 'Mirror remembers past conversations, coding habits, framework preferences, and personal goals across all sessions.',
    icon: Brain,
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    badge: 'Neural Graph v2.4',
    highlights: ['Zero context decay across sessions', 'Vector embeddings & graph relational memory', 'Privacy-first encrypted local store'],
    snippet: `// Mirror Memory Query Engine
const memory = await mirror.queryContext({
  userId: "jishnu_singh",
  relevance: "coding_style + active_goals",
  deepRecall: true
});
// Recall: Preferred React 19, Tailwind CSS v4, Express ESM`
  },
  {
    id: 'projects',
    title: 'Projects Workspace',
    subtitle: 'Autonomous Code Synchronization',
    description: 'Organize software engineering projects. Mirror maintains continuous awareness of project architecture and active tasks.',
    icon: FolderGit2,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    badge: 'Continuous Sync',
    highlights: ['Automatic repo structural mapping', 'Multi-file dependency tracing', 'Proactive bug detection & refactoring'],
    snippet: `// Project Auto-Context Active
[Sync] src/App.tsx modified (2 mins ago)
[Mirror] Detected redundant state variable in line 42.
[Action] Suggested memoization optimization.`
  },
  {
    id: 'goals',
    title: 'Goals Engine',
    subtitle: 'Strategic Milestone Progress',
    description: 'Track long-term technical and personal milestones with AI assistance that breaks big dreams into daily actionable tasks.',
    icon: Target,
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    badge: 'Autonomous Planner',
    highlights: ['Dynamic milestone decomposition', 'Daily velocity & streak tracking', 'Adaptive deadline alignment'],
    snippet: `🎯 Goal: Ship Mirror AI for Hackathon 2026
Progress: 92% Complete
Current Step: Refine Glassmorphism UI & Polish Animations
Next: Finalize Groq AI inference benchmarks`
  },
  {
    id: 'reflection',
    title: 'Daily Reflection',
    subtitle: 'Synthesized Productivity Insights',
    description: 'End your day with automated AI reflections that analyze key breakthroughs, coding output, and focus patterns.',
    icon: BookOpen,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'Insight Synthesizer',
    highlights: ['Automated end-of-day summary', 'Burnout prevention monitor', 'Knowledge retention prompts'],
    snippet: `✨ Reflection Log (Aug 4, 2026)
"You completed 14 git commits today focusing on React UI polish. 
Peak focus reached at 2:00 PM. High progress on Mirror AI landing page."`
  },
  {
    id: 'coding',
    title: 'Smart Coding',
    subtitle: 'Deep Syntax & System Debugging',
    description: 'Markdown support, syntax highlighting, line-by-line debugging, and architecture explanations tailored to your codebase.',
    icon: Code2,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    badge: 'Groq Powered',
    highlights: ['800+ tokens/sec inference speed', 'Multi-language AST analysis', 'Instant unit test generation'],
    snippet: `// Refactored async handler
export async function handleInference(prompt: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }]
  });
  return response.choices[0]?.message.content;
}`
  }
];

interface ComparisonRow {
  feature: string;
  chatgpt: boolean | string;
  claude: boolean | string;
  gemini: boolean | string;
  mirror: boolean | string;
  highlight?: boolean;
}

const comparisonData: ComparisonRow[] = [
  { feature: 'Long-Term Memory Across Sessions', chatgpt: 'Limited', claude: 'Session Only', gemini: 'Basic', mirror: true, highlight: true },
  { feature: 'Persistent Project Workspace Sync', chatgpt: false, claude: false, gemini: false, mirror: true, highlight: true },
  { feature: 'Long-Term Goal Tracking & Velocity', chatgpt: false, claude: false, gemini: false, mirror: true, highlight: true },
  { feature: 'Daily AI Reflection Synthesizer', chatgpt: false, claude: false, gemini: false, mirror: true, highlight: true },
  { feature: 'Deep Code Base Debugging &AST', chatgpt: 'Basic', claude: 'Good', gemini: 'Good', mirror: true, highlight: true },
  { feature: 'Autonomous Personal AI Companion', chatgpt: false, claude: false, gemini: false, mirror: true, highlight: true },
  { feature: 'Groq Ultra-Fast Inference (<100ms)', chatgpt: false, claude: false, gemini: false, mirror: true, highlight: true }
];

const screenshotsList = [
  {
    id: 'chat',
    title: 'Chat Interface',
    tag: 'Contextual AI Companion',
    description: 'Conversational UI integrated with real-time memory chips, code preview, and live thought streams.'
  },
  {
    id: 'memory',
    title: 'Memory Dashboard',
    tag: 'Knowledge Graph',
    description: 'Visual network graph of everything Mirror has learned about your projects, preferences, and personal goals.'
  },
  {
    id: 'projects',
    title: 'Projects Hub',
    tag: 'Code Synchronization',
    description: 'Multi-repository management dashboard with automated architectural diagnostics and task queues.'
  },
  {
    id: 'goals',
    title: 'Goals & Milestones',
    tag: 'Velocity & Streaks',
    description: 'Goal breakdown matrix with streak indicators, velocity charts, and daily progress benchmarks.'
  },
  {
    id: 'reflection',
    title: 'Reflection Timeline',
    tag: 'Journal & Insights',
    description: 'Chronological timeline of daily work logs, mood trends, and AI-synthesized focus recommendations.'
  }
];

const techStack = [
  { name: 'React 19', category: 'Frontend Engine', icon: Code2, color: 'from-cyan-500 to-blue-500', stat: '60 FPS Smooth UI' },
  { name: 'Node.js', category: 'Runtime Platform', icon: Cpu, color: 'from-emerald-500 to-green-600', stat: 'Non-blocking I/O' },
  { name: 'Express', category: 'REST API Layer', icon: Layers, color: 'from-slate-400 to-slate-600', stat: 'Microsecond Routing' },
  { name: 'CockroachDB', category: 'Distributed SQL', icon: Database, color: 'from-purple-500 to-violet-600', stat: '99.999% Availability' },
  { name: 'Groq AI', category: 'LPU Inference', icon: Zap, color: 'from-amber-400 to-orange-500', stat: '800 Tokens/Sec' },
  { name: 'Modern REST API', category: 'Communication Protocol', icon: Terminal, color: 'from-blue-500 to-indigo-600', stat: 'Encrypted Endpoints' }
];

const timelineSteps = [
  { phase: '01', title: 'Idea & Architecture', date: 'Q1 2025', status: 'Completed', description: 'Conceived the vision of a continuous personal AI companion with memory persistent graphs.' },
  { phase: '02', title: 'Development & Core Engine', date: 'Q2 2025', status: 'Completed', description: 'Built Node.js/Express backend with CockroachDB relational schemas and React client.' },
  { phase: '03', title: 'AI Integration & Groq LPU', date: 'Q3 2025', status: 'Completed', description: 'Integrated ultra-fast Groq LPU engine for sub-100ms conversational inference.' },
  { phase: '04', title: 'Memory Engine v2.0', date: 'Q4 2025', status: 'Completed', description: 'Developed vector embeddings and knowledge graph nodes for long-term user recall.' },
  { phase: '05', title: 'Hackathon 2026 Showcase', date: 'Aug 2026', status: 'Live Now', description: 'Launching Mirror AI at Hackathon 2026 with full suite of companion features.' },
  { phase: '06', title: 'Future Roadmap & Neural Sync', date: '2026+', status: 'Upcoming', description: 'Autonomous agent fleet, IDE plugins, local neural model quantization, and voice sync.' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('memory');
  const [activeScreenshot, setActiveScreenshot] = useState('chat');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Modals state
  const [isTryMirrorOpen, setIsTryMirrorOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  
  // Interactive Chat Sandbox state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'mirror'; text: string; memoryRecall?: string }>>([
    {
      sender: 'mirror',
      text: "Hello Jishnu! I remembered that you're working on the **Mirror AI Landing Page** for Hackathon 2026 using React and Tailwind CSS. How can I assist with your active goals today?",
      memoryRecall: 'Recalled: User = Jishnu Singh | Tech Stack = React, Express, CockroachDB, Groq AI | Goal = Win Hackathon 2026'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSimulatingInference, setIsSimulatingInference] = useState(false);

  // Mouse move handler for glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Send message in Try Mirror modal
  const handleSendChatMessage = (promptText?: string) => {
    const textToSend = promptText || chatInput;
    if (!textToSend.trim() || isSimulatingInference) return;

    const newMessages = [...chatMessages, { sender: 'user' as const, text: textToSend }];
    setChatMessages(newMessages);
    if (!promptText) setChatInput('');
    setIsSimulatingInference(true);

    setTimeout(() => {
      let responseText = "";
      let memoryNote = "";

      const lower = textToSend.toLowerCase();
      if (lower.includes('code') || lower.includes('bug') || lower.includes('react')) {
        responseText = "I've inspected your current React component tree. Based on your preference for clean TypeScript patterns, I recommend using Framer Motion or Tailwind transitions for smooth glass card hovering without re-renders.";
        memoryNote = "Recalled: Code Preference = Strict TypeScript, Tailwind v4, Component Modularization";
      } else if (lower.includes('goal') || lower.includes('hackathon')) {
        responseText = "Your main target is shipping the Mirror AI landing page. You are currently at 95% completion! Next recommended step: Review the Tech Stack badges and check the responsive layout.";
        memoryNote = "Recalled: Active Goal #1 = Hackathon 2026 Submission | Target Date = Aug 2026";
      } else if (lower.includes('memory') || lower.includes('remember')) {
        responseText = "I maintain a vector knowledge graph of your past sessions. I remember your tech stack (CockroachDB + Groq + Express), your full-stack developer background, and your preference for Apple & Linear aesthetics.";
        memoryNote = "Recalled: 1,420 Memory Nodes linked to Jishnu Singh profile";
      } else {
        responseText = `I hear you! I've updated my internal memory graph with this context: "${textToSend}". I will continuously keep this in mind during our future coding sessions.`;
        memoryNote = `Newly Indexed Node: "${textToSend.slice(0, 35)}..."`;
      }

      setChatMessages([...newMessages, { sender: 'mirror', text: responseText, memoryRecall: memoryNote }]);
      setIsSimulatingInference(false);
    }, 900);
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

      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-[1px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#090D16] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                MIRROR
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">Intelligent Companion</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#why-mirror" className="hover:text-white transition-colors">Why Mirror?</a>
            <a href="#screenshots" className="hover:text-white transition-colors">Product Showcase</a>
            <a href="#tech" className="hover:text-white transition-colors">Tech Stack</a>
            <a href="#timeline" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#team" className="hover:text-white transition-colors">Team</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsVideoDemoOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all duration-200"
            >
              <Play className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
              <span>View Demo</span>
            </button>
            <button 
              onClick={() => setIsTryMirrorOpen(true)}
              className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 group-hover:opacity-90 transition-opacity" />
              <div className="relative px-5 py-2.5 rounded-[11px] bg-[#0F172A] flex items-center space-x-2 text-white">
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:animate-spin" />
                <span>Try Mirror</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-8 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Built for Hackathon 2026</span>
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                <span className="text-slate-400">Next-Gen AI Companion</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400">Mirror</span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed mb-10 max-w-xl">
                The AI that remembers, understands and grows with you.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
                <button 
                  onClick={() => setIsTryMirrorOpen(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold text-base shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>Try Mirror</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => setIsVideoDemoOpen(true)}
                  className="px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-base hover:text-white transition-all duration-200 flex items-center justify-center space-x-3 group backdrop-blur-md"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-blue-400" />
                  </div>
                  <span>View Demo</span>
                </button>
              </div>

              {/* Quick Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Long-term Memory</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Project Workspace</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Sub-100ms Groq AI</span>
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
                      <span className="text-xs font-mono text-slate-400 ml-2">mirror-engine-v2.4.5</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        <Activity className="w-3 h-3 mr-1 text-purple-400 animate-pulse" />
                        800 tok/s
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                          <Brain className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">Active Neural Graph</h4>
                          <p className="text-xs text-slate-400">User Profile: Jishnu Singh</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-emerald-400 font-mono font-medium block">99.8% Recall</span>
                        <span className="text-[10px] text-slate-500">1,420 Memory Nodes</span>
                      </div>
                    </div>

                    {/* Live Memory Node Matrix */}
                    <div className="space-y-3">
                      <div className="text-xs font-medium text-slate-400 flex items-center justify-between">
                        <span>LATEST MEMORY RECALLS</span>
                        <span className="text-[10px] text-purple-400 font-mono">Real-time sync</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-colors flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0 animate-ping" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Active Project Memory</span>
                              <span className="text-[10px] text-slate-500">Just now</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"Working on Mirror AI landing page. Preferred tech stack: React 19, Tailwind CSS v4, CockroachDB."</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 transition-colors flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Long-term Goal Alignment</span>
                              <span className="text-[10px] text-slate-500">2h ago</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"Target: Complete Hackathon 2026 submission with dark glassmorphism and Apple/Linear design standards."</p>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">Daily Reflection Note</span>
                              <span className="text-[10px] text-slate-500">Yesterday</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">"High productivity streak detected. 14 commits in core engine microservices."</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800/80 font-mono text-xs text-slate-300">
                      <div className="flex items-center justify-between text-slate-500 text-[11px] mb-2 border-b border-slate-800/60 pb-1.5">
                        <span className="flex items-center"><Code2 className="w-3.5 h-3.5 mr-1 text-purple-400" /> mirror_inference.ts</span>
                        <span className="text-purple-400">Groq LLM Active</span>
                      </div>
                      <div className="text-purple-300">
                        <span className="text-blue-400">const</span> companion = <span className="text-blue-400">new</span> Mirror({'{'}
                        <div className="pl-4 text-slate-300">
                          memoryGraph: <span className="text-emerald-400">true</span>,<br />
                          contextDepth: <span className="text-amber-400">"infinite"</span>,<br />
                          learningRate: <span className="text-amber-400">"continuous"</span>
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
              Unlike generic chatbots, Mirror forms a continuous mental model of your work, codebases, daily reflections, and career aspirations.
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
              Generic LLM wrappers forget your context the moment you close the browser tab. Mirror stays continuously aligned with your long-term goals.
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
                      
                      {/* ChatGPT */}
                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.chatgpt === 'boolean' ? (
                          row.chatgpt ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.chatgpt}
                      </td>

                      {/* Claude */}
                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.claude === 'boolean' ? (
                          row.claude ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.claude}
                      </td>

                      {/* Gemini */}
                      <td className="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                        {typeof row.gemini === 'boolean' ? (
                          row.gemini ? <Check className="w-5 h-5 text-emerald-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                        ) : row.gemini}
                      </td>

                      {/* MIRROR AI Column (Highlighted) */}
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

            {/* Bottom Summary Callout */}
            <div className="p-6 bg-slate-900/40 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">All-in-One Autonomous Companion</h4>
                  <p className="text-xs text-slate-400">Combines Memory + Projects + Goals + Reflection + Coding into a unified cognitive model.</p>
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

      {/* --- SCREENSHOTS & INTERACTIVE PRODUCT SHOWCASE --- */}
      <section id="screenshots" className="py-24 relative border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">Product Interface</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Crafted with Apple & Linear precision.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              Explore the floating glass UI components engineered for zero-distraction productivity and deep focus.
            </p>
          </div>

          {/* Screenshot Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-10 no-scrollbar">
            {screenshotsList.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreenshot(screen.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex-shrink-0 ${
                  activeScreenshot === screen.id
                    ? 'bg-slate-800 text-white border border-purple-500/40 shadow-lg shadow-purple-500/10'
                    : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                }`}
              >
                {screen.title}
              </button>
            ))}
          </div>

          {/* Interactive Screen Container */}
          <div className="rounded-2xl border border-slate-800 bg-[#090D16] p-4 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Screen Content Switcher */}
            {activeScreenshot === 'chat' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-semibold text-white">Mirror Chat — Active Session</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Context: 12,400 Tokens</span>
                </div>

                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 max-w-2xl">
                    <span className="text-purple-400 font-semibold block mb-1">Jishnu Singh</span>
                    Can you help me refactor the database schema for CockroachDB to store daily reflection notes with vector embeddings?
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-slate-200 ml-auto max-w-2xl space-y-2">
                    <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                      <span className="text-purple-300 font-bold flex items-center">
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-purple-400" /> Mirror AI
                      </span>
                      <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                        Memory Recalled: CockroachDB PostgreSQL Dialect
                      </span>
                    </div>
                    <p>Certainly! Here is an optimized CockroachDB schema using PostgreSQL-compatible vector data types for fast vector similarity search:</p>
                    <pre className="p-3 rounded bg-slate-950 text-xs font-mono text-purple-200 overflow-x-auto">
{`CREATE TABLE daily_reflections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id STRING NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeScreenshot === 'memory' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h4 className="text-sm font-semibold text-white">Visual Knowledge Memory Graph</h4>
                  <span className="text-xs text-purple-400 font-mono">1,420 Active Links</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-2">Tech Stack Node</span>
                    <h5 className="text-base font-bold text-white mb-1">React 19 & Express</h5>
                    <p className="text-xs text-slate-400">Prefers TypeScript, Tailwind CSS v4, ES2022 syntax, and zero unneeded third-party libraries.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block mb-2">Design Node</span>
                    <h5 className="text-base font-bold text-white mb-1">Apple & Linear Theme</h5>
                    <p className="text-xs text-slate-400">Favors subtle glassmorphic blurs, dark background palette (#020617), and generous negative space.</p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">Career Goal Node</span>
                    <h5 className="text-base font-bold text-white mb-1">Hackathon 2026 Winner</h5>
                    <p className="text-xs text-slate-400">Building Mirror AI companion as a high-impact prototype with Groq LPU speed.</p>
                  </div>
                </div>
              </div>
            )}

            {activeScreenshot === 'projects' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-sm font-semibold text-white">Projects Workspace Sync</span>
                  <span className="text-xs text-emerald-400 font-mono">4 Repositories Connected</span>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FolderGit2 className="w-5 h-5 text-purple-400" />
                      <div>
                        <h5 className="text-sm font-bold text-white">mirror-ai-landing-page</h5>
                        <p className="text-xs text-slate-400">React 19 • Express • Vite • CockroachDB</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Synced</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FolderGit2 className="w-5 h-5 text-blue-400" />
                      <div>
                        <h5 className="text-sm font-bold text-white">mirror-groq-inference-api</h5>
                        <p className="text-xs text-slate-400">Node.js • Groq SDK • REST Endpoints</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Synced</span>
                  </div>
                </div>
              </div>
            )}

            {activeScreenshot === 'goals' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-sm font-semibold text-white">Goals & Velocity Tracker</span>
                  <span className="text-xs text-purple-400 font-mono">Streak: 18 Days</span>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-200 font-semibold">Hackathon 2026 Submission Readiness</span>
                    <span className="text-purple-400 font-mono font-bold">95%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full w-[95%]" />
                  </div>
                  <p className="text-xs text-slate-400">Key milestone remaining: Final presentation review & deployment link check.</p>
                </div>
              </div>
            )}

            {activeScreenshot === 'reflection' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-sm font-semibold text-white">Daily Reflection Synthesizer</span>
                  <span className="text-xs text-slate-400 font-mono">Aug 4, 2026</span>
                </div>

                <div className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs sm:text-sm text-slate-300 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-300 font-bold">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>AI Reflection Summary</span>
                  </div>
                  <p className="leading-relaxed">
                    "Today you spent 6.5 hours coding with intense focus. You built 8 React UI sections for Mirror AI, integrated Groq API patterns, and maintained zero syntax errors. Excellent momentum!"
                  </p>
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
              Engineered for extreme reliability, sub-100ms inference times, and resilient cloud persistence.
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
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Project Evolution</h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Hackathon 2026 Roadmap.
            </h3>
            <p className="text-slate-400 text-base sm:text-lg">
              From conceptual memory models to a production-ready personal AI companion.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-indigo-500 to-slate-800 -translate-x-1/2" />

            <div className="space-y-12">
              {timelineSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    {/* Content Box */}
                    <div className="w-full lg:w-1/2 px-0 lg:px-8">
                      <div className="rounded-2xl border border-slate-800 bg-[#090D16]/90 p-6 hover:border-purple-500/40 transition-all duration-300 shadow-xl backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                            PHASE {step.phase}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            step.status === 'Live Now' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse' 
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {step.status}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">{step.description}</p>
                        <span className="text-[11px] font-mono text-slate-500">{step.date}</span>
                      </div>
                    </div>

                    {/* Timeline Node Badge */}
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
              Engineered with passion for Hackathon 2026.
            </p>
          </div>

          {/* Founder Profile Card */}
          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-[#090D16] p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 text-center sm:text-left">
              
              {/* Profile Avatar Emblem */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 p-[2px] shadow-xl shadow-purple-500/20 flex-shrink-0">
                <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center text-white">
                  <User className="w-10 h-10 text-purple-400" />
                </div>
              </div>

              {/* Founder Bio */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">Jishnu Singh</h4>
                  <p className="text-sm font-medium text-purple-400">Founder & Lead Software Architect</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Full Stack Developer, AI Engineer, Backend, Frontend, and UI/UX Designer. Passionate about building intelligent human-AI interfaces, vector knowledge graphs, and high-performance web applications.
                </p>

                {/* Role Badges */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  {['Full Stack Developer', 'AI Engineer', 'Backend', 'Frontend', 'UI/UX'].map((role, idx) => (
                    <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                      {role}
                    </span>
                  ))}
                </div>

                {/* Social Quick Links */}
                <div className="flex items-center justify-center sm:justify-start space-x-4 pt-4 border-t border-slate-800">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a 
                    href="mailto:jishnusingh0607@gmail.com" 
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors flex items-center space-x-2 text-xs font-medium"
                  >
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
            
            {/* Left Brand Col */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-white tracking-tight">MIRROR AI</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The AI companion that remembers, understands, and grows with you. Designed for engineers, creators, and lifelong learners.
              </p>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                <span>Built for Hackathon 2026</span>
              </div>
            </div>

            {/* Right Links Col */}
            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Product</span>
                <a href="#features" className="block hover:text-white transition-colors">Features</a>
                <a href="#why-mirror" className="block hover:text-white transition-colors">Why Mirror</a>
                <a href="#screenshots" className="block hover:text-white transition-colors">Showcase</a>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Technology</span>
                <a href="#tech" className="block hover:text-white transition-colors">Tech Stack</a>
                <a href="#timeline" className="block hover:text-white transition-colors">Roadmap</a>
                <a href="#team" className="block hover:text-white transition-colors">Team</a>
              </div>

              <div className="space-y-3">
                <span className="font-semibold text-slate-200 uppercase tracking-wider block">Connect</span>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:jishnusingh0607@gmail.com" className="flex items-center space-x-1.5 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <span>© 2026 Mirror AI. Developed by Jishnu Singh for Hackathon 2026.</span>
            <span>All Rights Reserved.</span>
          </div>

        </div>
      </footer>

      {/* --- INTERACTIVE TRY MIRROR MODAL --- */}
      {isTryMirrorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#090D16] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Mirror AI Live Sandbox</h3>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping" />
                    Memory Context Active
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsTryMirrorOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Conversation Body */}
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
                  <span>Groq LLM indexing memory graph...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-6 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">Try prompt:</span>
              {[
                "How does Mirror remember me?",
                "What is my Hackathon 2026 goal?",
                "Debug my React state"
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

            {/* Chat Input Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Ask Mirror anything..."
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
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Mirror AI Product Tour Walkthrough</h3>
                  <span className="text-[11px] text-slate-400">Duration: 2 mins • Hackathon Showcase</span>
                </div>
              </div>

              <button 
                onClick={() => setIsVideoDemoOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-8 text-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-indigo-900/20 to-blue-900/20" />
              
              <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-2xl shadow-purple-500/30 mb-4 animate-bounce">
                <Play className="w-8 h-8 fill-purple-300 ml-1" />
              </div>

              <h4 className="text-xl font-bold text-white z-10 mb-2">Mirror AI — Interactive Demo Walkthrough</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md z-10">
                Experience the real-time Memory Engine, Groq inference benchmarking, continuous project sync, and daily reflection features.
              </p>

              <div className="mt-6 flex items-center space-x-3 z-10">
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

    </div>
  );
}


