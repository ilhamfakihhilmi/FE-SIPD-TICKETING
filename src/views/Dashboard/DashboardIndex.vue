<script setup lang="ts">
import DataStatsOne from '@/components/DataStats/DataStatsOne.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RealTimeDashboard from '@/components/RealTimeDashboard.vue'
</script>

<template>
  <DefaultLayout>
    <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
      <RealTimeDashboard />
      <DataStatsOne />
    </div>
  </DefaultLayout>
</template>
