/**
* 特价
* @author tengqingya
* @create 2017-06-2017/6/26 16:46
*/
<template>
  <div>
    <back desc="特价专区">
      <span slot="desc"></span>
    </back>

    <div v-for="(item,index) in groups" :key="index">
      <div v-if="item.template === 'BANNER'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="2"><span slot="timer"></span></bookitemtitle>
        <banner_item :banner="item" @click.native="clickBanner(item)"></banner_item>
      </div>
      <div v-if="item.template === 'LIST'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="2"><span slot="timer"></span></bookitemtitle>
        <bookitem :book="item2" :key="index2" v-for="(item2,index2) in item.special_books"
                  :book_desc_style="desc_style" @click.native="clickBook(item2)" :type="1">
          <span slot="book_limit"></span>
          <span slot="book_price"></span>
        </bookitem>
      </div>
      <div v-if="item.template === 'ROW'">
        <bookitemtitle :name="item.title" :time_end="item.time_end*1000" :free_type="2"><span slot="timer"></span></bookitemtitle>
        <div style="display: flex;">
          <bookitemrow v-for="(item2,index2) in item.special_books" :key="index2" :book="item2" :type="1" @click.native="clickBook(item2)">
            <span slot="book_limit"></span>
            <span slot="book_price"></span>
          </bookitemrow>
        </div>
        <div class="more" @click="showmore(item)">查看更多</div>
      </div>
      <split v-if="index!==groups.length-1" style="margin-top: 15px"></split>
    </div>
  </div>
</template>

<script>
  import back from './back'

  import bookitemtitle from './bookitemtitle'
  import banner_item from './banner_item'
  import bookitem from './bookitem'
  import bookitemrow from './bookitemrow'

  import {getspecialGroups} from '../axios/axios'
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
              getspecialGroups().then(e=>{
                  this.groups = e.groups
              }).catch(e=>{console.warn(e)})
            },
          clickBook(item){
            this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
          },
          clickBanner(item){
            this.$router.push({path: '/book/detail', query: {"bookId": item.special_books[0].id}})
          },
          showmore(item){
            this.$router.push({name: 'specialbooklist', params: {"subjectId": item.subject_id,"time_end":item.time_end*1000,"title":item.title}})
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
</style>
