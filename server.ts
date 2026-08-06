import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

import { aiCompanionEngineInstance } from './server/AICompanion';
import { memoryEngineInstance } from './server/MemoryEngine';
import { goalTrackerInstance } from './server/GoalTracker';
import { projectTrackerInstance } from './server/ProjectTracker';
import { reflectionEngineInstance } from './server/ReflectionEngine';
import { contextEngineInstance } from './server/ContextEngine';
import { suggestionEngineInstance } from './server/SuggestionEngine';
import { emotionalEngineInstance } from './server/EmotionalEngine';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Mirror AI Companion Engine',
      database: 'CockroachDB pgvector Cloud Connected',
      mcpServerEndpoint: 'https://cockroachlabs.cloud/mcp',
      timestamp: new Date().toISOString()
    });
  });

  // 1. Core AI Companion Chat Route (Context Engine + Memory Recall + Reflection)
  app.post('/api/companion/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message content is required.' });
        return;
      }

      const result = await aiCompanionEngineInstance.generateCompanionResponse(message);
      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/companion/chat:', err);
      res.status(500).json({ error: 'Failed to process AI Companion chat.', details: err?.message || String(err) });
    }
  });

  // 2. Long-Term Memory Management Endpoints
  app.get('/api/companion/memories', (req, res) => {
    const q = req.query.q as string;
    if (q) {
      res.json({ memories: memoryEngineInstance.queryMemories(q), profile: memoryEngineInstance.getProfile() });
    } else {
      res.json({ memories: memoryEngineInstance.getAllMemories(), profile: memoryEngineInstance.getProfile() });
    }
  });

  app.delete('/api/companion/memories', (req, res) => {
    memoryEngineInstance.clearAllMemories();
    res.json({ success: true, message: 'All memory nodes cleared.' });
  });

  app.post('/api/companion/reset', (req, res) => {
    memoryEngineInstance.clearAllMemories();
    goalTrackerInstance.resetGoals();
    projectTrackerInstance.resetProject();
    emotionalEngineInstance.resetEmotions();
    reflectionEngineInstance.resetReflections();
    contextEngineInstance.resetHistory();

    res.json({
      success: true,
      message: 'All memory nodes, context, user profile, goals, and conversation history have been completely reset.',
      initialGreeting: "Hello! I am Mirror AI, your long-term AI companion powered by CockroachDB pgvector. I don't have any saved memories about you yet—what is your name or what project are you working on today?"
    });
  });

  app.post('/api/companion/memories', (req, res) => {
    const { category, title, content, tags, source } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required.' });
      return;
    }
    const mem = memoryEngineInstance.addMemory(category || 'conversation', title, content, tags || [], source || 'User');
    res.json({ success: true, memory: mem });
  });

  // 3. Emotional Context Endpoint
  app.get('/api/companion/emotions', (req, res) => {
    res.json({ emotionalContext: emotionalEngineInstance.getEmotionalPayload() });
  });

  // 4. Goal Tracking Endpoints
  app.get('/api/companion/goals', (req, res) => {
    res.json({ goals: goalTrackerInstance.getAllGoals() });
  });

  app.post('/api/companion/goals', (req, res) => {
    const { action, id, progressPercentage, completedMilestones, pendingMilestones, goalData } = req.body;
    if (action === 'update' && id) {
      const updated = goalTrackerInstance.updateGoalProgress(id, progressPercentage, completedMilestones, pendingMilestones);
      res.json({ success: true, goal: updated });
    } else if (goalData) {
      const created = goalTrackerInstance.addGoal(goalData);
      res.json({ success: true, goal: created });
    } else {
      res.status(400).json({ error: 'Invalid goal action or payload.' });
    }
  });

  // 4. Project Awareness Endpoints
  app.get('/api/companion/projects', (req, res) => {
    res.json({ project: projectTrackerInstance.getActiveProject() });
  });

  app.post('/api/companion/projects', (req, res) => {
    const { action, taskName, updates } = req.body;
    if (action === 'add_task' && taskName) {
      const proj = projectTrackerInstance.addTask(taskName);
      res.json({ success: true, project: proj });
    } else if (action === 'complete_task' && taskName) {
      const proj = projectTrackerInstance.markTaskComplete(taskName);
      res.json({ success: true, project: proj });
    } else if (updates) {
      const proj = projectTrackerInstance.updateActiveProject(updates);
      res.json({ success: true, project: proj });
    } else {
      res.status(400).json({ error: 'Invalid project update command.' });
    }
  });

  // 5. Reflection Engine Endpoints
  app.get('/api/companion/reflections', (req, res) => {
    res.json({ reflections: reflectionEngineInstance.getReflections() });
  });

  // 6. Context Payload Preview Endpoint
  app.get('/api/companion/context', (req, res) => {
    const query = (req.query.q as string) || 'hackathon goals and project state';
    const context = contextEngineInstance.assembleContext(query);
    res.json({ context });
  });

  // 7. Proactive Suggestions Endpoint
  app.get('/api/companion/suggestions', (req, res) => {
    const context = contextEngineInstance.assembleContext('proactive recommendations');
    const suggestions = suggestionEngineInstance.generateSuggestions(context);
    res.json({ suggestions });
  });

  // Vite or Static Assets handling
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mirror AI Companion Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
