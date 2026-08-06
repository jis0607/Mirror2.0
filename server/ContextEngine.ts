import { ContextPayload } from './types';
import { memoryEngineInstance } from './MemoryEngine';
import { goalTrackerInstance } from './GoalTracker';
import { projectTrackerInstance } from './ProjectTracker';
import { suggestionEngineInstance } from './SuggestionEngine';
import { emotionalEngineInstance } from './EmotionalEngine';

export class ContextEngine {
  private recentConversationHistory: string[] = [
    "User: Preparing submission for CockroachDB x AWS Hackathon.",
    "Mirror: Verified persistent vector memory schema on CockroachDB pgvector with AWS Lambda triggers."
  ];

  public assembleContext(userQuery: string): ContextPayload {
    // 1. Analyze and record any emotional cues from current query
    emotionalEngineInstance.analyzeAndRecordEmotionalCues(userQuery);

    // 2. Retrieve relevant memories using query relevance
    const relevantMemories = memoryEngineInstance.queryMemories(userQuery, 5);

    // 3. Retrieve active goals
    const activeGoals = goalTrackerInstance.getActiveGoals();

    // 4. Retrieve active project awareness
    const activeProject = projectTrackerInstance.getActiveProject();

    // 5. Retrieve user profile preferences
    const userProfile = memoryEngineInstance.getProfile();

    // 6. Retrieve emotional context payload
    const emotionalContext = emotionalEngineInstance.getEmotionalPayload();

    // 7. Recent conversation summary
    const recentConversationSummary = this.recentConversationHistory.join(" | ");

    // 8. Assemble full payload
    const partialPayload: ContextPayload = {
      userProfile,
      relevantMemories,
      activeGoals,
      activeProject,
      recentConversationSummary,
      emotionalContext,
      proactiveSuggestions: []
    };

    const proactiveSuggestions = suggestionEngineInstance.generateSuggestions(partialPayload);
    partialPayload.proactiveSuggestions = proactiveSuggestions;

    return partialPayload;
  }

  public appendConversationTurn(userText: string, aiText: string) {
    this.recentConversationHistory.push(`User: ${userText}`);
    this.recentConversationHistory.push(`Mirror: ${aiText}`);

    if (this.recentConversationHistory.length > 10) {
      this.recentConversationHistory = this.recentConversationHistory.slice(-10);
    }
  }

  public getHistorySummary(): string {
    return this.recentConversationHistory.join("\n");
  }

  public resetHistory(): void {
    this.recentConversationHistory = [];
  }
}

export const contextEngineInstance = new ContextEngine();
