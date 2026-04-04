<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="goHome">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <div class="brand-info">
            <p class="brand-name">Play 'N Ride</p>
            <p class="brand-tag">Super Admin</p>
          </div>
        </div>

        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTab === 'vue-ensemble' }" @click="activeTab = 'vue-ensemble'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span> 
            Vue d'ensemble
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'utilisateurs' }" @click="activeTab = 'utilisateurs'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span> 
            Gestion Utilisateurs
          </a>
          
          <a href="#" class="menu-item" :class="{ active: activeTab === 'tele-readap' }" @click="activeTab = 'tele-readap'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span> 
            Télé-réadaptation
          </a>

          <a href="#" class="menu-item" :class="{ active: activeTab === 'scenarios' }" @click="activeTab = 'scenarios'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </span> 
            Catalogue Scénarios
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'systeme' }" @click="activeTab = 'systeme'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span> 
            Maintenance Système
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="pro-profile">
          <div class="pro-avatar">A</div>
          <div class="pro-info">
            <p class="pro-name">Admin Principal</p>
            <p class="pro-mail">admin@playnride.fr</p>
          </div>
        </div>
        <button class="logout-link" @click="goAuth">
          Déconnexion 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </aside>

    <main class="main-content">
      
      <div v-if="activeTab === 'vue-ensemble'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Tableau de Bord Administrateur</h1>
            <p class="subtitle">Vue globale des performances de la plateforme.</p>
          </div>
          <button class="btn-outline">Générer Rapport Global</button>
        </header>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-icon bg-cyan-light text-cyan"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            <div class="kpi-info">
              <p>Total Utilisateurs</p>
              <h3>12,450</h3>
              <span class="trend positive">↑ +12% ce mois</span>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon bg-green-light text-green"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
            <div class="kpi-info">
              <p>Séances Terminées</p>
              <h3>85,200</h3>
              <span class="trend positive">↑ +5% ce mois</span>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon bg-purple-light text-purple"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>
            <div class="kpi-info">
              <p>Cabinets Partenaires</p>
              <h3>145</h3>
              <span class="trend neutral">→ Stable</span>
            </div>
          </div>
          <div class="kpi-card">
            <div class="kpi-icon bg-red-light text-red"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
            <div class="kpi-info">
              <p>Tickets & Bugs</p>
              <h3>12</h3>
              <span class="trend negative">↓ -2 résolus hier</span>
            </div>
          </div>
        </div>

        <h3 class="section-title-small" style="margin-top: 40px;">Serveurs & Systèmes Temps Réel</h3>
        <div class="server-status-container">
          <div class="server-card">
            <div class="server-head">
              <strong>Base de données Patients</strong>
              <span class="status-dot bg-green"></span>
            </div>
            <div class="server-bar"><div class="fill bg-green" style="width: 45%;"></div></div>
            <p class="text-xs text-muted mt-2">Charge: 45% • Latence: 12ms</p>
          </div>
          <div class="server-card">
            <div class="server-head">
              <strong>Serveur WebSocket (Jeu en direct)</strong>
              <span class="status-dot bg-warning"></span>
            </div>
            <div class="server-bar"><div class="fill bg-warning" style="width: 78%;"></div></div>
            <p class="text-xs text-muted mt-2">Charge: 78% • 1,200 connexions actives</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'utilisateurs'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Gestion des Utilisateurs</h1>
            <p class="subtitle">Bannissez, modifiez ou vérifiez les comptes de la plateforme.</p>
          </div>
          <div class="search-box">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" v-model="userSearchQuery" placeholder="Email ou Nom..." />
          </div>
        </header>

        <div class="table-filters">
          <button class="filter-btn" :class="{ active: filterRole === 'Tous' }" @click="filterRole = 'Tous'">Tous</button>
          <button class="filter-btn" :class="{ active: filterRole === 'Patient' }" @click="filterRole = 'Patient'">Patients</button>
          <button class="filter-btn" :class="{ active: filterRole === 'Pro' }" @click="filterRole = 'Pro'">Professionnels</button>
        </div>

        <div class="table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Inscription</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <div class="patient-cell-info">
                    <img :src="user.avatar" alt="Avatar" class="table-avatar" />
                    <div>
                      <span class="font-bold">{{ user.nom }}</span>
                      <span class="text-xs text-muted block">{{ user.email }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span :class="['role-badge', user.role === 'Pro' ? 'bg-purple-light text-purple' : 'bg-cyan-light text-cyan']">
                    {{ user.role === 'Pro' ? 'Praticien' : 'Patient' }}
                  </span>
                </td>
                <td class="text-muted">{{ user.dateInscription }}</td>
                <td>
                  <span v-if="user.statut === 'Actif'" class="status-badge bg-green-light text-green">Actif</span>
                  <span v-else class="status-badge bg-red-light text-red">Banni</span>
                </td>
                <td>
                  <button class="btn-icon" title="Modifier" @click="editUser(user)">✏️</button>
                  <button class="btn-icon" title="Bannir/Débannir" @click="toggleUserStatus(user)">
                    {{ user.statut === 'Actif' ? '🚫' : '✅' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'tele-readap'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Ajustement Matériel à Distance</h1>
            <p class="subtitle">Contrôle technique de sécurité des moteurs des pédaliers connectés en direct.</p>
          </div>
        </header>

        <div class="monitoring-panel">
          <div class="live-patient" v-for="session in activeHardwareSessions" :key="session.id">
            <div class="live-header-bar">
              <div>
                <h3 style="margin:0; color:#0A192F;">Patient : {{ session.nom }}</h3>
                <span class="text-xs text-muted">ID Appareil : {{ session.deviceId }} ({{ session.equipement }})</span>
              </div>
              <button class="btn-emergency" @click="emergencyStop(session)" :disabled="session.isStopped">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                ARRÊT MOTEUR D'URGENCE
              </button>
            </div>

            <div class="live-controls">
              <div class="control-row">
                <div class="slider-labels">
                  <label>Niveau de Résistance (Moteur)</label>
                  <span class="level-badge">Niv. {{ session.resistance }}</span>
                </div>
                <input type="range" min="1" max="10" v-model="session.resistance" class="slider custom-slider" :disabled="session.isStopped">
              </div>
              
              <button class="btn-primary" @click="sendAdjustment(session)" :disabled="session.isSending || session.isStopped">
                {{ session.isSending ? 'Transmission en cours...' : 'Forcer la mise à jour matérielle' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'scenarios'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Catalogue des Scénarios</h1>
            <p class="subtitle">Ajoutez ou désactivez les jeux disponibles pour les utilisateurs.</p>
          </div>
          <button class="btn-primary" @click="showAddScenarioModal = true">+ Ajouter un scénario</button>
        </header>

        <div class="grid-layout">
          <div v-for="exo in scenarios" :key="exo.id" class="prescription-card" :class="{ 'disabled-card': !exo.actif }">
            <div class="presc-img-wrapper" :style="{ backgroundColor: exo.color + '15' }">
              <img :src="exo.image" :alt="exo.title" class="presc-img" :style="{ filter: exo.actif ? 'none' : 'grayscale(100%)' }" />
              <div v-if="!exo.actif" class="disabled-overlay">DÉSACTIVÉ</div>
            </div>
            <div class="presc-content">
              <div style="display:flex; justify-content:space-between; align-items: flex-start;">
                <span class="clinical-tag" :style="{ color: exo.color, backgroundColor: exo.color + '15' }">{{ exo.objective }}</span>
                <label class="toggle-switch-small">
                  <input type="checkbox" v-model="exo.actif">
                  <span class="slider-toggle-small"></span>
                </label>
              </div>
              <h3 style="margin-top: 10px; color: #0A192F;">{{ exo.title }}</h3>
              <p class="text-muted text-xs">Fichier: {{ exo.fileRef }} • MàJ: {{ exo.lastUpdate }}</p>
              <div style="display: flex; gap:10px; margin-top:15px;">
                <button class="btn-outline-small" style="flex:1;">Modifier</button>
                <button class="btn-outline-small text-red border-red" style="flex:1;">Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'systeme'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Maintenance Système</h1>
            <p class="subtitle">Configuration globale de l'application Play 'N Ride.</p>
          </div>
        </header>

        <div class="settings-card">
          <h3>Base de données & API (Backend)</h3>
          <div class="form-group">
            <label>URL de l'API de Production</label>
            <input type="text" value="https://api.playnride.fr/v1">
          </div>
          <div class="form-group">
            <label>Clé secrète Web Socket (Monitoring Temps Réel)</label>
            <input type="password" value="************************">
          </div>
          <button class="btn-outline mt-2">Purger le cache système</button>

          <h3 style="margin-top: 40px;">Mises à jour de l'application</h3>
          <div class="update-box">
            <div class="flex-row">
              <strong style="color: #0A192F;">Version Actuelle : v2.1.4</strong>
              <span class="status-badge bg-green-light text-green">À jour</span>
            </div>
            <p class="text-muted text-xs mt-2">Dernier déploiement effectué le 12 Octobre.</p>
          </div>
        </div>
      </div>

    </main>

    <div class="modal-overlay" :class="{ active: showAddScenarioModal }" @click.self="showAddScenarioModal = false">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>Ajouter un nouveau jeu</h3>
          <button class="close-modal" @click="showAddScenarioModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <div class="form-group">
            <label>Nom du Scénario</label>
            <input type="text" placeholder="Ex: Course Spatiale">
          </div>
          <div class="form-group">
            <label>Objectif Clinique Principal</label>
            <select><option>Échauffement</option><option>Cardio</option><option>Coordination</option><option>Récupération</option></select>
          </div>
          <div class="form-group">
            <label>Lien vers l'image de couverture (URL)</label>
            <input type="text" placeholder="/images/nouveau-jeu.png">
          </div>
          <div class="form-group">
            <label>Fichier Build du Jeu (Unity/WebGL)</label>
            <input type="file" style="border: 1px dashed #E2E8F0; padding: 20px; background: white; color: #1C2833;">
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 20px;" @click="showAddScenarioModal = false">Uploader et Sauvegarder</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => router.push('/')
const goAuth = () => router.push('/auth')

const activeTab = ref('vue-ensemble')
const showAddScenarioModal = ref(false)

// --- GESTION UTILISATEURS ---
const userSearchQuery = ref('')
const filterRole = ref('Tous')

const allUsers = ref([
  { id: 1, nom: "Jean Dupont", email: "jean@gmail.com", role: "Patient", dateInscription: "12/09/2023", statut: "Actif", avatar: "/images/avBlonde.png" },
  { id: 2, nom: "Dr. Sophie Durand", email: "pro@playnride.fr", role: "Pro", dateInscription: "05/01/2023", statut: "Actif", avatar: "/images/proSanté.png" },
  { id: 3, nom: "Pierre Durand", email: "pierre.d@hotmail.com", role: "Patient", dateInscription: "14/10/2023", statut: "Actif", avatar: "/images/avBlackW.png" },
  { id: 4, nom: "Cabinet Alpha", email: "contact@alpha-kine.fr", role: "Pro", dateInscription: "22/05/2023", statut: "Banni", avatar: "/images/proSanté.png" },
  { id: 5, nom: "Lucie Bernard", email: "lulu.ber@orange.fr", role: "Patient", dateInscription: "01/11/2023", statut: "Actif", avatar: "/images/avatarN.png" },
])

const filteredUsers = computed(() => {
  return allUsers.value.filter(u => {
    const matchQuery = u.nom.toLowerCase().includes(userSearchQuery.value.toLowerCase()) || u.email.toLowerCase().includes(userSearchQuery.value.toLowerCase())
    const matchRole = filterRole.value === 'Tous' || u.role === filterRole.value
    return matchQuery && matchRole
  })
})

const toggleUserStatus = (user) => {
  user.statut = user.statut === 'Actif' ? 'Banni' : 'Actif'
}

const editUser = (user) => {
  alert(`Mode édition pour ${user.nom}`)
}

// --- GESTION MATÉRIEL A DISTANCE (TELE-READAPTATION) ---
const activeHardwareSessions = ref([
  { id: 101, nom: "Jean Dupont", deviceId: "PED-8492A", equipement: "Pédalier (Bras)", resistance: 4, isSending: false, isStopped: false },
  { id: 102, nom: "Pierre Durand", deviceId: "VEL-112B", equipement: "Vélo Complet", resistance: 2, isSending: false, isStopped: false }
])

const sendAdjustment = (session) => {
  session.isSending = true
  setTimeout(() => { 
    session.isSending = false; 
    alert(`La résistance de l'appareil ${session.deviceId} a été mise à jour avec succès au niveau ${session.resistance}.`) 
  }, 1000)
}

const emergencyStop = (session) => {
  if(confirm(`⚠️ Êtes-vous sûr de vouloir couper immédiatement le moteur du patient ${session.nom} ?`)) {
    session.isStopped = true
    session.resistance = 1
  }
}

// --- GESTION CATALOGUE (SCENARIOS) ---
const scenarios = ref([
  { id: 1, title: "L'Aube Douce", objective: "Échauffement", fileRef: "build_aube_v2.1.zip", lastUpdate: "10/10/2023", image: "/images/scen-matin.png", color: "#20C997", actif: true },
  { id: 2, title: "L'Échappée Sylvestre", objective: "Coordination", fileRef: "build_foret_v1.0.zip", lastUpdate: "15/09/2023", image: "/images/scen-foret.png", color: "#00B8D9", actif: true },
  { id: 3, title: "L'Ascension Alpine", objective: "Cardio", fileRef: "build_montagne_v3.zip", lastUpdate: "01/11/2023", image: "/images/scen-montagne.png", color: "#0284C7", actif: true },
  { id: 4, title: "Course Flappy", objective: "Test Réflexes", fileRef: "build_flappy_v0.9.beta.zip", lastUpdate: "20/08/2023", image: "/images/scen-ciel.png", color: "#6B7C93", actif: false }
])
</script>

<style scoped>
/* VARIABLES & LAYOUT (Thème Clair 100%) */
.dashboard-layout { display: flex; height: 100vh; background-color: #FAFCFF; font-family: 'Nunito', sans-serif; overflow: hidden;}

.sidebar { width: 280px; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; z-index: 50; flex-shrink: 0; background: white; border-right: 1px solid #E2E8F0;}
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 40px; }
.sidebar-logo { height: 40px; }
.brand-name { font-weight: 900; font-size: 1.2rem; line-height: 1.1; margin:0; color: #0A192F;}
.brand-tag { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin:0; color: #00B8D9;}

.sidebar-menu { display: flex; flex-direction: column; gap: 6px; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #6B7C93; font-weight: 700; border-radius: 12px; transition: all 0.2s ease; font-size: 0.95rem;}
.menu-icon { display: flex; align-items: center; justify-content: center; color: #6B7C93;}
.menu-item:hover { background-color: #F8FAFC; color: #0A192F; }
.menu-item:hover .menu-icon { color: #0A192F; }
.menu-item.active { background-color: #EAF7F9; color: #00B8D9; }
.menu-item.active .menu-icon { color: #00B8D9; }

.sidebar-bottom { padding-top: 20px; border-top: 1px solid #E2E8F0;}
.pro-profile { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; padding: 12px; border-radius: 12px; background: #F8FAFC;}
.pro-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 900; background: #00B8D9; color: white;}
.pro-name { font-size: 0.9rem; font-weight: 800; margin: 0 0 2px 0; color: #0A192F;}
.pro-mail { font-size: 0.75rem; margin: 0; color: #6B7C93;}
.logout-link { background: none; border: none; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%; transition: 0.2s; padding: 5px 10px; color: #6B7C93;}
.logout-link:hover { color: #EF4444; }

.main-content { flex: 1; padding: 40px 50px; overflow-y: auto; position: relative;}
.content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; flex-shrink: 0;}
.content-header h1 { font-size: 2rem; color: #0A192F; font-weight: 900; margin: 0 0 5px 0; letter-spacing: -0.5px;}
.subtitle { color: #6B7C93; font-size: 1.05rem; margin: 0;}

/* COULEURS ET UTILITAIRES */
.text-cyan { color: #00B8D9; }
.bg-cyan { background-color: #00B8D9; }
.bg-cyan-light { background-color: #EAF7F9; }
.text-green { color: #20C997; }
.bg-green { background-color: #20C997; }
.bg-green-light { background-color: #E8F8F5; }
.text-purple { color: #8B5CF6; }
.bg-purple-light { background-color: #F3E8FF; }
.text-red { color: #EF4444; }
.bg-red-light { background-color: #FEE2E2; }
.text-warning { color: #F59E0B; }
.bg-warning { background-color: #F59E0B; }
.border-red { border-color: #EF4444 !important; }
.font-bold { font-weight: 800; color: #0A192F; }
.text-muted { color: #6B7C93; }
.text-xs { font-size: 0.8rem; }
.flex-row { display: flex; justify-content: space-between; align-items: center; }

/* BOUTONS */
.btn-primary { background: #00B8D9; color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 800; cursor: pointer; transition: 0.2s;}
.btn-primary:hover { filter: brightness(0.9); transform: translateY(-2px);}
.btn-outline { background: transparent; border: 2px solid #00B8D9; color: #00B8D9; font-weight: 800; padding: 12px; border-radius: 10px; cursor: pointer; transition: 0.2s;}
.btn-outline:hover { background: #EAF7F9; }
.btn-outline-small { background: transparent; border: 1px solid #CBD5E1; color: #4A5568; font-weight: 700; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; transition: 0.2s;}
.btn-outline-small:hover { border-color: #0A192F; color: #0A192F;}
.btn-icon { background: none; border: none; font-size: 1.2rem; cursor: pointer; transition: 0.2s; filter: grayscale(1); opacity: 0.7;}
.btn-icon:hover { filter: grayscale(0); opacity: 1; transform: scale(1.1);}

/* KPI CARDS */
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px;}
.kpi-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 15px rgba(0,0,0,0.02); border: 1px solid #E2E8F0; display: flex; align-items: center; gap: 15px;}
.kpi-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; justify-content: center; align-items: center;}
.kpi-info p { margin: 0 0 5px 0; font-size: 0.85rem; color: #6B7C93; font-weight: 700; text-transform: uppercase;}
.kpi-info h3 { margin: 0 0 5px 0; font-size: 1.6rem; color: #0A192F; font-weight: 900; line-height: 1;}
.trend { font-size: 0.75rem; font-weight: 800;}
.trend.positive { color: #20C997; }
.trend.negative { color: #EF4444; }
.trend.neutral { color: #94A3B8; }

/* TABLEAUX & FILTRES */
.search-box { display: flex; align-items: center; background: white; border: 2px solid #E2E8F0; border-radius: 10px; padding: 8px 15px; width: 300px; transition: 0.2s;}
.search-box:focus-within { border-color: #00B8D9; box-shadow: 0 0 0 3px rgba(0,184,217,0.1);}
.search-icon { color: #94A3B8; margin-right: 10px; }
.search-box input { border: none; outline: none; width: 100%; font-family: inherit; font-size: 0.95rem; color: #0A192F;}

.table-filters { display: flex; gap: 10px; margin-bottom: 20px;}
.filter-btn { background: white; border: 1px solid #E2E8F0; color: #6B7C93; padding: 6px 15px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: 0.2s;}
.filter-btn:hover { border-color: #0A192F; }
.filter-btn.active { background: #0A192F; color: white; border-color: #0A192F;}

.table-wrapper { background: white; border-radius: 16px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03); border: 1px solid #E2E8F0; overflow: hidden;}
.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { text-align: left; padding: 15px 20px; color: #6B7C93; font-weight: 800; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 0.8rem; text-transform: uppercase;}
.admin-table td { padding: 12px 20px; border-bottom: 1px solid #F1F5F9; vertical-align: middle; font-size: 0.95rem; color: #1C2833;}
.patient-cell-info { display: flex; align-items: center; gap: 12px; }
.table-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #F1F5F9;}
.role-badge, .status-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; }

/* CATALOGUE SCENARIOS */
.grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
.prescription-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 15px rgba(0,0,0,0.03); border: 1px solid #E2E8F0; display: flex; flex-direction: column; transition: 0.2s;}
.disabled-card { opacity: 0.8; background: #F8FAFC;}
.presc-img-wrapper { height: 140px; width: 100%; position: relative;}
.presc-img { height: 100%; width: 100%; object-fit: cover; transition: 0.3s;}
.disabled-overlay { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.6); color: white; display: flex; justify-content: center; align-items: center; font-weight: 900; letter-spacing: 2px; z-index: 10;}
.presc-content { padding: 20px; flex: 1; display: flex; flex-direction: column;}
.clinical-tag { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; padding: 4px 8px; border-radius: 6px; width: fit-content;}

/* TELE-READAPTATION (MOTEUR) */
.monitoring-panel { max-width: 900px; display: flex; flex-direction: column; gap: 20px;}
.live-patient { background: white; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.live-header-bar { display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;}
.btn-emergency { display: flex; align-items: center; gap: 8px; background: #EF4444; color: white; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 900; font-size: 0.85rem; cursor: pointer; transition: 0.2s;}
.btn-emergency:hover:not(:disabled) { background: #C53030; transform: scale(1.05);}
.btn-emergency:disabled { opacity: 0.5; cursor: not-allowed; }
.live-controls { padding: 25px; background: white;}
.control-row { margin-bottom: 20px; }
.slider-labels { display: flex; justify-content: space-between; margin-bottom: 10px;}
.slider-labels label { font-weight: 700; color: #4A5568; font-size: 0.9rem;}
.level-badge { font-weight: 900; color: #00B8D9; background: #EAF7F9; padding: 2px 10px; border-radius: 6px; font-size: 0.85rem;}
.custom-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 8px; background: #E2E8F0; border-radius: 5px; outline: none;}
.custom-slider:disabled::-webkit-slider-thumb { background: #94A3B8; }
.custom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #00B8D9; cursor: pointer; border: 4px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.2);}

/* SERVER STATUS */
.section-title-small { font-size: 1.1rem; color: #0A192F; font-weight: 900; margin-bottom: 15px;}
.server-status-container { display: flex; gap: 20px;}
.server-card { flex: 1; background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px;}
.server-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; color: #0A192F;}
.server-bar { width: 100%; height: 8px; background: #F8FAFC; border-radius: 10px; overflow: hidden;}
.fill { height: 100%; border-radius: 10px;}
.status-dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block;}
.mt-2 { margin-top: 10px;}

/* FORMULAIRES & MODALES */
.settings-card { background: white; border-radius: 16px; padding: 35px; box-shadow: 0 2px 15px rgba(0,0,0,0.03); border: 1px solid #E2E8F0; max-width: 700px;}
.settings-card h3 { color: #0A192F; font-size: 1.1rem; font-weight: 900; margin-bottom: 20px; border-bottom: 2px solid #F1F5F9; padding-bottom: 10px;}
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.form-group label { font-weight: 700; color: #6B7C93; font-size: 0.85rem; }
.form-group input, .form-group select { padding: 12px; border: 2px solid #E2E8F0; border-radius: 10px; background: #F8FAFC; font-family: inherit; font-size: 0.95rem; color: #0A192F; transition: 0.2s;}
.form-group input:focus { border-color: #00B8D9; outline: none; background: white;}
.update-box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px;}

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.8); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; backdrop-filter: blur(3px);}
.modal-overlay.active { opacity: 1; visibility: visible; }
.assign-modal { background: white; width: 100%; max-width: 500px; border-radius: 20px; overflow: hidden; transform: translateY(30px); transition: 0.3s; border: 1px solid #E2E8F0;}
.modal-overlay.active .assign-modal { transform: translateY(0); }
.modal-header-assign { background: #F8FAFC; padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E2E8F0;}
.modal-header-assign h3 { color: #0A192F; margin: 0; font-size: 1.2rem; font-weight: 900;}
.close-modal { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #64748B; line-height: 1; transition: 0.2s;}
.close-modal:hover { color: #0A192F;}
.modal-body-assign { padding: 25px; }

/* TOGGLE SWITCH SMALL */
.toggle-switch-small { position: relative; width: 36px; height: 20px; display: inline-block;}
.toggle-switch-small input { opacity: 0; width: 0; height: 0; }
.slider-toggle-small { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #CBD5E1; transition: .3s; border-radius: 34px; }
.slider-toggle-small:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
input:checked + .slider-toggle-small { background-color: #20C997; }
input:checked + .slider-toggle-small:before { transform: translateX(16px); }

/* ANIMATION */
.tab-fade { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>