<template>
<div class="column is-multiline">
    <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Курсы</h2>
    </div>
    <div class="container">
        <div class="notification is-primary"
        v-for="course in cdoCourses" 
        v-bind:key="course.results">
            <a class="is-size-4" v-bind:href="'/course/'+
             course.id">{{ course.name }} ({{formatDate(course.start_date)}} - {{ formatDate(course.end_date) }})</a>
            <p></p>
        </div>

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
        document.title = "Главная | CdoGEO"
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

</style>