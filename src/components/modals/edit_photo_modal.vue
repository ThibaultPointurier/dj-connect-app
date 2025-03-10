<template>
  <Modal :show="show" @close="handleClose">
    <template #title>
      <h2 class="text-xl font-semibold text-gray-800">Modifier la photo de profil</h2>
    </template>
    
    <template #content>
      <div class="space-y-6">
        <div class="flex justify-center">
          <div class="relative group">
            <template v-if="currentPhoto || previewUrl">
              <img
                :src="currentPhoto || previewUrl || ''"
                alt="Aperçu de la photo"
                class="w-36 h-36 rounded-full object-cover border-4 border-[#0077B6] shadow-lg transition-all duration-300 hover:shadow-xl"
              />
            </template>
            <template v-else>
              <AvatarInitials
                :name="displayName"
                size="lg"
                :type="userType"
                class="w-36 h-36 border-4 border-[#0077B6] shadow-lg transition-all duration-300 hover:shadow-xl"
              />
            </template>
            <div 
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-full"
            >
              <label class="cursor-pointer p-3 bg-white/20 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200">
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
        
        <div v-if="error" class="text-center animate-fade-in">
          <p class="text-red-500 text-sm bg-red-50 py-2 px-4 rounded-lg">{{ error }}</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg space-y-2">
          <h3 class="font-medium text-gray-700 mb-2">Spécifications de l'image</h3>
          <div class="text-sm text-gray-600 space-y-1.5">
            <p class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Formats acceptés : JPG, PNG
            </p>
            <p class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Taille maximale : 2 Mo
            </p>
            <p class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Dimensions recommandées : 400x400 pixels
            </p>
          </div>
        </div>

        <div v-if="selectedFile" class="text-center">
          <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ selectedFile.name }}
          </span>
        </div>
      </div>
    </template>

    <template #actions>
      <button
        type="button"
        class="inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-[#0077B6] to-[#0096C7] px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:from-[#0096C7] hover:to-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
import Modal from '@/components/modals/modal.vue'
import AvatarInitials from '@/components/common/initials_avatar.vue'
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
    const response = await UploadService.uploadProfilePhoto(selectedFile.value)
    
    // Extraire l'URL de la photo de la réponse
    let photoUrl = null
    if (props.userType === 'dj' && response.dj?.profilePhoto) {
      photoUrl = response.dj.profilePhoto
    } else if (props.userType === 'organisateur' && response.organizer?.profilePhoto) {
      photoUrl = response.organizer.profilePhoto
    }

    if (!photoUrl) {
      throw new Error('URL de la photo non reçue')
    }
    
    emit('update', photoUrl)
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