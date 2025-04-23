export interface Message {
  role: 'user' | 'assistant';
  content: string;
  animating?: boolean;
}
