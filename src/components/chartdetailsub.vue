/**
*
* @author tengqingya
* @create 2017-06-2017/6/20 16:00
*/
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(item2,index2) in chartsArray" :key="index2">
      <bookitem :book="item" :key="index" v-for="(item,index) in item2"
                @click.native="clickBook(item)">
        <span slot="book_auhor"></span>
      </bookitem>
      <infinite-loading :on-infinite="loadMore" ref="infiniteLoading" v-if="index2 === activeIndex"
                        spinner="bubbles">
        <span slot="no-more">
      There is no more data
        </span>
      </infinite-loading>
    </swiper-slide>

  </swiper>
</template>

<script>
  import Vue from 'vue'
  import swiper from 'vue-awesome-swiper'

  Vue.use(swiper)

  import InfiniteLoading from 'vue-infinite-loading';

  import {getChartDetail} from '../axios/axios'
  import bookitem from './bookitem'
  export default {
    name: "",
    data() {
      var self = this
      return {
        swiperOption: {
          slidesPerView: 1,
          paginationClickable: false,
          loop: false,
          notNextTick: true,
          onTap: function (swiper, event) {
          },
          onSliderMove: function (swiper, event) {
            self.translate = swiper.translate
          },
          onTransitionEnd: function (swiper) {

            self.translate = swiper.translate
            self.activeIndex = swiper.activeIndex
          },
          onSlidePrevStart: function () {
            window.scrollTo(0, 0)
          },
          onSlideNextStart: function () {
            window.scrollTo(0, 0)
          }
        },
        autoHeight: false,
        line_style: "",
        translate: 0,
        small_position_self: 1,
        chartsArray: [],
        activeIndex: 0
      }
    },
    props: {
      length: {
        type: Number,
        default: 1
      },
      small_position: {//排行榜详细页标题下的横线的位置
        type: Number,
        default: 1
      },
      width: {
        type: Number,
        default: 1
      },
      charts: {}
    },
    components: {bookitem, InfiniteLoading},
    updated: function () {
      console.log("update sub")
    },
    methods: {
      computePosition: function (newValue, oldValue, reset) {

        if (reset) {
//              this.line_style = "marginLeft:"+newValue+"px"
          this.line_style = "transform:translate(" + newValue + "px,0px);"
          this.small_position_self = newValue
        } else {
          let distance = Math.ceil((oldValue - newValue) / this.length)
          this.small_position_self = this.small_position_self + distance

//              this.line_style = "marginLeft:"+this.small_position_self+"px"
          this.line_style = "transform:translate(" + this.small_position_self + "px,0px);"
        }
//        return newValue

        this.$emit("stylechange", this.line_style)
      },
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
      loadMore: function () {
        console.log("loadMore")
            getChartDetail({id: this.charts[this.activeIndex]['id'],offset:this.chartsArray[this.activeIndex].length}).then(e=>{
              this.chartsArray[this.activeIndex].push(...e.books)
          this.$refs.infiniteLoading&&this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }).catch(e => {
            //todo this is a  bug
            console.log(e)
        })
      }
    },
    created: function () {
      this.charts.map((item) => {
        getChartDetail({id: item.id}).then(e => {
          this.chartsArray.push(e.books)
        }).catch(e => {
          console.warn(e)
        })
      })
    },
    watch: {
      translate: function (newValue, oldValue) {
        let reset = false
        if (Math.abs(newValue) % this.width === 0) {
          let marginleft = Math.abs(newValue) / this.length + this.small_position
          newValue = marginleft
          reset = true
        }

        this.computePosition(newValue, oldValue, reset)
      },
      small_position: function (newValue) {
        this.small_position_self = newValue
      }
    }
  }
</script>

<style scoped>
</style>
