import { createRouter, createWebHistory } from 'vue-router'

// Import Layouts

// Import Views
import SipdClone from '@/components/DemoSipdClone/Index.vue'
import AktivitasView from '@/views/AplikasiTiket/Aktivitas/AktivitasView.vue'
import BuatTiketView from '@/views/AplikasiTiket/BuatTiket/BuatTiketView.vue'
import SemuaTiketView from '@/views/AplikasiTiket/SemuaTiket/SemuaTiketView.vue'
import SigninView from '@/views/Authentication/SigninView.vue'
import LaporanView from '@/views/LaporanTiket/Laporan/LaporanView.vue'
import KategoriView from '@/views/MasterData/Kategori/KategoriView.vue'
import KotaKabView from '@/views/MasterData/KotaKab/KotaKabView.vue'
import PrioritasView from '@/views/MasterData/Prioritas/PrioritasView.vue'
import ProvinsiView from '@/views/MasterData/Provinsi/ProvinsiView.vue'
import StatusView from '@/views/MasterData/Status/StatusView.vue'
import SolusiTeknisView from '@/views/SolusiTeknis/SolusiTeknisi/SolusiTeknisView.vue'


SolusiTeknisView

// Define routes
const routes = [
  {
    path: '/auth/signin',
    name: 'signin',
    component: SigninView,
    meta: { title: 'Sign In' }
  },
  {
    path: '/',
    redirect: '/auth/signin'
  },
  {
    path: '/dashboard',
    component: SipdClone,
    name: 'dashboard',
    meta: { requiresAuth: true, title: 'Dashboard' }
  },
  {
    path: '/provinsi',
    name: 'provinsi',
    component: ProvinsiView,
    meta: { requiresAuth: true, title: 'Provinsi' }
  },
  {
    path: '/kotakabupaten',
    name: 'kotakabupaten',
    component: KotaKabView,
    meta: { requiresAuth: true, title: 'KotaKab' }
  },
  {
    path: '/kategori',
    name: 'kategori',
    component: KategoriView,
    meta: { requiresAuth: true, title: 'Kategori' }
  },
  {
    path: '/prioritas',
    name: 'prioritas',
    component: PrioritasView,
    meta: { requiresAuth: true, title: 'Prioritas' }
  },
  {
    path: '/status',
    name: 'status',
    component: StatusView,
    meta: { requiresAuth: true, title: 'Status' }
  },
  {
    path: '/aktivitas',
    name: 'aktivitas',
    component: AktivitasView,
    meta: { requiresAuth: true, title: 'Aktivitas' }
  },
  {
    path: '/semuatiket',
    name: 'semuatiket',
    component: SemuaTiketView,
    meta: { requiresAuth: true, title: 'Semuatiket' }
  },
  {
    path: '/buattiket',
    name: 'buattiket',
    component: BuatTiketView,
    meta: { requiresAuth: true, title: 'BuatTiket' }
  },
  {
    path: '/laporan',
    name: 'laporan',
    component: LaporanView,
    meta: { requiresAuth: true, title: 'Laporan' }
  },
  {
    path: '/solusiteknis',
    name: 'solusiteknis',
    component: SolusiTeknisView,
    meta: { requiresAuth: true, title: 'SolusiTeknis' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Redirect to signin if route requires auth and token is not present
    if (!token) {
      next({ name: 'signin' })
    } else {
      next() // Proceed if authenticated
    }
  } else {
    next() // Proceed if route does not require auth
  }
})

export default router
