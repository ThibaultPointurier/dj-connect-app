<template>
  <div class="w-full min-h-screen bg-white">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-900"></div>
    </div>

    <template v-else-if="user">
      <div class="flex justify-between items-center h-14 border-b">
        <div class="relative flex-1 flex justify-center">
          <div class="relative pb-3 w-40 text-center">
            <h1 class="text-lg font-semibold text-[#3D1E6D]">À propos de vous</h1>
            <div class="absolute -bottom-[1px] left-0 w-full h-0.5 bg-[#3D1E6D]"></div>
          </div>
        </div>
        <div class="relative flex-1 flex justify-center">
          <div class="relative pb-3 w-40 text-center">
            <h1 class="text-lg text-[#D9D9D9] cursor-pointer hover:text-[#1E1E1E]">Compte</h1>
          </div>
        </div>
      </div>

      <div class="p-4">
        <!-- Section profil principal -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="relative">
              <template v-if="user.profilePhoto">
                <img
                  :src="user.profilePhoto"
                  :alt="'Photo de profil de ' + displayName"
                  class="w-10 h-10 rounded-full object-cover border-4 border-[#0077B6]"
                />
              </template>
              <template v-else>
                <AvatarInitials
                  :name="displayName"
                  size="lg"
                  :type="user.role"
                  class="border-4 border-[#0077B6]"
                />
              </template>
              <div class="absolute bottom-0 right-0 bg-[#0077B6] rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-[#3D1E6D]">{{ displayName }}</h2>
              <div class="flex items-center">
                <span class="text-[#1E1E1E]">{{ roleLabel }}</span>
                <span v-if="user.status" class="ml-2 text-[#1E1E1E]">• {{ user.status }}</span>
              </div>
            </div>
          </div>
          <button class="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Options de modification -->
        <button @click="openEditPhotoModal" class="w-full text-left text-[#0077B6] text-lg font-medium mb-4">
          Modifier la photo de profil
        </button>
        <button @click="openEditInfoModal" class="w-full text-left text-[#0077B6] text-lg font-medium mb-8">
          Modifier les informations personnelles
        </button>

        <!-- Section Profil Vérifié -->
        <div class="mb-8">
          <h3 class="text-2xl font-bold text-[#3D1E6D] mb-4">Profil Vérifié</h3>
          <div class="space-y-4">
            <!-- Email vérifié -->
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-[#1E1E1E]">{{ user.email }}</span>
            </div>

            <!-- Téléphone vérifié (pour les organisateurs) -->
            <div v-if="user.role === 'organisateur' && user.organizer?.phone" class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-[#1E1E1E]">{{ user.organizer.phone }}</span>
            </div>

            <!-- Informations spécifiques aux organisateurs -->
            <template v-if="user.role === 'organisateur' && user.organizer">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-[#1E1E1E]">Licence commerciale vérifiée</span>
              </div>
              <div v-if="user.organizer.address" class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-[#0077B6] flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-[#1E1E1E]">Adresse vérifiée</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Section À propos -->
        <div class="mb-4">
          <h3 class="text-2xl font-bold text-[#3D1E6D] mb-4">À propos de vous</h3>
          <div v-if="user.bio" class="text-[#1E1E1E] mb-4">
            {{ user.bio }}
          </div>
          <button v-else @click="openEditInfoModal" class="flex items-center text-[#0077B6] text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter une minibio
          </button>

          <!-- Informations spécifiques DJ -->
          <template v-if="user.role === 'dj' && user.dj">
            <div class="mt-4">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-2">Style musical</h4>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-[#D9D9D9] rounded-full text-sm text-[#1E1E1E]">
                  {{ user.dj.musicStyle }}
                </span>
              </div>
            </div>
          </template>

          <!-- Informations spécifiques Organisateur -->
          <template v-if="user.role === 'organisateur' && user.organizer">
            <div class="mt-4">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-2">Type d'établissement</h4>
              <p class="text-[#1E1E1E]">{{ user.organizer.establishmentType || 'Non spécifié' }}</p>
            </div>
            <div class="mt-4">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-2">Adresse</h4>
              <p class="text-[#1E1E1E]">{{ user.organizer.address || 'Non spécifiée' }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- Modaux -->
      <EditPhotoModal
        v-if="showEditPhotoModal"
        :show="showEditPhotoModal"
        :current-photo="user?.profilePhoto"
        :display-name="displayName"
        :user-type="user.role"
        @close="showEditPhotoModal = false"
        @update="handlePhotoUpdate"
      />

      <EditInfoModal
        v-if="showEditInfoModal"
        :show="showEditInfoModal"
        :user="user"
        @close="showEditInfoModal = false"
        @update="handleInfoUpdate"
      />
    </template>

    <!-- Error state -->
    <div v-else class="flex flex-col items-center justify-center h-screen">
      <p class="text-red-500 mb-4">Une erreur est survenue lors du chargement du profil.</p>
      <button 
        @click="fetchUserData" 
        class="px-4 py-2 bg-[#3D1E6D] text-white rounded hover:bg-[#0077B6]"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth_store'
import EditPhotoModal from '@/components/modals/EditPhotoModal.vue'
import EditInfoModal from '@/components/modals/EditInfoModal.vue'
import { CheckIcon, PlusIcon } from '@heroicons/vue/solid'
import type { User, ProfileFormData } from '@/types/user'
import AvatarInitials from '@/components/common/AvatarInitials.vue'

const authStore = useAuthStore()
const defaultProfilePhoto = '/default-avatar.png'
const showEditPhotoModal = ref(false)
const showEditInfoModal = ref(false)
const isLoading = ref(true)

const fetchUserData = async () => {
  isLoading.value = true
  try {
    await authStore.fetchUser()
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error)
  } finally {
    isLoading.value = false
  }
}

// Computed properties
const user = computed(() => authStore.user)

const displayName = computed(() => {
  if (!user.value) return ''
  
  if (user.value.role === 'dj' && user.value.dj) {
    return user.value.dj.stageName
  }
  
  if (user.value.role === 'organisateur' && user.value.organizer) {
    return user.value.organizer.companyName
  }
  
  return 'Utilisateur'
})

const roleLabel = computed(() => {
  return user.value?.role === 'dj' ? 'DJ' : 'Organisation'
})

const profilePhotoUrl = computed(() => {
  return user.value?.profilePhoto || defaultProfilePhoto
})

// Event handlers
const openEditPhotoModal = () => {
  showEditPhotoModal.value = true
}

const openEditInfoModal = () => {
  showEditInfoModal.value = true
}

const handlePhotoUpdate = async (photo: File) => {
  try {
    await authStore.updateProfilePhoto(photo)
    showEditPhotoModal.value = false
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la photo:', error)
  }
}

const handleInfoUpdate = async (updatedInfo: ProfileFormData) => {
  try {
    await authStore.updateProfile(updatedInfo)
    showEditInfoModal.value = false
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations:', error)
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
