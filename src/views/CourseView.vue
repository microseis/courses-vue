<template>
    <div class="page-course">
        <div class="columnm is-multiline box">
            <div class="column is-9">
                <h1 v-bind:src="course"><strong>{{ course.name }}</strong></h1>
                <p> Даты проведения: {{ formatDate(course.start_date)  }} - {{ formatDate(course.end_date)  }}</p>
                <p> Стоимость на 1 чел.: {{ course.price_per_attendee }} руб.</p>
                <p> Направление: {{ course.area }}</p>
                <p> Кол-во ак. часов: {{ course.hours }}</p>
                <p> Количество слушателей: {{ course.total_attendees }} чел.</p>
                <p> Получено: {{ course.total_earned }} руб.</p>
                <p> Участвующие компании:</p>
                <div class="ml-5">
                    <ol>
                        <li v-for="company in course.companies_list"> {{ company }}</li>
                    </ol>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name: 'course',
    data() {
        return {
            course: {}
        }
    },
    mounted() {
        this.getCourse()
    },
    methods: {
        formatDate(value) {
        if (value) {
        return moment(String(value)).format('DD.MM.YYYY')
    }
        },
        getCourse() {
            const course_id = this.$route.params.course_id
            axios
            .get(`api/v1/course/${course_id}`)
            .then( response => {
                this.course =response.data

                document.title = this.course.name + ' | CdoGEO '
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>