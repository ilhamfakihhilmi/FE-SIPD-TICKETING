<template>
    <div class="min-h-screen bg-white text-black flex flex-col">
        <header class="bg-white w-full px-12 py-4 flex justify-between items-center shadow-md">
            <div class="flex items-center gap-3">
                <img src="https://pusdatin.dikdasmen.go.id/logo-footer-2.png" alt="Logo SIPD"
                    class="w-24 h-12 object-contain" />
            </div>

            <div class="flex items-center gap-10">
                <div class="text-right text-sm leading-snug flex flex-row gap-10">
                    <p class="text-black font-bold">Beranda</p>
                    <p class="text-black font-bold">Hot-line CS (021) 741 8808</p>
                    <p class="text-black font-bold">Email pusdatin@kemhan.go.id</p>
                </div>

                <button @click="handleLogout"
                    class="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors" title="Logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="hidden md:inline">Logout</span>
                </button>
            </div>
        </header>

        <main
            class="flex-1 flex gap-1 items-center justify-center px-2 py-10 bg-[url('https://pusdatin.dikdasmen.go.id/images/kontak-kami.png')] bg-cover bg-center relative">
            <div class="absolute inset-0 bg-white opacity-40 z-0"></div>
            <div class="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center relative z-10">
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

                <div class="flex-1 flex flex-col gap-4">
                    <div
                        class="w-[600px] h-[250px] rounded-xl p-4 relative z-10 flex justify-center items-center overflow-hidden bg-white bg-opacity-10 backdrop-blur-md">
                        <transition-group name="fade" tag="div" class="relative w-full h-full">
                            <img v-for="(img, index) in images" v-show="index === currentImage" :key="img" :src="img"
                                class="w-full h-full object-cover rounded-md absolute transition-opacity duration-1000" />
                        </transition-group>
                    </div>

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

        <div class="chatbot-container">
            <iframe ref="iframeRef" id="chatbot-frame" :src="env.CHATBOT_URL"
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

const env = {
    API_BASE_URL: import.meta.env.VITE_APP_API_BASE_URL,
    CHATBOT_URL: import.meta.env.VITE_APP_CHATBOT_URL,
    SIPD_LOGO_URL: "https://sipd.kemendagri.go.id/landing/assets/images/logo/logo-light-min.webp",
    SIPD_SYMBOL_URL: "https://sipd.kemendagri.go.id/landing/assets/images/logo/symbol-white-letter.png",
    BACKGROUND_IMAGE_URL: "https://sifilma.kemendagri.go.id/sam/image/mockup/6c07cb2abfaea6b85b67fb0307331740.jpg",
    MAP_IMAGE_URL: "https://sipd.kemendagri.go.id/landing/assets/images/landing-page/1ebacdaf637a5f0c817ffcb5bfb8b2f6.png",
    LAYANAN_IMAGE_1: "https://sipd.kemendagri.go.id/landing/assets/images/landing-page/486a7c295e8d89921880de9e54b8c829.png",
    LAYANAN_IMAGE_2: "https://sipd.kemendagri.go.id/landing/assets/images/landing-page/43dbc65bd062d0f7a3d4b58d78bc04bf.png",
    LAYANAN_IMAGE_3: "https://sipd.kemendagri.go.id/landing/assets/images/landing-page/aed1cc4c287975eccb00d9418a32b88a.png"
}

const router = useRouter(); // Dipindahkan ke atas agar bisa diakses oleh handleLogout

const token = ref(localStorage.getItem('token')) // Definisikan token di scope yang lebih tinggi
const userData = ref(null) // Definisikan userData di scope yang lebih tinggi

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

// Chatbot iframe functionality
const iframeRef = ref(null)
const isChatOpen = ref(false)
// token dan userData sudah didefinisikan di atas
const iframeError = ref(false)
const iframeLoading = ref(false)

// Check allowed origins for security
const isAllowedOrigin = (origin) => {
    // Daftar origin yang diizinkan kini menyertakan CHATBOT_URL dari env
    const allowedOrigins = [
        env.CHATBOT_URL, // Dinamis dari variabel lingkungan
        // Anda bisa menambahkan origin statis lainnya jika diperlukan
        // 'http://localhost:some_other_port'
    ];
    // Pastikan env.CHATBOT_URL ada sebelum melakukan pengecekan
    if (!env.CHATBOT_URL) {
        console.warn('CHATBOT_URL is not defined in env. Cannot validate origin.');
        return false;
    }
    return allowedOrigins.includes(origin);
}

// Fetch user data from API 
const fetchUserData = async () => {
    if (!token.value) return

    try {
        const response = await fetch(`${env.API_BASE_URL}/api/profile`, {
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

    // Pastikan env.CHATBOT_URL tersedia
    if (!env.CHATBOT_URL) {
        console.error('CHATBOT_URL is not defined. Cannot send message to iframe.');
        return;
    }

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
        }, env.CHATBOT_URL) // Target origin menggunakan env.CHATBOT_URL
    } catch (error) {
        console.error('Failed to post message to iframe:', error)
    }
}

// Handle messages from iframe
const handleMessage = (event) => {
    if (!isAllowedOrigin(event.origin)) {
        console.warn('Message from unauthorized origin:', event.origin, 'Expected:', env.CHATBOT_URL)
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

// Iframe event handlers
const handleIframeLoad = () => {
    iframeLoading.value = false
    iframeError.value = false
    setTimeout(sendAuthDataToIframe, 1000) // Kirim data setelah iframe dimuat
}

const handleIframeError = () => {
    iframeLoading.value = false
    iframeError.value = true
}

const reloadIframe = () => {
    iframeError.value = false
    iframeLoading.value = true
    if (iframeRef.value && iframeRef.value.contentWindow) {
        iframeRef.value.contentWindow.location.reload();
    } else if (iframeRef.value) {
        // Fallback jika contentWindow tidak tersedia, coba set src lagi
        iframeRef.value.src = env.CHATBOT_URL;
    }
}

// Initialize
onMounted(() => {
    window.addEventListener('message', handleMessage)
    fetchUserData() // Ambil data pengguna saat komponen dimuat

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

    // Listen for token changes from other tabs/windows
    window.addEventListener('storage', (event) => {
        if (event.key === 'token') {
            const newTokenValue = event.newValue;
            token.value = newTokenValue;
            if (newTokenValue) {
                fetchUserData().then(() => {
                    // Setelah data pengguna baru diambil, kirim ulang ke iframe jika sudah terbuka
                    if (isChatOpen.value) {
                        sendAuthDataToIframe();
                    }
                });
            } else {
                userData.value = null;
                // Mungkin perlu mengirim pesan ke iframe bahwa pengguna telah logout
                if (iframeRef.value && iframeRef.value.contentWindow && env.CHATBOT_URL) {
                    iframeRef.value.contentWindow.postMessage({ type: 'auth_clear' }, env.CHATBOT_URL);
                }
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
    window.removeEventListener('storage', () => { }) // Sebaiknya berikan fungsi yang sama untuk dihapus
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

#chatbot-frame {
    /* Mengubah dari #iframe-chatbot menjadi #chatbot-frame agar sesuai dengan id di template */
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
    border: 2px solid #ff4444 !important;
    /* Tambahkan !important jika perlu override style lain */
}

.iframe-loading-state,
.iframe-error-state {
    position: absolute;
    /* Disesuaikan agar muncul di atas ikon iframe saat belum terbuka penuh */
    bottom: 10px;
    right: 10px;
    padding: 10px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: auto;
    /* Lebar otomatis sesuai konten */
    min-width: 150px;
    /* Lebar minimal */
    text-align: center;
    z-index: 10000;
    /* Pastikan di atas iframe */
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

    /* Penyesuaian untuk header pada mobile */
    header.px-12 {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .text-right.gap-10 {
        gap: 0.5rem;
        /* Kurangi gap pada mobile */
        flex-direction: column;
        /* Susun vertikal jika perlu */
        align-items: flex-end;
    }

    header .flex.items-center.gap-10 {
        gap: 1rem;
        /* Kurangi gap utama di header */
    }
}
</style>