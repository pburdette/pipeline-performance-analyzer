<script>
import { CChartLine } from '@coreui/vue-chartjs'

export default {
  name: 'PipelineDurationChart',
  components: { CChartLine },
  props: {
    pipelines: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      const sorted = [...this.pipelines].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      )

      return {
        labels: sorted.map((p) => new Date(p.createdAt).toLocaleDateString()),
        datasets: [
          {
            label: 'Pipeline Duration (seconds)',
            data: sorted.map((p) => p.duration),
            fill: false,
            tension: 0.3,
          },
        ],
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            title: { display: true, text: 'Duration (seconds)' },
          },
          x: {
            title: { display: true, text: 'Date' },
          },
        },
      }
    },
  },
}
</script>

<template>
  <div style="width: 100%; height: 100%">
    <CChartLine :data="chartData" :options="chartOptions" />
  </div>
</template>
