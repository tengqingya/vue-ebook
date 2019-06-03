/**
* 搜索
* @author tengqingya
* @create 2017-05-2017/5/27 18:53
*/
<template>
  <div class="search">
    <div class="search_header">
      <span class="iconfont back" @click="back">&#xe61f;</span>
      <div class="icon"><input type="text" placeholder="搜索图书或作者" class="input" autofocus
                               v-model="word"/></div>
      <span class="search_text" @click="search">搜索</span>
    </div>


    <div>
      <div class="search_wrap">
        <p class="one_border" style="margin-top: 1px"></p>
        <div class="hot_text">热门搜索</div>

        <div class="words">
      <span class="item" :style="bcColor[index]" v-for="(item,index) in hotWords"
            :key="index" @click="click(index)">{{item}}</span>
        </div>

        <div class="hot_text">搜索历史</div>

        <div class="search_history" v-for="(item,index) in hot_words">
          <div style="height: 10px"><p class="one_border short"></p></div>
          <div class="history_wrap">
            <span class="clock iconfont">&#xe635;</span>
            <span class="text">{{item}}</span>
            <span class="delete iconfont" @click="remove(index)">&#xe65a;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getHotWords} from '../axios/axios'
  import {mapGetters} from 'vuex'

  import {Toast} from 'mint-ui';

  export default {
    name: "",
    data() {
      return {
        hotWords: [],
        hot_words: [],
        bcColor: [],
        word: ""
      }
    },
    created: function () {
      getHotWords("").then((e) => {
        this.hotWords = e.words
        let size = this.hotWords.length
        for (let i = 0; i < size; i++) {
          this.bcColor.push(`background-color: rgba(` + Math.ceil(Math.random() * 255) + `, ` + Math.ceil(Math.random() * 255) + `, ` + Math.ceil(Math.random() * 255) + `, ` + Math.random() + `)`)
        }

        //深度复制数组
        for (let i = 0; i < this.hot_words_search_history.length; i++) {
          this.hot_words.push(this.hot_words_search_history[i])
        }
      })
    },
    props: {},
    components: {},
    methods: {
      click: function (index) {
//        this.hot_words.unshift(this.hotWords[index])改变数组，间接改变了原来的vuex的state里面的数组 所以报错
        if (this.hot_words && this.hot_words[0] != this.hotWords[index]) {
          this.hot_words.unshift(this.hotWords[index])
        }

        this.word = this.hotWords[index]
      },
      remove: function (index) {
        this.hot_words.splice(index, 1)
      },
      back: function () {
        this.$store.dispatch("addSearchHistory", this.hot_words)

//        this.$router.push({"path": "/"})
        this.$router.go(-1)
      },
      search: function () {
        if (!this.word) {
          Toast("请先输入搜索内容")
        } else {
          if (this.hot_words && this.hot_words[0] != this.word) {
            this.hot_words.unshift(this.word)
          }
          this.$store.dispatch("addSearchHistory", this.hot_words)
          this.$router.push({"path": "/search/detail", query: {"name": this.word}})
        }
      }
    },
    computed: {
      ...mapGetters({
        hot_words_search_history: 'searchHistory'
      })
    },
    watch: {}
  }
</script>

<style scoped>
  @import "../common/css/one_border.css";

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

  .search .search_wrap {
    position: fixed;
    top: 80px;
    bottom: 0;
    overflow-y: auto;
  }

  .search .hot_text {
    margin-top: 10px;
    color: rgb(208, 208, 208);
  }

  .search .words {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }

  .search .words .item {
    border-radius: 20px;
    margin-left: 10px;
    margin-top: 10px;
    padding: 6px;
  }

  .search .search_history {
    width: 100%;
  }

  .search .search_history .short {
    width: 90%;
    margin: 10px auto;
  }

  .search .search_history .history_wrap {
    margin-top: 10px;
    padding: 5px;

  }

  .search .search_history .history_wrap .clock {
    margin-left: 10px;
  }

  .search .search_history .history_wrap .text {
    display: inline-block;
    width: 80%;
    vertical-align: middle;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .search .search_history .history_wrap .delete {
    float: right;
    margin-right: 10px;
  }
</style>
