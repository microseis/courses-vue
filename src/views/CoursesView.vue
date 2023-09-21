<template>
    <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Курсы - {{ year }}</h2>
        </div>
        <div class="container box">
            <nav class="pagination" role="navigation" aria-label="pagination">
                <a class="pagination-previous" v-bind:href="'/courses/'+year+'/'+previous_page">Предыдущая</a> 
                <a class="pagination-next" v-bind:href="'/courses/'+year+'/'+next_page">Следующая</a>
                <ul class="pagination-list">
                    <li>
                    <a class="pagination-link" aria-label="Перейти на страницу 1"  v-bind:href="'/courses/2022/1'">1</a>
                    </li>
                    <li>
                    <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                    <a class="pagination-link" aria-label="Перейти на страницу `${{previous_page}}`" 
                    v-bind:href="'/courses/'+year+'/'+previous_page">{{previous_page}}</a>
                    </li>
                    <li>
                    <a class="pagination-link is-current" aria-label="Page `${{current_page_number }}`" 
                    aria-current="page" v-bind:href="'/courses/'+year+'/'+current_page_number">{{current_page_number}}</a>
                    </li>
                    <li>
                    <a class="pagination-link" aria-label="Перейти на страницу `${{next_page}}`" 
                     v-bind:href="'/courses/'+year+'/'+next_page">{{next_page}}</a>
                    </li>
                    <li>
                    <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                    <a class="pagination-link" aria-label="Перейти на страницу `${{total_pages}}`"  
                     v-bind:href="'/courses/'+year+'/'+total_pages" >{{total_pages}}</a>
                    </li>
                </ul>
                </nav>
            <table>
                    <tr>
                        <th class="has-text-centered is-size-4">Название курса</th>
                        <th class="has-text-centered is-size-4">Тип программы</th>
                        <th class="has-text-centered is-size-4">Даты проведения</th>
                    </tr>
                    <tr v-for="course in cdoCourses" v-bind:key="course.results">
                        <th class="has-text-left has-text-weight-light pl-1"> <a class="is-size-4" v-bind:href="'/course/'+course.id">{{ course.name }}</a></th>
                        <th class="has-text-left has-text-weight-light pl-1 is-size-4"> {{ course.type }}</th>
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
                cdoCourses: [],
                current_page_number: null,
                next_page: null,
                previous_page: null,
                total_pages: null,
                year: null
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
                const year = this.$route.params.year
                axios
                    .get(`api/v1/courses/${this.$route.params.year}/?page=${this.$route.params.page}`)
                    .then(response => {
                        this.cdoCourses = response.data["results"]
                        this.total_pages = response.data.total_pages
                        this.current_page_number = response.data.current_page_number
                        this.next_page = +this.$route.params.page + 1
                        this.previous_page = +this.$route.params.page -1
                        this.year = this.$route.params.year
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            formatDate(value) {
            if (value) {
            return moment(String(value)).format('DD.MM.YYYY')
                }
            },
      }
    }
    </script>
    
    <style>
    table { 
               width:100%;
    }
    </style>