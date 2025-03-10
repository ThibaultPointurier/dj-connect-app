<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3D1E6D]"></div>
    </div>

    <template v-else-if="user">
      <!-- En-tête avec navigation -->
      <div class="bg-white border-b border-gray-100">
        <div class="max-w-4xl mx-auto px-4">
          <div class="flex items-center justify-center h-16">
            <div class="flex space-x-8">
              <button 
                @click="activeTab = 'about'"
                class="relative py-4 text-sm font-medium transition-colors"
                :class="activeTab === 'about' ? 'text-[#3D1E6D]' : 'text-gray-500 hover:text-[#3D1E6D]'"
              >
                À propos de vous
                <div 
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-[#3D1E6D] transition-transform duration-200"
                  :class="activeTab === 'about' ? 'scale-x-100' : 'scale-x-0'"
                ></div>
              </button>
              <button 
                @click="activeTab = 'account'"
                class="relative py-4 text-sm font-medium transition-colors"
                :class="activeTab === 'account' ? 'text-[#3D1E6D]' : 'text-gray-500 hover:text-[#3D1E6D]'"
              >
                Compte
                <div 
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-[#3D1E6D] transition-transform duration-200"
                  :class="activeTab === 'account' ? 'scale-x-100' : 'scale-x-0'"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="max-w-4xl mx-auto px-4 py-8">
        <!-- Section profil -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-6">
              <div class="relative">
                <template v-if="user.role === 'dj' ? user.dj?.profilePhoto : user.organizer?.profilePhoto">
                  <img
                    :src="profilePhotoUrl"
                    :alt="'Photo de profil de ' + displayName"
                    class="w-28 h-28 rounded-full object-cover border-4 border-[#3D1E6D] shadow-lg"
                  />
                </template>
                <template v-else>
                  <AvatarInitials
                    :name="displayName"
                    size="lg"
                    :type="user.role"
                    class="w-28 h-28 border-4 border-[#3D1E6D] shadow-lg"
                  />
                </template>
                <button @click="openEditPhotoModal" class="absolute bottom-0 right-0 bg-[#3D1E6D] rounded-full p-2 text-white hover:bg-[#2A1650] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-[#3D1E6D]">{{ displayName }}</h2>
                <div class="flex items-center space-x-2 mt-1">
                  <span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{{ roleLabel }}</span>
                  <span v-if="user.status" class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">{{ user.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <button @click="openEditInfoModal" class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span class="text-gray-700 font-medium">Modifier les informations personnelles</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Section informations vérifiées -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 class="text-xl font-bold text-[#3D1E6D] mb-6">Profil Vérifié</h3>
          <div class="space-y-4">
            <div class="flex items-center p-4 bg-gray-50 rounded-lg">
              <div class="w-10 h-10 rounded-full bg-[#3D1E6D] flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-gray-700">{{ user.email }}</span>
            </div>

            <template v-if="user.role === 'organisateur' && user.organizer">
              <div v-if="user.organizer.phone" class="flex items-center p-4 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 rounded-full bg-[#3D1E6D] flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-gray-700">{{ user.organizer.phone }}</span>
              </div>

              <div class="flex items-center p-4 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 rounded-full bg-[#3D1E6D] flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-gray-700">Licence commerciale vérifiée</span>
              </div>

              <div v-if="user.organizer.address" class="flex items-center p-4 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 rounded-full bg-[#3D1E6D] flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-gray-700">Adresse vérifiée</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Section À propos -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h3 class="text-xl font-bold text-[#3D1E6D] mb-6">À propos de vous</h3>
          
          <div v-if="user.dj?.bio || user.organizer?.bio" class="text-gray-700 leading-relaxed mb-6">
            {{ user.dj?.bio || user.organizer?.bio }}
          </div>

          <template v-if="user.role === 'dj' && user.dj">
            <div class="mt-6">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-3">Genres musicaux</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="genre in genres" :key="genre" class="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                  {{ genre }}
                </span>
              </div>
            </div>
          </template>

          <template v-if="user.role === 'organisateur' && user.organizer">
            <div class="mt-6">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-3">Type d'établissement</h4>
              <p class="text-gray-700">{{ user.organizer.establishmentType || 'Non spécifié' }}</p>
            </div>
            <div class="mt-6">
              <h4 class="text-lg font-semibold text-[#3D1E6D] mb-3">Adresse</h4>
              <p class="text-gray-700">{{ user.organizer.address || 'Non spécifiée' }}</p>
            </div>
          </template>
        </div>
      </div>

      <EditPhotoModal
        v-if="showEditPhotoModal"
        :show="showEditPhotoModal"
        :current-photo="profilePhotoUrl"
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

    <div v-else class="flex flex-col items-center justify-center h-screen">
      <p class="text-red-500 mb-4">Une erreur est survenue lors du chargement du profil.</p>
      <button 
        @click="fetchUserData" 
        class="px-6 py-3 bg-[#3D1E6D] text-white rounded-lg hover:bg-[#2A1650] transition-colors"
      >
        Réessayer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth_store'
import EditPhotoModal from '@/components/modals/edit_photo_modal.vue'
import EditInfoModal from '@/components/modals/edit_info_modal.vue'
import type { User, ProfileFormData } from '@/types/user'
import AvatarInitials from '@/components/common/initials_avatar.vue'

const authStore = useAuthStore()
const defaultProfilePhoto = '/default-avatar.png'
const showEditPhotoModal = ref(false)
const showEditInfoModal = ref(false)
const isLoading = ref(true)
const activeTab = ref('about')

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

const genres = computed(() => {
  if (!user.value?.dj?.genres) return []
  return user.value.dj.genres.split(',').map(genre => genre.trim())
})

const roleLabel = computed(() => {
  return user.value?.role === 'dj' ? 'DJ' : 'Organisation'
})

const profilePhotoUrl = computed(() => {
  if (!user.value) return defaultProfilePhoto
  
  let photo = null
  if (user.value.role === 'dj' && user.value.dj) {
    photo = user.value.dj.profilePhoto
  } else if (user.value.role === 'organisateur' && user.value.organizer) {
    photo = user.value.organizer.profilePhoto
  }
  
  if (!photo) return defaultProfilePhoto
  
  if (photo.startsWith('http')) {
    return photo
  }
  
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333'
  return `${apiBaseUrl}${photo}`
})

const openEditPhotoModal = () => {
  showEditPhotoModal.value = true
}

const openEditInfoModal = () => {
  showEditInfoModal.value = true
}

const handlePhotoUpdate = async (photoUrl: string) => {
  try {
    await authStore.updateProfilePhoto(photoUrl)
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
