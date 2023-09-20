<template>
    <div class="column is-multiline">
        <div class="column is-12">
            <h2 class="is-size-2 has-text-centered">Преподаватели</h2>
        </div>
        <div class="container box">
            <div class="column is-one-third">
                    <div class="field">
                        <label class="label">Выберите подразделение для составления отчета</label>
                        <div class="select is-info">
                            <select class="form-control" v-model="selected_department_id">
                                <option v-for="department in departments" :value="department.id" :key="department.id">
                                        {{ department.name }}
                                </option>
                                    </select>
                        </div>
                    <button class="button is-info mt-2" type="submit" @click.stop.prevent="getTutors()">Собрать отчет</button>
                    <p class="help">Отчет не обновится, если не нажать на кнопку</p>
                    </div>
                </div>
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
                cdoTutors: [],
                department_id: 1,
                departments: {},
                selected_department_id: '0'
                }
        },
        components: {
        },
        mounted() {
            this.getDepartments()
            this.getTutors()
            document.title = "Преподаватели | CdoGEO"
        },
        methods: {
            getTutors(){
            axios
                .get('api/v1/tutors/'+this.selected_department_id)
                .then(response => {
                    this.cdoTutors = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            getDepartments(){
            axios
                .get('api/v1/departments')
                .then(response => {
                    this.departments = response.data
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