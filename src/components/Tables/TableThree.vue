<template>
  <div>
    <!-- Table Header for Table Tree -->
    <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
      <div class="p-2.5 xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">Fotos</h5>
      </div>
      <div class="p-2.5 text-center xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">Foto 04</h5>
      </div>
      <div class="p-2.5 text-center xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">Foto 02</h5>
      </div>
      <div class="hidden p-2.5 text-center sm:block xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">Total</h5>
      </div>
      <div class="hidden p-2.5 text-center sm:block xl:p-5">
        <h5 class="text-sm font-medium uppercase xsm:text-base">Conversion</h5>
      </div>
    </div>

    <!-- Table Rows -->
    <div
      v-for="(brand, key) in tableTreeData"
      :key="key"
      :class="`grid grid-cols-3 sm:grid-cols-5 ${
        key === tableTreeData.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
      }`"
    >
      <div class="flex items-center gap-3 p-2.5 xl:p-5">
        <div class="flex-shrink-0">
          <p class="text-black dark:text-white">{{ brand.title }}</p>
        </div>
      </div>
      <div class="flex items-center justify-center p-2.5 xl:p-5">
        <p class="text-black dark:text-white">{{ brand.visitors }}</p>
      </div>
      <div class="flex items-center justify-center p-2.5 xl:p-5">
        <p class="text-black dark:text-white">{{ brand.revenues }}</p>
      </div>
      <div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p class="text-black dark:text-white">{{ brand.sales }}</p>
      </div>
      <div class="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p class="text-meta-3 dark:text-white">{{ brand.conversion }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableTreeData = ref([
  {
    title: 'prod 8014',
    name: '123',
    visitors: 567,
    revenues: '345',
    sales: 678,
    conversion: 6.7
  },
  {
    title: 'prod 8015',
    name: '234',
    visitors: 234,
    revenues: '456',
    sales: 789,
    conversion: 5.5
  },
  {
    title: 'prod 8016',
    name: '345',
    visitors: 345,
    revenues: '567',
    sales: 890,
    conversion: 4.5
  }
])
</script>
