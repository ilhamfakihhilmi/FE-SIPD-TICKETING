<template>
    <div class="bg-purple-100 dark:bg-purple-300 p-4 rounded-md">
        <p class="font-bold text-purple-900">Petunjuk Penggunaan Fitur Import :</p>
        <ol class="text-sm text-purple-800 list-decimal list-inside mt-2 space-y-1">
            <li>Untuk melakukan import data Propinsi, klik tombol <strong>Download Format</strong>.</li>
            <li>Isi data Propinsi dalam file Excel sesuai dengan kolom yang tersedia.</li>
            <li>Klik tombol <strong>Import</strong> dan pilih file Excel yang telah diisi dan disimpan.</li>
            <li>Klik <strong>Submit</strong> untuk mengunggah dan memproses data.</li>
            <li>Pastikan Anda sudah mengimpor data Propinsi sebelum melanjutkan ke fitur Kota/kabupaten.</li>
        </ol>
    </div>

    <div class="p-4 bg-white dark:bg-slate-800">
        <div class="flex flex-wrap gap-2 mb-4">
            <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-1">
                <i class="pi pi-download"></i> Unduh Format
            </button>
            <button class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded flex items-center gap-1">
                <i class="pi pi-upload"></i> Import
            </button>
            <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-1">
                <i class="pi pi-file-excel"></i> Export
            </button>
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1">
                <i class="pi pi-plus"></i> Tambah Provinsi
            </button>
        </div>

        <!-- <ImportInstruction /> -->

        <div class="mt-6 flex justify-between items-center">
            <div class="flex items-center gap-2 ">
                <span>Show</span>
                <select class="border rounded p-1 dark:text-gray-300 dark:bg-graydark">
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <label>Search: </label>
                <input class="border rounded p-1 dark:text-gray-300 dark:bg-graydark" placeholder="Search..." />
            </div>
        </div>

        <div class="mt-4 border rounded overflow-x-auto">
            <table class="min-w-full text-sm text-left text-gray-700">
                <thead class="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                        <th class="px-4 py-2">NO</th>
                        <th class="px-4 py-2">KODE PROVINSI</th>
                        <th class="px-4 py-2">PROVINSI</th>
                        <th class="px-4 py-2">FITUR</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" class="text-center px-4 py-6 text-gray-500">
                            Tidak ada data yang ditampilkan. Silakan gunakan filter untuk mencari data.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4 text-sm text-gray-500">
            Showing no records
        </div>
    </div>
</template>

<script setup>

</script>
