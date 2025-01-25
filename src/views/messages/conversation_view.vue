<template>


  <div class="w-full h-full bg-white flex flex-col p-4">

    <!-- Titre principal -->
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Mes Conversations</h1>

    <!-- Liste des conversations (plus de card autour) -->
    <div class="space-y-3">
      <div
        v-for="conv in conversations"
        :key="conv.id"
        @click="goToConversation(conv.id)"
        class="flex items-center p-3 rounded-lg cursor-pointer transition-colors
               hover:bg-blue-50 active:bg-blue-100"
      >
        <!-- Avatar + état en ligne éventuel -->
        <div class="relative">
          <img
            :src="conv.userImage"
            alt="Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
          <!-- Petit rond "online" (optionnel) -->
          <span
            class="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white bg-green-500"
            v-if="conv.isOnline"
          ></span>
        </div>

        <!-- Infos conversation -->
        <div class="ml-3 flex-1">
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-gray-800">{{ conv.userName }}</h2>
            <span class="text-xs text-gray-500 ml-2">
              {{ conv.lastMessageTime }}
            </span>
          </div>
          <p class="text-sm text-gray-600 truncate">
            {{ conv.lastMessage }}
          </p>
        </div>

        <!-- Badge "non lu" -->
        <div
          v-if="conv.unreadCount > 0"
          class="ml-2 bg-blue-600 text-white text-xs font-semibold
                 rounded-full w-5 h-5 flex items-center justify-center"
        >
          {{ conv.unreadCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Exemple de données
const conversations = [
  {
    id: 1,
    userName: 'John Doe',
    userImage: 'https://via.placeholder.com/150/EF4444/FFFFFF?text=JD',
    lastMessage: 'Salut, comment vas-tu ?',
    lastMessageTime: '14:32',
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    userName: 'Alice',
    userImage: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=A',
    lastMessage: 'On se voit demain ?',
    lastMessageTime: '09:20',
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    userName: 'Bob',
    userImage: 'https://via.placeholder.com/150/10B981/FFFFFF?text=B',
    lastMessage: 'Ok, super ! À plus tard.',
    lastMessageTime: 'Hier',
    isOnline: false,
    unreadCount: 1
  }
]

function goToConversation(id: number) {
  router.push(`/messages/${id}`)
}
</script>
