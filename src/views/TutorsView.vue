<template>
    <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Преподаватели</h2>
        </div>
        <div class="container">
            <div><strong>Всего преподавателей: {{ cdoTutors.total_tutors }}</strong></div>
            <div class="has-text-centered">
            <table style="width:100%">
                <tr>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Подразделение</th>
                    <th>Внешник</th>
                </tr>
                <tr v-for="tutor in cdoTutors.data">
                    
                        <th  class="has-text-weight-light has-text-centered"> {{ tutor.name }}</th>
                        <th  class="has-text-weight-light has-text-centered"> {{ tutor.position }}</th>
                        <th  class="has-text-weight-light has-text-centered"> {{ tutor.department }}</th>
                        <th  class="has-text-weight-light has-text-centered"> {{ tutor.is_internal }}</th>
                </tr>
            </table>
        </div>
        </div>
    </div>
    </template>
    
    <script>
      import axios from 'axios';
      export default {
        data() {
            return {
                cdoTutors: []
            }
        },
        components: {
        },
        mounted() {
            this.getTutors()
            document.title = "Преподаватели | CdoGEO"
        },
        methods: {
            getTutors(){
            axios
                .get('api/v1/tutors')
                .then(response => {
                    this.cdoTutors = response.data
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