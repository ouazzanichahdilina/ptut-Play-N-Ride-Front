<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3 class="chart-title">Évolution de l'endurance</h3>
      <span class="chart-sub">Durée des {{ filteredSessions.length }} dernières séances (min)</span>
    </div>
    <div class="chart-wrapper">
      <Line v-if="hasData" :data="chartData" :options="chartOptions" />
      <div v-else class="empty-chart">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <p>Aucune séance enregistrée</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Tooltip, Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps({
  sessions:      { type: Array,  default: () => [] },
  currentUserId: { type: Number, required: true }
})

const filteredSessions = computed(() =>
  props.sessions
    .filter(s => s.patient?.id === props.currentUserId)
    .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut))
    .slice(-10)
)

const hasData = computed(() => filteredSessions.value.length > 0)

const fmt = iso => {
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`
}

const chartData = computed(() => ({
  labels: filteredSessions.value.map(s => fmt(s.dateDebut)),
  datasets: [{
    label: 'Durée (min)',
    data: filteredSessions.value.map(s => s.dureeMinutes ?? 0),
    borderColor: '#00B8D9',
    backgroundColor: 'rgba(0,184,217,0.08)',
    fill: true,
    tension: 0.4,
    pointBackgroundColor: '#20C997',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 7,
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0A192F',
      titleColor: '#fff',
      bodyColor: '#20C997',
      padding: 12,
      callbacks: { label: ctx => ` ${ctx.parsed.y} min` }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6B7C93', font: { weight: '700', size: 12 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#F1F5F9', drawBorder: false },
      ticks: { color: '#6B7C93', padding: 8 },
      title: { display: true, text: 'Durée (min)', color: '#94A3B8', font: { size: 11 } }
    }
  }
}
</script>

<style scoped>
.chart-card { background: white; border-radius: 16px; padding: 25px; border: 1px solid #E2E8F0; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.chart-header { margin-bottom: 20px; }
.chart-title { font-size: 1rem; font-weight: 900; text-transform: uppercase; color: #0A192F; letter-spacing: 0.5px; margin: 0 0 4px 0; }
.chart-sub { font-size: 0.8rem; color: #94A3B8; font-weight: 600; }
.chart-wrapper { height: 250px; position: relative; }
.empty-chart { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: #94A3B8; font-weight: 700; font-size: 0.9rem; }
.empty-chart p { margin: 0; }
</style>
