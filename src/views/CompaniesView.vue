<template>
   <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Компании</h2>
        </div>
        <div class="container">
            <p class="has-text-centered">Отчет по компаниям за весь период сбора данных с 2022 по {{ currYear }} г.</p>
            <div class="columns">
            <div class="column">
            <div><strong>Всего компаний: {{ cdoCompanies.total_companies }}</strong></div>
            <div><strong>Всего слушателей: {{ listeners_count }}</strong></div>
            <table style="width:100%">
                <tr>
                    <th class="has-text-centered ">Название компании</th>
                    <th class="has-text-centered">Подразделение</th>
                    <th class="has-text-centered">Страна</th>
                    <th class="has-text-centered">Всего слушателей</th>
                </tr>
                <tr v-for="cdo_company in cdoCompanies_sorted">
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.name }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.head_company }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.country }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ cdo_company.total_attendees }}</th>
                </tr> 
            </table>
        </div>
        <div class="column"> 
                <BarCharts :labelsdata="getCompaniesNames" :chartdata="getCompaniesAttendees"></BarCharts>
            </div>
    </div>
</div>
    </div>

    </template>
    
<script>
    import axios from 'axios';
    import BarCharts from '../components/ChartComponent.vue'

    export default {
    data() {
        return {
            cdoCompanies: [],
            cdoCompanies_sorted: [],
            all_attendees: {},
            currYear: new Date().getFullYear(),
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
      return this.cdoCompanies_sorted.map(a => a.name);
        },
    getCompaniesAttendees: function () {
      return this.cdoCompanies_sorted.map(a => a.total_attendees);
        },
    listeners_count: function() {
      return this.getCompaniesAttendees.reduce((partialSum, a) => partialSum + a, 0)
    },
    },

    components: {
    BarCharts 
    },
    
    mounted() {
        this.getCompanies()
        document.title = "Компании | CdoGEO"
        
    },
    methods: {
        getCompanies(){
        axios
            .get('api/v1/companies')
            .then(response => {
                this.cdoCompanies_sorted = response.data["data"].sort((a, b) => b.total_attendees -a.total_attendees );
                this.cdoCompanies = response.data
                
            })
            .catch(error => {
                console.log(error)
            })
        },
    }
    }
</script>

<style>

table, th, td {
border:1px solid black;
}

</style>