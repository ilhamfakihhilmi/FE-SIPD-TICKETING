<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';


import PrioritasIndex from '@/components/MasterData/Prioritas/PrioritasIndex.vue';
</script>

<template>
    <DefaultLayout>
        <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
            <!-- <RealTimeDashboard /> -->
            <PrioritasIndex />
        </div>
    </DefaultLayout>
</template>