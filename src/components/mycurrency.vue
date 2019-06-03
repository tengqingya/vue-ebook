/**
* 我的书币
* @author tengqingya
* @create 2017-07-2017/7/29 14:44
*/
<template>
  <div>
    <back desc="我的书币" :type="2">
      <span slot="desc"></span>
      <span slot="i2"></span>
      <span slot="i5"></span>
    </back>

    <div class="shubi_wrapper">
      <span class="shubi1 iconfont">&#xe602;</span>
      <div class="shubi2 iconfont" v-if="total_currency">{{total_currency+"书币"}}&#xe62b;</div>
      <div class="shubi3" v-if="partial_currency">{{partial_currency + "书币即将过期"}}</div>
    </div>

    <div class="chongzhi_wrapper">
      <bookitemtitle name="书币充值"></bookitemtitle>
      <div class="taocan_wrapper">
        <div v-for="item in packages" class="taocan_item">
          <div class="item">￥{{item.price/100}}</div>
          <div class="item">{{item.recharge_currency_amount}} 书币</div>
          <div class="item"> + 送 {{item.present_currency_amount}} 书币</div>
        </div>
      </div>
    </div>

    <img class="image"/>
  </div>
</template>

<script>
  import {GET_MY_CURRENCY_AMOUNT,LIST_RECHARGE_PACKAGES} from '../axios/axios'
  import back from './back'
  import bookitemtitle from './bookitemtitle'
  export default {
    name: "",
    data() {
      return {
        get_my_currency:{},
        packages:[]
      }
    },
    props: {},
    components: {back,bookitemtitle},
    methods: {},
    created: function () {
      GET_MY_CURRENCY_AMOUNT(this).then(e => {
        this.get_my_currency = e;
        console.log(e)
      }).catch(e => console.log(e))

      LIST_RECHARGE_PACKAGES(this).then(e=>{
          this.packages = e.packages
      }).catch(e=>console.warn(e))
    },
    computed: {
      partial_currency(){
          return this.get_my_currency.partial_currency
      },
      total_currency(){
        return this.get_my_currency.total_currency
      }
    }
  }
</script>

<style scoped>
  .shubi_wrapper {
    width: 100%;
    height: 120px;
    text-align: center;
  }

  .shubi_wrapper .shubi1 {
    display: inline-block;
    font-size: 50px;
    margin: 10px auto;
    color: #ffd306;
  }
  .shubi_wrapper .shubi2{
    margin: 8px auto;
  }
  .shubi_wrapper .shubi3{
    font-size: 10px;
    color: #ff4949;
  }
  .chongzhi_wrapper{
  }
  .taocan_wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 10px;

    padding-bottom: 50px;
  }
  .taocan_wrapper .taocan_item{
    width: 45%;
    height: 60px;
    background-color: #dedede;
    margin: 2px auto;
    padding: 5px;
  }
  .taocan_wrapper .taocan_item .item{
    margin-bottom: 5px;
  }
  .taocan_wrapper .taocan_item .item:nth-child(1){
    font-size: 20px;
  }
  .taocan_wrapper .taocan_item .item:nth-child(2){
    font-size: 12px;
  }
  .taocan_wrapper .taocan_item .item:nth-child(3){
    font-size: 12px;
    color: #4caf50;
  }
  .image{
    background-image: url(../common/pic/zhubajie.png);
    background-repeat: no-repeat;
    display: block;
    margin: auto;
    animation: play02 1.4s steps(8) infinite;
    width:200px;
    height:200px;
  }
  @keyframes play02{
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -1600px 0;
    }
  }
</style>
