<template>
  <div class="sticky-wrapper">
    <header class="navbar container">
      <div class="logo-container" @click="$router.push('/')" style="cursor: pointer;">
        <img src="/images/logo.png" alt="Logo Play 'N Ride" class="nav-logo-img" />
        <span class="logo-text">Play <span class="text-cyan">'N</span> Ride</span>
      </div>
      
      <nav class="nav-links">
        <a href="#pourquoi">Le Concept</a>
        <a href="#pourqui">Pour qui ?</a>
        <a href="#temoignages">Témoignages</a>
        <a href="#contact">Contact</a>
      </nav>
      
      <div v-if="!isLoggedIn" class="auth-buttons">
        <router-link to="/auth?tab=login" class="btn btn-outline-blue" style="text-decoration: none; display: inline-flex; align-items: center;">CONNEXION</router-link>
        <router-link to="/auth?tab=signup" class="btn btn-solid-green" style="text-decoration: none; display: inline-flex; align-items: center;">INSCRIPTION</router-link>
      </div>

      <div v-else class="user-profile-menu">
        <span class="user-name">Bonjour, {{ userName }}</span>
        <div class="avatar-container">
          <img :src="userAvatar" alt="Avatar" class="avatar-img" />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(false) 
const userName = ref('Jean D.')
const userAvatar = ref('/images/avBlonde.png') 
</script>

<style scoped>
.sticky-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95); 
  backdrop-filter: blur(8px); 
  box-shadow: 0 4px 20px rgba(0,0,0,0.05); 
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0; 
}

/* --- ALIGNEMENT PARFAIT DU LOGO (Header) --- */
.logo-container {
  display: flex;
  align-items: center; 
  gap: 12px;
  line-height: 1; 
}

.nav-logo-img {
  height: 65px; 
  width: auto;
  object-fit: contain;
  display: block;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 900;
  color: #0A192F;
  margin: 0;
  display: inline-block;
}

.text-cyan {
  color: #00B8D9;
}

.nav-links a {
  margin: 0 15px;
  color: #6B7C93;
  text-decoration: none;
  font-weight: 600;
}

.auth-buttons {
  display: flex;
  gap: 15px;
}

.user-profile-menu {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.user-profile-menu:hover { opacity: 0.8; }
.user-name {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: #0A192F;
  font-size: 1rem;
}
.avatar-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #00B8D9, #10B981);
}
.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}
</style>