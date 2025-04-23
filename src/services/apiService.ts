import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_URL, DEFAULT_TIMEOUT, ENDPOINTS, HTTP_STATUS } from './apiConfig';

export interface PromptResponse {
  content: string;
}

export interface PromptRequest {
  prompt: string;
}

export interface ApiError {
  status: number;
  message: string;
  data?: any;
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    //add auth tokens here if needed
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status || 0,
      message: error.message || 'Unknown error occurred',
      data: error.response?.data,
    };
    return Promise.reject(apiError);
  }
);

export async function sendPrompt(
  promptData: PromptRequest, 
  config?: AxiosRequestConfig
): Promise<PromptResponse> {
  try {
    const response: AxiosResponse = await apiClient.post(
      ENDPOINTS.PROMPT, 
      promptData,
      config
    );
    
    if (response.status === HTTP_STATUS.OK) {
      return response.data;
    } else {
      throw {
        status: response.status,
        message: `API responded with status: ${response.status}`,
        data: response.data,
      };
    }
  } catch (error) {
    console.error('Error sending prompt:', error);
    throw error;
  }
}

export async function mockSendPrompt(promptData: PromptRequest): Promise<PromptResponse> {
  //simulate network delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // simulate error for empty prompts (for testing error handling)
        if (!promptData.prompt.trim()) {
          reject({
            status: HTTP_STATUS.BAD_REQUEST,
            message: 'Prompt cannot be empty',
          });
          return;
        }
        
        // mock responses based on the prompt
        const mockResponses = [
          "I'm an AiDA AI assistant designed to help answer your questions.",
          "That's an interesting question. Let me think about it...",
          "I can help you with coding, general knowledge, and creative tasks.",
          "Is there anything specific you'd like to learn more about?",
          "I'm here to assist with whatever you need help with."
        ];
        
        // get a random response
        const randomIndex = Math.floor(Math.random() * mockResponses.length);
        
        resolve({
          content: mockResponses[randomIndex]
        });
      } catch (error) {
        reject({
          status: HTTP_STATUS.SERVER_ERROR,
          message: 'Mock API error',
          data: error,
        });
      }
    }, 1000); // 1sec delay to simulate network
  });
}
