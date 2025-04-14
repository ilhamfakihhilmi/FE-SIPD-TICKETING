<template>
    <div class="p-6 bg-white dark:bg-graydark rounded-2xl shadow-xl">
        <!-- Header Controls -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-2 text-sm">
                <label for="itemsPerPage">Tampilkan</label>
                <select id="itemsPerPage" v-model="itemsPerPage"
                    class="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-graydark text-gray-700 dark:text-white">
                    <option v-for="n in [5, 10, 15]" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>

            <div class="w-full md:w-1/3">
                <input v-model="search" type="text" placeholder="Cari kategori..."
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-graydark text-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <button
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                + Tambah Kategori
            </button>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-lg shadow-sm">
            <table class="min-w-full text-sm bg-white dark:bg-gray-800 rounded-lg">
                <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <tr>
                        <th class="py-3 px-4 text-left">NO</th>
                        <th class="py-3 px-4 text-left">KATEGORI</th>
                        <th class="py-3 px-4 text-left">KETERANGAN</th>
                        <th class="py-3 px-4 text-center">FITUR</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700 dark:text-gray-200">
                    <tr v-for="(item, index) in paginatedData" :key="item.id"
                        class="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <td class="py-3 px-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                        <td class="py-3 px-4">
                            <span
                                class="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {{ item.kategori }}
                            </span>
                        </td>
                        <td class="py-3 px-4">{{ item.keterangan }}</td>
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
                    <tr v-if="paginatedData.length === 0">
                        <td colspan="4" class="text-center py-4 text-gray-500">Tidak ada data</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6 text-sm">
            <div class="text-gray-600 dark:text-gray-300">
                Menampilkan <strong>{{ paginatedData.length }}</strong> dari <strong>{{ filteredData.length }}</strong>
                data
            </div>
            <div class="flex items-center gap-2">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-3 py-1.5 rounded-md border text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                    Prev
                </button>
                <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
                    'px-3 py-1.5 rounded-md border text-sm font-medium',
                    page === currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]">
                    {{ page }}
                </button>
                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-3 py-1.5 rounded-md border text-gray-600 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const itemsPerPage = ref(5)
const currentPage = ref(1)
const search = ref('')

const data = ref([
    {
        id: 1,
        kategori: 'Aplikasi SIAK Terpusat',
        keterangan: 'Permasalahan yang berkaitan dengan Aplikasi SIAK Terpusat',
    },
    {
        id: 2,
        kategori: 'Jarkomdat',
        keterangan: 'Permasalahan yang berkaitan dengan Jaringan Komunikasi Data (jarkomdat) / VPN sehingga pelayanan terganggu',
    },
    {
        id: 3,
        kategori: 'Data',
        keterangan: 'Permasalahan Data yang tidak bisa diselesaikan via aplikasi SIAK Terpusat, perlu penanganan tim kalibata',
    },
    {
        id: 4,
        kategori: 'TTE/Layanan',
        keterangan: 'Permasalahan terkait Tanda tangan elektronik (TTE), gagal/tidak bisa di TTE/Gangguan BSrE',
    },
    {
        id: 5,
        kategori: 'Informasi',
        keterangan: 'Informasi terkait Pelayanan/SIAK Terpusat',
    },
])

watch(search, () => {
    currentPage.value = 1
})

const filteredData = computed(() => {
    return data.value.filter((item) =>
        item.kategori.toLowerCase().includes(search.value.toLowerCase())
    )
})

const totalPages = computed(() => {
    return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredData.value.slice(start, end)
})
</script>

<style scoped>
/* PrimeIcons for edit & delete (if needed) */
@import 'https://unpkg.com/primeicons/primeicons.css';

/* Table styling for light and dark modes */

table {
    background-color: #ffffff;
    /* Light mode background */
}

thead {
    background-color: #f7fafc;
    /* Light header background */
}

thead th {
    color: #2d3748;
    /* Dark text color for header */
}

tbody tr {
    background-color: #ffffff;
    /* Light mode row background */
}

tbody tr:hover {
    background-color: #f7fafc;
    /* Light mode row hover effect */
}

tbody td {
    color: #2d3748;
    /* Dark text color for rows */
}

.dark table {
    background-color: #1a202c;
    /* Dark mode background */
}

.dark thead {
    background-color: #2d3748;
    /* Darker header for dark mode */
}

.dark thead th {
    color: #edf2f7;
    /* Light text for dark mode header */
}

.dark tbody tr {
    background-color: #2d3748;
    /* Dark row background */
}

.dark tbody tr:hover {
    background-color: #4a5568;
    /* Dark mode hover effect */
}

.dark tbody td {
    color: #edf2f7;
    /* Light text for table data in dark mode */
}
</style>
