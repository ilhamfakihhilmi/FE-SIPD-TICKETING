<template>
  <div
    class="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
  >
    <!-- Dropdown for selecting table -->
    <div class="mb-4 flex items-center justify-between">
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">Data Foto</h4>
      <div class="flex items-center">
        <h1 class="mr-2">Pilih Server : </h1>
        <select
          v-model="selectedTable"
          class="p-2 border rounded text-slate-700 px-4 dark:text-white dark:bg-slate-700"
        >
          <option value="GW 177">GW 177</option>
          <option value="GW 172">GW 172</option>
          <option value="GW 174">GW 174</option>
          <option value="GW 175">GW 175</option>
          <option value="GW 176">GW 176</option>
        </select>
      </div>
    </div>

    <!-- Header for displaying the selected data description and status -->
    <div class="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
      Menampilkan data untuk: <strong>{{ selectedTable }}</strong>
      <span v-if="loading" class="ml-4 text-blue-500">Loading...</span>
      <span v-if="error" class="ml-4 text-red-500">Error: {{ error }}</span>
    </div>

    <!-- Sorting Information -->
    <div class="mb-4 text-lg text-gray-600 dark:text-gray-300">
      <span v-if="sortKey"
        >Sedang disortir berdasarkan: <strong>{{ sortKey }}</strong> ({{
          sortOrder === 'asc' ? 'Ascending' : 'Descending'
        }})</span
      >
    </div>

    <!-- Table Header with Sorting -->
    <table
      class="min-w-full table-auto border-collapse border border-gray-200 dark:border-strokedark"
    >
      <thead>
        <tr class="bg-gray-200 dark:bg-meta-4">
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer border-b dark:border-strokedark"
          >
            No
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer border-b dark:border-strokedark"
            @click="setSortKey('name')"
          >
            Nama Folder
            <span>{{ sortKey === 'name' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer border-b dark:border-strokedark"
            @click="setSortKey('total')"
          >
            Total
            <span>{{ sortKey === 'total' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
          <th
            class="p-2.5 text-left text-sm font-medium cursor-pointer border-b dark:border-strokedark"
            @click="setSortKey('lastUpdated')"
          >
            Terakhir Diperbarui
            <span>{{
              sortKey === 'lastUpdated' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼'
            }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Render the paginated and sorted data in the table -->
        <tr
          v-for="(photo, index) in paginatedData"
          :key="index"
          class="hover:bg-gray-100 dark:hover:bg-meta-4"
        >
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}
          </td>
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">{{ photo.name }}</td>
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">{{ photo.total }}</td>
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">
            {{ photo.lastUpdated }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

// Define an interface for the photo data structure
interface PhotoData {
  name: string;
  total: number;
  lastUpdated: Date; // Change to Date type
}

// Define the state for the API data
const photoData = ref<PhotoData[]>([]);

// State for loading and error status
const loading = ref(false); // Loading state
const error = ref<string>(''); // Error message

// State for sorting
const sortKey = ref<string>(''); // The column to sort by
const sortOrder = ref<'asc' | 'desc'>('asc'); // Sort order (asc or desc)

// State for pagination
const itemsPerPage = 10; // Number of items per page
const currentPage = ref(1); // Current page

// State for the selected table
const selectedTable = ref<string>('GW 177');

// Function to fetch data from API
const fetchData = async (table: string) => {
  loading.value = true; // Set loading to true
  error.value = ''; // Reset error message

  try {
    const baseUrl = import.meta.env.VITE_BASE_URL; // Access the base URL from .env
    let endpoint = '';

    // Determine the endpoint based on the selected table
    switch (table) {
      case 'GW 177':
        endpoint = 'api/getall177';
        break;
      case 'GW 172':
        endpoint = 'api/getall172';
        break;
      case 'GW 174':
        endpoint = 'api/getall174';
        break;
      case 'GW 175':
        endpoint = 'api/getall175';
        break;
      case 'GW 176':
        endpoint = 'api/getall176';
        break;
      default:
        console.error('Invalid table selected');
        return;
    }

    const response = await axios.get(`${baseUrl}${endpoint}`); // Fetch data from API

    // Assuming the response contains { status: 200, message: ..., data: [...] }
    if (response.data && response.data.status === 200 && Array.isArray(response.data.data)) {
      // Process the 'data' array
      photoData.value = response.data.data.map((entry: { name: string; total: string; updated_at: string }) => ({
        name: entry.name.replace('/home/acmt-gateway/', ''), // Remove the unwanted part of the path
        total: parseInt(entry.total, 10) || 0, // Convert total to a number
        lastUpdated: new Date(entry.updated_at) // Convert to Date object for sorting
      }));
    } else {
      console.error('Error: Unexpected response format or missing data');
    }
  } catch (fetchError: any) { // Explicitly type fetchError
    error.value = fetchError?.message || 'An error occurred'; // Set error message if an error occurs
    console.error('Error fetching photo data:', fetchError);
  } finally {
    loading.value = false; // Set loading to false after fetching data
  }
}

// Fetch the data from the API when the component is mounted
onMounted(() => {
  fetchData(selectedTable.value); // Fetch data for the initial selected table

  // Set interval to refresh the data every 60 seconds
  const intervalId = setInterval(() => {
    fetchData(selectedTable.value);
  }, 60000);

  // Clear interval when the component is unmounted to avoid memory leaks
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});

// Watch for changes in the selectedTable and fetch data accordingly
watch(selectedTable, (newTable) => {
  fetchData(newTable); // Fetch data immediately upon table change
  currentPage.value = 1; // Reset to the first page on table change
});

// Computed property to return sorted data
const sortedData = computed(() => {
  // Filter the data where 'total' is less than or equal to 1000
  const filteredData = photoData.value.filter((photo) => photo.total <= 1000);

  return filteredData.sort((a, b) => {
    let result = 0; // Initial result

    if (sortKey.value === 'lastUpdated') {
      result = (a.lastUpdated as Date).getTime() - (b.lastUpdated as Date).getTime(); // Sort by last updated date
    } else {
      if (a[sortKey.value as keyof PhotoData] > b[sortKey.value as keyof PhotoData]) {
        result = 1;
      } else if (a[sortKey.value as keyof PhotoData] < b[sortKey.value as keyof PhotoData]) {
        result = -1;
      }
    }

    return sortOrder.value === 'asc' ? result : -result; // Return result based on sort order
  });
});

// Computed property to return paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage; // Calculate start index
  return sortedData.value.slice(start, start + itemsPerPage); // Return the items for the current page
});

// Computed property to calculate total pages
const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / itemsPerPage); // Calculate total pages
});

// Function to set the sorting key and toggle the sort order
const setSortKey = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'; // Toggle sort order
  } else {
    sortKey.value = key; // Set new sort key
    sortOrder.value = 'asc'; // Reset to ascending
  }
};

// Function to go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++; // Increment the current page
  }
};

// Function to go to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--; // Decrement the current page
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
