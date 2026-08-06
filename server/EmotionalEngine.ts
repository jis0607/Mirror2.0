import { EmotionalContextNode, EmotionalContextPayload } from './types';
import { memoryEngineInstance } from './MemoryEngine';

export class EmotionalEngine {
  private currentMotivation: 'high' | 'neutral' | 'low' = 'high';
  private currentStress: 'calm' | 'elevated' | 'high' = 'calm';
  private confidenceLevel: 'confident' | 'balanced' | 'uncertain' = 'confident';
  private recentEmotions: EmotionalContextNode[] = [
    {
      id: 'emo-init-1',
      category: 'emotion',
      title: 'Hackathon Focus & Drive',
      reason: 'CockroachDB x AWS Hackathon project submission build phase',
      emotionType: 'excitement',
      intensity: 'high',
      timestamp: new Date().toISOString(),
      confidence: 'High'
    }
  ];
  private recentAchievements: string[] = [
    'Completed CockroachDB pgvector schema & Express backend integration',
    'Configured AWS Lambda & Amazon S3 reflection archiving pipelines'
  ];
  private recentSetbacks: string[] = [];

  public analyzeAndRecordEmotionalCues(userText: string): EmotionalContextNode | null {
    const lower = userText.toLowerCase();
    let detectedNode: EmotionalContextNode | null = null;

    // 1. Frustration / Debugging stress
    if (lower.includes('bug is killing me') || lower.includes('stuck on') || lower.includes('frustrated') || lower.includes('not working') || lower.includes('drives me crazy')) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'Technical Debugging Frustration',
        reason: 'Challenging code error or unexpected bug',
        emotionType: 'frustration',
        intensity: 'moderate',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentStress = 'elevated';
    } 
    // 2. Burnout / Fatigue / Giving up
    else if (lower.includes('feel like giving up') || lower.includes('exhausted') || lower.includes('burnout') || lower.includes('too tired') || lower.includes("can't do this")) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'Fatigue & Burnout Signal',
        reason: 'Prolonged coding stretch or cognitive overload',
        emotionType: 'burnout',
        intensity: 'high',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentMotivation = 'low';
      this.currentStress = 'high';
      this.confidenceLevel = 'uncertain';
    }
    // 3. Rejection / Failure / Setback
    else if (lower.includes('rejected') || lower.includes('failed') || lower.includes('didn\'t make it') || lower.includes('got rejected') || lower.includes('failed my interview')) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'External Setback',
        reason: 'Interview, submission, or exam setback',
        emotionType: 'setback',
        intensity: 'high',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentMotivation = 'neutral';
      this.confidenceLevel = 'uncertain';
      this.recentSetbacks.unshift(`Setback: "${userText.slice(0, 60)}..."`);
      if (this.recentSetbacks.length > 5) this.recentSetbacks.pop();
    }
    // 4. Achievement / Accomplishment
    else if (lower.includes('finally finished') || lower.includes('proud of') || lower.includes('got it working') || lower.includes('deployed') || lower.includes('i passed') || lower.includes('completed')) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'Milestone Achievement',
        reason: 'Successful feature completion or milestone reached',
        emotionType: 'achievement',
        intensity: 'high',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentMotivation = 'high';
      this.currentStress = 'calm';
      this.confidenceLevel = 'confident';
      this.recentAchievements.unshift(`Accomplished: "${userText.slice(0, 60)}..."`);
      if (this.recentAchievements.length > 5) this.recentAchievements.pop();
    }
    // 5. Excitement / Pride
    else if (lower.includes('excited') || lower.includes('pumped') || lower.includes("can't wait") || lower.includes('proud')) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'High Motivation & Pride',
        reason: 'Positive momentum in development or personal progress',
        emotionType: 'excitement',
        intensity: 'high',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentMotivation = 'high';
      this.confidenceLevel = 'confident';
    }
    // 6. Pre-event anxiety / Stress
    else if (lower.includes('nervous') || lower.includes('stressed') || lower.includes('deadline is coming') || lower.includes('interview tomorrow') || lower.includes('exam')) {
      detectedNode = {
        id: `emo-${Date.now()}`,
        category: 'emotion',
        title: 'Pre-Event Stress',
        reason: 'Upcoming presentation, deadline, or evaluation',
        emotionType: 'stress',
        intensity: 'moderate',
        timestamp: new Date().toISOString(),
        confidence: 'High'
      };
      this.currentStress = 'elevated';
    }

    if (detectedNode) {
      this.recentEmotions.unshift(detectedNode);
      if (this.recentEmotions.length > 10) this.recentEmotions.pop();

      // Mirror persistently registers emotional context into CockroachDB Memory Engine
      memoryEngineInstance.addMemory(
        'emotion',
        detectedNode.title,
        `Emotional Context: ${detectedNode.reason}. User statement: "${userText}"`,
        ['emotional-context', detectedNode.emotionType],
        'Conversational Emotion Layer'
      );
    }

    return detectedNode;
  }

  public getEmotionalPayload(): EmotionalContextPayload {
    return {
      currentMotivation: this.currentMotivation,
      currentStress: this.currentStress,
      confidenceLevel: this.confidenceLevel,
      recentEmotions: this.recentEmotions,
      recentAchievements: this.recentAchievements,
      recentSetbacks: this.recentSetbacks
    };
  }

  public resetEmotions(): void {
    this.currentMotivation = 'high';
    this.currentStress = 'calm';
    this.confidenceLevel = 'confident';
    this.recentEmotions = [];
    this.recentAchievements = [];
    this.recentSetbacks = [];
  }

  public addAchievement(achievement: string) {
    this.recentAchievements.unshift(achievement);
    if (this.recentAchievements.length > 5) this.recentAchievements.pop();
    this.currentMotivation = 'high';
  }
}

export const emotionalEngineInstance = new EmotionalEngine();
