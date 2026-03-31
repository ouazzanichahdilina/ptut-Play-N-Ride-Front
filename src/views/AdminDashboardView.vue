<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="$router.push('/')">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <div>
            <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
            <p class="brand-tag">Administration</p>
          </div>
        </div>

        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTab === 'dashboard' }" @click.prevent="activeTab = 'dashboard'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span>
            Tableau de bord
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'comptes' }" @click.prevent="activeTab = 'comptes'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span>
            Gestion des comptes
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'activites' }" @click.prevent="activeTab = 'activites'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </span>
            Bibliothèque d'activités
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'parametres' }" @click.prevent="activeTab = 'parametres'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </span>
            Paramètres système
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="user-mini-profile">
          <div class="user-avatar-mini">
            <img :src="adminProfileImage" alt="Administrateur" />
          </div>
          <div class="user-info">
            <p class="user-name">{{ adminName || 'Administrateur' }}</p>
            <p class="user-status">administrateur</p>
          </div>
        </div>
        <button class="logout-btn-sidebar" @click="logout">
          Quitter
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </aside>

    <main class="main-content">

      <!-- ===================== TABLEAU DE BORD ===================== -->
      <div v-if="activeTab === 'dashboard'">
        <header class="content-header">
          <div>
            <h1>Console d'Administration</h1>
            <p class="subtitle">Vue d'ensemble de la plateforme Play 'N Ride</p>
          </div>
          <div class="header-date">{{ todayDate }}</div>
        </header>

        <div class="stats-grid">
          <div class="stat-card cyan">
            <div class="stat-icon">👤</div>
            <div class="stat-info">
              <p class="stat-label">Total utilisateurs</p>
              <p class="stat-value">{{ stats.totalUsers }}</p>
              <p class="stat-sub">Comptes actifs</p>
            </div>
          </div>
          <div class="stat-card green">
            <div class="stat-icon">🏠</div>
            <div class="stat-info">
              <p class="stat-label">Patients</p>
              <p class="stat-value">{{ stats.patients }}</p>
              <p class="stat-sub">En rééducation</p>
            </div>
          </div>
          <div class="stat-card blue">
            <div class="stat-icon">🩺</div>
            <div class="stat-info">
              <p class="stat-label">Professionnels</p>
              <p class="stat-value">{{ stats.professionnels }}</p>
              <p class="stat-sub">De santé</p>
            </div>
          </div>
          <div class="stat-card orange">
            <div class="stat-icon">🚴</div>
            <div class="stat-info">
              <p class="stat-label">Séances</p>
              <p class="stat-value">{{ stats.seances }}</p>
              <p class="stat-sub">Ce mois-ci</p>
            </div>
          </div>
        </div>

        <div class="two-col-layout">
          <div class="info-card">
            <h3 class="card-title">Activité récente</h3>
            <ul class="activity-list">
              <li v-for="item in recentActivity" :key="item.id" class="activity-item">
                <span class="activity-dot" :class="item.type"></span>
                <div class="activity-text">
                  <p class="activity-msg">{{ item.message }}</p>
                  <p class="activity-time">{{ item.time }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="info-card">
            <h3 class="card-title">État du système</h3>
            <div class="system-status">
              <div class="status-row">
                <span class="status-label">API Backend</span>
                <span class="status-badge online">En ligne</span>
              </div>
              <div class="status-row">
                <span class="status-label">Base de données</span>
                <span class="status-badge online">Connectée</span>
              </div>
              <div class="status-row">
                <span class="status-label">Serveur de jeu</span>
                <span class="status-badge online">Opérationnel</span>
              </div>
              <div class="status-row">
                <span class="status-label">Authentification JWT</span>
                <span class="status-badge online">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== GESTION DES COMPTES ===================== -->
      <div v-if="activeTab === 'comptes'">
        <header class="content-header">
          <div>
            <h1>Gestion des comptes</h1>
            <p class="subtitle">Créer, modifier ou suspendre des comptes utilisateurs</p>
          </div>
          <button class="btn-primary" @click="openCreateModal">+ Nouveau compte</button>
        </header>

        <div class="filters-row">
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" v-model="searchQuery" placeholder="Rechercher un utilisateur..." />
          </div>
          <select v-model="filterRole" class="filter-select">
            <option value="">Tous les rôles</option>
            <option value="Patient">Patients</option>
            <option value="Professionnel de Santé">Professionnels</option>
            <option value="Administrateur">Administrateurs</option>
          </select>
          <select v-model="filterStatut" class="filter-select">
            <option value="">Tous les statuts</option>
            <option value="Actif">Actifs</option>
            <option value="Suspendu">Suspendus</option>
          </select>
        </div>

        <div class="table-wrapper">
          <div v-if="loadingUsers" class="loading-state">
            <p>Chargement des utilisateurs...</p>
          </div>
          <div v-else-if="apiError" class="error-state">
            <p>{{ apiError }}</p>
            <p class="text-muted" style="font-size: 0.9rem;">Affichage des données de démonstration</p>
          </div>
          <table class="users-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <div class="user-cell">
                    <div class="user-initials">{{ getInitials(user.nom) }}</div>
                    <span class="font-bold">{{ user.nom }}</span>
                  </div>
                </td>
                <td class="text-muted">{{ user.email }}</td>
                <td>
                  <span :class="['role-pill', getRoleClass(user.role)]">{{ user.role }}</span>
                </td>
                <td>
                  <span :class="['status-pill', user.statut === 'Actif' ? 'active' : 'inactive']">
                    {{ user.statut }}
                  </span>
                </td>
                <td class="text-muted">{{ user.dateInscription }}</td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-action edit" @click="openEditModal(user)" title="Modifier">✏️ Modifier</button>
                    <button
                      class="btn-action"
                      :class="user.statut === 'Actif' ? 'suspend' : 'activate'"
                      @click="toggleSuspend(user)"
                      :title="user.statut === 'Actif' ? 'Suspendre' : 'Réactiver'"
                    >
                      {{ user.statut === 'Actif' ? '🔒 Suspendre' : '🔓 Réactiver' }}
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="6" class="empty-state">Aucun utilisateur trouvé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ===================== BIBLIOTHÈQUE D'ACTIVITÉS ===================== -->
      <div v-if="activeTab === 'activites'">
        <header class="content-header">
          <div>
            <h1>Bibliothèque d'activités</h1>
            <p class="subtitle">Gérer les scénarios de jeu disponibles sur la plateforme</p>
          </div>
          <button class="btn-primary" @click="openActivityModal(null)">+ Nouvelle activité</button>
        </header>

        <div class="activities-grid">
          <div v-for="activity in activities" :key="activity.id" class="activity-card">
            <div class="activity-top" :style="{ background: activity.color }">
              <span class="activity-icon">{{ activity.icon }}</span>
              <span :class="['activity-status', activity.active ? 'active' : 'inactive']">
                {{ activity.active ? 'Actif' : 'Inactif' }}
              </span>
            </div>
            <div class="activity-body">
              <h3 class="activity-title">{{ activity.title }}</h3>
              <p class="text-muted activity-desc">{{ activity.description }}</p>
              <div class="activity-meta">
                <span class="meta-tag">{{ activity.difficulty }}</span>
                <span class="meta-tag">{{ activity.duration }}</span>
              </div>
              <div class="activity-stats">
                <div class="activity-stat">
                  <span class="stat-num">{{ activity.sessions }}</span>
                  <span class="stat-lbl">séances</span>
                </div>
                <div class="activity-stat">
                  <span class="stat-num">{{ activity.rating }}⭐</span>
                  <span class="stat-lbl">note moy.</span>
                </div>
              </div>
              <div class="activity-actions">
                <button class="btn-action edit" @click="openActivityModal(activity)">✏️ Modifier</button>
                <button class="btn-action" :class="activity.active ? 'suspend' : 'activate'" @click="toggleActivity(activity)">
                  {{ activity.active ? '⏸ Désactiver' : '▶ Activer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== PARAMÈTRES SYSTÈME ===================== -->
      <div v-if="activeTab === 'parametres'">
        <header class="content-header">
          <h1>Paramètres système</h1>
        </header>
        <div class="settings-card">
          <h3>Configuration générale</h3>
          <div class="form-group">
            <label>Nom de la plateforme</label>
            <input type="text" value="Play 'N Ride" />
          </div>
          <div class="form-group">
            <label>Email de contact</label>
            <input type="email" value="contact@playnride.fr" />
          </div>
          <div class="form-group">
            <label>URL de l'API</label>
            <input type="text" value="http://localhost:8080/api" />
          </div>

          <h3 style="margin-top: 30px;">Sécurité & Accès</h3>
          <label class="toggle-label"><input type="checkbox" checked> Activer l'authentification JWT</label>
          <label class="toggle-label"><input type="checkbox" checked> Forcer HTTPS en production</label>
          <label class="toggle-label"><input type="checkbox"> Autoriser l'accès invité</label>

          <h3 style="margin-top: 30px;">Notifications système</h3>
          <label class="toggle-label"><input type="checkbox" checked> Alertes de connexion suspecte</label>
          <label class="toggle-label"><input type="checkbox" checked> Rapport hebdomadaire d'activité</label>

          <button class="btn-primary" style="margin-top: 25px; width: auto; padding: 12px 30px;">Enregistrer les modifications</button>
        </div>
      </div>

    </main>

    <!-- ===================== MODAL CRÉER / MODIFIER UN COMPTE ===================== -->
    <div class="modal-overlay" :class="{ active: showUserModal }">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>{{ editingUser ? 'Modifier le compte' : 'Créer un nouveau compte' }}</h3>
          <button class="close-modal" @click="showUserModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <div class="form-group">
            <label>Nom complet</label>
            <input type="text" v-model="userForm.nom" placeholder="Jean Dupont" />
          </div>
          <div class="form-group">
            <label>Adresse email</label>
            <input type="email" v-model="userForm.email" placeholder="jean@email.com" />
          </div>
          <div class="form-group">
            <label>Rôle</label>
            <select v-model="userForm.role">
              <option value="Patient">Patient</option>
              <option value="Professionnel de Santé">Professionnel de Santé</option>
              <option value="Administrateur">Administrateur</option>
            </select>
          </div>
          <div class="form-group" v-if="!editingUser">
            <label>Mot de passe temporaire</label>
            <input type="password" v-model="userForm.password" placeholder="••••••••" />
          </div>
          <div class="form-group">
            <label>Statut</label>
            <select v-model="userForm.statut">
              <option value="Actif">Actif</option>
              <option value="Suspendu">Suspendu</option>
            </select>
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 10px;" @click="saveUser">
            {{ editingUser ? 'Enregistrer les modifications' : 'Créer le compte' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== MODAL ACTIVITÉ ===================== -->
    <div class="modal-overlay" :class="{ active: showActivityModal }">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>{{ editingActivity ? 'Modifier l\'activité' : 'Nouvelle activité' }}</h3>
          <button class="close-modal" @click="showActivityModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <div class="form-group">
            <label>Titre de l'activité</label>
            <input type="text" v-model="activityForm.title" placeholder="Ex: Flappy Endurance" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="activityForm.description" placeholder="Description courte..." />
          </div>
          <div class="form-group">
            <label>Difficulté</label>
            <select v-model="activityForm.difficulty">
              <option>Facile</option>
              <option>Moyen</option>
              <option>Difficile</option>
            </select>
          </div>
          <div class="form-group">
            <label>Durée recommandée</label>
            <input type="text" v-model="activityForm.duration" placeholder="Ex: 15 min" />
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 10px;" @click="saveActivity">
            {{ editingActivity ? 'Enregistrer' : 'Ajouter à la bibliothèque' }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== TOAST NOTIFICATION ===================== -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        {{ toast.message }}
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '../config.js'

const router = useRouter()

const activeTab = ref('dashboard')
const adminName = ref(localStorage.getItem('nom') || 'Administrateur')
const adminProfileImage = ref('/images/avBlonde.png')

onMounted(() => {
  const savedAvatar = localStorage.getItem('playnride_user_avatar')
  if (savedAvatar) adminProfileImage.value = savedAvatar
  fetchUsers()
})

// ── DATE ──────────────────────────────────────────────────────────────────────
const todayDate = new Date().toLocaleDateString('fr-FR', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

// ── STATISTIQUES ──────────────────────────────────────────────────────────────
const stats = ref({ totalUsers: 0, patients: 0, professionnels: 0, seances: 124 })

// ── ACTIVITÉ RÉCENTE (données de démo) ───────────────────────────────────────
const recentActivity = ref([
  { id: 1, type: 'green', message: 'Nouveau patient inscrit : Marie Martin', time: 'Il y a 5 min' },
  { id: 2, type: 'cyan', message: 'Séance terminée : Jean Dupont (45 min)', time: 'Il y a 12 min' },
  { id: 3, type: 'green', message: 'Nouveau professionnel : Dr. Lefebvre', time: 'Il y a 1h' },
  { id: 4, type: 'orange', message: 'Compte suspendu : user@test.com', time: 'Il y a 2h' },
  { id: 5, type: 'cyan', message: 'Activité ajoutée : Sprint Côtier', time: 'Hier' },
])

// ── UTILISATEURS ──────────────────────────────────────────────────────────────
const users = ref([])
const loadingUsers = ref(false)
const apiError = ref('')
const searchQuery = ref('')
const filterRole = ref('')
const filterStatut = ref('')

const demoUsers = [
  { id: 1, nom: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'Patient', statut: 'Actif', dateInscription: '12/01/2025' },
  { id: 2, nom: 'Marie Martin', email: 'marie.martin@email.com', role: 'Patient', statut: 'Actif', dateInscription: '15/01/2025' },
  { id: 3, nom: 'Pierre Durand', email: 'pierre.durand@email.com', role: 'Patient', statut: 'Suspendu', dateInscription: '20/01/2025' },
  { id: 4, nom: 'Dr. Sophie Durand', email: 'pro@playnride.fr', role: 'Professionnel de Santé', statut: 'Actif', dateInscription: '05/01/2025' },
  { id: 5, nom: 'Dr. Marc Lefebvre', email: 'lefebvre@kine.fr', role: 'Professionnel de Santé', statut: 'Actif', dateInscription: '08/01/2025' },
  { id: 6, nom: 'Admin Système', email: 'admin@playnride.fr', role: 'Administrateur', statut: 'Actif', dateInscription: '01/01/2025' },
]

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const matchSearch = !searchQuery.value ||
      u.nom.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchRole = !filterRole.value || u.role === filterRole.value
    const matchStatut = !filterStatut.value || u.statut === filterStatut.value
    return matchSearch && matchRole && matchStatut
  })
})

const fetchUsers = async () => {
  loadingUsers.value = true
  apiError.value = ''
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${API_URL}/utilisateurs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const data = await res.json()
    users.value = data.map(u => ({
      id: u.id,
      nom: u.nom || u.name || `${u.prenom || ''} ${u.nomFamille || ''}`.trim(),
      email: u.email,
      role: u.role || u.statut || 'Patient',
      statut: u.actif === false ? 'Suspendu' : 'Actif',
      dateInscription: u.dateInscription
        ? new Date(u.dateInscription).toLocaleDateString('fr-FR')
        : '-'
    }))
    updateStats()
  } catch {
    apiError.value = 'Impossible de joindre l\'API.'
    users.value = demoUsers
    updateStats()
  } finally {
    loadingUsers.value = false
  }
}

const updateStats = () => {
  stats.value.totalUsers = users.value.length
  stats.value.patients = users.value.filter(u => u.role === 'Patient').length
  stats.value.professionnels = users.value.filter(u => u.role === 'Professionnel de Santé').length
}

const toggleSuspend = async (user) => {
  const newStatut = user.statut === 'Actif' ? 'Suspendu' : 'Actif'
  const token = localStorage.getItem('token')
  try {
    await fetch(`${API_URL}/utilisateurs/${user.id}/statut`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ statut: newStatut })
    })
  } catch { /* mise à jour locale uniquement */ }
  user.statut = newStatut
  showToast(newStatut === 'Suspendu' ? `Compte de ${user.nom} suspendu` : `Compte de ${user.nom} réactivé`, 'info')
}

// ── MODAL UTILISATEUR ─────────────────────────────────────────────────────────
const showUserModal = ref(false)
const editingUser = ref(null)
const userForm = ref({ nom: '', email: '', role: 'Patient', statut: 'Actif', password: '' })

const openCreateModal = () => {
  editingUser.value = null
  userForm.value = { nom: '', email: '', role: 'Patient', statut: 'Actif', password: '' }
  showUserModal.value = true
}

const openEditModal = (user) => {
  editingUser.value = user
  userForm.value = { nom: user.nom, email: user.email, role: user.role, statut: user.statut, password: '' }
  showUserModal.value = true
}

const saveUser = async () => {
  const token = localStorage.getItem('token')
  if (editingUser.value) {
    try {
      await fetch(`${API_URL}/utilisateurs/${editingUser.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(userForm.value)
      })
    } catch { /* mise à jour locale */ }
    Object.assign(editingUser.value, userForm.value)
    showToast('Compte mis à jour avec succès', 'success')
  } else {
    try {
      const res = await fetch(`${API_URL}/utilisateurs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          nom: userForm.value.nom,
          email: userForm.value.email,
          motDePasse: userForm.value.password,
          statut: userForm.value.role
        })
      })
      if (res.ok) {
        const created = await res.json()
        users.value.push({ id: created.id, ...userForm.value, dateInscription: new Date().toLocaleDateString('fr-FR') })
      } else {
        const newUser = { id: Date.now(), ...userForm.value, dateInscription: new Date().toLocaleDateString('fr-FR') }
        users.value.push(newUser)
      }
    } catch {
      const newUser = { id: Date.now(), ...userForm.value, dateInscription: new Date().toLocaleDateString('fr-FR') }
      users.value.push(newUser)
    }
    updateStats()
    showToast('Nouveau compte créé avec succès', 'success')
  }
  showUserModal.value = false
}

// ── ACTIVITÉS ─────────────────────────────────────────────────────────────────
const activities = ref([
  { id: 1, title: 'Flappy Endurance', description: 'Maintenir une cadence constante sur la durée.', icon: '🐦', color: 'linear-gradient(135deg, #20C997, #00B8D9)', difficulty: 'Moyen', duration: '20 min', sessions: 342, rating: 4.7, active: true },
  { id: 2, title: 'Sprint Montagne', description: 'Pics de résistance courts mais intenses.', icon: '⛰️', color: 'linear-gradient(135deg, #0A192F, #00B8D9)', difficulty: 'Difficile', duration: '15 min', sessions: 198, rating: 4.5, active: true },
  { id: 3, title: 'Réveil Articulaire', description: 'Mouvements doux, idéal pour le matin.', icon: '🌅', color: 'linear-gradient(135deg, #FFB800, #FF7043)', difficulty: 'Facile', duration: '10 min', sessions: 510, rating: 4.9, active: true },
  { id: 4, title: 'Balade Côtière', description: 'Paysage marin apaisants, effort modéré.', icon: '🏖️', color: 'linear-gradient(135deg, #0EA5E9, #38BDF8)', difficulty: 'Facile', duration: '25 min', sessions: 267, rating: 4.6, active: true },
  { id: 5, title: 'Forêt Mystère', description: 'Parcours en forêt avec variations de rythme.', icon: '🌲', color: 'linear-gradient(135deg, #16A34A, #20C997)', difficulty: 'Moyen', duration: '20 min', sessions: 143, rating: 4.3, active: false },
  { id: 6, title: 'Défi Vitesse', description: 'Sprints répétés pour améliorer la puissance.', icon: '⚡', color: 'linear-gradient(135deg, #7C3AED, #00B8D9)', difficulty: 'Difficile', duration: '12 min', sessions: 89, rating: 4.4, active: false },
])

const showActivityModal = ref(false)
const editingActivity = ref(null)
const activityForm = ref({ title: '', description: '', difficulty: 'Moyen', duration: '' })

const openActivityModal = (activity) => {
  editingActivity.value = activity
  activityForm.value = activity
    ? { title: activity.title, description: activity.description, difficulty: activity.difficulty, duration: activity.duration }
    : { title: '', description: '', difficulty: 'Moyen', duration: '' }
  showActivityModal.value = true
}

const toggleActivity = (activity) => {
  activity.active = !activity.active
  showToast(`Activité "${activity.title}" ${activity.active ? 'activée' : 'désactivée'}`, 'info')
}

const saveActivity = () => {
  if (editingActivity.value) {
    Object.assign(editingActivity.value, activityForm.value)
    showToast('Activité mise à jour', 'success')
  } else {
    activities.value.push({
      id: Date.now(),
      ...activityForm.value,
      icon: '🎮',
      color: 'linear-gradient(135deg, #20C997, #00B8D9)',
      sessions: 0,
      rating: 0,
      active: true
    })
    showToast('Activité ajoutée à la bibliothèque', 'success')
  }
  showActivityModal.value = false
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const getInitials = (nom) => nom ? nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?'

const getRoleClass = (role) => {
  if (role === 'Patient') return 'role-patient'
  if (role === 'Professionnel de Santé') return 'role-pro'
  return 'role-admin'
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
const toast = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}

// ── DÉCONNEXION ───────────────────────────────────────────────────────────────
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('nom')
  localStorage.removeItem('id')
  localStorage.removeItem('statut')
  router.push('/auth')
}

</script>

<style scoped>
/* ── LAYOUT ─────────────────────────────────────────────────────────────────── */
.dashboard-layout { display: flex; height: 100vh; background-color: #FAFCFF; font-family: 'Nunito', sans-serif; }
.sidebar { width: 280px; background: white; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; border-right: 1px solid #E2E8F0; flex-shrink: 0; z-index: 10; }
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 50px; }
.sidebar-logo { height: 40px; }
.logo-text { font-weight: 900; color: #0A192F; font-size: 1.2rem; }
.text-cyan { color: #00B8D9; }
.brand-tag { font-size: 0.75rem; color: #6B7C93; margin: 2px 0 0; }
.sidebar-menu { display: flex; flex-direction: column; gap: 10px; }
.menu-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; text-decoration: none; color: #6B7C93; font-weight: 700; border-radius: 12px; transition: all 0.2s ease; font-size: 1rem; position: relative; }
.menu-icon { display: flex; align-items: center; justify-content: center; margin-right: 15px; }
.menu-item:hover { background-color: #F8FAFC; color: #0A192F; }
.menu-item.active { background-color: #EAF7F9; color: #00B8D9; }
.sidebar-bottom { border-top: 1px solid #E2E8F0; padding-top: 25px; }

.user-mini-profile { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; background: #F8FAFC; padding: 15px; border-radius: 12px; }
.user-avatar-mini { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white; flex-shrink: 0; }
.user-avatar-mini img { width: 100%; height: 100%; object-fit: contain; padding: 2px; }
.user-name { font-size: 0.95rem; font-weight: 800; color: #0A192F; margin: 0 0 3px 0; line-height: 1.2; }
.user-status { font-size: 0.8rem; color: #20C997; margin: 0; font-weight: 700; }

.logout-btn-sidebar { background: none; border: none; color: #94A3B8; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; width: 100%; justify-content: flex-start; }
.logout-btn-sidebar:hover { color: #FC8181; }

/* ── MAIN ────────────────────────────────────────────────────────────────────── */
.main-content { flex: 1; padding: 40px; overflow-y: auto; }
.content-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
.content-header h1 { font-size: 2rem; color: #0A192F; font-weight: 800; margin: 0; }
.subtitle { color: #6B7C93; font-size: 1rem; margin-top: 6px; }
.header-date { font-size: 0.9rem; color: #6B7C93; font-weight: 600; text-transform: capitalize; padding-top: 6px; }

/* ── STATS ────────────────────────────────────────────────────────────────────── */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
.stat-card { background: white; border-radius: 16px; padding: 24px; display: flex; align-items: center; gap: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); border-left: 4px solid transparent; }
.stat-card.cyan { border-left-color: #00B8D9; }
.stat-card.green { border-left-color: #20C997; }
.stat-card.blue { border-left-color: #3B82F6; }
.stat-card.orange { border-left-color: #FFB800; }
.stat-icon { font-size: 2rem; }
.stat-label { font-size: 0.8rem; font-weight: 700; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.05em; margin: 0; }
.stat-value { font-size: 2.2rem; font-weight: 900; color: #0A192F; line-height: 1.1; margin: 2px 0; }
.stat-sub { font-size: 0.78rem; color: #94A3B8; margin: 0; }

/* ── TWO-COL ────────────────────────────────────────────────────────────────── */
.two-col-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.info-card { background: white; border-radius: 16px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.card-title { font-size: 1.1rem; font-weight: 800; color: #0A192F; margin: 0 0 20px; }

/* ── ACTIVITY FEED ──────────────────────────────────────────────────────────── */
.activity-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }
.activity-item { display: flex; align-items: flex-start; gap: 12px; }
.activity-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
.activity-dot.green { background: #20C997; }
.activity-dot.cyan { background: #00B8D9; }
.activity-dot.orange { background: #FFB800; }
.activity-msg { font-size: 0.9rem; font-weight: 600; color: #0A192F; margin: 0; }
.activity-time { font-size: 0.8rem; color: #94A3B8; margin: 2px 0 0; }

/* ── SYSTEM STATUS ──────────────────────────────────────────────────────────── */
.system-status { display: flex; flex-direction: column; gap: 14px; }
.status-row { display: flex; justify-content: space-between; align-items: center; }
.status-label { font-size: 0.9rem; font-weight: 600; color: #0A192F; }
.status-badge { font-size: 0.78rem; font-weight: 700; padding: 4px 12px; border-radius: 50px; }
.status-badge.online { background: #E8F8F5; color: #20C997; }
.status-badge.offline { background: #FFE4E4; color: #FC8181; }

/* ── FILTERS ────────────────────────────────────────────────────────────────── */
.filters-row { display: flex; gap: 15px; margin-bottom: 25px; align-items: center; flex-wrap: wrap; }
.search-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 10px 16px; flex: 1; min-width: 200px; }
.search-box input { border: none; outline: none; font-family: inherit; font-size: 0.95rem; color: #0A192F; width: 100%; background: transparent; }
.search-icon { font-size: 0.9rem; }
.filter-select { padding: 10px 14px; border: 1px solid #E2E8F0; border-radius: 12px; font-family: inherit; font-size: 0.9rem; color: #0A192F; background: white; cursor: pointer; }
.filter-select:focus { outline: none; border-color: #00B8D9; }

/* ── TABLE ──────────────────────────────────────────────────────────────────── */
.table-wrapper { background: white; border-radius: 20px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.users-table { width: 100%; border-collapse: collapse; }
.users-table th { text-align: left; padding: 15px; color: #6B7C93; font-weight: 600; font-size: 0.85rem; border-bottom: 1px solid #F1F5F9; }
.users-table td { padding: 16px 15px; border-bottom: 1px solid #F8FAFC; vertical-align: middle; }
.font-bold { font-weight: 700; color: #0A192F; }
.text-muted { color: #6B7C93; font-size: 0.9rem; }
.user-cell { display: flex; align-items: center; gap: 12px; }
.user-initials { width: 36px; height: 36px; background: linear-gradient(135deg, #00B8D9, #20C997); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; }
.status-pill { padding: 5px 12px; border-radius: 50px; font-size: 0.78rem; font-weight: 700; }
.status-pill.active { background: #E8F8F5; color: #20C997; }
.status-pill.inactive { background: #F1F5F9; color: #94A3B8; }
.role-pill { padding: 5px 12px; border-radius: 50px; font-size: 0.78rem; font-weight: 700; }
.role-pill.role-patient { background: #EAF7F9; color: #00B8D9; }
.role-pill.role-pro { background: #E8F8F5; color: #20C997; }
.role-pill.role-admin { background: #EEF2FF; color: #6366F1; }
.action-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.btn-action { padding: 7px 13px; border-radius: 8px; border: none; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; }
.btn-action.edit { background: #EAF7F9; color: #00B8D9; }
.btn-action.edit:hover { background: #00B8D9; color: white; }
.btn-action.suspend { background: #FFF3E0; color: #FF8C00; }
.btn-action.suspend:hover { background: #FF8C00; color: white; }
.btn-action.activate { background: #E8F8F5; color: #20C997; }
.btn-action.activate:hover { background: #20C997; color: white; }
.empty-state { text-align: center; color: #94A3B8; padding: 40px; font-style: italic; }
.loading-state, .error-state { text-align: center; padding: 15px; color: #6B7C93; font-weight: 600; margin-bottom: 15px; }

/* ── ACTIVITIES GRID ────────────────────────────────────────────────────────── */
.activities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.activity-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
.activity-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.activity-top { padding: 24px; display: flex; justify-content: space-between; align-items: center; }
.activity-icon { font-size: 2.5rem; }
.activity-status { font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 50px; }
.activity-status.active { background: rgba(255,255,255,0.25); color: white; }
.activity-status.inactive { background: rgba(0,0,0,0.15); color: rgba(255,255,255,0.7); }
.activity-body { padding: 20px; }
.activity-title { font-size: 1.1rem; font-weight: 800; color: #0A192F; margin: 0 0 6px; }
.activity-desc { font-size: 0.88rem; margin: 0 0 14px; }
.activity-meta { display: flex; gap: 8px; margin-bottom: 14px; }
.meta-tag { background: #F1F5F9; color: #6B7C93; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 8px; }
.activity-stats { display: flex; gap: 20px; margin-bottom: 16px; padding: 12px; background: #F8FAFC; border-radius: 10px; }
.activity-stat { display: flex; flex-direction: column; align-items: center; }
.stat-num { font-size: 1.1rem; font-weight: 900; color: #0A192F; }
.stat-lbl { font-size: 0.72rem; color: #94A3B8; }
.activity-actions { display: flex; gap: 8px; }

/* ── SETTINGS ───────────────────────────────────────────────────────────────── */
.settings-card { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.settings-card h3 { font-size: 1.1rem; font-weight: 800; color: #0A192F; margin: 0 0 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.form-group label { font-weight: 700; color: #0A192F; font-size: 0.9rem; }
.form-group input, .form-group select { padding: 12px 14px; border: 1px solid #E2E8F0; border-radius: 10px; background: #F8FAFC; font-family: inherit; font-size: 0.95rem; transition: border-color 0.2s; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: #00B8D9; background: white; }
.toggle-label { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #6B7C93; margin-bottom: 15px; cursor: pointer; }

/* ── BUTTONS ────────────────────────────────────────────────────────────────── */
.btn-primary { background: linear-gradient(to right, #20C997, #00B8D9); color: white; border: none; padding: 12px 22px; border-radius: 10px; font-weight: 800; font-size: 0.95rem; cursor: pointer; font-family: inherit; transition: transform 0.2s, box-shadow 0.2s; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,184,217,0.3); }

/* ── MODAL ──────────────────────────────────────────────────────────────────── */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.8); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.assign-modal { background: white; width: 100%; max-width: 500px; border-radius: 20px; overflow: hidden; transform: translateY(30px); transition: 0.3s; }
.modal-overlay.active .assign-modal { transform: translateY(0); }
.modal-header-assign { background: #EAF7F9; padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; }
.modal-header-assign h3 { color: #0A192F; margin: 0; font-weight: 800; }
.close-modal { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6B7C93; }
.modal-body-assign { padding: 30px; }

/* ── TOAST ──────────────────────────────────────────────────────────────────── */
.toast { position: fixed; bottom: 30px; right: 30px; padding: 14px 24px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; color: white; z-index: 2000; box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
.toast.success { background: linear-gradient(to right, #20C997, #00B8D9); }
.toast.info { background: #0A192F; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }

/* ── RESPONSIVE ─────────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .two-col-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main-content { padding: 20px; }
  .stats-grid { grid-template-columns: 1fr 1fr; }
}
</style>
