import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import GuestDashboardView from '../views/GuestDashboardView.vue'
import PatientDashboardView from '../views/PatientDashboardView.vue'
import ProDashboardView from '../views/ProDashboardView.vue'
import GameView from '../views/GameView.vue'
// Import de la vue Administrateur
import AdminDashboardView from '../views/AdminDashboardView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/guest-dashboard',
      name: 'guest-dashboard',
      component: GuestDashboardView
    },
    {
      path: '/patient-dashboard',
      name: 'patient-dashboard',
      component: PatientDashboardView
    },
    {
      path: '/pro-dashboard',
      name: 'pro-dashboard',
      component: ProDashboardView
    },
    {
      path: '/admin-dashboard',
      name: 'admin-dashboard',
      component: AdminDashboardView
    },
    {
      path: '/play',
      name: 'game',
      component: GameView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

// ── Navigation Guards ──────────────────────────────────────────────────────────
// Routes qui nécessitent une session valide, avec le rôle requis (null = tout rôle)
const PROTECTED = {
  'patient-dashboard': 'patient',
  'pro-dashboard': 'Professionnel',
  'admin-dashboard': 'Administrateur',
  'game': null,
  'profile': null,
}

router.beforeEach((to, _from, next) => {
  if (!(to.name in PROTECTED)) return next()

  const token = localStorage.getItem('token')
  if (!token) return next({ name: 'auth' })

  const requiredRole = PROTECTED[to.name]
  if (!requiredRole) return next()   // token suffit pour game/profile

  const userRole = localStorage.getItem('statut')
  if (userRole === requiredRole) return next()

  // Mauvais rôle → redirection vers le bon dashboard
  if (userRole === 'Administrateur') return next({ name: 'admin-dashboard' })
  if (userRole === 'Professionnel') return next({ name: 'pro-dashboard' })
  return next({ name: 'patient-dashboard' })
})

export default router