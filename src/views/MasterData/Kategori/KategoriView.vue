<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';

import KategoriIndex from '@/components/MasterData/Kategori/KategoriIndex.vue';
</script>

<template>
    <DefaultLayout>
        <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
            <!-- <RealTimeDashboard /> -->
            <KategoriIndex />
        </div>
    </DefaultLayout>
</template>