<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3 class="chart-title">Volume d'activité hebdomadaire</h3>
      <span class="chart-sub">{{ totalSessions }} séances au total</span>
    </div>
    <div class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

const props = defineProps({
  sessions: { type: Array, default: () => [] }
})

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const dayCounts = computed(() => {
  const counts = new Array(7).fill(0)
  props.sessions.forEach(s => {
    const day = new Date(s.dateDebut).getDay()
    counts[day === 0 ? 6 : day - 1]++  // 0=Dim → index 6
  })
  return counts
})

const totalSessions = computed(() => props.sessions.length)

const chartData = computed(() => ({
  labels: DAYS,
  datasets: [{
    label: 'Séances',
    data: dayCounts.value,
    backgroundColor: dayCounts.value.map((v, i) =>
      i % 2 === 0 ? 'rgba(0,184,217,0.85)' : 'rgba(32,201,151,0.85)'
    ),
    borderRadius: 8,
    borderSkipped: false,
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0A192F',
      titleColor: '#fff',
      bodyColor: '#20C997',
      padding: 12,
      callbacks: { label: ctx => ` ${ctx.parsed.y} séance${ctx.parsed.y > 1 ? 's' : ''}` }
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
      ticks: { color: '#6B7C93', stepSize: 1, padding: 8 },
      title: { display: true, text: 'Nb de séances', color: '#94A3B8', font: { size: 11 } }
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
</style>
