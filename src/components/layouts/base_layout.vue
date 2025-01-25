<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <!--
      main -> vous pouvez ajouter `relative` si le bouton retour (absolute)
      doit se positionner par rapport au bloc et non par rapport à l'écran
    -->
    <main class="w-11/12 max-w-md relative">
      <router-link
        v-if="showBackButton"
        class="bg-slate-100 absolute top-4 left-4 text-gray-700 hover:text-gray-900 text-sm py-1 px-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="button"
        to="/"
      >
        <!-- Icône "chevron" de retour -->
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

      <!-- Votre contenu -->
      <slot />
    </main>

    <!-- Footer éventuel -->
    <footer></footer>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const showBackButton = computed(() => {
  // Afficher le bouton de retour si on n'est pas sur la racine
  return route.path !== '/'
})
</script>
