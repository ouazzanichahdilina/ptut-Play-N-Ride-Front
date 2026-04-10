<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="$router.push('/')">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <div class="brand-info">
            <p class="brand-name">Play 'N Ride</p>
            <p class="brand-tag">Espace Praticien</p>
          </div>
        </div>

        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTab === 'patients' }" @click.prevent="activeTab = 'patients'; showPatientDossier = false">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </span> 
            Mes Patients
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'agenda' }" @click.prevent="activeTab = 'agenda'; showPatientDossier = false">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span> 
            Agenda Cabinet
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'bibliotheque' }" @click.prevent="activeTab = 'bibliotheque'; showPatientDossier = false">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span> 
            Prescriptions
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'monitoring' }" @click.prevent="openMonitoring">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </span> 
            Temps Réel
            <span class="live-pulse-badge" v-if="unreadLiveAlerts > 0">{{ unreadLiveAlerts }}</span>
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'messagerie' }" @click.prevent="openMessagerie">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </span> 
            Messagerie
            <span v-if="unreadMessages > 0" class="notification-badge" style="margin-left: auto;">{{ unreadMessages }}</span>
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'parametres' }" @click.prevent="activeTab = 'parametres'; showPatientDossier = false">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span> 
            Paramètres
          </a>
        </nav>
      </div>

      <div class="sidebar-bottom">
        <div class="pro-profile" @click="$router.push('/profile')" style="cursor:pointer;" title="Modifier mon profil">
          <div class="pro-avatar">
            <img :src="proProfileImage" :alt="proName" @error="e => e.target.src='/images/avBlonde.png'" />
          </div>
          <div class="pro-info">
            <p class="pro-name">{{ proName }}</p>
            <p class="pro-mail" style="color:#20C997; font-weight:700;">Professionnel de santé</p>
          </div>
        </div>
        <button class="logout-link" @click="$router.push('/')">
          Déconnexion 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </aside>

    <main class="main-content">
      
      <div v-if="activeTab === 'patients'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>File Active des Patients</h1>
            <p class="subtitle">Vue globale et indicateurs cliniques.</p>
          </div>
          <div style="display:flex; align-items:center; gap:15px;">
            <div class="search-box">
              <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" v-model="searchQuery" placeholder="Rechercher un patient..." />
            </div>
            <button class="btn-primary" @click="showAddPatientModal = true">+ Nouveau Patient</button>
          </div>
        </header>

        <ProActivityChart :sessions="allSessions" style="margin-bottom: 30px;" />

        <div class="alerts-container">
          <div class="alert-card alert-warning">
            <div class="alert-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
            <div class="alert-text">
              <strong>Alerte Observance</strong>
              <p>Pierre Durand n'a réalisé aucune séance sur les 7 derniers jours.</p>
            </div>
            <button class="btn-text-only" @click="openChatWith(3)">Contacter</button>
          </div>
          <div class="alert-card alert-info">
            <div class="alert-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>
            <div class="alert-text">
              <strong>Nouveau Feedback</strong>
              <p>Jean Dupont a signalé une fatigue musculaire (EVA 7/10) hier.</p>
            </div>
            <button class="btn-text-only" @click="openPatientDossier(patients[0])">Voir le dossier</button>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="patients-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Pathologie / Objectif</th>
                <th>Dernière activité</th>
                <th>Observance</th>
                <th>Dernier EVA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in filteredPatients" :key="patient.id" class="patient-row" @click="openPatientDossier(patient)">
                <td>
                  <div class="patient-cell-info">
                    <img :src="patient.avatar" :alt="patient.nom" class="table-avatar" @error="e => e.target.src='/images/avatarN.png'" />
                    <div>
                      <span class="font-bold">{{ patient.nom }}</span>
                      <span class="text-xs text-muted block">{{ patient.age }} ans</span>
                    </div>
                  </div>
                </td>
                <td class="text-muted">{{ patient.pathologie }}</td>
                <td>
                  <span class="date-info">{{ patient.derniereSeance }}</span>
                </td>
                <td>
                  <div class="observance-wrapper">
                    <span :class="['status-dot', patient.observance >= 70 ? 'bg-green' : (patient.observance >= 50 ? 'bg-warning' : 'bg-red')]"></span>
                    <span class="font-bold">{{ patient.observance }}%</span>
                  </div>
                </td>
                <td>
                  <span :class="['diff-badge', 'diff-' + (patient.lastRPE || 'inconnu').toLowerCase()]">
                    {{ patient.lastRPE === 'inconnu' ? '—' : patient.lastRPE }}
                  </span>
                </td>
                <td>
                  <button class="btn-outline-small" @click.stop="openPatientDossier(patient)">Dossier ➔</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="patient-slide-panel" :class="{ 'panel-open': showPatientDossier }">
        <div class="panel-header" v-if="selectedPatient">
          <button class="btn-close-panel" @click="showPatientDossier = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="panel-patient-head">
            <img :src="selectedPatient.avatar" alt="Avatar" class="dossier-avatar" @error="e => e.target.src='/images/avatarN.png'" />
            <div>
              <h2>{{ selectedPatient.nom }}</h2>
              <p>{{ selectedPatient.age }} ans • {{ selectedPatient.pathologie }}</p>
            </div>
          </div>
          <div class="panel-actions">
            <button class="btn-primary-small" @click="openRecommandModal(selectedPatient)">⭐ Recommander</button>
            <button class="btn-primary-small" @click="prescribeToPatient(selectedPatient)">Prescrire</button>
            <button class="btn-secondary-small" @click="openChatWith(selectedPatient.id); showPatientDossier=false">Message</button>
          </div>
        </div>
        
        <div class="panel-body" v-if="selectedPatient">
          <div class="dossier-grid">
            <div class="dossier-card">
              <h4>Indicateurs de Santé</h4>
              <ul class="health-list">
                <li><strong>FC Max Autorisée :</strong> {{ selectedPatient.metrics.fcMax }} BPM</li>
                <li><strong>Puissance Moy. (W) :</strong> {{ selectedPatient.metrics.puissanceMoyenne }} W</li>
                <li><strong>Matériel prescrit :</strong> {{ selectedPatient.metrics.materiel }}</li>
              </ul>
            </div>
            <div class="dossier-card">
              <h4>Observance Mensuelle</h4>
              <div class="observance-big" :class="{'text-red': selectedPatient.observance < 50}">{{ selectedPatient.observance }}%</div>
              <p class="text-xs text-muted text-center">Séances complétées vs prescrites</p>
            </div>
          </div>

          <!-- Badge DÉMO -->
          <div v-if="selectedPatient.isDemo" class="demo-badge-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Profil de démonstration — données simulées
          </div>

          <!-- Graphique effort théorique vs réel -->
          <h3 class="section-title-small" style="margin-top:20px;">Analyse d'Effort — Profil théorique vs Réel</h3>
          <div v-if="selectedPatient.historique && selectedPatient.historique.length > 0" class="effort-chart-wrapper">
            <svg viewBox="0 0 400 130" style="width:100%; height:130px; border-radius:12px; background:#F8FAFC;">
              <!-- Axe Y label -->
              <text x="2" y="14" font-size="7" fill="#94A3B8">Effort</text>
              <text x="2" y="100" font-size="7" fill="#94A3B8">Bas</text>
              <!-- Grille légère -->
              <line x1="30" y1="15" x2="390" y2="15" stroke="#F1F5F9" stroke-width="1"/>
              <line x1="30" y1="55" x2="390" y2="55" stroke="#F1F5F9" stroke-width="1"/>
              <line x1="30" y1="95" x2="390" y2="95" stroke="#F1F5F9" stroke-width="1"/>
              <!-- Axes -->
              <line x1="30" y1="10" x2="30" y2="100" stroke="#CBD5E1" stroke-width="1"/>
              <line x1="30" y1="100" x2="390" y2="100" stroke="#CBD5E1" stroke-width="1"/>
              <!-- Aire remplie effort réel -->
              <polyline
                :points="realEffortPoints(selectedPatient)"
                fill="#20C99722" stroke="none"
              />
              <!-- Profil théorique (obstacles normalisés) -->
              <polyline
                :points="theoreticalPoints(selectedPatient)"
                fill="none" stroke="#00B8D9" stroke-width="2" stroke-dasharray="4 2"
              />
              <!-- Effort réel -->
              <polyline
                :points="realEffortPoints(selectedPatient)"
                fill="none" stroke="#20C997" stroke-width="2.5"
              />
              <!-- Points réels -->
              <circle
                v-for="(pt, i) in realEffortPointsArray(selectedPatient)" :key="i"
                :cx="pt.x" :cy="pt.y" r="4" fill="#20C997" stroke="white" stroke-width="1.5"
              />
              <!-- Légende -->
              <line x1="40" y1="120" x2="60" y2="120" stroke="#00B8D9" stroke-width="2" stroke-dasharray="4 2"/>
              <text x="65" y="124" font-size="8" fill="#6B7C93">Profil théorique</text>
              <line x1="165" y1="120" x2="185" y2="120" stroke="#20C997" stroke-width="2.5"/>
              <text x="190" y="124" font-size="8" fill="#6B7C93">Effort réel</text>
            </svg>
          </div>
          <!-- Vrai patient sans données : message "En attente" -->
          <div v-else-if="!selectedPatient.isDemo" class="sensor-waiting-msg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <div>
              <p>En attente de données capteurs</p>
              <span>Les courbes d'effort apparaîtront après la première séance connectée.</span>
            </div>
          </div>
          <div v-else class="empty-effort-chart">Aucune séance enregistrée.</div>

          <!-- Stats Biofeedback (patients démo uniquement) -->
          <template v-if="selectedPatient.isDemo && selectedPatient.stats">
            <h3 class="section-title-small" style="margin-top:22px;">Biofeedback & Statistiques Capteurs</h3>
            <div class="stats-biofeedback-grid">
              <div class="stat-bio-card">
                <span>Vitesse Moy.</span>
                <strong>{{ selectedPatient.stats.vitesseMoy }} km/h</strong>
              </div>
              <div class="stat-bio-card">
                <span>Vitesse Max.</span>
                <strong>{{ selectedPatient.stats.vitesseMax }} km/h</strong>
              </div>
              <div class="stat-bio-card">
                <span>Cadence</span>
                <strong>{{ selectedPatient.stats.cadence }} RPM</strong>
              </div>
              <div class="stat-bio-card">
                <span>Résistance Moy.</span>
                <strong>Niv. {{ selectedPatient.stats.resistance }}</strong>
              </div>
              <div class="stat-bio-card">
                <span>Effort Moy.</span>
                <strong class="text-cyan">{{ selectedPatient.stats.effortMoy }}%</strong>
              </div>
              <div class="stat-bio-card">
                <span>Puissance</span>
                <strong>{{ selectedPatient.stats.puissance }} W</strong>
              </div>
            </div>
          </template>

          <h3 class="section-title-small" style="margin-top:22px;">Dernières Séances & Analyse</h3>
          <div class="history-mini-list">
            <div class="history-mini-item" v-for="(seance, i) in selectedPatient.historique" :key="i">
              <div class="h-date">{{ seance.date }}</div>
              <div class="h-info">
                <strong>{{ seance.scenario }}</strong>
                <span>{{ seance.duree }} • FC Moy: {{ seance.fcMoy }} bpm • {{ seance.watts }} W</span>
              </div>
              <div class="h-rpe"><span :class="['diff-badge', 'diff-' + seance.rpe.toLowerCase()]">{{ seance.rpe }}</span></div>
            </div>
            <div v-if="selectedPatient.historique.length === 0" class="text-muted text-xs text-center" style="padding:10px;">
              Aucune séance enregistrée.
            </div>
          </div>
          
          <button 
            class="btn-primary" 
            style="width:100%; margin-top: 25px; display: flex; justify-content: center; gap: 10px;" 
            @click="generatePDF(selectedPatient)"
            :disabled="isGeneratingPDF"
          >
            <svg v-if="!isGeneratingPDF" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <svg v-else class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            {{ isGeneratingPDF ? 'Génération en cours...' : 'Générer le rapport PDF' }}
          </button>
        </div>
      </div>
      <div class="panel-backdrop" v-if="showPatientDossier" @click="showPatientDossier = false"></div>

      <div v-if="activeTab === 'agenda'" class="tab-fade flex-col">
        <header class="content-header">
          <div>
            <h1>Agenda du Cabinet</h1>
            <p class="subtitle">Vue d'ensemble des prescriptions de vos patients.</p>
          </div>
          <div class="calendar-controls">
            <button class="btn-outline-small" @click="changeMonth(-1)">❮ Précédent</button>
            <h3 class="current-month">{{ currentMonthName }} {{ currentYear }}</h3>
            <button class="btn-outline-small" @click="changeMonth(1)">Suivant ❯</button>
          </div>
        </header>

        <div class="calendar-container">
          <div class="calendar-header-days">
            <div v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']" :key="day" class="cal-day-header">{{ day }}</div>
          </div>
          <div class="calendar-grid">
            <div 
              v-for="(day, idx) in calendarDays" 
              :key="idx" 
              class="cal-cell" 
              :class="{ 'other-month': !day.isCurrentMonth, 'is-today': day.isToday }"
            >
              <div class="cal-date">{{ day.dateNumber }}</div>
              <div class="cal-events">
                <div v-for="(event, eIdx) in day.events" :key="eIdx" class="cal-event" :style="{ backgroundColor: event.color + '20', borderLeftColor: event.color }" @click.stop="openEventDetails(event, day.dateNumber, currentMonthName)">
                  <img :src="event.patient.avatar" class="event-avatar" @error="e => e.target.src='/images/avatarN.png'" />
                  <div class="event-details">
                    <span class="e-name">{{ event.patient.nom }}</span>
                    <span class="e-time">{{ event.time }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'bibliotheque'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Prescription d'Exercices</h1>
            <p class="subtitle">Sélectionnez un protocole clinique pour l'assigner à un patient.</p>
          </div>
        </header>

        <div class="grid-layout">
          <div v-for="exo in exercises" :key="exo.id" class="prescription-card">
            <div class="presc-img-wrapper" :style="{ backgroundColor: exo.color + '15' }">
              <img :src="exo.image" :alt="exo.title" class="presc-img" />
            </div>
            <div class="presc-content">
              <span class="clinical-tag" :style="{ color: exo.color, backgroundColor: exo.color + '15' }">{{ exo.objective }}</span>
              <h3>{{ exo.title }}</h3>
              <p class="text-muted">{{ exo.desc }}</p>
              <div class="presc-metrics">
                <span>⏱️ {{ exo.duration }}</span>
                <span>📈 Int. {{ exo.intensity }}</span>
              </div>
              <div style="display:flex; gap:8px; margin-top:8px;">
                <button class="btn-primary" :style="{ backgroundColor: exo.color, flex:2 }" @click="openAssignModal(exo)">Prescrire</button>
                <button v-if="exo.isOwn" class="btn-outline-small" style="flex:1;" @click="openObstacleEditor(exo)" title="Modifier les obstacles">✏️ Obstacles</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'monitoring'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Monitoring Temps Réel</h1>
            <p class="subtitle">Supervisez les séances en cours et ajustez la charge clinique.</p>
          </div>
        </header>

        <div v-if="activeSessions.length === 0" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <h4>Aucune séance en cours</h4>
          <p>Vos patients ne sont pas connectés pour le moment.</p>
        </div>

        <div class="monitoring-panel" v-else>
          <div class="live-patient" v-for="session in activeSessions" :key="session.id">
            <div class="live-header-bar">
              <div class="live-patient-info">
                <span class="live-indicator" v-if="!session.isStopped">🔴 EN SÉANCE</span>
                <span class="live-indicator" style="background: #94A3B8; animation: none;" v-else>⏹️ SÉANCE ARRÊTÉE</span>
                
                <img :src="session.patient.avatar" alt="Avatar" class="live-avatar" @error="e => e.target.src='/images/avatarN.png'" />
                <div>
                  <h3>{{ session.patient.nom }}</h3>
                  <span class="equip-badge">{{ session.equipement }} • {{ session.scenario }}</span>
                </div>
              </div>
              <button class="btn-emergency" @click="emergencyStop(session)" :disabled="session.isStopped">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                ARRÊT MOTEUR
              </button>
            </div>

            <div class="live-metrics">
              <div class="metric">
                <span>Cadence (RPM)</span>
                <strong class="text-cyan">{{ session.isStopped ? 0 : session.rpm }}</strong>
                <div class="metric-chart" v-if="!session.isStopped">---^--^---</div>
                <div class="metric-chart" v-else>----------</div>
              </div>
              <div class="metric">
                <span>Fréq. Cardiaque</span>
                <strong :class="session.bpm > 120 ? 'text-red' : 'text-blue'">{{ session.bpm }} BPM</strong>
                <div class="metric-chart" :style="{ color: session.bpm > 120 ? '#FC8181' : '#00B8D9' }">-v-v-v-</div>
              </div>
              <div class="metric">
                <span>Temps écoulé</span>
                <strong>{{ session.timeElapsed }}</strong>
                <span class="text-xs text-muted">Sur {{ session.timeTotal }}</span>
              </div>
            </div>

            <div class="live-controls">
              <h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Ajustement Télé-réadaptation</h4>
              <div class="control-row">
                <div class="slider-labels"><label>Niveau de Résistance (Moteur)</label><span>Niv. {{ session.resistance }}</span></div>
                <input type="range" min="1" max="10" v-model="session.resistance" class="slider custom-slider" :disabled="session.isStopped">
              </div>
              
              <button 
                class="btn-outline" 
                style="margin-top: 10px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;" 
                @click="sendAdjustment(session)"
                :disabled="session.isSending || session.isStopped"
              >
                <template v-if="session.isSending">
                  <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Transmission...
                </template>
                <template v-else-if="session.adjustmentSent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#20C997" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span style="color: #20C997;">Ajustement envoyé</span>
                </template>
                <template v-else>
                  Transmettre l'ajustement
                </template>
              </button>

            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'parametres'" class="tab-fade">
        <header class="content-header">
          <h1>Paramètres du Cabinet</h1>
        </header>
        <div class="settings-card">
          <h3>Informations Professionnelles</h3>
          <div class="form-group"><label>Nom du Praticien</label><input type="text" value="Dr. Sophie Durand"></div>
          <div class="form-group"><label>Établissement / SIRET</label><input type="text" value="Cabinet Kiné Sport Santé - 12345678900012"></div>
          
          <h3 style="margin-top: 40px;">Règles de Sécurité Globales</h3>
          <label class="toggle-label">
            <div class="toggle-switch"><input type="checkbox" checked><span class="slider-toggle"></span></div>
            Alerte SMS si Fréquence Cardiaque > 130 BPM
          </label>
          <label class="toggle-label">
            <div class="toggle-switch"><input type="checkbox" checked><span class="slider-toggle"></span></div>
            Notifier lors de la connexion d'un patient
          </label>
          <label class="toggle-label">
            <div class="toggle-switch"><input type="checkbox"><span class="slider-toggle"></span></div>
            Générer rapports PDF automatiques chaque vendredi
          </label>

          <button class="btn-primary" style="margin-top: 20px; width: auto;">Enregistrer les modifications</button>
        </div>
      </div>

      <div v-if="activeTab === 'messagerie'" class="tab-fade">
        <header class="content-header">
          <div>
            <h1>Messagerie & Feedbacks</h1>
            <p class="subtitle">Échangez avec vos patients et analysez leurs retours.</p>
          </div>
        </header>

        <div class="messages-layout">
          <div class="messages-list">
            <div
              v-for="p in messagerieContacts"
              :key="p.id"
              class="msg-contact"
              :class="{ active: selectedChatUserId === p.id }"
              @click="selectChat(p.id)"
            >
              <img :src="p.avatar" alt="Avatar" @error="e => e.target.src='/images/avatarN.png'" />
              <div class="contact-info">
                <h4>{{ p.nom }}</h4>
                <p>{{ getLastMessage(p.id) }}</p>
              </div>
            </div>
          </div>
          
          <div class="messages-chat">
            <div class="chat-header-pro">
              <h4>Discussion avec {{ currentChatPatient.nom }}</h4>
              <button class="btn-outline-small" @click="openPatientDossier(currentChatPatient)">Voir le dossier clinique</button>
            </div>
            <div class="chat-body" ref="chatBodyRef">
              <div 
                v-for="(msg, i) in currentChatMessages" 
                :key="i" 
                class="message-row" 
                :class="msg.sender === 'pro' ? 'from-pro' : 'from-patient'"
              >
                <div class="message-bubble">
                  <p>{{ msg.text }}</p>
                  <span class="message-time">{{ msg.time }}</span>
                </div>
              </div>
              <div v-if="currentChatMessages.length === 0" class="text-center text-muted" style="margin-top: 40px;">
                Aucun message récent avec ce patient.
              </div>
            </div>
            <div class="chat-input-pro">
              <input 
                type="text" 
                v-model="newMessage" 
                :placeholder="'Répondez à ' + currentChatPatient.nom + '...'" 
                @keyup.enter="sendMessage"
              />
              <button class="btn-send-pro" @click="sendMessage">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="modal-overlay" :class="{ active: showAssignModal }" @click.self="showAssignModal = false">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>Nouvelle Ordonnance</h3>
          <button class="close-modal" @click="showAssignModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <div class="presc-summary">
            <img :src="selectedExo?.image" alt="Exo" />
            <div>
              <strong>{{ selectedExo?.title }}</strong>
              <p class="text-xs text-muted">{{ selectedExo?.objective }}</p>
            </div>
          </div>

          <div class="form-group">
            <label>Patient cible</label>
            <select v-model="assignTargetPatient">
              <option v-for="p in patients" :key="p.id" :value="p">{{ p.nom }}</option>
            </select>
          </div>
          
          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Durée</label>
              <select><option>10 min</option><option selected>15 min</option><option>20 min</option></select>
            </div>
            <div class="form-group" style="flex: 1;">
              <label>Résistance Max</label>
              <select><option>Niveau 2</option><option selected>Niveau 4</option><option>Niveau 6</option></select>
            </div>
          </div>

          <div class="form-group">
            <label>Consigne clinique (Optionnelle)</label>
            <input type="text" placeholder="Ex: Maintenir un rythme cardiaque sous 110 BPM.">
          </div>
          
          <div class="form-group">
            <label>Date de la séance</label>
            <input type="date" v-model="assignDate">
          </div>

          <button class="btn-primary" style="width: 100%; margin-top: 20px; padding: 15px;" @click="confirmAssignment">Confirmer la prescription</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" :class="{ active: showAddPatientModal }" @click.self="showAddPatientModal = false">
      <div class="assign-modal">
        <div class="modal-header-assign">
          <h3>Ajouter un nouveau patient</h3>
          <button class="close-modal" @click="showAddPatientModal = false">&times;</button>
        </div>
        <div class="modal-body-assign">
          <p class="text-sm text-muted" style="margin-bottom: 20px;">Générez un code de liaison unique. Le patient l'utilisera lors de son inscription sur la plateforme pour que son compte soit relié automatiquement à votre cabinet.</p>

          <div class="form-group">
            <label>Nom complet</label>
            <input type="text" v-model="newPatientNom" placeholder="Ex: Jean Dupont">
          </div>
          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Âge</label>
              <input type="number" v-model="newPatientAge" placeholder="Ex: 65">
            </div>
            <div class="form-group" style="flex: 2;">
              <label>Pathologie / Motif</label>
              <input type="text" v-model="newPatientPathologie" placeholder="Ex: Rééducation post-opératoire">
            </div>
          </div>

          <div class="form-group">
            <label>Code de liaison généré (à transmettre au patient)</label>
            <input type="text" :value="generatedCode" readonly style="font-weight: bold; color: #00B8D9; text-align: center; letter-spacing: 2px;">
          </div>

          <button class="btn-primary" style="width: 100%; margin-top: 15px; padding: 15px;" @click="createNewPatient">Créer le dossier patient</button>
        </div>
      </div>
    </div>

    <!-- ========================= MODAL RECOMMANDER SCÉNARIO ========================= -->
    <div class="modal-overlay" :class="{ active: showRecommandModal }" @click.self="showRecommandModal = false">
      <div class="assign-modal" style="max-width:480px;">
        <div class="modal-header-assign">
          <h3>Recommander un scénario</h3>
          <button class="close-modal" @click="showRecommandModal = false">&times;</button>
        </div>
        <div class="modal-body-assign" v-if="recommandTarget">
          <p class="text-sm text-muted" style="margin-bottom:16px;">Patient : <strong>{{ recommandTarget.nom }}</strong></p>
          <div class="form-group">
            <label>Choisir le scénario</label>
            <select v-model="recommandScenario">
              <option v-for="exo in exercises" :key="exo.id" :value="exo.title">{{ exo.title }} — {{ exo.objective }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Consigne clinique (optionnelle)</label>
            <input type="text" v-model="recommandNote" placeholder="Ex: Maintenir FC < 110 BPM" />
          </div>
          <button class="btn-primary" style="width:100%; margin-top:16px;" @click="confirmRecommandation">Envoyer la recommandation</button>
        </div>
      </div>
    </div>

    <!-- ========================= MODAL ÉDITEUR OBSTACLES ========================= -->
    <div class="modal-overlay" :class="{ active: showObstacleEditor }" @click.self="showObstacleEditor = false">
      <div class="assign-modal" style="max-width:520px;">
        <div class="modal-header-assign">
          <h3>Modifier les obstacles — {{ editingExo?.title }}</h3>
          <button class="close-modal" @click="showObstacleEditor = false">&times;</button>
        </div>
        <div class="modal-body-assign" v-if="editingExo">
          <p class="text-xs text-muted" style="margin-bottom:12px;">Format obstacles : séquence de <code>y1</code>, <code>x1</code>, <code>y2</code>, <code>x2</code> séparés par des espaces (y = Haut, x = Bas, 1 = normal, 2 = difficile).</p>
          <div class="form-group">
            <label>Séquence Obstacles (Haut/Bas)</label>
            <input type="text" v-model="editingExo.obstaclesManager" placeholder="y1 x1 y2 x1 y1 x2" />
          </div>
          <div class="form-group">
            <label>Distances entre obstacles (px)</label>
            <input type="text" v-model="editingExo.distanceManager" placeholder="70 50 80 60 45 30" />
          </div>
          <div class="form-group">
            <label>Durée (min)</label>
            <input type="number" v-model="editingExo.dureeMinutes" min="1" />
          </div>
          <button class="btn-primary" style="width:100%; margin-top:16px;" @click="saveObstacles">Enregistrer les modifications</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" :class="{ active: showAgendaEventModal }" @click.self="showAgendaEventModal = false">
      <div class="assign-modal" style="max-width: 400px;">
        <div class="modal-header-assign" style="background: white; border-bottom: 1px solid #E2E8F0;">
          <h3>Détail de la séance</h3>
          <button class="close-modal" @click="showAgendaEventModal = false">&times;</button>
        </div>
        <div class="modal-body-assign" v-if="selectedAgendaEvent">
          <div class="event-modal-head">
            <img :src="selectedAgendaEvent.patient.avatar" alt="Avatar" class="event-modal-avatar" @error="e => e.target.src='/images/avatarN.png'" />
            <div>
              <h4 style="margin:0; color:#0A192F;">{{ selectedAgendaEvent.patient.nom }}</h4>
              <p class="text-muted text-xs" style="margin:0;">Prévu à {{ selectedAgendaEvent.time }}</p>
            </div>
          </div>
          <div class="event-modal-body">
            <div class="e-data">
              <span>Scénario prescrit</span>
              <strong>{{ selectedAgendaEvent.scenario }}</strong>
            </div>
            <div class="e-data">
              <span>Durée cible</span>
              <strong>{{ selectedAgendaEvent.duration }}</strong>
            </div>
            <div class="e-data">
              <span>Date</span>
              <strong>{{ selectedAgendaEvent.fullDate }}</strong>
            </div>
          </div>
          <div style="display:flex; flex-direction: column; gap:10px; margin-top: 20px;">
            <button class="btn-primary" @click="openPatientDossierFromAgenda">Ouvrir le dossier clinique</button>
            <button class="btn-outline" @click="showAgendaEventModal = false">Fermer</button>
          </div>
        </div>
      </div>
    </div>

  <!-- Toast Pro -->
  <Transition name="toast">
    <div v-if="proToast.show" :class="['toast', proToast.type]">{{ proToast.message }}</div>
  </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '../config.js'
import ProActivityChart from '../components/ProActivityChart.vue'

const router = useRouter()

const proName = ref(localStorage.getItem('nom') || 'Professionnel de Santé')
const proProfileImage = ref(localStorage.getItem('playnride_user_avatar') || '/images/avBlonde.png')

const refreshProProfile = () => {
  const saved = localStorage.getItem('playnride_user_avatar')
  if (saved) proProfileImage.value = saved
  proName.value = localStorage.getItem('nom') || proName.value
}

const allSessions = ref([])

const fetchAllSessions = async () => {
  const token = localStorage.getItem('token')
  if (!token) return
  try {
    const res = await fetch(`${API_URL}/seances`, { headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) allSessions.value = await res.json()
  } catch { /* silencieux si endpoint indisponible */ }
}

onMounted(async () => {
  refreshProProfile()
  await fetchProPatients()
  fetchAllSessions()
  generateCalendar()
  window.addEventListener('focus', refreshProProfile)
})

onUnmounted(() => {
  window.removeEventListener('focus', refreshProProfile)
})

const activeTab = ref('patients')
const showAssignModal = ref(false)
const showAddPatientModal = ref(false)
const newPatientNom = ref('')
const newPatientAge = ref('')
const newPatientPathologie = ref('')
const generatedCode = computed(() => {
  if (!newPatientNom.value) return 'CODE-LIAISON-XXXX'
  const nom = newPatientNom.value.split(' ')[0].toUpperCase().slice(0, 6)
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `${nom}-${year}-${rand}`
})
const createNewPatient = () => { showAddPatientModal.value = false; newPatientNom.value = ''; newPatientAge.value = ''; newPatientPathologie.value = '' }
const showPatientDossier = ref(false)
const selectedExo = ref(null)
const selectedPatient = ref(null)
const searchQuery = ref('')
const isGeneratingPDF = ref(false)

// --------------------------------------------------------
// PATIENTS DEPUIS L'API
// --------------------------------------------------------
const avatarList = ['/images/avatarN.png', '/images/avBlonde.png', '/images/avBlackW.png', '/images/azouz.png', '/images/avatarRousse.png']
const isLoadingPatients = ref(false)

// --------------------------------------------------------
// PATIENTS FICTIFS PERMANENTS (MODÈLES DE DÉMONSTRATION)
// --------------------------------------------------------
const FICTITIOUS_PATIENTS = [
  {
    id: 9001,
    nom: 'Jean Dupont',
    age: 58,
    pathologie: 'Rééducation Genou Post-Op',
    observance: 87,
    lastRPE: 'Moyen',
    derniereSeance: "Aujourd'hui",
    avatar: '/images/avatarN.png',
    isDemo: true,
    metrics: { fcMax: 130, puissanceMoyenne: 95, materiel: 'Pédalier (Jambes)' },
    stats: { vitesseMoy: 14.2, vitesseMax: 22.1, cadence: 68, resistance: 5, effortMoy: 72, puissance: 95 },
    historique: [
      { date: '08/04', scenario: "L'Aube Douce",         duree: '15', fcMoy: 98,  watts: 80,  rpe: 'Moyen'     },
      { date: '06/04', scenario: "L'Échappée Sylvestre", duree: '20', fcMoy: 112, watts: 95,  rpe: 'Moyen'     },
      { date: '04/04', scenario: "L'Ascension Alpine",   duree: '22', fcMoy: 125, watts: 110, rpe: 'Difficile' },
      { date: '02/04', scenario: "L'Aube Douce",         duree: '14', fcMoy: 96,  watts: 78,  rpe: 'Facile'    },
      { date: '01/04', scenario: "L'Échappée Sylvestre", duree: '19', fcMoy: 108, watts: 92,  rpe: 'Moyen'     }
    ]
  },
  {
    id: 9002,
    nom: 'Marie Lambert',
    age: 45,
    pathologie: 'Cardio-Réhabilitation Phase II',
    observance: 72,
    lastRPE: 'Facile',
    derniereSeance: 'Hier',
    avatar: '/images/avBlonde.png',
    isDemo: true,
    metrics: { fcMax: 120, puissanceMoyenne: 75, materiel: 'Vélo Complet' },
    stats: { vitesseMoy: 11.8, vitesseMax: 17.5, cadence: 55, resistance: 3, effortMoy: 58, puissance: 75 },
    historique: [
      { date: '09/04', scenario: "L'Aube Douce",      duree: '15', fcMoy: 95,  watts: 70, rpe: 'Facile' },
      { date: '07/04', scenario: "Souffle Océanique", duree: '10', fcMoy: 102, watts: 75, rpe: 'Moyen'  },
      { date: '05/04', scenario: "L'Aube Douce",      duree: '15', fcMoy: 88,  watts: 65, rpe: 'Facile' },
      { date: '03/04', scenario: "L'Aube Douce",      duree: '12', fcMoy: 93,  watts: 68, rpe: 'Facile' }
    ]
  }
]

const patients = ref([...FICTITIOUS_PATIENTS])

const fetchProPatients = async () => {
  const token = localStorage.getItem('token')
  isLoadingPatients.value = true
  try {
    // Tente d'abord /mes-patients (patients assignés au pro connecté)
    let data = []
    const res = await fetch(`${API_URL}/utilisateurs/mes-patients`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) {
      data = await res.json()
    }
    // Fallback : si aucun patient assigné, on récupère tous les patients
    if (data.length === 0) {
      const res2 = await fetch(`${API_URL}/utilisateurs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res2.ok) {
        const all = await res2.json()
        data = all.filter(u => (u.statut || '').toLowerCase() === 'patient')
      }
    }
    const realPatients = data.map(u => ({
      id: u.id,
      nom: u.nom,
      age: u.age || '--',
      pathologie: u.pathologie || 'Données non renseignées',
      observance: u.observance || 0,
      lastRPE: u.lastRPE || 'inconnu',
      derniereSeance: u.derniereSeance || 'Inconnue',
      avatar: avatarList[u.id % avatarList.length],
      isDemo: false,
      metrics: {
        fcMax: u.fcMax || '--',
        puissanceMoyenne: u.puissanceMoyenne || '--',
        materiel: u.materiel || 'Non prescrit'
      },
      historique: []
    }))
    // Toujours inclure les patients fictifs en tête de liste
    patients.value = [...FICTITIOUS_PATIENTS, ...realPatients]
    if (!selectedChatUserId.value && patients.value.length > 0) {
      selectedChatUserId.value = patients.value[0].id
    }
  } catch {
    // En cas d'échec API, on garde uniquement les patients fictifs
    patients.value = [...FICTITIOUS_PATIENTS]
  }
  finally { isLoadingPatients.value = false }
}

const filteredPatients = computed(() => {
  return patients.value.filter(p => p.nom.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

// --------------------------------------------------------
// SCENARIOS CLINIQUES
// --------------------------------------------------------
const PRO_SCENARIOS_KEY = 'playnride_scenarios'
const baseExercises = [
  { id: 1, title: "L'Aube Douce",        objective: "Échauffement", desc: "Pédalage léger pour réveiller les articulations.",            duration: "15 min", intensity: "Faible",   image: "/images/scen-matin.png",    color: "#20C997", obstaclesManager: "y1 y1 y1 y1 x1 x1 x1 x1 y1 y1", distanceManager: "70 70 70 120 70 70 70 120 70 70", dureeMinutes: 15, isOwn: false },
  { id: 2, title: "L'Échappée Sylvestre", objective: "Coordination", desc: "Adaptation de la cadence aux variations du terrain en forêt.", duration: "20 min", intensity: "Modérée", image: "/images/scen-foret.png",    color: "#00B8D9", obstaclesManager: "y1 x1 y2 x1 y1 x2 y1 x1 y2 x2", distanceManager: "45 20 60 30 50 25 70 20 50 30",  dureeMinutes: 20, isOwn: false },
  { id: 3, title: "L'Ascension Alpine",   objective: "Cardio",       desc: "Défi stimulant en montagne pour faire travailler le cœur.",  duration: "25 min", intensity: "Élevée",  image: "/images/scen-montagne.png", color: "#0284C7", obstaclesManager: "y2 y2 x1 y2 y2 x2 y2 y2 y2 x2", distanceManager: "20 40 30 20 20 50 30 20 40 60",  dureeMinutes: 25, isOwn: false }
]

// Fusionne avec les scénarios créés par l'admin (stockés en localStorage)
const loadExercises = () => {
  try {
    const saved = localStorage.getItem(PRO_SCENARIOS_KEY)
    if (!saved) return baseExercises
    const adminScenarios = JSON.parse(saved)
    return adminScenarios.filter(s => s.actif !== false).map(s => ({
      ...s,
      duration: `${s.dureeMinutes || 15} min`,
      intensity: s.objective === 'Cardio' ? 'Élevée' : s.objective === 'Échauffement' ? 'Faible' : 'Modérée',
      desc: s.desc || s.objective,
      isOwn: false
    }))
  } catch { return baseExercises }
}

const exercises = ref(loadExercises())

// ── Recommandations ──────────────────────────────────────────────────────────
const RECOMMANDATIONS_KEY = 'playnride_recommandations'
const showRecommandModal = ref(false)
const recommandTarget = ref(null)
const recommandScenario = ref('')
const recommandNote = ref('')

const openRecommandModal = (patient) => {
  recommandTarget.value = patient
  recommandScenario.value = exercises.value[0]?.title || ''
  recommandNote.value = ''
  showRecommandModal.value = true
}

const confirmRecommandation = () => {
  if (!recommandTarget.value || !recommandScenario.value) return
  const stored = JSON.parse(localStorage.getItem(RECOMMANDATIONS_KEY) || '{}')
  if (!stored[recommandTarget.value.id]) stored[recommandTarget.value.id] = []
  stored[recommandTarget.value.id].unshift({ scenario: recommandScenario.value, note: recommandNote.value, date: new Date().toLocaleDateString('fr-FR') })
  localStorage.setItem(RECOMMANDATIONS_KEY, JSON.stringify(stored))
  showRecommandModal.value = false
  showToastPro(`Recommandation envoyée à ${recommandTarget.value.nom}`, 'success')
}

// ── Éditeur obstacles ────────────────────────────────────────────────────────
const showObstacleEditor = ref(false)
const editingExo = ref(null)

const openObstacleEditor = (exo) => {
  editingExo.value = { ...exo }
  showObstacleEditor.value = true
}

const saveObstacles = () => {
  const idx = exercises.value.findIndex(e => e.id === editingExo.value.id)
  if (idx !== -1) {
    exercises.value[idx] = { ...editingExo.value }
    // Persistance via localStorage scénarios
    const stored = JSON.parse(localStorage.getItem(PRO_SCENARIOS_KEY) || '[]')
    const sIdx = stored.findIndex(s => s.id === editingExo.value.id)
    if (sIdx !== -1) {
      stored[sIdx] = { ...stored[sIdx], obstaclesManager: editingExo.value.obstaclesManager, distanceManager: editingExo.value.distanceManager, dureeMinutes: editingExo.value.dureeMinutes }
      localStorage.setItem(PRO_SCENARIOS_KEY, JSON.stringify(stored))
    }
  }
  showObstacleEditor.value = false
  showToastPro('Obstacles mis à jour !', 'success')
}

// ── Graphique effort théorique vs réel ──────────────────────────────────────
const theoreticalPoints = (patient) => {
  const seances = patient.historique || []
  if (!seances.length) return ''
  const w = 360, h = 80, margin = 30
  return seances.slice(0, 10).map((s, i) => {
    const x = margin + (i / (seances.length - 1 || 1)) * w
    // Profil théorique basé sur le RPE prescrit (Facile=20%, Moyen=50%, Dur=80%)
    const rpeMap = { 'Facile': 0.2, 'Moyen': 0.5, 'Dur': 0.8, 'N/A': 0.4 }
    const y = 100 - ((rpeMap[s.rpe] || 0.4) * h)
    return `${x},${y}`
  }).join(' ')
}

const realEffortPoints = (patient) => {
  const seances = patient.historique || []
  if (!seances.length) return ''
  const w = 360, h = 80, margin = 30
  const maxDuree = Math.max(...seances.map(s => parseInt(s.duree) || 1), 1)
  return seances.slice(0, 10).map((s, i) => {
    const x = margin + (i / (seances.length - 1 || 1)) * w
    const duree = parseInt(s.duree) || 0
    const y = 100 - ((duree / maxDuree) * h)
    return `${x},${y}`
  }).join(' ')
}

// Retourne tableau d'objets {x, y} pour les cercles sur le graphique
const realEffortPointsArray = (patient) => {
  const seances = patient.historique || []
  if (!seances.length) return []
  const w = 360, h = 80, margin = 30
  const maxDuree = Math.max(...seances.map(s => parseInt(s.duree) || 1), 1)
  return seances.slice(0, 10).map((s, i) => {
    const x = margin + (i / (seances.length - 1 || 1)) * w
    const duree = parseInt(s.duree) || 0
    const y = 100 - ((duree / maxDuree) * h)
    return { x, y }
  })
}

// ── Toast local Pro ──────────────────────────────────────────────────────────
const proToast = ref({ show: false, message: '', type: 'success' })
const showToastPro = (message, type = 'success') => {
  proToast.value = { show: true, message, type }
  setTimeout(() => { proToast.value.show = false }, 3000)
}

// --------------------------------------------------------
// GESTION DU CHAT DYNAMIQUE ET NOTIFS
// --------------------------------------------------------
const selectedChatUserId = ref(null)
const newMessage = ref('')
const chatBodyRef = ref(null)
const unreadMessages = ref(1)

const chatMessages = ref({
  1: [
    { sender: 'pro', text: "Bonjour Jean, j'ai bien analysé vos résultats. L'effort fourni est parfaitement dans la cible.", time: "Hier, 14:30" },
    { sender: 'patient', text: "Merci Docteur ! J'ai ressenti une petite fatigue musculaire (EVA 7) hier par contre.", time: "Hier, 15:45" }
  ],
  2: [
    { sender: 'patient', text: "Séance bien terminée, aucune douleur.", time: "Hier, 09:00" },
    { sender: 'pro', text: "Parfait Marie, continuez comme ça. Nous augmenterons la résistance la semaine prochaine.", time: "Hier, 09:15" }
  ],
  3: [] 
})

const currentChatPatient = computed(() => {
  const list = messagerieContacts.value
  return list.find(p => p.id === selectedChatUserId.value) || list[0] || { id: null, nom: '...', avatar: '' }
})
const currentChatMessages = computed(() => chatMessages.value[selectedChatUserId.value] || [])

const selectChat = (patientId) => {
  selectedChatUserId.value = patientId
  scrollToBottom()
}

const getLastMessage = (patientId) => {
  const msgs = chatMessages.value[patientId]
  if (msgs && msgs.length > 0) {
    return msgs[msgs.length - 1].text
  }
  return "Aucun message."
}

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  if (!chatMessages.value[selectedChatUserId.value]) {
    chatMessages.value[selectedChatUserId.value] = []
  }
  chatMessages.value[selectedChatUserId.value].push({
    sender: 'pro',
    text: newMessage.value,
    time: "À l'instant"
  })
  newMessage.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
  })
}

// ── MESSAGERIE : PATIENTS RÉELS DEPUIS L'API ──────────────────────────────────
const apiPatients = ref([])
const apiPatientsLoaded = ref(false)

const fetchApiPatients = async () => {
  if (apiPatientsLoaded.value) return
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${API_URL}/utilisateurs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) {
      const data = await res.json()
      const avatarList = ['/images/avatarN.png', '/images/avBlonde.png', '/images/avBlackW.png', '/images/azouz.png', '/images/avatarRousse.png']
      apiPatients.value = data
        .filter(u => u.statut === 'patient' || u.statut?.toLowerCase() === 'patient')
        .map(u => ({
          id: u.id,
          nom: u.nom,
          avatar: avatarList[u.id % avatarList.length]
        }))
      apiPatientsLoaded.value = true
      if (!selectedChatUserId.value && apiPatients.value.length > 0) {
        selectedChatUserId.value = apiPatients.value[0].id
      }
    }
  } catch { /* silencieux */ }
}

const messagerieContacts = computed(() => {
  return apiPatients.value.length > 0 ? apiPatients.value : patients.value
})

const openMessagerie = () => {
  activeTab.value = 'messagerie'
  unreadMessages.value = 0 // Enlève la notif au clic !
  fetchApiPatients()
  scrollToBottom()
}

const openChatWith = (patientId) => {
  selectChat(patientId)
  openMessagerie()
}

// --------------------------------------------------------
// DONNEES TEMPS REEL - PATIENTS REELS + SIMULATION
// --------------------------------------------------------
const activeSessions = ref([])
const unreadLiveAlerts = ref(0)

const equipements = ["Pédalier (Bras)", "Vélo Complet", "Pédalier (Jambes)"]
const scenarios = ["Forêt Endurance", "Réveil Articulaire", "Plage Récupération", "L'Ascension Alpine"]

const fetchActiveSessions = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetch(`${API_URL}/utilisateurs`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) {
      const data = await res.json()
      const avatarList = ['/images/avatarN.png', '/images/avBlonde.png', '/images/avBlackW.png', '/images/azouz.png', '/images/avatarRousse.png']
      const realPatients = data
        .filter(u => u.statut === 'patient' || (u.statut || '').toLowerCase() === 'patient')
        .slice(0, 3)
      if (realPatients.length > 0) {
        activeSessions.value = realPatients.map((u, i) => ({
          id: 100 + u.id,
          patient: {
            id: u.id,
            nom: u.nom,
            avatar: avatarList[u.id % avatarList.length]
          },
          equipement: equipements[i % equipements.length],
          scenario: scenarios[i % scenarios.length],
          rpm: 30 + Math.floor(Math.random() * 30),
          bpm: 90 + Math.floor(Math.random() * 40),
          timeElapsed: `${8 + i}:${String(Math.floor(Math.random()*60)).padStart(2,'0')}`,
          timeTotal: "20:00",
          resistance: 3 + (i % 4),
          isSending: false,
          adjustmentSent: false,
          isStopped: false
        }))
        unreadLiveAlerts.value = activeSessions.value.length
        return
      }
    }
  } catch { /* silencieux */ }
  // Fallback : patients de démo
  activeSessions.value = [
    { id: 101, patient: patients.value[0], equipement: "Pédalier (Bras)", scenario: "Forêt Endurance", rpm: 45, bpm: 112, timeElapsed: "12:45", timeTotal: "20:00", resistance: 4, isSending: false, adjustmentSent: false, isStopped: false }
  ]
  unreadLiveAlerts.value = activeSessions.value.length
}

const openMonitoring = () => {
  activeTab.value = 'monitoring'
  unreadLiveAlerts.value = 0
  fetchActiveSessions()
}

// Envoyer l'ajustement moteur au patient (Simulé avec l'API)
const sendAdjustment = (session) => {
  session.isSending = true
  // Simule l'attente du réseau (API Call)
  setTimeout(() => {
    session.isSending = false
    session.adjustmentSent = true
    
    // Remet le bouton à son état normal après 3 secondes
    setTimeout(() => {
      session.adjustmentSent = false
    }, 3000)
  }, 1000)
}

// Arrêt d'urgence du moteur
const emergencyStop = (session) => {
  if(confirm(`⚠️ Êtes-vous sûr de vouloir arrêter la séance de ${session.patient.nom} ? Le moteur du pédalier se coupera immédiatement.`)) {
    session.isStopped = true
    session.rpm = 0
  }
}

// --------------------------------------------------------
// ACTIONS DOSSIER PATIENT & PDF
// --------------------------------------------------------
const openPatientDossier = (patient) => {
  selectedPatient.value = patient
  showPatientDossier.value = true
}

const generatePDF = (patient) => {
  isGeneratingPDF.value = true
  setTimeout(() => {
    isGeneratingPDF.value = false
    alert(`Rapport clinique PDF pour ${patient.nom} généré et prêt au téléchargement.`)
  }, 1500)
}

// --------------------------------------------------------
// GESTION PRESCRIPTION MODAL
// --------------------------------------------------------
const assignTargetPatient = ref(null)
const assignDate = ref('')

const openAssignModal = (exo) => {
  selectedExo.value = exo
  assignTargetPatient.value = patients.value[0]
  showAssignModal.value = true
}

// Prescrire directement depuis le dossier patient (pré-sélectionne le patient)
const prescribeToPatient = (patient) => {
  showPatientDossier.value = false
  selectedExo.value = exercises.value[0] || null
  assignTargetPatient.value = patient
  showAssignModal.value = true
}

const confirmAssignment = () => {
  showAssignModal.value = false
  generateCalendar() 
  alert(`La séance ${selectedExo.value.title} a été assignée à ${assignTargetPatient.value.nom}.`)
}

// --------------------------------------------------------
// LOGIQUE DE L'AGENDA MENSUEL PARTAGE & INTERACTIF
// --------------------------------------------------------
const currentMonthOffset = ref(0)
const calendarDays = ref([])
const currentMonthName = ref('')
const currentYear = ref('')

const showAgendaEventModal = ref(false)
const selectedAgendaEvent = ref(null)

const changeMonth = (offset) => {
  currentMonthOffset.value += offset
  generateCalendar()
}

const generateCalendar = () => {
  const date = new Date()
  date.setMonth(date.getMonth() + currentMonthOffset.value)
  
  const year = date.getFullYear()
  const month = date.getMonth()
  
  currentMonthName.value = date.toLocaleString('fr-FR', { month: 'long' }).toUpperCase()
  currentYear.value = year

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  
  let firstDayIndex = firstDayOfMonth.getDay() || 7 
  const daysArray = []
  
  for (let i = 1; i < firstDayIndex; i++) {
    const prevDate = new Date(year, month, 1 - (firstDayIndex - i))
    daysArray.push({ dateNumber: prevDate.getDate(), isCurrentMonth: false, events: [] })
  }
  
  const today = new Date()
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const isToday = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear())
    
    let dayEvents = []
    if (i % 3 === 0 && i < 28 && patients.value[0]) {
      dayEvents.push({ patient: patients.value[0], time: "10:00", color: "#00B8D9", scenario: "L'Échappée Sylvestre", duration: "20 min" })
    }
    if (i % 5 === 0 && patients.value[1]) {
      dayEvents.push({ patient: patients.value[1], time: "14:30", color: "#20C997", scenario: "Souffle Océanique", duration: "10 min" })
    }
    if (i === 12 && patients.value[2]) {
      dayEvents.push({ patient: patients.value[2], time: "09:00", color: "#0284C7", scenario: "L'Ascension Alpine", duration: "25 min" })
    }

    daysArray.push({ dateNumber: i, isCurrentMonth: true, isToday, events: dayEvents })
  }
  
  const remainingCells = 42 - daysArray.length
  for (let i = 1; i <= remainingCells; i++) {
    daysArray.push({ dateNumber: i, isCurrentMonth: false, events: [] })
  }
  
  calendarDays.value = daysArray
}

const openEventDetails = (event, dateNumber, monthName) => {
  selectedAgendaEvent.value = { ...event, fullDate: `${dateNumber} ${monthName} ${currentYear.value}` }
  showAgendaEventModal.value = true
}

const openPatientDossierFromAgenda = () => {
  showAgendaEventModal.value = false
  openPatientDossier(selectedAgendaEvent.value.patient)
}


</script>

<style scoped>
/* VARIABLES & LAYOUT */
.dashboard-layout { display: flex; height: 100vh; background-color: #FAFCFF; font-family: 'Nunito', sans-serif; overflow: hidden;}
.flex-col { display: flex; flex-direction: column; height: 100%;}
.sidebar { width: 280px; background: white; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; border-right: 1px solid #E2E8F0; z-index: 50; flex-shrink: 0;}
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 40px; }
.sidebar-logo { height: 40px; }
.brand-name { font-weight: 900; color: #0A192F; font-size: 1.2rem; line-height: 1.1; }
.brand-tag { font-size: 0.75rem; color: #00B8D9; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;}

.sidebar-menu { display: flex; flex-direction: column; gap: 6px; }
.menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; color: #6B7C93; font-weight: 700; border-radius: 12px; transition: all 0.2s ease; font-size: 0.95rem; position: relative;}
.menu-icon { display: flex; align-items: center; justify-content: center; color: #94A3B8;}
.menu-item:hover { background-color: #F8FAFC; color: #0A192F; }
.menu-item:hover .menu-icon { color: #0A192F; }
.menu-item.active { background-color: #EAF7F9; color: #00B8D9; }
.menu-item.active .menu-icon { color: #00B8D9; }
.live-pulse-badge, .notification-badge { background: #FC8181; color: white; font-size: 0.7rem; font-weight: bold; padding: 2px 6px; border-radius: 10px; margin-left: auto;}
.live-pulse-badge { animation: pulse 2s infinite; }

@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }

.sidebar-bottom { border-top: 1px solid #E2E8F0; padding-top: 20px; }
.pro-profile { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; background: #F8FAFC; padding: 12px; border-radius: 12px;}
.pro-avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid white; }
.pro-avatar img { width: 100%; height: 100%; object-fit: cover;}
.pro-name { font-size: 0.9rem; font-weight: 800; color: #0A192F; margin: 0 0 2px 0;}
.pro-mail { font-size: 0.75rem; color: #6B7C93; margin: 0;}
.logout-link { background: none; border: none; color: #94A3B8; font-weight: 700; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%; transition: 0.2s; padding: 5px 10px;}
.logout-link:hover { color: #FC8181; }

.main-content { flex: 1; padding: 40px 50px; overflow-y: auto; position: relative;}
.content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px; flex-shrink: 0;}
.content-header h1 { font-size: 2rem; color: #0A192F; font-weight: 900; margin: 0 0 5px 0; letter-spacing: -0.5px;}
.subtitle { color: #6B7C93; font-size: 1.05rem; margin: 0;}

/* UTILITAIRES COMMUNS */
.font-bold { font-weight: 800; color: #0A192F; }
.text-muted { color: #6B7C93; }
.text-xs { font-size: 0.8rem; }
.text-cyan { color: #00B8D9; }
.text-red { color: #E53E3E; }
.text-blue { color: #3182CE; }
.bg-green { background-color: #20C997; }
.bg-warning { background-color: #D97706; }
.bg-red { background-color: #E53E3E; }
.btn-primary { background: #00B8D9; color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: 800; cursor: pointer; transition: 0.2s; display: inline-flex; align-items: center; justify-content: center;}
.btn-primary:hover:not(:disabled) { filter: brightness(0.9); transform: translateY(-2px);}
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-primary-small { background: #00B8D9; color: white; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.85rem;}
.btn-secondary-small { background: #F1F5F9; color: #4A5568; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.85rem;}
.btn-outline { background: transparent; border: 2px solid #00B8D9; color: #00B8D9; font-weight: 800; padding: 12px; border-radius: 10px; cursor: pointer; transition: 0.2s;}
.btn-outline:hover:not(:disabled) { background: #EAF7F9; }
.btn-outline:disabled { opacity: 0.5; border-color: #94A3B8; color: #94A3B8; cursor: not-allowed; }
.btn-outline-small { background: transparent; border: 1px solid #CBD5E1; color: #4A5568; font-weight: 700; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; transition: 0.2s;}
.btn-outline-small:hover { border-color: #0A192F; color: #0A192F;}
.btn-text-only { background: none; border: none; color: #00B8D9; font-weight: 800; cursor: pointer; font-size: 0.9rem;}
.btn-text-only:hover { text-decoration: underline; }
.spinner { animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

/* SEARCH BOX */
.search-box { display: flex; align-items: center; background: white; border: 2px solid #E2E8F0; border-radius: 10px; padding: 8px 15px; width: 300px; transition: 0.2s;}
.search-box:focus-within { border-color: #00B8D9; box-shadow: 0 0 0 3px rgba(0,184,217,0.1);}
.search-icon { color: #94A3B8; margin-right: 10px; }
.search-box input { border: none; outline: none; width: 100%; font-family: inherit; font-size: 0.95rem; color: #0A192F;}

/* ALERTS */
.alerts-container { display: flex; gap: 20px; margin-bottom: 25px; }
.alert-card { flex: 1; display: flex; align-items: center; gap: 15px; padding: 15px 20px; border-radius: 12px; border-left: 4px solid; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.02);}
.alert-warning { border-left-color: #D97706; }
.alert-info { border-left-color: #00B8D9; }
.alert-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; justify-content: center; align-items: center; flex-shrink: 0;}
.alert-warning .alert-icon { background: #FFFBEB; color: #D97706; }
.alert-info .alert-icon { background: #EAF7F9; color: #00B8D9; }
.alert-text { flex: 1; }
.alert-text strong { display: block; color: #0A192F; font-size: 0.95rem; margin-bottom: 2px;}
.alert-text p { margin: 0; color: #4A5568; font-size: 0.85rem;}

/* TABLE PATIENTS */
.table-wrapper { background: white; border-radius: 16px; box-shadow: 0 2px 15px rgba(0, 0, 0, 0.03); border: 1px solid #E2E8F0; overflow: hidden;}
.patients-table { width: 100%; border-collapse: collapse; }
.patients-table th { text-align: left; padding: 15px 20px; color: #6B7C93; font-weight: 800; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;}
.patient-row { cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #F1F5F9;}
.patient-row:hover { background: #F8FAFC; }
.patient-row td { padding: 12px 20px; vertical-align: middle; font-size: 0.95rem;}
.patient-cell-info { display: flex; align-items: center; gap: 12px; }
.table-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #F1F5F9;}
.observance-wrapper { display: flex; align-items: center; gap: 8px;}
.status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.date-info { font-weight: 600; color: #4A5568; }
.diff-badge { padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; }
.diff-facile { background: #E8F8F5; color: #20C997; }
.diff-moyen { background: #FFF9E6; color: #D97706; }
.diff-difficile { background: #FFF5F5; color: #E53E3E; }

/* DOSSIER PATIENT PANEL */
.patient-slide-panel { position: fixed; top: 0; right: -450px; width: 450px; height: 100vh; background: white; box-shadow: -5px 0 30px rgba(0,0,0,0.1); z-index: 100; transition: right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1); display: flex; flex-direction: column;}
.patient-slide-panel.panel-open { right: 0; }
.panel-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.3); z-index: 90; backdrop-filter: blur(2px);}
.panel-header { padding: 30px 25px 20px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; position: relative;}
.btn-close-panel { position: absolute; top: 15px; right: 15px; background: none; border: none; color: #94A3B8; cursor: pointer; transition: 0.2s;}
.btn-close-panel:hover { color: #0A192F; }
.panel-patient-head { display: flex; align-items: center; gap: 15px; margin-bottom: 15px;}
.dossier-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.05); background:#fff;}
.panel-patient-head h2 { margin: 0; color: #0A192F; font-size: 1.4rem; font-weight: 900;}
.panel-patient-head p { margin: 0; color: #6B7C93; font-size: 0.9rem; font-weight: 600;}
.panel-actions { display: flex; gap: 10px; }

.panel-body { padding: 25px; overflow-y: auto; flex: 1;}
.dossier-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;}
.dossier-card { background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.02);}
.dossier-card h4 { margin: 0 0 10px 0; color: #6B7C93; font-size: 0.75rem; text-transform: uppercase; font-weight: 800;}
.health-list { list-style: none; padding: 0; margin: 0; font-size: 0.85rem; color: #0A192F;}
.health-list li { margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #F1F5F9;}
.health-list li:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0;}
.observance-big { font-size: 2.2rem; font-weight: 900; color: #20C997; text-align: center; line-height: 1; margin-bottom: 5px;}
.section-title-small { font-size: 0.95rem; color: #0A192F; font-weight: 800; margin-bottom: 15px; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px;}
.history-mini-list { display: flex; flex-direction: column; gap: 10px;}
.history-mini-item { display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; padding: 10px 12px; border-radius: 8px; border: 1px solid #E2E8F0;}
.h-date { font-size: 0.75rem; font-weight: 800; color: #6B7C93; width: 70px;}
.h-info { flex: 1; display: flex; flex-direction: column;}
.h-info strong { font-size: 0.85rem; color: #0A192F;}
.h-info span { font-size: 0.7rem; color: #94A3B8;}
.h-rpe { margin-left: 5px; }

/* ONGLET 2 : AGENDA CALENDRIER */
.calendar-controls { display: flex; align-items: center; gap: 15px;}
.current-month { margin: 0; font-size: 1.2rem; color: #0A192F; font-weight: 900; width: 180px; text-align: center;}
.calendar-container { background: white; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; display: flex; flex-direction: column; flex: 1; min-height: 500px;}
.calendar-header-days { display: grid; grid-template-columns: repeat(7, 1fr); background: #0A192F; color: white;}
.cal-day-header { padding: 10px; text-align: center; font-weight: 700; font-size: 0.85rem;}
.calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); grid-auto-rows: minmax(100px, 1fr); flex: 1;}
.cal-cell { border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; padding: 8px; transition: background 0.2s;}
.cal-cell:nth-child(7n) { border-right: none; }
.cal-cell.other-month { background: #F8FAFC; opacity: 0.5;}
.cal-cell.is-today { background: #F0F9FF; }
.cal-cell.is-today .cal-date { background: #00B8D9; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; justify-content: center; align-items: center;}
.cal-date { font-weight: 800; color: #0A192F; font-size: 0.9rem; margin-bottom: 5px; width: 24px;}
.cal-events { display: flex; flex-direction: column; gap: 4px; }
.cal-event { display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 4px; border-left: 3px solid; background: white; font-size: 0.75rem; cursor: pointer; transition: 0.1s;}
.cal-event:hover { filter: brightness(0.95); }
.event-avatar { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; background: #fff;}
.event-details { display: flex; flex-direction: column; line-height: 1.1;}
.e-name { font-weight: 700; color: #0A192F; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px;}
.e-time { font-size: 0.65rem; color: #4A5568;}

/* ONGLET 3 : BIBLIOTHEQUE PRESCRIPTION */
.grid-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; }
.prescription-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 15px rgba(0,0,0,0.03); border: 1px solid #E2E8F0; display: flex; flex-direction: column;}
.presc-img-wrapper { height: 140px; width: 100%; display: flex; justify-content: center; align-items: center;}
.presc-img { height: 100%; width: 100%; object-fit: cover;}
.presc-content { padding: 20px; flex: 1; display: flex; flex-direction: column;}
.clinical-tag { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 8px; border-radius: 6px; width: fit-content; margin-bottom: 8px;}
.presc-content h3 { margin: 0 0 8px 0; color: #0A192F; font-size: 1.2rem; font-weight: 900;}
.presc-content p { font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px; flex: 1;}
.presc-metrics { display: flex; gap: 15px; margin-bottom: 15px; font-size: 0.8rem; font-weight: 700; color: #4A5568;}

/* ONGLET 4 : MONITORING LIVE */
.empty-state { background: white; padding: 50px; border-radius: 16px; text-align: center; border: 1px dashed #CBD5E1; color: #6B7C93;}
.empty-state h4 { color: #0A192F; font-size: 1.2rem; margin: 15px 0 5px; font-weight: 800;}
.monitoring-panel { max-width: 900px; }
.live-patient { background: white; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03); }
.live-header-bar { display: flex; justify-content: space-between; align-items: center; padding: 15px 25px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0;}
.live-patient-info { display: flex; align-items: center; gap: 15px; }
.live-indicator { background: #FC8181; color: white; font-weight: 900; font-size: 0.7rem; padding: 3px 8px; border-radius: 6px; animation: pulse 2s infinite; letter-spacing: 0.5px;}
.live-avatar { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background: #fff;}
.live-patient-info h3 { margin: 0 0 2px 0; color: #0A192F; font-size: 1.1rem; font-weight: 900;}
.equip-badge { background: white; color: #4A5568; padding: 2px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; border: 1px solid #E2E8F0; }
.btn-emergency { display: flex; align-items: center; gap: 8px; background: #E53E3E; color: white; border: none; padding: 10px 15px; border-radius: 10px; font-weight: 900; font-size: 0.85rem; cursor: pointer; transition: 0.2s;}
.btn-emergency:hover:not(:disabled) { background: #C53030; transform: scale(1.05);}
.btn-emergency:disabled { opacity: 0.5; cursor: not-allowed; }
.live-metrics { display: flex; padding: 25px; gap: 20px; background: white;}
.metric { flex: 1; background: #F8FAFC; padding: 15px 20px; border-radius: 12px; display: flex; flex-direction: column; border: 1px solid #E2E8F0;}
.metric span { font-size: 0.8rem; color: #6B7C93; font-weight: 800; text-transform: uppercase; margin-bottom: 5px;}
.metric strong { font-size: 2rem; font-weight: 900; line-height: 1;}
.metric-chart { font-family: monospace; letter-spacing: -1px; color: #00B8D9; margin-top: 10px; font-weight: bold; overflow: hidden; white-space: nowrap;}
.live-controls { padding: 25px; background: #FAFCFF; border-top: 1px solid #E2E8F0;}
.live-controls h4 { display: flex; align-items: center; gap: 10px; color: #0A192F; font-size: 1rem; margin: 0 0 20px 0; font-weight: 900;}
.control-row { margin-bottom: 20px; }
.slider-labels { display: flex; justify-content: space-between; margin-bottom: 10px;}
.slider-labels label { font-weight: 700; color: #4A5568; font-size: 0.9rem;}
.slider-labels span { font-weight: 900; color: #00B8D9; background: #EAF7F9; padding: 2px 10px; border-radius: 6px; font-size: 0.85rem;}
.custom-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 8px; background: #E2E8F0; border-radius: 5px; outline: none;}
.custom-slider:disabled::-webkit-slider-thumb { background: #94A3B8; }
.custom-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #00B8D9; cursor: pointer; border: 4px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.2);}

/* ONGLET 5 : PARAMETRES */
.settings-card { background: white; border-radius: 16px; padding: 35px; box-shadow: 0 2px 15px rgba(0,0,0,0.03); border: 1px solid #E2E8F0; max-width: 700px;}
.settings-card h3 { color: #0A192F; font-size: 1.1rem; font-weight: 900; margin-bottom: 20px; border-bottom: 2px solid #F1F5F9; padding-bottom: 10px;}
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.form-group label { font-weight: 700; color: #4A5568; font-size: 0.85rem; }
.form-group input, .form-group select { padding: 12px; border: 2px solid #E2E8F0; border-radius: 10px; background: #F8FAFC; font-family: inherit; font-size: 0.95rem; color: #0A192F; transition: 0.2s;}
.form-group input:focus, .form-group select:focus { border-color: #00B8D9; outline: none; background: white;}
.toggle-label { display: flex; align-items: center; gap: 12px; font-weight: 700; color: #0A192F; margin-bottom: 15px; cursor: pointer; font-size: 0.95rem;}
.toggle-switch { position: relative; width: 44px; height: 24px; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.slider-toggle { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #CBD5E1; transition: .3s; border-radius: 34px; }
.slider-toggle:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
input:checked + .slider-toggle { background-color: #20C997; }
input:checked + .slider-toggle:before { transform: translateX(20px); }

/* ONGLET 6 : MESSAGERIE DYNAMIQUE */
.messages-layout { display: flex; height: 600px; background: white; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 20px rgba(0,0,0,0.03);}
.messages-list { width: 320px; border-right: 1px solid #E2E8F0; background: #F8FAFC; overflow-y: auto;}
.msg-contact { display: flex; align-items: center; gap: 12px; padding: 15px 20px; border-bottom: 1px solid #E2E8F0; cursor: pointer; transition: 0.2s;}
.msg-contact:hover { background: white; }
.msg-contact.active { background: white; border-left: 4px solid #00B8D9;}
.msg-contact img { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid white; background: #F1F5F9;}
.contact-info { flex: 1; overflow: hidden; }
.contact-info h4 { margin: 0 0 3px 0; color: #0A192F; font-size: 0.95rem; font-weight: 800;}
.contact-info p { margin: 0; color: #6B7C93; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
.messages-chat { flex: 1; display: flex; flex-direction: column; background: white;}
.chat-header-pro { padding: 20px 25px; border-bottom: 1px solid #E2E8F0; display: flex; justify-content: space-between; align-items: center;}
.chat-header-pro h4 { margin: 0; color: #0A192F; font-size: 1.1rem; font-weight: 900;}
.chat-body { flex: 1; padding: 25px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background: #FAFCFF;}
.message-row { display: flex; width: 100%; }
.message-row.from-pro { justify-content: flex-end; }
.message-row.from-patient { justify-content: flex-start; }
.message-bubble { max-width: 65%; padding: 12px 18px; border-radius: 14px; font-size: 0.95rem; line-height: 1.5;}
.from-pro .message-bubble { background: #00B8D9; color: white; border-bottom-right-radius: 4px;}
.from-patient .message-bubble { background: white; color: #0A192F; border: 1px solid #E2E8F0; border-bottom-left-radius: 4px;}
.message-time { display: block; font-size: 0.7rem; margin-top: 5px; opacity: 0.7; text-align: right; }
.chat-input-pro { padding: 20px 25px; border-top: 1px solid #E2E8F0; display: flex; gap: 12px; background: white;}
.chat-input-pro input { flex: 1; padding: 12px 18px; border: 2px solid #E2E8F0; border-radius: 10px; font-size: 0.95rem; outline: none; transition: 0.2s;}
.chat-input-pro input:focus { border-color: #00B8D9;}
.btn-send-pro { background: #00B8D9; border: none; width: 48px; height: 48px; border-radius: 10px; display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; transition: 0.2s;}
.btn-send-pro:hover { background: #0284C7; transform: scale(1.05);}

/* MODAL ASSIGNATION & AGENDA DETAIL */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.8); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; backdrop-filter: blur(3px);}
.modal-overlay.active { opacity: 1; visibility: visible; }
.assign-modal { background: white; width: 100%; max-width: 500px; border-radius: 20px; overflow: hidden; transform: translateY(30px); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 25px 50px rgba(0,0,0,0.2);}
.modal-overlay.active .assign-modal { transform: translateY(0); }
.modal-header-assign { background: #EAF7F9; padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #CFFAFE;}
.modal-header-assign h3 { color: #0A192F; margin: 0; font-size: 1.2rem; font-weight: 900;}
.close-modal { background: none; border: none; font-size: 1.8rem; cursor: pointer; color: #00B8D9; line-height: 1; transition: 0.2s;}
.close-modal:hover { color: #0A192F; transform: scale(1.1);}
.modal-body-assign { padding: 25px; }
.presc-summary { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; background: #F8FAFC; padding: 12px; border-radius: 10px; border: 1px solid #E2E8F0;}
.presc-summary img { width: 50px; height: 50px; border-radius: 8px; object-fit: cover;}
.presc-summary strong { color: #0A192F; font-size: 1rem; display: block; margin-bottom: 4px;}
.form-row { display: flex; gap: 15px; }

/* STYLES SPECIFIQUES MODAL AGENDA */
.event-modal-head { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #F1F5F9;}
.event-modal-avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #E2E8F0;}
.event-modal-body { display: flex; flex-direction: column; gap: 15px;}
.e-data { display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 12px; border-radius: 8px;}
.e-data span { font-size: 0.85rem; color: #6B7C93; font-weight: 700; text-transform: uppercase;}
.e-data strong { font-size: 0.95rem; color: #0A192F;}

/* ANIMATION */
.tab-fade { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.effort-chart-wrapper { margin: 12px 0 20px 0; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
.empty-effort-chart { padding:16px; text-align:center; color:#94A3B8; font-size:0.85rem; font-style:italic; }
.toast { position:fixed; bottom:30px; right:30px; padding:14px 22px; border-radius:12px; font-weight:800; font-size:0.95rem; z-index:9999; color:white; box-shadow:0 8px 20px rgba(0,0,0,0.15); }
.toast.success { background:#20C997; }
.toast.error   { background:#EF4444; }
.toast.info    { background:#00B8D9; }
.toast-enter-active, .toast-leave-active { transition: all 0.4s ease; }
.toast-enter-from, .toast-leave-to { opacity:0; transform:translateY(20px); }

/* BADGE RPE inconnu */
.diff-inconnu { background: #F1F5F9; color: #94A3B8; }

/* BADGE DÉMO */
.demo-badge-pill { display: inline-flex; align-items: center; gap: 6px; background: #FFF9E6; color: #D97706; border: 1px solid #FDE68A; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; margin-bottom: 12px; }

/* MESSAGE EN ATTENTE CAPTEURS */
.sensor-waiting-msg { display: flex; align-items: center; gap: 15px; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 20px; margin: 12px 0 20px 0; color: #6B7C93; }
.sensor-waiting-msg p { margin: 0 0 4px 0; font-weight: 800; color: #4A5568; font-size: 0.9rem; }
.sensor-waiting-msg span { font-size: 0.8rem; }

/* GRILLE STATS BIOFEEDBACK */
.stats-biofeedback-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.stat-bio-card { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.stat-bio-card span { font-size: 0.72rem; font-weight: 700; color: #6B7C93; text-transform: uppercase; letter-spacing: 0.3px; }
.stat-bio-card strong { font-size: 1.15rem; font-weight: 900; color: #0A192F; }
</style>