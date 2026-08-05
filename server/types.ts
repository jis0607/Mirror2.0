export type MemoryCategory = 'goal' | 'project' | 'preference' | 'habit' | 'conversation';

export interface MemoryNode {
  id: string;
  category: MemoryCategory;
  title: string;
  content: string;
  embedding?: number[];
  relevanceScore?: number;
  timestamp: string;
  source: string;
  tags: string[];
}

export interface UserPreferences {
  codingLevel: 'beginner' | 'intermediate' | 'advanced' | 'lead';
  preferredFrameworks: string[];
  preferredDB: string[];
  communicationStyle: 'concise' | 'detailed' | 'socratic' | 'encouraging';
  ambitions: string[];
  habits: string[];
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  progressPercentage: number;
  completedMilestones: string[];
  pendingMilestones: string[];
  streakDays: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle: string;
  techStack: string[];
  architectureSummary: string;
  activeTasks: string[];
  completedTasks: string[];
  lastModified: string;
  status: 'in_progress' | 'deployed' | 'planning';
}

export interface ReflectionLog {
  id: string;
  date: string;
  breakthroughs: string[];
  summary: string;
  focusScore: number;
  commitCount: number;
  suggestedAction: string;
  timestamp: string;
}

export interface ProactiveSuggestion {
  id: string;
  type: 'architecture' | 'productivity' | 'goal_alignment' | 'code_quality';
  title: string;
  description: string;
  actionableStep: string;
  confidence: number;
}

export interface ContextPayload {
  userProfile: UserPreferences;
  relevantMemories: MemoryNode[];
  activeGoals: GoalItem[];
  activeProject: ProjectItem | null;
  recentConversationSummary: string;
  proactiveSuggestions: ProactiveSuggestion[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mirror';
  text: string;
  timestamp: string;
  memoryRecall?: string;
  suggestedActions?: string[];
  reflectionGenerated?: boolean;
}
