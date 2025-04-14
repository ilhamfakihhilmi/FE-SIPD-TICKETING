<template>
  <main class=" bg-gray-50 min-h-auto ">
    <div
      class=" rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10 h-auto overflow-auto">
      <!-- Tabs -->
      <div class="flex space-x-4">
        <button :class="tab === 'harian' ? activeTabClass : inactiveTabClass" @click="tab = 'harian'">
          Data Harian Ini
        </button>
        <button :class="tab === 'keseluruhan' ? activeTabClass : inactiveTabClass" @click="tab = 'keseluruhan'">
          Data Keseluruhan
        </button>
      </div>

      <!-- Filter -->
      <div class="bg-gray-50 p-4 rounded shadow flex flex-wrap items-center gap-4">
        <div class="text-base font-semibold">Filter Grafik</div>
        <select class="border p-2 rounded dark:text-gray-300 dark:bg-graydark" v-model="selectedYear">
          <option value="">Semua Tahun</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select class="border p-2 rounded dark:text-gray-300 dark:bg-graydark" v-model="selectedMonth">
          <option value="">Semua Bulan</option>
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maret</option>
          <!-- dan seterusnya -->
        </select>
        <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="filterData">
          Filter
        </button>
        <button class="bg-red-500 text-white px-4 py-2 rounded" @click="refreshData">
          Segarkan
        </button>
      </div>

      <!-- Cards -->
      <div>
        <div class="bg-blue-500 p-4 rounded-t text-white font-semibold">
          Data Keseluruhan
        </div>
        <div
          class="bg-white p-4 rounded-b shadow grid grid-cols-1 md:grid-cols-4 gap-4 dark:text-gray-300 dark:bg-graydark">
          <div class="flex items-center gap-3 p-4 rounded bg-pink-100 text-pink-800">
            <i class="pi pi-inbox text-2xl"></i>
            <div>
              <p class="text-sm">Tiket Masuk</p>
              <p class="text-lg font-bold">{{ data.tiketMasuk }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 rounded bg-yellow-100 text-yellow-800">
            <i class="pi pi-spinner text-2xl animate-spin"></i>
            <div>
              <p class="text-sm">Tiket Dalam Proses</p>
              <p class="text-lg font-bold">{{ data.tiketProses }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 rounded bg-green-100 text-green-800">
            <i class="pi pi-check-circle text-2xl"></i>
            <div>
              <p class="text-sm">Tiket Selesai</p>
              <p class="text-lg font-bold">{{ data.tiketSelesai }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 rounded bg-gray text-gray-800">
            <i class="pi pi-ticket text-2xl"></i>
            <div>
              <p class="text-sm">Total Tiket</p>
              <p class="text-lg font-bold">{{ data.totalTiket }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue'

const tab = ref('keseluruhan')
const selectedYear = ref('')
const selectedMonth = ref('')

const data = ref({
  tiketMasuk: 7,
  tiketProses: 1,
  tiketSelesai: 1064,
  totalTiket: 1072
})

const filterData = () => {
  console.log('Filter berdasarkan:', selectedYear.value, selectedMonth.value)
}

const refreshData = () => {
  console.log('Data disegarkan')
  // Jika terhubung ke API, bisa fetch ulang di sini
}

// Tailwind classes
const activeTabClass = 'px-4 py-2 rounded bg-blue-600 text-white font-semibold'
const inactiveTabClass = 'px-4 py-2 rounded bg-gray-200 text-gray-700'
</script>

<style scoped>
/* PrimeIcons styling assumed */
</style>
