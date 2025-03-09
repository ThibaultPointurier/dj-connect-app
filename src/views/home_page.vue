<script setup lang="ts"></script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-6 text-[#3D1E6D]">Bienvenue sur DJ Connect</h1>
        <p class="mb-8 text-lg text-[#1E1E1E]">
          Connectez les organisateurs d'événements avec des DJ professionnels.
        </p>
      </div>

      <div class="space-y-4">
        <router-link
          to="/authentication/login"
          class="block w-full py-3 text-center text-white bg-[#3D1E6D] font-semibold text-lg rounded-lg hover:bg-[#0077B6] transition duration-300 shadow-lg"
        >
          Se connecter
        </router-link>
        <router-link
          to="/authentication/register"
          class="block w-full py-3 text-center text-[#3D1E6D] bg-white font-semibold text-lg rounded-lg border-2 border-[#3D1E6D] hover:bg-[#D9D9D9] hover:border-[#0077B6] hover:text-[#0077B6] transition duration-300"
        >
          Créer un compte
        </router-link>
      </div>

      <div class="mt-8 text-sm text-center text-[#1E1E1E]">
        <p>
          En continuant, vous acceptez nos <a href="#" class="text-[#0077B6] hover:text-[#3D1E6D] underline transition">conditions générales</a> et
          notre <a href="#" class="text-[#0077B6] hover:text-[#3D1E6D] underline transition">politique de confidentialité</a>.
        </p>
      </div>
    </div>
  </main>
</template>
