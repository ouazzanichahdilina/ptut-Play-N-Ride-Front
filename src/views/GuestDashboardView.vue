<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="goHome">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
        </div>
        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTabMain === 'bibliotheque' }" @click="activeTabMain = 'bibliotheque'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span> 
            Aventures
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTabMain === 'historique' }" @click="activeTabMain = 'historique'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span> 
            Historique
          </a>
        </nav>
      </div>
      <div class="sidebar-bottom">
        <div class="user-mini-profile">
          <div class="user-avatar-mini" style="background: white; overflow: hidden; padding: 2px;">
            <img src="/images/guest-avatar.png" alt="Invité" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
          </div>
          <div class="user-info">
            <p class="user-name">Invité</p>
            <p class="user-status">Mode Découverte</p>
          </div>
        </div>
        <button class="logout-btn-sidebar" @click="goHome">
          Quitter <img src="/images/icon-logout.png" alt="Quitter" class="logout-icon" />
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header class="content-header" v-if="activeTabMain === 'bibliotheque'">
        <h1>Prêt pour l'évasion ? </h1>
        <p class="subtitle">Installez-vous confortablement et choisissez votre prochaine destination.</p>
      </header>

      <div class="alert-banner success-banner" v-if="gameFinishedMsg">
        <div class="alert-icon">🏅</div>
        <div class="alert-content">
          <h4>Séance terminée ! Score : {{ lastScore }} pts</h4>
          <p>{{ gameFinishedMsg }}</p>
        </div>
        <button class="close-alert" @click="gameFinishedMsg = null">&times;</button>
      </div>

      <div v-if="activeTabMain === 'bibliotheque'">
        
        <div class="how-it-works-container">
          <div class="step-card">
            <div class="step-icon-clear">
              <img src="/images/icon-choose.png" alt="Choisissez" />
            </div>
            <div class="step-text-centered">
              <strong>1. Sélectionnez</strong>
              <span>Un parcours selon vos envies ou objectifs.</span>
            </div>
          </div>
          <div class="step-card">
            <div class="step-icon-clear">
              <img src="/images/icon-pedal.png" alt="Pédalez" />
            </div>
            <div class="step-text-centered">
              <strong>2. Pédalez</strong>
              <span>Commencez votre mouvement pour donner vie au décor.</span>
            </div>
          </div>
          <div class="step-card">
            <div class="step-icon-clear">
              <img src="/images/icon-escape.png" alt="Immergez-vous" />
            </div>
            <div class="step-text-centered">
              <strong>3. Immergez-vous</strong>
              <span>Profitez d'une évasion totale synchronisée à votre effort.</span>
            </div>
          </div>
        </div>

        <div class="section-title">
          <h2>Parcours & <span class="text-cyan">Évasions</span></h2>
          <p>Sélectionnez un environnement pour découvrir ses bienfaits sur votre corps.</p>
        </div>
        
        <div class="activities-grid">
          <div v-for="(activity, index) in activities" :key="index" class="activity-card" :style="{ borderTopColor: activity.color }">
            <div class="card-img-wrapper" :style="{ backgroundColor: activity.color + '15' }">
              <img :src="activity.image" :alt="activity.title" class="activity-img" />
            </div>
            <div class="card-content">
              <h3 class="poetic-title">{{ activity.title }}</h3>
              <span class="medical-badge" :style="{ color: activity.color, backgroundColor: activity.color + '15' }">
                • {{ activity.medicalObjective }}
              </span>
              
              <p class="activity-desc">{{ activity.patientPromise }}</p>
              
              <div class="activity-tags">
                <span class="tag tag-time">⏱️ {{ activity.duration }}</span>
                <span class="tag tag-intensity" :style="{ color: activity.color, borderColor: activity.color }">
                  {{ activity.intensityLevel }}
                </span>
              </div>
            </div>
            <button class="btn-play-activity" :style="{ backgroundColor: activity.color }" @click="openConfigStudio(activity)">
              Préparer la séance ➔
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTabMain === 'historique'">
        <div class="section-title">
          <h2>Votre <span class="text-cyan">Historique</span></h2>
          <p>Suivez vos progrès et consultez les détails de vos évasions passées.</p>
        </div>

        <div class="history-stats-container">
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #E8F8F5; color: #20C997;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div class="stat-info">
              <p>Séances totales</p>
              <h3>{{ historyData.length }}</h3>
            </div>
          </div>
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #EAF7F9; color: #00B8D9;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="stat-info">
              <p>Temps d'effort total</p>
              <h3>{{ totalTimePlayed }} min</h3>
            </div>
          </div>
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #F0F9FF; color: #0EA5E9;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="stat-info">
              <p>Dernière séance</p>
              <h3 style="font-size: 1.2rem;">{{ historyData.length > 0 ? historyData[0].date : 'Aucune' }}</h3>
            </div>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Aventure (Objectif)</th>
                <th>Matériel</th>
                <th>Durée</th>
                <th>Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(session, idx) in historyData" :key="idx">
                <tr class="history-row-clickable" @click="toggleRow(idx)">
                  <td><strong>{{ session.date }}</strong></td>
                  <td>{{ session.scenario }}</td>
                  <td>{{ session.equip }}</td>
                  <td>{{ session.duration }}</td>
                  <td><strong class="text-green">{{ session.score }} pts</strong></td>
                  <td style="text-align: right; color: #94A3B8;">
                    <svg :style="{ transform: expandedRow === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </td>
                </tr>
                <tr v-if="expandedRow === idx" class="history-details-row">
                  <td colspan="6">
                    <div class="history-details-box">
                      <div class="details-grid">
                        <div class="detail-item">
                          <span class="detail-label">Vitesse moyenne</span>
                          <span class="detail-value text-cyan">{{ session.avgSpeed }} km/h</span>
                        </div>
                        <div class="detail-item">
                          <span class="detail-label">Fréq. cardiaque moy.</span>
                          <span class="detail-value text-red">{{ session.avgBpm }} BPM</span>
                        </div>
                        <div class="detail-item">
                          <span class="detail-label">Ressenti patient</span>
                          <div class="detail-value-stars">
                            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= session.rating }">★</span>
                            <span class="diff-badge" :class="'diff-' + session.difficulty.toLowerCase()">{{ session.difficulty }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
              
              <tr v-if="historyData.length === 0">
                <td colspan="6" style="text-align: center; padding: 40px; color: #94A3B8;">Aucune séance enregistrée pour le moment. Allez pédaler !</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div class="modal-overlay" :class="{ active: showConfigStudio }" @click.self="showConfigStudio = false">
      <div class="clinical-modal">
        <button class="close-modal" @click="showConfigStudio = false">&times;</button>
        
        <div v-if="selectedActivity" class="modal-inner">
          
          <div class="clinical-briefing">
            <div class="briefing-header" :style="{ borderBottomColor: selectedActivity.color }">
              <span class="clinical-badge" :style="{ backgroundColor: selectedActivity.color + '20', color: selectedActivity.color }">
                {{ selectedActivity.medicalObjective.toUpperCase() }}
              </span>
              <h2>{{ selectedActivity.title }}</h2>
              <p class="briefing-subtitle">{{ selectedActivity.patientPromise }}</p>
            </div>

            <div class="briefing-body">
              <div class="clinical-target-box">
                <h4> Ce que cette séance fait travailler :</h4>
                <ul>
                  <li v-for="(target, i) in selectedActivity.targets" :key="i">{{ target }}</li>
                </ul>
              </div>

              <div class="safety-box">
                <h4> Recommandations & Sécurité</h4>
                <ul>
                  <li><strong>Préparation :</strong> Réglez bien la hauteur de votre siège ou l'installation de votre pédalier avant de commencer.</li>
                  <li><strong>Confort :</strong> Gardez une bouteille d'eau et une serviette à proximité. Adoptez une respiration régulière calée sur votre coup de pédale.</li>
                  <li><strong>Prudence :</strong> En cas d'inconfort, d'essoufflement excessif ou de douleur articulaire, <strong>ne bloquez pas les pédales brusquement</strong>. Diminuez votre cadence et la résistance de manière graduelle jusqu'à l'arrêt complet.</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="config-panel">
            <div class="config-step">
              <p class="instruction">1. Équipement utilisé</p>
              <div class="equip-grid">
                <div class="equip-card" :class="{ selected: selectedEquip === 'Vélo complet' }" @click="selectedEquip = 'Vélo complet'">
                  <img src="/images/equip-velo.png" alt="Vélo complet" class="custom-equip-icon" />
                  <p>Vélo complet</p>
                </div>
                <div class="equip-card" :class="{ selected: selectedEquip === 'Pédalier (Bras)' }" @click="selectedEquip = 'Pédalier (Bras)'">
                  <img src="/images/equip-bras.png" alt="Pédalier Bras" class="custom-equip-icon" />
                  <p>Pédalier (Bras)</p>
                </div>
                </div>
            </div>

            <div class="config-step">
              <p class="instruction">2. Avatar de jeu</p>
              <div class="options-grid-images">
                <button v-for="avatar in avatars" :key="avatar.id" class="option-btn-image" :class="{ selected: selectedAvatar === avatar.id }" @click="selectedAvatar = avatar.id">
                  <img :src="avatar.imgSrc" :alt="avatar.id" class="custom-avatar-img" />
                </button>
              </div>
            </div>

            <div class="action-footer">
              <button class="btn-start-game" :style="{ backgroundColor: selectedActivity.color }" @click="startGame">
                DÉMARRER L'AVENTURE ➔
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTabMain = ref('bibliotheque')
const gameFinishedMsg = ref(null)
const lastScore = ref(0)

// --- GESTION DE L'HISTORIQUE AVEC SAUVEGARDE LOCALE ---
// Charge les données sauvegardées ou initialise une session par défaut
const loadHistory = () => {
  const savedData = localStorage.getItem('playnride_history');
  if (savedData) {
    return JSON.parse(savedData);
  }
  return [
    {
      date: "Hier",
      scenario: "L'Échappée Sylvestre",
      equip: "Vélo complet",
      duration: "20 min",
      score: 450,
      avgSpeed: "18.5",
      avgBpm: 112,
      rating: 4,
      difficulty: "Moyen"
    }
  ];
}

const historyData = ref(loadHistory());

// Calcul automatique du temps total joué
const totalTimePlayed = computed(() => {
  return historyData.value.reduce((acc, curr) => {
    return acc + (parseInt(curr.duration) || 0);
  }, 0);
});

const expandedRow = ref(null)

const toggleRow = (index) => {
  if (expandedRow.value === index) {
    expandedRow.value = null; 
  } else {
    expandedRow.value = index; 
  }
}

onMounted(() => {
  if (route.query.finished) {
    lastScore.value = parseInt(route.query.score) || 0
    let diff = route.query.diff || "Moyen"
    
    // Obtention de la date du jour au format (ex: 24 Oct)
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

    // Ajout de la nouvelle session
    historyData.value.unshift({
      date: "Aujourd'hui", // ou today si préféré
      scenario: route.query.theme || "Aventure personnalisée",
      equip: route.query.equip || "Vélo complet",
      duration: "15 min", // Durée par défaut pour l'exemple
      score: lastScore.value,
      avgSpeed: (15 + Math.random() * 5).toFixed(1), // Génération de stats réalistes
      avgBpm: Math.floor(90 + Math.random() * 30),
      rating: 5, // Par défaut
      difficulty: diff
    })

    // SAUVEGARDE dans la mémoire du navigateur !
    localStorage.setItem('playnride_history', JSON.stringify(historyData.value));
    
    if (diff === 'Facile') {
      gameFinishedMsg.value = "Excellente séance. Vos paramètres indiquent que vous pouvez augmenter légèrement la résistance la prochaine fois."
    } else if (diff === 'Dur') {
      gameFinishedMsg.value = "Bel effort musculaire et cardio ! Veillez à bien vous étirer. Nous vous recommandons une séance de Récupération Active demain."
    } else {
      gameFinishedMsg.value = "Performance parfaitement équilibrée dans votre zone cible. Continuez sur cette lancée !"
    }
    
    // On nettoie l'URL pour ne pas rajouter la séance si on rafraîchit la page
    router.replace('/guest-dashboard')
  }
})

const activities = [
  { 
    title: "L'Aube Douce", 
    medicalObjective: "Échauffement Articulaire",
    patientPromise: "Commencez en douceur avec un pédalage léger au lever du soleil pour réveiller vos articulations et trouver votre rythme.",
    duration: "15 min", 
    intensityLevel: "Très Faible",
    targets: ["Lubrification articulaire", "Mise en route cardiovasculaire", "Fluidité du mouvement circulaire"],
    theme: "Nature", 
    image: "/images/scen-matin.png", 
    color: "#20C997" 
  },
  { 
    title: "L'Échappée Sylvestre", 
    medicalObjective: "Coordination & Proprioception",
    patientPromise: "Pédalez au cœur de la forêt. Adaptez votre cadence aux petits obstacles du parcours pour travailler votre coordination et vos réflexes.",
    duration: "20 min", 
    intensityLevel: "Modérée",
    targets: ["Coordination neuro-musculaire", "Adaptation aux variations de terrain", "Équilibre et appuis sur pédales"],
    theme: "Forêt", 
    image: "/images/scen-foret.png", 
    color: "#00B8D9" 
  },
  { 
    title: "Souffle Océanique", 
    medicalObjective: "Récupération Active & Oxygénation",
    patientPromise: "Pédalez le long de la côte en roue libre. Un rythme régulier et apaisant pour relâcher vos muscles et bien respirer.",
    duration: "10 min", 
    intensityLevel: "Variable",
    targets: ["Drainage des toxines musculaires", "Régulation du rythme respiratoire", "Relâchement des tensions"],
    theme: "Plage", 
    image: "/images/scen-plage.png", 
    color: "#0EA5E9" 
  },
  { 
    title: "Le Jardin des Sens", 
    medicalObjective: "Double Tâche Cognitivo-Motrice",
    patientPromise: "Parcourez ce jardin coloré à vélo. Votre attention sera doucement sollicitée tout en maintenant un pédalage fluide.",
    duration: "12 min", 
    intensityLevel: "Faible",
    targets: ["Maintien de l'attention pendant l'effort", "Dissociation attention/mouvement", "Mémorisation visuelle"],
    theme: "Jardin", 
    image: "/images/scen-jardin.png", 
    color: "#38BDF8" 
  },
  { 
    title: "L'Ascension Alpine", 
    medicalObjective: "Endurance & Résistance",
    patientPromise: "Un défi stimulant en montagne. Gardez le cap et la cadence sur ce parcours en pente pour faire travailler votre cœur.",
    duration: "25 min", 
    intensityLevel: "Élevée",
    targets: ["Tolérance à l'effort lactique", "Puissance musculaire des membres sollicités", "Augmentation de la capacité aérobie"],
    theme: "Montagne", 
    image: "/images/scen-montagne.png", 
    color: "#0284C7" 
  },
  { 
    title: "Voyage Aérien", 
    medicalObjective: "Retour au Calme",
    patientPromise: "Un parcours apaisant dans les nuages pour faire redescendre votre rythme cardiaque. Laissez tourner les pédales sans forcer.",
    duration: "20 min", 
    intensityLevel: "Très Faible",
    targets: ["Baisse progressive de la fréquence cardiaque", "Prévention des raideurs post-effort", "Relaxation sensorielle"],
    theme: "Ciel", 
    image: "/images/scen-ciel.png", 
    color: "#3B82F6" 
  }
]

const avatars = [
  { id: 'avatar1', imgSrc: '/images/avatar-1.png' }, 
  { id: 'avatar2', imgSrc: '/images/avatar-2.png' },
  { id: 'avatar3', imgSrc: '/images/avatar-3.png' }, 
  { id: 'avatar4', imgSrc: '/images/avatar-4.png' },
  { id: 'avatar5', imgSrc: '/images/avatar-5.png' }, 
  { id: 'avatar6', imgSrc: '/images/avatar-6.png' }
]

const showConfigStudio = ref(false)
const selectedActivity = ref(null)
const selectedAvatar = ref('avatar1')
const selectedEquip = ref('Vélo complet')

const goHome = () => router.push('/')

const openConfigStudio = (activity) => {
  selectedActivity.value = activity
  showConfigStudio.value = true
}

const startGame = () => {
  showConfigStudio.value = false
  router.push({ 
    path: '/play', 
    query: { avatar: selectedAvatar.value, theme: selectedActivity.value.theme, equip: selectedEquip.value, from: 'guest' } 
  })
}
</script>

<style scoped>
.dashboard-layout { display: flex; height: 100vh; background-color: #F4F7FB; font-family: 'Nunito', sans-serif;}
.sidebar { width: 280px; background: white; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; border-right: 1px solid #E2E8F0; }
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 40px; }
.sidebar-logo { height: 40px; }
.logo-text { font-weight: 900; color: #0A192F; font-size: 1.2rem; }
.sidebar-menu { display: flex; flex-direction: column; gap: 8px; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; text-decoration: none; color: #6B7C93; font-weight: 600; border-radius: 12px; transition: all 0.2s ease; font-size: 1.05rem;}
.menu-icon { display: flex; align-items: center; justify-content: center; font-size: 1.3rem;}
.menu-item:hover { background-color: #F1F5F9; color: #0A192F; }
.menu-item.active { background-color: #E8F8F5; color: #20C997; font-weight: 800;}
.sidebar-bottom { border-top: 1px solid #E2E8F0; padding-top: 25px; }

.user-mini-profile { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.user-avatar-mini { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.user-name { font-size: 0.9rem; font-weight: 800; color: #0A192F; margin: 0; line-height: 1.2;}
.user-status { font-size: 0.75rem; color: #00B8D9; margin: 0; font-weight: bold;}

.logout-btn-sidebar { 
  background: none; 
  border: none; 
  color: #94A3B8; 
  font-weight: 700; 
  font-size: 1.05rem; 
  cursor: pointer; 
  padding: 0; 
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 10px; 
}
.logout-btn-sidebar:hover { color: #FF4757; }
.logout-icon {
  width: 24px; 
  height: 24px;
  object-fit: contain;
}

.main-content { flex: 1; padding: 40px 50px; overflow-y: auto; }
.content-header { margin-bottom: 30px; } 
.content-header h1 { font-size: 2.2rem; color: #0A192F; font-weight: 800; margin-bottom: 5px;}
.subtitle { color: #6B7C93; font-size: 1.1rem; }

.how-it-works-container {
  display: flex;
  justify-content: space-between; 
  gap: 30px; 
  margin-bottom: 40px; 
}
.step-card {
  flex: 1;
  background: white;
  padding: 25px 20px; 
  border-radius: 20px; 
  box-shadow: 0 8px 25px rgba(0,0,0,0.03); 
  display: flex;
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
  gap: 10px;
  border-top: 4px solid #00B8D9; 
  transition: transform 0.2s ease;
}
.step-card:hover {
  transform: translateY(-3px);
}

.step-icon-clear {
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-icon-clear img {
  width: auto; 
  height: 90px; 
  max-width: 180px; 
  object-fit: contain;
}

.step-text-centered {
  display: flex;
  flex-direction: column;
  gap: 5px; 
}
.step-text-centered strong {
  color: #0A192F; 
  font-size: 1.15rem; 
  font-weight: 800;
}
.step-text-centered span {
  color: #6B7C93; 
  font-size: 0.95rem; 
  max-width: 250px; 
  margin: 0 auto; 
  line-height: 1.4;
}

.section-title { margin-bottom: 20px; }
.section-title h2 { font-size: 1.8rem; color: #0A192F; font-weight: 800; margin-bottom: 5px;}
.section-title p { color: #6B7C93; font-size: 1rem; }

.activities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
.activity-card { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-top: 5px solid #ccc; display: flex; flex-direction: column; transition: transform 0.2s ease, box-shadow 0.2s ease; overflow: hidden;}
.activity-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0,0,0,0.06);}
.card-img-wrapper { height: 180px; width: 100%; padding: 0; overflow: hidden;}
.activity-img { width: 100%; height: 100%; object-fit: cover; }
.card-content { padding: 25px 20px 15px; flex: 1; display: flex; flex-direction: column;}
.poetic-title { color: #0A192F; font-size: 1.25rem; font-weight: 800; margin-bottom: 8px; }
.medical-badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; margin-bottom: 12px; width: fit-content;}
.activity-desc { color: #4A5568; font-size: 0.9rem; line-height: 1.5; margin-bottom: 20px; flex: 1; }
.activity-tags { display: flex; gap: 10px; margin-bottom: 20px; }
.tag { padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 700; border: 1px solid transparent; }
.tag-time { background-color: #F1F5F9; color: #6B7C93; }
.tag-intensity { background-color: transparent; border-width: 1px;}
.btn-play-activity { width: 100%; padding: 15px; border: none; color: white; font-weight: 800; font-size: 0.95rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: opacity 0.2s;}
.btn-play-activity:hover { opacity: 0.9; }

.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.85); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; backdrop-filter: blur(4px);}
.modal-overlay.active { opacity: 1; visibility: visible; }
.clinical-modal { background: white; width: 100%; max-width: 900px; border-radius: 24px; overflow: hidden; position: relative; transform: translateY(30px); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 25px 50px rgba(0,0,0,0.25);}
.modal-overlay.active .clinical-modal { transform: translateY(0); }
.close-modal { position: absolute; right: 20px; top: 15px; font-size: 2rem; background: none; border: none; color: #94A3B8; cursor: pointer; z-index: 10; transition: color 0.2s;}
.close-modal:hover { color: #0A192F; }
.modal-inner { display: flex; flex-direction: row;}
.clinical-briefing { flex: 3; padding: 40px; background-color: #FAFCFF; border-right: 1px solid #E2E8F0;}
.briefing-header { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #ccc;}
.clinical-badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; margin-bottom: 15px; }
.briefing-header h2 { font-size: 2rem; color: #0A192F; font-weight: 900; margin-bottom: 10px; line-height: 1.1;}
.briefing-subtitle { color: #4A5568; font-size: 1.05rem; line-height: 1.6; }
.clinical-target-box { margin-bottom: 30px; }
.clinical-target-box h4 { display: flex; align-items: center; gap: 8px; color: #0A192F; font-size: 1.1rem; margin-bottom: 15px; font-weight: 800; }
.clinical-target-box ul { list-style: none; padding: 0; }
.clinical-target-box li { position: relative; padding-left: 24px; margin-bottom: 10px; color: #4A5568; font-weight: 600; font-size: 0.95rem;}
.clinical-target-box li::before { content: '✓'; position: absolute; left: 0; color: #20C997; font-weight: bold; font-size: 1.1rem; }
.safety-box { background: #FFF5F5; border-left: 4px solid #FC8181; padding: 20px; border-radius: 0 12px 12px 0; }
.safety-box h4 { color: #C53030; font-size: 1rem; margin-bottom: 10px; font-weight: 800;}
.safety-box ul { padding-left: 20px; margin: 0; color: #742A2A; font-size: 0.9rem; line-height: 1.5; }
.safety-box li { margin-bottom: 8px; }

.config-panel { flex: 2; display: flex; flex-direction: column; background: white;}
.config-step { padding: 30px 30px 10px; }
.instruction { color: #0A192F; font-weight: 800; font-size: 1rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px;}

/* CSS Equipements et Avatars */
.equip-grid { display: flex; flex-direction: column; gap: 10px; }
.equip-card { display: flex; align-items: center; gap: 15px; padding: 12px 20px; border: 2px solid #F1F5F9; border-radius: 12px; cursor: pointer; transition: 0.2s; background: white;}
.equip-card:hover { border-color: #CBD5E1; }
.equip-card.selected { border-color: #0EA5E9; background: #F0F9FF; }
.custom-equip-icon { width: 30px; height: 30px; object-fit: contain; } 
.equip-card p { font-weight: 700; color: #0A192F; margin: 0; font-size: 0.95rem;}

.options-grid-images { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.option-btn-image { padding: 10px; background: white; border: 2px solid #F1F5F9; border-radius: 12px; cursor: pointer; transition: 0.2s; display: flex; justify-content: center; align-items: center;}
.option-btn-image:hover { border-color: #CBD5E1; }
.option-btn-image.selected { border-color: #0EA5E9; background: #F0F9FF; }
.custom-avatar-img { width: 45px; height: 45px; object-fit: contain; }

.action-footer { margin-top: auto; padding: 30px; }
.btn-start-game { width: 100%; padding: 18px; border: none; border-radius: 12px; color: white; font-weight: 900; font-size: 1.05rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;}
.btn-start-game:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

/* === STYLES POUR LE NOUVEL HISTORIQUE === */
.history-stats-container { display: flex; gap: 20px; margin-bottom: 30px; }
.history-stat-card { flex: 1; background: white; padding: 20px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; align-items: center; gap: 15px;}
.stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; justify-content: center; align-items: center;}
.stat-info p { color: #6B7C93; font-size: 0.9rem; margin-bottom: 5px; font-weight: 600;}
.stat-info h3 { color: #0A192F; font-size: 1.6rem; font-weight: 900; margin: 0;}

.table-wrapper { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); overflow: hidden;}
.history-table { width: 100%; border-collapse: collapse; }
.history-table th { text-align: left; padding: 18px 25px; color: #6B7C93; font-weight: 700; background-color: #F8FAFC; border-bottom: 2px solid #E2E8F0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px;}
.history-table td { padding: 18px 25px; color: #0A192F; font-size: 0.95rem; border-bottom: 1px solid #F1F5F9;}

.history-row-clickable { cursor: pointer; transition: background-color 0.2s; }
.history-row-clickable:hover { background-color: #F8FAFC; }

.history-details-row td { padding: 0; border-bottom: 2px solid #E2E8F0;} 
.history-details-box { background-color: #FAFCFF; padding: 25px; border-left: 4px solid #00B8D9; box-shadow: inset 0 4px 6px -4px rgba(0,0,0,0.05);}
.details-grid { display: flex; justify-content: space-between; gap: 20px; }
.detail-item { flex: 1; display: flex; flex-direction: column; gap: 8px;}
.detail-label { color: #6B7C93; font-size: 0.85rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;}
.detail-value { font-size: 1.2rem; font-weight: 900; }
.detail-value-stars { display: flex; align-items: center; gap: 10px; }
.star { color: #E2E8F0; font-size: 1.3rem; }
.star.filled { color: #FFB800; }
.diff-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; }
.diff-facile { background: #E8F8F5; color: #20C997; }
.diff-moyen { background: #FFF9E6; color: #FFB800; }
.diff-dur { background: #FFF5F5; color: #FC8181; }

.alert-banner { display: flex; align-items: center; gap: 15px; padding: 15px 20px; border-radius: 12px; position: relative; margin-bottom: 30px;}
.success-banner { background: #E8F8F5; border: 1px solid #20C997; color: #0A192F; }
.success-banner h4 {font-size: 1.1rem; margin-bottom: 5px; color: #047857;}
.success-banner p { color: #065F46; font-size: 0.95rem; margin: 0; }
.alert-icon { font-size: 2rem; }
.close-alert { position: absolute; right: 15px; top: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #047857; }

@media (max-width: 900px) {
  .how-it-works-container { flex-direction: column; gap: 20px; }
  .modal-inner { flex-direction: column; }
  .clinical-briefing { border-right: none; border-bottom: 1px solid #E2E8F0; padding: 30px; }
  .config-panel { flex: none; }
  .history-stats-container { flex-direction: column; gap: 15px; }
  .details-grid { flex-direction: column; }
}
</style>