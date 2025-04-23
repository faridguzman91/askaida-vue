<template>
  <div class="tokenized-text">
    <span v-for="(token, index) in displayedTokens" :key="index" class="token">{{ token }}</span>
    <span v-if="isAnimating" class="cursor"></span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  tokenDelay: {
    type: Number,
    default: 80, // ms per token
  },
  variableDelay: {
    type: Boolean,
    default: true,
  },
  onComplete: {
    type: Function,
    default: () => {},
  }
});

const displayedTokens = ref([]);
const isAnimating = ref(true);
let currentIndex = 0;

//split text into tokens
function tokenizeText(text) {
  // regex to split on spaces but keep punctuation
  return text.match(/\S+|\s+|[.,!?;:()[\]{}""'']/g) || [];
}

function getRandomDelay() {
  if (props.variableDelay) {
    // random delay 
    return props.tokenDelay * (0.5 + Math.random());
  }
  return props.tokenDelay;
}

function animateTokens(tokens) {
  if (currentIndex < tokens.length) {
    displayedTokens.value.push(tokens[currentIndex]);
    currentIndex++;
    setTimeout(() => animateTokens(tokens), getRandomDelay());
  } else {
    isAnimating.value = false;
    props.onComplete();
  }
}

function startAnimation() {
  displayedTokens.value = [];
  currentIndex = 0;
  isAnimating.value = true;
  
  const tokens = tokenizeText(props.text);
  animateTokens(tokens);
}

onMounted(() => {
  startAnimation();
});

watch(() => props.text, () => {
  startAnimation();
});
</script>

<style scoped>
.tokenized-text {
  display: inline;
  word-wrap: break-word;
  line-height: 1.5;
}

.token {
  display: inline;
}

.cursor {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style>

