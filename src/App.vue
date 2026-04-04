<template>
  <div class="app-container">
    <AppNavbar v-if="$route.name === 'home'" />
    
    <router-view />
    
    <AppFooter v-if="$route.name === 'home'" />
  </div>
</template>

<script setup>
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* === TOUTES TES COULEURS ET STYLES GLOBAUX RÉINTÉGRÉS === */
:root {
  --green-accent: #20C997; --cyan-accent: #00B8D9;
  --blue-dark: #0A192F; --blue-outline: #007BFF;
  --text-main: #1C2833; --text-muted: #6B7C93;
  --bg-light: #F8FAFC; --white: #FFFFFF;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-family: 'Nunito', sans-serif; }
body { color: var(--text-main); line-height: 1.6; background-color: var(--white); }

.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.text-green { color: var(--green-accent); }
.text-cyan { color: var(--cyan-accent); }
.text-blue { color: var(--blue-outline); }

/* BOUTONS */
.btn { padding: 10px 24px; font-weight: 800; border-radius: 50px; cursor: pointer; border: 2px solid transparent; text-transform: uppercase; transition: 0.3s; font-size: 0.95rem; }
.btn-solid-green { background: var(--green-accent); color: white; }
.btn-outline-blue { border-color: var(--blue-outline); color: var(--blue-outline); background: transparent; }
.btn-large { padding: 14px 32px; font-size: 1rem; }

/* NAVBAR & LOGO */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; }
.logo-container { display: flex; align-items: center; gap: 10px; }
.nav-logo-img { height: 50px; }
.logo-text { font-size: 1.5rem; font-weight: 900; color: var(--blue-dark); }
.nav-links a { margin: 0 15px; color: var(--text-muted); text-decoration: none; font-weight: 600; }
.auth-buttons { display: flex; gap: 15px; }

/* HERO */
.hero-section { display: flex; align-items: center; padding: 60px 0; gap: 40px; }
.hero-content { flex: 1; max-width: 580px; }
.hero-content h1 { font-size: 4rem; color: var(--blue-dark); line-height: 1.1; margin-bottom: 25px; font-weight: 900;}
.subtitle { font-size: 1.15rem; color: var(--text-muted); margin-bottom: 40px; }
.badge-light-blue { background: #E6F0FD; color: var(--blue-outline); display: inline-block; padding: 6px 16px; border-radius: 50px; margin-bottom: 20px; font-weight: bold; font-size: 0.85rem;}
.hero-image-container { flex: 1; position: relative; text-align: right; display: flex; justify-content: flex-end;}
.hero-img { max-width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
.floating-badge { position: absolute; bottom: -20px; left: -20px; background: white; padding: 15px 25px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 15px; }
.hero-actions { display: flex; gap: 15px; margin-bottom: 40px; }
.social-proof { display: flex; align-items: center; gap: 15px; }
.avatars { display: flex; }
.avatar { width: 35px; height: 35px; border-radius: 50%; border: 2px solid white; display: flex; justify-content: center; align-items: center; font-size: 0.8rem; font-weight: bold; color: var(--blue-dark); margin-left: -10px; }

/* CARROUSEL */
.testimonial-section { text-align: center; padding: 60px 0; display: flex; flex-direction: column; align-items: center;}
.carousel-container { display: flex; align-items: center; justify-content: center; gap: 20px; margin: 0 auto; max-width: 900px; width: 100%; position: relative;}
.testimonial-slider { flex: 1; position: relative; min-height: 250px; display: flex; justify-content: center; align-items: center;}
.quote-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.05); width: 100%; max-width: 700px; position: absolute; opacity: 0; transition: all 0.5s; transform: translateX(50px); border: 1px solid #f0f0f0;}
.quote-card.active { opacity: 1; transform: translateX(0); position: relative; }
.carousel-btn { width: 50px; height: 50px; border-radius: 50%; border: 1px solid #eee; background: white; cursor: pointer; font-size: 1.5rem; z-index: 2;}
.carousel-dots { display: flex; justify-content: center; gap: 10px; margin-top: 20px; }
.dot { width: 10px; height: 10px; background: #ddd; border-radius: 50%; cursor: pointer; transition: 0.3s;}
.dot.active { background: var(--blue-outline); width: 30px; border-radius: 10px; }
.quote-icon { font-size: 4rem; color: #E6F0FD; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); line-height: 1; }
.quote-text { font-size: 1.5rem; font-style: italic; color: var(--blue-dark); font-weight: 600; margin-bottom: 20px; }

/* GRILLES & CARTES */
.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 2.5rem; color: var(--blue-dark); margin-bottom: 15px;}
.badge-light-cyan { background-color: #E0F7FA; color: var(--cyan-accent); display: inline-block; padding: 6px 16px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; margin-bottom: 20px;}
.badge-light-green { background-color: #E8F8F5; color: var(--green-accent); display: inline-block; padding: 6px 16px; border-radius: 50px; font-weight: 700; font-size: 0.85rem; margin-bottom: 20px;}

.grid-3-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 80px; }
.card { padding: 40px 30px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; cursor: pointer; transition: 0.3s; background: white;}
.card:hover { transform: translateY(-10px); border-color: var(--blue-outline); box-shadow: 0 20px 40px rgba(0,0,0,0.08);}
.card-icon { width: 60px; height: 60px; border-radius: 16px; display: flex; justify-content: center; align-items: center; font-size: 1.8rem; margin-bottom: 25px; }
.sm-icon { width: 50px; height: 50px; font-size: 1.4rem; }
.blue-icon { background: #E6F0FD; color: var(--blue-outline); }
.green-icon { background: #E8F8F5; color: var(--green-accent); }
.cyan-icon { background: #E0F7FA; color: var(--cyan-accent); }
.card h3 { color: var(--blue-dark); font-size: 1.3rem; margin-bottom: 15px; }
.card p { color: var(--text-muted); font-size: 0.95rem; }

.target-label { font-size: 0.8rem !important; text-transform: uppercase; font-weight: 800; margin-bottom: 5px; }
.feature-list { list-style: none; margin-top: 20px; }
.feature-list li { margin-bottom: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 10px; font-size: 0.95rem;}
.feature-list li::before { content: "•"; color: var(--blue-outline); font-weight: bold; font-size: 1.2rem; }
.learn-more { display: inline-block; font-weight: 700; font-size: 0.95rem; margin-top: 20px; }

/* FOOTER */
.site-footer { background: var(--blue-dark); color: #8892b0; padding: 80px 0 30px; font-size: 0.95rem;}
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 60px;}
.footer-logo-img { height: 50px; margin-bottom: 20px; }
.contact-info { list-style: none; margin-top: 20px; }
.contact-info li { margin-bottom: 15px; }
.footer-col h4 { color: white; margin-bottom: 25px; font-size: 1.1rem;}
.footer-col ul { list-style: none; }
.footer-col ul li a { color: #8892b0; text-decoration: none; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; text-align: left; }

/* MODALE */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: 0.3s; padding: 20px;}
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal-content { background: white; padding: 50px; border-radius: 24px; max-width: 700px; width: 100%; position: relative; transform: translateY(30px); transition: 0.3s; box-shadow: 0 25px 50px rgba(0,0,0,0.2);}
.modal-overlay.active .modal-content { transform: translateY(0); }
.modal-close { position: absolute; top: 20px; right: 20px; font-size: 2rem; border: none; background: transparent; cursor: pointer; color: var(--text-muted);}
.modal-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.modal-header h3 { font-size: 2rem; color: var(--blue-dark); }
.modal-icon { width: 70px; height: 70px; font-size: 2rem; margin-bottom: 0;}
.modal-intro { font-size: 1.2rem; color: var(--blue-dark); margin-bottom: 25px; font-weight: 600;}
.modal-details-block p { font-size: 1.05rem; line-height: 1.8; color: var(--text-main);}
</style>