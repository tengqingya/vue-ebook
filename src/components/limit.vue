/**
* 限免
* @author tengqingya
* @create 2017-06-2017/6/26 16:48
*/
<template>
  <div>
    <back desc="免费专区">
      <span slot="desc"></span>
    </back>

    <div v-for="(item,index) in groups" :key="index">
      <div v-if="item.template === 'BANNER'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="1"><span slot="timer"></span></bookitemtitle>
        <banner_item :banner="item" @click.native="clickBanner(item)"></banner_item>
      </div>
      <div v-if="item.template === 'LIST'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="1"><span slot="timer"></span></bookitemtitle>
        <bookitem :book="item2" :key="index2" v-for="(item2,index2) in item.limit_books"
                  :book_desc_style="desc_style" @click.native="clickBook(item2)" :type="2">
          <span slot="book_limit"></span>
          <span slot="book_price"></span>
        </bookitem>
      </div>
      <div v-if="item.template === 'ROW'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="1"><span slot="timer"></span></bookitemtitle>
        <div style="display: flex;">
          <bookitemrow v-for="(item2,index2) in item.limit_books" :key="index2" :book="item2" :type="2" @click.native="clickBook(item2)">
            <span slot="book_limit"></span>
            <span slot="book_price"></span>
          </bookitemrow>
        </div>
        <div class="more" @click="showmore(item)">查看更多</div>
      </div>
      <split v-if="index!==groups.length-1" style="margin-top: 15px"></split>

      <!--许愿墙-->
      <div class="grid" :style="`background-color: `+item.background_color" v-if="item.type === 3">
        <bookitemtitle :name="item.sub_title" :num="item.books_num" @click.native.prevent="clickbooklist(item,true)"></bookitemtitle>
        <div class="backgroud">
          <div class="grid_wrap">
            <bookitemrow v-for="(item2,index2) in item.wish_books" :book="item2" :key="index2" v-if="index2<3" :margin_top="10" :wish="true" :subject_id="item.subject_id"></bookitemrow>
          </div>
          <div class="grid_wrap margin_top">
            <bookitemrow v-for="(item2,index2) in item.wish_books" :book="item2" :key="index2" v-if="index2>=3" :margin_top="10" :wish="true" :subject_id="item.subject_id"></bookitemrow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import back from './back'

  import bookitemtitle from './bookitemtitle'
  import banner_item from './banner_item'
  import bookitem from './bookitem'
  import bookitemrow from './bookitemrow'

  import {getlimitGroups} from '../axios/axios'
  import Split from "./split";

  export default {
    name: "",
    data() {
      return {
        groups:[],
        desc_style: {marginTop: "12px"}
      }
    },
    props: {},
    components: {
      Split,
      back,bookitemtitle,banner_item,bookitem,bookitemrow},
    methods: {
      getAjax(){
        getlimitGroups().then(e=>{
          this.groups = e.groups
        }).catch(e=>{console.warn(e)})
      },
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
      clickBanner(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.limit_books[0].id}})
      },
      showmore(item){
        this.$router.push({name: 'limitbooklist', params: {"subjectId": item.subject_id,"time_end":item.time_end*1000,"title":item.title}})
      },
      clickbooklist(item){
        this.$router.push({ path: '/book/list' ,query: {"bookListId":item.subject_id,"hideBanner":true}});
      }
    },
    created: function () {
      this.getAjax()
    },
    watch: {}
  }
</script>

<style scoped>
  .more {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    text-align: center;
    color: lightseagreen;
  }

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
  .grid .backgroud{
    width: 92%;
    padding: 6px;
    margin: 0 auto;
    background-color: aliceblue;
  }
  .grid .margin_top{
    margin-top: 15px;
  }
</style>
