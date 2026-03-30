<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="$router.push('/')">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <div class="brand-info">
            <p class="brand-name">Play 'N Ride</p>
            <p class="brand-tag">Pro</p>
          </div>
        </div>

        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTab === 'patients' }" @click="activeTab = 'patients'">
            <span class="icon">👥</span> Patients
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'bibliotheque' }" @click="activeTab = 'bibliotheque'">
            <span class="icon">📖</span> Bibliothèque (Assigner)
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'monitoring' }" @click="activeTab = 'monitoring'">
            <span class="icon">📈</span> Monitoring (Temps Réel)
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'parametres' }" @click="activeTab = 'parametres'">
            <span class="icon">⚙️</span> Paramètres
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="pro-profile">
          <div class="pro-avatar">D</div>
          <div class="pro-info">
            <p class="pro-name">Dr. Sophie Durand</p>
            <p class="pro-mail">pro@playnride.fr</p>
          </div>
        </div>
        <button class="logout-link" @click="$router.push('/auth')">Déconnexion ↪️</button>
      </div>
    </aside>

    <main class="main-content">
      
      <div v-if="activeTab === 'patients'">
        <header class="content-header">
          <h1>Suivi des Patients</h1>
          <div class="search-box">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Rechercher..." />
          </div>
        </header>

        <div class="table-wrapper">
          <table class="patients-table">
            <thead>
              <tr><th>Nom</th><th>Âge</th><th>Statut</th><th>Dernière séance</th><th>Progression</th><th>Niveau</th></tr>
            </thead>
            <tbody>
              <tr v-for="patient in patients" :key="patient.nom">
                <td class="font-bold">{{ patient.nom }}</td>
                <td class="text-muted">{{ patient.age }} ans</td>
                <td><span :class="['status-pill', patient.statut === 'Actif' ? 'active' : 'inactive']">{{ patient.statut }}</span></td>
                <td class="text-muted">{{ patient.derniereSeance }}</td>
                <td>
                  <div class="progress-container"><div class="progress-bar" :style="{ width: patient.progression + '%' }"></div></div>
                  <span class="progress-val">{{ patient.progression }}%</span>
                </td>
                <td class="font-bold">Niv. {{ patient.niveau }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'bibliotheque'">
        <header class="content-header">
          <h1>Prescription d'Exercices</h1>
          <p class="subtitle">Sélectionnez un scénario pour l'assigner à un patient.</p>
        </header>

        <div class="grid-layout">
          <div v-for="exo in exercises" :key="exo.id" class="card">
            <div class="card-icon">{{ exo.icon }}</div>
            <h3>{{ exo.title }}</h3>
            <p class="text-muted" style="margin-bottom: 20px;">{{ exo.desc }}</p>
            <button class="btn-primary" @click="openAssignModal(exo)">Prescrire cet exercice</button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'monitoring'">
        <header class="content-header">
          <h1>Monitoring & Ajustement à distance</h1>
          <p class="subtitle">Séances en cours actuellement.</p>
        </header>

        <div class="monitoring-panel">
          <div class="live-patient">
            <div class="live-header">
              <span class="live-indicator">🔴 EN DIRECT</span>
              <h3>Jean Dupont</h3>
              <span class="equip-badge">Pédalier (Bras)</span>
            </div>
            <div class="live-metrics">
              <div class="metric"><span>Cadence Actuelle</span><strong>45 RPM</strong></div>
              <div class="metric"><span>Rythme Cardiaque</span><strong>102 BPM</strong></div>
              <div class="metric"><span>Durée</span><strong>12:45</strong></div>
            </div>
            <div class="live-controls">
              <h4>Ajustement de la difficulté (Temps réel)</h4>
              <div class="control-row">
                <label>Résistance du pédalier</label>
                <input type="range" min="1" max="10" value="4" class="slider">
              </div>
              <div class="control-row">
                <label>Vitesse du jeu (Flappy)</label>
                <input type="range" min="1" max="5" value="2" class="slider">
              </div>
              <button class="btn-outline">Appliquer les changements</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'parametres'">
        <header class="content-header">
          <h1>Paramètres du Cabinet</h1>
        </header>
        <div class="settings-card">
          <h3>Informations Professionnelles</h3>
          <div class="form-group"><label>Nom du Médecin</label><input type="text" value="Dr. Sophie Durand" disabled></div>
          <div class="form-group"><label>Établissement</label><input type="text" value="Cabinet Kiné Sport Santé" disabled></div>
          
          <h3 style="margin-top: 30px;">Notifications</h3>
          <label class="toggle-label"><input type="checkbox" checked> Alerte si rythme cardiaque > 130 BPM</label>
          <label class="toggle-label"><input type="checkbox" checked> Alerte de fin de séance patient</label>
        </div>
      </div>
    </main>

    <div class="modal-overlay" :class="{ active: showAssignModal }">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>Prescrire : {{ selectedExo?.title }}</h3>
          <button class="close-modal" @click="showAssignModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <div class="form-group">
            <label>Patient cible</label>
            <select>
              <option v-for="p in patients" :key="p.nom">{{ p.nom }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Matériel requis</label>
            <select>
              <option>Vélo classique</option><option>Pédalier (Bras)</option><option>Pédalier (Jambes)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Objectifs / Challenges</label>
            <input type="text" placeholder="Ex: Atteindre 500 points sans s'arrêter">
          </div>
          <div class="form-group">
            <label>Date limite de réalisation</label>
            <input type="date">
          </div>
          <button class="btn-primary" style="width: 100%; margin-top: 20px;" @click="assignExercise">Confirmer la prescription</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('patients')
const showAssignModal = ref(false)
const selectedExo = ref(null)

const patients = ref([
  { nom: "Jean Dupont", age: 72, statut: "Actif", derniereSeance: "Aujourd'hui", progression: 75, niveau: 5 },
  { nom: "Marie Martin", age: 68, statut: "Actif", derniereSeance: "Hier", progression: 60, niveau: 4 },
  { nom: "Pierre Durand", age: 80, statut: "Inactif", derniereSeance: "Il y a 3 jours", progression: 40, niveau: 3 }
])

const exercises = [
  { id: 1, title: "Flappy Endurance", desc: "Maintenir la cadence constante sur une longue durée.", icon: "🐦" },
  { id: 2, title: "Sprint Montagne", desc: "Pics de résistance courts mais intenses.", icon: "⛰️" },
  { id: 3, title: "Réveil Articulaire", desc: "Mouvements doux sans résistance.", icon: "🌅" }
]

const openAssignModal = (exo) => {
  selectedExo.value = exo
  showAssignModal.value = true
}

const assignExercise = () => {
  alert("Exercice assigné au patient avec succès !")
  showAssignModal.value = false
}
</script>

<style scoped>
.dashboard-layout { display: flex; height: 100vh; background-color: #F8FAFC; font-family: 'Nunito', sans-serif;}
.sidebar { width: 280px; background: white; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; border-right: 1px solid #E2E8F0; }
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 40px; }
.sidebar-logo { height: 40px; }
.brand-name { font-weight: 900; color: #0A192F; font-size: 1.2rem; line-height: 1; }
.brand-tag { font-size: 0.8rem; color: #6B7C93; margin-top: 2px; }
.sidebar-menu { display: flex; flex-direction: column; gap: 8px; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #6B7C93; font-weight: 600; border-radius: 12px; transition: all 0.3s ease; }
.menu-item:hover { background-color: #F1F5F9; color: #0A192F; }
.menu-item.active { background-color: #00B8D9; color: white; }
.sidebar-bottom { border-top: 1px solid #E2E8F0; padding-top: 25px; }
.pro-profile { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.pro-avatar { width: 40px; height: 40px; background-color: #20C997; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem; }
.pro-name { font-size: 0.9rem; font-weight: 700; color: #0A192F; }
.pro-mail { font-size: 0.75rem; color: #6B7C93; }
.logout-link { background: none; border: none; color: #6B7C93; font-weight: 600; cursor: pointer; font-size: 0.9rem; padding: 0; }
.main-content { flex: 1; padding: 40px; overflow-y: auto; }
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.content-header h1 { font-size: 2rem; color: #0A192F; font-weight: 800; margin: 0;}
.subtitle { color: #6B7C93; font-size: 1.1rem; margin-top: 5px; }
.table-wrapper { background: white; border-radius: 20px; padding: 25px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); }
.patients-table { width: 100%; border-collapse: collapse; }
.patients-table th { text-align: left; padding: 15px; color: #6B7C93; font-weight: 600; border-bottom: 1px solid #F1F5F9; }
.patients-table td { padding: 20px 15px; border-bottom: 1px solid #F8FAFC; vertical-align: middle; }
.font-bold { font-weight: 700; color: #0A192F; }
.text-muted { color: #6B7C93; }
.status-pill { padding: 6px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: 700; }
.status-pill.active { background-color: #E8F8F5; color: #20C997; }
.status-pill.inactive { background-color: #F1F5F9; color: #94A3B8; }
.progress-container { width: 100px; height: 8px; background-color: #E2E8F0; border-radius: 10px; display: inline-block; overflow: hidden; vertical-align: middle; }
.progress-bar { height: 100%; background: linear-gradient(90deg, #00B8D9, #20C997); }
.grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; }
.card { background: white; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.03); }
.card-icon { font-size: 3rem; margin-bottom: 15px; }
.btn-primary { background: #00B8D9; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; width: 100%; }
.live-patient { background: white; border: 2px solid #FF4757; border-radius: 16px; padding: 25px; box-shadow: 0 10px 30px rgba(255, 71, 87, 0.1); }
.live-header { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
.live-indicator { background: #FF4757; color: white; font-weight: bold; font-size: 0.8rem; padding: 5px 10px; border-radius: 50px; animation: pulse 2s infinite; }
.equip-badge { background: #F1F5F9; color: #6B7C93; padding: 5px 10px; border-radius: 8px; font-size: 0.85rem; font-weight: bold; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
.live-metrics { display: flex; gap: 20px; margin-bottom: 30px; }
.metric { flex: 1; background: #F8FAFC; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
.metric span { font-size: 0.85rem; color: #6B7C93; }
.metric strong { font-size: 1.5rem; color: #0A192F; font-weight: 900; }
.live-controls { background: #F1F5F9; padding: 20px; border-radius: 12px; }
.control-row { margin-bottom: 15px; display: flex; flex-direction: column; gap: 5px; }
.slider { width: 100%; }
.btn-outline { background: transparent; border: 2px solid #00B8D9; color: #00B8D9; font-weight: bold; padding: 10px; border-radius: 8px; cursor: pointer; width: 100%; }
.settings-card { background: white; border-radius: 16px; padding: 30px; }
.form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.form-group label { font-weight: 700; color: #0A192F; font-size: 0.9rem; }
.form-group input, .form-group select { padding: 12px; border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC; font-family: inherit; }
.toggle-label { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #6B7C93; margin-bottom: 15px; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.8); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.assign-modal { background: white; width: 100%; max-width: 500px; border-radius: 20px; overflow: hidden; transform: translateY(30px); transition: 0.3s; }
.modal-overlay.active .assign-modal { transform: translateY(0); }
.modal-header-assign { background: #EAF7F9; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
.modal-header-assign h3 { color: #0A192F; margin: 0; }
.close-modal { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6B7C93; }
.modal-body-assign { padding: 30px; }
</style>