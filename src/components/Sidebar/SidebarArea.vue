<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 z-9999 flex h-screen w-55 flex-col overflow-y-hidden bg-white shadow-md ease-linear dark:bg-boxdark lg:w-72"
      :class="{
        'translate-x-0': sidebarStore.isSidebarOpen,
        '-translate-x-full': !sidebarStore.isSidebarOpen
      }" ref="target">

      <!-- SIDEBAR HEADER -->
      <div class="flex items-center justify-between gap-2 px-1 py-5 lg:py-6">
        <router-link to="/" class="px-3 flex items-center gap-2">
          <!-- Logo Dark mode: hanya muncul di light mode -->
          <logoDark class="h-12  dark:hidden" />

          <!-- Logo Normal: hanya muncul di dark mode -->
          <logoNormal class="hidden h-12  dark:block" />
        </router-link>

        <!-- Tombol close sidebar untuk mobile -->
        <button class="block lg:hidden" @click="sidebarStore.isSidebarOpen = false">
          <svg class="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 8.98748 17.625 9.17498 17.475C9.51248 17.1375 9.51248 16.6125 9.17498 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="" />
          </svg>
        </button>
      </div>
      <!-- END SIDEBAR HEADER -->



      <div class="no-scrollbar flex flex-1 flex-col overflow-y-auto duration-300 ease-linear">
        <!-- Sidebar Menu -->
        <nav class="flex h-full flex-col justify-between py-4 px-4 lg:px-6">
          <div>
            <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
              <div class="mb-6 flex w-full flex-col last:mb-0">
                <h3 v-if="menuGroup.name" class="mb-3 text-sm font-medium uppercase text-gray-500 dark:text-gray-400">
                  {{ menuGroup.name }}
                </h3>
                <ul class="flex flex-col gap-1.5">
                  <li v-for="(menuItem, index) in menuGroup.menuItems" :key="index">
                    <router-link :to="menuItem.route"
                      class="pointer flex w-full items-center rounded-md px-4 py-2.5 text-sm font-normal lg:px-6"
                      :class="{
                        'bg-[#DDF0F6] text-[#1285C4] dark:bg-slate-700 dark:text-blue-500': isActive(menuItem.route),
                        'hover:bg-slate-200 dark:hover:bg-slate-800': !isActive(menuItem.route)
                      }">
                      <!-- Dynamic Icon Component -->
                      <component :is="getIconComponent(menuItem.label)" class="mr-3 h-5 w-5" />
                      {{ menuItem.label }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </template>
          </div>

          <!-- Logout Button at the Bottom -->
          <!-- <div @click="logout"
            class="cursor-pointer mt-10 pb-4 flex w-full items-center rounded-md px-4 py-2.5 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-800 lg:px-6">
            <LogoutIcon class="mr-3 h-5 w-5" />
            <span class="cursor-pointer">Logout</span>
          </div> -->

        </nav>
        <!-- Sidebar Menu -->
      </div>
    </aside>

    <!-- Main Content -->
    <main :class="{
      'ml-0 lg:ml-72': sidebarStore.isSidebarOpen,
      'ml-0': !sidebarStore.isSidebarOpen
    }" class="min-h-screen flex-1 duration-300 ease-linear">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useSidebarStore } from '@/stores/sidebar'
import { ref } from 'vue'

// Logo image imports
import logoDark from '../../assets/images/logo/logo_dark.svg'
import logoNormal from '../../assets/images/logo/logo_normal.svg'

// Icon imports
import ActivityIcon from '@/assets/icons/activity.svg'
import BellIcon from '@/assets/icons/bell.svg'
import CategoryIcon from '@/assets/icons/category.svg'
import CityIcon from '@/assets/icons/city.svg'
import DashboardIcon from '@/assets/icons/dashboard.svg'
import NewTicketIcon from '@/assets/icons/new-ticket.svg'
import PhotoIcon from '@/assets/icons/photo.svg'
import PriorityIcon from '@/assets/icons/priority.svg'
import ProvinceIcon from '@/assets/icons/province.svg'
import ReportIcon from '@/assets/icons/report.svg'
import SolutionIcon from '@/assets/icons/solution.svg'
import StatusIcon from '@/assets/icons/status.svg'
import TicketIcon from '@/assets/icons/ticket.svg'

const sidebarStore = useSidebarStore()

interface MenuItem {
  label: string
  route: string
}

interface MenuGroup {
  name: string
  menuItems: MenuItem[]
}

const menuGroups = ref<MenuGroup[]>([
  {
    name: '',
    menuItems: [
      { label: 'Dashboard', route: '/dashboard' },
    ]
  },
  {
    name: 'Master Data',
    menuItems: [
      { label: 'Provinsi', route: '/provinsi' },
      { label: 'Kota/Kabupaten', route: '/kotakabupaten' },
      { label: 'Kategori', route: '/kategori' },
      { label: 'Prioritas', route: '/prioritas' },
      { label: 'Status', route: '/status' },
    ]
  },
  {
    name: 'Aplikasi Tiket',
    menuItems: [
      { label: 'Aktivitas', route: '/aktivitas' },
      { label: 'Semua Tiket', route: '/semuatiket' },
      { label: 'Buat Tiket Baru', route: '/buattiket' }
    ]
  },
  {
    name: 'Laporan Tiket',
    menuItems: [
      { label: 'Laporan', route: '/laporan' },
    ]
  },
  {
    name: 'Solusi Teknis',
    menuItems: [
      { label: 'Solusi Teknis', route: '/solusiteknis' },
    ]
  }
])

const isActive = (route: string): boolean => {
  return router.currentRoute.value.path === route
}

const getIconComponent = (label: string) => {
  const icons: Record<string, any> = {
    'Dashboard': DashboardIcon,
    'Foto': PhotoIcon,
    'Notifikasi': BellIcon,
    'Provinsi': ProvinceIcon,
    'Kota/Kabupaten': CityIcon,
    'Kategori': CategoryIcon,
    'Prioritas': PriorityIcon,
    'Status': StatusIcon,
    'Aktivitas': ActivityIcon,
    'Semua Tiket': TicketIcon,
    'Buat Tiket Baru': NewTicketIcon,
    'Laporan': ReportIcon,
    'Solusi Teknis': SolutionIcon
  }
  return icons[label] || 'div'
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/auth/signin')
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
