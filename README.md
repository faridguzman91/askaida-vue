# AskAIDA Vue Chat Interface

A Vue.js chat interface for interacting with AI assistants.

## Features

- Real-time chat interface with tokenized text animation
- API service for sending prompts to an AI backend
- Mock API for development without a real backend
- Responsive design with auto-resizing input field
- TypeScript support

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

Create a `.env` file in the project root with the following variables:

```
VITE_API_URL=https://your-api-url.com
```

For development, you can use the mock API by setting `useMockApi = true` in `src/services/chatService.ts`.

## API Service

The project includes a service for sending prompts to an API endpoint:

### Usage

```typescript
import { sendMessage, useMessages, useProcessingState } from './services/chatService';

// Get reactive references to messages and processing state
const messages = useMessages();
const isProcessing = useProcessingState();

// Send a message
await sendMessage('Hello, AI assistant!');
```

### Configuration

API configuration is stored in `src/services/apiConfig.ts`:

- `API_URL`: The base URL for API requests (from environment variables)
- `DEFAULT_TIMEOUT`: Default request timeout in milliseconds
- `ENDPOINTS`: Object containing API endpoint paths

## Components

### ChatInterface

The main chat interface component that handles user input and displays messages.

### TokenizedTextDisplay

A component that displays text with a typing animation, token by token.

## Types

### Message

```typescript
interface Message {
  role: 'user' | 'assistant';
  content: string;
  animating?: boolean;
}
```

### PromptRequest

```typescript
interface PromptRequest {
  prompt: string;
  // Add any other properties that might be needed in the request
}
```

### PromptResponse

```typescript
interface PromptResponse {
  content: string;
  // Add any other properties that might be in the response
}
```

## License

MIT
# askaida-vue
