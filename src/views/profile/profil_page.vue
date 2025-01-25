<template>
  <div class="w-full h-full bg-white flex flex-col p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Mon profil</h1>

    <!-- Affichage des informations utilisateur -->
    <div v-if="!isEditing">
      <p class="mb-4"><strong>Nom :</strong> {{ user.name }}</p>
      <p class="mb-4"><strong>Email :</strong> {{ user.email }}</p>
      <!-- Ajoutez d'autres informations selon vos besoins -->

      <button
        @click="enableEditing"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
      >
        Modifier le profil
      </button>
    </div>

    <!-- Formulaire d'édition -->
    <div v-else>
      <form @submit.prevent="submitProfile">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Ajoutez d'autres champs selon vos besoins -->

        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mb-2"
        >
          Enregistrer
        </button>
        <button
          type="button"
          @click="cancelEditing"
          class="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
        >
          Annuler
        </button>
      </form>
    </div>

    <!-- Messages d'erreur ou de succès -->
    <p v-if="errorMessage" class="text-red-500 text-center text-sm mt-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 text-center text-sm mt-4">{{ successMessage }}</p>
  </div>
</template>

<script lang="ts" setup>

import { ref } from "vue";

const user = ref({
  name: '',
  email: '',
  // Initialisez les autres propriétés
});

const isEditing = ref<boolean>(false);

const form = ref({
  name: '',
  email: '',
  // Initialisez les autres propriétés
});

const errors = ref({});
const errorMessage = ref<string>('');
const successMessage = ref<string>('');


function enableEditing() {
  isEditing.value = true;
  successMessage.value = '';
  errorMessage.value = '';
}

function cancelEditing() {
  isEditing.value = false;
  form.value = { ...user.value };
  errors.value = {};
  successMessage.value = '';
  errorMessage.value = '';
}

async function submitProfile() {
  errors.value = {};
  errorMessage.value = '';
  successMessage.value = '';
}
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
