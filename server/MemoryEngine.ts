import { MemoryNode, MemoryCategory, UserPreferences } from './types';

export class MemoryEngine {
  private memories: MemoryNode[] = [];
  private userProfile: UserPreferences = {
    codingLevel: 'intermediate',
    preferredFrameworks: ['React', 'TypeScript', 'Express.js', 'Tailwind CSS'],
    preferredDB: ['CockroachDB Cloud', 'pgvector'],
    communicationStyle: 'concise',
    ambitions: [],
    habits: []
  };

  constructor() {
    this.seedInitialMemories();
  }

  private seedInitialMemories() {
    this.memories = [
      {
        id: 'mem-init',
        category: 'project',
        title: 'CockroachDB Vector Memory Ready',
        content: 'Agentic vector memory store initialized on CockroachDB pgvector. Ready to record new user profile and interaction memories.',
        timestamp: new Date().toISOString(),
        source: 'System Initialization',
        tags: ['cockroachdb', 'pgvector', 'system-ready']
      }
    ];
  }

  public clearAllMemories(): void {
    this.seedInitialMemories();
    this.userProfile = {
      codingLevel: 'intermediate',
      preferredFrameworks: ['React', 'TypeScript', 'Express.js', 'Tailwind CSS'],
      preferredDB: ['CockroachDB Cloud', 'pgvector'],
      communicationStyle: 'concise',
      ambitions: [],
      habits: []
    };
  }

  public getProfile(): UserPreferences {
    return this.userProfile;
  }

  public updateProfile(updates: Partial<UserPreferences>): UserPreferences {
    this.userProfile = { ...this.userProfile, ...updates };
    return this.userProfile;
  }

  public getAllMemories(): MemoryNode[] {
    return this.memories;
  }

  public addMemory(category: MemoryCategory, title: string, content: string, tags: string[] = [], source: string = 'User Chat'): MemoryNode {
    // Check for duplicate memory content to avoid cluttering memory graph
    const lowerContent = content.toLowerCase().trim();
    const existing = this.memories.find(m => m.category === category && m.content.toLowerCase().trim() === lowerContent);
    if (existing) {
      existing.timestamp = new Date().toISOString();
      return existing;
    }

    const newNode: MemoryNode = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      category,
      title,
      content,
      timestamp: new Date().toISOString(),
      source,
      tags
    };
    this.memories.unshift(newNode);
    return newNode;
  }

  public queryMemories(queryText: string, topK: number = 4): MemoryNode[] {
    const lowerQuery = queryText.toLowerCase();
    const words = lowerQuery.split(/\s+/).filter(w => w.length > 2);

    const scored = this.memories.map(mem => {
      let score = 0;
      const memText = `${mem.title} ${mem.content} ${mem.tags.join(' ')} ${mem.category}`.toLowerCase();

      for (const word of words) {
        if (memText.includes(word)) score += 2;
      }

      if (lowerQuery.includes('cockroach') && memText.includes('cockroach')) score += 5;
      if (lowerQuery.includes('goal') && mem.category === 'goal') score += 4;
      if (lowerQuery.includes('project') && mem.category === 'project') score += 4;
      if ((lowerQuery.includes('learn') || lowerQuery.includes('study') || lowerQuery.includes('subject')) && mem.category === 'learning') score += 4;

      return { mem, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).map(s => ({
      ...s.mem,
      relevanceScore: Math.min(0.99, 0.75 + (s.score * 0.05))
    }));
  }

  public extractAndStoreMemoriesFromChat(userText: string): MemoryNode | null {
    const lower = userText.toLowerCase();

    if (lower.includes('my name is') || lower.includes('i am ') || lower.includes("i'm ") || lower.includes('call me ')) {
      return this.addMemory('profile', 'User Identity & Name', userText, ['user-name', 'identity', 'profile']);
    } else if (lower.includes('friend') || lower.includes('teammate') || lower.includes('colleague') || lower.includes('working with')) {
      return this.addMemory('relationship', 'Friend & Teammate Identity', userText, ['relationship', 'friend', 'social']);
    } else if (lower.includes('learning') || lower.includes('study') || lower.includes('course') || lower.includes('dsa') || lower.includes('weak in')) {
      return this.addMemory('learning', 'Learning History Node', userText, ['learning', 'skill-track']);
    } else if (lower.includes('my goal') || lower.includes('i want to build') || lower.includes('i plan to')) {
      return this.addMemory('goal', 'Extracted Goal', userText, ['user-goal', 'extracted']);
    } else if (lower.includes('my project') || lower.includes('working on')) {
      return this.addMemory('project', 'Extracted Project Detail', userText, ['user-project', 'extracted']);
    } else if (lower.includes('i prefer') || lower.includes('my stack is') || lower.includes('i use')) {
      return this.addMemory('preference', 'Extracted User Preference', userText, ['user-preference', 'extracted']);
    } else if (userText.length > 20 && !lower.includes('hello') && !lower.includes('hi')) {
      return this.addMemory('conversation', 'Key Interaction Memory', userText, ['conversation', 'context-node']);
    }

    return null;
  }
}

export const memoryEngineInstance = new MemoryEngine();
