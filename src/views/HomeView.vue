<template>
<div class="column is-multiline">
    <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Курсы</h2>
    </div>
    <div class="container">
        <div class="notification is-primary"
        v-for="course in cdoCourses" 
        v-bind:key="course.results"
        >
            <h3 class="is-size-4" >{{ course.name }}</h3>
            <p class="is-size-5">Даты проведения: {{ course.start_date }} - {{ course.end_date }}</p>
            <p class="is-size-5"> Стоимость: {{ course.price_per_attendee }} руб.</p>
            <p></p>
        </div>

    </div>
</div>
</template>

<script>
  import axios from 'axios';
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
    },
    methods: {
        getCdoCourses(){
        axios
            .get('api/v1/list-courses/2022')
            .then(response => {
                this.cdoCourses = response.data["results"]
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
  }
</script>

<style>

.column {
 
    background-color:rgb(255, 255, 255);
}
</style>