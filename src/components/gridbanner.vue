/**
*
* @author tengqingya
* @create 2017-05-2017/5/29 13:26
*/
<template>
  <div class="gridbanner">
    <div class="wrap">
      <img v-lazy="item.image"
           class="image" v-for="(item,index) in booklists" v-if="index%2==0" @click="clickbooklist(item)"/>
    </div>
    <div class="wrap">
      <img v-lazy="item.image"
           class="image" v-for="(item,index) in booklists" v-if="index%2==1" @click="clickbooklist(item)"/>
    </div>
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
          booklists:Array
        },
        components: {},
        methods: {
          clickbooklist(item){
            this.$router.push({ path: '/book/list' ,query: {"bookListId":item.id}});
          }
        },
        created: function () {
        },
        watch: {}
    }
</script>

<style scoped>
  .gridbanner{
    font-size: 0; /**去除图片间间隙**/
    width: 90%;
    margin-left: 5%;
    margin-top: 25px;
    margin-bottom: 10px;
  }
  .gridbanner .wrap{
    width: 100%;
  }
  .gridbanner .wrap .image{
    width: 50%;
    height: 80px;
  }
</style>
