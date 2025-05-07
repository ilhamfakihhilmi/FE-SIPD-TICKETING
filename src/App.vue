<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { RouterView } from 'vue-router';

// Refs
const iframeRef = ref<HTMLIFrameElement | null>(null);
const isChatOpen = ref(false);
const token = ref(localStorage.getItem('token'));
const userData = ref<{
  id?: number;
  name?: string;
  email?: string;
  phone_number?: string;
} | null>(null);
const isLoggedIn = ref(!!token.value);

// CORS safe origin check
const isAllowedOrigin = (origin: string) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://your-production-chatbot-domain.com'
  ];
  return allowedOrigins.includes(origin);
};

// Fetch user data from Laravel API
const fetchUserData = async () => {
  if (!token.value) return;

  try {
    const response = await fetch('http://82.25.108.179:9003/api/profile', {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        userData.value = data.data;
      } else {
        console.warn('Invalid user data format:', data);
      }
    } else {
      console.warn('Failed to fetch user data:', await response.text());
      if (response.status === 401) {
        localStorage.removeItem('token');
        token.value = null;
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Send auth data to chatbot iframe securely
const sendAuthDataToIframe = () => {
  const iframe = iframeRef.value;
  if (!iframe || !token.value) return;

  const chatbotOrigin = 'http://localhost:3000';

  const payload = {
    type: 'auth',
    token: token.value,
    user: {
      id: userData.value?.id,
      name: userData.value?.name,
      email: userData.value?.email,
      phone: userData.value?.phone_number,
      // Include token in user data
      auth_token: token.value,
      // Include raw token data if needed
      token_data: {
        value: token.value,
        expires_at: localStorage.getItem('token_expires_at'),
        token_type: 'Bearer'
      }
    }
  };

  iframe.contentWindow?.postMessage(payload, chatbotOrigin);
};

// Handle messages from iframe securely
const handleMessage = (event: MessageEvent) => {
  if (!isAllowedOrigin(event.origin)) return;

  const { type, isOpen } = event.data || {};

  if (type === 'toggle') {
    isChatOpen.value = !!isOpen;
    if (iframeRef.value) {
      iframeRef.value.style.width = isOpen ? '380px' : '60px';
      iframeRef.value.style.height = isOpen ? '680px' : '60px';
    }
  }

  // Handle token refresh requests from iframe
  if (type === 'refresh_token' && token.value) {
    sendAuthDataToIframe();
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('message', handleMessage);
  fetchUserData();

  const iframe = iframeRef.value;
  if (iframe) {
    iframe.addEventListener('load', () => {
      setTimeout(sendAuthDataToIframe, 1000);
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'token') {
      token.value = event.newValue;
      if (event.newValue) {
        fetchUserData();
      } else {
        userData.value = null;
      }
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
  window.removeEventListener('storage', () => { });
});

// Watchers
watch(userData, (newVal) => {
  if (newVal) {
    sendAuthDataToIframe();
  }
});

watch(token, (newToken) => {
  isLoggedIn.value = !!newToken;
  if (newToken) {
    fetchUserData();
  } else {
    userData.value = null;
  }
});
</script>

<template>
  <RouterView />

  <!-- Chatbot iframe - only show when logged in -->
  <iframe v-if="isLoggedIn" ref="iframeRef" id="chatbot-frame" src="http://localhost:3000/" :style="{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: isChatOpen ? '380px' : '80px',
    height: isChatOpen ? '680px' : '80px',
    transition: 'all 0.3s ease',
    border: 'none',
    borderRadius: '12px',
    zIndex: 9999,
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  }" allow="microphone" title="Chatbot"></iframe>
</template>