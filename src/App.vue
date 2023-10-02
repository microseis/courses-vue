<template>
  <div id="wrapper" >
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong><tag class="has-text-white">Cdo Admin</tag></strong></router-link>
        <a class="navbar-burger" aria-label="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-end">
          <router-link to="/about" class="navbar-item">О центре</router-link>
          <template v-if="$store.state.isAuthenticated">
            <router-link to="/tutors" class="navbar-item">Преподаватели</router-link>
            <router-link to="/companies" class="navbar-item">Компании</router-link>
            <router-link to="/courses/2022/1" class="navbar-item">Курсы</router-link>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Отчеты
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  <router-link to="/reports" class="navbar-item">Компании</router-link>
                </a>
                <a class="navbar-item">
                  <router-link to="/tutors-income" class="navbar-item">Преподаватели</router-link>
                </a>
                <a class="navbar-item">
                  <router-link to="/departments" class="navbar-item">Подразделения</router-link>
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  <router-link to="/contact" class="navbar-item">Задать вопрос</router-link>
                </a>
              </div>
            </div>
        </template>

          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/my-account" class="button is-light">Мой аккаунт</router-link>
            </template>
            <template v-else>
                <router-link to="/log-in" class="button is-light">Войти</router-link>
            </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view/>
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright {{currYear}} &copy;</p>
    </footer>
  </div>

  </template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      currYear: new Date().getFullYear()
    }
  },
  beforeCreate () {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
      axios.defaults.headers.common.Authorization = 'Token' + token
    } else {
      axios.defaults.headers.common.Authorization = ''
    }
  }
}
</script>

  <style lang="scss">
  @import '../node_modules/bulma';

  table, th, td {
    border:1px solid black;
    }
  </style>
