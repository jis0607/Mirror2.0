import { MemoryNode, MemoryCategory, UserPreferences } from './types';

export class MemoryEngine {
  private memories: MemoryNode[] = [];
  private userProfile: UserPreferences = {
    codingLevel: 'lead',
    preferredFrameworks: ['React 19', 'Tailwind CSS v4', 'Express.js', 'Node.js', 'TypeScript'],
    preferredDB: ['CockroachDB Cloud', 'pgvector', 'Managed MCP Server'],
    communicationStyle: 'concise',
    ambitions: ['Build production-grade AI Companion apps with persistent agentic memory', 'Win CockroachDB x AWS Hackathon 2026'],
    habits: ['Daily git commit streak', 'Clean ESM architecture', 'ACID-compliant state management']
  };

  constructor() {
    this.seedInitialMemories();
  }

  private seedInitialMemories() {
    this.memories = [
      {
        id: 'mem-1',
        category: 'project',
        title: 'Project Mirror AI Architecture',
        content: 'Building Mirror AI as an AI Companion with CockroachDB pgvector vector store, Express server, and AWS Lambda serverless execution.',
        timestamp: new Date().toISOString(),
        source: 'System Initialization',
        tags: ['cockroachdb', 'pgvector', 'aws-lambda', 'mirror-ai']
      },
      {
        id: 'mem-2',
        category: 'goal',
        title: 'Submit CockroachDB x AWS Hackathon Entry',
        content: 'Deadline: August 18, 2026. Required tools: CockroachDB Managed MCP Server, pgvector, AWS Lambda, Amazon S3. Public GitHub repo & demo video required.',
        timestamp: new Date().toISOString(),
        source: 'Hackathon Rulebook',
        tags: ['hackathon', 'deadline', 'devpost', 'cockroachdb']
      },
      {
        id: 'mem-3',
        category: 'preference',
        title: 'Technical Preference & Stack',
        content: 'Prefers TypeScript, React 19, Tailwind CSS v4, Express.js backend, sub-100ms LPU response time, and modular SOLID architecture.',
        timestamp: new Date().toISOString(),
        source: 'User Profile',
        tags: ['preferences', 'typescript', 'react', 'tailwind']
      },
      {
        id: 'mem-4',
        category: 'habit',
        title: 'Developer Work Pattern',
        content: 'Focuses on deep work sessions around 2:00 PM, maintains continuous git commit streaks, prefers clean code over monolithic files.',
        timestamp: new Date().toISOString(),
        source: 'Behavioral Observation',
        tags: ['habits', 'productivity', 'deep-work']
      },
      {
        id: 'mem-5',
        category: 'conversation',
        title: 'Agentic Memory Discussion',
        content: 'Discussed why agentic memory requires distributed multi-region databases like CockroachDB to prevent context loss during autonomous agent execution.',
        timestamp: new Date().toISOString(),
        source: 'Recent Session',
        tags: ['agentic-memory', 'distributed-db', 'mcp']
      }
    ];
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

    if (lower.includes('learning') || lower.includes('study') || lower.includes('course') || lower.includes('dsa') || lower.includes('weak in')) {
      return this.addMemory('learning', 'Learning History Node', userText, ['learning', 'skill-track']);
    } else if (lower.includes('my goal') || lower.includes('i want to build') || lower.includes('i plan to')) {
      return this.addMemory('goal', 'Extracted Goal', userText, ['user-goal', 'extracted']);
    } else if (lower.includes('my project') || lower.includes('working on')) {
      return this.addMemory('project', 'Extracted Project Detail', userText, ['user-project', 'extracted']);
    } else if (lower.includes('i prefer') || lower.includes('my stack is') || lower.includes('i use')) {
      return this.addMemory('preference', 'Extracted User Preference', userText, ['user-preference', 'extracted']);
    } else if (userText.length > 30 && !lower.includes('hello') && !lower.includes('hi')) {
      return this.addMemory('conversation', 'Key Interaction Memory', userText, ['conversation', 'context-node']);
    }

    return null;
  }
}

export const memoryEngineInstance = new MemoryEngine();
