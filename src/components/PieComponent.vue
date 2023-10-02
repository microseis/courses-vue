<template>
      <Pie
    id="my-doughnut-id"
    :options="chartOptions"
    :data="chartData"
  />

</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement)

export default {
  name: 'DoughnutChart',
  props: ['labelsdata', 'chartdata', 'label'],
  components: { Pie },
  computed: {
    chartData () {
      return {
        labels: this.labelsdata.slice(0, 20),
        datasets: [{
          label: this.label,
          data: this.chartdata.slice(0, 20),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      }
    },
    chartOptions () {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            display: true
          },
          title: {
            display: true,
            text: ''
          }
        }

      }
    }
  }

}

</script>
