<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Вход в аккаунт</h1>
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Имя пользователя</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>
                    <div class="field">
                        <label>Пароль</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Войти</button>
                            <br>
                            или <router-link to="/sign-up">зарегистрируйтесь</router-link>, если у вас нет аккаунта
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import cookie from 'cookie'
export default {
  name: 'LogIn',
  data () {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted () {
    document.title = 'Вход в аккаунт | CdoGEO'
  },

  methods: {
    async submitForm () {
      axios.defaults.headers.common.Authorization = ''

      localStorage.removeItem('token')

      const formData = {
        username: this.username,
        password: this.password
      }
      await axios
        .post('/api/v1/token/login/', { withCredentials: true },
          {
            headers: { 'X-CSRFToken': cookie.get('csrftoken') }
          }, formData)
        .then(response => {
          const token = response.data.auth_token

          this.$store.commit('setToken', token)
          axios.defaults.headers.common.Authorization = 'Token' + token
          localStorage.setItem('token', token)

          const toPath = this.$route.query.to || '/courses'

          this.$router.push(toPath)
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`)
            }
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            this.errors.push('Что-то пошло не так. Попробуйте еще раз')
            console.log(JSON.stringify(error))
          }
        })
    }
  }
}
</script>
