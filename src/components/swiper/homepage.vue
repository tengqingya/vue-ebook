/**
* 首页和书架
* @author tengqingya
* @create 2017-05-2017/5/22 16:47
*/
<template>
  <div class="homepage">
    <v-header></v-header>
    <swiper :options="swiperOption" class="myswiperclass" ref="shujia">
      <swiper-slide>
        <bookshelf></bookshelf>
      </swiper-slide>
      <swiper-slide>
        <hello :homepagedata="homePageData"></hello>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import hello from '../Hello'

  import vHeader from '../header'
  import bookshelf from '../bookshelf'

  import {getHomePage} from '../../axios/axios'

  export default {
    name: "",
    data() {
        var self = this
      return {
        swiperOption: {
          slidesPerView: 1,
          //todo
          initialSlide :1,
          notNextTick: true,
          autoHeight: true,
          onTap: function(e){
              if(self.$refs.shujia.swiper.activeIndex == 0){
//                alert("111111111111")
              }
          },
          onSlidePrevStart:function () {
            window.scrollTo(0,0)
          }
        },
        homePageData:{},
        books:[]
      }
    },
    components:{hello,vHeader,bookshelf},
    props: {},
    methods: {},
    created: function() {
      getHomePage("").then((value)=>{
        this.homePageData = value
      })
    },
    watch: {}
  }
</script>

<style scoped>
  .homepage{
  }
  .myswiperclass {
    font-size: 0;
  }
  span{
    font-size: 20px;
  }
</style>
