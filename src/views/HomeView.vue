<script setup lang="ts"></script>

<template>
  <main>
    <h1 class="text-4xl font-bold mb-6">Bienvenue sur DJ Connect</h1>
    <p class="mb-8 text-lg">
      Connectez les organisateurs d\'événements avec des DJ professionnels.
    </p>

    <router-link
      to="/authentication/login"
      class="block w-full py-3 mb-4 text-center text-indigo-500 bg-white font-semibold text-lg rounded-lg hover:bg-gray-200 transition"
    >
      Se connecter
    </router-link>
    <router-link
      to="/authentication/register"
      class="block w-full py-3 text-center text-indigo-500 bg-white font-semibold text-lg rounded-lg hover:bg-gray-200 transition"
    >
      Créer un compte
    </router-link>

    <div class="mt-8 text-sm">
      <p>
        En continuant, vous acceptez nos <a href="#" class="underline">conditions générales</a> et
        notre <a href="#" class="underline">politique de confidentialité</a>.
      </p>
    </div>
  </main>
</template>
