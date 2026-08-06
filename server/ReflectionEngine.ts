import { ReflectionLog } from './types';

export class ReflectionEngine {
  private reflections: ReflectionLog[] = [
    {
      id: 'refl-1',
      date: new Date().toISOString().split('T')[0],
      breakthroughs: [
        'Integrated CockroachDB pgvector long-term agentic memory engine with Context Engine pre-fetching.',
        'Refactored Express.js REST API routes following SOLID principles and modular file separation.',
        'Verified Devpost hackathon rulebook guidelines for 100% submission compliance.'
      ],
      summary: 'High output day with 18 git commits focused on backend AI Companion intelligence and CockroachDB MCP integration.',
      focusScore: 96,
      commitCount: 18,
      suggestedAction: 'Prepare < 3-minute video showcase highlighting CockroachDB persistent memory state and AWS Lambda execution.',
      timestamp: new Date().toISOString()
    }
  ];

  public getReflections(): ReflectionLog[] {
    return this.reflections;
  }

  public resetReflections(): void {
    this.reflections = [];
  }

  public generateReflectionFromChat(userText: string, aiText: string): ReflectionLog {
    const today = new Date().toISOString().split('T')[0];
    const newLog: ReflectionLog = {
      id: `refl-${Date.now()}`,
      date: today,
      breakthroughs: [
        `Discussed: ${userText.slice(0, 70)}...`,
        `Synthesized solution with CockroachDB persistent context and AWS serverless backing.`
      ],
      summary: `Automated reflection generated at ${new Date().toLocaleTimeString()}. The conversation deepened project knowledge on ${userText.slice(0, 40)}...`,
      focusScore: Math.floor(Math.random() * 8) + 92,
      commitCount: Math.floor(Math.random() * 5) + 12,
      suggestedAction: 'Review active goals in Goal Engine to verify milestone alignment.',
      timestamp: new Date().toISOString()
    };

    this.reflections.unshift(newLog);
    return newLog;
  }
}

export const reflectionEngineInstance = new ReflectionEngine();
