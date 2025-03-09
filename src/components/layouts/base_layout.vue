<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <main class="w-11/12 max-w-md relative">
      <router-link
        v-if="showBackButton"
        class="bg-slate-100 absolute top-4 left-4 text-gray-700 hover:text-gray-900 text-sm py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="button"
        to="/"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 12H18M6 12L11 7M6 12L11 17"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>

      <slot />
    </main>

    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth_store'

const route = useRoute()
const authStore = useAuthStore()

const showBackButton = computed(() => {
  return route.name !== 'home'
})
</script>
