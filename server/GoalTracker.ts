import { GoalItem } from './types';

export class GoalTracker {
  private goals: GoalItem[] = [
    {
      id: 'goal-1',
      title: 'Build AI Companion Application',
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

  public getActiveGoals(): GoalItem[] {
    return this.goals.filter(g => g.status === 'active');
  }

  public getAllGoals(): GoalItem[] {
    return this.goals;
  }

  public resetGoals(): void {
    this.goals = [];
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
