<template>
    <div class="column is-half" style="height: 5%;">
      <div class="row is-half">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
    
  
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'BarCharts',
  setup() {
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 }
    ]
    const canvasRef = ref(null)
    onMounted(() => {
      new Chart(canvasRef.value, {
        type: 'bar',
        data: {
          labels: data.map((row) => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: data.map((row) => row.count)
            }
          ]
        }
      })
    })
    return { canvasRef }
  }
})
</script>