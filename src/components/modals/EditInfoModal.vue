<template>
  <Modal :show="show" @close="$emit('close')">
    <template #title>
      Modifier les informations
    </template>
    
    <template #content>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            v-model="formData.bio"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            placeholder="Parlez-nous de vous..."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Statut</label>
          <input
            type="text"
            v-model="formData.status"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            placeholder="Votre statut actuel"
          />
        </div>

        <!-- Champs spécifiques DJ -->
        <template v-if="user.role === 'dj'">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom de scène</label>
            <input
              type="text"
              v-model="formData.djProfile!.stageName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Style musical</label>
            <input
              type="text"
              v-model="formData.djProfile!.musicStyle"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
        </template>

        <!-- Champs spécifiques Organisateur -->
        <template v-if="user.role === 'organisateur'">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom de l'établissement</label>
            <input
              type="text"
              v-model="formData.organizerProfile!.companyName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              v-model="formData.organizerProfile!.phone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              v-model="formData.organizerProfile!.address"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Type d'établissement</label>
            <input
              type="text"
              v-model="formData.organizerProfile!.establishmentType"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </template>
      </form>
    </template>

    <template #actions>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        @click="handleSubmit"
      >
        Enregistrer
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/modals/Modal.vue'
import type { User, ProfileFormData } from '@/types/user'

const props = defineProps<{
  show: boolean
  user: User
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', data: ProfileFormData): void
}>()

const formData = ref<ProfileFormData>({
  bio: '',
  status: '',
  djProfile: {
    stageName: '',
    musicStyle: '',
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
    bio: props.user.bio || '',
    status: props.user.status || '',
    djProfile: props.user.role === 'dj' ? {
      stageName: props.user.dj?.stageName || '',
      musicStyle: props.user.dj?.musicStyle || '',
    } : undefined,
    organizerProfile: props.user.role === 'organisateur' ? {
      companyName: props.user.organizer?.companyName || '',
      phone: props.user.organizer?.phone || '',
      address: props.user.organizer?.address || '',
      establishmentType: props.user.organizer?.establishmentType || '',
    } : undefined,
  }
}

const handleSubmit = () => {
  emit('update', formData.value)
}

onMounted(() => {
  initializeForm()
})
</script> 