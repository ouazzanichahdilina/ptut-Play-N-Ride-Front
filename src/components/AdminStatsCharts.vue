<template>
  <div class="admin-charts">
    <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-title">Répartition des comptes</h3>
        <span class="chart-sub">{{ statusCounts.patient + statusCounts.professionnel }} utilisateurs inscrits</span>
      </div>
      <div class="chart-wrapper">
        <Pie v-if="hasUsers" :data="statusData" :options="pieOptions" />
        <div v-else class="empty-chart">Aucun utilisateur</div>
      </div>
      <div class="legend-pills">
        <span class="pill" style="background:#EAF7F9;color:#00B8D9">Patients · {{ statusCounts.patient }}</span>
        <span class="pill" style="background:#E8F8F5;color:#20C997">Praticiens · {{ statusCounts.professionnel }}</span>
      </div>
    </div>

    <div class="chart-card">
      <div class="chart-header">
        <h3 class="chart-title">Répartition par sexe</h3>
        <span class="chart-sub">{{ genderCounts.H + genderCounts.F }} renseignés</span>
      </div>
      <div class="chart-wrapper">
        <Bar v-if="hasUsers" :data="genderData" :options="barOptions" />
        <div v-else class="empty-chart">Aucun utilisateur</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Pie, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const props = defineProps({
  users: { type: Array, default: () => [] }
})

const hasUsers = computed(() => props.users.length > 0)

// --- Répartition par statut ---
const statusCounts = computed(() => {
  const counts = { patient: 0, professionnel: 0 }
  props.users.forEach(u => {
    const s = (u.statut || '').toLowerCase()
    if (s === 'patient') counts.patient++
    else if (s === 'professionnel' || s === 'pro') counts.professionnel++
  })
  return counts
})

const statusData = computed(() => ({
  labels: ['Patients', 'Praticiens'],
  datasets: [{
    data: [statusCounts.value.patient, statusCounts.value.professionnel],
    backgroundColor: ['#00B8D9', '#20C997'],
    borderWidth: 0,
    hoverOffset: 6,
  }]
}))

// --- Répartition par sexe ---
const genderCounts = computed(() => {
  let H = 0, F = 0
  props.users.forEach(u => { if (u.sexe === 'H') H++; else if (u.sexe === 'F') F++ })
  return { H, F }
})

const genderData = computed(() => ({
  labels: ['Hommes', 'Femmes'],
  datasets: [{
    data: [genderCounts.value.H, genderCounts.value.F],
    backgroundColor: ['rgba(0,184,217,0.85)', 'rgba(244,114,182,0.85)'],
    borderRadius: 10,
    borderSkipped: false,
  }]
}))

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0A192F',
      titleColor: '#fff',
      bodyColor: '#94A3B8',
      padding: 12,
    }
  }
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0A192F',
      padding: 12,
      callbacks: { label: ctx => ` ${ctx.parsed.y} utilisateur${ctx.parsed.y > 1 ? 's' : ''}` }
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#6B7C93', font: { weight: '700', size: 13 } } },
    y: {
      beginAtZero: true,
      grid: { color: '#F1F5F9', drawBorder: false },
      ticks: { color: '#6B7C93', stepSize: 1, padding: 8 },
    }
  }
}
</script>

<style scoped>
.admin-charts { display: flex; gap: 20px; flex-wrap: wrap; }
.chart-card { flex: 1; min-width: 260px; background: white; border-radius: 16px; padding: 25px; border: 1px solid #E2E8F0; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.chart-header { margin-bottom: 20px; }
.chart-title { font-size: 0.95rem; font-weight: 900; text-transform: uppercase; color: #0A192F; letter-spacing: 0.5px; margin: 0 0 4px 0; }
.chart-sub { font-size: 0.8rem; color: #94A3B8; font-weight: 600; }
.chart-wrapper { height: 200px; position: relative; }
.empty-chart { height: 100%; display: flex; align-items: center; justify-content: center; color: #94A3B8; font-weight: 700; font-size: 0.9rem; }
.legend-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.pill { padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; }
</style>
