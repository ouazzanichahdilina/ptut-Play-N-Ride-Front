import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import GuestDashboardView from '../views/GuestDashboardView.vue'
import PatientDashboardView from '../views/PatientDashboardView.vue'
import ProDashboardView from '../views/ProDashboardView.vue'
<<<<<<< HEAD
// CORRECTION ICI : on enlève le "View" à la fin du nom du fichier
import AdminDashboard from '../views/AdminDashboard.vue' 
import GameView from '../views/GameView.vue'
=======
import GameView from '../views/GameView.vue'
// Import de la vue Administrateur
import AdminDashboardView from '../views/AdminDashboardView.vue'
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

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
<<<<<<< HEAD
      component: AdminDashboard // Et on met à jour la variable ici
=======
      component: AdminDashboardView
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
    },
    {
      path: '/play',
      name: 'game',
      component: GameView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router