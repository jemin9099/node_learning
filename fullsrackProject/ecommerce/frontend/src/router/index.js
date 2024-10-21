import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

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
          component: () => import('../views/HomeView.vue'),
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
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/admin/Users.vue'),
          meta: {
            isAdmin: true,
          },
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/admin/Products.vue'),
          meta: {
            isAdmin: true,
          },
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('../views/admin/Category.vue'),
          meta: {
            isAdmin: true,
          },
        },
      ],
    },
  ],
})

export default router
