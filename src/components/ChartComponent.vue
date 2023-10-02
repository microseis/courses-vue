<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  props: ['labelsdata', 'chartdata', 'label', 'backgroundColor', 'borderColor'],
  components: { Bar },
  computed: {
    chartData () {
      return {
        labels: this.labelsdata.slice(0, 12),
        datasets: [{
          label: this.label,
          data: this.chartdata.slice(0, 12),
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      }
    },
    chartOptions () {
      return { responsive: true }
    }
  }
}
</script>
