<script setup lang="ts">
import LaporanIndex from '@/components/LaporanTiket/Laporan/LaporanIndex.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';


</script>

<template>
    <DefaultLayout>
        <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
            <!-- <RealTimeDashboard /> -->
            <LaporanIndex />
        </div>
    </DefaultLayout>
</template>