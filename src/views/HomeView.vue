<template>
  <main>
    <section class="hero-section container">
      <div class="hero-content">
        <div class="badge badge-light-blue">Rééducation & Fitness connectés</div>
        <h1>L'activité physique devient <span class="text-green">un jeu.</span></h1>
        <p class="subtitle">Transformez vos séances d'effort en aventures interactives. Connectez votre équipement et évadez-vous depuis chez vous ou votre centre de soin.</p>
        <div class="hero-actions">
          <button class="btn btn-solid-green btn-large icon-btn" @click="$router.push('/guest-dashboard')">▶ MODE LIBRE</button>
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
</template>

<script setup>
import { ref } from 'vue'

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
/* CLASSE AJOUTÉE POUR LE TITRE PLAY 'N RIDE */
.logo-inline {
  color: #0A192F;
  font-weight: 900;
}
.text-cyan {
  color: #00B8D9;
}

.grid-3-cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px; 
  margin-top: 40px;
}
.card {
  background: white;
  padding: 50px 40px; 
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 400px; 
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
}

.card-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%; 
  margin-bottom: 35px;
}

.custom-card-icon {
  width: 180px;  
  height: 180px; 
  object-fit: contain; 
}

.card h3 {
  font-size: 1.6rem;
  color: #0A192F;
  margin-bottom: 15px;
  font-weight: 800;
}
.card p {
  font-size: 1.1rem;
  color: #4A5568;
  line-height: 1.6;
  flex-grow: 1; 
}
.audience-card .target-label {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #8A9AAD;
  margin-bottom: 10px;
  flex-grow: 0;
}
.feature-list {
  list-style: none;
  padding: 0;
  margin: 25px 0;
}
.feature-list li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  font-size: 1.05rem;
  color: #2D3748;
}
.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #00B8D9;
  font-weight: bold;
}
.learn-more {
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: auto;
}

.modal-icon-wrapper {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.modal-icon-wrapper .custom-card-icon {
  width: 80px; 
  height: 80px;
}
</style>