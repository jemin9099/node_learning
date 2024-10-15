import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/Login.vue'),
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('../views/ForgotPassword.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/Register.vue'),
        },
        {
          path: '/admin-panel',
          name: 'admin-panel',
          component: () => import('../views/AdminPanel.vue'),
        },
      ],
    },
  ],
})

export default router
