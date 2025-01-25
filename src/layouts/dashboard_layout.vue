<template>
    <main>
      <nav class="fixed bottom-0 left-0 right-0 flex justify-between items-center bg-white border-t border-gray-200 text-gray-600 shadow-sm z-50">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="group flex flex-col items-center justify-center w-full py-2 text-xs font-medium hover:bg-gray-50"
          :class="activeClass(item.to)"
        >
          <!-- Icône placée au-dessus du texte -->
          <component
            :is="item.icon"
            class="w-5 h-5 mb-1"
          />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
      <slot />
    </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import { CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { UserIcon } from '@heroicons/vue/24/outline'

const navItems = [
  { label: 'Recherche', to: '/recherche', icon: MagnifyingGlassIcon },
  { label: 'Publier',   to: '/publier',   icon: PlusCircleIcon },
  { label: 'Évènements',to: '/evenements',icon: CalendarDaysIcon },
  { label: 'Messages',  to: '/messages',  icon: ChatBubbleLeftRightIcon },
  { label: 'Profil',    to: '/profil',    icon: UserIcon }
]

const route = useRoute()

function activeClass(to) {
  const isActive = route.path === to
  return isActive
    ? 'text-blue-600 border-t-2 border-blue-600'
    : 'text-gray-600 border-t-2 border-transparent'
}
</script>
