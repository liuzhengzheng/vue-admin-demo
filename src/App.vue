<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'app'
  }
</script>

<style>
@import "./assets/styles/main.css";

#app {
  font-family: "Ping Fang", "微软雅黑", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-width: 880px;
  overflow: hidden;
}
</style>
