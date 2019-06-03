/**
*
* @author tengqingya
* @create 2017-05-2017/5/24 11:12
*/
<template>
  <div>
    <back :desc="booklist.name" class="back_wrapper" :mystyle="style" :borderShow="false"
          :i3_style="i3_style" :desc_mystyle="desc_mystyle">
      <span slot="desc"></span>
      <span slot="i3"></span>
    </back>

    <div class="banner_wrapper" :style="style"></div>

    <div class="image_wrapper">
      <img :src="booklist.image" v-if="booklist.image" class="booklist_image"/>
      <div class="text">{{booklist.summary}}</div>
    </div>
    <div style="margin-top: 150px">
      <bookitem :book="item" :key="index" v-for="(item,index) in booklist.books"
                :book_desc_style="desc_style" @click.native="clickBook(item)">
        <span slot="book_auhor"></span>
      </bookitem>
    </div>

  </div>
</template>

<script>
  import {getBookListDetail} from '../axios/axios'

  import back from './back'

  import bookitem from './bookitem'
  export default {
    name: "",
    data() {
      return {
        bookListId: this.$route.query.bookListId,
        booklist: {},
        style: {},
        i3_style: {fontSize: "20px"},
        desc_style: {marginTop: "12px"},
        desc_mystyle: {fontSize: "15px"},
      }
    },
    props: {
    },
    components: {back, bookitem},
    methods: {
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      }
    },
    watch: {},
    created(){
      getBookListDetail({id: this.bookListId}).then(e => {
        this.booklist = e
        this.style.backgroundColor = this.booklist.background_color
      }).catch(e => {
        console.warn(e)
      })
    }
  }
</script>

<style scoped>
  .back_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    color: rgb(255, 251, 240);
  }

  .back_wrapper2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    font-size: 15px;
    color: #000000;
  }

  .banner_wrapper {
    height: 150px;
    width: 100%;
    z-index: 1;
  }

  .image_wrapper {
    position: relative;
    margin: -100px 5%;
    width: 90%;
    height: 200px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .booklist_image {
    /*position: absolute;*/
    width: 100%;
    height: 75%;
    /*z-index: 3;*/
  }

  .image_wrapper .text {
    position: absolute;
    bottom: 5px;
    left: 10px;
    font-size: 10px;
    font-weight: 600;
  }

</style>
