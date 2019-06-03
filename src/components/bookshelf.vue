/**
* 书架
* @author tengqingya
* @create 2017-06-2017/6/1 14:48
*/
<template>
  <div class="wrapper">
    <div class="head" @click="signInClick">
      <img src="../common/pic/afternoon.png" class="image"/>
      <span class="hello">下午好，{{info ? info.user_name : "请登录"}}</span>
      <span class="sign_image"></span>
      <span class="text">签到</span>
    </div>
    <div class="content">
      <div class="book" v-for="item in books" @click="click_read">
        <img v-lazy="item.image" class="item_image"/>
        <span class="item_text">{{item.name}}</span>
      </div>
      <div class="add">
        <span class="default iconfont">&#xe676;</span>
      </div>
    </div>
    <div class="shelf_modal" v-if="showModal && signInfo2" @click="modalClick">
    </div>
    <div class="sigin_recomment_wrapper" v-if="showModal && signInfo2">
      <span class="sign_money" v-if="signInfo1 && signInfo1.base_info">{{signInfo1.base_info.award_name}}</span>
      <span class="sign_money" v-else>{{signInfo2.base_info.award_name}}</span>
      <span class="sign_detail" v-if="signInfo2">{{signInfo2.base_info.is_sign_in?`今天已签到，再签到`+(7-signInfo2.base_info.days)+`天奖励更丰厚`:"*****"}}</span>
      <img :src="signInfo1.base_info.award_image" class="image_sign" v-if="signInfo1 && signInfo1.base_info"/>
      <img :src="signInfo2.base_info.award_image" class="image_sign" v-else/>
      <div v-if="signInfo2" style="display: flex">
        <bookitemrow v-for="(item,index) in signInfo2.recommend_info.books" :key="index" :book="item"></bookitemrow>
      </div>

      <div class="sign_more">更多推荐</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {checkLogin} from '../localStorage/localStorage'
  import bookitemrow from './bookitemrow'
  import { Lazyload } from 'mint-ui';

  import {GET_USER_SIGN_IN_INFO, USER_SIGN_IN,USER_SHELF_BOOKS} from '../axios/axios'
  export default {
    name: "bookshelf",
    data() {
      return {
        info: {},
        showModal:false,
        signInfo1:undefined,
        signInfo2:undefined,
        books:[{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"},{"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"}]
      }
    },
    props: {
    },
    components: {bookitemrow},
    methods: {
      signInClick: function () {
        if (this.info) {
          console.log("login in")
          this.showModal = true
          USER_SIGN_IN(this).then((e) =>
          {
              console.log(e)
            this.signInfo1 = e

            this.getBooks()
          }
          ).then(
            GET_USER_SIGN_IN_INFO(this).then((e) => {
              this.signInfo2 = e
              this.getBooks()
            })).catch((e) => {
            console.warn("error````````````````````")
          })
        } else {
          this.$router.push({"name": "login"})
        }
      },
      modalClick:function () {
        this.showModal = false
      },
      getBooks(){
        //登录了请求书架信息
        USER_SHELF_BOOKS(this).then(e=>{
          console.log(e)
          if(e.books.length > 0){
            //有自己书架的书
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            this.books = e.books
          }else if(e.recommend_books){
            console.log(e.recommend_books)
            //有推荐的书
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            e.recommend_books.push({"image":"http://img1.write.qq.com/upload/cover/2015-07-01/d59573407ff5ff674518670a27730534.jpg","name":"伪造的数据"})
            this.books = e.recommend_books
          }
        }).catch(e=>{
          console.warn("error````````````````````")
        })
      },
    click_read(){
      this.$router.push({path: '/reader'})
    }
    },
    created: function () {
      this.info = checkLogin(this)
      this.getBooks()
    },
    watch: {
      loginInfo: function (val, oldVal) {
        if (val) {
          this.info = val
        }
      }
    },
    computed: {
      ...mapGetters({
        loginInfo: 'loginInfo'
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    position: relative;
    width: 100%;
  }

  .wrapper .head {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .wrapper .head .image {
    width: 20px;
    height: 20px;
  }

  .wrapper .head .hello {
    font-size: 20px;
  }

  .wrapper .head .sign_image {
    display: inline-block;
    position: absolute;
    top: 5px;
    right: 27px;
    height: 40px;
    background-image: url("../common/pic/sign_in.png");
    background-repeat: no-repeat;
    width: 46px;
    background-size: 46px 40px;
  }

  .wrapper .head .text {
    display: inline-block;
    position: absolute;
    right: 30px;
    height: 40px;
    font-size: 20px;
  }

  .wrapper .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    margin: auto 5%;
  }

  .wrapper .content .book {
    width: 100px;
    height: 200px;
    margin-top: 20px;
  }

  .wrapper .content .book .item_image {
    display: inline-block;
    background-size: 100px 150px;
    width: 100px;
    height: 150px;
    background-repeat: no-repeat;
  }

  .wrapper .content .book .item_text {
    display: inline-block;
    font-size: 18px;
    margin-top: 5px;

    word-break: break-all; /** 换行 **/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  .wrapper .content .add {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 150px;
    margin-top: 20px;
  }

  .wrapper .content .default {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    padding-top: 50%;
    background-color: #dedede;
  }
  .shelf_modal{
    position: fixed;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 666;
    opacity: 0.5;
    background-color: #000;
  }
  .sign_money{
    display: inline-block;
    width: 100%;
    height: 30px;
    font-size: 20px;
    text-align: center;
    font-weight: 600;
    line-height: 30px;
    margin-top: 15px;
  }
  .sign_detail{
    display: inline-block;
    width: 100%;
    height: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
  }
  .sigin_recomment_wrapper{
    position: fixed;
    top: 15%;
    margin: 0 10%;
    background: #fff;
    height: 55%;
    z-index: 777;
    padding: 10px;
  }
  .image_sign{
    width: 50%;
    height: 60px;
    margin: 5% 25%;
    background-size: contain;
  }
  .sign_more{
    text-align: center;
    padding: 10px 40px;
    color: mediumseagreen;
    font-size: 15px;
    margin-top: 15px;
  }
</style>
