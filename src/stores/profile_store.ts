import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, ProfileFormData } from '@/types/user'
import { api } from '@/services/api'

export const useProfileStore = defineStore('profile', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchUser = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/authentication/me')
      user.value = response.data
    } catch (err) {
      error.value = 'Erreur lors de la récupération du profil'
      console.error('Erreur lors de la récupération du profil:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (data: ProfileFormData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.put('/profile', data)
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour du profil'
      console.error('Erreur lors de la mise à jour du profil:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProfilePhoto = async (photoFile: File) => {
    isLoading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('photo', photoFile)
      
      const response = await api.post('/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de la photo'
      console.error('Erreur lors de la mise à jour de la photo:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    isLoading,
    error,
    fetchUser,
    updateProfile,
    updateProfilePhoto,
  }
}) 