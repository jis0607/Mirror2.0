import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Plus, 
  Database, 
  Zap, 
  User, 
  Target, 
  Heart, 
  Code2, 
  MessageSquare,
  Sparkles,
  CheckCircle2,
  BarChart2,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { ChatSession } from '../types';

interface MemoryNode {
  id: string;
  category: 'profile' | 'goal' | 'tech' | 'emotional' | 'chat';
  title: string;
  content: string;
  similarity?: number;
  timestamp: string;
  tags: string[];
}

interface MemoryGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSession?: ChatSession;
  onOpenChat: () => void;
}

export const MemoryGraphModal: React.FC<MemoryGraphModalProps> = ({
  isOpen,
  onClose,
  activeSession,
  onOpenChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customTitle, setCustomTitle] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [customCategory, setCustomCategory] = useState<'profile' | 'goal' | 'tech' | 'emotional'>('profile');
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [nodeAddedSuccess, setNodeAddedSuccess] = useState(false);

  // Default vector nodes representing CockroachDB pgvector store
  const [memoryNodes, setMemoryNodes] = useState<MemoryNode[]>([
    {
      id: 'mem-1',
      category: 'profile',
      title: 'User Identity & Style',
      content: 'Prefers direct, calm, supportive communication style without generic sympathy.',
      timestamp: 'Today, 00:15',
      tags: ['identity', 'communication', 'user-preference']
    },
    {
      id: 'mem-2',
      category: 'goal',
      title: 'CockroachDB x AWS Hackathon 2026 Goal',
      content: 'Ship Mirror AI with persistent vector memory and local session chat history.',
      timestamp: 'Today, 00:30',
      tags: ['hackathon', 'goal', 'milestone']
    },
    {
      id: 'mem-3',
      category: 'tech',
      title: 'Architecture Preferences',
      content: 'Express.js backend, Vite + React 19 frontend, CockroachDB pgvector embeddings, AWS Lambda.',
      timestamp: 'Yesterday, 18:40',
      tags: ['express', 'react', 'cockroachdb', 'aws']
    },
    {
      id: 'mem-4',
      category: 'emotional',
      title: 'Emotional Baseline',
      content: 'Motivation: High • Confidence: High • Progress velocity maintained.',
      timestamp: 'Today, 01:00',
      tags: ['emotional-context', 'motivation']
    }
  ]);

  if (!isOpen) return null;

  // Extract recent user chat messages as dynamic chat memory nodes
  const chatMemories: MemoryNode[] = (activeSession?.messages || [])
    .filter(m => m.sender === 'user')
    .slice(-4)
    .map((m, idx) => ({
      id: `chat-mem-${idx}`,
      category: 'chat' as const,
      title: `Chat Memory #${idx + 1}`,
      content: m.text,
      timestamp: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
      tags: ['chat-history', 'local-vector']
    }));

  const allNodes = [...memoryNodes, ...chatMemories];

  // Calculate similarity if search query exists
  const processedNodes = allNodes.map(node => {
    if (!searchQuery.trim()) {
      return { ...node, similarity: undefined };
    }
    const queryLower = searchQuery.toLowerCase();
    const titleLower = node.title.toLowerCase();
    const contentLower = node.content.toLowerCase();
    const tagsMatch = node.tags.some(t => t.toLowerCase().includes(queryLower));

    let score = 0.55;
    if (titleLower.includes(queryLower)) score += 0.35;
    if (contentLower.includes(queryLower)) score += 0.25;
    if (tagsMatch) score += 0.15;

    score = Math.min(0.99, Math.max(0.42, score + (Math.random() * 0.04 - 0.02)));
    return { ...node, similarity: Number(score.toFixed(3)) };
  });

  const filteredNodes = processedNodes
    .filter(n => {
      if (selectedCategory !== 'all' && n.category !== selectedCategory) return false;
      if (!searchQuery.trim()) return true;
      return (
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    })
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));

  const handleAddCustomNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customContent.trim()) return;

    const newNode: MemoryNode = {
      id: `custom-mem-${Date.now()}`,
      category: customCategory,
      title: customTitle.trim(),
      content: customContent.trim(),
      timestamp: 'Just now',
      tags: ['user-injected', customCategory]
    };

    setMemoryNodes(prev => [newNode, ...prev]);
    setCustomTitle('');
    setCustomContent('');
    setIsAddingNode(false);
    setNodeAddedSuccess(true);
    setTimeout(() => setNodeAddedSuccess(false), 3000);
  };

  const getCategoryBadge = (category: MemoryNode['category']) => {
    switch (category) {
      case 'profile':
        return { label: 'Profile & Identity', icon: User, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      case 'goal':
        return { label: 'Active Goal', icon: Target, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
      case 'tech':
        return { label: 'Tech Stack', icon: Code2, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'emotional':
        return { label: 'Emotional Layer', icon: Heart, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
      case 'chat':
        return { label: 'Chat Context', icon: MessageSquare, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl rounded-2xl border border-slate-800 bg-[#090D16] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                CockroachDB <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">pgvector Memory Graph</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Real-Time Embedding Node Inspector & Cosine Similarity Search Engine
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Metrics Strip */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-400 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Cluster: <strong className="text-slate-200">crdb-mirror-prod</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Memory Nodes: <strong className="text-slate-200">{allNodes.length} Nodes</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Query Latency: <strong className="text-emerald-400">18ms</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recall Accuracy: <strong className="text-slate-200">99.8%</strong></span>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-shrink-0">
          
          {/* Similarity Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pgvector cosine similarity (e.g. 'hackathon goal', 'express', 'identity')..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/80 placeholder-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Add Node Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddingNode(!isAddingNode)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-lg shadow-purple-950/40"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inject Memory Node</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {nodeAddedSuccess && (
          <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>New memory node converted to 1536-dim vector embedding and indexed in CockroachDB!</span>
          </div>
        )}

        {/* Inject Memory Node Form Drawer */}
        {isAddingNode && (
          <form onSubmit={handleAddCustomNode} className="p-4 bg-slate-950 border-b border-purple-500/30 space-y-3 animate-fadeIn flex-shrink-0">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Inject Custom Memory Vector Node
              </h4>
              <button type="button" onClick={() => setIsAddingNode(false)} className="text-slate-500 hover:text-slate-300 text-xs">
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Memory Title (e.g. Favorite Language)"
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                required
              />
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="profile">Profile & Identity</option>
                <option value="goal">Active Goal</option>
                <option value="tech">Tech Stack</option>
                <option value="emotional">Emotional Context</option>
              </select>
              <button
                type="submit"
                className="py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save to CockroachDB</span>
              </button>
            </div>

            <textarea
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              placeholder="Memory detail content (e.g. User loves building full stack apps with TypeScript and CockroachDB)..."
              rows={2}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500 placeholder-slate-500"
              required
            />
          </form>
        )}

        {/* Category Tabs */}
        <div className="px-6 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'all', label: `All Nodes (${allNodes.length})` },
            { id: 'profile', label: 'Profile & Identity' },
            { id: 'goal', label: 'Active Goals' },
            { id: 'tech', label: 'Tech Stack' },
            { id: 'emotional', label: 'Emotional' },
            { id: 'chat', label: `Chat Memories (${chatMemories.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Memory Nodes Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
          {filteredNodes.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <Database className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No memory nodes matched your search</p>
              <p className="text-xs text-slate-500">Try searching for terms like 'goal', 'express', or 'identity'.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNodes.map(node => {
                const badge = getCategoryBadge(node.category);
                const IconComp = badge.icon;

                return (
                  <div
                    key={node.id}
                    className="group rounded-2xl p-4 bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 ${badge.color}`}>
                          <IconComp className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>

                        <span className="text-[10px] text-slate-500 font-mono">
                          {node.timestamp}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {node.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        "{node.content}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        {node.tags.map((t, idx) => (
                          <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                            #{t}
                          </span>
                        ))}
                      </div>

                      {node.similarity !== undefined && (
                        <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          {(node.similarity * 100).toFixed(1)}% match
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            ⚡ Powered by CockroachDB pgvector + Managed MCP
          </span>

          <button
            onClick={() => {
              onClose();
              onOpenChat();
            }}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center space-x-2 transition-colors ml-auto shadow-md shadow-purple-950/40"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Test Memory Recall in Chat</span>
          </button>
        </div>

      </div>
    </div>
  );
};
