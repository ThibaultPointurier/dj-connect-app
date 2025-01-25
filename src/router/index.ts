import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginPage from '../views/authentication/login_view.vue'
import registerPage from '../views/authentication/register_view.vue'
import baseLayout from '../layouts/base_layout.vue'
import dashboardLayout from '@/layouts/dashboard_layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/authentication/login',
      name: 'login',
      component: loginPage,
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/authentication/register',
      name: 'register',
      component: registerPage,
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/authentication/register',
      name: 'register',
      component: registerPage,
      meta: {
        layout: baseLayout,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashboard/dashboard_view.vue'),
      meta: {
        layout: dashboardLayout,
      },
    },
    {
      path: '/conv',
      name: 'convo',
      component: () => import('../views/messages/conversation_view.vue'),
      meta: {
        layout: dashboardLayout,
      },
    },
  ],
})

export default router
