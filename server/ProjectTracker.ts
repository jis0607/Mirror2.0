import { ProjectItem } from './types';

export class ProjectTracker {
  private activeProject: ProjectItem = {
    id: 'proj-mirror',
    name: 'Mirror AI Companion',
    subtitle: 'Persistent Agentic Memory Web Application',
    techStack: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Express.js',
      'CockroachDB pgvector'
    ],
    architectureSummary: 'Full-stack Express + Vite architecture with server-side AI Companion pipeline and CockroachDB vector memory engine.',
    activeTasks: [
      'Record new user details and preferences',
      'Store persistent memories in pgvector'
    ],
    completedTasks: [
      'Initialized clean memory session'
    ],
    lastModified: new Date().toISOString(),
    status: 'in_progress'
  };

  public getActiveProject(): ProjectItem {
    return this.activeProject;
  }

  public resetProject(): void {
    this.activeProject = {
      id: 'proj-new',
      name: 'New Chat Session',
      subtitle: 'Awaiting User Project Input',
      techStack: [],
      architectureSummary: 'Ready to record project architecture and details.',
      activeTasks: [
        'Awaiting user prompt'
      ],
      completedTasks: [],
      lastModified: new Date().toISOString(),
      status: 'in_progress'
    };
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
