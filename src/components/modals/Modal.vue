<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <!-- Overlay -->
          <Transition name="modal-backdrop">
            <div 
              class="fixed inset-0 bg-opacity-10 backdrop-blur-xs transition-opacity" 
              @click="$emit('close')"
              aria-hidden="true"
            />
          </Transition>

          <!-- Modal panel -->
          <Transition name="modal-content">
            <div 
              class="relative transform overflow-hidden rounded-lg bg-white/95 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg backdrop-blur-md"
              @click.stop
            >
              <!-- Header -->
              <div class="bg-white/80 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="text-lg font-medium text-gray-900 mb-4">
                  <slot name="title" />
                </div>

                <!-- Content -->
                <div>
                  <slot name="content" />
                </div>
              </div>

              <!-- Footer -->
              <div class="bg-gray-50/90 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 space-x-2 space-x-reverse">
                <slot name="actions" />
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="$emit('close')"
                >
                  Annuler
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease-out;
}

.modal-content-leave-active {
  transition: all 0.2s ease-in;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 