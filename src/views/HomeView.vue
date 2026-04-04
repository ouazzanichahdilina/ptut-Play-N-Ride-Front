<template>
  <div class="landing-page">
    <main>
      <section class="hero-section container">
        <div class="hero-content">
          <div class="badge badge-light-blue">Rééducation & Fitness connectés</div>
          <h1>L'activité physique devient <span class="text-green">un jeu.</span></h1>
          <p class="subtitle">Transformez vos séances d'effort en aventures interactives. Connectez votre équipement et évadez-vous depuis chez vous ou votre centre de soin.</p>
          <div class="hero-actions">
            <button class="btn btn-solid-green btn-large" @click="$router.push('/guest-dashboard')">JOUER LIBREMENT</button>
            <button class="btn btn-outline-blue btn-large">DÉCOUVRIR LES JEUX</button>
          </div>
          <div class="social-proof">
            <div class="avatars">
              <div class="avatar" style="background-color: #a8e6cf;">A</div>
              <div class="avatar" style="background-color: #dcedc1;">B</div>
              <div class="avatar" style="background-color: #ffd3b6;">C</div>
            </div>
            <p><strong>+ 2 500</strong> utilisateurs actifs</p>
          </div>
        </div>
        <div class="hero-image-container">
          <img src="/images/hero-image.png" alt="Utilisateur s'entraînant avec Play 'N Ride" class="hero-img" />
          <div class="floating-badge">
            <span class="icon">🎮</span>
            <div><strong>7+</strong><br><span>Scénarios disponibles</span></div>
          </div>
        </div>
      </section>

      <section id="temoignages" class="testimonial-section container">
        <div class="stars">⭐⭐⭐⭐⭐</div>
        <p class="rating-text"><strong>4.9/5</strong> par <span class="text-green"><strong>1 500 utilisateurs</strong></span></p>
        
        <div class="carousel-container">
          <button class="carousel-btn prev-btn" @click="prevSlide">&#10094;</button>
          <div class="testimonial-slider">
            <div class="quote-card active">
              <div class="quote-icon">❞</div>
              <p class="quote-text">{{ testimonials[currentSlide].text }}</p>
              <p class="quote-author">{{ testimonials[currentSlide].author }}</p>
            </div>
          </div>
          <button class="carousel-btn next-btn" @click="nextSlide">&#10095;</button>
        </div>
        <div class="carousel-dots">
          <span v-for="(t, index) in testimonials" :key="index" class="dot" :class="{ active: currentSlide === index }" @click="goToSlide(index)"></span>
        </div>
      </section>

      <section id="pourquoi" class="features-section container">
        <div class="section-header">
          <div class="badge badge-light-cyan">Nos atouts</div>
          <h2>Pourquoi <span class="logo-inline">Play <span class="text-cyan">'N</span> Ride</span> ?</h2>
        </div>
        <div class="grid-3-cols">
          <div v-for="(feature, index) in features" :key="index" class="card expandable-card" @click="openModal(feature)">
            <div class="card-icon-wrapper">
              <img :src="feature.image" :alt="feature.title" class="custom-card-icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.shortDesc }}</p>
          </div>
        </div>
      </section>

      <section id="pourqui" class="audience-section container">
        <div class="section-header">
          <div class="badge badge-light-green">Pour tous</div>
          <h2>Pour qui est fait <span class="logo-inline">Play <span class="text-cyan">'N</span> Ride</span> ?</h2>
        </div>
        <div class="grid-3-cols audience-cards">
          <div v-for="(audience, index) in audiences" :key="index" class="card audience-card expandable-card" @click="openModal(audience)">
            <div class="card-icon-wrapper">
              <img :src="audience.image" :alt="audience.title" class="custom-card-icon" />
            </div>
            <p class="target-label">{{ audience.label }}</p>
            <h3>{{ audience.title }}</h3>
            <p class="desc">{{ audience.shortDesc }}</p>
            <ul class="feature-list">
              <li v-for="(item, i) in audience.list" :key="i">{{ item }}</li>
            </ul>
            <span :class="['learn-more', 'text-' + audience.colorName]">Agrandir →</span>
          </div>
        </div>
      </section>

      <div class="modal-overlay" :class="{ active: isModalOpen }" @click.self="closeModal">
        <div class="modal-content" v-if="activeCardData">
          <button class="modal-close" @click="closeModal">&times;</button>
          <div class="modal-header">
            <div class="modal-icon-wrapper">
              <img :src="activeCardData.image" :alt="activeCardData.title" class="custom-card-icon" />
            </div>
            <h3>{{ activeCardData.title }}</h3>
          </div>
          <div class="modal-body">
            <p class="modal-intro">{{ activeCardData.shortDesc }}</p>
            <div class="modal-details-block" v-html="activeCardData.hiddenDetails"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAuth = (mode) => {
  router.push({ path: '/auth', query: { tab: mode } })
}

const currentSlide = ref(0)
const testimonials = [
  { text: "\"Mes patients sont bien plus motivés qu'avant, qu'ils aient 25 ou 75 ans.\"", author: "Dr. Lefevre, Médecin du sport" },
  { text: "\"Je ne vois plus le temps passer pendant ma rééducation. J'ai retrouvé le plaisir de bouger !\"", author: "Marc, 42 ans, suite à une blessure" },
  { text: "\"Devenu l'outil préféré de notre centre. Les progrès sont visibles plus rapidement.\"", author: "Sophie D., Directrice de Clinique" }
]

const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % testimonials.length }
const prevSlide = () => { currentSlide.value = currentSlide.value === 0 ? testimonials.length - 1 : currentSlide.value - 1 }
const goToSlide = (index) => { currentSlide.value = index }

const features = [
  { image: '/images/ennui.png', title: "Fini l'ennui", shortDesc: "Grâce à la gamification, chaque séance devient une aventure captivante.", hiddenDetails: "<p>Notre moteur de jeu transforme votre effort en mouvement, quel que soit votre niveau physique.</p>", colorName: 'blue' },
  { image: '/images/chrono-icon.png', title: "À votre rythme", shortDesc: "Nos exercices s'adaptent automatiquement à vos capacités.", hiddenDetails: "<p>L'IA analyse votre cadence en temps réel pour ajuster la difficulté, de la rééducation douce à la performance.</p>", colorName: 'green' },
  { image: '/images/courbe.png', title: "Suivi complet", shortDesc: "Visualisez vos progrès en temps réel et analysez votre historique.", hiddenDetails: "<p>Retrouvez des graphiques clairs et exportez vos données pour vous ou votre praticien.</p>", colorName: 'cyan' }
]

const audiences = [
  { label: "Pour les Particuliers", image: '/images/tous.png', title: "Patients & Sportifs", shortDesc: "Restez actif ou rééduquez-vous à domicile avec plaisir.", list: ["Exercices adaptés", "Suivi personnalisé", "Installation facile"], hiddenDetails: "<p>Idéal pour le maintien en forme ou la récupération post-opératoire. Démarrage instantané.</p>", colorName: 'blue' },
  { label: "Pour les Pros", image: '/images/proSanté.png', title: "Professionnels de santé", shortDesc: "Suivez et ajustez l'activité de vos patients à distance.", list: ["Monitoring en temps réel", "Rapports cliniques", "Gestion de patientèle"], hiddenDetails: "<p>Prescrivez des scénarios ciblés et suivez l'évolution objective de vos patients via un tableau de bord sécurisé.</p>", colorName: 'green' },
  { label: "B2B & Collectivités", image: '/images/EtablissementDeSoin.png', title: "Cliniques & Centres", shortDesc: "Équipez vos plateaux techniques d'une solution innovante.", list: ["Solution clé en main", "Engagement patient", "Outils d'animation"], hiddenDetails: "<p>Modernisez vos espaces de rééducation et fidélisez vos patients avec des séances attractives.</p>", colorName: 'cyan' }
]

const isModalOpen = ref(false)
const activeCardData = ref(null)

const openModal = (data) => {
  activeCardData.value = data
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => { activeCardData.value = null }, 300)
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.landing-page { 
  background-color: #FAFCFF; 
  min-height: 100vh; 
  font-family: 'Nunito', sans-serif; 
}
.container { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 0 20px; 
}

/* === BOUTONS === */
.btn { 
  padding: 12px 24px; 
  border-radius: 50px; 
  font-weight: 800; 
  cursor: pointer; 
  transition: all 0.2s; 
  font-size: 0.95rem; 
  border: none; 
}
.btn-large { padding: 16px 32px; font-size: 1.05rem; }
.btn-outline-blue { 
  border: 2px solid #00B8D9; 
  color: #00B8D9; 
  background: transparent; 
}
.btn-outline-blue:hover { background: #F0F9FF; }
.btn-solid-green { 
  background: #20C997; 
  color: white; 
  box-shadow: 0 4px 15px rgba(32, 201, 151, 0.3); 
}
.btn-solid-green:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px rgba(32, 201, 151, 0.4); 
}

/* === RESTE DES STYLES EXISTANTS === */
.logo-inline { color: #0A192F; font-weight: 900; }

.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 80px;
  gap: 50px;
}
.hero-content { flex: 1; max-width: 550px; }
.badge { display: inline-block; padding: 6px 14px; border-radius: 50px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; }
.badge-light-blue { background: #EAF7F9; color: #00B8D9; }
.badge-light-cyan { background: #F0F9FF; color: #0EA5E9; }
.badge-light-green { background: #E8F8F5; color: #20C997; }

h1 { font-size: 3.5rem; color: #0A192F; line-height: 1.1; margin-bottom: 20px; font-weight: 900; letter-spacing: -1px; }
.text-green { color: #20C997; }
.subtitle { font-size: 1.15rem; color: #6B7C93; line-height: 1.6; margin-bottom: 40px; }
.hero-actions { display: flex; gap: 20px; margin-bottom: 40px; }

.social-proof { display: flex; align-items: center; gap: 15px; }
.avatars { display: flex; }
.avatar { width: 35px; height: 35px; border-radius: 50%; border: 3px solid #FAFCFF; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #0A192F; margin-left: -10px; }
.avatar:first-child { margin-left: 0; }
.social-proof p { color: #6B7C93; font-size: 0.9rem; margin: 0; }
.social-proof strong { color: #0A192F; }

.hero-image-container { flex: 1; position: relative; display: flex; justify-content: center; }
.hero-img { width: 100%; max-width: 600px; border-radius: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.1); }
.floating-badge { position: absolute; bottom: 30px; left: -30px; background: white; padding: 15px 25px; border-radius: 16px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 15px; }
.floating-badge .icon { font-size: 2rem; }
.floating-badge strong { display: block; font-size: 1.2rem; color: #0A192F; font-weight: 900; }
.floating-badge span { font-size: 0.85rem; color: #6B7C93; font-weight: 600; }

.section-header { text-align: center; margin-bottom: 50px; }
.section-header h2 { font-size: 2.5rem; color: #0A192F; font-weight: 900; letter-spacing: -0.5px; }

.testimonial-section { text-align: center; padding: 80px 0; background: white; border-radius: 30px; margin: 60px auto; box-shadow: 0 10px 40px rgba(0,0,0,0.03); max-width: 1000px; }
.stars { font-size: 1.5rem; letter-spacing: 2px; margin-bottom: 10px; }
.rating-text { color: #6B7C93; font-size: 1.1rem; margin-bottom: 40px; }
.carousel-container { display: flex; align-items: center; justify-content: center; gap: 30px; margin-bottom: 30px; }
.carousel-btn { background: none; border: none; font-size: 2rem; color: #CBD5E1; cursor: pointer; transition: color 0.2s; padding: 10px; }
.carousel-btn:hover { color: #0A192F; }
.testimonial-slider { max-width: 600px; }
.quote-icon { font-size: 4rem; color: #E2E8F0; line-height: 1; margin-bottom: -20px; font-family: Georgia, serif; }
.quote-text { font-size: 1.4rem; color: #0A192F; font-weight: 700; line-height: 1.5; margin-bottom: 20px; font-style: italic; }
.quote-author { color: #6B7C93; font-weight: 600; font-size: 1rem; }
.carousel-dots { display: flex; justify-content: center; gap: 8px; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: #E2E8F0; cursor: pointer; transition: 0.3s; }
.dot.active { background: #00B8D9; transform: scale(1.2); }

.grid-3-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; margin-top: 40px; }
.card { background: white; padding: 50px 40px; border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.06); cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; min-height: 400px; }
.card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.12); }
.card-icon-wrapper { display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 35px; }
.custom-card-icon { width: 180px; height: 180px; object-fit: contain; }
.card h3 { font-size: 1.6rem; color: #0A192F; margin-bottom: 15px; font-weight: 800; }
.card p { font-size: 1.1rem; color: #4A5568; line-height: 1.6; flex-grow: 1; }

.features-section, .audience-section { padding: 80px 0; }

.audience-card .target-label { font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #8A9AAD; margin-bottom: 10px; flex-grow: 0; }
.feature-list { list-style: none; padding: 0; margin: 25px 0; }
.feature-list li { position: relative; padding-left: 25px; margin-bottom: 12px; font-size: 1.05rem; color: #2D3748; }
.feature-list li::before { content: '✓'; position: absolute; left: 0; color: #00B8D9; font-weight: bold; }
.learn-more { font-weight: 700; font-size: 1.05rem; margin-top: auto; }

/* MODAL */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10,25,47,0.85); display: flex; justify-content: center; align-items: center; z-index: 1000; opacity: 0; visibility: hidden; transition: 0.3s ease; padding: 20px; backdrop-filter: blur(5px); }
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal-content { background: white; width: 100%; max-width: 600px; border-radius: 24px; padding: 40px; position: relative; transform: translateY(30px); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 25px 50px rgba(0,0,0,0.2); }
.modal-overlay.active .modal-content { transform: translateY(0); }
.modal-close { position: absolute; top: 20px; right: 25px; font-size: 2rem; background: none; border: none; color: #94A3B8; cursor: pointer; transition: color 0.2s; }
.modal-close:hover { color: #0A192F; }
.modal-header { display: flex; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #E2E8F0; }
.modal-icon-wrapper { margin-right: 20px; display: flex; align-items: center; }
.modal-icon-wrapper .custom-card-icon { width: 80px; height: 80px; }
.modal-header h3 { font-size: 1.8rem; color: #0A192F; font-weight: 900; margin: 0; }
.modal-intro { font-size: 1.15rem; color: #0A192F; font-weight: 700; margin-bottom: 20px; line-height: 1.5; }
.modal-details-block { color: #4A5568; line-height: 1.7; font-size: 1.05rem; }

@media (max-width: 900px) {
  .hero-section { flex-direction: column; text-align: center; }
  .hero-actions { justify-content: center; flex-direction: column; }
  .social-proof { justify-content: center; }
  .floating-badge { left: 50%; transform: translateX(-50%); bottom: -20px; }
  .grid-3-cols { grid-template-columns: 1fr; }
}
</style>