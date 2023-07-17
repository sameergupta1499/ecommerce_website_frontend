<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
@import '@/styles/globals.scss';

#app {
  font-family: Assistant,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  text-align: left;
  letter-spacing: .3px;
  font-size: 14px;
}
input[type="radio"] {
    display: none; /* Hide the default radio input */
  }
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
a {
  text-decoration: none; /* Remove underline */
  color: black; /* Set color to black */
}
</style>
