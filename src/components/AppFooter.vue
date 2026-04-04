<template>
  <footer id="contact" class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col brand-col">
        <div class="footer-logo-container">
          <img src="/images/logo.png" alt="Logo Play 'N Ride" class="footer-logo-img" /> 
          <span class="logo-text-footer">Play <span class="text-cyan">'N</span> Ride</span>
        </div>
        <p class="footer-desc">Transformez vos exercices quotidiens en aventures interactives.</p>
        <ul class="contact-info">
          <li>
            <img src="/images/icon-mail.png" alt="Email" class="contact-icon" /> 
            contact@playnride.fr
          </li>
          <li>
            <img src="/images/icon-phone.png" alt="Téléphone" class="contact-icon" /> 
            +33 1 23 45 67 89
          </li>
          <li>
            <img src="/images/icon-carte.png" alt="Localisation" class="contact-icon" /> 
            Castres, France 81100
          </li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Produit</h4>
        <ul>
          <li><a href="#">Fonctionnalités</a></li>
          <li><a href="#">Tarifs</a></li>
          <li><a href="#">Témoignages</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Légal</h4>
        <ul>
          <li><a href="#">Mentions Légales</a></li>
          <li><a href="#">Confidentialité</a></li>
          <li><a href="#">CGU</a></li>
        </ul>
      </div>
    </div>
    
    <div class="container footer-bottom">
      <p>© 2026 Play 'N Ride. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #E8F8F5; 
  color: #4A5568; 
  padding: 80px 0 30px;
  font-size: 1rem;
  border-top: 1px solid #D1E8E2;
}

.footer-grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 60px;
}

.footer-col {
  flex: 1;
  min-width: 200px;
}

.brand-col {
  flex: 2;
}

/* --- ALIGNEMENT PARFAIT DU LOGO --- */
.footer-logo-container {
  display: flex;
  align-items: center; /* Aligne verticalement l'image et le texte */
  justify-content: flex-start; /* Aligne horizontalement au début */
  gap: 15px; /* Espace entre logo et texte */
  margin-bottom: 25px;
  line-height: 1; /* Force le texte à ne pas avoir de marges invisibles */
}

.footer-logo-img {
  height: 70px; /* Logo bien plus grand dans le footer */
  width: auto;
  object-fit: contain;
  display: block; /* Enlève l'espace blanc sous l'image */
}

.logo-text-footer {
  font-size: 2.2rem; /* Texte agrandi pour équilibrer le grand logo */
  font-weight: 900;
  color: #0A192F; 
  display: inline-block;
  margin: 0; /* Enlève les marges par défaut */
}

.text-cyan {
  color: #00B8D9;
}

.footer-desc {
  color: #4A5568;
  margin-bottom: 25px;
  max-width: 400px;
  line-height: 1.6;
}

.contact-info {
  list-style: none;
  padding: 0;
}

.contact-info li {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  color: #0A192F;
  font-weight: 700;
}

.contact-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  object-fit: contain;
}

.footer-col h4 {
  color: #0A192F;
  margin-bottom: 25px;
  font-size: 1.2rem;
  font-weight: 800;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col ul li {
  margin-bottom: 12px;
}

.footer-col ul li a {
  color: #4A5568;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.footer-col ul li a:hover {
  color: #00B8D9;
}

.footer-bottom {
  border-top: 1px solid #D1E8E2;
  padding-top: 30px;
  text-align: left;
  color: #6B7C93;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .footer-grid { flex-direction: column; }
}
</style>