<template>
  <div class="auth-page">
    <div class="auth-left">
      <div class="auth-logo" @click="goHome">
        <img src="/images/logo.png" alt="Logo" class="logo-img" />
        <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
      </div>
      <div class="illustration-container">
        <img src="/images/auth-illustration.png" alt="Seniors faisant du vélo" class="auth-illustration" />
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-container">
        <button class="back-btn" @click="goHome">‹ Retour à l'accueil</button>

        <transition name="fade" mode="out-in">
          
          <div v-if="isLogin" key="login" class="form-wrapper">
            <h2>Connexion</h2>
            <p class="auth-subtitle">Si vous êtes déjà membre, connectez-vous avec votre adresse mail.</p>
            
            <form @submit.prevent="submitLogin">
              <div class="input-group">
                <label>Adresse Mail</label>
                <input type="email" v-model="loginEmail" placeholder="jean.patient@email.com" required>
              </div>
              <div class="input-group">
                <label>Mot de passe</label>
                <input type="password" v-model="loginPassword" placeholder="••••••••" required>
              </div>

              <div class="checkbox-group">
                <label class="custom-checkbox">
                  <input type="checkbox" v-model="rememberMe">
                  <span class="checkmark"></span>
                  Se souvenir de moi
                </label>
              </div>

              <p v-if="authError" class="error-msg">{{ authError }}</p>
              <button type="submit" class="btn-gradient" :disabled="loading">
                {{ loading ? 'Connexion...' : 'Se connecter' }}
              </button>
            </form>

            <p class="toggle-text">
              Pas encore de compte ? 
              <span class="toggle-link" @click="isLogin = false">Créer un compte</span>
            </p>
          </div>

          <div v-else key="signup" class="form-wrapper">
            <h2>Inscription</h2>
            <p class="auth-subtitle">Créez votre compte pour commencer votre rééducation ludique.</p>

            <form @submit.prevent="submitSignup">
              <div class="input-group">
                <label>Nom et Prénom</label>
                <input type="text" v-model="signupNom" placeholder="Jean Dupont" required>
              </div>

              <div class="input-group">
                <label>Adresse Mail</label>
                <input type="email" v-model="signupEmail" placeholder="jean.dupont@email.com" required>
              </div>

              <div class="input-group">
                <label>Mot de passe</label>
                <input type="password" v-model="signupPassword" placeholder="••••••••" required>
              </div>

              <div class="input-group">
                <label>Choisissez votre photo de profil</label>
                <div class="avatar-selection">
                  <img
                    v-for="avatar in avatarList"
                    :key="avatar"
                    :src="'/images/' + avatar"
                    :class="['selectable-avatar', { selected: signupAvatar === avatar }]"
                    @click="signupAvatar = avatar"
                    alt="Choix Avatar"
                  />
                </div>
              </div>

              <div class="input-row">
                <div class="input-group" style="flex: 1;">
                  <label>Âge</label>
                  <input type="number" v-model="signupAge" min="1" max="120" placeholder="ex: 65" required>
                </div>
                <div class="input-group" style="flex: 2;">
                  <label>Sexe</label>
                  <select v-model="signupSexe" required>
                    <option value="" disabled selected>Sélectionner...</option>
                    <option value="H">Homme</option>
                    <option value="F">Femme</option>
                    <option value="A">Autre</option>
                  </select>
                </div>
              </div>

              <!-- Le rôle "patient" est automatiquement assigné par le serveur -->

              <div class="checkbox-group" style="margin-top: 15px;">
                <label class="custom-checkbox align-start">
                  <input type="checkbox" required>
                  <span class="checkmark"></span>
                  <span class="terms-text">
                    J'accepte les <a href="#" class="text-cyan">CGU</a> et donne mon consentement au traitement de mes données selon la <a href="#" class="text-cyan">Politique de confidentialité</a>.
                  </span>
                </label>
              </div>

              <p v-if="authError" class="error-msg">{{ authError }}</p>
              <button type="submit" class="btn-gradient" :disabled="loading">
                {{ loading ? 'Inscription...' : 'S\'inscrire et Continuer' }}
              </button>
            </form>

            <p class="toggle-text">
              Déjà un compte ? 
              <span class="toggle-link" @click="isLogin = true">Se connecter</span>
            </p>
          </div>
        </transition>
      </div>
    </div>

    <div class="popup-overlay" :class="{ active: showPopup }">
      <div class="popup-content">
        <div class="popup-icon">
          <span v-if="userRole === 'Administrateur'">🛡️</span>
          <span v-else-if="userRole === 'Professionnel de Santé'">🩺</span>
          <span v-else>🏠</span>
        </div>
        <h3>Connexion réussie !</h3>
        <p class="popup-text">Vous êtes identifié(e) en tant que :<br><strong class="text-cyan">{{ userRole }}</strong></p>
        
        <button class="btn-gradient" @click="goToDashboard">Accéder à mon espace</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { API_URL } from '../config.js'

const router = useRouter()
const route = useRoute()

const isLogin = ref(true)
const loading = ref(false)
const authError = ref('')

// ── LOGIN ─────────────────────────────────────────────────────────────────────
const loginEmail = ref('')
const loginPassword = ref('')
const rememberMe = ref(false)

// ── SIGNUP ────────────────────────────────────────────────────────────────────
const signupNom = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const signupAge = ref('')
const signupSexe = ref('')

const avatarList = ['avatarN.png', 'avatarRousse.png', 'avBlackW.png', 'avBlonde.png', 'azouz.png']
const signupAvatar = ref(avatarList[3])

// ── POPUP ─────────────────────────────────────────────────────────────────────
const showPopup = ref(false)
const userRole = ref('')

onMounted(() => {
  if (route.query.tab === 'signup') {
    isLogin.value = false
  }
  const savedEmail = localStorage.getItem('remember_email')
  if (savedEmail) {
    loginEmail.value = savedEmail
    rememberMe.value = true
  }
})

const goHome = () => router.push('/')

// ── CONNEXION ─────────────────────────────────────────────────────────────────
const submitLogin = async () => {
  authError.value = ''
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/utilisateurs/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail.value, motDePasse: loginPassword.value })
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      authError.value = err.message || 'Email ou mot de passe incorrect.'
      return
    }

    const data = await res.json()

    localStorage.setItem('token', data.token)
    localStorage.setItem('nom', data.nom)
    localStorage.setItem('email', data.email)
    localStorage.setItem('statut', data.statut)
    localStorage.setItem('id', data.id)

    if (rememberMe.value) {
      localStorage.setItem('remember_email', loginEmail.value)
    } else {
      localStorage.removeItem('remember_email')
    }

    // Restaure l'avatar propre à cet utilisateur (clé par email)
    const userAvatarKey = 'playnride_avatar_' + data.email
    const savedAvatar = localStorage.getItem(userAvatarKey)
    if (savedAvatar) {
      localStorage.setItem('playnride_user_avatar', savedAvatar)
    } else {
      // Première connexion : on attribue un avatar par défaut selon l'id
      const defaultAvatars = ['/images/avatarN.png', '/images/avBlonde.png', '/images/avBlackW.png', '/images/azouz.png', '/images/avatarRousse.png']
      const defaultAvatar = defaultAvatars[(data.id || 0) % defaultAvatars.length]
      localStorage.setItem('playnride_user_avatar', defaultAvatar)
      localStorage.setItem(userAvatarKey, defaultAvatar)
    }

    userRole.value = data.statut
    showPopup.value = true

  } catch {
    authError.value = 'Impossible de joindre le serveur. Vérifiez votre connexion.'
  } finally {
    loading.value = false
  }
}

// ── INSCRIPTION ───────────────────────────────────────────────────────────────
const submitSignup = async () => {
  authError.value = ''
  loading.value = true
  try {
    const payload = {
      nom: signupNom.value,
      email: signupEmail.value,
      motDePasse: signupPassword.value,
      sexe: signupSexe.value,
      statut: 'patient'
    }

    const res = await fetch(`${API_URL}/utilisateurs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      // Lire d'abord comme texte pour éviter un crash si ce n'est pas du JSON
      const rawText = await res.text()
      console.error('[Inscription] HTTP', res.status, rawText)
      let errBody = {}
      try { errBody = JSON.parse(rawText) } catch { /* réponse HTML ou vide */ }
      // Spring Boot 3 renvoie { detail: "..." } ou { message: "..." }
      authError.value = errBody.message || errBody.detail || errBody.title
        || `Erreur ${res.status} lors de l'inscription. Consultez la console pour les détails.`
      return
    }

    // Inscription réussie → connexion automatique
    const loginRes = await fetch(`${API_URL}/utilisateurs/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signupEmail.value, motDePasse: signupPassword.value })
    })

    if (loginRes.ok) {
      const data = await loginRes.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('nom', data.nom)
      localStorage.setItem('email', data.email)
      localStorage.setItem('statut', data.statut)
      localStorage.setItem('id', data.id)
      userRole.value = data.statut
    } else {
      // Login auto échoué après inscription réussie — on redirige quand même
      userRole.value = 'patient'
    }

    const chosenAvatar = '/images/' + signupAvatar.value
    localStorage.setItem('playnride_user_avatar', chosenAvatar)
    localStorage.setItem('playnride_avatar_' + signupEmail.value, chosenAvatar)
    showPopup.value = true

  } catch (err) {
    console.error('[Inscription] Erreur réseau :', err)
    authError.value = 'Impossible de joindre le serveur. Vérifiez votre connexion.'
  } finally {
    loading.value = false
  }
}

// ── REDIRECTION ───────────────────────────────────────────────────────────────
const goToDashboard = () => {
  showPopup.value = false
  const statut = localStorage.getItem('statut')
  if (statut === 'Administrateur') {
    router.push('/admin-dashboard')
  } else if (statut === 'Professionnel') {
    router.push('/pro-dashboard')
  } else {
    router.push('/patient-dashboard')
  }
}
</script>

<style scoped>
.auth-page { display: flex; height: 100vh; width: 100%; font-family: 'Nunito', sans-serif; background-color: #ffffff; }
.auth-left { flex: 1; background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%); display: flex; flex-direction: column; padding: 40px; position: relative; overflow: hidden; }
.auth-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; z-index: 10; }
.logo-img { height: 40px; }
.logo-text { font-size: 1.5rem; font-weight: 900; color: #0A192F; }
.text-cyan { color: #00B8D9; }
.illustration-container { flex: 1; display: flex; justify-content: center; align-items: center; }
.auth-illustration { max-width: 90%; max-height: 80%; object-fit: contain; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1)); }

.auth-right { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px; overflow-y: auto; }
.auth-form-container { width: 100%; max-width: 450px; }
.back-btn { background: none; border: none; color: #6B7C93; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 30px; font-size: 1rem; transition: color 0.3s; }
.back-btn:hover { color: #0A192F; }

h2 { font-size: 2.5rem; color: #0A192F; margin-bottom: 10px; font-weight: 800; }
.auth-subtitle { color: #6B7C93; margin-bottom: 30px; line-height: 1.5; }

.input-group { margin-bottom: 20px; width: 100%; }
.input-row { display: flex; gap: 15px; }
label { display: block; font-size: 0.9rem; font-weight: 700; color: #0A192F; margin-bottom: 8px; }

input[type="text"], input[type="email"], input[type="password"], input[type="number"], select {
  width: 100%; padding: 14px 16px; border: 2px solid #E2E8F0; border-radius: 12px; font-size: 1rem; font-family: inherit; transition: all 0.3s; background-color: #F8FAFC;
}
input:focus, select:focus { outline: none; border-color: #00B8D9; background-color: white; box-shadow: 0 0 0 4px rgba(0, 184, 217, 0.1); }

/* STYLES DES AVATARS DE SÉLECTION */
.avatar-selection { display: flex; gap: 15px; flex-wrap: wrap; margin-top: 5px; }
.selectable-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; cursor: pointer; border: 3px solid transparent; transition: all 0.2s; background: #F8FAFC; padding: 2px;}
.selectable-avatar:hover { transform: scale(1.05); }
.selectable-avatar.selected { border-color: #00B8D9; background: #EAF7F9; transform: scale(1.1); box-shadow: 0 4px 10px rgba(0,184,217,0.3);}

.checkbox-group { margin-bottom: 30px; }
.custom-checkbox { display: flex; align-items: center; gap: 10px; font-weight: 500; color: #6B7C93; font-size: 0.9rem; margin-bottom: 12px; cursor: pointer; }
.custom-checkbox.align-start { align-items: flex-start; }
.custom-checkbox input { width: 18px; height: 18px; cursor: pointer; margin-top: 2px; }
.terms-text { font-size: 0.85rem; line-height: 1.4; }
.terms-text a { text-decoration: none; font-weight: 800; }
.terms-text a:hover { text-decoration: underline; }

.btn-gradient { width: 100%; padding: 16px; background: linear-gradient(to right, #20C997, #00B8D9); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; margin-bottom: 20px; }
.btn-gradient:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 184, 217, 0.3); }
.btn-gradient:disabled { opacity: 0.6; cursor: not-allowed; }
.error-msg { color: #FC8181; font-size: 0.9rem; font-weight: 700; margin-bottom: 15px; padding: 10px 14px; background: #FFF5F5; border-radius: 8px; border-left: 3px solid #FC8181; }

.toggle-text { text-align: center; color: #6B7C93; font-size: 0.95rem; }
.toggle-link { color: #00B8D9; font-weight: 800; cursor: pointer; margin-left: 5px; }
.toggle-link:hover { text-decoration: underline; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from { opacity: 0; transform: translateY(10px); }
.fade-leave-to { opacity: 0; transform: translateY(-10px); }

/* POPUP */
.popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: 0.3s; }
.popup-overlay.active { opacity: 1; visibility: visible; }
.popup-content { background: white; padding: 40px; border-radius: 24px; max-width: 400px; width: 90%; text-align: center; transform: translateY(30px); transition: 0.3s; box-shadow: 0 25px 50px rgba(0,0,0,0.2); }
.popup-overlay.active .popup-content { transform: translateY(0); }
.popup-icon { font-size: 4rem; margin-bottom: 10px; }
.popup-content h3 { font-size: 1.8rem; color: #0A192F; margin-bottom: 15px; }
.popup-text { font-size: 1.1rem; color: #6B7C93; margin-bottom: 30px; line-height: 1.5; }
.popup-text strong { font-size: 1.3rem; display: inline-block; margin-top: 5px; }

@media (max-width: 900px) {
  .auth-left { display: none; }
  .auth-right { padding: 20px; }
  .input-row { flex-direction: column; gap: 0; }
}
</style>