/**
*
* @author tengqingya
* @create 2017-05-2017/5/24 11:12
*/
<template>
  <div>

    <back :desc="booklist.publisher.name" v-if="booklist.publisher"
          class="back_wrapper2">
      <span slot="desc"></span>
    </back>

    <back desc="已购买" v-else-if="isPurchased"
          class="back_wrapper2">
      <span slot="desc"></span>
    </back>

    <back desc="我喜欢的图书" v-else-if="isFavouritedBooks"
          class="back_wrapper2">
      <span slot="desc"></span>
    </back>

    <div>
      <bookitem :book="item" :key="index" v-for="(item,index) in books"
                :book_desc_style="desc_style" @click.native="clickBook(item)">
        <span slot="book_auhor"></span>
      </bookitem>
    </div>

    <div ref="showMore" ></div>

  </div>
</template>

<script>
  import {getBookListDetail} from '../axios/axios'

  import {USER_PURCHASE_LIST,USER_FAVORITE_LIST} from '../axios/axios'

  import back from './back'

  import bookitem from './bookitem'
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: "",
    data() {
      return {
        bookListId: this.$route.query.bookListId,
        booklist: {},
        hideBanner: this.$route.query.hideBanner,
        style: {},
        desc_style: {marginTop: "12px"},
        books:[],
        lock:true
      }
    },
    props: {
        isPurchased :{
            type:Boolean,
            default:false
        },
        isFavouritedBooks :{
            type:Boolean,
            default:false
      }
    },
    components: {back, bookitem,InfiniteLoading},
    methods: {
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
      handleScroll(){
          this.$nextTick(()=>{
              if(this.lock){
                  //todo there is  a bug  here @important
                  console.log(this.$refs)
                let lastDiv = this.$refs.showMore.getBoundingClientRect().top
                let clientHeight = document.documentElement.clientHeight
                if(lastDiv<=clientHeight+100){
                  console.log("到头了")
                  this.lock = false
                  if(this.isPurchased){
                    //请求购买接口
                    USER_PURCHASE_LIST(this,{count:10,offset:this.books.length}).then(e=>{
                      this.booklist = e
                      this.books.push(...this.booklist.books)
                      this.lock = true
                    }).catch(e=>console.warn(e))
                  }else if(this.isFavouritedBooks){
                    USER_FAVORITE_LIST(this,{type:1,count:10,offset:this.books.length}).then(e=>{
                      this.booklist = e
                      this.books.push(...this.booklist.books)
                      this.lock = true
                    }).catch(e=>console.warn(e))
                  }
                }
              }
          })
      }
    },
    watch: {},
    created(){
      window.addEventListener('scroll', event => this.handleScroll());
        if(this.isPurchased){
            //请求购买接口
          USER_PURCHASE_LIST(this,{count:10}).then(e=>{
              this.booklist = e
            this.books = this.booklist.books
          }).catch(e=>console.warn(e))
        }else if(this.isFavouritedBooks){
          USER_FAVORITE_LIST(this,{type:1,count:10}).then(e=>{
              this.booklist = e
            this.books = this.booklist.books
          }).catch(e=>console.warn(e))
        }
        else {
          getBookListDetail({id: this.bookListId}).then(e => {
            this.booklist = e
            this.books = this.booklist.books
            this.style.backgroundColor = this.booklist.background_color
          }).catch(e => {
            console.warn(e)
          })
        }
    },
    mounted:function () {
    }
  }
</script>

<style scoped>
  .back_wrapper2 {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
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
