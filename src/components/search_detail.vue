/**
*
* @author tengqingya
* @create 2017-05-2017/5/28 18:06
*/
<template>
  <div class="search">
    <div class="search_header">
      <span class="iconfont back" @click="back">&#xe61f;</span>
      <div class="icon"><input type="text" placeholder="搜索图书或作者" class="input" autofocus
                               v-model="word"/></div>
      <span class="search_text" @click="search">搜索</span>
    </div>

    <div class="search_wrap">
      <p class="one_border" style="margin-top: 1px"></p>
      <bookitem v-for="(item,index) in result" :book="item" :key="index">
        <span slot="book_auhor"></span>
      </bookitem>
    </div>
  </div>
</template>

<script>
  import {getSearchResult,searchParam} from '../axios/axios'
  import bookitem from './bookitem'
  export default {
    name: "",
    data() {
      return {
        word: this.$route.query.name,
        result: []
      }
    },
    props: {},
    components: {bookitem},
    methods: {
      back: function () {
//        this.$router.push({"path": "/search"})
        this.$router.go(-1)
      },
      search:function () {
        getSearchResult(searchParam(this.word)).then((e) => {
          this.result = e.ebook.items
        })
      }
    },
    created: function () {
      getSearchResult(searchParam(this.word)).then((e) => {
        this.result = e.ebook.items
      })
    },
    watch: {}
  }
</script>

<style scoped>
  .search {
    width: 100%;
    height: 100%;
  }

  .search .search_header {
    display: flex;
    width: 100%;
    height: 60px;
    padding-top: 3px;

    position: fixed; /**解决左右晃动**/
  }

  .search .search_header .back {
    display: inline-block;
    flex: 0 0 40px;
    width: 40px;
    font-size: 25px;
    margin-top: 4%;
  }

  .search .search_header .input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: rgba(242, 242, 242, 0.5);
    height: 35px;
    width: 100%;
    text-indent: 32px; /** placeholder移动 **/
    outline: none; /** 取消选中边框 **/

    margin-top: 4%;
  }

  .search .search_header .search_text {
    display: inline-block;
    flex: 0 0 60px;
    width: 20px;
    font-size: 15px;
    line-height: 15px;
    margin-top: 6%;
    margin-left: 10px;
    margin-right: -20px;
    color: rgb(208, 208, 208);
  }

  .search .search_header .icon {
    flex: 1;
    background: url("../common/pic/ebook_search_item.png") no-repeat 0 center;
    background-size: 30px 30px;
  }

  .search_wrap {
    width: 100%;
    position: fixed;
    top: 80px;
    bottom: 0;
    overflow-y: auto;
  }
</style>
