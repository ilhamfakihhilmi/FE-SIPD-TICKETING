<template>
  <div
    class="rounded-md border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-auto overflow-auto">

    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">
        Diagram Total Tiket Pertahun
      </h4>
    </div>

    <!-- ApexChart -->
    <div class="w-full">
      <apexchart width="100%" height="400" type="bar" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import ApexChart from 'vue3-apexcharts'

// Register component
const apexchart = ApexChart

// Interface for data
interface Photo {
  id: string
  name: string
  total: number
  lastUpdated?: Date
}

// Static data
const photoData = ref<Photo[]>([
  { id: 'folder1', name: 'Folder A', total: 800 },
  { id: 'folder2', name: 'Folder B', total: 600 },
  { id: 'folder3', name: 'Folder C', total: 400 },
  { id: 'folder4', name: 'Folder D', total: 950 },
  { id: 'folder5', name: 'Folder E', total: 720 },
])

// Filtered data
const filteredData = computed(() => {
  return photoData.value.filter(item => item.total <= 1000)
})

// Dark mode detection
const isDarkMode = ref(false)

onMounted(() => {
  // Initial check
  isDarkMode.value = document.documentElement.classList.contains('dark')

  // Observe changes to class on <html>
  const observer = new MutationObserver(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

// Chart options
const chartOptions = computed(() => ({
  chart: {
    id: 'tiket-chart',
    toolbar: { show: false },
    background: isDarkMode.value ? '#1e293b' : '#ffffff',
  },
  xaxis: {
    categories: filteredData.value.map(item => item.name),
    labels: {
      style: {
        colors: isDarkMode.value ? '#CBD5E1' : '#1e293b',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDarkMode.value ? '#CBD5E1' : '#1e293b',
      },
    },
  },
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: [isDarkMode.value ? '#ffffff' : '#000000'],
    },
  },
  title: {
    text: 'Total Tiket',
    align: 'center',
    style: {
      fontSize: '16px',
      color: isDarkMode.value ? '#ffffff' : '#333333',
    },
  },
  theme: {
    mode: isDarkMode.value ? 'dark' : 'light',
  },
}))

// Series data
const series = computed(() => [
  {
    name: 'Total Tiket',
    data: filteredData.value.map(item => item.total),
  },
])
</script>
