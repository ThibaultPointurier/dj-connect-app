<template>
  <div 
    class="rounded-full flex items-center justify-center text-white font-medium"
    :class="[size, backgroundColor]"
    :style="{ fontSize: fontSize }"
  >
    {{ initials }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'dj' | 'organisateur'
}>()

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-24 h-24'
}

const fontSizes = {
  sm: '0.875rem',
  md: '1.25rem',
  lg: '3rem'
}

const backgroundColors = {
  dj: 'bg-gradient-to-br from-[#3D1E6D] to-[#0077B6]',
  organisateur: 'bg-gradient-to-br from-[#0077B6] to-[#1E1E1E]'
}

const size = computed(() => sizeClasses[props.size || 'md'])
const fontSize = computed(() => fontSizes[props.size || 'md'])
const backgroundColor = computed(() => backgroundColors[props.type || 'dj'])

const initials = computed(() => {
  const words = props.name.trim().split(/\s+/)
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }
  return words[0].slice(0, 2).toUpperCase()
})
</script> 