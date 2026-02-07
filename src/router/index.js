import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import { useUserStore } from '@/stores/userStore'
import { ceGuard } from './guards/ce.guard'

const isAuth = async (to, from, next) => {
  const { getSession } = useAuth()
  const userStore = useUserStore()

  const session = await getSession()

  if (!session) {
    return next({ name: 'login' })
  }

  let userProfile = userStore.profile

  if (!userProfile) {
    userProfile = await userStore.getProfile()
  }

  if (!userProfile && to.name !== 'completar-perfil') {
    return next({ name: 'completar-perfil' })
  }

  next()
}

const isLoginAuth = async (to, from, next) => {
  const { getSession } = useAuth()
  const session = await getSession()
  if (session) {
    next({ name: 'enviar' })
  } else {
    next()
  }
}

const isCreateProfile = async (to, from, next) => {
  const { getSession } = useAuth()
  const userStore = useUserStore()
  const session = await getSession()
  if (!session) {
    next({ name: 'login' })
    return
  }
  userStore.setUser(session.user)
  let userProfile = userStore.profile
  if (!userProfile) {
    try {
      userProfile = await userStore.getProfile()
    } catch (error) {
      userProfile = null
    }
  }
  // Si ya tiene perfil, redirige a /resume
  if (userProfile) {
    next({ name: 'enviar' })
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/buzon',
      name: 'buzon',
      component: () => import('../views/BuzonView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: isLoginAuth,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/SignUpView.vue'),
      beforeEnter: isLoginAuth,
    },
    {
      path: '/completar-perfil',
      name: 'completar-perfil',
      component: () => import('../views/CompleteProfileView.vue'),
      beforeEnter: isCreateProfile,
    },
    {
      path: '/enviar',
      name: 'enviar',
      component: () => import('../views/SendCardView.vue'),
      beforeEnter: isAuth,
    },
    {
      path: '/moderacion',
      name: 'moderacion',
      component: () => import('../views/ModerationView.vue'),
      beforeEnter: ceGuard,
    },
  ],
  linkExactActiveClass: 'active',
})

export default router
