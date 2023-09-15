<template>
    <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Курсы</h2>
        </div>
        <div class="container box">
            <table>
                    <tr>
                        <th class="has-text-centered is-size-4">Название курса</th>
                        <th class="has-text-centered is-size-4">Даты проведения</th>
                    </tr>
                    <tr v-for="course in cdoCourses" v-bind:key="course.results">
                        <th class="has-text-left has-text-weight-light pl-1"> <a class="is-size-4" v-bind:href="'/course/'+course.id">{{ course.name }}</a></th>
                        <th class="has-text-left has-text-weight-light is-size-4 pl-1"> {{formatDate(course.start_date)}} - {{ formatDate(course.end_date) }}</th>
              </tr> 
                </table>
        </div>
    </div>
    </template>
    
    <script>
      import axios from 'axios';
      import moment from 'moment';
      export default {
        data() {
            return {
                cdoCourses: []
            }
        },
        components: {
        },
        mounted() {
            this.getCdoCourses()
            document.title = "Все курсы | CdoGEO"
        },
        methods: {
            getCdoCourses(){
            axios
                .get('api/v1/courses/2022')
                .then(response => {
                    this.cdoCourses = response.data["results"]
                })
                .catch(error => {
                    console.log(error)
                })
            },
            formatDate(value) {
            if (value) {
            return moment(String(value)).format('DD.MM.YYYY')
            }
        }
        }
      }
    </script>
    
    <style>
    table { 
               width:100%;
    }
    
    </style>