/**
* 首先recommned模版之banner
* @author tengqingya
* @create 2017-05-2017/5/29 14:10
*/
<template>
  <div class="banner_wrap">
    <img v-lazy="banner.image" class="image"/>
    <span class="summary">{{banner.summary}}</span>
  </div>
</template>

<script>
  import { Lazyload } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)

    export default {
        name: "",
        data() {
            return {}
        },
        props: {
            banner:Object
        },
        components: {},
        methods: {},
        created: function () {
        },
        watch: {}
    }
</script>

<style scoped>
  .banner_wrap{
    width: 100%;
    margin-top: 10px;
  }
  .banner_wrap .image{
    width: 90%;
    height: 150px;
    margin-left: 5%;
  }
  .banner_wrap .summary{
    margin-left: 8%;
    font-size: 10px;
    font-weight: 600;
  }
</style>
