<template>
    <div class="column is-multiline">
         <div class="column is-12">
             <h2 class="is-size-2 has-text-centered">Распределение курсов по месяцам </h2>
         </div>
         <div class="container box">
             <p class="has-text-centered">Отчет по курсам за {{year}} год</p>
             <div class="columns">
             <div class="column">
                 <div class="column is-3">
                     <div class="field">
                         <label class="label">Укажите год для составления отчета</label>
                         <div class="control">
                             <input class="input" type="text" placeholder="2023"  name="year" v-model="year">
                             <button class="button is-info mt-2" type="submit" @click.stop.prevent="getCoursesByMonth()">Собрать отчет</button>
                     </div>
                     <p class="help">Отчет не обновится, если не нажать на кнопку</p>
                     </div>
                 </div>
             <strong>Всего курсов: {{  courses_count }}</strong> <br>
             <div class="row">
                <div class="columns">
                <div class="column">
                    <table>
                        <tr>
                            <th class="has-text-centered ">Месяц</th>
                            <th class="has-text-centered">Количество курсов</th>
                        </tr>
                        <tr v-for="course in coursesByMonth" :key="course.id">
                            <th class="has-text-centered has-text-weight-light"> {{ course.month }}</th>
                            <th class="has-text-centered has-text-weight-light"> {{ course.count }}</th>
                        </tr>
                    </table>
                </div>
            <div class="column">
                <BarChart :labelsdata="getCourseMonths" :chartdata="getCourseAmounts" :label='"Количество курсов за месяц"' :backgroundColor="chartBackgroundColor" :borderColor="chartBorderColor"></BarChart>
            </div>
        </div>
        </div>
         </div>
     </div>
 </div>
     </div>
 </template>

<script>
import axios from 'axios'
import BarChart from '../components/ChartComponent.vue'

export default {
  data () {
    return {
      coursesByMonth: [],
      year: 2022,
      currYear: new Date().getFullYear(),
      chartBackgroundColor: [
        'rgba(54, 162, 235, 0.2)'
      ],
      chartBorderColor: [
        'rgb(54, 162, 235)'
      ]
    }
  },
  props: {
    labelsdata: {
      type: [Array, Object],
      required: true
    },
    chartdata: {
      type: [Array, Object],
      required: true
    },
    backgroundColor: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {

    getCourseMonths: function () {
      return this.coursesByMonth.map(a => a.month)
    },
    getCourseAmounts: function () {
      return this.coursesByMonth.map(a => a.count)
    },
    courses_count: function () {
      return this.getCourseAmounts.reduce((partialSum, a) => partialSum + a, 0)
    }
  },

  components: {
    BarChart
  },

  mounted () {
    this.getCoursesByMonth()
    document.title = 'Статистика по курсам | CdoGEO'
  },
  methods: {
    getCoursesByMonth () {
      axios
        .get('api/v1/courses-by-month/' + this.year)
        .then(response => {
          this.coursesByMonth = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

 <style>

 </style>
