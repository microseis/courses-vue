<template>
   <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Распределение слушателей по компаниям</h2>
        </div>
        <div class="container box">
            <p class="has-text-centered">Отчет по компаниям за {{year}} год</p>
            <div class="columns">
            <div class="column ">
                <div class="column is-one-quarter ">
                    <div class="field">
                        <label class="label">Укажите год для составления отчета</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="2023"  name="year" v-model="year">
                            <button class="button is-info mt-2" type="submit" @click.stop.prevent="getCompanies()">Собрать отчет</button>
                    </div>
                    <p class="help">Отчет не обновится, если не нажать на кнопку</p>
                    </div>
                </div>
            <div><strong>Всего компаний: {{ сompanies_report.total_companies }}</strong></div>
            <div><strong>Всего слушателей: {{ сompanies_report.total_attendees }}</strong></div>
            <table>
                <tr>
                    <th class="has-text-centered ">Название компании</th>
                    <th class="has-text-centered">Количество слушателей</th>
                    <th class="has-text-centered">Средства</th>
                    
                </tr>
                <tr v-for="company in сompanies_report.data">
                    <th class="has-text-centered has-text-weight-light"> {{ company.company }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ company.company_attendees }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ company.amount_spent }}</th>
               </tr> 
            </table>
        </div>
    </div>
</div>
    </div>
</template>


<script>
import axios from 'axios';


    export default {
    data() {
        return {
            сompanies_report: [],
            year: 2023
        }
    },

    
    mounted() {
        this.getCompanies()
        document.title = "Отчет по компаниям | CdoGEO"
        
    },
    methods: {
        getCompanies(){
        axios
            .get('api/v1/attendees-by-company/'+this.year)
            .then(response => {
                this.сompanies_report = response.data
                
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