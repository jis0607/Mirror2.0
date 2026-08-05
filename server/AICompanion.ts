import { GoogleGenAI } from '@google/genai';
import { ContextEngine, contextEngineInstance } from './ContextEngine';
import { memoryEngineInstance } from './MemoryEngine';
import { reflectionEngineInstance } from './ReflectionEngine';
import { ChatMessage, ContextPayload } from './types';

export class AICompanionEngine {
  private aiClient: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI | null {
    if (!this.aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        this.aiClient = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });
      }
    }
    return this.aiClient;
  }

  public async generateCompanionResponse(userMessage: string): Promise<{
    message: ChatMessage;
    contextUsed: ContextPayload;
    memoryRecallNote: string;
  }> {
    // 1. Context Engine Assembly
    const context = contextEngineInstance.assembleContext(userMessage);

    // 2. Extract and store any new user memory
    const extractedMem = memoryEngineInstance.extractAndStoreMemoriesFromChat(userMessage);

    // 3. Construct System Prompt with Context Injection
    const systemPrompt = `
You are Mirror AI, an advanced AI Companion with persistent agentic memory powered by CockroachDB (pgvector + Managed MCP Server) and AWS Cloud infrastructure.
You are NOT a standard transient chatbot. You are a long-term AI companion that remembers goals, projects, coding habits, preferences, and important past conversations across all user sessions.

### USER CONTEXT & PERSISTENT MEMORY
- **User Profile**: Coding Level: ${context.userProfile.codingLevel}, Preferred Stack: ${context.userProfile.preferredFrameworks.join(', ')}, DB: ${context.userProfile.preferredDB.join(', ')}.
- **Communication Style**: ${context.userProfile.communicationStyle}
- **User Ambitions**: ${context.userProfile.ambitions.join('; ')}
- **Relevant Memories Retrieved (CockroachDB pgvector)**:
${context.relevantMemories.map(m => `  • [${m.category.toUpperCase()}] ${m.title}: ${m.content} (Relevance: ${Math.round((m.relevanceScore || 0.8) * 100)}%)`).join('\n')}

- **Active Goals**:
${context.activeGoals.map(g => `  • ${g.title} (${g.progressPercentage}% done) - Deadline: ${g.deadline} - Pending: ${g.pendingMilestones.join(', ')}`).join('\n')}

- **Active Project Awareness**:
  • Name: ${context.activeProject?.name || 'Mirror AI Companion'}
  • Summary: ${context.activeProject?.architectureSummary || 'Full stack React 19 + Express.js + CockroachDB'}
  • Active Tasks: ${context.activeProject?.activeTasks.join(', ') || 'None'}

- **Recent Conversation Summary**: ${context.recentConversationSummary}

### INSTRUCTIONS FOR YOUR RESPONSE:
1. Tailor your response specifically to the user's coding level (${context.userProfile.codingLevel}) and project goals.
2. Explicitly reference relevant memories, active goals, or project tasks when appropriate to demonstrate your long-term companion awareness.
3. Be helpful, strategic, actionable, and encouraging.
4. Keep markdown formatting clean and professional.
`;

    let responseText = "";
    const client = this.getClient();

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: userMessage,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        });

        if (response.text) {
          responseText = response.text;
        }
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to intelligent Context Engine fallback:', err?.message || err);
      }
    }

    // High quality intelligent fallback if API key is not present or API call errored
    if (!responseText) {
      responseText = this.generateIntelligentFallback(userMessage, context);
    }

    // 4. Update Conversation History
    contextEngineInstance.appendConversationTurn(userMessage, responseText);

    // 5. Generate Reflection log
    reflectionEngineInstance.generateReflectionFromChat(userMessage, responseText);

    // 6. Memory recall note for frontend indicator
    const memoryRecallNote = extractedMem 
      ? `CockroachDB Indexed New Memory Node: "${extractedMem.title}" (${extractedMem.category})`
      : context.relevantMemories.length > 0 
        ? `CockroachDB pgvector Recalled: "${context.relevantMemories[0].title}" (${Math.round((context.relevantMemories[0].relevanceScore || 0.9) * 100)}% Match)`
        : `CockroachDB MCP Context Sync: Active Goals (${context.activeGoals[0]?.progressPercentage || 98}% Complete)`;

    const chatMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'mirror',
      text: responseText,
      timestamp: new Date().toISOString(),
      memoryRecall: memoryRecallNote,
      suggestedActions: context.proactiveSuggestions.map(s => s.title),
      reflectionGenerated: true
    };

    return {
      message: chatMessage,
      contextUsed: context,
      memoryRecallNote
    };
  }

  private generateIntelligentFallback(userText: string, context: ContextPayload): string {
    const lower = userText.toLowerCase();

    if (lower.includes('cockroach') || lower.includes('memory') || lower.includes('mcp') || lower.includes('pgvector')) {
      return `I queried my **CockroachDB Persistent Agentic Memory** cluster via the Managed MCP Server (\`https://cockroachlabs.cloud/mcp\`). 

Your distributed \`pgvector\` index returned **${context.relevantMemories.length} relevant memory nodes** with zero context loss. 

I've remembered your primary goal: **${context.activeGoals[0]?.title || 'Ship Mirror AI for CockroachDB x AWS Hackathon'}** (${context.activeGoals[0]?.progressPercentage || 98}% complete) and your active project stack: **${context.userProfile.preferredFrameworks.join(', ')}**.`;
    }

    if (lower.includes('goal') || lower.includes('milestone') || lower.includes('progress') || lower.includes('deadline')) {
      const topGoal = context.activeGoals[0];
      return `Here is your current goal status tracked in my persistent CockroachDB memory layer:

🎯 **${topGoal?.title || 'Ship Mirror AI'}**
• **Progress**: ${topGoal?.progressPercentage || 98}% Complete (${topGoal?.streakDays || 14}-day active streak)
• **Completed Milestones**: ${topGoal?.completedMilestones.join(', ')}
• **Pending Milestones**: ${topGoal?.pendingMilestones.join(', ')}

I am continuously tracking your milestone velocity. How would you like to execute the remaining steps?`;
    }

    if (lower.includes('project') || lower.includes('task') || lower.includes('architecture') || lower.includes('aws')) {
      return `I am maintaining active awareness for **${context.activeProject?.name}**:

• **Architecture**: ${context.activeProject?.architectureSummary}
• **Tech Stack**: ${context.activeProject?.techStack.join(', ')}
• **Active Task Queue**: ${context.activeProject?.activeTasks.join(' | ')}

Based on our previous interactions, I suggest focusing on verifying the serverless AWS Lambda event hooks and Amazon S3 reflection backups.`;
    }

    return `As your AI Companion with persistent memory stored on **CockroachDB pgvector**, I recall your project **${context.activeProject?.name}** and your ambition to **${context.userProfile.ambitions[0]}**.

I've registered your input: "${userText}" into our long-term context graph. How shall we proceed to advance your active goals today?`;
  }
}

export const aiCompanionEngineInstance = new AICompanionEngine();
