export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/authentication/login`,
    register: `${API_BASE_URL}/authentication/register`,
    me: `${API_BASE_URL}/authentication/me`,
  },
  profile: {
    update: `${API_BASE_URL}/profile`,
    photo: `${API_BASE_URL}/profile/photo`,
  },
}

export const setupAxios = (axios: any) => {
  axios.defaults.baseURL = API_BASE_URL
  
  // Intercepteur pour gérer les erreurs globalement
  axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        // Gérer la déconnexion automatique
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
} 