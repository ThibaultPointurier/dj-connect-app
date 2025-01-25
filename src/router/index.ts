import { createRouter, createWebHistory } from 'vue-router'
import baseLayout from '../components/layouts/base_layout.vue'
import dashboardLayout from '@/components/layouts/dashboard_layout.vue'

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
      },
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/messages/messages_page.vue'),
      meta: {
        layout: dashboardLayout,
      },
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/profile/profil_page.vue'),
      meta: {
        layout: dashboardLayout,
      },
    },
  ],
})

export default router
