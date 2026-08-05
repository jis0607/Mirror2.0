export type MemoryCategory = 'profile' | 'goal' | 'project' | 'learning' | 'preference' | 'habit' | 'conversation' | 'reflection' | 'emotion' | 'relationship';

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

export interface EmotionalContextNode {
  id: string;
  category: 'emotion';
  title: string;
  reason: string;
  emotionType: 'motivation' | 'stress' | 'confidence' | 'excitement' | 'frustration' | 'burnout' | 'achievement' | 'setback';
  intensity: 'low' | 'moderate' | 'high';
  timestamp: string;
  confidence: 'Medium' | 'High';
}

export interface EmotionalContextPayload {
  currentMotivation: 'high' | 'neutral' | 'low';
  currentStress: 'calm' | 'elevated' | 'high';
  confidenceLevel: 'confident' | 'balanced' | 'uncertain';
  recentEmotions: EmotionalContextNode[];
  recentAchievements: string[];
  recentSetbacks: string[];
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
  emotionalContext: EmotionalContextPayload;
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
