<script setup lang="ts">
import DefaultAuthCard from '@/components/Auths/DefaultAuthCard.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { instance } from '@/views/helper/axios' // axios instance with interceptor

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const router = useRouter()

const validateEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Email dan password wajib diisi.'
    return
  }

  if (!validateEmail(email.value)) {
    errorMessage.value = 'Format email tidak valid.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password minimal 6 karakter.'
    return
  }

  try {
    isLoading.value = true

    const response = await instance.post('/api/login', {
      email: email.value,
      password: password.value
    })

    if (response.data.success) {
      const token = response.data.token

      // Simpan token ke localStorage (atau sessionStorage jika lebih aman)
      localStorage.setItem('token', token)

      // Redirect ke dashboard
      router.push({ name: 'dashboard' })
    } else {
      errorMessage.value = response.data.message || 'Login gagal.'
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Email atau password salah.'
    } else {
      errorMessage.value = 'Terjadi kesalahan. Coba lagi nanti.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <DefaultAuthCard subtitle="Start for free" title="Sign In to TailAdmin">
    <form @submit.prevent="handleSubmit">
      <!-- Email -->
      <input v-model="email" type="email" placeholder="Enter your email"
        class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white dark:text-white mb-3" />

      <!-- Password -->
      <div class="relative">
        <input :type="showPassword ? 'text' : 'password'" v-model="password"
          placeholder="6+ Characters, 1 Capital letter"
          class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-white dark:text-white" />
        <button type="button" @click="showPassword = !showPassword"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white">
          <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.944-9.544-7a10.05 10.05 0 011.518-2.568m3.31-2.574A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.99 9.99 0 01-4.273 5.207M3 3l18 18" />
          </svg>
        </button>
      </div>

      <!-- Error -->
      <p v-if="errorMessage" class="text-red mt-2">{{ errorMessage }}</p>

      <!-- Submit -->
      <div class="mb-5 mt-6">
        <button type="submit" :disabled="isLoading"
          class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-60 disabled:cursor-not-allowed">
          {{ isLoading ? 'Loading...' : 'Masuk' }}
        </button>
      </div>
    </form>
  </DefaultAuthCard>
</template>
