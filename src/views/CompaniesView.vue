<template>
   <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Компании</h2>
        </div>
        <div class="container">
            <p class="has-text-centered">Отчет по компаниям за весь период сбора данных с 2021 по {{ currYear }} г.</p>
            <div class="columns">
            <div class="column">
            <div><strong>Всего компаний: {{ cdoCompanies_sorted.length }}</strong></div>
            <div><strong>Всего слушателей: {{ listeners_count }}</strong></div>
            <table style="width:100%">
                <tr>
                    <th class="has-text-centered ">Название компании</th>
                    <th class="has-text-centered">Страна</th>
                    <th class="has-text-centered">Всего слушателей</th>
                </tr>
                <tr v-for="cdo_company in cdoCompanies_sorted" :key="cdo_company.id">
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.name }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.country }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.total_attendees }}</th>
                </tr>
            </table>
        </div>
        <div class="column">
                <BarChart :labelsdata="getCompaniesNames" :chartdata="getCompaniesAttendees" :label="'Количество слушателей'" :backgroundColor="chartBackgroundColor" :borderColor="chartBorderColor"></BarChart>
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
      cdoCompanies: [],
      cdoCompanies_sorted: [],
      all_attendees: {},
      chartBackgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      chartBorderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      currYear: new Date().getFullYear()
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
    }
  },
  computed: {

    getCompaniesNames: function () {
      return this.cdoCompanies_sorted.map(a => a.name)
    },
    getCompaniesAttendees: function () {
      return this.cdoCompanies_sorted.map(a => a.total_attendees)
    },
    listeners_count: function () {
      return this.getCompaniesAttendees.reduce((partialSum, a) => partialSum + a, 0)
    }
  },

  components: {
    BarChart
  },

  mounted () {
    this.getCompanies()
    document.title = 'Компании | CdoGEO'
  },
  methods: {
    getCompanies () {
      axios
        .get('api/v1/companies')
        .then(response => {
          this.cdoCompanies_sorted = response.data.data.reduce((acc, cur) => {
            let inacc = false
            acc.forEach(o => {
              if (o.name === cur.name) {
                o.total_attendees += cur.total_attendees
                inacc = true
              }
            })
            if (!inacc) {
              acc.push(cur)
            }

            return acc.sort((a, b) => b.total_attendees - a.total_attendees)
          }, [])
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
