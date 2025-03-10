import { defineStore } from 'pinia'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

interface User {
  id: number
  email: string
  role: 'dj' | 'organisateur'
  profilePhoto?: string
  status?: string
  bio?: string
  isEmailVerified?: boolean
  dj?: {
    id: number
    stageName: string
    genres: string
    profilePhoto?: string
  }
  organizer?: {
    id: number
    companyName: string
    phone: string
    address?: string
    profilePhoto?: string
    establishmentType?: string
  }
}

interface ApiResponse<T> {
  message: string
  data?: T
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth_token') || '',
    user: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isDj: (state) => state.user?.role === 'dj',
    isOrganizer: (state) => state.user?.role === 'organisateur',
    profile: (state) => state.user?.role === 'dj' ? state.user.dj : state.user?.organizer,
  },

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    },

    setError(error: string | null) {
      this.error = error
    },

    initializeAxiosToken() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    },

    async login(email: string, password: string) {
      this.setLoading(true)
      this.setError(null)
      try {
        const response = await axios.post(API_ENDPOINTS.auth.login, { email, password })
        const { token, user, message } = response.data
        
        this.token = token
        this.user = user

        localStorage.setItem('auth_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return { message }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la connexion.'
        this.setError(errorMessage)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async register(data: {
      email: string
      password: string
      password_confirmation: string
      role: 'dj' | 'organisateur'
      djProfile?: { stageName: string; musicStyle: string }
      organizerProfile?: { companyName: string; phone: string }
    }) {
      this.setLoading(true)
      this.setError(null)
      try {
        const response = await axios.post(API_ENDPOINTS.auth.register, data)
        const { token, user, message } = response.data

        this.token = token
        this.user = user

        localStorage.setItem('auth_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return { message }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription.'
        this.setError(errorMessage)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async fetchUser() {
      this.setLoading(true)
      this.setError(null)
      try {
        this.initializeAxiosToken()
        
        if (!this.token) {
          throw new Error('Aucun token d\'authentification trouvé')
        }

        const response = await axios.get(API_ENDPOINTS.auth.me)
        this.user = response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la récupération du profil.'
        this.setError(errorMessage)
        this.logout()
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    logout() {
      this.token = ''
      this.user = null
      this.error = null
      localStorage.removeItem('auth_token')
      delete axios.defaults.headers.common['Authorization']
    },

    async updateProfile(data: any) {
      this.setLoading(true)
      this.setError(null)
      try {
        const response = await axios.put(API_ENDPOINTS.profile.update, data)
        this.user = response.data
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du profil.'
        this.setError(errorMessage)
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async updateProfilePhoto(photoUrl: string) {
      this.setLoading(true)
      this.setError(null)
      try {
        const response = await axios.put(API_ENDPOINTS.profile.update, {
          profilePhoto: photoUrl
        })
        
        if (this.user) {
          this.user = {
            ...this.user,
            profilePhoto: photoUrl
          }
        }
        
        return response.data
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour de la photo.'
        this.setError(errorMessage)
        throw error
      } finally {
        this.setLoading(false)
      }
    },
  },
})
