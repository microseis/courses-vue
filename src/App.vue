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
          <router-link to="/chart" class="navbar-item">Отчеты</router-link>
          <router-link to="/tutors" class="navbar-item">Преподаватели</router-link>
          <router-link to="/companies" class="navbar-item">Компании</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light">Войти</router-link>
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
  export default {
  data() {
    return {
      currYear: new Date().getFullYear(),
    };
  },
};
  </script>
  
  <style lang="scss">
  @import '../node_modules/bulma';
  </style>
  