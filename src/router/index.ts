import { ENV } from '@/helpers'
import { useUserStore } from '@/stores/user'
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
      meta: { requiresNotAuth: true },
      redirect: { name: 'sign-in' },
      children: [
        {
          path: 'sign-in',
          name: 'sign-in',
          component: () => import('@/views/auth/SignInView.vue'),
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('@/views/auth/ResetPasswordView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'dashboard-layout',
      meta: { requiresAuth: true },
      redirect: { name: 'start' },
      component: () => import('@/views/layouts/DashboardLayout.vue'),
      children: [
        {
          path: 'inicio',
          name: 'start',
          component: () => import('@/views/admin/StartView.vue'),
        },
        {
          path: 'aron',
          name: 'aron',
          component: () => import('@/views/admin/AronView.vue'),
        },
        {
          path: 'servicios',
          name: 'services',
          component: () => import('@/views/admin/ServicesView.vue'),
        },
        {
          path: 'modelos',
          name: 'models',
          component: () => import('@/views/admin/ModelsView.vue'),
        },
        {
          path: 'eventos',
          name: 'events',
          // component: () => import('@/views/admin/EventsView.vue'),
          redirect: { name: 'galery-events' },
          children: [
            {
              path: 'galeria-eventos',
              name: 'galery-events',
              component: () => import('@/views/admin/EventsView.vue'),
            },
            {
              path: 'galeria-videos',
              name: 'galery-videos',
              component: () => import('@/views/admin/GaleryVideosView.vue'),
            },
          ],
        },
        {
          path: 'paquetes',
          name: 'packages',
          component: () => import('@/views/admin/PackagesView.vue'),
        },
        {
          path: 'contacto',
          name: 'contact',
          component: () => import('@/views/admin/ContactView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/auth/ProfileView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    localStorage.removeItem(ENV.TOKEN)
    return { name: 'sign-in', replace: true }
  } else if (to.meta.requiresNotAuth && (await isAuthenticated())) {
    return { name: 'dashboard-layout', replace: true }
  }

  return
})

async function isAuthenticated(): Promise<boolean> {
  try {
    const authStore = useUserStore()
    await authStore.checkAuth()
    return authStore.isAuthenticated
  } catch {
    return false
  }
}

export default router
