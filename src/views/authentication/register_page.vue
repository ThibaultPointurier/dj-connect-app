<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#1E1E1E]">Inscription</h2>

      <form @submit.prevent="submitFirstStep">
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

        <div class="mb-4">
          <label for="password_confirmation" class="block text-sm font-medium text-[#1E1E1E]">Confirmez le mot de passe</label>
          <input
            v-model="form.password_confirmation"
            type="password"
            id="password_confirmation"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
          />
          <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
        </div>

        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-[#1E1E1E]">Rôle</label>
          <select
            id="role"
            v-model="form.role"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
          >
            <option value="dj">DJ</option>
            <option value="organisateur">Organisateur</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-[#3D1E6D] text-white py-2 px-4 rounded-lg hover:bg-[#0077B6] transition"
        >
          Inscription
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

interface FormStep1 {
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

interface ApiError {
  message: string;
  rule: string;
  field: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
}

const form = ref<FormStep1>({
  email: '',
  password: '',
  password_confirmation: '',
  role: 'dj',
});

const errors = ref<{ [key: string]: string }>({});

const router = useRouter();

async function submitFirstStep() {
  errors.value = {}; // Reset errors
  try {
    await axios.post('http://localhost:3333/authentication/register', {
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
      role: form.value.role,
    });
    await router.push('/authentication/login');
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const apiErrorResponse = error.response.data as ApiErrorResponse;

      if (Array.isArray(apiErrorResponse.errors)) {
        for (const err of apiErrorResponse.errors) {
          errors.value[err.field] = err.message; // Map errors to fields
        }
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
</script>
