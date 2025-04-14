<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { RouterView } from 'vue-router';

const iframeRef = ref<HTMLIFrameElement | null>(null);
const isChatOpen = ref(false);

const handleMessage = (event: MessageEvent) => {
  const { type, isOpen } = event.data || {};

  if (type === 'toggle') {
    isChatOpen.value = isOpen;
    if (iframeRef.value) {
      iframeRef.value.style.width = isOpen ? '380px' : '90px';
      iframeRef.value.style.height = isOpen ? '580px' : '90px';
    }
  }
};

onMounted(() => {
  window.addEventListener('message', handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});
</script>

<template>
  <RouterView />
  <iframe ref="iframeRef" id="chatbot-frame" src="http://localhost:3000" style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      transition: all 0.3s ease;
      border: none;
      border-radius: 12px;
      z-index: 9999;
      overflow: hidden;
    
    "></iframe>
</template>
