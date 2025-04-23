<template>
  <div class="json-output">
    <pre>{{ displayedText }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  json: {
    type: Object,
    required: true,
  },
  delay: {
    type: Number,
    default: 20, // ms per character
  },
})

const displayedText = ref('')
const fullText = JSON.stringify(props.json, null, 2)
let index = 0

const animateText = () => {
  if (index < fullText.length) {
    displayedText.value += fullText[index++]
    setTimeout(animateText, props.delay)
  }
}

onMounted(() => {
  animateText()
})

watch(() => props.json, () => {
  index = 0
  displayedText.value = ''
  animateText()
})
</script>

<style scoped>
.json-output {
  background-color: #1e1e1e;
  color: #dcdcdc;
  font-family: 'Courier New', monospace;
  padding: 1rem;
  border-radius: 10px;
  white-space: pre-wrap;
  font-size: 14px;
  line-height: 1.5;
  max-width: 600px;
}
</style>
