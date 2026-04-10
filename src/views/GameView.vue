<template>
  <div class="game-container">
    <div class="game-header">
      <button class="back-btn" @click="quitGame">← Quitter l'exercice</button>
      <h2>{{ gameTheme }}</h2>
      <div class="score-display">
        <span class="timer-text" style="margin-right: 15px;">⏳ {{ timeRemainingText }}</span>
        Score : {{ finalScore * 10 }}
      </div>
    </div>
    
    <div class="game-layout">
      <div class="game-wrapper">
        <canvas id="game" width="300" height="500"></canvas>
        <p id="description" class="game-description">Pédalez fort pour commencer !</p>
        <div v-if="hasWon" class="victory-banner">🎉 SÉANCE TERMINÉE ! 🎉</div>
        <div v-if="isGameOver && !hasWon" class="victory-banner" style="background: #F59E0B;">💪 BEL EFFORT ! 💪</div>
      </div>

      <div class="live-players-sidebar" :class="{ 'is-open': showLivePlayers }">
        <div class="sidebar-header">
          <h3><span class="live-dot"></span> En direct</h3>
          <button class="close-sidebar" @click="showLivePlayers = false">&times;</button>
        </div>
        <ul class="players-list">
          <li v-for="(player, index) in livePlayers" :key="index" :class="{'is-me': player.isMe}">
            <div class="player-avatar">{{ player.name.charAt(0) }}</div>
            <div class="player-info">
              <span class="player-name">{{ player.name }}</span>
              <span class="player-score">{{ player.score }} pts</span>
            </div>
            <span v-if="player.isMe" class="you-badge">Vous</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="modal-overlay" :class="{ active: showEndScreen }">
      <div class="end-modal-wide">
        
        <div class="modal-header-end">
          <span class="trophy-icon">🏆</span>
          <h3>Session Terminée</h3>
          <p class="bravo-text" v-if="hasWon">Objectif clinique atteint ! 🎉</p>
          <p class="bravo-text" style="color: #F59E0B;" v-else>Bel effort ! N'hésitez pas à réessayer pour aller jusqu'au bout. 💪</p>
        </div>
        
        <div class="modal-body-split">
          
          <div class="modal-left">
            <div class="effort-chart-section">
              <p class="chart-label">Profil de votre effort</p>
              <p class="chart-desc">Déplacement de l'avatar (esquive) en fonction du temps.</p>
              
              <div class="svg-container">
                <svg viewBox="-20 -10 440 140" width="100%" height="100%" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="0" y2="100" stroke="#CBD5E1" stroke-width="2"/>
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#CBD5E1" stroke-width="2"/>
                  
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#E2E8F0" stroke-width="1" stroke-dasharray="4"/>
                  
                  <text x="-5" y="10" font-size="10" fill="#6B7C93" text-anchor="end">Haut</text>
                  <text x="-5" y="55" font-size="10" fill="#6B7C93" text-anchor="end">Moy</text>
                  <text x="-5" y="100" font-size="10" fill="#6B7C93" text-anchor="end">Bas</text>
                  
                  <text x="0" y="115" font-size="10" fill="#6B7C93">0s</text>
                  <text x="200" y="115" font-size="10" fill="#6B7C93" text-anchor="middle">Temps de la séance</text>
                  <text x="400" y="115" font-size="10" fill="#6B7C93" text-anchor="end">Fin</text>

                  <polyline :points="effortPolyline" fill="none" stroke="#20C997" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div class="modal-right">
            
            <div class="podium-container">
              <div class="podium-place place-2" v-if="sortedLeaderboard[1]">
                <div class="medal">🥈</div>
                <div class="podium-bar silver">
                  <span class="p-name">{{ sortedLeaderboard[1].name.substring(0, 8) }}</span>
                  <span class="p-score">{{ sortedLeaderboard[1].score }}</span>
                </div>
              </div>
              <div class="podium-place place-1" v-if="sortedLeaderboard[0]">
                <div class="medal">🥇</div>
                <div class="podium-bar gold">
                  <span class="p-name">{{ sortedLeaderboard[0].name.substring(0, 8) }}</span>
                  <span class="p-score">{{ sortedLeaderboard[0].score }}</span>
                </div>
              </div>
              <div class="podium-place place-3" v-if="sortedLeaderboard[2]">
                <div class="medal">🥉</div>
                <div class="podium-bar bronze">
                  <span class="p-name">{{ sortedLeaderboard[2].name.substring(0, 8) }}</span>
                  <span class="p-score">{{ sortedLeaderboard[2].score }}</span>
                </div>
              </div>
            </div>

            <div class="my-rank-info">
              Votre position : <strong>#{{ myRank }}</strong> sur {{ sortedLeaderboard.length }} — Score : <strong>{{ finalScore * 10 }} pts</strong>
            </div>

            <div class="stats-grid">
              <div class="stat-box-small">
                <span>Distance (d)</span>
                <strong class="text-cyan">{{ distanceParcourue.toFixed(0) }} m</strong>
              </div>
              <div class="stat-box-small">
                <span>Vit. Maximale</span>
                <strong>{{ vitesseMax.toFixed(1) }} km/h</strong>
              </div>
              <div class="stat-box-small">
                <span>Cardio Moy.</span>
                <strong class="text-red">{{ cardioSimule }} BPM</strong>
              </div>
              <div class="stat-box-small">
                <span>Puissance Moy.</span>
                <strong class="text-cyan">{{ puissanceMoyenne.toFixed(0) }} W</strong>
              </div>
              <div class="stat-box-small">
                <span>Cadence Moy.</span>
                <strong>{{ cadenceMoyenne.toFixed(0) }} RPM</strong>
              </div>
              <div class="stat-box-small">
                <span>Durée Réelle</span>
                <strong>{{ sessionDuration }}</strong>
              </div>
            </div>

            <div class="feedback-section">
              <p>Notez votre ressenti (Fatigue/Douleur) :</p>
              <div class="stars-rating">
                <span v-for="n in 5" :key="n" @click="rating = n" :class="{ active: n <= rating }">★</span>
              </div>
              <div class="difficulty-buttons">
                <button :class="{ active: difficulty === 'Facile' }" @click="difficulty = 'Facile'">😁 Facile</button>
                <button :class="{ active: difficulty === 'Moyen' }" @click="difficulty = 'Moyen'">😐 Moyen</button>
                <button :class="{ active: difficulty === 'Dur' }" @click="difficulty = 'Dur'">🥵 Dur</button>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: auto;">
              <button v-if="!hasWon" class="btn-retry-score" @click="retrySession">
                RÉESSAYER
              </button>
              <button class="btn-save-score" @click="saveAndReturn" :disabled="saving">
                {{ saving ? 'Enregistrement...' : 'ENREGISTRER AU DOSSIER' }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import protocolesCliniquesJSON from '../data/protocoles.json'

const route = useRoute()
const router = useRouter()

const playerAvatarId = route.query.avatar || 'avatar1' 
const equipment = route.query.equip || 'Vélo'
const isGuest = route.query.from === 'guest'

const isGameOver = ref(false)
const hasWon = ref(false)
const showEndScreen = ref(false)
const finalScore = ref(0)
const sessionDuration = ref("0 min") 
const timeRemainingText = ref("Chargement...")

const rating = ref(3)
const difficulty = ref('Moyen')
const saving = ref(false)
const showLivePlayers = ref(false)

// Données pour la courbe SVG et les calculs
const effortData = ref([])
const cadencesArray = ref([]) 

// Métriques cliniques calculées
const distanceParcourue = ref(0)
const vitesseMax = ref(0)
const vitesseMoyenne = ref(0)
const puissanceMoyenne = ref(0)
const cadenceMoyenne = ref(0)
const cardioSimule = ref(110)
const puissanceExplosive = ref(0) 
const maxRpm = ref(0) 

let sessionStartTime = null
let sessionEndTime = null
let gameLoopInterval = null
let handleInput = null
let totalFlaps = 0; 
let flapsThisSecond = 0; 
let lastSecondCheck = 0;

// Ce "pont" permettra d'appeler le reset du jeu (dans le onMounted) depuis le bouton de la modale (hors du onMounted)
let forceGameReset = null;

// --- MAPPING DU SCENARIO ---
let themeURL = route.query.theme ? decodeURIComponent(route.query.theme) : "L'Aube Douce";
let themeStr = String(themeURL).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
let safeKey = "L'Aube Douce"; 

if (themeStr.includes("sylvestre") || themeStr.includes("foret")) safeKey = "L'Échappée Sylvestre";
else if (themeStr.includes("ocean") || themeStr.includes("souffle") || themeStr.includes("plage")) safeKey = "Souffle Océanique";
else if (themeStr.includes("jardin") || themeStr.includes("sens")) safeKey = "Le Jardin des Sens";
else if (themeStr.includes("alpin") || themeStr.includes("ascension") || themeStr.includes("montagne")) safeKey = "L'Ascension Alpine";
else if (themeStr.includes("aerien") || themeStr.includes("voyage") || themeStr.includes("ciel")) safeKey = "Voyage Aérien";

const gameTheme = ref(safeKey); 

const livePlayers = ref([
  { name: 'Marc L.', score: 850, isMe: false },
  { name: 'Sophie D.', score: 520, isMe: false },
  { name: 'Jean D.', score: 310, isMe: false },
  { name: 'Riyad B.', score: 120, isMe: false },
  { name: isGuest ? 'Vous (Invité)' : 'Vous', score: 0, isMe: true }
])

const sortedLeaderboard = computed(() => {
  return [...livePlayers.value].sort((a, b) => b.score - a.score)
})
const myRank = computed(() => {
  return sortedLeaderboard.value.findIndex(p => p.isMe) + 1
})

// Génération de la courbe SVG
const effortPolyline = computed(() => {
  if (effortData.value.length === 0) return "0,50 400,50";
  const width = 400; const height = 100;
  const maxTime = effortData.value[effortData.value.length - 1].time || 1;
  const canvasPlayableHeight = 388;
  return effortData.value.map(pt => {
    let x = (pt.time / maxTime) * width;
    let y = (pt.y / canvasPlayableHeight) * height; 
    return `${x},${y}`;
  }).join(' ');
})

// Fonction pour fermer la modale et REINITIALISER VRAIMENT le jeu
const retrySession = () => {
  showEndScreen.value = false;
  if (forceGameReset) {
    forceGameReset(); // On déclenche la fonction de réinitialisation qui se trouve dans onMounted
  }
}

onMounted(() => {
  let cvs = document.getElementById('game')
  let ctx = cvs.getContext('2d')
  let description = document.getElementById('description')
  
  let spriteUI = new Image(); spriteUI.src = '/images/og-theme.png' 
  let spriteNumbers = new Image(); spriteNumbers.src = '/images/og-theme-2.png'
  
  let imgAvatar = new Image();
  let formattedFileName = playerAvatarId.replace(/^avatar(\d)$/, 'avatar-$1');
  imgAvatar.src = `/images/${formattedFileName}.png`;

  const themeAssets = {
    "L'Aube Douce":         { bg: '/images/bg-nature.png',   sky: '#F0E68C' },
    "L'Échappée Sylvestre": { bg: '/images/bg-foret.png',    sky: '#8FBC8F' },
    "Souffle Océanique":    { bg: '/images/bg-plage.png',    sky: '#00BFFF' },
    "Le Jardin des Sens":   { bg: '/images/bg-jardin.png',   sky: '#FFB6C1' },
    "L'Ascension Alpine":   { bg: '/images/bg-montagne.png', sky: '#D2B48C' },
    "Voyage Aérien":        { bg: '/images/bg-ciel.png',     sky: '#9370DB' }
  }

  // LECTURE DE LA CONFIG (LocalStorage ou Fichier JSON)
  const storedConfig = JSON.parse(localStorage.getItem('playnride_scenarios')) || protocolesCliniquesJSON;
  let activeConfig = storedConfig[safeKey] || protocolesCliniquesJSON["L'Aube Douce"]; 
  let currentThemeAssets = themeAssets[safeKey] || themeAssets["L'Aube Douce"];

  const sequenceObstacles = activeConfig.obstaclesManager.split(' ');
  const sequenceDistances = activeConfig.distanceManager.split(' ').map(Number);
  const jsonSpeed = parseFloat(activeConfig.vitesseDefilement);
  const dureeTotaleSecondes = (activeConfig.dureeMinutes || 15) * 60; 

  timeRemainingText.value = `${activeConfig.dureeMinutes}:00`;

  let skyColor = currentThemeAssets.sky;
  let customBg = new Image(); 
  customBg.src = currentThemeAssets.bg;
  let customBgLoaded = false;
  customBg.onload = () => { customBgLoaded = true; };

  let frame = 0; let degree = Math.PI/180
  const SFX_SCORE = new Audio(); const SFX_FLAP = new Audio(); const SFX_COLLISION = new Audio(); const SFX_FALL = new Audio(); const SFX_SWOOSH = new Audio() 
  SFX_SCORE.src = '/audio/sfx_point.wav'; SFX_FLAP.src = '/audio/sfx_wing.wav'; SFX_COLLISION.src = '/audio/sfx_hit.wav'; SFX_FALL.src = '/audio/sfx_die.wav'; SFX_SWOOSH.src = '/audio/sfx_swooshing.wav'

  let gameState = { current: 0, getReady: 0, play: 1, gameOver: 2 }

  let bg = { 
    dx: jsonSpeed * 0.2, 
    x: 0, classicImgX: 0, classicImgY: 0, classicWidth: 276, classicHeight: 228,
    render: function() { 
      if (customBgLoaded && customBg.naturalWidth > 0) {
        let drawY = 0; let drawH = cvs.height; let repeatW = cvs.width;
        ctx.drawImage(customBg, this.x, drawY, repeatW, drawH); 
        ctx.drawImage(customBg, this.x + repeatW, drawY, repeatW, drawH); 
        ctx.drawImage(customBg, this.x + repeatW * 2, drawY, repeatW, drawH);
      } else if (spriteUI.complete && spriteUI.naturalWidth > 0) { 
        let classicDrawY = cvs.height - this.classicHeight;
        ctx.drawImage(spriteUI, this.classicImgX, this.classicImgY, this.classicWidth, this.classicHeight, this.classicX, classicDrawY, this.classicWidth, this.classicHeight); 
        ctx.drawImage(spriteUI, this.classicImgX, this.classicImgY, this.classicWidth, this.classicHeight, this.classicX + this.classicWidth, classicDrawY, this.classicWidth, this.classicHeight); 
      }
    }, 
    position: function () { 
      let repeatWidth = (customBgLoaded && customBg.naturalWidth > 0) ? cvs.width : this.classicWidth;
      if (gameState.current == gameState.getReady) { this.classicX = 0; this.x = 0; } 
      if (gameState.current == gameState.play) { 
        this.x = (this.x - this.dx) % repeatWidth;
        this.classicX = (this.classicX - this.dx) % this.classicWidth;
      } 
    },
    classicX: 0
  }

  // GESTIONNAIRE D'OBSTACLES EN BOUCLE CONTINUE
  let pipes = { 
    top: { imgX: 56, imgY: 323 }, bot: { imgX: 84, imgY: 323 }, imgW: 26, imgH: 160,          
    w: 55, dx: jsonSpeed, 
    obsSequence: sequenceObstacles, distSequence: sequenceDistances,
    currentObsIndex: 0, distanceCounter: 0, pipeArray: [], 
    
    reset: function() { this.pipeArray = []; this.currentObsIndex = 0; this.distanceCounter = 0; hasWon.value = false; totalFlaps = 0; distanceParcourue.value = 0;}, 
    
    render: function() { 
      for (let i = 0; i < this.pipeArray.length; i++) { 
        let p = this.pipeArray[i]; 
        if (spriteNumbers.complete && spriteNumbers.naturalWidth > 0) {
          if (p.isTop) ctx.drawImage(spriteNumbers, this.top.imgX, this.top.imgY, this.imgW, this.imgH, p.x, p.y, this.w, p.h);
          else ctx.drawImage(spriteNumbers, this.bot.imgX, this.bot.imgY, this.imgW, this.imgH, p.x, p.y, this.w, p.h);
        }
      } 
    }, 
    
    position: function(isTimeUp) { 
      if (gameState.current !== gameState.play) return; 
      if (hasWon.value) return;

      if (!isTimeUp) {
        this.distanceCounter += this.dx;
        
        let distanceTarget = this.distSequence[this.currentObsIndex] * 10;
        if(isNaN(distanceTarget) || distanceTarget === 0) distanceTarget = 100; // Securite
        
        if (this.distanceCounter >= distanceTarget) {
          let typeObs = this.obsSequence[this.currentObsIndex];

          // Rebouclage si on tombe sur z ou undefined
          if (typeObs === 'z' || typeObs === undefined) {
             this.currentObsIndex = 0;
             typeObs = this.obsSequence[this.currentObsIndex];
          }

          if (typeObs !== 'z' && typeObs !== undefined) {
             let spawnY = 0; let obsHeight = 150; let isTop = false;

             if (typeObs === 'x1') { isTop = true; spawnY = 0; obsHeight = 160; } 
             if (typeObs === 'x2') { isTop = true; spawnY = 0; obsHeight = 240; } 
             if (typeObs === 'y1') { isTop = false; obsHeight = 160; spawnY = 388 - obsHeight; } 
             if (typeObs === 'y2') { isTop = false; obsHeight = 240; spawnY = 388 - obsHeight; } 
             
             // On s'assure que le nouvel obstacle spawn après le dernier obstacle généré pour éviter les superpositions
             let lastPipeX = cvs.width;
             if (this.pipeArray.length > 0) {
                 lastPipeX = Math.max(cvs.width, this.pipeArray[this.pipeArray.length - 1].x + 100);
             }

             this.pipeArray.push({ x: lastPipeX, y: spawnY, h: obsHeight, isTop: isTop, passed: false });
          }
          
          this.distanceCounter = 0;
          this.currentObsIndex = (this.currentObsIndex + 1) % this.obsSequence.length;
        }
      }

      for (let i = 0; i < this.pipeArray.length; i++) { 
        let p = this.pipeArray[i]; 
        let bBox = { left: bird.x - bird.r + 5, right: bird.x + bird.r - 5, top: bird.y - bird.r + 5, bottom: bird.y + bird.r - 5 }; 
        let pBox = { left: p.x + 5, right: p.x + this.w - 5, top: p.y, bottom: p.y + p.h }; 
        p.x -= this.dx; 
        
        if(p.x + this.w < bird.x && !p.passed) { 
          score.current++; p.passed = true; SFX_SCORE.play().catch(()=>{});
          // Simulation d'une pointe de puissance (explosive) lors d'un passage
          let puissanceInstantanee = 27 * ((jsonSpeed * 3.6) / 3.6); 
          if(typeObs === 'x2' || typeObs === 'y2') puissanceInstantanee *= 1.5; 
          if(puissanceInstantanee > puissanceExplosive.value) puissanceExplosive.value = puissanceInstantanee;
        }; 
        if(p.x + this.w < 0) { this.pipeArray.shift(); i--; continue; }
        
        // COLLISION = GAME OVER IMMEDIAT (L'Avatar tombe)
        if (!hasWon.value && bBox.left < pBox.right && bBox.right > pBox.left && bBox.top < pBox.bottom && bBox.bottom > pBox.top) { 
          SFX_COLLISION.play().catch(()=>{});
          gameState.current = gameState.gameOver; 
        } 
      } 
    } 
  }

  let ground = { imgX: 276, imgY: 0, width: 224, height: 112, x: 0, y:cvs.height - 112, w:224, h:112, dx: jsonSpeed, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0){ ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h); ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x + this.width,this.y,this.w,this.h) } }, position: function() { if (gameState.current == gameState.getReady) { this.x = 0 }; if (gameState.current == gameState.play) { this.x = (this.x-this.dx) % (this.w/2) } } }
  
  let score = { current: 0, x: cvs.width/2, y: 40, w: 15, h: 25, reset: function() { this.current = 0 }, render: function() { ctx.fillStyle = "white"; ctx.font = "35px Nunito"; ctx.textAlign = "center"; if (gameState.current == gameState.play || gameState.current == gameState.gameOver) { ctx.fillText(this.current, this.x, this.y + 20); } } }

  let bird = {
      width: 30, height: 30, x: 50, y: 160, w: 30, h: 30, r: 10, fly: 5.5, gravity: 0.35, velocity: 0, rotation: 0,
      render: function() {
          ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
          if (imgAvatar.complete && imgAvatar.naturalWidth > 0) { ctx.drawImage(imgAvatar, -this.w/2, -this.h/2, this.w, this.h); } 
          else { ctx.fillStyle = "#FFB800"; ctx.beginPath(); ctx.arc(0, 0, this.r, 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
      },
      flap: function() { this.velocity = - this.fly; totalFlaps++; flapsThisSecond++; },
      position: function() {
          if (gameState.current == gameState.getReady) { this.y = 160; this.rotation = 0 * degree } else {
              if (hasWon.value) { this.velocity = 0; this.rotation = 0; }
              else { this.velocity += this.gravity; this.y += this.velocity; }
              
              if (this.velocity <= this.fly) { this.rotation = -15 * degree } else if (this.velocity >= this.fly+2) { this.rotation = 70 * degree; } else { this.rotation = 0 }
              // COLLISION SOL = GAME OVER IMMEDIAT
              if (this.y+this.h/2 >= cvs.height-ground.h) { 
                this.y = cvs.height-ground.h - this.h/2; 
                if (gameState.current == gameState.play) { 
                  gameState.current = gameState.gameOver; SFX_FALL.play().catch(()=>{}) 
                } 
              }
              if (this.y-this.h/2 <= 0) { this.y = this.r }
          }
      }
  }

  let getReady = { imgX: 0, imgY: 228, width: 174, height: 160, x: cvs.width/2 - 174/2, y: cvs.height/2 - 160, w: 174, h: 160, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0 && gameState.current == gameState.getReady) { ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h) } } }

  let draw = () => {
      ctx.fillStyle = skyColor; ctx.fillRect(0,0, cvs.width,cvs.height)
      bg.render(); pipes.render(); ground.render(); score.render(); bird.render(); getReady.render(); 
  }

  let update = () => { bird.position(); bg.position(); ground.position() }

  // LA FONCTION DE REINITIALISATION DU MOTEUR (Appelée par le canvas ou le bouton)
  const resetGameEngine = () => {
      pipes.reset(); 
      score.reset(); 
      effortData.value = []; 
      cadencesArray.value = []; 
      SFX_SWOOSH.play().catch(()=>{}); 
      gameState.current = gameState.getReady; 
      description.style.visibility = "visible";
      sessionStartTime = null; 
      sessionEndTime = null; 
      timeRemainingText.value = `${activeConfig.dureeMinutes}:00`; 
  }

  // On lie cette fonction à la variable globale pour le bouton "RÉESSAYER"
  forceGameReset = resetGameEngine;

  let loop = () => {
      let isTimeUp = false;

      if (gameState.current === gameState.play) {
        if (!sessionStartTime) {
            sessionStartTime = Date.now();
            lastSecondCheck = sessionStartTime;
        }
        
        let now = Date.now();
        let elapsedSeconds = (now - sessionStartTime) / 1000;
        
        // COMPTE A REBOURS DU SCÉNARIO
        let remainingSeconds = Math.max(0, dureeTotaleSecondes - Math.floor(elapsedSeconds));
        let m = Math.floor(remainingSeconds / 60);
        let s = remainingSeconds % 60;
        timeRemainingText.value = `${m}:${s < 10 ? '0' : ''}${s}`;

        if (remainingSeconds <= 0) isTimeUp = true;

        if (isTimeUp && pipes.pipeArray.length === 0 && !hasWon.value) {
             hasWon.value = true;
             setTimeout(() => { gameState.current = gameState.gameOver; }, 1500);
        }

        // --- CALCULS DES METRIQUES CLINIQUES ---
        let currentSpeedKmh = (jsonSpeed * 60 * 60) / 1000; 
        vitesseMoyenne.value = currentSpeedKmh;
        if (currentSpeedKmh > vitesseMax.value) vitesseMax.value = currentSpeedKmh;
        
        distanceParcourue.value += (jsonSpeed * 0.1); 

        if (now - lastSecondCheck >= 1000) {
            let instCadence = ((flapsThisSecond / 4) / 2.5) * 60;
            cadencesArray.value.push(instCadence);
            if(instCadence > maxRpm.value) maxRpm.value = instCadence;
            
            let sumCadence = cadencesArray.value.reduce((a, b) => a + b, 0);
            cadenceMoyenne.value = sumCadence / cadencesArray.value.length;
            
            flapsThisSecond = 0;
            lastSecondCheck = now;
        }

        let vitesseMs = vitesseMoyenne.value / 3.6;
        puissanceMoyenne.value = 27 * vitesseMs; 

        cardioSimule.value = Math.floor(90 + (cadenceMoyenne.value * 0.5));

        if (frame % 30 === 0 && !hasWon.value) {
          effortData.value.push({ time: elapsedSeconds, y: bird.y });
        }

        let me = livePlayers.value.find(p => p.isMe)
        if (me) me.score = score.current * 10;
        livePlayers.value.forEach(p => { if(!p.isMe && Math.random() < 0.01) p.score += 10; })
      }

      draw(); update(); pipes.position(isTimeUp); frame++;

      if(gameState.current === gameState.gameOver) {
          if (!sessionEndTime) {
              sessionEndTime = Date.now()
              let elapsed = sessionStartTime ? Math.round((sessionEndTime - sessionStartTime) / 1000) : 0;
              let m = Math.floor(elapsed / 60);
              let s = Math.floor(elapsed % 60);
              sessionDuration.value = s > 0 ? `${m} min ${s}s` : `${m} min`;
          }
          isGameOver.value = true;
          finalScore.value = score.current;
          showEndScreen.value = true;
      } else {
          isGameOver.value = false;
      }
  }
  
  gameLoopInterval = setInterval(loop, 17)

  handleInput = (e) => {
      if (e.type === 'keydown' && e.keyCode !== 32) return;
      if (showEndScreen.value) return; // Si la modale est ouverte, on ignore la barre espace
      
      if (gameState.current == gameState.getReady) { 
          gameState.current = gameState.play; 
          description.style.visibility = "hidden"; 
      }
      if (gameState.current == gameState.play && !hasWon.value) { 
          bird.flap(); 
          SFX_FLAP.play().catch(()=>{}); 
      }
      if (gameState.current == gameState.gameOver && !hasWon.value) { 
          resetGameEngine(); // On utilise la même fonction de reset quand on clique sur le canvas en mode échec
      }
  }

  cvs.addEventListener('click', handleInput)
  window.addEventListener('keydown', handleInput)
})

const quitGame = () => { 
  const returnPath = route.query.from === 'guest' ? '/guest-dashboard' : '/patient-dashboard'
  router.push(returnPath) 
}

const saveAndReturn = () => {
  saving.value = true
  const returnPath = route.query.from === 'guest' ? '/guest-dashboard' : '/patient-dashboard'

  // --- PASSAGE DES DONNEES AU DASHBOARD PATIENT ---
  const pointsSVG = effortPolyline.value;
  const history = JSON.parse(localStorage.getItem('playnride_history')) || [];
  
  // On insère TOUTES les données mathématiques calculées
  history.unshift({
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    type: "libre", 
    scenario: gameTheme.value, 
    duration: sessionDuration.value, 
    score: finalScore.value * 10, 
    
    distance: distanceParcourue.value.toFixed(0),
    avgSpeed: vitesseMoyenne.value.toFixed(1),
    vitesseMax: vitesseMax.value.toFixed(1),
    rpm: Math.round(cadenceMoyenne.value), 
    maxRpm: Math.round(maxRpm.value),
    watts: Math.round(puissanceMoyenne.value), 
    puissanceExplosive: Math.round(puissanceExplosive.value),
    avgBpm: cardioSimule.value,
    maxBpm: Math.round(cardioSimule.value * 1.15), 
    resistanceEffort: "85%", 
    
    rpe: difficulty.value, 
    svgPoints: pointsSVG, 
    reviewed: false, 
    rating: rating.value
  });
  
  localStorage.setItem('playnride_history', JSON.stringify(history));

  setTimeout(() => {
    saving.value = false
    router.push({ path: returnPath, query: { finished: true, score: finalScore.value * 10, diff: difficulty.value } })
  }, 1000)
}

onUnmounted(() => {
  if (gameLoopInterval) clearInterval(gameLoopInterval)
  if (handleInput) window.removeEventListener('keydown', handleInput)
})
</script>

<style scoped>
.game-container { display: flex; flex-direction: column; align-items: center; min-height: 100vh; background-color: #0A192F; color: white; padding: 30px 20px; font-family: 'Nunito', sans-serif;}
.game-header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.game-header h2 { color: #00B8D9; font-size: 1.2rem; font-weight: 900; text-align: center; margin: 0; flex: 1;}
.timer-text { color: white; margin-right: 15px;}
.score-display { background: #00B8D9; color: white; padding: 8px 20px; border-radius: 20px; font-weight: 900; display: flex; align-items: center;}
.back-btn { background: transparent; border: 2px solid #6B7C93; color: white; padding: 10px 20px; border-radius: 50px; cursor: pointer; transition: 0.3s; font-weight: bold; align-self: flex-start; }
.back-btn:hover { background: white; color: #0A192F; }

.btn-toggle-players { background: #EAF7F9; color: #00B8D9; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-weight: bold; transition: 0.2s;}
.btn-toggle-players:hover { background: white; }

.game-layout { display: flex; gap: 30px; align-items: flex-start; max-width: 900px; width: 100%; justify-content: center; position: relative;}
.game-wrapper { position: relative; border: 10px solid #1C2833; border-radius: 20px; background: #333; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; justify-content: center; width: 100%; max-width: 450px; overflow: hidden; z-index: 5;}
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; }
.game-description { position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; color: white; font-weight: 900; font-size: 1.1rem; background: rgba(0, 0, 0, 0.6); padding: 10px 0; margin: 0;}
.victory-banner { position: absolute; top: 30%; left: 0; width: 100%; text-align: center; color: white; background: #20C997; padding: 15px 0; font-size: 1.5rem; font-weight: 900; animation: popIn 0.5s ease; box-shadow: 0 10px 20px rgba(32,201,151,0.4);}
@keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

.live-players-sidebar { width: 280px; background: white; border-radius: 16px; padding: 20px; color: #1C2833; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
@media (max-width: 800px) { .live-players-sidebar { position: absolute; right: 0; top: 0; height: 100%; transform: translateX(120%); z-index: 10;} .live-players-sidebar.is-open { transform: translateX(0); } }
.sidebar-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #E2E8F0; padding-bottom: 10px; margin-bottom: 15px;}
.sidebar-header h3 { font-size: 1.1rem; color: #0A192F; margin: 0; font-weight: 900; display: flex; align-items: center; gap: 8px;}
.live-dot { width: 10px; height: 10px; background: #EF4444; border-radius: 50%; animation: pulse 1.5s infinite; display: inline-block; margin-right: 5px;}
.close-sidebar { background: none; border: none; font-size: 1.5rem; color: #6B7C93; cursor: pointer;}
.players-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;}
.players-list li { display: flex; align-items: center; gap: 10px; position: relative;}
.player-avatar { width: 35px; height: 35px; background: #F8FAFC; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #0A192F; border: 1px solid #E2E8F0;}
.player-info { display: flex; flex-direction: column; line-height: 1.2;}
.player-name { font-size: 0.9rem; font-weight: 700; display: block;}
.player-score { font-size: 0.8rem; color: #20C997; font-weight: 900;}
.players-list li.is-me .player-avatar { background: #00B8D9; color: white;}
.you-badge { position: absolute; right: 0; background: #00B8D9; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; text-transform: uppercase;}
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

/* --- CSS DU MODAL LARGE --- */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.9); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }

.end-modal-wide { background: white; width: 100%; max-width: 850px; border-radius: 20px; padding: 35px; color: #1C2833; transform: translateY(30px); transition: 0.3s; max-height: 90vh; overflow-y: auto;}
.modal-overlay.active .end-modal-wide { transform: translateY(0); }

.modal-header-end { display: flex; flex-direction: column; align-items: center; margin-bottom: 25px; text-align: center; border-bottom: 1px solid #E2E8F0; padding-bottom: 15px;}
.trophy-icon { font-size: 3rem; margin-bottom: 5px; }
.modal-header-end h3 { font-size: 1.8rem; color: #0A192F; margin: 10px 0 5px 0; font-weight: 900;}
.bravo-text { font-weight: 900; font-size: 1.2rem; margin-bottom: 0; color: #20C997;}

.modal-body-split { display: flex; gap: 30px;}
.modal-left { flex: 1; }
.modal-right { flex: 1; display: flex; flex-direction: column; align-items: center;}

@media (max-width: 800px) {
  .modal-body-split { flex-direction: column; }
}

/* COURBE D'EFFORT (GAUCHE) */
.effort-chart-section { background: #FAFCFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px; text-align: left; height: 100%;}
.chart-label { font-size: 1rem; font-weight: 900; color: #0A192F; margin: 0 0 5px 0;}
.chart-desc { font-size: 0.8rem; color: #6B7C93; margin: 0 0 15px 0;}
.svg-container { width: 100%; height: 250px; background: white; border: 1px solid #F1F5F9; border-radius: 8px; padding: 10px; overflow: visible;}

/* PODIUM FLAT DESIGN (DROITE) */
.podium-container { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 120px; margin-bottom: 20px; width: 100%;}
.podium-place { display: flex; flex-direction: column; align-items: center; width: 30%; position: relative; }
.medal { font-size: 1.5rem; margin-bottom: -10px; z-index: 2; line-height: 1;}
.place-1 .medal { font-size: 2rem; margin-bottom: -12px; }

.podium-bar { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 10px; border-radius: 8px 8px 0 0; }
.silver { height: 60px; background: #A0AEC0; }
.gold { height: 90px; background: #FFC107; }
.bronze { height: 50px; background: #CD7F32; }

.p-name { font-size: 0.7rem; font-weight: 800; color: white; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 95%; margin-bottom: 2px;}
.p-score { font-size: 0.8rem; font-weight: 900; color: white; }

.my-rank-info { font-size: 0.85rem; color: #6B7C93; margin-bottom: 20px;}

/* GRILLE METRIQUES CLINIQUES 3x2 */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 25px; width: 100%;}
.stat-box-small { background: #F8FAFC; padding: 12px 5px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 1px solid #E2E8F0;}
.stat-box-small span { font-size: 0.65rem; color: #6B7C93; font-weight: 800; text-transform: uppercase; margin-bottom: 3px; line-height: 1.1;}
.stat-box-small strong { font-size: 1rem; color: #0A192F; font-weight: 900;}
.text-cyan { color: #00B8D9;}
.text-red { color: #E53E3E;}

/* ÉTOILES ET BOUTONS */
.feedback-section { margin-bottom: 20px; width: 100%; text-align: center;}
.feedback-section p { font-weight: 700; color: #6B7C93; margin-bottom: 10px; font-size: 0.85rem; }
.stars-rating { font-size: 2rem; color: #E2E8F0; margin-bottom: 15px; cursor: pointer; display: flex; justify-content: center; gap: 8px;}
.stars-rating span.active { color: #FFB800; }

.difficulty-buttons { display: flex; gap: 10px; justify-content: center; width: 100%;}
.difficulty-buttons button { padding: 10px 15px; border: 2px solid #E2E8F0; background: white; border-radius: 20px; cursor: pointer; font-weight: 700; color: #6B7C93; transition: 0.2s; font-size: 0.85rem; flex: 1;}
.difficulty-buttons button.active { border-color: #FFB800; background: #FFF9E6; color: #FFB800; }

/* BOUTON ENREGISTRER / REESSAYER */
.btn-retry-score { width: 100%; padding: 16px; border: 2px solid #00B8D9; border-radius: 50px; background-color: transparent; color: #00B8D9; font-size: 1rem; font-weight: 900; cursor: pointer; transition: 0.2s; }
.btn-retry-score:hover { background-color: #EAF7F9; }

.btn-save-score { width: 100%; padding: 16px; border: none; border-radius: 50px; background-color: #00B8D9; color: white; font-size: 1rem; font-weight: 900; cursor: pointer; transition: 0.2s;}
.btn-save-score:hover:not(:disabled) { background-color: #0284C7; transform: translateY(-2px);}
.btn-save-score:disabled { opacity: 0.7; cursor: not-allowed; }
</style>