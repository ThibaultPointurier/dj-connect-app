import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'

export class UploadService {
  static async uploadProfilePhoto(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('photo', file)

    try {
      const response = await axios.post(API_ENDPOINTS.profile.photo, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return response.data
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erreur lors de l\'upload de la photo'
      throw new Error(message)
    }
  }
} 