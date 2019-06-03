<template>
  <!-- swiper -->
  <swiper :options="swiperOptionBanner" class="myswiperclass" ref="mySwiper">
    <swiper-slide :style="`background-image:url(`+item.image+`)`" v-for="(item,index) in banners" :key="index"></swiper-slide>
  </swiper>
</template>

<script>
  import Vue from 'vue'
  import swiper from 'vue-awesome-swiper'

  Vue.use(swiper)

  const BANNER_TYPE_BOOK = 1
  const BANNER_TYPE_BOOKLIST = 2

  export default {
    name: "myswiper",
    components: {},
    data() {
        var self =this
      return {
        swiperOptionBanner: {
          slidesPerView: 1,
          paginationClickable: false,
          spaceBetween: 30,
          autoplay: 2000,
          autoplayDisableOnInteraction: false,
          loop: true,
          notNextTick: true,
          onTap: function(swiper,event){
//            alert(self.$refs.mySwiper.swiper.activeIndex)
//            console.log(event)
            let index = self.$refs.mySwiper.swiper.activeIndex
            let length = self.banners.length
            if(index > length){
                index = 0
            }else if(index === 0){
                index = length-1
            }else {
                index -= 1
            }
            let banner = self.banners[index]
            if(banner.type === BANNER_TYPE_BOOK ){
              self.$router.push({ path: '/book/detail' ,query: {"bookId":self.banners[index].content}});
            }else if(banner.type === BANNER_TYPE_BOOKLIST){
              self.$router.push({ path: '/book/list' ,query: {"bookListId":self.banners[index].content}});
            }
          }
        }
      }
    },
    props:{
      banners:{
          type:Array
      }
    },
    methods: {
    },
    created: function() {
    }
  }
</script>

<style scoped>
  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .myswiperclass {
  }

  .swiper-container-autoheight, .swiper-container-autoheight .swiper-slide{
    height: 140px;
  }
</style>
