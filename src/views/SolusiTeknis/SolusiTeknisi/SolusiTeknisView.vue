<script setup lang="ts">

import SolusiTeknisIndex from '@/components/SolusiTeknis/SolusiTeknis/SolusiTeknisIndex.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';


</script>

<template>
    <DefaultLayout>
        <div class="grid lg:grid-cols-1 gap-3 md:grid-cols-1 h-300vh">
            <!-- <RealTimeDashboard /> -->
            <SolusiTeknisIndex />
        </div>
    </DefaultLayout>
</template>