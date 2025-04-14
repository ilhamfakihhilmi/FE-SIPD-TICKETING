<template>
    <div class="p-6 bg-white dark:bg-graydark rounded-2xl shadow-xl w-full">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Daftar Status</h2>
            <button
                class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                <i class="pi pi-plus-circle text-white"></i>
                Tambah Status
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-lg shadow-sm">
            <table class="min-w-full text-sm bg-white dark:bg-graydark rounded-lg">
                <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
                    <tr>
                        <th class="py-3 px-4 text-left">No</th>
                        <th class="py-3 px-4 text-left">Status</th>
                        <th class="py-3 px-4 text-center">Fitur</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-200">
                    <tr v-for="(item, index) in paginatedItems" :key="item.id"
                        class="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td class="py-3 px-4">{{ index + 1 + (currentPage - 1) * perPage }}</td>
                        <td class="py-3 px-4">
                            <span :class="[
                                'inline-block px-3 py-1 rounded-full text-xs font-semibold',
                                item.status === 'Tertunda' && 'bg-red text-white dark:bg-red-600 dark:text-white',
                                item.status === 'Diterima' && 'bg-blue-500 text-white dark:bg-blue-600 dark:text-white',
                                item.status === 'Proses' && 'bg-indigo-500 text-white dark:bg-indigo-600 dark:text-white',
                                item.status === 'Selesai' && 'bg-green-500 text-white dark:bg-green-600 dark:text-white',
                                item.status === 'Menunggu' && 'bg-yellow-500 text-white dark:bg-yellow-600 dark:text-white',
                                item.status === 'Buka Kembali' && 'bg-orange-500 text-white dark:bg-orange-600 dark:text-white',
                            ]">
                                {{ item.status }}
                            </span>
                        </td>
                        <td class="py-3 px-4 text-center">
                            <div class="flex justify-center gap-3">
                                <button class="text-yellow-500 hover:text-yellow-600 transition">
                                    <i class="pi pi-pencil"></i>
                                </button>
                                <button class="text-red-500 hover:text-red-600 transition">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="paginatedItems.length === 0">
                        <td colspan="3" class="text-center py-4 text-gray-500 dark:text-gray-400">Tidak ada data</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6 text-sm">
            <div class="text-gray-600 dark:text-gray-300">
                Menampilkan <strong>{{ paginatedItems.length }}</strong> dari <strong>{{ statuses.length }}</strong>
                item
            </div>
            <div class="flex items-center gap-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-3 py-1.5 rounded-md border text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                    Prev
                </button>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Page {{ currentPage }} / {{ totalPages }}
                </span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-3 py-1.5 rounded-md border text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const statuses = ref([
    { id: 1, status: 'Tertunda' },
    { id: 2, status: 'Diterima' },
    { id: 3, status: 'Proses' },
    { id: 4, status: 'Selesai' },
    { id: 5, status: 'Buka Kembali' },
    { id: 6, status: 'Menunggu' },
])

const currentPage = ref(1)
const perPage = 4
const totalPages = computed(() => Math.ceil(statuses.value.length / perPage))

const paginatedItems = computed(() =>
    statuses.value.slice(
        (currentPage.value - 1) * perPage,
        currentPage.value * perPage
    )
)

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
@import 'https://unpkg.com/primeicons/primeicons.css';
</style>
