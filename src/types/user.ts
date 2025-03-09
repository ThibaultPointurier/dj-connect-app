export type UserRole = 'dj' | 'organisateur'

export interface DjProfile {
  id: number
  stageName: string
  musicStyle: string
}

export interface OrganizerProfile {
  id: number
  companyName: string
  phone: string
  address?: string
  establishmentType?: string
}

export interface User {
  id: number
  email: string
  role: UserRole
  profilePhoto?: string
  status?: string
  bio?: string
  isEmailVerified?: boolean
  dj?: DjProfile
  organizer?: OrganizerProfile
}

export interface ProfileFormData {
  bio?: string
  status?: string
  djProfile?: {
    stageName: string
    musicStyle: string
  }
  organizerProfile?: {
    companyName: string
    phone: string
    address?: string
    establishmentType?: string
  }
} 