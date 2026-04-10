<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-brand" @click="goHome">
          <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
          <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
        </div>
        <nav class="sidebar-menu">
          <a href="#" class="menu-item" :class="{ active: activeTab === 'programme' }" @click="activeTab = 'programme'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </span> 
            Mon Programme
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'bibliotheque' }" @click="activeTab = 'bibliotheque'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span> 
            Accès Libre
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'historique' }" @click="activeTab = 'historique'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </span> 
            Mes Progrès
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'messagerie' }" @click="openMessagerie">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </span>
            Suivi & Messages
            <span v-if="unreadMessages > 0" class="notification-badge">{{ unreadMessages }}</span>
          </a>
          <a href="#" class="menu-item" :class="{ active: activeTab === 'profilage' }" @click="activeTab = 'profilage'">
            <span class="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            Mon Profil Santé
            <span v-if="!profilComplete" class="notification-badge" style="background:#F59E0B;">!</span>
          </a>
        </nav>
      </div>
      <div class="sidebar-bottom">
        <div class="user-mini-profile" @click="$router.push('/profile')" style="cursor:pointer;" title="Modifier mon profil">
          <div class="user-avatar-mini">
            <img :src="userProfileImage" alt="Patient" @error="e => e.target.src='/images/avBlonde.png'" />
          </div>
          <div class="user-info">
            <p class="user-name">{{ nom }}</p>
            <p class="user-status">Patient</p>
          </div>
        </div>
        <button class="logout-btn-sidebar" @click="goHome">
          Quitter 
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    </aside>

    <main class="main-content">
      
      <div v-if="activeTab === 'programme'" class="tab-fade">
        <header class="content-header">
          <h1>Programme de Rééducation</h1>
          <p class="subtitle">Semaine en cours • Les séances prescrites par votre praticien.</p>
        </header>

        <div v-if="weekSchedule.length > 0">
          <div class="agenda-section">
            <div class="agenda-week">
              <div 
                v-for="(day, index) in weekSchedule" 
                :key="index" 
                class="agenda-day"
                :class="{ 
                  'active': selectedDay === index, 
                  'has-session': day.prescribed,
                  'completed': day.status === 'done',
                  'is-today': day.isToday
                }"
                @click="selectedDay = index"
              >
                <span v-if="day.isToday" class="today-label">Aujourd'hui</span>
                <span class="day-name">{{ day.name }}</span>
                <span class="day-num">{{ day.dayNum }}</span>
                <span class="day-month">{{ day.month }}</span>
                <div class="day-indicator">
                  <svg v-if="day.status === 'done'" class="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <div v-else-if="day.prescribed" class="dot-pending"></div>
                  <div v-else class="dot-empty"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="prescription-detail">
            <div v-if="!weekSchedule[selectedDay].prescribed" class="empty-state-day">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <h4>Repos planifié</h4>
              <p>Aucune séance n'est prescrite pour le {{ weekSchedule[selectedDay].dayNum }} {{ weekSchedule[selectedDay].month }}. Vous pouvez accéder à la Bibliothèque pour une activité libre.</p>
            </div>

            <div v-else class="prescription-card">
              <div class="prescription-image">
                <img :src="weekSchedule[selectedDay].activity.image" :alt="weekSchedule[selectedDay].activity.title" />
              </div>
              <div class="prescription-info">
                <div class="prescription-header">
                  <div>
                    <span class="clinical-badge text-cyan bg-cyan-light">PRESCRIPTION</span>
                    <span class="time-slot-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {{ weekSchedule[selectedDay].timeSlot }}
                    </span>
                  </div>
                  <span v-if="weekSchedule[selectedDay].status === 'done'" class="status-badge done">Séance Validée</span>
                  <span v-else-if="weekSchedule[selectedDay].status === 'upcoming'" class="status-badge upcoming">À venir</span>
                  <span v-else class="status-badge pending">À faire aujourd'hui</span>
                </div>
                
                <h2>{{ weekSchedule[selectedDay].activity.title }}</h2>
                <p class="prescription-desc">{{ weekSchedule[selectedDay].activity.patientPromise }}</p>
                
                <div class="prescription-metrics">
                  <div class="metric"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {{ weekSchedule[selectedDay].activity.duration }}</div>
                  <div class="metric"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> {{ weekSchedule[selectedDay].activity.medicalObjective }}</div>
                  <div class="metric"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> {{ weekSchedule[selectedDay].activity.intensityLevel }}</div>
                </div>

                <button v-if="weekSchedule[selectedDay].status !== 'done'" class="btn-start-prescription" @click="openConfigStudio(weekSchedule[selectedDay].activity)">
                  Démarrer l'exercice prescrit ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'bibliotheque'" class="tab-fade">
        <header class="content-header">
          <h1>Activités en accès libre</h1>
          <p class="subtitle">Des parcours supplémentaires pour pédaler selon vos envies.</p>
        </header>

        <!-- Scénarios recommandés par le pro -->
        <div v-if="myRecommandations.length > 0" style="margin-bottom:28px;">
          <h3 class="section-title-small" style="color:#20C997;">⭐ Recommandés par votre praticien</h3>
          <div class="activities-grid">
            <div
              v-for="rec in myRecommandations" :key="rec.scenario"
              class="activity-card"
              style="border-top:3px solid #20C997; position:relative;"
            >
              <div class="card-img-wrapper" style="background:#E8F8F515;">
                <img :src="getActivityByTitle(rec.scenario)?.image || '/images/scen-matin.png'" :alt="rec.scenario" class="activity-img" />
                <span style="position:absolute;top:8px;right:8px;background:#20C997;color:white;font-size:0.7rem;font-weight:900;padding:3px 8px;border-radius:20px;">Recommandé</span>
              </div>
              <div class="card-content">
                <h3 class="poetic-title">{{ rec.scenario }}</h3>
                <p class="activity-desc" v-if="rec.note">📋 {{ rec.note }}</p>
                <p class="activity-desc" style="color:#94A3B8; font-size:0.8rem;">{{ rec.date }}</p>
              </div>
              <button class="btn-play-activity" style="background:#20C997;" @click="openConfigStudio(getActivityByTitle(rec.scenario) || activities[0])">
                Lancer l'activité
              </button>
            </div>
          </div>
        </div>

        <h3 v-if="myRecommandations.length > 0" class="section-title-small">Tous les scénarios</h3>
        <div class="activities-grid">
          <div v-for="(activity, index) in activities" :key="index" class="activity-card" :style="{ borderTopColor: activity.color }">
            <div class="card-img-wrapper" :style="{ backgroundColor: activity.color + '15' }">
              <img :src="activity.image" :alt="activity.title" class="activity-img" />
            </div>
            <div class="card-content">
              <h3 class="poetic-title">{{ activity.title }}</h3>
              <p class="activity-desc">{{ activity.patientPromise }}</p>
              <div class="activity-tags">
                <span class="tag tag-time"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {{ activity.duration }}</span>
              </div>
            </div>
            <button class="btn-play-activity" :style="{ backgroundColor: activity.color }" @click="openConfigStudio(activity)">
              Lancer l'activité
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'historique'" class="tab-fade">
        <header class="content-header">
          <h1>Vos progrès cliniques</h1>
          <p class="subtitle">Historique de vos séances partagé automatiquement avec votre praticien.</p>
        </header>

        <PatientProgressChart
          :sessions="rawSessions"
          :current-user-id="currentUserId"
          style="margin-bottom: 30px;"
        />

        <div class="history-stats-container">
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #E8F8F5; color: #20C997;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div class="stat-info">
              <p>Séances validées</p>
              <h3>{{ historyData.length }}</h3>
            </div>
          </div>
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #EAF7F9; color: #00B8D9;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div class="stat-info">
              <p>Temps d'effort total</p>
              <h3>{{ totalTimePlayed }} min</h3>
            </div>
          </div>
          <div class="history-stat-card">
            <div class="stat-icon" style="background-color: #FFF9E6; color: #F59E0B;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <div class="stat-info">
              <p>Score moyen</p>
              <h3>{{ averageScore }} pts</h3>
            </div>
          </div>
        </div>

        <div v-if="historyData.length > 0" class="charts-dashboard">
          <div class="chart-card chart-large">
            <h3 class="chart-title">Évolution de vos performances (Score)</h3>
            <div class="chart-container-axes">
              <svg width="100%" height="100%" viewBox="0 0 650 240" class="svg-chart" preserveAspectRatio="xMidYMid meet">
                <text x="-120" y="15" transform="rotate(-90)" fill="#6B7C93" font-size="12" font-weight="bold" letter-spacing="1">SCORE OBTENU (pts)</text>
                <g class="grid" stroke="#E2E8F0" stroke-width="1">
                  <line x1="60" y1="20" x2="620" y2="20" stroke-dasharray="4"/>
                  <text x="50" y="24" fill="#94A3B8" font-size="11" text-anchor="end" font-weight="bold">600</text>
                  <line x1="60" y1="70" x2="620" y2="70" stroke-dasharray="4"/>
                  <text x="50" y="74" fill="#94A3B8" font-size="11" text-anchor="end" font-weight="bold">400</text>
                  <line x1="60" y1="120" x2="620" y2="120" stroke-dasharray="4"/>
                  <text x="50" y="124" fill="#94A3B8" font-size="11" text-anchor="end" font-weight="bold">200</text>
                  <line x1="60" y1="170" x2="620" y2="170" stroke="#CBD5E1" stroke-width="2" />
                  <text x="50" y="174" fill="#94A3B8" font-size="11" text-anchor="end" font-weight="bold">0</text>
                </g>
                <defs>
                  <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#00B8D9" />
                    <stop offset="100%" stop-color="#20C997" />
                  </linearGradient>
                </defs>
                <g v-for="(pt, i) in scoreBarPoints" :key="'bar-'+i">
                  <rect :x="pt.x - 20" :y="pt.y" width="40" :height="pt.h" fill="url(#barGradient)" rx="4">
                    <title>{{ pt.score }} points ({{ pt.scenario }})</title>
                  </rect>
                  <text :x="pt.x" y="195" fill="#0A192F" font-size="11" font-weight="bold" text-anchor="middle">{{ pt.date }}</text>
                </g>
                <text x="340" y="230" fill="#6B7C93" font-size="12" font-weight="bold" letter-spacing="1" text-anchor="middle">DATE DE LA SÉANCE</text>
              </svg>
            </div>
          </div>
          <div class="chart-card chart-small">
            <h3 class="chart-title">Répartition des séances</h3>
            <div class="donut-wrapper">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle libre-segment" :stroke-dasharray="`${percentLibre}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle prescrit-segment" :stroke-dasharray="`${percentPrescrit}, 100`" :stroke-dashoffset="`-${percentLibre}`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="18" class="donut-number">{{ historyData.length }}</text>
                <text x="18" y="23" class="donut-label">Séances</text>
              </svg>
              <div class="donut-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background:#00B8D9"></span>
                  <div class="legend-text"><strong>Prescrit</strong><span>{{ percentPrescrit }}% ({{ prescritCount }})</span></div>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background:#20C997"></span>
                  <div class="legend-text"><strong>Libre</strong><span>{{ percentLibre }}% ({{ libreCount }})</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Aventure (Objectif)</th>
                <th>Type</th>
                <th>Score</th>
                <th>Revue Praticien</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(session, idx) in historyData" :key="idx">
                <tr class="history-row-clickable" @click="toggleRow(idx)">
                  <td><strong>{{ session.date }}</strong></td>
                  <td>{{ session.scenario }}<br><span style="font-size: 0.8rem; color: #94A3B8;">{{ session.duration }}</span></td>
                  <td>
                    <span v-if="session.type === 'prescrit'" class="tag-type prescrit">Prescrit</span>
                    <span v-else class="tag-type libre">Libre</span>
                  </td>
                  <td><strong class="text-green">{{ session.score }} pts</strong></td>
                  <td>
                    <span v-if="session.reviewed" class="reviewed-status">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#20C997" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Analysé
                    </span>
                    <span v-else class="pending-status">En attente</span>
                  </td>
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
                            <span v-for="star in 5" :key="star" class="star-icon" :class="{ filled: star <= session.rating }">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </span>
                            <span class="diff-badge" :class="'diff-' + session.difficulty.toLowerCase()">{{ session.difficulty }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ========================= PROFILAGE ========================= -->
      <div v-if="activeTab === 'profilage'" class="tab-fade">
        <header class="content-header">
          <h1>Mon Profil Santé</h1>
          <p class="subtitle">Ces informations permettent à votre praticien d'adapter vos séances.</p>
        </header>

        <div class="settings-card" style="max-width:560px;">
          <h3 style="font-size:1rem; font-weight:900; color:#0A192F; margin-bottom:20px;">Questionnaire de profilage</h3>

          <div class="form-group">
            <label>Poids (kg)</label>
            <input type="number" v-model="profil.poids" min="30" max="200" placeholder="Ex: 72" />
          </div>
          <div class="form-group">
            <label>Taille (cm)</label>
            <input type="number" v-model="profil.taille" min="100" max="220" placeholder="Ex: 170" />
          </div>
          <div class="form-group">
            <label>Niveau d'activité physique habituel</label>
            <select v-model="profil.niveauActivite">
              <option value="" disabled>Choisir...</option>
              <option value="sedentaire">Sédentaire (< 1h/semaine)</option>
              <option value="leger">Léger (1-2h/semaine)</option>
              <option value="modere">Modéré (3-4h/semaine)</option>
              <option value="actif">Actif (5h+/semaine)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Pathologie / Motif de rééducation</label>
            <input type="text" v-model="profil.pathologie" placeholder="Ex: Rééducation post-AVC, arthrose..." />
          </div>
          <div class="form-group">
            <label>Matériel disponible</label>
            <select v-model="profil.materiel">
              <option value="">Non précisé</option>
              <option value="velo">Vélo complet</option>
              <option value="pedalier-bras">Pédalier bras</option>
              <option value="pedalier-jambes">Pédalier jambes</option>
            </select>
          </div>

          <div v-if="profil.poids && profil.taille" class="imc-card">
            <span>IMC calculé : </span>
            <strong :class="imcClass">{{ imcValue }} — {{ imcLabel }}</strong>
          </div>

          <button class="btn-primary" style="margin-top:20px;" @click="saveProfil">
            {{ profilSaved ? '✓ Profil enregistré' : 'Enregistrer mon profil' }}
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'messagerie'" class="tab-fade">
        <header class="content-header">
          <h1>Suivi & Messages</h1>
          <p class="subtitle">Échangez directement avec le Dr. Lefevre concernant votre rééducation.</p>
        </header>

        <div class="chat-container">
          <div class="chat-header">
            <div class="doctor-avatar">
              <img src="/images/proSanté.png" alt="Docteur" />
            </div>
            <div>
              <h3 style="margin:0; color:#0A192F; font-size:1.1rem;">Dr. Marc Lefevre</h3>
              <span style="color:#20C997; font-size:0.85rem; font-weight:700;">En ligne</span>
            </div>
          </div>
          
          <div class="chat-history">
            <div v-for="(msg, i) in messages" :key="i" class="message-row" :class="msg.sender === 'doctor' ? 'from-doctor' : 'from-patient'">
              <div class="message-bubble">
                <p>{{ msg.text }}</p>
                <span class="message-time">{{ msg.time }}</span>
              </div>
            </div>
          </div>

          <div class="chat-input-area">
            <input type="text" v-model="newMessage" placeholder="Écrivez votre message ou ressenti..." @keyup.enter="sendMessage" />
            <button class="btn-send" @click="sendMessage">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </div>
      </div>

    </main>

    <div class="modal-overlay" :class="{ active: showConfigStudio }" @click.self="showConfigStudio = false">
      <div class="clinical-modal">
        <button class="close-modal" @click="showConfigStudio = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div v-if="selectedActivity" class="modal-inner">
          <div class="clinical-briefing">
            <div class="briefing-header" :style="{ borderBottomColor: selectedActivity.color }">
              <span class="clinical-badge" :style="{ backgroundColor: selectedActivity.color + '20', color: selectedActivity.color }">
                {{ selectedActivity.medicalObjective.toUpperCase() }}
              </span>
              <h2>{{ selectedActivity.title }}</h2>
            </div>
            <div class="briefing-body">
              <div class="clinical-target-box">
                <h4><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> Objectifs de la séance :</h4>
                <ul>
                  <li v-for="(target, i) in selectedActivity.targets" :key="i">{{ target }}</li>
                </ul>
              </div>
              <div class="safety-box">
                <h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Consignes Médicales</h4>
                <p>Échauffement progressif recommandé. Arrêtez-vous en cas de douleur anormale ou d'essoufflement sévère.</p>
              </div>
            </div>
          </div>

          <div class="config-panel">
            <div class="config-step">
              <p class="instruction">Équipement utilisé</p>
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
              <p class="instruction">2. Choisissez votre Avatar</p>
              <div class="options-grid-images">
                <button v-for="avatar in avatars" :key="avatar.id" class="option-btn-image" :class="{ selected: selectedAvatar === avatar.id }" @click="selectedAvatar = avatar.id">
                  <img :src="avatar.imgSrc" :alt="avatar.id" class="custom-avatar-img" />
                </button>
              </div>
            </div>

            <div class="action-footer">
              <button class="btn-start-game" :style="{ backgroundColor: selectedActivity.color }" @click="startGame">
                DÉMARRER LA SÉANCE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '../config.js'
import PatientProgressChart from '../components/PatientProgressChart.vue'

const router = useRouter()

const nom = ref(localStorage.getItem('nom') || 'Utilisateur')
const currentUserId = parseInt(localStorage.getItem('id')) || 0
const rawSessions = ref([])
const email = ref(localStorage.getItem('email') || '')
const statut = ref(localStorage.getItem('statut') || '')
const activeTab = ref('programme')
const showConfigStudio = ref(false)
const selectedActivity = ref(null)
const selectedEquip = ref('Vélo complet')
const expandedRow = ref(null)
const weekSchedule = ref([])
const selectedDay = ref(0)

const goHome = () => router.push('/')

// RÉCUPÉRATION DE L'AVATAR DU LOCAL STORAGE
const userProfileImage = ref(localStorage.getItem('playnride_user_avatar') || '/images/avBlonde.png')
const selectedAvatar = ref(localStorage.getItem('playnride_user_avatar_id') || 'avatar1')
const avatars = [
  { id: 'avatar1', imgSrc: '/images/avatar-1.png' },
  { id: 'avatar2', imgSrc: '/images/avatar-2.png' },
  { id: 'avatar3', imgSrc: '/images/avatar-3.png' },
  { id: 'avatar4', imgSrc: '/images/avatar-4.png' },
  { id: 'avatar5', imgSrc: '/images/avatar-5.png' },
  { id: 'avatar6', imgSrc: '/images/avatar-6.png' }
]

const refreshProfile = () => {
  const saved = localStorage.getItem('playnride_user_avatar')
  if (saved) userProfileImage.value = saved
  nom.value = localStorage.getItem('nom') || nom.value
}

onMounted(() => {
  refreshProfile()
  generateWeekSchedule()
  fetchHistory()
  window.addEventListener('focus', refreshProfile)
})

onUnmounted(() => {
  window.removeEventListener('focus', refreshProfile)
})

// ── QUESTIONNAIRE DE PROFILAGE ────────────────────────────────────────────────
const PROFIL_KEY = 'playnride_profil_' + (localStorage.getItem('id') || 'guest')
const loadProfil = () => {
  try { return JSON.parse(localStorage.getItem(PROFIL_KEY) || '{}') } catch { return {} }
}
const profil = ref({ poids: '', taille: '', niveauActivite: '', pathologie: '', materiel: '', ...loadProfil() })
const profilSaved = ref(false)
const profilComplete = computed(() => !!(profil.value.poids && profil.value.taille && profil.value.niveauActivite))

const imcValue = computed(() => {
  const p = parseFloat(profil.value.poids), t = parseFloat(profil.value.taille) / 100
  if (!p || !t) return null
  return (p / (t * t)).toFixed(1)
})
const imcLabel = computed(() => {
  const v = parseFloat(imcValue.value)
  if (!v) return ''
  if (v < 18.5) return 'Insuffisance pondérale'
  if (v < 25)   return 'Poids normal'
  if (v < 30)   return 'Surpoids'
  return 'Obésité'
})
const imcClass = computed(() => {
  const v = parseFloat(imcValue.value)
  if (!v) return ''
  if (v < 18.5 || v >= 30) return 'text-red'
  if (v < 25) return 'text-green'
  return 'text-warning'
})

const saveProfil = () => {
  localStorage.setItem(PROFIL_KEY, JSON.stringify(profil.value))
  profilSaved.value = true
  setTimeout(() => { profilSaved.value = false }, 3000)
}

// ── RECOMMANDATIONS DU PRO ────────────────────────────────────────────────────
const RECOMMANDATIONS_KEY = 'playnride_recommandations'
const myRecommandations = computed(() => {
  try {
    const stored = JSON.parse(localStorage.getItem(RECOMMANDATIONS_KEY) || '{}')
    return stored[currentUserId] || []
  } catch { return [] }
})

const getActivityByTitle = (title) => activities.find(a => a.title === title)

// TOUTES LES ACTIVITÉS (Les 6 scénarios)
const activities = [
  { title: "L'Aube Douce", medicalObjective: "Échauffement Articulaire", patientPromise: "Pédalage léger au lever du soleil pour réveiller vos articulations.", duration: "15 min", intensityLevel: "Très Faible", targets: ["Lubrification articulaire", "Mise en route cardiovasculaire"], theme: "Nature", image: "/images/scen-matin.png", color: "#20C997" },
  { title: "L'Échappée Sylvestre", medicalObjective: "Coordination & Proprioception", patientPromise: "Adaptez votre cadence aux variations du terrain en forêt.", duration: "20 min", intensityLevel: "Modérée", targets: ["Coordination neuro-musculaire", "Équilibre et appuis sur pédales"], theme: "Forêt", image: "/images/scen-foret.png", color: "#00B8D9" },
  { title: "Souffle Océanique", medicalObjective: "Récupération Active", patientPromise: "Pédalez le long de la côte à rythme régulier.", duration: "10 min", intensityLevel: "Variable", targets: ["Drainage des toxines musculaires", "Régulation respiratoire"], theme: "Plage", image: "/images/scen-plage.png", color: "#0EA5E9" },
  { title: "Le Jardin des Sens", medicalObjective: "Double Tâche Cognitivo-Motrice", patientPromise: "Parcourez ce jardin coloré. Votre attention sera doucement sollicitée.", duration: "12 min", intensityLevel: "Faible", targets: ["Maintien de l'attention pendant l'effort", "Mémorisation visuelle"], theme: "Jardin", image: "/images/scen-jardin.png", color: "#38BDF8" },
  { title: "L'Ascension Alpine", medicalObjective: "Endurance & Résistance", patientPromise: "Un défi stimulant en montagne pour faire travailler votre cœur.", duration: "25 min", intensityLevel: "Élevée", targets: ["Tolérance à l'effort lactique", "Augmentation de la capacité aérobie"], theme: "Montagne", image: "/images/scen-montagne.png", color: "#0284C7" },
  { title: "Voyage Aérien", medicalObjective: "Retour au Calme", patientPromise: "Un parcours apaisant dans les nuages pour faire redescendre le cœur.", duration: "20 min", intensityLevel: "Très Faible", targets: ["Baisse progressive de la fréquence cardiaque", "Relaxation sensorielle"], theme: "Ciel", image: "/images/scen-ciel.png", color: "#3B82F6" }
]

// --- GÉNÉRATION DYNAMIQUE DU CALENDRIER ---
const generateWeekSchedule = () => {
  const now = new Date()
  const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - dayOfWeek + 1)

  const daysLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const schedule = []

  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(monday)
    currentDay.setDate(monday.getDate() + i)
    const isToday = currentDay.toDateString() === now.toDateString()

    let prescribed = (i === 0 || i === 2 || i === 4)
    let activity = prescribed ? activities[i % activities.length] : null
    let timeSlot = prescribed ? (i === 0 ? "10h00 - 10h30" : i === 2 ? "14h30 - 15h00" : "16h00 - 16h30") : null
    
    let status = 'none'
    if (prescribed) {
      if (currentDay < now && !isToday) status = 'done'
      else if (isToday) status = 'pending'
      else status = 'upcoming'
    }

    schedule.push({
      name: daysLabels[i],
      dayNum: currentDay.getDate(),
      month: currentDay.toLocaleString('fr-FR', { month: 'short' }),
      isToday,
      prescribed,
      timeSlot,
      status,
      activity
    })
  }
  
  weekSchedule.value = schedule
  selectedDay.value = schedule.findIndex(d => d.isToday) !== -1 ? schedule.findIndex(d => d.isToday) : 0
}

// HISTORIQUE DETAILLÉ DU PATIENT
const historyData = ref([])

const fetchHistory = async () => {
  const patientId = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  if (!patientId || !token) return
  try {
    const res = await fetch(`${API_URL}/seances/patient/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error()
    const data = await res.json()
    rawSessions.value = data  // données brutes pour le graphique Chart.js
    historyData.value = data.map(s => ({
      date: new Date(s.dateDebut).toLocaleDateString('fr-FR'),
      type: s.mode === 'PRESCRIT' ? 'prescrit' : 'libre',
      scenario: s.mode || 'Séance',
      duration: (s.dureeMinutes || '--') + ' min',
      score: (s.wattsMoy || 0) * (s.dureeMinutes || 1),
      reviewed: false,
      avgSpeed: s.wattsMoy ? (s.wattsMoy / 5).toFixed(1) : '--',
      avgBpm: s.bpmMoy || '--',
      rating: 0,
      difficulty: 'Moyen'
    }))
  } catch { /* garde les données vides si l'API échoue */ }
}

const totalTimePlayed = computed(() => historyData.value.reduce((acc, curr) => acc + parseInt(curr.duration), 0))

const averageScore = computed(() => {
  if (historyData.value.length === 0) return 0
  return Math.round(historyData.value.reduce((acc, curr) => acc + curr.score, 0) / historyData.value.length)
})

const prescritCount = computed(() => historyData.value.filter(s => s.type === 'prescrit').length)
const libreCount = computed(() => historyData.value.filter(s => s.type === 'libre').length)
const percentPrescrit = computed(() => historyData.value.length === 0 ? 0 : Math.round((prescritCount.value / historyData.value.length) * 100))
const percentLibre = computed(() => historyData.value.length === 0 ? 0 : 100 - percentPrescrit.value)

const scoreBarPoints = computed(() => {
  const data = [...historyData.value].reverse().slice(0, 5)
  if (data.length === 0) return []
  const width = 480; const height = 150; const maxScore = 600; const startX = 100; const startY = 20
  return data.map((session, index) => {
    const x = data.length === 1 ? startX + (width / 2) : startX + (index * (width / (data.length - 1)))
    const scoreVal = Math.min(parseInt(session.score) || 0, maxScore)
    const h = (scoreVal / maxScore) * height
    const y = startY + height - h
    return { x, y, h, score: scoreVal, scenario: session.scenario, date: session.date === 'Hier' ? 'Hier' : session.date.split(' ')[0] }
  })
})

const toggleRow = (index) => {
  expandedRow.value = expandedRow.value === index ? null : index
}

// --- MESSAGERIE ET NOTIFICATIONS ---
const unreadMessages = ref(1)

const openMessagerie = () => {
  activeTab.value = 'messagerie'
  // Disparition de la pastille rouge lors de la lecture (comme un réseau social)
  unreadMessages.value = 0
}

const newMessage = ref('')
const messages = ref([
  { sender: 'doctor', text: "Bonjour Jean, j'ai bien analysé vos résultats de la semaine dernière. La fréquence cardiaque est parfaite.", time: "Hier, 14:30" },
  { sender: 'patient', text: "Merci Docteur ! J'ai ressenti une petite raideur au genou droit sur la séance de vendredi par contre.", time: "Hier, 15:45" },
  { sender: 'doctor', text: "C'est noté. J'ai ajusté votre programme de cette semaine en remplaçant la séance montagne par un parcours en forêt, moins intense sur les appuis. Ne forcez pas.", time: "Aujourd'hui, 09:15" }
])

const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  messages.value.push({ sender: 'patient', text: newMessage.value, time: "À l'instant" })
  newMessage.value = ''
  unreadMessages.value = 0
}

// ACTIONS DE JEU
const openConfigStudio = (activity) => {
  selectedActivity.value = activity
  showConfigStudio.value = true
}

const startGame = () => {
  showConfigStudio.value = false
  localStorage.setItem('playnride_user_avatar_id', selectedAvatar.value)
  router.push({
    path: '/play',
    query: { avatar: selectedAvatar.value, theme: selectedActivity.value.theme, equip: selectedEquip.value, from: 'patient' }
  })
}
</script>

<style scoped>
/* VARIABLES ET LAYOUT GLOBAL */
.dashboard-layout { display: flex; height: 100vh; background-color: #FAFCFF; font-family: 'Nunito', sans-serif;}
.sidebar { width: 280px; background: white; display: flex; flex-direction: column; justify-content: space-between; padding: 30px 20px; border-right: 1px solid #E2E8F0; z-index: 10;}
.sidebar-brand { display: flex; align-items: center; gap: 12px; cursor: pointer; margin-bottom: 50px; }
.sidebar-logo { height: 40px; }
.logo-text { font-weight: 900; color: #0A192F; font-size: 1.2rem; }
.sidebar-menu { display: flex; flex-direction: column; gap: 10px; }
.menu-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; text-decoration: none; color: #6B7C93; font-weight: 700; border-radius: 12px; transition: all 0.2s ease; font-size: 1rem; position: relative;}
.menu-icon { display: flex; align-items: center; justify-content: center; margin-right: 15px;}
.menu-item > span:first-child { display: flex; align-items: center; }
.menu-item:hover { background-color: #F8FAFC; color: #0A192F; }
.menu-item.active { background-color: #EAF7F9; color: #00B8D9; }
.notification-badge { background-color: #FC8181; color: white; font-size: 0.75rem; font-weight: 900; padding: 2px 8px; border-radius: 20px;}
.sidebar-bottom { border-top: 1px solid #E2E8F0; padding-top: 25px; }

.user-mini-profile { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; background: #F8FAFC; padding: 15px; border-radius: 12px;}
.user-avatar-mini { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.05); background: white;}
.user-avatar-mini img { width: 100%; height: 100%; object-fit: contain; padding: 2px;}
.user-name { font-size: 0.95rem; font-weight: 800; color: #0A192F; margin: 0 0 3px 0; line-height: 1.2;}
.user-status { font-size: 0.8rem; color: #20C997; margin: 0; font-weight: 700;}

.logout-btn-sidebar { background: none; border: none; color: #94A3B8; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; width: 100%; justify-content: flex-start;}
.logout-btn-sidebar:hover { color: #FC8181; }

.main-content { flex: 1; padding: 40px 60px; overflow-y: auto; }
.content-header { margin-bottom: 35px; } 
.content-header h1 { font-size: 2.2rem; color: #0A192F; font-weight: 900; margin-bottom: 8px; letter-spacing: -0.5px;}
.subtitle { color: #6B7C93; font-size: 1.1rem; }

/* AGENDA HORIZONTAL */
.agenda-section { margin-bottom: 30px; }
.agenda-week { display: flex; gap: 15px; }
.agenda-day { flex: 1; background: white; border: 2px solid #E2E8F0; border-radius: 16px; padding: 20px 10px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: all 0.2s; position: relative;}
.agenda-day:hover { border-color: #CBD5E1; transform: translateY(-2px);}
.agenda-day.has-session { border-color: #00B8D9; background: #FAFCFF;}
.agenda-day.completed { border-color: #20C997; background: #F0FDF4;}
.agenda-day.active { border-color: #00B8D9; background: #00B8D9; color: white; box-shadow: 0 10px 20px rgba(0,184,217,0.2); transform: translateY(-5px);}
.today-label { position: absolute; top: -10px; background: #FC8181; color: white; font-size: 0.65rem; font-weight: 900; padding: 2px 8px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.5px;}
.day-name { font-size: 0.85rem; font-weight: 700; text-transform: uppercase;}
.day-num { font-size: 1.8rem; font-weight: 900; line-height: 1;}
.day-month { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 5px;}
.agenda-day.active .day-name, .agenda-day.active .day-num, .agenda-day.active .day-month { color: white; }
.day-indicator { height: 20px; display: flex; align-items: center; justify-content: center;}
.dot-pending { width: 10px; height: 10px; background-color: #00B8D9; border-radius: 50%;}
.agenda-day.active .dot-pending { background-color: white; }
.dot-empty { width: 8px; height: 8px; background-color: #E2E8F0; border-radius: 50%;}
.icon-check { width: 18px; height: 18px; color: #20C997; }
.agenda-day.active .icon-check { color: white; }

/* DETAIL PRESCRIPTION */
.empty-state-day { background: white; padding: 50px; border-radius: 20px; text-align: center; border: 2px dashed #E2E8F0; color: #6B7C93;}
.empty-state-day h4 { color: #0A192F; font-size: 1.3rem; margin: 15px 0 5px; font-weight: 800;}
.prescription-card { display: flex; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;}
.prescription-image { flex: 1; min-height: 250px; background: #F1F5F9;}
.prescription-image img { width: 100%; height: 100%; object-fit: cover;}
.prescription-info { flex: 2; padding: 40px;}
.prescription-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;}
.clinical-badge { font-size: 0.75rem; font-weight: 900; padding: 6px 12px; border-radius: 8px; letter-spacing: 0.5px; margin-right: 10px;}
.bg-cyan-light { background-color: #EAF7F9; }
.text-cyan { color: #00B8D9; }
.time-slot-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 0.85rem; font-weight: 800; color: #4A5568;}
.status-badge { font-size: 0.8rem; font-weight: 800; padding: 6px 12px; border-radius: 20px; text-transform: uppercase;}
.status-badge.pending { background: #FFF9E6; color: #D97706;}
.status-badge.upcoming { background: #F1F5F9; color: #6B7C93;}
.status-badge.done { background: #E8F8F5; color: #047857;}
.prescription-info h2 { font-size: 2.2rem; color: #0A192F; font-weight: 900; margin-bottom: 10px;}
.prescription-desc { color: #6B7C93; font-size: 1.05rem; line-height: 1.6; margin-bottom: 25px;}
.prescription-metrics { display: flex; gap: 20px; margin-bottom: 30px;}
.metric { display: flex; align-items: center; gap: 8px; color: #4A5568; font-weight: 700; font-size: 0.95rem; background: #F8FAFC; padding: 8px 15px; border-radius: 10px;}
.btn-start-prescription { background: #00B8D9; color: white; border: none; padding: 18px 30px; font-size: 1.05rem; font-weight: 800; border-radius: 12px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; display: inline-flex; align-items: center; gap: 10px; width: 100%; justify-content: center;}
.btn-start-prescription:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,184,217,0.3);}

/* TAB BIBLIOTHEQUE */
.activities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
.activity-card { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-top: 4px solid #ccc; display: flex; flex-direction: column; transition: transform 0.2s; overflow: hidden;}
.activity-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0,0,0,0.06);}
.card-img-wrapper { height: 160px; width: 100%;}
.activity-img { width: 100%; height: 100%; object-fit: cover; }
.card-content { padding: 20px; flex: 1; display: flex; flex-direction: column;}
.poetic-title { color: #0A192F; font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
.activity-desc { color: #6B7C93; font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px; flex: 1; }
.tag-time { display: inline-flex; align-items: center; gap: 5px; background-color: #F1F5F9; color: #6B7C93; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700;}
.btn-play-activity { width: 100%; padding: 15px; border: none; color: white; font-weight: 800; font-size: 0.95rem; cursor: pointer; text-transform: uppercase; transition: opacity 0.2s;}
.btn-play-activity:hover { opacity: 0.9; }

/* TAB HISTORIQUE */
.history-stats-container { display: flex; gap: 20px; margin-bottom: 30px; }
.history-stat-card { flex: 1; background: white; padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); display: flex; align-items: center; gap: 20px; border: 1px solid #E2E8F0;}
.stat-icon { width: 60px; height: 60px; border-radius: 14px; display: flex; justify-content: center; align-items: center;}
.stat-info p { color: #6B7C93; font-size: 0.95rem; margin-bottom: 5px; font-weight: 700; text-transform: uppercase;}
.stat-info h3 { color: #0A192F; font-size: 1.8rem; font-weight: 900; margin: 0;}
.charts-dashboard { display: flex; gap: 20px; margin-bottom: 30px; }
.chart-card { background: white; border-radius: 16px; padding: 25px; border: 1px solid #E2E8F0; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.chart-large { flex: 2; }
.chart-small { flex: 1; }
.chart-title { color: #0A192F; font-size: 1rem; font-weight: 900; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 0.5px; }
.chart-container-axes { width: 100%; height: 240px; position: relative; }
.svg-chart { width: 100%; height: 100%; overflow: visible; }
.donut-wrapper { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.circular-chart { width: 130px; height: 130px; }
.circle-bg { fill: none; stroke: #F1F5F9; stroke-width: 3.8; }
.circle { fill: none; stroke-width: 3.8; stroke-linecap: round; }
.libre-segment { stroke: #20C997; }
.prescrit-segment { stroke: #00B8D9; }
.donut-number { fill: #0A192F; font-size: 5px; font-weight: 900; text-anchor: middle; dominant-baseline: middle; }
.donut-label { fill: #6B7C93; font-size: 2.5px; text-anchor: middle; }
.donut-legend { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.legend-item { display: flex; align-items: center; gap: 10px; }
.legend-color { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
.legend-text { display: flex; flex-direction: column; }
.legend-text strong { font-size: 0.9rem; color: #0A192F; }
.legend-text span { font-size: 0.8rem; color: #6B7C93; }
.table-wrapper { background: white; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); overflow: hidden; border: 1px solid #E2E8F0;}
.history-table { width: 100%; border-collapse: collapse; }
.history-table th { text-align: left; padding: 20px 25px; color: #6B7C93; font-weight: 800; background-color: #F8FAFC; border-bottom: 2px solid #E2E8F0; font-size: 0.85rem; text-transform: uppercase;}
.history-table td { padding: 20px 25px; color: #0A192F; font-size: 0.95rem; border-bottom: 1px solid #F1F5F9;}
.history-row-clickable { cursor: pointer; transition: background-color 0.2s; }
.history-row-clickable:hover { background-color: #F8FAFC; }
.history-details-row td { padding: 0; border-bottom: 2px solid #E2E8F0;}
.history-details-box { background-color: #FAFCFF; padding: 25px 40px; border-left: 4px solid #00B8D9; box-shadow: inset 0 4px 6px -4px rgba(0,0,0,0.05);}
.details-grid { display: flex; justify-content: space-between; gap: 20px; }
.detail-item { flex: 1; display: flex; flex-direction: column; gap: 8px;}
.detail-label { color: #6B7C93; font-size: 0.85rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;}
.detail-value { font-size: 1.2rem; font-weight: 900; }
.detail-value-stars { display: flex; align-items: center; gap: 8px; }
.star-icon { color: #E2E8F0; }
.star-icon.filled { color: #FFB800; }
.diff-badge { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; margin-left: 10px; }
.diff-facile { background: #E8F8F5; color: #20C997; }
.diff-moyen { background: #FFF9E6; color: #FFB800; }
.diff-dur { background: #FFF5F5; color: #FC8181; }
.tag-type { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800;}
.tag-type.prescrit { background: #EAF7F9; color: #00B8D9;}
.tag-type.libre { background: #F1F5F9; color: #6B7C93;}
.text-green { color: #20C997; }
.text-cyan { color: #00B8D9; }
.text-red { color: #FC8181; }
.reviewed-status { display: inline-flex; align-items: center; gap: 6px; color: #047857; font-weight: 700; font-size: 0.85rem;}
.pending-status { color: #94A3B8; font-style: italic; font-size: 0.85rem;}

/* TAB MESSAGERIE */
.chat-container { background: white; border-radius: 16px; border: 1px solid #E2E8F0; display: flex; flex-direction: column; height: 600px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);}
.chat-header { padding: 20px 30px; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; gap: 15px; background: #FAFCFF;}
.doctor-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #00B8D9; overflow: hidden; background: white;}
.doctor-avatar img { width: 100%; height: 100%; object-fit: contain;}
.chat-history { flex: 1; padding: 30px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; background: #F8FAFC;}
.message-row { display: flex; width: 100%; }
.message-row.from-doctor { justify-content: flex-start; }
.message-row.from-patient { justify-content: flex-end; }
.message-bubble { max-width: 60%; padding: 15px 20px; border-radius: 16px; position: relative;}
.from-doctor .message-bubble { background: white; border: 1px solid #E2E8F0; border-bottom-left-radius: 4px;}
.from-patient .message-bubble { background: #00B8D9; color: white; border-bottom-right-radius: 4px;}
.message-bubble p { margin: 0; font-size: 1rem; line-height: 1.5;}
.message-time { display: block; font-size: 0.75rem; margin-top: 8px; opacity: 0.7; text-align: right;}
.chat-input-area { padding: 20px 30px; background: white; border-top: 1px solid #E2E8F0; display: flex; gap: 15px;}
.chat-input-area input { flex: 1; padding: 15px 20px; border: 2px solid #E2E8F0; border-radius: 12px; font-size: 1rem; font-family: inherit; transition: border-color 0.2s;}
.chat-input-area input:focus { outline: none; border-color: #00B8D9;}
.btn-send { background: #00B8D9; border: none; width: 55px; height: 55px; border-radius: 12px; display: flex; justify-content: center; align-items: center; color: white; cursor: pointer; transition: background 0.2s;}
.btn-send:hover { background: #0284C7; }

/* MODAL CONFIG */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.85); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px;}
.modal-overlay.active { opacity: 1; visibility: visible; }
.clinical-modal { background: white; width: 100%; max-width: 900px; border-radius: 24px; overflow: hidden; position: relative; transform: translateY(30px); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
.modal-overlay.active .clinical-modal { transform: translateY(0); }
.close-modal { position: absolute; right: 20px; top: 20px; background: none; border: none; color: #94A3B8; cursor: pointer; z-index: 10; transition: color 0.2s;}
.close-modal:hover { color: #0A192F; }
.modal-inner { display: flex; flex-direction: row;}
.clinical-briefing { flex: 3; padding: 50px 40px; background-color: #FAFCFF; border-right: 1px solid #E2E8F0;}
.briefing-header { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #ccc;}
.briefing-header h2 { font-size: 2.2rem; color: #0A192F; font-weight: 900; margin-bottom: 10px; margin-top: 15px;}
.clinical-target-box { margin-bottom: 30px; }
.clinical-target-box h4 { display: flex; align-items: center; gap: 10px; color: #0A192F; font-size: 1.1rem; margin-bottom: 15px; font-weight: 800; }
.clinical-target-box ul { list-style: none; padding: 0; }
.clinical-target-box li { position: relative; padding-left: 20px; margin-bottom: 12px; color: #4A5568; font-weight: 600; font-size: 1rem;}
.clinical-target-box li::before { content: '•'; position: absolute; left: 0; color: #00B8D9; font-weight: bold; font-size: 1.5rem; line-height: 0.8;}
.safety-box { background: #FFF5F5; padding: 20px; border-radius: 12px; border: 1px solid #FED7D7;}
.safety-box h4 { display: flex; align-items: center; gap: 8px; color: #C53030; font-size: 1rem; margin-bottom: 10px; font-weight: 800; margin-top: 0;}
.safety-box p { margin: 0; color: #742A2A; font-size: 0.95rem; line-height: 1.5; }

.config-panel { flex: 2; display: flex; flex-direction: column; background: white;}
.config-step { padding: 40px 40px 10px; }
.instruction { color: #6B7C93; font-weight: 800; font-size: 0.85rem; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;}
.equip-card { display: flex; align-items: center; gap: 15px; padding: 15px 20px; border: 2px solid #E2E8F0; border-radius: 12px; cursor: pointer; transition: 0.2s; background: white; margin-bottom: 10px;}
.equip-card.selected { border-color: #00B8D9; background: #EAF7F9; }
.custom-equip-icon { width: 30px; height: 30px; object-fit: contain; } 
.equip-card p { font-weight: 800; color: #0A192F; margin: 0;}
.action-footer { margin-top: auto; padding: 40px; }
.btn-start-game { width: 100%; padding: 20px; border: none; border-radius: 16px; color: white; font-weight: 900; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;}
.btn-start-game:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(0,0,0,0.15); }

/* UTILITAIRES ANIMATION */
.tab-fade { animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 1024px) {
  .modal-inner { flex-direction: column; }
  .clinical-briefing { border-right: none; border-bottom: 1px solid #E2E8F0; padding: 30px; }
  .prescription-card { flex-direction: column; }
  .prescription-image { min-height: 200px; }
}
.imc-card { background:#F0FDF4; border:1px solid #BBF7D0; border-radius:10px; padding:12px 16px; margin-top:16px; font-size:0.95rem; }
.text-green { color:#20C997; }
.text-warning { color:#F59E0B; }
.text-red { color:#EF4444; }
.effort-chart-wrapper { margin-bottom: 16px; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
.empty-effort-chart { padding:20px; text-align:center; color:#94A3B8; font-size:0.85rem; font-style:italic; margin-bottom:16px; }
.options-grid-images { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.option-btn-image { padding: 10px; background: white; border: 2px solid #F1F5F9; border-radius: 12px; cursor: pointer; transition: 0.2s; display: flex; justify-content: center; align-items: center; }
.option-btn-image:hover { border-color: #CBD5E1; }
.option-btn-image.selected { border-color: #0EA5E9; background: #F0F9FF; }
.custom-avatar-img { width: 45px; height: 45px; object-fit: contain; }
</style>