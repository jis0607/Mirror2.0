import { ProactiveSuggestion, ContextPayload } from './types';

export class SuggestionEngine {
  public generateSuggestions(context: ContextPayload): ProactiveSuggestion[] {
    const suggestions: ProactiveSuggestion[] = [];

    // Check project tasks
    if (context.activeProject && context.activeProject.activeTasks.length > 0) {
      suggestions.push({
        id: 'sug-proj-1',
        type: 'architecture',
        title: 'CockroachDB MCP Endpoint Verification',
        description: `Your active task "${context.activeProject.activeTasks[0]}" can be accelerated using Managed MCP Server endpoint logging.`,
        actionableStep: 'Execute `ccloud cluster inspect` or test `https://cockroachlabs.cloud/mcp` read queries.',
        confidence: 0.95
      });
    }

    // Check goal deadlines
    if (context.activeGoals.length > 0) {
      const primaryGoal = context.activeGoals[0];
      suggestions.push({
        id: 'sug-goal-1',
        type: 'goal_alignment',
        title: `Milestone Sprint: ${primaryGoal.title}`,
        description: `Current progress is at ${primaryGoal.progressPercentage}%. Next pending milestone: ${primaryGoal.pendingMilestones[0] || 'Final submission'}.`,
        actionableStep: `Focus on completing "${primaryGoal.pendingMilestones[0] || 'Final review'}" today to maintain your ${primaryGoal.streakDays}-day streak.`,
        confidence: 0.98
      });
    }

    // Check coding level / preferences
    suggestions.push({
      id: 'sug-code-1',
      type: 'code_quality',
      title: 'Sub-100ms Inference Pipeline Optimization',
      description: 'Your user profile prefers high-velocity response times. Combining Groq LPU with CockroachDB vector pre-fetching ensures ultra-low latency.',
      actionableStep: 'Keep API payload light and use modular TypeScript interfaces.',
      confidence: 0.92
    });

    return suggestions;
  }
}

export const suggestionEngineInstance = new SuggestionEngine();
