<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6 text-[#1E1E1E]">Inscription</h2>

      <!-- Étape 1 -->
      <form v-if="currentStep === 1" @submit.prevent="submitFirstStep">
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
          Suivant
        </button>
      </form>

      <!-- Étape 2 -->
      <form v-if="currentStep === 2" @submit.prevent="submitSecondStep">
        <!-- Champs pour DJ -->
        <template v-if="form.role === 'dj'">
          <div class="mb-4">
            <label for="nom_scene" class="block text-sm font-medium text-[#1E1E1E]">Nom de scène</label>
            <input
              v-model="formStep2.nom_scene"
              type="text"
              id="nom_scene"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
            <p v-if="errors.nom_scene" class="text-red-500 text-sm mt-1">{{ errors.nom_scene }}</p>
          </div>

          <div class="mb-4">
            <label for="genres" class="block text-sm font-medium text-[#1E1E1E]">Genres musicaux</label>
            <input
              v-model="formStep2.genres"
              type="text"
              id="genres"
              placeholder="House, Techno, etc."
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
          </div>

          <div class="mb-4">
            <label for="experience" class="block text-sm font-medium text-[#1E1E1E]">Années d'expérience</label>
            <input
              v-model="formStep2.experience"
              type="number"
              id="experience"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
          </div>
        </template>

        <!-- Champs pour Organisateur -->
        <template v-if="form.role === 'organisateur'">
          <div class="mb-4">
            <label for="nom_societe" class="block text-sm font-medium text-[#1E1E1E]">Nom de la société</label>
            <input
              v-model="formStep2.nom_societe"
              type="text"
              id="nom_societe"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
          </div>

          <div class="mb-4">
            <label for="siret" class="block text-sm font-medium text-[#1E1E1E]">Numéro SIRET</label>
            <input
              v-model="formStep2.siret"
              type="text"
              id="siret"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
          </div>

          <div class="mb-4">
            <label for="telephone" class="block text-sm font-medium text-[#1E1E1E]">Téléphone</label>
            <input
              v-model="formStep2.telephone"
              type="tel"
              id="telephone"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-[#1E1E1E] border-[#D9D9D9] focus:outline-none focus:ring-[#0077B6] focus:border-[#0077B6]"
            />
          </div>
        </template>

        <div class="flex gap-4">
          <button
            type="button"
            @click="currentStep = 1"
            class="w-1/2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Retour
          </button>
          <button
            type="submit"
            class="w-1/2 bg-[#3D1E6D] text-white py-2 px-4 rounded-lg hover:bg-[#0077B6] transition"
          >
            S'inscrire
          </button>
        </div>
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

interface FormStep2DJ {
  nom_scene: string;
  genres: string;
  experience: number;
}

interface FormStep2Organisateur {
  nom_societe: string;
  siret: string;
  telephone: string;
}

interface ApiError {
  message: string;
  rule: string;
  field: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
}

const currentStep = ref(1);

const form = ref<FormStep1>({
  email: '',
  password: '',
  password_confirmation: '',
  role: 'dj',
});

const formStep2 = ref<Partial<FormStep2DJ & FormStep2Organisateur>>({});

const errors = ref<{ [key: string]: string }>({});

const router = useRouter();

async function submitFirstStep() {
  errors.value = {};
  try {
    // Validation basique
    if (!form.value.email || !form.value.password || !form.value.password_confirmation) {
      errors.value = { form: 'Veuillez remplir tous les champs' };
      return;
    }
    if (form.value.password !== form.value.password_confirmation) {
      errors.value = { password_confirmation: 'Les mots de passe ne correspondent pas' };
      return;
    }
    currentStep.value = 2;
  } catch (error) {
    console.error('Erreur:', error);
  }
}

async function submitSecondStep() {
  errors.value = {};
  try {
    const registrationData = {
      ...form.value,
      djProfile: form.value.role === 'dj' ? {
        stage_name: formStep2.value.nom_scene,
        genres: formStep2.value.genres,
        years_of_experience: formStep2.value.experience
      } : undefined,
      organizerProfile: form.value.role === 'organisateur' ? {
        company_name: formStep2.value.nom_societe,
        siret: formStep2.value.siret,
        phone: formStep2.value.telephone
      } : undefined
    };

    await axios.post('http://localhost:3333/authentication/register', registrationData);
    await router.push('/authentication/login');
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data) {
      const apiErrorResponse = error.response.data as ApiErrorResponse;
      if (Array.isArray(apiErrorResponse.errors)) {
        for (const err of apiErrorResponse.errors) {
          errors.value[err.field] = err.message;
        }
      }
    } else {
      console.error('Erreur inattendue:', error);
    }
  }
}
</script>
