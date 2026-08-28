import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'auth-layout' },
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: () => import('@/views/layouts/AuthLayout.vue'),
      redirect: { name: 'sign-in' },
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('@/views/auth/SignInView.vue'),
        },
      ],
    },
  ],
})

export default router
