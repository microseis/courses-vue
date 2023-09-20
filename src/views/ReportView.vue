<template>
   <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Распределение слушателей по компаниям</h2>
        </div>
        <div class="container box">
            <p class="has-text-centered">Отчет по компаниям за {{year}} год</p>
            <div class="columns">
            <div class="column is-9">
                <div class="column is-4 ">
                    <div class="field">
                        <label class="label">Укажите год для составления отчета</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="2023"  name="year" v-model="year">
                            <div class="select is-info mt-2">
                            <select class="form-control" v-model="sorting">
                                <option v-for="item in sorting_selector" :value="item.id" :key="item.id">
                                        {{ item.name }}
                                </option>
                            </select>
                        </div>
                            <button class="button is-info mt-2" type="submit" @click.stop.prevent="getCompanies()">Собрать отчет</button>
                    </div>
                    <p class="help">Отчет не обновится, если не нажать на кнопку</p>
                    </div>
                </div>
            <strong>Всего компаний: {{ getCompaniesNames.length }}</strong> <br>
            <strong>Всего слушателей: {{  getSumAttendees }}</strong> <br>
            <strong>Всего средств: {{  getSumSpent }}</strong>
            <table>
                <tr>
                    <th class="has-text-centered ">Название компании</th>
                    <th class="has-text-centered">Количество слушателей</th>
                    <th class="has-text-centered">Средства, руб.</th>
                    
                </tr>
                <tr v-for="company in sum_companies">
                    <th class="has-text-centered has-text-weight-light"> {{ company.company }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ company.company_attendees }}</th>
                    <th class="has-text-centered has-text-weight-light"> {{ company.amount_spent }}</th>
               </tr> 
            </table>
        </div>
        <div class="column"> 
        <div class="row mb-3"> 
                <DoughnutChart :labelsdata=getCompaniesNames :chartdata=getAmountSpent :label=label_2></DoughnutChart>
            </div>
            <div class="row"> 
                <DoughnutChart :labelsdata=getCompaniesNames :chartdata=getAttendees :label=label_1></DoughnutChart>
            </div>
        </div>
        
    </div>
</div>
    </div>
</template>


<script>
    import axios from 'axios';
    import DoughnutChart from '../components/PieComponent.vue'



    export default {
    data() {
        return {
            companies_report: [],
            sum_companies: [],
            year: 2023,
            label_1: "Количество человек",
            label_2: "Средства, руб.",
            sorting_selector: [{id: 1, name: "По количеству средств"}, {id:2, name: "По количеству слушателей"}],
            sorting: ''
        }   
    },
    mounted() {
        this.getCompanies()
        document.title = "Отчет по компаниям | CdoGEO"
        
        
    },

    computed: {
        
        getCompaniesNames: function () {
          return this.sum_companies.map(a => a.company);
            },
        getAmountSpent: function () {
          return this.sum_companies.map(a => a.amount_spent);
            },
        getAttendees: function () {
          return this.sum_companies.map(a => a.company_attendees);
            },

        getSumAttendees: function(){
            let sum = 0;
            this.getAttendees.forEach( num => {
                sum += num;
    
            })
            return sum
        },

        getSumSpent: function() {
            let sum = 0;
            this.getAmountSpent.forEach( num => {
                sum += num;
            })
            return sum
        },

    },
    components: {
    DoughnutChart 
    },

    methods: {
        getCompanies(){
        axios
            .get('api/v1/attendees-by-company/'+this.year)
            .then(response => {
                this.companies_report = response.data

                this.sum_companies = response.data.data.reduce((acc, cur) => {
                    let inacc = false;
                    acc.forEach(o => {
                        if (o.company == cur.company) { 
                        o.amount_spent += cur.amount_spent;
                        o.company_attendees += cur.company_attendees
                        inacc = true;
                        }
                    });
                    if (!inacc) {
                        acc.push(cur);
                    }
                    if (this.sorting==1) {
                        return acc.sort((a, b) => b.amount_spent -a.amount_spent )
                    } else {
                        return acc.sort((a, b) => b.company_attendees -a.company_attendees )
                    };
                    }, []);

            })
            .catch(error => {
                console.log(error)
            })
        },
    }
    }
</script>

<style>

</style>