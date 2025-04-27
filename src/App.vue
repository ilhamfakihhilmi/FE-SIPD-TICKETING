<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
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
const iframeError = ref(false);
const iframeLoading = ref(false);

// CORS safe origin check
const isAllowedOrigin = (origin: string) => {
  const allowedOrigins = [
    'http://82.25.108.179:3000' // Added your chatbot IP
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
  if (!iframe || !token.value || !userData.value) return;

  const chatbotOrigin = 'http://82.25.108.179:3000'; // Updated to your chatbot IP

  try {
    iframe.contentWindow?.postMessage({
      type: 'auth',
      token: token.value,
      user: {
        id: userData.value.id,
        name: userData.value.name,
        email: userData.value.email,
        phone: userData.value.phone_number
      }
    }, chatbotOrigin);
  } catch (error) {
    console.error('Failed to post message to iframe:', error);
  }
};

// Handle messages from iframe securely
const handleMessage = (event: MessageEvent) => {
  // Security check
  if (!isAllowedOrigin(event.origin)) {
    console.warn('Message from unauthorized origin:', event.origin);
    return;
  }

  const { type, isOpen } = event.data || {};

  if (type === 'toggle') {
    isChatOpen.value = !!isOpen;
    if (iframeRef.value) {
      iframeRef.value.style.width = isOpen ? '380px' : '60px';
      iframeRef.value.style.height = isOpen ? '680px' : '60px';
    }
  }
};

// Handle iframe load events
const handleIframeLoad = () => {
  iframeLoading.value = false;
  iframeError.value = false;
  console.log('Iframe loaded successfully');
  setTimeout(sendAuthDataToIframe, 1000);
};

const handleIframeError = () => {
  iframeLoading.value = false;
  iframeError.value = true;
  console.error('Iframe failed to load');
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('message', handleMessage);
  fetchUserData();

  const iframe = iframeRef.value;
  if (iframe) {
    iframeLoading.value = true;
    iframe.addEventListener('load', handleIframeLoad);
    iframe.addEventListener('error', handleIframeError);
  }

  // Listen for token changes across tabs
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
  const iframe = iframeRef.value;
  if (iframe) {
    iframe.removeEventListener('load', handleIframeLoad);
    iframe.removeEventListener('error', handleIframeError);
  }
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

  <!-- Chatbot iframe with improved error handling -->
  <div v-if="isLoggedIn" class="chatbot-container">
    <iframe ref="iframeRef" id="chatbot-frame" src="http://82.25.108.179:3000"
      :class="{ 'iframe-error': iframeError, 'iframe-loading': iframeLoading }" :style="{
        width: isChatOpen ? '380px' : '80px',
        height: isChatOpen ? '680px' : '80px',
      }" allow="microphone" title="Chatbot"></iframe>

    <div v-if="iframeLoading" class="iframe-loading-state">
      Loading chatbot...
    </div>

    <div v-if="iframeError" class="iframe-error-state">
      Failed to load chatbot.
      <button @click="iframeError = false; iframeLoading = true; iframeRef?.contentWindow?.location.reload()">
        Retry
      </button>
    </div>
  </div>
</template>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

#iframe-chatbot {
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.iframe-loading {
  opacity: 0.5;
}

.iframe-error {
  border: 2px solid #ff4444;
}

.iframe-loading-state,
.iframe-error-state {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
}

.iframe-error-state {
  background: #ffeeee;
  color: #ff4444;
}

.iframe-error-state button {
  margin-top: 8px;
  padding: 4px 8px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>