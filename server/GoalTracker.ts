import { GoalItem } from './types';

export class GoalTracker {
  private goals: GoalItem[] = [
    {
      id: 'goal-1',
      title: 'Ship Mirror AI for CockroachDB × AWS Hackathon',
      description: 'Build persistent agentic memory companion app using CockroachDB pgvector, Managed MCP Server endpoint, and AWS serverless infrastructure.',
      deadline: '2026-08-18T17:00:00-05:00',
      progressPercentage: 98,
      completedMilestones: [
        'Provision CockroachDB Cloud cluster with pgvector',
        'Configure Managed MCP Server connection endpoint',
        'Implement Express.js backend REST API with Context Engine',
        'Deploy AWS Lambda background event hooks & Amazon S3 storage',
        'Integrate full-stack AI Companion response pipeline'
      ],
      pendingMilestones: [
        'Record < 3 min Devpost video demonstration',
        'Submit public GitHub repository with open source license'
      ],
      streakDays: 14,
      status: 'active',
      createdAt: '2026-06-30T10:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'goal-2',
      title: 'Master Sub-100ms LLM Streaming & Context Retrieval',
      description: 'Optimize AI Companion context assembly speed, vector similarity ranking, and streaming token delivery for instant responsiveness.',
      deadline: '2026-08-30T23:59:59Z',
      progressPercentage: 90,
      completedMilestones: [
        'Benchmark Groq LPU inference latency (<100ms)',
        'Implement in-memory vector cache & pgvector query pre-fetching',
        'Modularize Context Engine according to SOLID principles'
      ],
      pendingMilestones: [
        'Add automated regression latency telemetry'
      ],
      streakDays: 8,
      status: 'active',
      createdAt: '2026-07-15T12:00:00Z',
      updatedAt: new Date().toISOString()
    }
  ];

  public getActiveGoals(): GoalItem[] {
    return this.goals.filter(g => g.status === 'active');
  }

  public getAllGoals(): GoalItem[] {
    return this.goals;
  }

  public resetGoals(): void {
    this.goals = [
      {
        id: 'goal-1',
        title: 'Ship AI Companion Application',
        description: 'Build persistent agentic memory companion app using CockroachDB pgvector, Managed MCP Server endpoint, and AWS serverless infrastructure.',
        deadline: '2026-08-18T17:00:00-05:00',
        progressPercentage: 50,
        completedMilestones: [
          'Provision CockroachDB Cloud cluster with pgvector',
          'Configure Managed MCP Server connection endpoint'
        ],
        pendingMilestones: [
          'Record video demonstration',
          'Submit public project repository'
        ],
        streakDays: 1,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  public addGoal(goal: Omit<GoalItem, 'id' | 'createdAt' | 'updatedAt'>): GoalItem {
    const newGoal: GoalItem = {
      ...goal,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.goals.unshift(newGoal);
    return newGoal;
  }

  public updateGoalProgress(id: string, progressPercentage: number, completedMilestones?: string[], pendingMilestones?: string[]): GoalItem | null {
    const goal = this.goals.find(g => g.id === id);
    if (!goal) return null;

    goal.progressPercentage = Math.min(100, Math.max(0, progressPercentage));
    if (completedMilestones) goal.completedMilestones = completedMilestones;
    if (pendingMilestones) goal.pendingMilestones = pendingMilestones;
    if (goal.progressPercentage === 100) goal.status = 'completed';
    goal.updatedAt = new Date().toISOString();

    return goal;
  }
}

export const goalTrackerInstance = new GoalTracker();
