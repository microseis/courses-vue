<template>
    <div class="page-my-accont">
        <div class="column is-multiline">
            <div class="column is-12">
                <h1 class="title">Мой аккаунт</h1>
            </div>
        <div class="column is-12">
            <button @click="logout()" class="button is-danger">Выйти из аккаунта</button>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyAccount',
  methods: {
    logout () {
      axios.defaults.headers.common.Authorization = ''
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')

      this.$store.commit('removeToken')
      this.$router.push('/')
    }
  }
}
</script>
