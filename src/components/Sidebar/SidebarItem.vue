<template>
  <li>
    <router-link
      :to="props.item.route || '/default'" 
      class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
      @click.prevent="handleItemClick"
      :class="{ 'bg-graydark dark:bg-meta-4': isActive }"
    >
      <span v-html="props.item.icon"></span>
      {{ props.item.label }}

      <svg
        v-if="props.item.children"
        class="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
        :class="{ 'rotate-180': hasSelectedChild }" 
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
          fill=""
        />
      </svg>
    </router-link>

    <!-- Dropdown Menu -->
    <div v-show="isActive" class="translate transform overflow-hidden">
      <SidebarDropdown
        v-if="props.item.children && props.item.children.length > 0"
        :items="props.item.children"
        :currentPage="currentPage"
        :page="props.item.label"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSidebarStore } from '@/stores/sidebar';
import { useRoute } from 'vue-router';
import SidebarDropdown from './SidebarDropdown.vue';

// Define the SidebarItem interface
interface SidebarItem {
  label: string;
  route?: string; // Route is optional
  icon?: string; // Icon is optional
  children?: SidebarItem[]; // Children are optional
}

const sidebarStore = useSidebarStore();
const route = useRoute();

const props = defineProps<{
  item: SidebarItem; // Define props as SidebarItem
  index: number;
}>();

// Reactive property for current page
const currentPage = ref(route.name as string);

// Computed property to determine if the current item is active
const isActive = computed(() => sidebarStore.page === props.item.label);

// Handle item click
const handleItemClick = () => {
  const pageName = sidebarStore.page === props.item.label ? '' : props.item.label;
  sidebarStore.page = pageName; // Update the sidebar store with the current page
};

// Check if the item has children and is selected
const hasSelectedChild = computed(() => {
  return props.item.children?.some((child) => sidebarStore.selected === child.label) ?? false;
});
</script>

<style scoped>
/* Add styles specific to SidebarItem here if necessary */
</style>
