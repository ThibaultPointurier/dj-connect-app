<template>
  <div class="w-12/12 bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl text-slate-600 font-bold text-center mb-6">Connexion</h2>

      <form @submit.prevent="submitLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="mt-1 block w-full px-3 py-2 border rounded-md text-slate-600 border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition"
        >
          Se connecter
        </button>

        <p v-if="errorMessage" class="text-red-500 text-center text-sm mt-4">{{ errorMessage }}</p>
      </form>
    </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = reactive({
  email: '',
  password: ''
});

const errors = reactive({
  email: '',
  password: ''
});

const errorMessage = ref('');

async function submitLogin() {
  errors.email = '';
  errors.password = '';
  errorMessage.value = '';
}
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
