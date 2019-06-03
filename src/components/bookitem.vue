/**
* LIST/特价/限免等模版的bookitem
* @author tengqingya
* @create 2017-05-2017/5/25 9:50
*/
<template>
  <div class="book_item">
    <div class="image_wrap">
      <img class="book_image" v-lazy="book.image?book.image:book.cover">
      <i :class="type==1?'book_icon_limit':'book_icon_special'" v-if="type>0"></i>
    </div>
    <div class="detail_wrap">
      <span class="book_name">{{book.name?book.name:book.title}}</span>
      <div class="author_wrap">
        <span class="book_auhor" v-if="$slots.book_auhor">{{book.author?book.author:book.owner}}</span>
        <span class="book_status" v-if="$slots.book_status">{{endStatus[book.end_status]}}</span>
      </div>
      <span class="book_desc" :style="book_desc_style">{{book.summary}}</span>
      <div class="limit_wrap">
        <span class="book_limit" v-if="$slots.book_limit" :class="type==1?'special_price':'limit_price'">{{type==1?'￥'+book.current_total_price/100:"免费"}}</span>
        <span class="book_price" v-if="$slots.book_price">￥{{book.original_total_price/100}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Lazyload } from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)

  //type1特价2限免
    export default {
        name: "",
        data() {
            return {
              endStatus:["连载中","已完结"],
            }
        },
        props: {
          book:{},
          type:Number,
          book_desc_style:{}
        },
        components: {},
        methods: {},
        created:function () {
        },
        watch: {}
    }
</script>

<style scoped>
  .book_item{
    display: flex;
    width: 100%;
    height: 130px;
    margin-top: 20px;
  }
  .book_item .image_wrap{
    flex: 0 0 110px;
    width: 110px;
    position: relative;
  }
  .book_item .book_image{
    display: inline-block;
    width: 80px;
    height: 120px;
    background-size: 80px 120px;
    margin: auto 15px;
  }
  .book_item .image_wrap .book_icon_limit{
    position: absolute;
    display: inline-block;
    top:0;
    left: 15px;
    width: 30px;
    height: 20px;
    background-image: url("../common/pic/limit_tag_normal.png");
    background-size: 30px 20px;
  }
  .book_item .image_wrap .book_icon_special{
    position: absolute;
    display: inline-block;
    top:0;
    left: 15px;
    width: 30px;
    height: 20px;
    background-image: url("../common/pic/free_tag_normal.png");
    background-size: 30px 20px;
  }
  .book_item .detail_wrap{
    flex: 1;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }
  .book_item .detail_wrap .book_name{
    display: block;
    line-height: 22px;
    height: 44px;
    font-size: 22px;
    margin-top: 8px;
    word-break:break-all;/** 换行 **/
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }
  .book_item .detail_wrap .author_wrap{
    display: inline-block;
    width: 100%;
    height: 12px;
    font-size: 14px;
    font-weight: 500;
  }
  .book_item .detail_wrap .book_desc{
    font-size: 12px;
    height: 24px;
    line-height: 12px;
    font-weight: 100;
    margin-top: 5px;
    word-break:break-all;/** 换行 **/
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }
  .book_item .detail_wrap .limit_wrap{
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
  }
  .book_item .detail_wrap .limit_wrap .book_price{
    text-decoration: line-through;
  }
  .book_item .detail_wrap .limit_wrap .special_price{
    color: crimson;
  }
  .book_item .detail_wrap .limit_wrap .limit_price{
    color: goldenrod;
  }

</style>
