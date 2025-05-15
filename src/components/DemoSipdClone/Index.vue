<template>
    <div class="min-h-screen bg-white text-black flex flex-col">
        <!-- Header -->
        <header class="bg-white w-full px-12 py-4 flex justify-between items-center shadow-md">
            <!-- Logo -->
            <div class="flex items-center gap-3">
                <img src="https://sipd.kemendagri.go.id/landing/assets/images/logo/logo-light-min.webp" alt="Logo SIPD"
                    class="w-24 h-12 object-contain" />
            </div>

            <!-- Contact Info dan Logout Button -->
            <div class="flex items-center gap-10">
                <div class="text-right text-sm leading-snug flex flex-row gap-10">
                    <p class="text-black font-bold">Beranda</p>
                    <p class="text-black font-bold">Hot-line CS +6281317633727</p>
                    <p class="text-black font-bold">Email sipd@kemendagri.go.id</p>
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
            class="flex-1 flex gap-1 items-center justify-center px-2 py-10 bg-[url('https://sifilma.kemendagri.go.id/sam/image/mockup/6c07cb2abfaea6b85b67fb0307331740.jpg')] bg-cover bg-center relative">
            <!-- Dark overlay layer -->
            <div class="absolute inset-0 bg-black opacity-70 z-0"></div>
            <div class="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center relative z-10">
                <!-- Left section -->
                <div class="flex-1">
                    <h1 class="text-2xl md:text-3xl font-semibold text-white">Selamat Datang di,</h1>
                    <div class="flex items-center gap-4 mt-4">
                        <img src="https://sipd.kemendagri.go.id/landing/assets/images/logo/symbol-white-letter.png"
                            alt="Logo SIPD" class="w-[700px] h-[300px] object-contain" />
                    </div>
                    <p class="mt-6 text-white text-sm md:text-base leading-relaxed">
                        Pengelolaan informasi pembangunan daerah, informasi keuangan daerah, dan informasi pemerintahan
                        daerah
                        lainnya yang saling terhubung untuk dimanfaatkan dalam penyelenggaraan pembangunan daerah.
                    </p>
                </div>

                <!-- Right section with dynamic image slider -->
                <div class="flex-1 flex flex-col">
                    <!-- Bagian Carousel Gambar -->
                    <div class="flex-1 min-h-[300px] rounded-xl p-4 relative z-10 flex justify-center items-center">
                        <transition-group name="fade" tag="div"
                            class="relative w-[550px] h-full flex justify-center items-center">
                            <img v-for="(img, index) in images" v-show="index === currentImage" :key="img" :src="img"
                                class="w-full h-auto object-contain rounded-md absolute transition-opacity duration-1000" />
                        </transition-group>
                    </div>

                    <!-- Bagian Informasi Aplikasi -->
                    <div
                        class="flex-1 min-h-[200px] bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-md relative z-10 flex flex-col justify-between">
                        <div>
                            <h3 class="text-lg font-bold text-white mb-4">Informasi Aplikasi</h3>
                            <p class="text-white">Pelajari cara kerja Sistem Informasi Pemerintahan Daerah dengan mudah
                                melalui beberapa video panduan berikut.</p>
                        </div>
                        <button
                            class="bg-white text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition w-[30%]">
                            Unduh
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Feature Section -->
        <feature-card class="flex-1 flex flex-row justify-center py-10">
            <section class="py-10 px-3 bg-white">
                <h2 class="text-3xl font-bold text-center mb-10 text-black">
                    LAYANAN <span class="text-blue-500">▼</span>
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="layanan in daftarLayanan" :key="layanan.judul"
                        class="bg-graydark text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                        <img :src="layanan.img" alt="icon" class="w-[350px] mx-auto mb-12 mt-12" />
                        <h3 class="text-xl font-bold text-center mb-10">{{ layanan.judul }}</h3>
                        <p class="text-sm text-center mb-20">{{ layanan.deskripsi }}</p>
                        <p class="text-xs text-center text-gray-400 mb-12">- {{ layanan.peraturan }} -</p>
                        <div class="text-center mt-auto">
                            <button class="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition">
                                Selengkapnya
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </feature-card>

        <!-- Footer -->
        <footer class="bg-[#1C1C46] text-white pt-10">
            <div class="max-w-7xl mx-auto px-6 md:px-1 flex flex-col md:flex-row justify-between flex-wrap gap-8 pb-10">
                <div class="flex-1 min-w-[170px]">
                    <h2 class="font-semibold text-lg mb-4">Informasi Aplikasi</h2>
                    <ul class="space-y-2 text-sm">
                        <li>• Dasar Hukum</li>
                        <li>• Dokumentasi</li>
                        <li>• FAQ</li>
                    </ul>
                </div>

                <div class="flex-1 min-w-[200px]">
                    <h2 class="font-semibold text-lg mb-4">Hubungi Kami</h2>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-center gap-2">
                            <i class="fas fa-phone-alt"></i> Hot-line CS +6281317633727
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fab fa-whatsapp"></i> whatsapp +6281317633727
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fas fa-envelope"></i> sipd@kemendagri.go.id
                        </li>
                    </ul>
                </div>

                <div class="flex min-w-[200px]">
                    <div class="w-[150px] mr-4">
                        <img src="https://sipd.kemendagri.go.id/landing/assets/images/landing-page/1ebacdaf637a5f0c817ffcb5bfb8b2f6.png"
                            alt="map" class="w-[150px] h-[150px] rounded mb-2" />
                    </div>
                    <div class="flex-1">
                        <h2 class="font-semibold text-lg mb-2">Alamat Kantor</h2>
                        <p class="text-sm">
                            Jl. Medan Merdeka Utara No.7, RT.5/RW.2, Gambir, <br />
                            Kecamatan Gambir, Kota Jakarta Pusat, DKI Jakarta 10110
                        </p>
                    </div>
                </div>

                <div class="flex-1 min-w-[200px]">
                    <h2 class="font-semibold text-lg mb-4">Media Sosial Kami</h2>
                    <ul class="space-y-2 text-sm">
                        <li class="flex items-center gap-2">
                            <i class="fab fa-instagram"></i> @sipdkemendagri
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fab fa-youtube"></i> sipdkemendagri
                        </li>
                        <li class="flex items-center gap-2">
                            <i class="fab fa-facebook"></i> sipdkemendagri
                        </li>
                    </ul>
                </div>
            </div>

            <div class="bg-orange-500 text-center py-3 font-semibold text-white">
                KEMENTERIAN DALAM NEGERI @ 2023
            </div>
        </footer>

        <!-- Chatbot iframe container -->
        <div class="chatbot-container">
            <iframe ref="iframeRef" id="chatbot-frame" src="http://82.25.108.179:3000"
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
    'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/stiker/papua-barat-daya.png',
    'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/stiker/jawa-timur.png',
    'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/stiker/papua.png',
]

const currentImage = ref(0)
let interval = null

// Layanan data
const daftarLayanan = [
    {
        img: 'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/486a7c295e8d89921880de9e54b8c829.png',
        judul: 'INFORMASI PEMBANGUNAN DAERAH',
        deskripsi:
            'Informasi Pembangunan Daerah adalah suatu sistem yang digunakan untuk pengelolaan data dan informasi perencanaan pembangunan daerah, serta analisis dan Profil Pembangunan Daerah.',
        peraturan: 'Permendagri 70 Tahun 2019 tentang Sistem Informasi Pemerintahan Daerah',
    },
    {
        img: 'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/43dbc65bd062d0f7a3d4b58d78bc04bf.png',
        judul: 'INFORMASI KEUANGAN DAERAH',
        deskripsi:
            'Informasi Keuangan Daerah adalah suatu sistem yang digunakan untuk pengelolaan data dan informasi serta penyusunan, monitoring, dan evaluasi dokumen pengelolaan keuangan daerah secara elektronik.',
        peraturan: 'Permendagri 70 Tahun 2019 tentang Sistem Informasi Pemerintahan Daerah',
    },
    {
        img: 'https://sipd.kemendagri.go.id/landing/assets/images/landing-page/aed1cc4c287975eccb00d9418a32b88a.png',
        judul: 'INFORMASI PEMERINTAHAN DAERAH LAINNYA',
        deskripsi: 'Informasi Pemerintahan Daerah Lainnya adalah suatu sistem yang digunakan untuk pengelolaan data dan informasi lainnya.',
        peraturan: 'Permendagri 70 Tahun 2019 tentang Sistem Informasi Pemerintahan Daerah',
    },
]

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
        'http://localhost:3000',
        'https://your-production-chatbot-domain.com',
        'http://82.25.108.179:3000'
    ]
    return allowedOrigins.includes(origin)
}

// Fetch user data from API
const fetchUserData = async () => {
    if (!token.value) return

    try {
        const response = await fetch('http://82.25.108.179:9003/api/profile', {
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

    const chatbotOrigin = 'http://82.25.108.179:3000'

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