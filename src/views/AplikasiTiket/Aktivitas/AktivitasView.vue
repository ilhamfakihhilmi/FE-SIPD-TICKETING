<script setup lang="ts">
import AktivitasIndex from '@/components/AplikasiTiket/Aktivitas/AktivitasIndex.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

AktivitasIndex
</script>

<template>
    <DefaultLayout>
        <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
            <!-- <RealTimeDashboard /> -->
            <AktivitasIndex />
        </div>
    </DefaultLayout>
</template>