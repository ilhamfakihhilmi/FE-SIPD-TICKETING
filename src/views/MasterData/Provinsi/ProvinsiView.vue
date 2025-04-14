<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DataProvinsiIndex from '@/components/MasterData/DataProvinsi/DataProvinsiIndex.vue';
</script>

<template>
  <DefaultLayout>
    <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
      <!-- <RealTimeDashboard /> -->
      <DataProvinsiIndex />
    </div>
  </DefaultLayout>
</template>