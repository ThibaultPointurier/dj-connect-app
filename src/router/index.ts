import { createRouter, createWebHistory } from 'vue-router'
import baseLayout from '../components/layouts/base_layout.vue'
import dashboardLayout from '@/components/layouts/dashboard_layout.vue'
import {useAuthStore} from "@/stores/auth_store.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home_page.vue'),
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/authentication/login',
      name: 'login',
      component: () => import('../views/authentication/login_page.vue'),
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/authentication/register',
      name: 'register',
      component: () => import('../views/authentication/register_page.vue'),
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/dashboard_page.vue'),
      meta: {
        layout: dashboardLayout,
        requiresAuth: true,
      },
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/messages/messages_page.vue'),
      meta: {
        layout: dashboardLayout,
        requiresAuth: true,
      },
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/profile/profil_page.vue'),
      meta: {
        layout: dashboardLayout,
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else if (authStore.isAuthenticated && (to.name === 'login' || to.name === 'register' || to.name === 'home')) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
