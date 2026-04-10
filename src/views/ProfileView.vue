<template>
  <div class="profile-page">
    <div class="profile-card">

      <button class="back-btn" @click="goBack">← Retour</button>

      <h2 class="page-title">Mon Profil</h2>
      <p class="page-sub">Modifiez vos informations personnelles</p>

      <!-- Avatar selector -->
      <div class="avatar-section">
        <div class="current-avatar" @click="showAvatarPicker = !showAvatarPicker">
          <img :src="form.avatar" alt="Avatar" />
          <div class="avatar-edit-badge">✏️</div>
        </div>
        <p class="avatar-hint">Cliquez pour changer de personnage</p>

        <div v-if="showAvatarPicker" class="avatar-grid">
          <div
            v-for="av in avatarOptions"
            :key="av"
            class="avatar-option"
            :class="{ selected: form.avatar === av }"
            @click="form.avatar = av; showAvatarPicker = false"
          >
            <img :src="av" :alt="av" />
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="form-section">
        <div class="form-group">
          <label>Nom complet</label>
          <input type="text" v-model="form.nom" placeholder="Votre nom" />
        </div>
        <div class="form-group">
          <label>Adresse email</label>
          <input type="email" v-model="form.email" placeholder="votre@email.com" />
        </div>
        <div class="form-group">
          <label>Sexe</label>
          <select v-model="form.sexe">
            <option value="">Non renseigné</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nouveau mot de passe <span class="optional">(optionnel)</span></label>
          <input type="password" v-model="form.motDePasse" placeholder="Laisser vide pour ne pas changer" />
        </div>

        <div class="role-badge-display">
          <span :class="['role-chip', roleColor]">{{ roleLabel }}</span>
        </div>

        <p v-if="message" :class="['save-msg', msgType]">{{ message }}</p>

        <button class="btn-save" :disabled="saving" @click="saveProfile">
          {{ saving ? 'Enregistrement...' : 'Sauvegarder les modifications' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '../config.js'

const router = useRouter()

const statut = localStorage.getItem('statut') || 'patient'
const token = localStorage.getItem('token')
const userId = parseInt(localStorage.getItem('id'))

const roleLabel = computed(() => {
  if (statut === 'admin') return 'Administrateur'
  if (statut === 'pro') return 'Professionnel de santé'
  return 'Patient'
})
const roleColor = computed(() => {
  if (statut === 'admin') return 'chip-purple'
  if (statut === 'pro') return 'chip-green'
  return 'chip-cyan'
})

const avatarOptions = [
  '/images/avatarN.png',
  '/images/avatarRousse.png',
  '/images/avBlackW.png',
  '/images/avBlonde.png',
  '/images/azouz.png',
]

const showAvatarPicker = ref(false)
const saving = ref(false)
const message = ref('')
const msgType = ref('success')

const form = ref({
  nom: localStorage.getItem('nom') || '',
  email: localStorage.getItem('email') || '',
  sexe: localStorage.getItem('playnride_user_sexe') || '',
  motDePasse: '',
  avatar: localStorage.getItem('playnride_user_avatar') || '/images/avatar-1.png',
})

const goBack = () => {
  const s = localStorage.getItem('statut') || ''
  if (s === 'admin' || s === 'Administrateur') router.push('/admin-dashboard')
  else if (s === 'pro' || s === 'Professionnel') router.push('/pro-dashboard')
  else router.push('/patient-dashboard')
}

const saveProfile = async () => {
  saving.value = true
  message.value = ''

  // Always save avatar + nom + email locally
  localStorage.setItem('nom', form.value.nom)
  localStorage.setItem('email', form.value.email)
  localStorage.setItem('playnride_user_avatar', form.value.avatar)
  localStorage.setItem('playnride_user_sexe', form.value.sexe)
  // Sauvegarde liée à l'email pour restauration au prochain login
  if (form.value.email) {
    localStorage.setItem('playnride_avatar_' + form.value.email, form.value.avatar)
  }

  // Try to update on the API if user has an account
  if (token && userId) {
    try {
      const body = {
        nom: form.value.nom,
        email: form.value.email,
      }
      if (form.value.motDePasse) body.motDePasse = form.value.motDePasse

      const res = await fetch(`${API_URL}/utilisateurs/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (res.ok) {
        msgType.value = 'success'
        message.value = 'Profil mis à jour avec succès !'
      } else if (res.status === 405 || res.status === 404) {
        // API doesn't have PUT endpoint yet — localStorage only
        msgType.value = 'success'
        message.value = 'Profil mis à jour localement.'
      } else {
        msgType.value = 'error'
        message.value = 'Erreur serveur, modifications locales sauvegardées.'
      }
    } catch {
      msgType.value = 'success'
      message.value = 'Modifications sauvegardées localement.'
    }
  } else {
    msgType.value = 'success'
    message.value = 'Profil mis à jour !'
  }

  form.value.motDePasse = ''
  saving.value = false
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #FAFCFF;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  font-family: 'Nunito', sans-serif;
}

.profile-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  border: 1px solid #E2E8F0;
  position: relative;
}

.back-btn {
  background: none;
  border: none;
  color: #6B7C93;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  transition: color 0.2s;
}
.back-btn:hover { color: #0A192F; }

.page-title { font-size: 1.8rem; font-weight: 900; color: #0A192F; margin: 0 0 6px; }
.page-sub { color: #6B7C93; font-size: 0.95rem; margin: 0 0 30px; }

/* Avatar */
.avatar-section { display: flex; flex-direction: column; align-items: center; margin-bottom: 30px; }
.current-avatar {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #EAF7F9;
  box-shadow: 0 8px 25px rgba(0,184,217,0.2);
  cursor: pointer;
  background: #F8FAFC;
  transition: transform 0.2s;
}
.current-avatar:hover { transform: scale(1.05); }
.current-avatar img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
.avatar-edit-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: #00B8D9;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  border: 2px solid white;
}
.avatar-hint { font-size: 0.8rem; color: #94A3B8; margin: 10px 0 16px; font-weight: 600; }

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  background: #F8FAFC;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  width: 100%;
}
.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  margin: auto;
}
.avatar-option img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }
.avatar-option:hover { border-color: #00B8D9; transform: scale(1.1); }
.avatar-option.selected { border-color: #20C997; box-shadow: 0 0 0 3px rgba(32,201,151,0.25); }

/* Form */
.form-section { display: flex; flex-direction: column; gap: 0; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }
.form-group label { font-weight: 700; color: #6B7C93; font-size: 0.85rem; }
.optional { font-weight: 400; font-style: italic; color: #94A3B8; }
.form-group input, .form-group select {
  padding: 12px 14px;
  border: 2px solid #E2E8F0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.95rem;
  color: #0A192F;
  background: #F8FAFC;
  transition: border-color 0.2s;
}
.form-group input:focus, .form-group select:focus { border-color: #00B8D9; outline: none; background: white; }

.role-badge-display { margin-bottom: 20px; }
.role-chip { font-size: 0.8rem; font-weight: 800; padding: 5px 14px; border-radius: 20px; }
.chip-cyan { background: #EAF7F9; color: #00B8D9; }
.chip-green { background: #E8F8F5; color: #20C997; }
.chip-purple { background: #F3E8FF; color: #8B5CF6; }

.save-msg { font-size: 0.9rem; font-weight: 700; padding: 10px 14px; border-radius: 10px; margin-bottom: 15px; }
.save-msg.success { background: #E8F8F5; color: #20C997; }
.save-msg.error { background: #FEE2E2; color: #EF4444; }

.btn-save {
  width: 100%;
  padding: 14px;
  background: linear-gradient(to right, #20C997, #00B8D9);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,184,217,0.3); }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
