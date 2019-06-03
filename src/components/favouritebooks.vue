/**
* 喜欢的书籍
* @author tengqingya
* @create 2017-07-2017/7/8 13:28
*/
<template>
  <div>
    <booklist2 :isFavouritedBooks="true"></booklist2>
  </div>
</template>

<script>
  import booklist2 from './booklist2'
  import {USER_PURCHASE_LIST,USER_FAVORITE_IDS,USER_FAVORITE_LIST,LIST_MESSAGE,LIST_RECHARGE_PACKAGES,GET_MY_CURRENCY_BILL_DETAIL,COUPON_CODES} from '../axios/axios'
    export default {
        name: "",
        data() {
            return {
            }
        },
        props: {},
        components: {booklist2},
        methods: {},
        created: function () {
//          USER_FAVORITE_IDS(this,{type:1,id:0}).then(e=>console.log(e)).catch(e=>console.log(e))
//          USER_FAVORITE_LIST(this,{type:1}).then(e=>console.log(e)).catch(e=>console.log(e))
//          LIST_MESSAGE(this).then(e=>console.log(e)).catch(e=>console.log(e))
//          LIST_RECHARGE_PACKAGES(this).then(e=>console.log(e)).catch(e=>console.log(e))
//          GET_MY_CURRENCY_BILL_DETAIL(this).then(e=>console.log(e)).catch(e=>console.log(e))
//          COUPON_CODES(this,{query_type:0,index:0,size:20}).then(e=>console.log(e)).catch(e=>console.log(e))
//          USER_PURCHASE_LIST(this).then(e=>this.user_purchased  = e ).catch(e=>console.warn(e))
        },
        watch: {}
    }
</script>

<style scoped>
</style>
