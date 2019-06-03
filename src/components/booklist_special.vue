/**
*
* @author tengqingya
* @create 2017-05-2017/5/24 11:12
*/
<template>
  <div>
    <back :desc="title">
      <span slot="desc"></span>
      <div slot="expand">
        <span class="icon2" :style="mycolor" v-if="time.text">{{time.text}}</span>
        <span class="icon2" :style="mycolor" v-else>{{time.HH}}:{{time.mm}}:{{time.ss}}</span>
      </div>
    </back>

    <div>
      <bookitem :book="item" :key="index" v-for="(item,index) in books" @click.native="clickBook(item)" :type="1">
        <span slot="book_auhor"></span>
        <span slot="book_limit"></span>
        <span slot="book_price"></span>
      </bookitem>
    </div>

  </div>
</template>

<script>
  import {getspecialgroupbooks} from '../axios/axios'
  import {getTime} from '../util/timeutil'

  import back from './back'

  import bookitem from './bookitem'
  export default {
    name: "",
    data() {
      return {
        subject_id: this.$route.params.subjectId,
        title: this.$route.params.title,
        time_end: this.$route.params.time_end,
        books:[],
        time:{},
        now:0
      }
    },
    props: {
      mycolor: {
        type: Object,
        default:function () {
          return {color: "#ef4f4f"}
        }
      }
    },
    components: {back, bookitem},
    methods: {
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
      getAjax(){
        getspecialgroupbooks({id:this.subject_id}).then(e=>{
            this.books.push(...e.books)
        }).catch(e=>console.warn(e))
      },
      run: function() {
        this.now = new Date().getTime()
        let time = getTime(this.time_end, this.now)
        if (this.time_end >= this.now) {
          this.time = time
        } else {
          this.time.text = "特价结束"
          return
        }
        setTimeout(this.run, 1000)
      }
    },
    watch: {},
    created(){
        this.getAjax()
        this.run()
    }
  }
</script>

<style scoped>
  .icon2 {
    position: absolute;
    display: inline-block;
    bottom: -5px;
    right: 10px;
    padding: 5px;
  }
</style>
