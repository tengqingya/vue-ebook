/**
*
* @author tengqingya
* @create 2017-05-2017/5/24 11:12
*/
<template>
  <div class="detail">
    <back desc="图书详情" id="scroll"><span slot="desc"></span></back>

    <div class="book_item">
      <div class="image_wrap">
        <span class="book_image"
              :style="`background-image: url('`+book.image+`')`"></span>
        <i :class="type==1?'book_icon_limit':'book_icon_special'" v-if="type>0"></i>
      </div>
      <div class="detail_wrap">
        <span class="book_name">{{book.name ? book.name : book.title}}</span>
        <div class="author_wrap">
          <span class="book_auhor">作者：<i
            class="author_click">{{book.author ? book.author : book.owner}}</i></span>
        </div>
        <div class="status_wrap">
          <span
            class="book_status">字数：{{book.word_total / 10000}}万字 {{endStatus[book.end_status]}}</span>
        </div>
        <div class="category_wrap">
          <span class="book_category">{{tag}}</span>
        </div>
        <div class="price_wrap">
          <span class="book_price"><span class="red">{{book.word_price}} 书币</span>/千字</span>
        </div>
      </div>
    </div>

    <div class="favourite">
      <div class="favourite_wrapper" @click="favourite_click">
        <span class="iconfont" :class="[showAnimate?animate:'',color]">&#xe606;</span>
        <span class="text">喜欢</span>
      </div>
      <div class="favourite_wrapper">
        <span class="iconfont">&#xe62e;</span>
        <span class="text">分享</span>
      </div>
      <div class="favourite_wrapper" @click="catalog_click">
        <span class="iconfont">&#xe61a;</span>
        <span class="text">目录</span>
      </div>
      <div class="favourite_wrapper">
        <span class="iconfont">&#xe674;</span>
        <span class="text">购买</span>
      </div>
    </div>

    <div class="introduction">
      <div class="iconfont introduction_div">&#xe60e;</div>
      <span class="introduction_text">{{summary}}</span>
      <span class="more" @click="showmore" v-if="showMore">{{moreText}}</span>
    </div>

    <split></split>

    <commentitem :comment_info="comment_info"></commentitem>

    <div>
      <bookitemtitle name="相关推荐"></bookitemtitle>
      <div style="display: flex;">
        <bookitemrow v-for="(item2,index2) in bookrecomment_info" :book="item2" :key="item2.id" @click.native.prevent="clickbook(item2)" :margin_top="5"></bookitemrow>
      </div>
    </div>

    <mt-popup
      class="popup_wrapper"
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade"
    >
        <div v-for="(citem,cindex) in catalog_info_ten" :key="cindex" class="catalog_wrapper">
          <div class="catalog_volum" v-if="cindex == 0 || catalog_info_ten[cindex].volumn!==catalog_info_ten[cindex-1].volumn">{{citem.volumn}}</div>
          <span class="catalog_div">{{citem.name}}</span>
          <span class="iconfont catalog_lock" v-if="catalog_info.free<=cindex">&#xe60f;</span>
        </div>

      <infinite-loading :on-infinite="loadMore" ref="infiniteLoading"></infinite-loading>

    </mt-popup>

    <div class="bottom_begin_read" style="background: #ffffff;">
      <span class="text">立即购买</span>
      <span class="text">加入书架</span>
      <span class="text" style="background: lightseagreen;" @click="click_read">开始阅读</span>
    </div>

  </div>
</template>

<script>
  import split from './split'
  import {getBookdetail, getCommentNoAuth, getBookdetailRecommend,getBookdetailCatalog} from '../axios/axios'
  import back from './back'
  import commentitem from './commentitem'
  import bookitemrow from './bookitemrow'
  import bookitemtitle from './bookitemtitle'

  import {mapGetters} from 'vuex'

  import {checkLogin} from '../localStorage/localStorage'

  /**
   * 滚动插件
   */
  import VueScrollTo from 'vue-scrollto'
  import Vue from 'vue'
  Vue.use(VueScrollTo)

  import InfiniteLoading from 'vue-infinite-loading';

  import { Popup } from 'mint-ui';
  Vue.component(Popup.name, Popup);

  const moreNum = 95
  export default {
    name: "",
    data() {
      return {
        bookId: this.$route.query.bookId,
        /**
         * 刚开始渲染的时候image没有值，会出现undefined的请求。
         * 可以加个v-if，book有值的时候才会去渲染
         * 或者先给一个默认image
         * https://segmentfault.com/q/1010000009651071?_ea=2004834
         * https://stackoverflow.com/questions/32467408/http-localhost-undefined-404-not-found
         */
        book: {image: "http://image.meizu.com/image/ebook/d23815b54aff407ea8aba333c07d1895z/original"},
        type: 0,
        endStatus: ["连载中", "已完结"],
        tag: "",
        showMore: true,
        summary: "",
        moreText: "更多",
        animate: {
          animated: true,
          infinite: true,
          bounce: true
        },
        color: {
          color: false
        },
        showAnimate: true,
        comment_info: [],
        bookrecomment_info: [],

        popupVisible:false,
        catalog_info:{},
        catalog_info_ten:[],
        length:0
      }
    },
    updated:function () {
      console.log("updated")
    },
    props: {},
    components: {split, back, commentitem, bookitemrow, bookitemtitle,InfiniteLoading},
    methods: {
      showmore: function () {
        if (this.moreText === "更多") {
//            this.showMore = false
          this.summary = this.book.summary
          this.moreText = "收起"
        } else {
          this.summary = this.book.summary.substring(0, moreNum) + "..."
          this.moreText = "更多"
        }
      },
      favourite_click: function () {
        if (checkLogin(this)) {
          this.color.color = true
        } else {
          this.$router.push({path: '/login'})
        }
      },
      clickbook: function (item2) {
        VueScrollTo.scrollTo("#scroll", 1200, {easing: 'ease-in'})
        this.bookId=item2.id
        this.loading = false;
        this.fetchData()
      },
      fetchData:function(){
        var self = this
        self.tag = ""
        self.catalog_info_ten = []
        self.catalog_info = {}
        getBookdetail({"id": this.bookId}).then((e) => {
          this.book = e
          if (e.free_type > 0) {
            this.type = 1
          } else if (e.special_type > 0) {
            this.type = 2
          }
          self.tag += e.third_category

          e.tags.split(" ").map(function (e) {
            if (e && self.tag.length <= 10) {
              self.tag += "/" + e
            }
          })
          if (e.summary.length < moreNum) {
            this.summary = e.summary
            this.showMore = false
          } else if (e.summary.length > moreNum) {
            this.showMore = true
            this.summary = e.summary.substring(0, moreNum) + "..."
          }
        }).then(getBookdetailCatalog({"id": this.bookId}).then((e) => {
          this.catalog_info = e
        })).then(getCommentNoAuth({"book_id": this.bookId}).then((e) => {
          this.comment_info = e
        })).then(getBookdetailRecommend({"book_id": this.bookId}).then((e) => {
          this.bookrecomment_info = e.books
        })).catch(function (e) {
          console.warn(e)
        })
      },
      catalog_click:function () {
        this.popupVisible = true
        this.length = this.catalog_info.catalogs.length

        for (let i = 0; i < 25; i++) {
          this.catalog_info_ten.push(this.catalog_info.catalogs[i])
        }

      },
      loadMore:function () {
        setTimeout(() => {
          if(!this.loading){
            let last = this.catalog_info_ten.length;
            let total =0;
            if(25+last>this.length){
              total = this.length
            }else {
              total = 25+last
            }
            for (let i = last; i < total; i++) {
              this.catalog_info_ten.push(this.catalog_info.catalogs[i])
            }
            if(last === this.length){
              this.loading = true;
              return false;
            }else {
              this.loading = false;
            }
          }
          this.$refs.infiniteLoading&&this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }, 1000);
      },
      click_read(){
        this.$router.push({path: '/reader'})
      }
    },
    watch: {
//      '$route': 'fetchData'
    },
    created(){
      this.fetchData()
    },
    computed: {
      ...mapGetters({
        loginInfo: 'loginInfo'
      }),
      loading:function () {
        return !this.popupVisible
      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  .detail {
    width: 100%;
    height: 100%;
  }

  .book_item {
    display: flex;
    margin-top: 20px;
  }

  .book_item .image_wrap {
    flex: 0 0 110px;
    width: 110px;
    position: relative;
  }

  .author_click {
    color: darkturquoise;
    padding: 3px;
  }

  .book_item .book_image {
    display: inline-block;
    width: 90px;
    height: 130px;
    background-size: 90px 130px;
    margin: auto 15px;
  }

  .book_item .image_wrap .book_icon_limit {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 15px;
    width: 30px;
    height: 20px;
    background-image: url("../common/pic/limit_tag_normal.png");
    background-size: 30px 20px;
  }

  .book_item .image_wrap .book_icon_special {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 15px;
    width: 30px;
    height: 20px;
    background-image: url("../common/pic/free_tag_normal.png");
    background-size: 30px 20px;
  }

  .book_item .detail_wrap {
    flex: 1;
    margin-right: 10px;
  }

  .category_wrap {
    font-size: 14px;
  }

  .book_item .detail_wrap .book_name {
    display: block;
    line-height: 22px;
    height: 44px;
    font-size: 22px;
    margin-top: 8px;
    word-break: break-all; /** 换行 **/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  .book_item .detail_wrap .author_wrap {
    display: inline-block;
    width: 100%;
    height: 12px;
    font-size: 14px;
    line-height: 1px;
    font-weight: 500;
  }

  .book_item .detail_wrap .status_wrap {
    display: inline-block;
    width: 100%;
    height: 12px;
    font-size: 14px;
    line-height: 1px;
    font-weight: 500;
  }

  /*.book_item .detail_wrap .book_desc {*/
  /*font-size: 12px;*/
  /*height: 24px;*/
  /*line-height: 12px;*/
  /*font-weight: 100;*/
  /*margin-top: 5px;*/
  /*word-break: break-all; !** 换行 **!*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
  /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
  /*-webkit-line-clamp: 2; !** 显示的行数 **!*/
  /*}*/

  .book_item .detail_wrap .price_wrap {
    font-size: 14px;
    margin-top: 5px;
  }

  .book_item .detail_wrap .price_wrap .red {
    font-size: 16px;
    color: red;
  }

  .favourite {
    display: flex;
    justify-content: space-around;
    margin-top: 8px;
  }

  .favourite .favourite_wrapper {
    padding: 10px;
  }

  .iconfont {
    font-size: 25px;
    display: block;
  }

  .favourite .text {
    display: inline-block;
    margin-top: 8px;
    font-size: 10px;
  }

  .introduction {
    position: relative;
    width: 90%;
    margin: 0 5%;
  }

  .introduction .introduction_div {
    font-size: 12px;
    margin-bottom: 8px;
  }

  .introduction .introduction_text {
    font-size: 10px;
    line-height: 20px;
  }

  .introduction .more {
    position: absolute;
    right: -15px;
    bottom: 0;
    padding: 5px;
    color: lightseagreen;
  }

  .color {
    color: red;
  }

  .popup_wrapper{
    width: 103%; /**滚动条看不见了······**/
    height: 70%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .catalog_wrapper{
    position: relative;
    padding: 5px;
    margin-bottom: 15px;
    margin-left: 30px;
  }
  .catalog_volum{
    margin-left: -15px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .catalog_div{
    display: inline-block;
    font-weight: 600;
  }
  .catalog_lock{
    position: absolute;
    right: 5%;
    display: inline-block;
    vertical-align: middle;
  }
  .bottom_begin_read{
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 0px;
    text-align: center;
    left: 0px;
    width: 100%;
    font-size: 22px;
  }
  .bottom_begin_read .text{
    padding: 10px;
  }
</style>
