<!-- src/components/DataTable.vue -->
<template>
    <table class="min-w-full table-auto border-collapse border border-gray-200 dark:border-strokedark">
      <thead>
        <tr class="bg-gray-200 dark:bg-meta-4">
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
            <span>{{ sortKey === 'lastUpdated' ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ▲▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(photo, key) in sortedData" :key="key" class="hover:bg-gray-100 dark:hover:bg-meta-4">
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">{{ photo.name }}</td>
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">{{ photo.total }}</td>
          <td class="p-2.5 border-b border-gray-200 dark:border-strokedark">{{ photo.lastUpdated }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  // Props for data and sorting logic
  defineProps({
    sortedData: Array,
    sortKey: String,
    sortOrder: String,
    setSortKey: Function,
  });
  </script>
  
  <style scoped>
  /* Add table-specific styles if needed */
  </style>
  