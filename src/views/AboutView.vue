<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div> {{ greet }} {{ name }}</div>
    <h2 class="underline">Happy Coding</h2>
    <button v-bind:disabled="isDisabled" class ="button is-success mt-1">Some Button</button>
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
