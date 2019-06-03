/**
* 用户中心
* @author tengqingya
* @create 2017-05-2017/5/31 19:50
*/
<template>
  <div>
    <back desc="个人中心" :borderShow="false">
      <span slot="desc"></span>
    </back>

    <mt-cell :title="info?info.user_name:'未登录'" class="login">
      <img slot="icon" v-if="info" :src="info.icon" class="img_login">
      <img slot="icon" src="../common/pic/account_grey_80.png" class="img_login" v-else>
      <img src="../common/pic/ic_usercenter_bell.png" class="bell" v-if="unread_message_count === 0">
      <img src="../common/pic/ebook_user_icon_new.png" class="bell" v-else>
    </mt-cell>

    <div class="purchase_wrapper">
      <div class="purchase" @click="click_check_purchased">
        <div class="img_wrapper">
          <img src="../common/pic/book_detail_purchase.png" width="20px" height="20px"/>
        </div>
        <span class="text">已购买</span>
        <span class="text" v-if="user_purchase_book_count>0" v-text="user_purchase_book_count"></span>
      </div>
      <div class="purchase" @click="click_check_favourite_books">
        <div class="img_wrapper">
          <img src="../common/pic/ic_usercenter_favorite.png" width="20px" height="20px"/>
        </div>
        <span class="text">喜欢的</span>
        <span class="text" v-if="user_favorite_book_count>0" v-text="user_favorite_book_count"></span>
      </div>
      <div class="purchase" @click="click_check_collect_booklists">
        <div class="img_wrapper">
          <img src="../common/pic/ic_usercenter_collect.png" width="20px" height="20px"/>
        </div>
        <span class="text">收藏的</span>
        <span class="text" v-if="user_favorite_booklist_count>0" v-text="user_favorite_booklist_count"></span>
      </div>
    </div>

    <split></split>

    <mt-cell :title="myCurrency" class="login" @click.native="my_currency_click">
      <img slot="icon" src="../common/pic/ic_usercenter_purchased.png" class="samll_img">
      <img src="../common/pic/ic_arrow_right.png" class="bell">
    </mt-cell>
    <mt-cell title="我的优惠券" class="login">
      <img slot="icon" src="../common/pic/ic_usercenter_coupon.png" class="samll_img">
      <img src="../common/pic/ic_arrow_right.png" class="bell">
    </mt-cell>
    <mt-cell title="我的积分" class="login">
      <img slot="icon" src="../common/pic/ic_usercenter_point.png" class="samll_img">
      <img src="../common/pic/ic_arrow_right.png" class="bell">
    </mt-cell>

    <mt-cell title="设置" class="login" style="display: none">
      <img slot="icon" src="../common/pic/ic_usercenter_point.png" class="samll_img">
      <img src="../common/pic/ic_arrow_right.png" class="bell">
    </mt-cell>
  </div>
</template>

<script>
  import back from './back'
  import {checkLogin} from '../localStorage/localStorage'

  import Vue from 'vue'
  import {Cell} from 'mint-ui';

  import {checkLoginAndValidateToken} from '../localStorage/localStorage'

  Vue.component(Cell.name, Cell);


  import {
    UNREAD_MESSAGE_COUNT,
    USER_FAVORITE_COUNT,
    GET_MY_CURRENCY_AMOUNT,
    USER_PURCHASE_BOOK_COUNT
  } from '../axios/axios'
  import Split from "./split";

  export default {
    name: "",
    data() {
      return {
        info: {},
        unread_message_count: 0,
        user_favorite_book_count: 0,
        user_favorite_booklist_count: 0,
        get_my_currency: {
        },
        user_purchase_book_count: 0,
        myCurrency:"我的书币"
      }
    },
    props: {},
    components: {
      Split,
      back
    },
    methods: {
      click_check(){
        console.log("click_check")
        if(this.info){
          let myPromise = checkLoginAndValidateToken(this, {ajaxFunction: USER_FAVORITE_COUNT(this, {type: 1})}).then(e=>{
              this.user_favorite_book_count = e.total

            //token验证成功，调用下面接口获取登录信息
            UNREAD_MESSAGE_COUNT(this).then(e=>this.unread_message_count = e.total).catch(e=>console.log(e))
            USER_FAVORITE_COUNT(this, {type: 2}).then(e => this.user_favorite_booklist_count = e.total).catch(e => console.log(e))
            GET_MY_CURRENCY_AMOUNT(this).then(e=>{this.get_my_currency = e;this.myCurrency = "我的书币  (剩余"+this.get_my_currency.total_currency+"，快过期"+this.get_my_currency.partial_currency+")";}).catch(e=>console.log(e))
            USER_PURCHASE_BOOK_COUNT(this).then(e=>this.user_purchase_book_count = e.total).catch(e=>console.log(e))
          }).catch(e=>console.log(e))
        } else {
          this.$router.push({"name": "login"})
        }
      },
      click_check_purchased(){
        this.$router.push({"name": "purchased"})
      },
      click_check_favourite_books(){
        this.$router.push({"name": "favouritebooks"})
      },
      click_check_collect_booklists(){
        this.$router.push({"name": "collectsubject"})
      },
      my_currency_click(){
        this.$router.push({"name": "mycurrency"})
      }
    },
    created: function () {
      this.info = checkLogin(this)
      console.log(this.info)
      if(this.info){
          //有token，但是可能过期
        checkLoginAndValidateToken(this, {ajaxFunction: USER_FAVORITE_COUNT(this, {type: 1,autoJump:false})}).then(e=>{

            //如果token失效并且不需要跳转，则e.total会出错 则会catch异常
          if(e.total){
            this.user_favorite_book_count = e.total

            //token验证成功，调用下面接口获取登录信息
            UNREAD_MESSAGE_COUNT(this).then(e=>this.unread_message_count = e.total).catch(e=>console.log(e))
            USER_FAVORITE_COUNT(this, {type: 2}).then(e => this.user_favorite_booklist_count = e.total).catch(e => console.log(e))
            GET_MY_CURRENCY_AMOUNT(this).then(e=>{this.get_my_currency = e;this.myCurrency = "我的书币  (剩余"+this.get_my_currency.total_currency+"，快过期"+this.get_my_currency.partial_currency+")";}).catch(e=>console.log(e))
            USER_PURCHASE_BOOK_COUNT(this).then(e=>this.user_purchase_book_count = e.total).catch(e=>console.log(e))
          }else {
            throw new Error()
          }

        }).catch(e=>console.log(e))
      }

//      UNREAD_MESSAGE_COUNT(this).then(e=>console.log(e)).catch(e=>console.log(e))
//      USER_FAVORITE_COUNT(this,{type:1}).then(e=>console.log(e)).catch(e=>console.log(e))  //喜欢的数据
//      USER_FAVORITE_COUNT(this,{type:2}).then(e=>console.log(e)).catch(e=>console.log(e)) //收藏的专题
//      GET_MY_CURRENCY_AMOUNT(this).then(e=>console.log(e)).catch(e=>console.log(e))
//      USER_PURCHASE_BOOK_COUNT(this).then(e=>console.log(e)).catch(e=>console.log(e))
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    watch: {
      $route () {
          console.log("$route change")
      }
    }
  }
</script>

<style scoped>
  .login {
    margin-top: 20px;
  }

  .img_login {
    margin-right: 25px;
    margin-top: 12px;
    margin-bottom: 12px;
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }

  .bell {
    width: 28px;
    height: 28px;
    padding: 5px;
  }

  .purchase_wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .purchase_wrapper .img_wrapper {
    text-align: center;
  }

  .purchase .text {
    display: block;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }

  .samll_img {
    margin-right: 25px;
    margin-top: 12px;
    margin-bottom: 12px;
    width: 28px;
    height: 28px;
  }
</style>
