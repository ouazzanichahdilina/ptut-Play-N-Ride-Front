<template>
  <div class="game-container">
    <div class="game-header">
      <button class="back-btn" @click="quitGame">← Quitter l'exercice</button>
      <h2>Séance en cours : {{ gameTheme }} ({{ equipment }})</h2>
<<<<<<< HEAD
      <button class="btn-toggle-players" @click="showLivePlayers = !showLivePlayers">
        👥 Joueurs en ligne ({{ livePlayers.length }})
      </button>
    </div>
    
    <div class="game-layout">
      <div class="game-wrapper">
        <canvas id="game" width="300" height="500"></canvas>
        <p id="description" class="game-description">Pédalez fort pour commencer !</p>
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
=======
    </div>
    
    <div class="game-wrapper">
      <canvas id="game" width="300" height="500"></canvas>
      <p id="description" class="game-description">Pédalez fort pour commencer !</p>
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
    </div>

    <div class="modal-overlay" :class="{ active: showEndScreen }">
      <div class="end-modal">
        <div class="modal-header-end">
          <span class="trophy-icon">🏆</span>
          <h3>Session Terminée !</h3>
        </div>
        
        <p class="bravo-text">Bravo ! 🎉</p>
<<<<<<< HEAD

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
          Votre position : <strong>#{{ myRank }}</strong> sur {{ sortedLeaderboard.length }} avec {{ finalScore * 10 }} pts
=======
        
        <div class="score-card">
          <p>SCORE FINAL</p>
          <h2>{{ finalScore * 10 }} pts</h2>
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
        </div>

        <div class="stats-row">
          <div class="stat-box">
            <span>Scénario</span>
            <strong>{{ gameTheme }}</strong>
          </div>
          <div class="stat-box">
            <span>Durée</span>
            <strong>{{ sessionDuration }}</strong>
          </div>
        </div>

        <div class="feedback-section">
          <p>Notez cette session :</p>
          <div class="stars-rating">
            <span v-for="n in 5" :key="n" @click="rating = n" :class="{ active: n <= rating }">★</span>
          </div>

          <p>Comment c'était ?</p>
          <div class="difficulty-buttons">
            <button :class="{ active: difficulty === 'Facile' }" @click="difficulty = 'Facile'">😁 Facile</button>
            <button :class="{ active: difficulty === 'Moyen' }" @click="difficulty = 'Moyen'">😐 Moyen</button>
            <button :class="{ active: difficulty === 'Dur' }" @click="difficulty = 'Dur'">🥵 Dur</button>
          </div>
        </div>

        <button class="btn-save-score" @click="saveAndReturn" :disabled="saving">
          {{ saving ? 'Enregistrement...' : 'ENREGISTRER' }}
        </button>

        <transition name="fade">
          <div v-if="saveMessage" class="save-confirmation" :class="saveMessageType">
            {{ saveMessage }}
          </div>
        </transition>
<<<<<<< HEAD

=======
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      </div>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
=======
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { API_URL } from '../config.js'
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

const route = useRoute()
const router = useRouter()

<<<<<<< HEAD
const playerAvatarId = route.query.avatar || 'avatar1' 
const gameTheme = route.query.theme || 'Classique'
const equipment = route.query.equip || 'Vélo'
const isGuest = route.query.from === 'guest'
=======
const playerAvatarId = route.query.avatar || 'avatar1'
const gameTheme = route.query.theme || 'Classique'
const equipment = route.query.equip || 'Vélo'
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

const isGameOver = ref(false)
const showEndScreen = ref(false)
const finalScore = ref(0)
<<<<<<< HEAD
const sessionDuration = ref("0m 30s") 
=======
const sessionDuration = ref("--")
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
const rating = ref(3)
const difficulty = ref('Moyen')
const saving = ref(false)
const saveMessage = ref('')
const saveMessageType = ref('success')
<<<<<<< HEAD
const showLivePlayers = ref(false)

let sessionStartTime = null
let sessionEndTime = null
let gameLoopInterval = null
let handleInput = null

// --- DONNÉES SIMULÉES POUR LES JOUEURS EN LIGNE ---
const livePlayers = ref([
  { name: 'Marc L.', score: 850, isMe: false },
  { name: 'Sophie D.', score: 520, isMe: false },
  { name: 'Invité_842', score: 310, isMe: false },
  { name: 'Invité_911', score: 120, isMe: false },
  { name: isGuest ? 'Vous (Invité)' : 'Vous', score: 0, isMe: true }
])

const sortedLeaderboard = computed(() => {
  return [...livePlayers.value].sort((a, b) => b.score - a.score)
})

const myRank = computed(() => {
  return sortedLeaderboard.value.findIndex(p => p.isMe) + 1
})

=======

let sessionStartTime = null
let sessionEndTime = null

let gameLoopInterval = null
let handleInput = null

>>>>>>> fff9410c343426545d481c42704bf636c74d358c
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
    'Nature':   { bg: '/images/bg-nature.png',   obs: '/images/obs-nature.png',   sky: '#F0E68C' },
    'Forêt':    { bg: '/images/bg-foret.png',    obs: '/images/obs-foret.png',    sky: '#8FBC8F' },
    'Plage':    { bg: '/images/bg-plage.png',    obs: '/images/obs-plage.png',    sky: '#00BFFF' },
    'Jardin':   { bg: '/images/bg-jardin.png',   obs: '/images/obs-jardin.png',   sky: '#FFB6C1' },
    'Montagne': { bg: '/images/bg-montagne.png', obs: '/images/obs-montagne.png', sky: '#D2B48C' },
    'Ciel':     { bg: '/images/bg-ciel.png',     obs: '/images/obs-ciel.png',     sky: '#9370DB' },
    'Classique':{ bg: '/images/og-theme.png',    obs: '/images/og-theme-2.png',   sky: '#00bbc4' }
  }

<<<<<<< HEAD
  // --- CONFIGURATION DE LA DIFFICULTÉ DYNAMIQUE SELON LE SCÉNARIO ---
  // freq = vitesse d'apparition (plus bas = plus d'obstacles)
  // gap = espace pour passer (plus bas = plus dur)
  // speed = vitesse de défilement
  const difficultyConfig = {
    'Nature':   { gap: 120, freq: 150, speed: 1.5 }, 
    'Forêt':    { gap: 90,  freq: 100, speed: 2.0 }, 
    'Plage':    { gap: 130, freq: 180, speed: 1.5 }, 
    'Jardin':   { gap: 100, freq: 90,  speed: 1.5 }, 
    'Montagne': { gap: 75,  freq: 80,  speed: 2.5 }, 
    'Ciel':     { gap: 110, freq: 130, speed: 1.5 }, 
    'Classique':{ gap: 85,  freq: 100, speed: 2.0 }  
  }

  const currentThemeAssets = themeAssets[gameTheme] || themeAssets['Classique'];
  const currentConfig = difficultyConfig[gameTheme] || difficultyConfig['Classique'];
=======
  const currentThemeAssets = themeAssets[gameTheme] || themeAssets['Classique'];
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
  let skyColor = currentThemeAssets.sky;

  let customBg = new Image(); 
  customBg.src = currentThemeAssets.bg;
  
  let customBgLoaded = false;
  customBg.onload = () => { customBgLoaded = true; };
<<<<<<< HEAD
  customBg.onerror = () => { customBgLoaded = false; };
=======
  customBg.onerror = () => { customBgLoaded = false; }; // Fallback si l'image n'existe pas
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

  let customObs = new Image(); 
  customObs.src = currentThemeAssets.obs;

  let frame = 0; let degree = Math.PI/180
  
  const SFX_SCORE = new Audio(); const SFX_FLAP = new Audio(); const SFX_COLLISION = new Audio(); const SFX_FALL = new Audio(); const SFX_SWOOSH = new Audio() 
  SFX_SCORE.src = '/audio/sfx_point.wav'; SFX_FLAP.src = '/audio/sfx_wing.wav'; SFX_COLLISION.src = '/audio/sfx_hit.wav'; SFX_FALL.src = '/audio/sfx_die.wav'; SFX_SWOOSH.src = '/audio/sfx_swooshing.wav'

  let gameState = { current: 0, getReady: 0, play: 1, gameOver: 2 }

  let bg = { 
<<<<<<< HEAD
    dx: currentConfig.speed * 0.1, x: 0, classicImgX: 0, classicImgY: 0, classicWidth: 276, classicHeight: 228,
    render: function() { 
      if (customBgLoaded && customBg.naturalWidth > 0) {
        let drawY = 0; let drawH = cvs.height; let repeatW = cvs.width;
        ctx.drawImage(customBg, this.x, drawY, repeatW, drawH); 
        ctx.drawImage(customBg, this.x + repeatW, drawY, repeatW, drawH); 
        ctx.drawImage(customBg, this.x + repeatW * 2, drawY, repeatW, drawH);
      } 
=======
    dx: .2, x: 0, classicImgX: 0, classicImgY: 0, classicWidth: 276, classicHeight: 228,
    render: function() { 
      // Utilisation du flag de chargement sécurisé
      if (customBgLoaded && customBg.naturalWidth > 0) {
        let drawY = 0;
        let drawH = cvs.height; 
        // On répète l'image sur toute la largeur du canvas
        let repeatW = cvs.width;
        
        ctx.drawImage(customBg, this.x, drawY, repeatW, drawH); 
        ctx.drawImage(customBg, this.x + repeatW, drawY, repeatW, drawH); 
        // Troisième dessin pour éviter les trous lors du défilement
        ctx.drawImage(customBg, this.x + repeatW * 2, drawY, repeatW, drawH);
      } 
      // Fallback sur le thème classique si l'image custom échoue
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      else if (spriteUI.complete && spriteUI.naturalWidth > 0) { 
        let classicDrawY = cvs.height - this.classicHeight;
        ctx.drawImage(spriteUI, this.classicImgX, this.classicImgY, this.classicWidth, this.classicHeight, this.classicX, classicDrawY, this.classicWidth, this.classicHeight); 
        ctx.drawImage(spriteUI, this.classicImgX, this.classicImgY, this.classicWidth, this.classicHeight, this.classicX + this.classicWidth, classicDrawY, this.classicWidth, this.classicHeight); 
      } 
    }, 
    position: function () { 
      let repeatWidth = (customBgLoaded && customBg.naturalWidth > 0) ? cvs.width : this.classicWidth;
<<<<<<< HEAD
      if (gameState.current == gameState.getReady) { this.classicX = 0; this.x = 0; } 
=======
      
      if (gameState.current == gameState.getReady) { 
        this.classicX = 0; 
        this.x = 0; 
      } 
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      if (gameState.current == gameState.play) { 
        this.x = (this.x - this.dx) % repeatWidth;
        this.classicX = (this.classicX - this.dx) % this.classicWidth;
      } 
    },
    classicX: 0
  }

  let pipes = { 
    top: { imgX: 56, imgY: 323 }, bot: { imgX: 84, imgY:323 }, 
<<<<<<< HEAD
    width: 26, height: 160, w: 55, h: 300, 
    gap: currentConfig.gap, // Applique l'écartement dynamique
    dx: currentConfig.speed, // Applique la vitesse dynamique
    minY: -260, maxY: -40, pipeGenerator: [], 
=======
    width: 26, height: 160, w: 55, h: 300, gap: 85, dx: 2, minY: -260, maxY: -40, pipeGenerator: [], 
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
    reset: function() { this.pipeGenerator = [] }, 
    render: function() { 
      for (let i = 0; i < this.pipeGenerator.length; i++) { 
        let pipe = this.pipeGenerator[i]; 
        let topPipe = pipe.y; 
        let bottomPipe = pipe.y + this.gap + this.h; 
        
        if (customObs.complete && customObs.naturalWidth > 0) {
<<<<<<< HEAD
          ctx.save(); ctx.translate(pipe.x + this.w/2, topPipe + this.h/2); ctx.scale(1, -1); ctx.drawImage(customObs, -this.w/2, -this.h/2, this.w, this.h); ctx.restore(); ctx.drawImage(customObs, pipe.x, bottomPipe, this.w, this.h);
=======
          ctx.save();
          ctx.translate(pipe.x + this.w/2, topPipe + this.h/2);
          ctx.scale(1, -1);
          ctx.drawImage(customObs, -this.w/2, -this.h/2, this.w, this.h);
          ctx.restore();
          ctx.drawImage(customObs, pipe.x, bottomPipe, this.w, this.h);
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
        } 
        else if(spriteNumbers.complete && spriteNumbers.naturalWidth > 0) {
          ctx.drawImage(spriteNumbers, this.top.imgX,this.top.imgY,this.width,this.height, pipe.x,topPipe,this.w,this.h); 
          ctx.drawImage(spriteNumbers, this.bot.imgX,this.bot.imgY,this.width,this.height, pipe.x,bottomPipe,this.w,this.h) 
        }
      } 
    }, 
    position: function() { 
      if (gameState.current !== gameState.play) return; 
<<<<<<< HEAD
      
      // Fréquence d'apparition dynamique
      if (frame % currentConfig.freq == 0) { 
        this.pipeGenerator.push({ x: cvs.width, y: Math.floor((Math.random() * (this.maxY-this.minY+1)) + this.minY) }) 
      }; 
      
=======
      if (frame%100 == 0) { this.pipeGenerator.push({ x: cvs.width, y: Math.floor((Math.random() * (this.maxY-this.minY+1)) + this.minY) }) }; 
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      for (let i = 0; i < this.pipeGenerator.length; i++) { 
        let pg = this.pipeGenerator[i]; 
        let b = { left: bird.x - bird.r, right: bird.x + bird.r, top: bird.y - bird.r, bottom: bird.y + bird.r }; 
        let p = { top: { top: pg.y, bottom: pg.y + this.h }, bot: { top: pg.y + this.h + this.gap, bottom: pg.y + this.h*2 + this.gap }, left: pg.x, right: pg.x + this.w }; 
        pg.x -= this.dx; 
<<<<<<< HEAD
        
=======
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
        if(pg.x < -this.w) { this.pipeGenerator.shift(); score.current++; SFX_SCORE.play().catch(()=>{}) }; 
        if (b.left < p.right && b.right > p.left && b.top < p.top.bottom && b.bottom > p.top.top) { gameState.current = gameState.gameOver; SFX_COLLISION.play().catch(()=>{}) }; 
        if (b.left < p.right && b.right > p.left && b.top < p.bot.bottom && b.bottom > p.bot.top) { gameState.current = gameState.gameOver; SFX_COLLISION.play().catch(()=>{}) } 
      } 
    } 
  }

<<<<<<< HEAD
  let ground = { imgX: 276, imgY: 0, width: 224, height: 112, x: 0, y:cvs.height - 112, w:224, h:112, dx: currentConfig.speed, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0){ ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h); ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x + this.width,this.y,this.w,this.h) } }, position: function() { if (gameState.current == gameState.getReady) { this.x = 0 }; if (gameState.current == gameState.play) { this.x = (this.x-this.dx) % (this.w/2) } } }
=======
  let ground = { imgX: 276, imgY: 0, width: 224, height: 112, x: 0, y:cvs.height - 112, w:224, h:112, dx: 2, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0){ ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h); ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x + this.width,this.y,this.w,this.h) } }, position: function() { if (gameState.current == gameState.getReady) { this.x = 0 }; if (gameState.current == gameState.play) { this.x = (this.x-this.dx) % (this.w/2) } } }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
  
  let map = [ { imgX: 496, imgY: 60, width: 12, height: 18 }, { imgX: 135, imgY: 455, width: 10, height: 18 }, { imgX: 292, imgY: 160, width: 12, height: 18 }, { imgX: 306, imgY: 160, width: 12, height: 18 }, { imgX: 320, imgY: 160, width: 12, height: 18 }, { imgX: 334, imgY: 160, width: 12, height: 18 }, { imgX: 292, imgY: 184, width: 12, height: 18 }, { imgX: 306, imgY: 184, width: 12, height: 18 }, { imgX: 320, imgY: 184, width: 12, height: 18 }, { imgX: 334, imgY: 184, width: 12, height: 18 } ]
  let score = { current: 0, x: cvs.width/2, y: 40, w: 15, h: 25, reset: function() { this.current = 0 }, render: function() { if(!spriteNumbers.complete || spriteNumbers.naturalWidth === 0) return; if (gameState.current == gameState.play || gameState.current == gameState.gameOver) { let string = this.current.toString(); let ones = string.charAt(string.length-1); let tens = string.charAt(string.length-2); if (this.current >= 10) { ctx.drawImage(spriteNumbers, map[ones].imgX,map[ones].imgY,map[ones].width,map[ones].height, ( (this.x-this.w/2) + (this.w/2) + 3 ),this.y,this.w,this.h); ctx.drawImage(spriteNumbers, map[tens].imgX,map[tens].imgY,map[tens].width,map[tens].height, ( (this.x-this.w/2) - (this.w/2) - 3 ),this.y,this.w,this.h) } else { ctx.drawImage(spriteNumbers, map[ones].imgX,map[ones].imgY,map[ones].width,map[ones].height, ( this.x-this.w/2 ),this.y,this.w,this.h) } } } }

  let bird = {
      width: 30, height: 30, x: 50, y: 160, w: 30, h: 30, r: 10, fly: 5.25, gravity: .32, velocity: 0, rotation: 0,
      render: function() {
<<<<<<< HEAD
          ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
          if (imgAvatar.complete && imgAvatar.naturalWidth > 0) { ctx.drawImage(imgAvatar, -this.w/2, -this.h/2, this.w, this.h); } 
          else { ctx.fillStyle = "#FFB800"; ctx.beginPath(); ctx.arc(0, 0, this.r, 0, Math.PI * 2); ctx.fill(); }
=======
          ctx.save(); 
          ctx.translate(this.x, this.y); 
          ctx.rotate(this.rotation);
          
          if (imgAvatar.complete && imgAvatar.naturalWidth > 0) {
              ctx.drawImage(imgAvatar, -this.w/2, -this.h/2, this.w, this.h);
          } else {
              ctx.fillStyle = "#FFB800";
              ctx.beginPath();
              ctx.arc(0, 0, this.r, 0, Math.PI * 2);
              ctx.fill();
          }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
          ctx.restore();
      },
      flap: function() { this.velocity = - this.fly },
      position: function() {
          if (gameState.current == gameState.getReady) { this.y = 160; this.rotation = 0 * degree } else {
              this.velocity += this.gravity; this.y += this.velocity
              if (this.velocity <= this.fly) { this.rotation = -15 * degree } else if (this.velocity >= this.fly+2) { this.rotation = 70 * degree; } else { this.rotation = 0 }
              if (this.y+this.h/2 >= cvs.height-ground.h) { this.y = cvs.height-ground.h - this.h/2; if (gameState.current == gameState.play) { gameState.current = gameState.gameOver; SFX_FALL.play().catch(()=>{}) } }
              if (this.y-this.h/2 <= 0) { this.y = this.r }
          }
      }
  }

  let getReady = { imgX: 0, imgY: 228, width: 174, height: 160, x: cvs.width/2 - 174/2, y: cvs.height/2 - 160, w: 174, h: 160, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0 && gameState.current == gameState.getReady) { ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h) } } }
<<<<<<< HEAD
  let gameOver = { render: function() { if(gameState.current == gameState.gameOver) { description.style.visibility = "visible"; description.innerHTML = "Oups ! Pédalez pour recommencer." } } }
=======
  
  let gameOver = { 
    render: function() { 
      if(gameState.current == gameState.gameOver) { 
        description.style.visibility = "visible"; 
        description.innerHTML = "Oups ! Pédalez pour recommencer." 
      } 
    } 
  }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

  let draw = () => {
      ctx.fillStyle = skyColor; ctx.fillRect(0,0, cvs.width,cvs.height)
      bg.render(); pipes.render(); ground.render(); score.render(); bird.render(); getReady.render(); gameOver.render()
  }

  let update = () => { bird.position(); bg.position(); pipes.position(); ground.position() }

  let loop = () => {
      draw(); update(); frame++
<<<<<<< HEAD
      
      if (gameState.current === gameState.play) {
        if (!sessionStartTime) sessionStartTime = Date.now()
        
        let me = livePlayers.value.find(p => p.isMe)
        if (me) me.score = score.current * 10;
        
        livePlayers.value.forEach(p => {
          if(!p.isMe && Math.random() < 0.01) p.score += 10;
        })
      }

=======
      if (gameState.current === gameState.play && !sessionStartTime) {
          sessionStartTime = Date.now()
      }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      if(gameState.current === gameState.gameOver) {
          if (!sessionEndTime) {
              sessionEndTime = Date.now()
              const elapsed = sessionStartTime ? Math.max(1, Math.round((sessionEndTime - sessionStartTime) / 60000)) : 1
              sessionDuration.value = elapsed + ' min'
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
      if (showEndScreen.value) return; 
<<<<<<< HEAD
      if (gameState.current == gameState.getReady) { gameState.current = gameState.play }
      if (gameState.current == gameState.play) { bird.flap(); SFX_FLAP.play().catch(()=>{}); description.style.visibility = "hidden" }
=======

      if (gameState.current == gameState.getReady) { gameState.current = gameState.play }
      if (gameState.current == gameState.play) { bird.flap(); SFX_FLAP.play().catch(()=>{}); description.style.visibility = "hidden" }
      
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
      if (gameState.current == gameState.gameOver) { pipes.reset(); score.reset(); SFX_SWOOSH.play().catch(()=>{}); gameState.current = gameState.getReady; description.innerHTML = "Pédalez fort pour commencer !"; sessionStartTime = null; sessionEndTime = null; sessionDuration.value = "--"; }
  }

  cvs.addEventListener('click', handleInput)
  window.addEventListener('keydown', handleInput)
})

const quitGame = () => { 
  const returnPath = route.query.from === 'guest' ? '/guest-dashboard' : '/patient-dashboard'
  router.push(returnPath) 
}

<<<<<<< HEAD
const saveAndReturn = () => {
  saving.value = true
  saveMessage.value = ''
  const returnPath = route.query.from === 'guest' ? '/guest-dashboard' : '/patient-dashboard'

  // SIMULATION LOCALE DE LA SAUVEGARDE
  setTimeout(() => {
    saveMessageType.value = 'success'
    saveMessage.value = 'Séance enregistrée avec succès !'
    
    setTimeout(() => {
      saving.value = false
      router.push({ 
        path: returnPath, 
        query: { finished: true, score: finalScore.value * 10, diff: difficulty.value } 
      })
    }, 1000)
  }, 800)
=======
const saveAndReturn = async () => {
  const returnPath = route.query.from === 'guest' ? '/guest-dashboard' : '/patient-dashboard'
  const token = localStorage.getItem('token')
  const patientId = parseInt(localStorage.getItem('id'))

  const now = sessionEndTime ? new Date(sessionEndTime) : new Date()
  const duree = sessionStartTime ? Math.max(1, Math.round((now - sessionStartTime) / 60000)) : 1
  const debut = sessionStartTime ? new Date(sessionStartTime) : new Date(now.getTime() - duree * 60000)

  const body = {
    dateDebut: debut.toISOString(),
    dateFin: now.toISOString(),
    dureeMinutes: duree,
    mode: token && patientId ? 'libre' : 'anonyme'
  }

  if (token && patientId) {
    body.patient = { id: patientId }
  }

  saving.value = true
  saveMessage.value = ''

  try {
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${API_URL}/seances`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    })

    if (res.ok) {
      saveMessageType.value = 'success'
      saveMessage.value = 'Séance enregistrée avec succès !'
    } else {
      saveMessageType.value = 'error'
      saveMessage.value = 'Erreur lors de l\'enregistrement.'
    }
  } catch {
    saveMessageType.value = 'error'
    saveMessage.value = 'Impossible de joindre le serveur.'
  } finally {
    saving.value = false
  }

  setTimeout(() => {
    router.push({
      path: returnPath,
      query: { finished: true, score: finalScore.value * 10, diff: difficulty.value }
    })
  }, 1500)
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
}

onUnmounted(() => {
  if (gameLoopInterval) clearInterval(gameLoopInterval)
  if (handleInput) window.removeEventListener('keydown', handleInput)
})
</script>

<style scoped>
<<<<<<< HEAD
.game-container { display: flex; flex-direction: column; align-items: center; min-height: 100vh; background-color: #0A192F; color: white; padding: 30px 20px; font-family: 'Nunito', sans-serif; transition: 0.3s;}
.game-header { width: 100%; max-width: 900px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.game-header h2 { color: #00B8D9; font-size: 1.5rem; font-weight: 900; text-align: center; margin: 0;}
.back-btn { background: transparent; border: 2px solid #6B7C93; color: white; padding: 10px 20px; border-radius: 50px; cursor: pointer; transition: 0.3s; font-weight: bold; align-self: flex-start; }
.back-btn:hover { background: white; color: #0A192F; }

.btn-toggle-players { background: #EAF7F9; color: #00B8D9; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-weight: bold; transition: 0.2s;}
.btn-toggle-players:hover { background: white; }

.game-layout {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  max-width: 900px;
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.game-wrapper { position: relative; border: 10px solid #1C2833; border-radius: 20px; background: #333; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; justify-content: center; width: 100%; max-width: 450px; overflow: hidden; z-index: 5;}
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; }
.game-description { position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; color: #1C2833; font-weight: 900; font-size: 1.1rem; background: rgba(255, 255, 255, 0.8); padding: 10px 0; }

/* PANNEAU LATÉRAL MULTIJOUEUR */
.live-players-sidebar {
  width: 280px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  padding: 20px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #1C2833;
}

@media (max-width: 800px) {
  .live-players-sidebar {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    transform: translateX(120%);
    z-index: 10;
  }
  .live-players-sidebar.is-open {
    transform: translateX(0);
  }
}

.sidebar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #E2E8F0; padding-bottom: 10px;}
.sidebar-header h3 { font-size: 1.1rem; color: #0A192F; margin: 0; font-weight: 900; display: flex; align-items: center; gap: 8px;}
.live-dot { width: 10px; height: 10px; background: #EF4444; border-radius: 50%; animation: pulse 1.5s infinite; }
.close-sidebar { background: none; border: none; font-size: 1.5rem; color: #6B7C93; cursor: pointer;}
.close-sidebar:hover { color: #00B8D9;}

.players-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;}
.players-list li { display: flex; align-items: center; gap: 10px; position: relative;}
.player-avatar { width: 35px; height: 35px; background: #F8FAFC; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #0A192F; border: 1px solid #E2E8F0;}
.player-info { display: flex; flex-direction: column; line-height: 1.2;}
.player-name { font-size: 0.9rem; font-weight: 700; color: #1C2833;}
.player-score { font-size: 0.8rem; color: #20C997; font-weight: 900;}

.players-list li.is-me .player-avatar { background: #00B8D9; color: white; border-color: #00B8D9;}
.players-list li.is-me .player-name { color: #00B8D9; font-weight: 900;}
.you-badge { position: absolute; right: 0; background: #00B8D9; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; font-weight: bold; text-transform: uppercase;}

@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

/* MODALE DE FIN ET PODIUM */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.9); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.end-modal { background: white; width: 100%; max-width: 450px; border-radius: 24px; border: 1px solid #E2E8F0; padding: 30px; text-align: center; color: #1C2833; transform: translateY(30px); transition: 0.3s; box-shadow: 0 25px 50px rgba(0,0,0,0.5); max-height: 90vh; overflow-y: auto;}
.modal-overlay.active .end-modal { transform: translateY(0); }

.modal-header-end { display: flex; flex-direction: column; align-items: center; margin-bottom: 5px; }
.trophy-icon { font-size: 3rem; margin-bottom: 5px; }
.modal-header-end h3 { font-size: 1.5rem; color: #6B7C93; margin: 0;}
.bravo-text { font-weight: 800; font-size: 1.2rem; margin-bottom: 15px; color: #0A192F;}

/* LE PODIUM */
.podium-container { 
  display: flex; 
  align-items: flex-end; 
  justify-content: center; 
  gap: 8px; 
  height: 120px; 
  margin-bottom: 20px; 
  border-bottom: 2px solid #E2E8F0; 
  padding-bottom: 10px;
}
.podium-place { display: flex; flex-direction: column; align-items: center; width: 30%; position: relative; }
.medal { font-size: 1.8rem; margin-bottom: -10px; z-index: 2; line-height: 1;}
.place-1 .medal { font-size: 2.2rem; margin-bottom: -15px; }

.podium-bar { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 8px; border-top-left-radius: 8px; border-top-right-radius: 8px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); }
.silver { height: 60px; background: linear-gradient(to top, #94A3B8, #E2E8F0); border: 1px solid #94A3B8; }
.gold { height: 90px; background: linear-gradient(to top, #F59E0B, #FDE68A); border: 1px solid #D97706; }
.bronze { height: 40px; background: linear-gradient(to top, #B45309, #FDE047); border: 1px solid #92400E; }

.p-name { font-size: 0.7rem; font-weight: 800; color: #0A192F; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 95%; margin-bottom: 2px;}
.p-score { font-size: 0.8rem; font-weight: 900; color: #0A192F; }

.my-rank-info { background: #EAF7F9; padding: 10px; border-radius: 10px; margin-bottom: 20px; font-size: 0.95rem; color: #1C2833; border: 1px solid #00B8D9;}
.my-rank-info strong { color: #00B8D9; font-size: 1.1rem; }

.score-card { background: linear-gradient(135deg, #20C997 0%, #00B8D9 100%); color: white; padding: 15px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 5px 15px rgba(0, 184, 217, 0.3); }
.score-card p { font-size: 0.8rem; opacity: 0.9; margin-bottom: 0px; font-weight: bold;}
.score-card h2 { font-size: 2.5rem; font-weight: 900; line-height: 1; color: white; margin: 0;}

.stats-row { display: flex; gap: 15px; margin-bottom: 20px; }
.stat-box { flex: 1; background: #F8FAFC; padding: 10px; border-radius: 12px; display: flex; flex-direction: column; border: 1px solid #E2E8F0;}
.stat-box span { font-size: 0.75rem; color: #6B7C93; margin-bottom: 2px; }
.stat-box strong { font-size: 1rem; color: #0A192F; }

.feedback-section p { font-weight: 700; color: #6B7C93; margin-bottom: 5px; font-size: 0.85rem; }
.stars-rating { font-size: 2rem; color: #E2E8F0; margin-bottom: 15px; cursor: pointer; display: flex; justify-content: center; gap: 5px;}
.stars-rating span.active { color: #FFB800; }

.difficulty-buttons { display: flex; gap: 10px; margin-bottom: 25px; }
.difficulty-buttons button { flex: 1; padding: 10px 5px; border: 2px solid #E2E8F0; background: white; border-radius: 12px; cursor: pointer; font-weight: 700; color: #6B7C93; transition: 0.2s; font-size: 0.85rem;}
=======
.game-container { display: flex; flex-direction: column; align-items: center; min-height: 100vh; background-color: #0A192F; color: white; padding: 30px 20px; font-family: 'Nunito', sans-serif; }
.game-header { width: 100%; max-width: 600px; display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 20px; }
.game-header h2 { color: #00B8D9; font-size: 1.5rem; font-weight: 800; text-align: center;}
.back-btn { background: transparent; border: 2px solid #6B7C93; color: white; padding: 10px 20px; border-radius: 50px; cursor: pointer; transition: 0.3s; font-weight: bold; align-self: flex-start; }
.back-btn:hover { background: white; color: #0A192F; }

.game-wrapper { position: relative; border: 10px solid #1C2833; border-radius: 20px; background: #333; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; justify-content: center; width: 100%; max-width: 450px; overflow: hidden; }
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; }
.game-description { position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; color: #1C2833; font-weight: 900; font-size: 1.1rem; background: rgba(255, 255, 255, 0.7); padding: 10px 0; }

/* CSS MODALE DE FIN (Maquette) */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.9); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.end-modal { background: white; width: 100%; max-width: 400px; border-radius: 24px; padding: 30px; text-align: center; color: #0A192F; transform: translateY(30px); transition: 0.3s; box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
.modal-overlay.active .end-modal { transform: translateY(0); }

.modal-header-end { display: flex; flex-direction: column; align-items: center; margin-bottom: 10px; }
.trophy-icon { font-size: 3rem; margin-bottom: 10px; }
.modal-header-end h3 { font-size: 1.5rem; color: #6B7C93; }
.bravo-text { font-weight: 800; font-size: 1.2rem; margin-bottom: 20px; }

.score-card { background: linear-gradient(135deg, #20C997 0%, #00B8D9 100%); color: white; padding: 20px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0, 184, 217, 0.3); }
.score-card p { font-size: 0.9rem; opacity: 0.9; margin-bottom: 5px; }
.score-card h2 { font-size: 3rem; font-weight: 900; line-height: 1; }

.stats-row { display: flex; gap: 15px; margin-bottom: 25px; }
.stat-box { flex: 1; background: #F1F5F9; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; }
.stat-box span { font-size: 0.8rem; color: #6B7C93; margin-bottom: 5px; }
.stat-box strong { font-size: 1.1rem; color: #0A192F; }

.feedback-section p { font-weight: 700; color: #6B7C93; margin-bottom: 10px; font-size: 0.9rem; }
.stars-rating { font-size: 2.5rem; color: #E2E8F0; margin-bottom: 20px; cursor: pointer; display: flex; justify-content: center; gap: 5px;}
.stars-rating span.active { color: #FFB800; }

.difficulty-buttons { display: flex; gap: 10px; margin-bottom: 30px; }
.difficulty-buttons button { flex: 1; padding: 12px 5px; border: 2px solid #E2E8F0; background: white; border-radius: 12px; cursor: pointer; font-weight: 700; color: #6B7C93; transition: 0.2s; }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c
.difficulty-buttons button.active { border-color: #FFB800; background: #FFF9E6; color: #FFB800; }

.btn-save-score { width: 100%; padding: 16px; border: none; border-radius: 50px; background-color: #00B8D9; color: white; font-size: 1.1rem; font-weight: 800; cursor: pointer; box-shadow: 0 10px 20px rgba(0, 184, 217, 0.3); transition: 0.2s; }
.btn-save-score:hover:not(:disabled) { transform: translateY(-2px); }
.btn-save-score:disabled { opacity: 0.7; cursor: not-allowed; }

.save-confirmation { margin-top: 15px; padding: 12px 20px; border-radius: 12px; font-weight: 700; font-size: 0.95rem; text-align: center; }
<<<<<<< HEAD
.save-confirmation.success { background: #E8F8F5; color: #20C997; border: 1px solid #20C997;}
=======
.save-confirmation.success { background: #E8F8F5; color: #20C997; }
.save-confirmation.error { background: #FFF5F5; color: #FC8181; }
>>>>>>> fff9410c343426545d481c42704bf636c74d358c

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>