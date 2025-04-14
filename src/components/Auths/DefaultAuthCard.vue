<script setup lang="ts">
// Logo image imports
// import Ilustration from '@/assets/images/illustration/illustration-03.svg';
import logoDark from '../../assets/images/logo/logo_normal.svg';
import logoNormal from '../../assets/images/logo/logo_normal.svg';
import bgImage from '../../assets/images/bg_auth.jpg';

const props = defineProps(['subtitle', 'title', 'customClasses']);
</script>

<template>
  <!-- ====== Forms Section Start -->
  <div class="rounded-sm border h-screen  bg-white  dark:bg-boxdark"
    :style="`background-image: url(${bgImage}); background-size: cover; background-position: center;`">
    <div class="flex flex-wrap items-center backdrop-blur-sm bg-white/10 dark:bg-boxdark/80 h-full">
      <div class="hidden w-full xl:block xl:w-[70%]">
        <div class="py-17.5 px-26 text-center">

          <logoDark class="mx-auto w-[50%] mb-5 dark:hidden" />
          <logoNormal class="hidden mx-auto  w-[50%] mb-5 dark:block" />

          <p class="font-medium 2xl:px-20 text-white dark:text-white">
            "Sistem Informasi Ticketing Pembangunan Daerah – solusi terintegrasi untuk memantau, melacak, dan
            mengoptimalkan proyek pembangunan. Dilengkapi ticketing, visualisasi data, dan chatbot, sistem ini
            meningkatkan transparansi dan efisiensi tata kelola pembangunan."
          </p>

          <!-- <span class="mt-15 inline-block">
            <Ilustration />
          </span> -->
        </div>
      </div>
      <div class="w-full border-stroke dark:border-strokedark xl:w-[30%] xl:border-l-2">
        <div class="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 class="mb-2 text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
            Masuk
          </h2>
          <span class="mb-1.5 block font-normal text-white">Masukan email dan password</span>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- ====== Forms Section End -->
</template>
