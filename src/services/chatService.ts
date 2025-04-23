import { ref, type Ref } from 'vue';
import { sendPrompt, mockSendPrompt, type PromptRequest, type ApiError } from './apiService';
import type { Message } from '../types/chat';

// init chat history
const messages: Ref<Message[]> = ref([
  { role: 'assistant', content: 'Hello! How can I help you today?' }
]);

const isProcessing: Ref<boolean> = ref(false);

const useMockApi = true;

export async function sendMessage(userMessage: string): Promise<void> {
  if (!userMessage.trim() || isProcessing.value) {
    return;
  }
  
  messages.value.push({ role: 'user', content: userMessage });
  
  isProcessing.value = true;
  
  try {
    const promptData: PromptRequest = {
      prompt: userMessage
    };
    
    const response = useMockApi 
      ? await mockSendPrompt(promptData)
      : await sendPrompt(promptData);
    
    messages.value.push({ 
      role: 'assistant', 
      content: response.content, 
      animating: true 
    });
  } catch (error) {
    console.error('Error getting response:', error);
    
    const apiError = error as ApiError;
    const errorMessage = apiError.message || 'Sorry, I encountered an error processing your request. Please try again.';
    
    messages.value.push({ 
      role: 'assistant', 
      content: errorMessage, 
      animating: true 
    });
  }
}

/**
 * mark a message as no longer animating
 */

export function completeAnimation(messageIndex: number): void {
  if (messageIndex < messages.value.length && messages.value[messageIndex].role === 'assistant') {
    messages.value[messageIndex].animating = false;
    isProcessing.value = false;
  }
}

/**
 * clear the chat history
 */
export function clearChat(): void {
  messages.value = [
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ];
}

/**
 * get the chat messages
 * @returns Ref to the messages array
 */
export function useMessages(): Ref<Message[]> {
  return messages;
}

/**
 * get the processing state
 * @returns Ref to the processing state
 */
export function useProcessingState(): Ref<boolean> {
  return isProcessing;
}
