<template>
  <Modal :show="show" @close="$emit('close')" class="max-w-2xl mx-auto">
    <template #title>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Modifier les informations</h2>
    </template>
    
    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200">
          <div class="p-5">
            <label class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              v-model="formData.bio"
              rows="3"
              class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 placeholder:text-gray-500 text-sm bg-transparent"
              placeholder="Parlez-nous de vous..."
            />
          </div>
          <div class="h-px bg-gray-200"></div>
          <div class="p-5">
            <label class="block text-sm font-medium text-gray-700">Statut</label>
            <input
              type="text"
              v-model="formData.status"
              class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 placeholder:text-gray-500 text-sm bg-transparent"
              placeholder="Votre statut actuel"
            />
          </div>
        </div>

        <!-- Champs spécifiques DJ -->
        <transition name="fade">
          <div v-if="user.role === 'dj'" class="space-y-4">
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Nom de scène</label>
                <input
                  type="text"
                  v-model="formData.djProfile!.stageName"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                  required
                />
              </div>
            </div>
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Style musical</label>
                <input
                  type="text"
                  v-model="formData.djProfile!.genres"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                  placeholder="Parlez-nous de vous..."
                  required
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- Champs spécifiques Organisateur -->
        <transition name="fade">
          <div v-if="user.role === 'organisateur'" class="space-y-4">
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Nom de l'établissement</label>
                <input
                  type="text"
                  v-model="formData.organizerProfile!.companyName"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                  required
                />
              </div>
            </div>
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  v-model="formData.organizerProfile!.phone"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                  required
                />
              </div>
            </div>
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Adresse</label>
                <input
                  type="text"
                  v-model="formData.organizerProfile!.address"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                />
              </div>
            </div>
            <div class="bg-gray-50/50 rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500/50 hover:bg-white transition-all duration-200">
              <div class="p-5">
                <label class="block text-sm font-medium text-gray-700">Type d'établissement</label>
                <input
                  type="text"
                  v-model="formData.organizerProfile!.establishmentType"
                  class="mt-1 block w-full border-0 focus:ring-0 text-gray-900 text-sm bg-transparent"
                />
              </div>
            </div>
          </div>
        </transition>
      </form>
    </template>

    <template #actions>
      <div class="mt-6">
        <div v-if="error" class="mb-4 text-red-600 text-sm">
          {{ error }}
        </div>
        <button
          type="button"
          class="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleSubmit"
          :disabled="loading"
        >
          <span v-if="loading">Enregistrement en cours...</span>
          <span v-else>Enregistrer</span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/modals/modal.vue'
import type { User, ProfileFormData } from '@/types/user'
import { userService } from '@/services/userService'

const props = defineProps<{
  show: boolean
  user: User
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', data: ProfileFormData): void
}>()

const loading = ref(false)
const error = ref<string | null>(null)

const formData = ref<ProfileFormData>({
  bio: '',
  status: '',
  djProfile: {
    stageName: '',
    genres: '',
  },
  organizerProfile: {
    companyName: '',
    phone: '',
    address: '',
    establishmentType: '',
  },
})

const initializeForm = () => {
  formData.value = {
    bio: props.user.dj?.bio || props.user.organizer?.bio || '',
    status: props.user.status || '',
    djProfile: props.user.role === 'dj' ? {
      stageName: props.user.dj?.stageName || '',
      genres: props.user.dj?.genres || '',
    } : undefined,
    organizerProfile: props.user.role === 'organisateur' ? {
      companyName: props.user.organizer?.companyName || '',
      phone: props.user.organizer?.phone || '',
      address: props.user.organizer?.address || '',
      establishmentType: props.user.organizer?.establishmentType || '',
    } : undefined,
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    await userService.updateProfile(props.user.id.toString(), formData.value)
    emit('update', formData.value)
    emit('close')
  } catch (err) {
    error.value = "Une erreur est survenue lors de la mise à jour du profil"
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Style pour les inputs */
input:focus, textarea:focus {
  outline: none;
}

input, textarea {
  background-color: transparent;
}

.bg-gray-50\/50 {
  background-color: rgba(249, 250, 251, 0.5);
}
</style> 