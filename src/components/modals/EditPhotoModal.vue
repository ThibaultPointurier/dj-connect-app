<template>
  <Modal :show="show" @close="handleClose">
    <template #title>
      Modifier la photo de profil
    </template>
    
    <template #content>
      <div class="space-y-4">
        <div class="flex justify-center">
          <div class="relative group">
            <template v-if="previewUrl || currentPhoto">
              <img
                :src="previewUrl || currentPhoto"
                alt="Aperçu de la photo"
                class="w-32 h-32 rounded-full object-cover border-4 border-[#0077B6]"
              />
            </template>
            <template v-else>
              <AvatarInitials
                :name="displayName"
                size="lg"
                :type="userType"
                class="border-4 border-[#0077B6]"
              />
            </template>
            <div 
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            >
              <label class="cursor-pointer p-2 hover:scale-110 transition-transform">
                <input
                  type="file"
                  class="hidden"
                  accept="image/jpeg,image/png"
                  @change="handleFileChange"
                  :disabled="isUploading"
                />
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
        
        <div v-if="error" class="text-center">
          <p class="text-red-500 text-sm">{{ error }}</p>
        </div>
        
        <div class="text-sm text-gray-500 text-center space-y-1">
          <p>Formats acceptés : JPG, PNG</p>
          <p>Taille maximale : 2 Mo</p>
          <p>Dimensions recommandées : 400x400 pixels</p>
        </div>

        <div v-if="selectedFile" class="text-center text-sm text-gray-600">
          Fichier sélectionné : {{ selectedFile.name }}
        </div>
      </div>
    </template>

    <template #actions>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-[#0077B6] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#3D1E6D] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!selectedFile || isUploading"
        @click="handleUpload"
      >
        <template v-if="isUploading">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Envoi en cours...
        </template>
        <template v-else>
          Enregistrer
        </template>
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Modal from '@/components/modals/Modal.vue'
import AvatarInitials from '@/components/common/AvatarInitials.vue'
import { UploadService } from '@/services/upload.service'

const props = defineProps<{
  show: boolean
  currentPhoto?: string
  displayName: string
  userType: 'dj' | 'organisateur'
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', photoUrl: string): void
}>()

const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const error = ref<string | null>(null)
const isUploading = ref(false)
const uploadProgress = ref(0)

const validateFile = (file: File): boolean => {
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    error.value = 'Format de fichier non supporté. Utilisez JPG ou PNG.'
    return false
  }
  
  // Vérification de la taille (2Mo)
  if (file.size > 2 * 1024 * 1024) {
    error.value = 'La taille du fichier dépasse 2 Mo.'
    return false
  }

  return true
}

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return
  
  error.value = null
  uploadProgress.value = 0
  
  if (!validateFile(file)) {
    input.value = '' // Réinitialiser l'input
    return
  }

  // Vérifier les dimensions de l'image
  const img = new Image()
  img.src = URL.createObjectURL(file)
  
  img.onload = () => {
    URL.revokeObjectURL(img.src)
    if (img.width < 200 || img.height < 200) {
      error.value = 'L\'image doit faire au moins 200x200 pixels.'
      input.value = ''
      return
    }
    
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }

  img.onerror = () => {
    URL.revokeObjectURL(img.src)
    error.value = 'Impossible de lire l\'image.'
    input.value = ''
  }
}

const handleUpload = async () => {
  if (!selectedFile.value) return
  
  isUploading.value = true
  error.value = null
  uploadProgress.value = 0
  
  try {
    const { url } = await UploadService.uploadProfilePhoto(selectedFile.value)
    emit('update', url)
    handleClose()
  } catch (err: any) {
    error.value = err.message || 'Une erreur est survenue lors de l\'envoi de la photo.'
    console.error('Erreur lors de l\'upload:', err)
  } finally {
    isUploading.value = false
  }
}

const handleClose = () => {
  cleanup()
  emit('close')
}

const cleanup = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  selectedFile.value = null
  previewUrl.value = null
  error.value = null
  isUploading.value = false
  uploadProgress.value = 0
}

onMounted(() => {
  window.addEventListener('paste', handlePaste)
})

onBeforeUnmount(() => {
  window.removeEventListener('paste', handlePaste)
  cleanup()
})

const handlePaste = async (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return

  const imageItem = Array.from(items).find(item => item.type.startsWith('image/'))
  if (!imageItem) return

  const file = imageItem.getAsFile()
  if (!file) return

  error.value = null
  uploadProgress.value = 0
  
  if (!validateFile(file)) return

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}
</script> 