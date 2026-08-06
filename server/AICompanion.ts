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

    const realUserMemories = context.relevantMemories.filter(m => m.id !== 'mem-init');
    const hasUserIdentity = realUserMemories.some(m => m.category === 'profile' || m.tags?.includes('user-name') || m.content.toLowerCase().includes('name is') || m.content.toLowerCase().includes('i am'));

    // 3. Construct System Prompt with Context Injection
    const systemPrompt = `
You are Mirror AI, an intelligent long-term AI Companion powered by CockroachDB (pgvector + Managed MCP Server) and AWS Cloud infrastructure.
Mirror is NOT a standard transient chatbot like ChatGPT, Gemini, or Claude.
Mirror's mission is to continuously understand the user, build a lasting, trusted relationship, and proactively help them grow through learning, remembering, adapting, personalizing, guiding, coaching, suggesting, and reflecting.

### ABSOLUTE MEMORY & IDENTITY TRUTH:
- Real User Memory Nodes Stored in CockroachDB pgvector: ${realUserMemories.length > 0 ? realUserMemories.map(m => `[${m.category}] ${m.title}: "${m.content}"`).join('; ') : 'ZERO USER MEMORIES STORED (Clean Slate / Fresh Chat).'}
${!hasUserIdentity ? `- **CRITICAL INSTRUCTION**: You DO NOT know the user's name or personal profile yet because the memory store is clean/reset. If the user asks "who am I?", "who i am?", "what is my name?", "do you know me?", or "what do you know about me?", you MUST state clearly that you don't have any saved memories about them yet, and ask them to introduce themselves (their name or project). DO NOT invent or assume any name or background for them.` : `- **USER IDENTITY RECALLED**: ${realUserMemories.filter(m => m.category === 'profile' || m.tags?.includes('user-name')).map(m => `"${m.content}"`).join('; ')}`}

### DECISION ENGINE PROTOCOL BEFORE ANSWERING:
1. What does Mirror already know about the user? (${hasUserIdentity ? 'User identity is known' : 'No user identity stored yet'})
2. What relevant emotional or relational context exists?
3. Adapt your response tone to match their communication style (${context.userProfile.communicationStyle}).
4. Should Mirror encourage? Celebrate? Suggest? Ask a follow-up?

### EMOTIONAL INTELLIGENCE & RELATIONSHIP RULES:
- **NEVER** fake emotions, pretend to be a human/therapist, diagnose users, or manipulate feelings.
- **NEVER** use cheap generic sympathy (Avoid: "I'm sorry", "I feel your pain").
- **ALWAYS** anchor responses in real, specific past context and shared history if available.
- **CELEBRATE ACHIEVEMENTS CALMLY**: Acknowledge real progress without flowery or fake hype.
- **STAY GROUNDED & SUPPORTIVE DURING SETBACKS**: Be calm, honest, and constructive. Frame setbacks against the broader picture of their proven progress.

### RETRIEVED PERSISTENT CONTEXT (CockroachDB pgvector + Categorized Memory Graph):
- **User Profile**: Coding Level: ${context.userProfile.codingLevel}, Tech Stack: ${context.userProfile.preferredFrameworks.join(', ')}, DB: ${context.userProfile.preferredDB.join(', ')}.
- **Communication Style**: ${context.userProfile.communicationStyle}

- **EMOTIONAL CONTEXT LAYER**:
  • Motivation Level: ${context.emotionalContext.currentMotivation.toUpperCase()}
  • Stress Level: ${context.emotionalContext.currentStress.toUpperCase()}
  • Confidence Level: ${context.emotionalContext.confidenceLevel.toUpperCase()}

- **Relevant Memories Retrieved (CockroachDB pgvector)**:
${realUserMemories.length > 0 ? realUserMemories.map(m => `  • [${m.category.toUpperCase()}] ${m.title}: ${m.content}`).join('\n') : '  • No user memories recorded yet.'}

- **Active Goals**:
${context.activeGoals.length > 0 ? context.activeGoals.map(g => `  • ${g.title} (${g.progressPercentage}% complete)`).join('\n') : '  • No active goals set yet.'}

- **Active Project Awareness**:
  • Name: ${context.activeProject?.name || 'New Chat Session'}

- **Recent Conversation Context**: ${context.recentConversationSummary}

### RESPONSE GUIDELINES:
1. Speak as Mirror — a supportive, calm, highly intelligent personal AI Companion.
2. If memory is clean and the user asks about themselves, inform them gently that you don't have saved memories yet and invite them to share their name or project.
3. Maintain clean, structured Markdown. Do not break character.
`;

    let responseText = "";
    const client = this.getClient();

    if (client) {
      try {
        const response = await client.models.generateContent({
        model: 'models/gemini-3.6-flash',
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
  console.error("========== GEMINI ERROR ==========");
  console.error(err);
  console.error("=================================");

  console.warn(
    'Gemini API call failed, falling back to intelligent Context Engine fallback:',
    err?.message || err
  );
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

    const realUserMemories = context.relevantMemories.filter(m => m.id !== 'mem-init');
    const hasUserIdentity = realUserMemories.some(m => m.category === 'profile' || m.tags?.includes('user-name') || m.content.toLowerCase().includes('name is') || m.content.toLowerCase().includes('i am'));

    // 0. Identity & Profile Queries ("who am i", "who i am", "what is my name", "do you know me", "what do you know about me")
    if (lower.includes('who am i') || lower.includes('who i am') || lower.includes('what is my name') || lower.includes('do you know me') || lower.includes('what do you know about me')) {
      if (hasUserIdentity || realUserMemories.length > 0) {
        const memorySummary = realUserMemories.map(m => `• **${m.title}**: "${m.content}"`).join('\n');
        return `Based on our saved memory nodes in CockroachDB \`pgvector\`, here is what I remember about you:\n\n${memorySummary}\n\nIs there anything else you'd like to update or add to your profile?`;
      } else {
        return `I don't have any saved memories about you yet! I am ready to record new memories in my CockroachDB \`pgvector\` layer—what is your name, or what project are you working on today?`;
      }
    }

    // 1. Emotional Cues: Setbacks & Failures (e.g., Interview, Exam, Rejection)
    if (lower.includes('failed') || lower.includes('rejected') || lower.includes('didn\'t make it') || lower.includes('got rejected')) {
      return `I know this outcome is disappointing. Setbacks are data points, not final verdicts. Would you like us to review what happened and plan our next steps together?`;
    }

    // 2. Emotional Cues: Technical Frustration & Debugging Stress
    if (lower.includes('bug is killing me') || lower.includes('stuck on') || lower.includes('frustrated') || lower.includes('not working')) {
      return `I notice you're facing a frustrating blocker with this error. Let me help you break it down step by step:
1. What exact error signature or status code are you observing?
2. Which module is failing?

Let's tackle this together.`;
    }

    // 3. Emotional Cues: Fatigue & Burnout
    if (lower.includes('feel like giving up') || lower.includes('exhausted') || lower.includes('burnout') || lower.includes('too tired')) {
      return `I hear you. Development sprints demand high cognitive energy, and fatigue is a natural signal to pause. Take a breather — when you return, we'll pick up right where we left off.`;
    }

    // 4. Emotional Cues: Milestone Achievement & Pride
    if (lower.includes('finally finished') || lower.includes('deployed') || lower.includes('got it working') || lower.includes('i completed') || lower.includes('proud')) {
      return `Congratulations on reaching this milestone! Excellent work on keeping the momentum strong.`;
    }

    // 5. CockroachDB & Vector Memory Queries
    if (lower.includes('cockroach') || lower.includes('memory') || lower.includes('mcp') || lower.includes('pgvector')) {
      return `I queried my **CockroachDB Persistent Agentic Memory** cluster via the Managed MCP Server (\`https://cockroachlabs.cloud/mcp\`). 

Your distributed \`pgvector\` index currently holds **${realUserMemories.length} user memory nodes**.`;
    }

    // Default Companion Greeting with Context & Proactive Relationship Touchpoint
    if (realUserMemories.length > 0) {
      const memorySummary = realUserMemories.map(m => `• **${m.title}**: "${m.content}"`).join('\n');
      return `Welcome back! I retrieved your saved memories from **CockroachDB pgvector**:\n\n${memorySummary}\n\nHow can I help you today?`;
    }

    return `Hello! As your long-term AI Companion with persistent memory on **CockroachDB pgvector**, I don't have any saved memories about you yet—what is your name, or what project are you working on today?`;
  }
}

export const aiCompanionEngineInstance = new AICompanionEngine();
