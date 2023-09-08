<template>
<div class="column is-multiline">
    <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Курсы</h2>
    </div>
    <div class="container">
        <div class="notification is-primary"
        v-for="course in cdoCourses" 
        v-bind:key="course.results">
            <a class="is-size-4" v-bind:href="'/courses/'+ course.id">{{ course.name }}</a>
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