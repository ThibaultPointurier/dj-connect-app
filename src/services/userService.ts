import type { ProfileFormData } from '@/types/user'
import { api } from './api'

export const userService = {
  async updateProfile(userId: string, data: ProfileFormData) {
    try {
      const response = await api.put(`/profile`, data)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error)
      throw error
    }
  },

  async uploadProfilePhoto(formData: FormData) {
    try {
      const response = await api.post('/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Erreur lors du téléchargement de la photo:', error)
      throw error
    }
  }
} 