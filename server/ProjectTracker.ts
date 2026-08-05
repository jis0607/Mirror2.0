import { ProjectItem } from './types';

export class ProjectTracker {
  private activeProject: ProjectItem = {
    id: 'proj-mirror',
    name: 'Mirror AI Companion',
    subtitle: 'Persistent Agentic Memory Web Application',
    techStack: [
      'React 19',
      'Vite',
      'Tailwind CSS v4',
      'Express.js',
      'CockroachDB pgvector',
      'Managed MCP Server',
      'AWS Lambda',
      'Groq LPU API / Gemini 3.6 Flash'
    ],
    architectureSummary: 'Full-stack Express + Vite architecture with server-side AI Companion pipeline, CockroachDB vector memory engine, AWS Lambda event handlers, and real-time Context Engine.',
    activeTasks: [
      'Finalize backend AI Companion Context Engine REST API',
      'Verify persistent memory recall across user chat sessions',
      'Verify Devpost hackathon rule compliance and documentation'
    ],
    completedTasks: [
      'Implemented clean, high-contrast glassmorphism UI layout',
      'Added CockroachDB Managed MCP Server connection',
      'Configured AWS Lambda and Amazon S3 reflection backup routes',
      'Integrated @google/genai TypeScript SDK server-side'
    ],
    lastModified: new Date().toISOString(),
    status: 'in_progress'
  };

  public getActiveProject(): ProjectItem {
    return this.activeProject;
  }

  public updateActiveProject(updates: Partial<ProjectItem>): ProjectItem {
    this.activeProject = {
      ...this.activeProject,
      ...updates,
      lastModified: new Date().toISOString()
    };
    return this.activeProject;
  }

  public addTask(taskName: string): ProjectItem {
    this.activeProject.activeTasks.push(taskName);
    this.activeProject.lastModified = new Date().toISOString();
    return this.activeProject;
  }

  public markTaskComplete(taskName: string): ProjectItem {
    this.activeProject.activeTasks = this.activeProject.activeTasks.filter(t => t !== taskName);
    if (!this.activeProject.completedTasks.includes(taskName)) {
      this.activeProject.completedTasks.push(taskName);
    }
    this.activeProject.lastModified = new Date().toISOString();
    return this.activeProject;
  }
}

export const projectTrackerInstance = new ProjectTracker();
