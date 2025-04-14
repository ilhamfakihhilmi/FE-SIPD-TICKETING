<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import TableTwo from '@/components/Tables/TableNotifikasi.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { ref } from 'vue'

const pageTitle = ref('Data Notifikasi')
</script>

<template>
  <DefaultLayout>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <!-- <TableOne /> -->
      <TableTwo />
      <!-- <TableThree /> -->
    </div>
  </DefaultLayout>
</template>
