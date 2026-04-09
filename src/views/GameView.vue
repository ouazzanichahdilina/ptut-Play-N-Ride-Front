<template>
  <div class="game-container">
    <div class="game-header">
      <button class="back-btn" @click="quitGame">← Quitter l'exercice</button>
      <h2>{{ gameTheme }} | <span class="timer-text">{{ timeRemainingText }}</span></h2>
      <button class="btn-toggle-players" @click="showLivePlayers = !showLivePlayers">
        👥 Joueurs en ligne ({{ livePlayers.length }})
      </button>
    </div>
    
    <div class="game-layout">
      <div class="game-wrapper">
        <canvas id="game" width="300" height="500"></canvas>
        <p id="description" class="game-description">Pédalez fort pour commencer !</p>
        <div v-if="hasWon" class="victory-banner">🎉 SÉANCE TERMINÉE ! 🎉</div>
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
      <div class="end-modal">
        <div class="modal-header-end">
          <span class="trophy-icon">🏆</span>
          <h3>Session Terminée !</h3>
        </div>
        
        <p class="bravo-text">Bravo ! 🎉</p>

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
          Votre position : #{{ myRank }} sur {{ sortedLeaderboard.length }} — Score : {{ finalScore * 10 }} pts
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

// Variables pour le formulaire de fin
const rating = ref(3)
const difficulty = ref('Moyen')
const saving = ref(false)
const showLivePlayers = ref(false)

const effortData = ref([])

let sessionStartTime = null
let sessionEndTime = null
let gameLoopInterval = null
let handleInput = null

// --- MAPPING SÉCURISÉ DU NOM DU THÈME ---
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

  let activeConfig = protocolesCliniquesJSON[safeKey] || protocolesCliniquesJSON["L'Aube Douce"]; 
  let currentThemeAssets = themeAssets[safeKey] || themeAssets["L'Aube Douce"];

  const sequenceObstacles = activeConfig.obstaclesManager.split(' ');
  const sequenceDistances = activeConfig.distanceManager.split(' ').map(Number);
  const jsonSpeed = activeConfig.vitesseDefilement;
  const dureeTotaleSecondes = activeConfig.dureeMinutes * 60; 

  timeRemainingText.value = `Cible : ${activeConfig.dureeMinutes} min`;

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
    }
  }

  let pipes = { 
    top: { imgX: 56, imgY: 323 }, bot: { imgX: 84, imgY: 323 }, imgW: 26, imgH: 160,          
    w: 55, dx: jsonSpeed, 
    obsSequence: sequenceObstacles, distSequence: sequenceDistances,
    currentObsIndex: 0, distanceCounter: 0, pipeArray: [], 
    reset: function() { this.pipeArray = []; this.currentObsIndex = 0; this.distanceCounter = 0; hasWon.value = false; }, 
    render: function() { 
      for (let i = 0; i < this.pipeArray.length; i++) { 
        let p = this.pipeArray[i]; 
        if (spriteNumbers.complete && spriteNumbers.naturalWidth > 0) {
          if (p.isTop) ctx.drawImage(spriteNumbers, this.top.imgX, this.top.imgY, this.imgW, this.imgH, p.x, p.y, this.w, p.h);
          else ctx.drawImage(spriteNumbers, this.bot.imgX, this.bot.imgY, this.imgW, this.imgH, p.x, p.y, this.w, p.h);
        }
      } 
    }, 
    position: function() { 
      if (gameState.current !== gameState.play) return; 
      if (hasWon.value) return;

      this.distanceCounter += this.dx;

      if (this.currentObsIndex < this.distSequence.length && this.distanceCounter >= this.distSequence[this.currentObsIndex] * 10) {
        let typeObs = this.obsSequence[this.currentObsIndex];
        let spawnY = 0; let obsHeight = 150; let isTop = false;

        if (typeObs === 'x1') { isTop = true; spawnY = 0; obsHeight = 160; } 
        if (typeObs === 'x2') { isTop = true; spawnY = 0; obsHeight = 240; } 
        if (typeObs === 'y1') { isTop = false; obsHeight = 160; spawnY = 388 - obsHeight; } 
        if (typeObs === 'y2') { isTop = false; obsHeight = 240; spawnY = 388 - obsHeight; } 

        if (typeObs !== 'z') {
           this.pipeArray.push({ x: cvs.width, y: spawnY, h: obsHeight, isTop: isTop, passed: false });
        }
        
        this.distanceCounter = 0;
        this.currentObsIndex = (this.currentObsIndex + 1) % this.obsSequence.length;
        if (this.obsSequence[this.currentObsIndex] === 'z') this.currentObsIndex = 0; 
      }

      for (let i = 0; i < this.pipeArray.length; i++) { 
        let p = this.pipeArray[i]; 
        let bBox = { left: bird.x - bird.r + 8, right: bird.x + bird.r - 8, top: bird.y - bird.r + 8, bottom: bird.y + bird.r - 8 }; 
        let pBox = { left: p.x + 5, right: p.x + this.w - 5, top: p.y, bottom: p.y + p.h }; 
        p.x -= this.dx; 
        
        if(p.x + this.w < bird.x && !p.passed) { score.current++; p.passed = true; SFX_SCORE.play().catch(()=>{}); }; 
        if(p.x + this.w < 0) { this.pipeArray.shift(); i--; continue; }
        if (!hasWon.value && bBox.left < pBox.right && bBox.right > pBox.left && bBox.top < pBox.bottom && bBox.bottom > pBox.top) { 
          gameState.current = gameState.gameOver; SFX_COLLISION.play().catch(()=>{});
        } 
      } 
    } 
  }

  let ground = { imgX: 276, imgY: 0, width: 224, height: 112, x: 0, y:cvs.height - 112, w:224, h:112, dx: jsonSpeed, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0){ ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h); ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x + this.width,this.y,this.w,this.h) } }, position: function() { if (gameState.current == gameState.getReady) { this.x = 0 }; if (gameState.current == gameState.play) { this.x = (this.x-this.dx) % (this.w/2) } } }
  
  let map = [ { imgX: 496, imgY: 60, width: 12, height: 18 }, { imgX: 135, imgY: 455, width: 10, height: 18 }, { imgX: 292, imgY: 160, width: 12, height: 18 }, { imgX: 306, imgY: 160, width: 12, height: 18 }, { imgX: 320, imgY: 160, width: 12, height: 18 }, { imgX: 334, imgY: 160, width: 12, height: 18 }, { imgX: 292, imgY: 184, width: 12, height: 18 }, { imgX: 306, imgY: 184, width: 12, height: 18 }, { imgX: 320, imgY: 184, width: 12, height: 18 }, { imgX: 334, imgY: 184, width: 12, height: 18 } ]
  let score = { current: 0, x: cvs.width/2, y: 40, w: 15, h: 25, reset: function() { this.current = 0 }, render: function() { if(!spriteNumbers.complete || spriteNumbers.naturalWidth === 0) return; if (gameState.current == gameState.play || gameState.current == gameState.gameOver) { let string = this.current.toString(); let ones = string.charAt(string.length-1); let tens = string.charAt(string.length-2); if (this.current >= 10) { ctx.drawImage(spriteNumbers, map[ones].imgX,map[ones].imgY,map[ones].width,map[ones].height, ( (this.x-this.w/2) + (this.w/2) + 3 ),this.y,this.w,this.h); ctx.drawImage(spriteNumbers, map[tens].imgX,map[tens].imgY,map[tens].width,map[tens].height, ( (this.x-this.w/2) - (this.w/2) - 3 ),this.y,this.w,this.h) } else { ctx.drawImage(spriteNumbers, map[ones].imgX,map[ones].imgY,map[ones].width,map[ones].height, ( this.x-this.w/2 ),this.y,this.w,this.h) } } } }

  let bird = {
      width: 30, height: 30, x: 50, y: 160, w: 30, h: 30, r: 10, fly: 5.25, gravity: .32, velocity: 0, rotation: 0,
      render: function() {
          ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation);
          if (imgAvatar.complete && imgAvatar.naturalWidth > 0) { ctx.drawImage(imgAvatar, -this.w/2, -this.h/2, this.w, this.h); } 
          else { ctx.fillStyle = "#FFB800"; ctx.beginPath(); ctx.arc(0, 0, this.r, 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
      },
      flap: function() { this.velocity = - this.fly },
      position: function() {
          if (gameState.current == gameState.getReady) { this.y = 160; this.rotation = 0 * degree } else {
              if (hasWon.value) { this.velocity = 0; this.rotation = 0; }
              else { this.velocity += this.gravity; this.y += this.velocity; }
              
              if (this.velocity <= this.fly) { this.rotation = -15 * degree } else if (this.velocity >= this.fly+2) { this.rotation = 70 * degree; } else { this.rotation = 0 }
              if (this.y+this.h/2 >= cvs.height-ground.h) { this.y = cvs.height-ground.h - this.h/2; if (gameState.current == gameState.play) { gameState.current = gameState.gameOver; SFX_FALL.play().catch(()=>{}) } }
              if (this.y-this.h/2 <= 0) { this.y = this.r }
          }
      }
  }

  let getReady = { imgX: 0, imgY: 228, width: 174, height: 160, x: cvs.width/2 - 174/2, y: cvs.height/2 - 160, w: 174, h: 160, render: function() { if(spriteUI.complete && spriteUI.naturalWidth > 0 && gameState.current == gameState.getReady) { ctx.drawImage(spriteUI, this.imgX,this.imgY,this.width,this.height, this.x,this.y,this.w,this.h) } } }
  let gameOver = { render: function() { if(gameState.current == gameState.gameOver && !hasWon.value) { description.style.visibility = "visible"; description.innerHTML = "Oups ! Pédalez pour recommencer." } } }

  let draw = () => {
      ctx.fillStyle = skyColor; ctx.fillRect(0,0, cvs.width,cvs.height)
      bg.render(); pipes.render(); ground.render(); score.render(); bird.render(); getReady.render(); gameOver.render()
  }

  let update = () => { bird.position(); bg.position(); pipes.position(); ground.position() }

  let loop = () => {
      draw(); update(); frame++;
      
      if (gameState.current === gameState.play) {
        if (!sessionStartTime) sessionStartTime = Date.now();
        
        let elapsedSeconds = (Date.now() - sessionStartTime) / 1000;
        let remainingSeconds = Math.max(0, dureeTotaleSecondes - elapsedSeconds);
        
        let m = Math.floor(remainingSeconds / 60);
        let s = Math.floor(remainingSeconds % 60);
        timeRemainingText.value = `Reste : ${m}:${s < 10 ? '0' : ''}${s}`;

        if (elapsedSeconds >= dureeTotaleSecondes && !hasWon.value) {
           if (pipes.pipeArray.length === 0) {
             hasWon.value = true;
             setTimeout(() => { gameState.current = gameState.gameOver; }, 1500);
           }
        }

        if (frame % 30 === 0 && !hasWon.value) {
          effortData.value.push({ time: elapsedSeconds, y: bird.y });
        }

        let me = livePlayers.value.find(p => p.isMe)
        if (me) me.score = score.current * 10;
        livePlayers.value.forEach(p => { if(!p.isMe && Math.random() < 0.01) p.score += 10; })
      }

      if(gameState.current === gameState.gameOver) {
          if (!sessionEndTime) {
              sessionEndTime = Date.now()
              let elapsed = sessionStartTime ? Math.round((sessionEndTime - sessionStartTime) / 1000) : 0;
              let m = Math.floor(elapsed / 60);
              let s = Math.floor(elapsed % 60);
              // Rendu propre "1 min" ou "1 min 30s"
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
      if (showEndScreen.value) return; 
      if (gameState.current == gameState.getReady) { gameState.current = gameState.play }
      if (gameState.current == gameState.play) { bird.flap(); SFX_FLAP.play().catch(()=>{}); description.style.visibility = "hidden" }
      if (gameState.current == gameState.gameOver && !hasWon.value) { pipes.reset(); score.reset(); effortData.value = []; SFX_SWOOSH.play().catch(()=>{}); gameState.current = gameState.getReady; description.innerHTML = "Pédalez fort pour commencer !"; sessionStartTime = null; sessionEndTime = null; timeRemainingText.value = `Durée cible : ${activeConfig.dureeMinutes} min`; }
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
.timer-text { color: #20C997; font-weight: 900; margin-left: 10px; background: rgba(32, 201, 151, 0.1); padding: 4px 12px; border-radius: 20px;}
.back-btn { background: transparent; border: 2px solid #6B7C93; color: white; padding: 10px 20px; border-radius: 50px; cursor: pointer; transition: 0.3s; font-weight: bold; align-self: flex-start; }
.back-btn:hover { background: white; color: #0A192F; }

.btn-toggle-players { background: #EAF7F9; color: #00B8D9; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-weight: bold; transition: 0.2s;}
.btn-toggle-players:hover { background: white; }

.game-layout { display: flex; gap: 30px; align-items: flex-start; max-width: 900px; width: 100%; justify-content: center; position: relative;}
.game-wrapper { position: relative; border: 10px solid #1C2833; border-radius: 20px; background: #333; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; justify-content: center; width: 100%; max-width: 450px; overflow: hidden; z-index: 5;}
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; }
.game-description { position: absolute; bottom: 20px; left: 0; width: 100%; text-align: center; color: #1C2833; font-weight: 900; font-size: 1.1rem; background: rgba(255, 255, 255, 0.8); padding: 10px 0; }
.victory-banner { position: absolute; top: 30%; left: 0; width: 100%; text-align: center; color: white; background: #20C997; padding: 15px 0; font-size: 1.5rem; font-weight: 900; animation: popIn 0.5s ease; box-shadow: 0 10px 20px rgba(32,201,151,0.4);}
@keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }

.live-players-sidebar { width: 280px; background: white; border-radius: 16px; padding: 20px; color: #1C2833;}
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

/* --- CSS DU MODAL EXACTEMENT COMME IMAGE 1 --- */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.9); z-index: 1000; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.end-modal { background: white; width: 100%; max-width: 400px; border-radius: 20px; padding: 30px; text-align: center; color: #1C2833; transform: translateY(30px); transition: 0.3s; max-height: 90vh; overflow-y: auto;}
.modal-overlay.active .end-modal { transform: translateY(0); }

.modal-header-end { display: flex; flex-direction: column; align-items: center; margin-bottom: 5px; }
.trophy-icon { font-size: 2.5rem; margin-bottom: 5px; }
.modal-header-end h3 { font-size: 1.4rem; color: #6B7C93; margin: 10px 0 5px 0; font-weight: 700;}
.bravo-text { font-weight: 900; font-size: 1.2rem; margin-bottom: 25px; color: #0A192F;}

/* PODIUM FLAT DESIGN */
.podium-container { display: flex; align-items: flex-end; justify-content: center; gap: 10px; height: 110px; margin-bottom: 20px; }
.podium-place { display: flex; flex-direction: column; align-items: center; width: 30%; position: relative; }
.medal { font-size: 1.5rem; margin-bottom: -10px; z-index: 2; line-height: 1;}
.place-1 .medal { font-size: 1.8rem; margin-bottom: -12px; }

.podium-bar { width: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 10px; border-radius: 6px 6px 0 0; }
.silver { height: 60px; background: #A0AEC0; }
.gold { height: 90px; background: #FFC107; }
.bronze { height: 50px; background: #CD7F32; }

.p-name { font-size: 0.7rem; font-weight: 800; color: white; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 95%; margin-bottom: 2px;}
.p-score { font-size: 0.8rem; font-weight: 900; color: white; }

.my-rank-info { font-size: 0.8rem; color: #6B7C93; margin-bottom: 25px;}

/* STATS BOXES ÉPURÉES */
.stats-row { display: flex; gap: 15px; margin-bottom: 25px; }
.stat-box { flex: 1; background: #F8FAFC; padding: 15px; border-radius: 12px; display: flex; flex-direction: column; border: none;}
.stat-box span { font-size: 0.75rem; color: #6B7C93; font-weight: 600; margin-bottom: 5px;}
.stat-box strong { font-size: 1.1rem; color: #0A192F; font-weight: 900;}

/* ÉTOILES ET BOUTONS */
.feedback-section { margin-bottom: 25px; }
.feedback-section p { font-weight: 700; color: #6B7C93; margin-bottom: 10px; font-size: 0.85rem; }
.stars-rating { font-size: 2.2rem; color: #E2E8F0; margin-bottom: 20px; cursor: pointer; display: flex; justify-content: center; gap: 8px;}
.stars-rating span.active { color: #FFB800; }

.difficulty-buttons { display: flex; gap: 10px; }
.difficulty-buttons button { flex: 1; padding: 10px 5px; border: 1px solid #E2E8F0; background: white; border-radius: 20px; cursor: pointer; font-weight: 700; color: #6B7C93; transition: 0.2s; font-size: 0.85rem;}
.difficulty-buttons button.active { border-color: #FFB800; color: #FFB800; }

/* BOUTON ENREGISTRER */
.btn-save-score { width: 100%; padding: 16px; border: none; border-radius: 50px; background-color: #00B8D9; color: white; font-size: 1rem; font-weight: 900; cursor: pointer; transition: 0.2s; }
.btn-save-score:hover:not(:disabled) { background-color: #0284C7; }
.btn-save-score:disabled { opacity: 0.7; cursor: not-allowed; }
</style>