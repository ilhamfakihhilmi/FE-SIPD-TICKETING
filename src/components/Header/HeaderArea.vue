<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import DarkModeSwitcher from './DarkModeSwitcher.vue'

// Sidebar logic
const sidebarStore = useSidebarStore()
const isSidebarOpen = computed(() => sidebarStore.isSidebarOpen)
const toggleSidebar = () => {
  sidebarStore.toggleSidebar()
}

// Profile dropdown logic
const userName = ref('John Doe')
const avatarUrl = ref('https://i.pravatar.cc/40')
const isProfileMenuOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

// Close dropdown on click outside
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = profileDropdownRef.value
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isProfileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

// Logout logic
const router = useRouter()
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/auth/signin')
}
</script>

<template>
  <header class="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
    <div class="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
      <!-- Sidebar Toggle -->
      <div class="flex items-center gap-2 sm:gap-4">
        <button aria-label="Toggle sidebar"
          class="z-99999 rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          @click="toggleSidebar">
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span v-if="!isSidebarOpen" class="flex flex-col justify-center items-center">
              <div class="h-0.5 w-5 mb-1 rounded-sm bg-black dark:bg-white"></div>
              <div class="h-0.5 w-5 mb-1 rounded-sm bg-black dark:bg-white"></div>
              <div class="h-0.5 w-5 rounded-sm bg-black dark:bg-white"></div>
            </span>
            <span v-else class="absolute right-0 h-full w-full rotate-45">
              <div class="absolute left-2.5 top-0 h-full w-0.5 rounded-sm bg-black dark:bg-white"></div>
              <div class="absolute left-0 top-2.5 h-0.5 w-full rounded-sm bg-black dark:bg-white"></div>
            </span>
          </span>
        </button>
      </div>

      <div class="sm:block"></div>

      <!-- Right Side Items -->
      <div class="flex items-center gap-3 2xsm:gap-7">
        <ul class="flex items-center gap-2 2xsm:gap-4">
          <li>
            <DarkModeSwitcher />
          </li>

          <!-- Profile Dropdown -->
          <li class="relative" ref="profileDropdownRef">
            <button @click.stop="toggleProfileMenu" class="flex items-center gap-2 focus:outline-none">
              <img :src="avatarUrl" alt="User Avatar" class="w-8 h-8 rounded-full border border-gray-300" />
              <span class="hidden sm:block text-sm font-medium text-black dark:text-white">
                {{ userName }}
              </span>
            </button>

            <transition name="fade">
              <div v-if="isProfileMenuOpen"
                class="absolute right-0 mt-2 w-48 rounded-md bg-white dark:bg-boxdark shadow-md ring-1 ring-black/5 z-50">
                <div
                  class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-strokedark">
                  Signed in as <strong>{{ userName }}</strong>
                </div>

                <!-- Logout Button -->
                <div @click="logout"
                  class="cursor-pointer flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-stone-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                  </svg>
                  <span>Logout</span>
                </div>

              </div>
            </transition>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
