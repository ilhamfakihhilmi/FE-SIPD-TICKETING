<template>
  <div
    class="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <h4 class="mb-10 text-xl font-semibold text-black dark:text-white">Notifikasi Data Foto</h4>

    <!-- Header for displaying the selected data description and status -->
    <div class="text-sm font-medium text-gray-700 dark:text-gray-300 flex">
      Menampilkan data untuk: <strong>{{ selectedTable }}</strong>
      <span v-if="loading" class="ml-4 text-blue-500">Loading...</span>
      <span v-if="error" class="ml-4 text-red-500 font-medium">
        Error: {{ error }}
        <button
          @click="refreshData"
          class="ml-2 p-1 text-base font-normal px-4 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </span>
      <!-- Display current sort criteria -->
      <p class="text-sm text-gray-600 dark:text-gray-400 ml-2">
        || Sort by: {{ sortKey || 'default' }} ({{ sortOrder }})
      </p>
    </div>

    <!-- Table Header with Sorting -->
    <table
      class="min-w-full table-auto border-collapse border-neutral-200 dark:border-strokedark mt-2"
    >
      <thead>
        <tr
          class="bg-[#1285C4] dark:bg-meta-4 text-white dark:border-strokedark border border-neutral-200 rounded-t-lg"
        >
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer dark:border-strokedark border border-neutral-200"
            @click="setSortKey('name')"
          >
            Server
            <span>{{ sortKey === 'name' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer dark:border-strokedark border border-neutral-200"
            @click="setSortKey('total')"
          >
            Total
            <span>{{ sortKey === 'total' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer dark:border-strokedark border border-neutral-200"
            @click="setSortKey('created_at')"
          >
            Created At
            <span>{{ sortKey === 'created_at' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer dark:border-strokedark border border-neutral-200"
            @click="setSortKey('updated_at')"
          >
            Updated At
            <span>{{ sortKey === 'updated_at' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="selectedTable === 'remote_data'"
          v-for="(photo, index) in paginatedData"
          :key="photo.id"
          class="border-x-neutral-200 dark:border-strokedark"
        >
          <td class="p-2 text-left border border-neutral-200 dark:border-strokedark">
            <p>{{ photo.name.replace('/home/acmt-gateway/', '') }}</p>
          </td>
          <td class="p-2 text-center border border-neutral-200 dark:border-strokedark">
            {{ photo.total }}
          </td>
          <td class="p-2 text-center border border-neutral-200 dark:border-strokedark">
            {{ photo.created_at ? new Date(photo.created_at).toLocaleString() : 'N/A' }}
          </td>
          <td
            class="hidden p-2 text-center sm:table-cell border border-neutral-200 dark:border-strokedark"
          >
            {{ photo.updated_at ? new Date(photo.updated_at).toLocaleString() : 'N/A' }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-center mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 mx-1 bg-gray-300 dark:bg-strokedark dark:text-white rounded"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 mx-1 bg-gray-300 dark:bg-strokedark dark:text-white rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'

// Define the Photo interface
interface Photo {
  id: number;
  name: string;
  total: number;
  created_at: string;
  updated_at: string;
}

// Define the structure of the API response for each entry
interface ApiResponseEntry {
  id: number;
  name: string;
  total: number;
  created_at: string;
  updated_at: string;
}

// Define the state for the API data
const photoData = ref<Photo[]>([])

// Loading and Error states
const loading = ref(false)
const error = ref<string | null>(null)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 12

// Sorting state - set default sort by updated_at (desc)
const sortKey = ref<'name' | 'total' | 'created_at' | 'updated_at'>('updated_at')
const sortOrder = ref<'asc' | 'desc'>('desc')

// Fetch data from API
const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const response = await axios.get(`${baseUrl}api/get-notifikasi`)

    if (response.data && response.data.status === 200) {
      // Explicitly type 'entry' as ApiResponseEntry
      photoData.value = response.data.data.map((entry: ApiResponseEntry) => ({
        id: entry.id,
        name: entry.name,
        total: entry.total,
        created_at: entry.created_at,
        updated_at: entry.updated_at
      }))
    } else {
      error.value = 'Unexpected response format or status code'
    }
  } catch (fetchError: unknown) {
    error.value = (fetchError as any).message || 'Error fetching photo data'
  } finally {
    loading.value = false
  }
}

// Auto-refresh data
onMounted(() => {
  fetchData()

  // Set interval to fetch data every 10 seconds (10000 milliseconds)
  const interval = setInterval(fetchData, 10000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

// Refresh data manually
const refreshData = () => {
  fetchData()
}

// Sorted and filtered data
const sortedData = computed(() => {
  const filteredData = photoData.value.filter((photo) => photo.total > 1000)

  if (!sortKey.value) return filteredData

  return [...filteredData].sort((a, b) => {
    let result = 0

    if (a[sortKey.value] > b[sortKey.value]) {
      result = 1
    } else if (a[sortKey.value] < b[sortKey.value]) {
      result = -1
    }

    return sortOrder.value === 'asc' ? result : -result
  })
})

// Paginated data for current page
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedData.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage))

// Pagination functions
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

// Set sorting key and toggle order
const setSortKey = (key: 'name' | 'total' | 'created_at' | 'updated_at') => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

// State for the selected table
const selectedTable = ref('remote_data')
</script>
