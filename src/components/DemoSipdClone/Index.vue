<template>
    <div class="min-h-screen bg-white text-black flex flex-col">
        <!-- Header -->
        <header class="bg-white w-full px-12 py-4 flex justify-between items-center shadow-md">
            <!-- Logo -->
            <div class="flex items-center gap-3">
                <img src="https://pusdatin.dikdasmen.go.id/logo-footer-2.png" alt="Logo SIPD"
                    class="w-24 h-12 object-contain" />
            </div>

            <!-- Contact Info dan Logout Button -->
            <div class="flex items-center gap-10">
                <div class="text-right text-sm leading-snug flex flex-row gap-10">
                    <p class="text-black font-bold">Beranda</p>
                    <p class="text-black font-bold">Hot-line CS (021) 741 8808</p>
                    <p class="text-black font-bold">Email pusdatin@kemhan.go.id</p>
                </div>

                <!-- Logout Button -->
                <button @click="handleLogout"
                    class="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors" title="Logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="hidden md:inline">Logout</span>
                </button>
            </div>
        </header>

        <!-- Content -->
        <main
            class="flex-1 flex gap-1 items-center justify-center px-2 py-10 bg-[url('https://pusdatin.dikdasmen.go.id/images/kontak-kami.png')] bg-cover bg-center relative">
            <!-- Dark overlay layer -->
            <div class="absolute inset-0 bg-white opacity-40 z-0"></div>
            <div class="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center relative z-10">
                <!-- Left section -->
                <div class="flex-1">
                    <h1 class="text-2xl md:text-3xl font-semibold text-white">Selamat Datang di,</h1>
                    <div class="flex items-center gap-4 mt-4">
                        <img src="https://pusdatin.dikdasmen.go.id/logo-footer-2.png" alt="Logo SIPD"
                            class="w-[700px] h-[300px] object-contain" />
                    </div>
                    <p class="mt-6 text-white text-sm md:text-base leading-relaxed">
                        Pusdatin (Pusat Data dan Teknologi Informasi) adalah unit kementerian yang mengelola data dan
                        teknologi informasi, mulai dari pengumpulan hingga penyajian, guna menjamin ketersediaan dan
                        akurasi informasi.
                    </p>
                </div>

                <!-- Right section with dynamic image slider -->
                <div class="flex-1 flex flex-col gap-4"> <!-- Tambahkan gap untuk spasi konsisten -->
                    <!-- Bagian Carousel Gambar -->
                    <div
                        class="w-[600px] h-[250px] rounded-xl p-4 relative z-10 flex justify-center items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-md">
                        <transition-group name="fade" tag="div" class="relative w-full h-full">
                            <img v-for="(img, index) in images" v-show="index === currentImage" :key="img" :src="img"
                                class="w-full h-full object-cover rounded-md absolute transition-opacity duration-1000" />
                        </transition-group>
                    </div>

                    <!-- Bagian Informasi Aplikasi -->
                    <div
                        class="w-[600px] h-[250px] bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-md relative z-10 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold text-white mb-4">Informasi Aplikasi</h3>
                            <p class="text-white">Pelajari cara kerja Aplikasi Pusdatin dalam mengelola data dan
                                teknologi
                                informasi kementerian dengan mudah melalui beberapa video panduan berikut.</p>
                        </div>
                        <button
                            class="bg-white text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition w-[30%]">
                            Unduh
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Chatbot iframe container -->
        <div class="chatbot-container">
            <iframe ref="iframeRef" id="chatbot-frame" src="http://82.25.108.179:9002/"
                :class="{ 'iframe-error': iframeError, 'iframe-loading': iframeLoading }" :style="{
                    width: isChatOpen ? '380px' : '80px',
                    height: isChatOpen ? '680px' : '80px',
                }" allow="microphone" title="Chatbot SIPD"></iframe>

            <div v-if="iframeLoading" class="iframe-loading-state">
                Memuat chatbot...
            </div>

            <div v-if="iframeError" class="iframe-error-state">
                Gagal memuat chatbot.
                <button @click="reloadIframe">
                    Coba Lagi
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const handleLogout = async () => {
    try {
        // Clear authentication data
        localStorage.removeItem('token');
        token.value = null;
        userData.value = null;

        // Clear cookies
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
        });

        // Clear session storage
        sessionStorage.clear();

        // Clear cache
        if ('caches' in window) {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        }

        // Unregister service workers
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }
        }

        // Clear indexedDB
        if ('indexedDB' in window) {
            try {
                const dbs = await window.indexedDB.databases();
                for (const db of dbs) {
                    if (db.name) {
                        window.indexedDB.deleteDatabase(db.name);
                    }
                }
            } catch (e) {
                console.warn('Failed to clear indexedDB:', e);
            }
        }

        // Clear axios headers if used
        if (window.axios && window.axios.defaults.headers.common['Authorization']) {
            delete window.axios.defaults.headers.common['Authorization'];
        }

        // Redirect ke halaman login yang benar
        router.push({ path: '/auth/signin', query: { logout: 'true' } });

    } catch (error) {
        console.error('Error during logout:', error);
        // Fallback redirect kalau error
        window.location.href = '/auth/signin?logout=true';
    }
};


// Image slider data
const images = [
    'https://assets.promediateknologi.id/crop/135x170:1421x934/750x500/webp/photo/2023/07/04/kalender-pendidikan-tahun-ajaran-baru-2023-2024-untuk-sd-smp-dan-sma-sederajat-di-jawa-tengah-ini-jadwalnya-3853037572.jpg',
    'https://cdn0-production-images-kly.akamaized.net/P6X-LNkb7qj3h6cVwtgQry04TyQ=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3892785/original/029382800_1641181317-ptm_jakarta.jpg',
    'https://smpmutualmagelang.sch.id/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-06-at-14.28.36-780x470.jpeg',
]

const currentImage = ref(0)
let interval = null

// Layanan data


// Chatbot iframe functionality
const iframeRef = ref(null)
const isChatOpen = ref(false)
const token = ref(localStorage.getItem('token'))
const userData = ref(null)
const iframeError = ref(false)
const iframeLoading = ref(false)

// Check allowed origins for security
const isAllowedOrigin = (origin) => {
    const allowedOrigins = [
        // 'http://localhost:3000',
        // 'https://your-production-chatbot-domain.com',
        'http://82.25.108.179:9002',
        // 'http://82.25.108.179:3000'
    ]
    return allowedOrigins.includes(origin)
}

// Fetch user data from API 
const fetchUserData = async () => {
    if (!token.value) return

    try {
        const response = await fetch('http://127.0.0.1:8000/api/profile', {
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json()
            if (data.success && data.data) {
                userData.value = data.data
            }
        } else if (response.status === 401) {
            localStorage.removeItem('token')
            token.value = null
        }
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
}

// Send auth data to chatbot iframe
const sendAuthDataToIframe = () => {
    const iframe = iframeRef.value
    if (!iframe || !token.value || !userData.value) return

    // const chatbotOrigin = 'http://82.25.108.179:9002'
    const chatbotOrigin = 'http://82.25.108.179:9002'

    try {
        iframe.contentWindow?.postMessage({
            type: 'auth',
            token: token.value,
            user: {
                id: userData.value.id,
                name: userData.value.name,
                email: userData.value.email,
                no_hp: userData.value.no_hp
            }
        }, chatbotOrigin)
    } catch (error) {
        console.error('Failed to post message to iframe:', error)
    }
}

// Handle messages from iframe
const handleMessage = (event) => {
    if (!isAllowedOrigin(event.origin)) {
        console.warn('Message from unauthorized origin:', event.origin)
        return
    }

    const { type, isOpen } = event.data || {}

    if (type === 'toggle') {
        isChatOpen.value = !!isOpen
        if (iframeRef.value) {
            iframeRef.value.style.width = isOpen ? '380px' : '80px'
            iframeRef.value.style.height = isOpen ? '680px' : '80px'
        }
    }
}

const router = useRouter();

// Iframe event handlers
const handleIframeLoad = () => {
    iframeLoading.value = false
    iframeError.value = false
    setTimeout(sendAuthDataToIframe, 1000)
}

const handleIframeError = () => {
    iframeLoading.value = false
    iframeError.value = true
}

const reloadIframe = () => {
    iframeError.value = false
    iframeLoading.value = true
    iframeRef.value?.contentWindow?.location.reload()
}

// Initialize image slider
onMounted(() => {
    window.addEventListener('message', handleMessage)
    fetchUserData()

    const iframe = iframeRef.value
    if (iframe) {
        iframeLoading.value = true
        iframe.addEventListener('load', handleIframeLoad)
        iframe.addEventListener('error', handleIframeError)
    }

    // Image slider interval
    interval = setInterval(() => {
        currentImage.value = (currentImage.value + 1) % images.length
    }, 3000)

    // Listen for token changes
    window.addEventListener('storage', (event) => {
        if (event.key === 'token') {
            token.value = event.newValue
            if (event.newValue) {
                fetchUserData()
            } else {
                userData.value = null
            }
        }
    })
})

onUnmounted(() => {
    window.removeEventListener('message', handleMessage)
    const iframe = iframeRef.value
    if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad)
        iframe.removeEventListener('error', handleIframeError)
    }
    window.removeEventListener('storage', () => { })
    clearInterval(interval)
})
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Image slider transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Chatbot container styles */
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

/* Logout button styles */
.fa-sign-out-alt {
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .hidden-md {
        display: none;
    }
}
</style>