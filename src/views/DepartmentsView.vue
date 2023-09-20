<template>
    <div class="column is-multiline">
         <div class="column is-12">
             <h2 class="is-size-2 has-text-centered">Распределение {{ report_metric }} по подразделениям </h2>
         </div>
         <div class="container box">
             <p class="has-text-centered">Отчет по подразделениям за {{year}} год</p>
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
                             <button class="button is-info mt-2" type="submit" @click.stop.prevent="getTutors()">Собрать отчет</button>
                     </div>
                     <p class="help">Отчет не обновится, если не нажать на кнопку</p>
                     </div>
                 </div>
             <strong>Всего подразделений: {{ sum_tutors.length }}</strong> <br>
             <strong>Всего часов: {{  getSumHours }}</strong> <br>
             <strong>Всего выплачено средств: {{  getSumIncomes }}</strong>
             <table>
                 <tr>
                     <th class="has-text-centered ">Подразделение</th>
                     <th class="has-text-centered">Количество часов</th>
                     <th class="has-text-centered">Выплачено средств, руб.</th>
                     
                 </tr>
                 <tr v-for="tutor in sum_tutors">
                     <th class="has-text-centered has-text-weight-light"> {{ tutor.tutor__department__name }}</th>
                     <th class="has-text-centered has-text-weight-light"> {{ tutor.hours_given }}</th>
                     <th class="has-text-centered has-text-weight-light"> {{ tutor.salary_paid }}</th>
                </tr> 
             </table>
         </div>
         <div class="column"> 
         <div class="row mb-3"> 
                 <DoughnutChart :labelsdata=getTutorsNames :chartdata=getTutorsIncomes :label=label_2></DoughnutChart>
             </div>
             <div class="row"> 
                 <DoughnutChart :labelsdata=getTutorsNames :chartdata=getTutorsHours :label=label_1></DoughnutChart>
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
             tutors_report: [],
             sum_tutors: [],
             year: 2023,
             label_1: "Часы",
             label_2: "Выплаченные средства, руб.",
             sorting_selector: [{id: 1, name: "По количеству часов"}, {id:2, name: "По количеству средств"}],
             sorting: ''
         }   
     },
     mounted() {
         this.getTutors()
         document.title = "Отчет по преподавателям | CdoGEO"
         
         
     },
 
     computed: {
         
         getTutorsNames: function () {
           return this.sum_tutors.map(a => a.tutor__department__name);
             },

        getTutorsIncomes: function () {
           return this.sum_tutors.map(a => a.salary_paid);
             },
        getTutorsHours: function () {
           return this.sum_tutors.map(a => a.hours_given);
             },

         getSumHours: function(){
             let sum = 0;
             this.getTutorsHours.forEach( num => {
                 sum += num;
     
             })
             return sum
         },
 
         getSumIncomes: function() {
             let sum = 0;
             this.getTutorsIncomes.forEach( num => {
                 sum += num;
             })
             return sum
         },
 
     },
     components: {
     DoughnutChart 
     },
 
     methods: {
         getTutors(){
         axios
             .get('api/v1/tutors-income/'+this.year)
             .then(response => {
                 this.tutors_report = response.data
 
                 this.sum_tutors = response.data.data.reduce((acc, cur) => {
                     let inacc = false;
                     acc.forEach(o => {
                         if (o.tutor__department__name == cur.tutor__department__name) { 
                         o.salary_paid += cur.salary_paid;
                         o.hours_given += cur.hours_given
                         inacc = true;
                         }
                     });
                     if (!inacc) {
                         acc.push(cur);
                     }
                     if (this.sorting==1) {
                         return acc.sort((a, b) => b.hours_given -a.hours_given )
                     } else {
                         return acc.sort((a, b) => b.salary_paid -a.salary_paid )
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