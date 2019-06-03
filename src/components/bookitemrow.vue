/**
* row模版的一个bookitem组件
* @author tengqingya
* @create 2017-05-2017/5/26 14:20
*/
<template>
  <div class="row_item">
    <div class="pic"><img v-lazy="book.image"/></div>
    <div class="name">{{book.name}}</div>
    <div class="author" :style="`margin-top: `+margin_top+`px`" v-if="book.author && type===0">{{book.author}}</div>
    <div class="author" :style="`margin-top: `+margin_top+`px`" >
      <span class="book_limit" v-if="$slots.book_limit" :class="type===1?'special_price':'limit_price'">{{type===1?'￥'+book.current_total_price/100:"免费"}}</span>
      <span class="book_price" v-if="$slots.book_price">￥{{book.original_total_price/100}}</span>
    </div>
    <div v-if="wish" class="wish_wrapper" :style="wish_background" @click="click_wish">
      <span v-text="xuyuan"></span>
    </div>
  </div>
</template>

<script>
  import { Lazyload } from 'mint-ui';
  import {getbookwish} from '../axios/axios'

  import { mapGetters } from 'vuex'
  import store from '../vuex/store'

  import Vue from 'vue'
  import {getLocalStorageString} from '../localStorage/localStorage'

  Vue.use(Lazyload)

  export default {
    name: "",
    data() {
      return {
        wish_background:{backgroundColor:"#26a2ff"},
        xuyuan:"许愿"
      }
    },
    props: {
      book: {
          type:Object
      },
      margin_top: {
        type: Number,
        default: 18
      },
      type:Number,
      wish:{
          type:Boolean,
          default:false
      },
      subject_id:{
          type:Number,
          default:0
      }
    },
    components: {},
    methods: {
      click_wish(){
        getbookwish({subject_id:this.subject_id,book_id:this.book.id}).then(e=>{
            if(e.result === true){
                this.wish_background = {backgroundColor:""}
                this.xuyuan = "已许愿"
              this.$store.dispatch("addwishbooks",this.book.id)
            }else {
                alert("许愿失败...")
            }
        }).catch(e=>console.warn(e))
      }
    },
    watch: {},
    created:function () {
        let local_wish_books = getLocalStorageString("wish_books")
        if(local_wish_books){
          local_wish_books.split(",").map( (item)=> {
            if(item == this.book.id){
              this.wish_background = {backgroundColor:""}
              this.xuyuan = "已许愿"
            }
          })
        }else {
          this.wish_books.map( (item)=>{
            if(item === this.book.id){
              this.wish_background = {backgroundColor:""}
              this.xuyuan = "已许愿"
            }
          })
        }
    },
    computed: {
      ...mapGetters({
        wish_books: 'wish_books'
      })
    }
  }
</script>

<style scoped>
  .row_item {
    height: 201px;
    flex: 1;
    margin: auto 10px;
  }

  .row_item .pic {
    height: 130px;
  }

  .row_item .pic img {
    height: 130px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1)
  }

  .row_item .name {
    height: 36px;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    margin-top: 10px;
    /*padding: 2px;*/
    padding-top: 2px;

    word-break: break-all; /** 换行 **/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  .row_item .author {
    height: 12px;
    font-size: 12px;
    color: #7e8c8d;
  }

  .wish_wrapper{
    margin-top: -15px;
    width: 50%;
    margin-left: 25%;
    padding: 2px;
    font-size: 15px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .book_price{
    text-decoration: line-through;
  }
  .special_price{
    color: crimson;
  }
  .limit_price{
    color: goldenrod;
  }
</style>
