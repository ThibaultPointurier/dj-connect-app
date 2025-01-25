<template>
  <div class="w-12/12 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold text-center mb-6 text-slate-600">Inscription</h2>

    <!-- Étape 1 -->
    <div v-if="step === 1">
      <form @submit.prevent="submitFirstStep">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="formStep1.email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="formStep1.password"
            type="password"
            id="password"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
          <select
            id="role"
            v-model="formStep1.role"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="dj">DJ</option>
            <option value="organisateur">Organisateur</option>
          </select>
          <p class="text-red-500 text-sm mt-1"></p>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
        >
          Suivant
        </button>
      </form>
    </div>

    <!-- Étape 2 -->
    <div v-else-if="step === 2">
      <form @submit.prevent="submitSecondStep">
        <!-- Champs spécifiques selon le rôle -->
        <div v-if="formStep1.role === 'dj'">
          <div class="mb-4">
            <label for="stageName" class="block text-sm font-medium text-gray-700"
              >Nom de scène</label
            >
            <input
              v-model="formStep2.stageName"
              type="text"
              id="stageName"
              class="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div class="mb-4">
            <label for="musicStyle" class="block text-sm font-medium text-gray-700"
              >Style musical</label
            >
            <input
              v-model="formStep2.musicStyle"
              type="text"
              id="musicStyle"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div v-else>
          <div class="mb-4">
            <label for="companyName" class="block text-sm font-medium text-gray-700"
              >Nom de l'entreprise</label
            >
            <input
              v-model="formStep2.companyName"
              type="text"
              id="companyName"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              v-model="formStep2.phone"
              type="text"
              id="phone"
              class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
        >
          S'inscrire
        </button>
      </form>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-center text-sm mt-4">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formStep1 = ref({
  email: '',
  password: '',
  role: 'dj', // Par défaut
})

const formStep2 = ref({
  stageName: '',
  musicStyle: '',
  companyName: '',
  phone: '',
})

const step = ref(1)

const errors = ref<unknown>({})

const errorMessage = ref('')

async function submitFirstStep() {
  errors.value = {}
  errorMessage.value = ''

  // Vérification de base côté front (optionnel)
  // if (!formStep1.value.email) {
  //   errors.value.email = "Veuillez saisir un email";
  //   return;
  // }
  step.value = 2
}

async function submitSecondStep() {
  errors.value = {}
  errorMessage.value = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const payload = {
    email: formStep1.value.email,
    password: formStep1.value.password,
    role: formStep1.value.role,
    ...(formStep1.value.role === 'dj'
      ? {
          stageName: formStep2.value.stageName,
          musicStyle: formStep2.value.musicStyle,
        }
      : {
          companyName: formStep2.value.companyName,
          phone: formStep2.value.phone,
        }),
  }

  console.log(payload)
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
