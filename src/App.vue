<script setup lang="ts">
import ChatInterface from './components/ChatInterface.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Ask AiDA</h1>
    </header>
    <main>
      <ChatInterface />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  color: #646cff;
  font-size: 2.5rem;
  margin: 0;
}

main {
  flex: 1;
}
</style>
