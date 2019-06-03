/**
*
* @author tengqingya
* @create 2017-05-2017/5/29 14:51
*/
<template>
  <div class="grid" :style="`background-color: `+grid.background_color">
    <img v-lazy="grid.image" class="image" v-if="grid.image"/>
    <bookitemtitle v-else :name="grid.content_name" :num="grid.books_num" @click.native.prevent="clickbooklist(grid)"></bookitemtitle>
    <div class="backgroud">
      <div class="grid_wrap">
        <bookitemrow v-for="(item,index) in grid.books" :book="item" :key="index" v-if="index<3" :margin_top="10" @click.native.prevent="clickbook(item)"></bookitemrow>
      </div>
      <div class="grid_wrap margin_top">
        <bookitemrow v-for="(item,index) in grid.books" :book="item" :key="index" v-if="index>=3" :margin_top="10" @click.native.prevent="clickbook(item)"></bookitemrow>
      </div>
    </div>
  </div>
</template>

<script>
  import bookitemtitle from './bookitemtitle'

  import bookitemrow from './bookitemrow'

  import { Lazyload } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)

    export default {
        name: "",
        data() {
            return {
            }
        },
        props: {
          grid:Object
        },
        components: {bookitemrow,bookitemtitle},
        methods: {
          clickbook:function (item) {
            this.$router.push({ path: '/book/detail' ,query: {"bookId":item.id}})
          },
          clickbooklist(item){
            this.$router.push({ path: '/book/list2' ,query: {"bookListId":item.content_id,"hideBanner":true}});
          }
        },

        created: function () {
        },
        watch: {}
    }
</script>

<style scoped>
  .grid{
    width: 100%;
    margin-top: 10px;
    font-size: 0;
    padding-bottom: 10px;
  }
  .grid .image{
    width: 100%;
    height: 130px;
  }
  .grid_wrap{
    display: flex;
  }
  .backgroud{
    width: 92%;
    padding: 6px;
    margin: 0 auto;
    background-color: aliceblue;
  }
  .margin_top{
    margin-top: 15px;
  }
</style>
