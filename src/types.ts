export interface ChatMessage {
  sender: 'user' | 'mirror';
  text: string;
  memoryRecall?: string;
  timestamp?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}
