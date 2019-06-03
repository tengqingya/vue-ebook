/**
* 我收藏的专题
* @author tengqingya
* @create 2017-07-2017/7/22 13:31
*/
<template>
  <div>
    <back desc="我收藏的专题"
          class="back_wrapper2">
      <span slot="desc"></span>
    </back>

    <div v-for="(item,index) in booklists" :key="index" class="my_book_list"
         @click="clickbooklist(item)"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="200">
      <img  v-lazy="item.image" class="img"/>
      <div v-text="item.summary" class="text"></div>
    </div>

    <p v-if="loading" class="page-infinite-loading">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中.....
    <p v-else  class="page-infinite-loading">no more data</p>
  </div>

</template>

<script>
  import { Spinner } from 'mint-ui';

  Vue.component(Spinner.name, Spinner);
  import { InfiniteScroll } from 'mint-ui';

  Vue.use(InfiniteScroll);

  import back from './back'
  import {USER_FAVORITE_LIST} from '../axios/axios'

  import { Lazyload } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)

  export default {
    name: "",
    data() {
      return {
        booklists: [],
        total: 0,
        count:5,
        offset:0,
        loading:false
      }
    },
    props: {},
    components: {back},
    methods: {
      loadMore() {
          if(this.total === this.booklists.length){
              console.log("no data")
            return;
          }
        this.loading = true;
        console.log("more")
        this.offset = this.booklists.length
        setTimeout(() => {
          this.getData()
        },3000)
      },
      getData(){
        USER_FAVORITE_LIST(this, {type: 2, count: this.count, offset: this.offset}).then(e => {
          this.booklists.push(...e.booklists)
          this.total = e.total
          this.loading = false
        }).catch(e => {
            console.log("USER_FAVORITE_LIST error")
        })
      },
      clickbooklist(item){
        this.$router.push({ path: '/book/list' ,query: {"bookListId":item.id}});
      }
    },
    created: function () {
        this.getData()
    },
    watch: {}
  }
</script>

<style>
  .my_book_list{
    width: 90%;
    margin: 10px 5%;
  }
  .my_book_list .img{
    width: 100%;
  }
  .my_book_list .text{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    word-break:break-all;/** 换行 **/
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }
  .page-infinite-loading{
    text-align: center;
  }
  .mint-spinner-fading-circle{
    margin-left: 46%;
  }
</style>
