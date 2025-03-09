<template>
  <div class="w-12/12 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl text-[#1E1E1E] font-bold text-center mb-6">Connexion</h2>

    <form @submit.prevent="submitLogin">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-[#1E1E1E]">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-[#1E1E1E]">Mot de passe</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
        />
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
      </div>

      <button
        type="submit"
        class="w-full bg-[#3D1E6D] text-white py-2 px-4 rounded-lg hover:bg-[#0077B6] transition"
      >
        Se connecter
      </button>

    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from '@/stores/auth_store.ts'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

async function submitLogin() {
  try {
    errors.email = ''
    errors.password = ''

    await authStore.login(form.email, form.password)
    await router.push('/dashboard')
  } catch (error: any) {
    console.error(error)

    if (error?.response?.data?.message === 'Invalid user credentials') {
      errors.email = 'Identifiants invalides. Veuillez réessayer.'
    } else {
      errors.email = 'Une erreur est survenue. Veuillez réessayer plus tard.'
    }
  }
}

</script>
