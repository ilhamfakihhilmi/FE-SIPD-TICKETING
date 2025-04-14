<template>
    <div class="p-6 bg-white dark:bg-graydark rounded-2xl shadow-xl w-full">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Daftar Prioritas</h2>
            <button
                class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                <i class="pi pi-plus-circle text-white"></i>
                Tambah Prioritas
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-lg shadow-sm">
            <table class="min-w-full text-sm bg-white dark:bg-graydark rounded-lg">
                <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
                    <tr>
                        <th class="py-3 px-4 text-left">No</th>
                        <th class="py-3 px-4 text-left">Prioritas</th>
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
                                item.level === 'Low' && 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900',
                                item.level === 'Medium' && 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900',
                                item.level === 'High' && 'bg-orange-100 text-orange-800 dark:bg-orange-200 dark:text-orange-900',
                                item.level === 'Critical' && 'bg-red text-black dark:bg-red-200 dark:text-red-900'
                            ]">
                                {{ item.level }}
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
                Menampilkan <strong>{{ paginatedItems.length }}</strong> dari <strong>{{ priorities.length }}</strong>
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

const priorities = ref([
    { id: 1, level: 'Low' },
    { id: 2, level: 'Medium' },
    { id: 3, level: 'High' },
    { id: 4, level: 'Critical' },
    { id: 5, level: 'Low' },
    { id: 6, level: 'Medium' },
    { id: 7, level: 'High' },
    { id: 8, level: 'Critical' }
])

const currentPage = ref(1)
const perPage = 4
const totalPages = computed(() => Math.ceil(priorities.value.length / perPage))

const paginatedItems = computed(() =>
    priorities.value.slice(
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
