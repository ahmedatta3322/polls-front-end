import { createRouter, createWebHistory } from 'vue-router'
import PublicPortal from '../views/PublicPortal.vue'
import { useAuthStore } from '../stores/auth'
import Login from '../views/Login.vue'
import AdminPortal from '../views/AdminPortal.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/publicportal',
      name: 'PublicPortal',
      component: PublicPortal
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/adminportal',
      name: 'AdminPortal',
      component: AdminPortal
    },
    {
      path: '/adminlogin',
      name: 'AdminLogin',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})
router.beforeEach((to) => {
  let auth = useAuthStore().verifyAuth()

  return auth
    .then(() => {
      if (!useAuthStore().isAuthenticated) {
        if (to.path == '/login') {
          return true
        }
        if (to.path == '/adminlogin') {
          return true
        } else if (to.path == '/adminportal') {
          return { name: 'AdminLogin' }
        } else {
          return { name: 'Login' }
        }
      } else {
        if (to.path == '/login') {
          return { name: 'PublicPortal' }
        }
        if (to.path == '/adminlogin') {
          return { name: 'AdminPortal' }
        } else {
          return true
        }
      }
    })
    .catch(() => {
      if (to.path == '/login') {
        return true
      } else {
        return { name: 'Login' }
      }
    })
})

export default router
