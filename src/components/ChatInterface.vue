<template>
  <div class="chat-container">
    <div class="messages-container" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.role === 'user' ? 'user-message' : 'assistant-message']">
        <div class="message-content">
          <div v-if="message.role === 'assistant' && message.animating" class="typing-animation">
            <TokenizedTextDisplay 
              :text="message.content" 
              :tokenDelay="70" 
              :variableDelay="true"
              :onComplete="() => completeAnimation(index)"
            />
          </div>
          <div v-else>{{ message.content }}</div>
        </div>
      </div>
    </div>
    
    <div class="input-container">
      <textarea 
        v-model="userInput" 
        @keydown.enter.prevent="handleSendMessage"
        placeholder="Type your message here..."
        rows="1"
        ref="inputField"
      ></textarea>
      <button @click="handleSendMessage" :disabled="isProcessing || !userInput.trim()" style="width: 40px; height: 40px;">
        <p style="padding: 50px;"> Send</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import TokenizedTextDisplay from './TokenizedTextDisplay.vue';
import { 
  sendMessage, 
  completeAnimation, 
  useMessages, 
  useProcessingState 
} from '../services/chatService';

const userInput = ref('');
const messages = useMessages();
const isProcessing = useProcessingState();
const messagesContainer = ref<HTMLElement | null>(null);
const inputField = ref<HTMLTextAreaElement | null>(null);

async function handleSendMessage() {
  const trimmedInput = userInput.value.trim();
  if (!trimmedInput || isProcessing.value) return;
  
  // Clear input field
  userInput.value = '';
  
  // Reset textarea height
  if (inputField.value) {
    inputField.value.style.height = 'auto';
  }
  
  // Send message
  await sendMessage(trimmedInput);
  
  // Scroll to bottom after UI update
  await nextTick();
  scrollToBottom();
}

// Keep up with amount of response against the container height
function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}

// Watch for user input changes to adjust textarea height
watch(userInput, () => {
  if (inputField.value) {
    inputField.value.style.height = 'auto';
    inputField.value.style.height = `${inputField.value.scrollHeight}px`;
  }
});

// Watch for messages changes to scroll to bottom
watch(() => messages.value.length, () => {
  nextTick(() => scrollToBottom());
});

// Mount input field
onMounted(() => {
  if (inputField.value) {
    inputField.value.focus();
  }
  scrollToBottom();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  animation: fadeIn 0.3s ease;
}

.user-message {
  align-self: flex-end;
  background-color: #646cff;
  color: white;
}

.assistant-message {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
}

.message-content {
  word-break: break-word;
}

.input-container {
  display: flex;
  padding: 16px;
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
  align-items: flex-end;
}

textarea {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  resize: none;
  max-height: 150px;
  outline: none;
  transition: border-color 0.3s;
  font-family: inherit;
}

textarea:focus {
  border-color: #646cff;
}

button {
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #535bf2;
}

button:disabled {
  background-color: #a5a6f3;
  cursor: not-allowed;
}

.typing-animation {
  min-height: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
