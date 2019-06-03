<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.KeepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade">
      <router-view v-if="!$route.meta.KeepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
      return{
        transitionName:""
      }
  },
  watch: {
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
