<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {computed} from "vue";
import BaseLayout from "@/layouts/base_layout.vue";
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout || BaseLayout
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="layout">
      <component :is="Component" />
    </component>
  </RouterView>
</template>
