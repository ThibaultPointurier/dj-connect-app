export type UserRole = 'dj' | 'organisateur'

export interface DjProfile {
  id: number
  userId: number
  stageName: string
  genres: string
  musicStyle: string
  yearsOfExperience: number
  profilePhoto: string | null
  createdAt: string
  updatedAt: string
}

export interface OrganizerProfile {
  id: number
  userId: number
  companyName: string
  siret: string
  phone: string
  address: string | null
  establishmentType: string | null
  profilePhoto: string | null
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  email: string
  role: 'dj' | 'organisateur'
  profilePhoto?: string
  status?: string
  isEmailVerified?: boolean
  dj?: {
    id: number
    stageName: string
    genres: string
    bio?: string
    profilePhoto?: string
  }
  organizer?: {
    id: number
    companyName: string
    phone: string
    bio?: string
    address?: string
    profilePhoto?: string
    establishmentType?: string
  }
}

export interface ProfileFormData {
  bio?: string
  status?: string
  djProfile?: {
    stageName?: string
    genres?: string
    musicStyle?: string
  }
  organizerProfile?: {
    companyName?: string
    phone?: string
    address?: string
    establishmentType?: string
  }
} 