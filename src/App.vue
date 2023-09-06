<template>
  <div id="wrapper" >
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><strong><tag class="has-text-white">My App</tag></strong></router-link>
        <a class="navbar-burger" aria-label="false" data-target="navbar-menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navbar-menu">
        <div class="navbar-end">
          <router-link to="/some-another-link" class="navbar-item">Some Another Link</router-link>
          <router-link to="/some-link" class="navbar-item">Some Link</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light">Log In</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view/>
    </section>
    
    <footer class="footer">
      <p class="has-text-centered">Copyright 2023 (c)</p>
    </footer>  
  </div> 
  
  </template>
  
  <script>
  
  export default {
    name: 'App',
    data() {
      return {name: "Alexey",
              greet: "Hello,",
             isDisabled: false};
    }
  }
  </script>
  
  <style lang="scss">
  @import '../node_modules/bulma';
  </style>
  