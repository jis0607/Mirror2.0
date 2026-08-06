import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Pencil, 
  Check, 
  X, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search,
  Sparkles,
  Clock,
  ChevronRight
} from 'lucide-react';
import { ChatSession } from '../types';

interface ChatSidebarProps {
  sessions: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
  onRenameChat: (id: string, newTitle: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 2) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function getTimeGroup(timestamp: number): 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older' {
  const now = new Date();
  const date = new Date(timestamp);
  
  const isToday = now.toDateString() === date.toDateString();
  if (isToday) return 'Today';

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();
  if (isYesterday) return 'Yesterday';

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 7) return 'Previous 7 Days';

  return 'Older';
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sessions,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onRenameChat,
  isOpen,
  onToggleOpen
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartRename = (e: React.MouseEvent, session: ChatSession) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const handleSaveRename = (e: React.MouseEvent | React.FormEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (editTitle.trim()) {
      onRenameChat(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onDeleteChat(id);
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Group sessions
  const groups: Array<{ label: 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older'; items: ChatSession[] }> = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Previous 7 Days', items: [] },
    { label: 'Older', items: [] },
  ];

  filteredSessions.forEach(session => {
    const group = getTimeGroup(session.updatedAt);
    const targetGroup = groups.find(g => g.label === group);
    if (targetGroup) {
      targetGroup.items.push(session);
    }
  });

  if (!isOpen) {
    return (
      <div className="hidden md:flex flex-col items-center py-4 px-2 bg-[#060913] border-r border-slate-800/80 w-16 transition-all duration-300">
        <button
          onClick={onToggleOpen}
          title="Expand Chats Sidebar"
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors mb-4"
        >
          <PanelLeftOpen className="w-4 h-4 text-purple-400" />
        </button>

        <button
          onClick={onNewChat}
          title="New Chat"
          className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-colors mb-4"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="flex-1 w-full space-y-2 overflow-y-auto no-scrollbar flex flex-col items-center">
          {sessions.map(s => {
            const isActive = s.id === activeChatId;
            return (
              <button
                key={s.id}
                onClick={() => onSelectChat(s.id)}
                title={s.title}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-purple-600/30 border border-purple-500/50 text-purple-200 shadow-md shadow-purple-950/50' 
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <aside className="w-72 md:w-80 bg-[#060913] border-r border-slate-800/80 flex flex-col h-full transition-all duration-300 relative flex-shrink-0 z-20">
      
      {/* Sidebar Top Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Chats</h3>
            <span className="text-[10px] text-slate-500 font-mono flex items-center">
              <Sparkles className="w-2.5 h-2.5 text-purple-400 mr-1" />
              Local Storage Saved
            </span>
          </div>
        </div>

        <button
          onClick={onToggleOpen}
          title="Collapse Sidebar"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* New Chat Action Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-950/40 border border-purple-400/20 transition-all duration-200 hover:scale-[1.01]"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Filter / Search bar */}
      {sessions.length > 3 && (
        <div className="px-3 pb-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat history..."
              className="w-full bg-slate-900/80 border border-slate-800/80 rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-purple-500/60 placeholder-slate-500"
            />
          </div>
        </div>
      )}

      {/* Chat Session Cards List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 custom-scrollbar">
        {filteredSessions.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">No chat conversations yet</p>
            <p className="text-[11px] text-slate-600 max-w-[180px] mx-auto">
              Start a new chat to keep a local conversation log.
            </p>
          </div>
        ) : (
          groups.map(group => {
            if (group.items.length === 0) return null;
            return (
              <div key={group.label} className="space-y-1.5">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 flex items-center justify-between">
                  <span>{group.label}</span>
                  <span className="text-[9px] text-slate-600">({group.items.length})</span>
                </div>

                <div className="space-y-1">
                  {group.items.map(session => {
                    const isActive = session.id === activeChatId;
                    const isEditing = editingId === session.id;
                    const userMsgCount = session.messages.filter(m => m.sender === 'user').length;

                    return (
                      <div
                        key={session.id}
                        onClick={() => onSelectChat(session.id)}
                        className={`group relative rounded-xl p-2.5 cursor-pointer transition-all duration-200 border ${
                          isActive 
                            ? 'bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border-purple-500/50 shadow-md shadow-purple-950/30' 
                            : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800/60 hover:border-slate-700/80'
                        }`}
                      >
                        {isEditing ? (
                          <form onSubmit={(e) => handleSaveRename(e, session.id)} className="flex items-center space-x-1" onClick={e => e.stopPropagation()}>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              autoFocus
                              className="flex-1 bg-slate-950 border border-purple-500/60 rounded px-2 py-1 text-xs text-white focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="p-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelRename}
                              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center space-x-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-purple-400 animate-pulse' : 'bg-slate-600'}`} />
                                <h4 className={`text-xs font-medium truncate ${isActive ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-slate-100'}`}>
                                  {session.title || 'New Chat'}
                                </h4>
                              </div>

                              <div className="flex items-center space-x-2 mt-1 text-[10px] text-slate-500 font-mono">
                                <span className="flex items-center">
                                  <Clock className="w-2.5 h-2.5 mr-1" />
                                  {formatRelativeTime(session.updatedAt)}
                                </span>
                                <span>•</span>
                                <span>{userMsgCount} {userMsgCount === 1 ? 'msg' : 'msgs'}</span>
                              </div>
                            </div>

                            {/* Card Hover Actions */}
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => handleStartRename(e, session)}
                                title="Rename Chat"
                                className="p-1 rounded hover:bg-slate-700/80 text-slate-400 hover:text-purple-300 transition-colors"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, session.id)}
                                title="Delete Chat"
                                className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sidebar Footer Note */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 text-[10px] text-slate-500 font-mono flex items-center justify-between">
        <span className="flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
          Local Storage
        </span>
        <span className="text-slate-600">Separate from DB</span>
      </div>

    </aside>
  );
};
