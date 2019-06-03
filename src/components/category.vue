/**
*
* @author tengqingya
* @create 2017-06-2017/6/23 14:09
*/
<template>
  <div class="category">
    <back desc="分类">
      <span slot="desc"></span>
      <span slot="i4"></span>
    </back>

    <div v-for="(item,index) in groups" :key="index">
      <bookitemtitle :name="item.name"></bookitemtitle>
      <div class="category_image_wrapper">
        <img class="image" v-lazy="item2.icon" v-for="(item2,index2) in item.categories" :key="index2" @click="click(item2)">
      </div>
    </div>
  </div>
</template>

<script>
  import back from './back'
  import {getcategorylist} from '../axios/axios'
  import bookitemtitle from './bookitemtitle'

  import { Lazyload } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)


  export default {
    name: "",
    data() {
      return {
        groups: []
      }
    },
    props: {},
    components: {back, bookitemtitle},
    methods: {
      click(item){
          console.log(item)
        this.$router.push({name:"categorydetail",query:{detail:item}})
      }
    },
    created: function () {
      getcategorylist().then(e => {
        this.groups = e.groups
      }).catch(e => console.log(e))
    },
    watch: {}
  }
</script>

<style scoped>
  .category{
    width: 100%;
  }
  .category_image_wrapper{
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 5%;
  }
  .category_image_wrapper .image{
    width: 50%;
    height: 80px;
  }
</style>
