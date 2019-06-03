/**
*
* @author tengqingya
* @create 2017-06-2017/6/18 13:35
*/
<template>
  <div>
    <back :desc="name">
      <span slot="desc"></span>
      <span slot="i4"></span>
    </back>

    <div v-if="charts.length === 1">
      <bookitem :book="item" :key="index" v-for="(item,index) in books"
                @click.native="clickBook(item)">
        <span slot="book_auhor"></span>
      </bookitem>
    </div>

    <div v-else>
      <div class="chart_title">
        <span v-for="(item,index) in charts" v-html="item.name" :key="index"
              class="chart_title_text"></span>
      </div>
      <div class="chart_line">
        <span class="line" :style="line_style"></span>
      </div>

      <p class="one_border"></p>

      <chartdetailsub ref="mySwiper" :length="charts.length" v-if="charts.length>1" :small_position="small_position" @stylechange="stylechange" :width="width" :charts="charts"></chartdetailsub>
    </div>
  </div>
</template>

<script>
  import back from './back'
  import {getChartDetail} from '../axios/axios'
  import bookitem from './bookitem'
  import {mapGetters} from 'vuex'

  import chartdetailsub from './chartdetailsub'

  export default {
    name: "",
    data() {
      return {
        charts: this.$route.query.chartdetail,
        name: this.$route.query.name,
        books: [],
        width: 0,
        small_position: 0, //排行榜详细页标题下的横线的位置
        line_style: "",
        translate: 0
      }
    },
    props: {},
    components: {back, bookitem,chartdetailsub},
    methods: {
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
      stylechange(e){
          this.line_style = e
      }
    },
    beforeUpdate:function (e) {
    },
    created: function () {
      this.charts = this.charts[0].id ? this.charts : this.chartDetailParam.chartdetail

      getChartDetail({id: this.charts[0].id}).then(e => {
        console.log(e)
        this.books = e.books
      }).catch(e => {
        console.warn(e)
      })

      if (this.charts.length > 1) {
          console.log("created")
        this.$nextTick(() => {
          //根据swiper对象得到屏幕的宽度

          this.width = this.$refs.mySwiper.$children[0].swiper.width

          this.small_position = parseInt(this.width / this.charts.length / 2 - 10 )//减去自身的宽度的一般


          this.line_style = "marginLeft:" + this.small_position + "px"
        })
      }
    },
    mounted: function () {
    },
    watch: {
    },
    computed: {
      ...mapGetters({
        chartDetailParam: 'chartDetailParam'
      })
    }
  }
</script>

<style scoped>
  @import "../../src/common/css/one_border.css";

  .chart_title {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    line-height: 1.429;
    text-align: center;
    margin-top: 15px;
  }

  .chart_title .chart_title_text {
    flex: 1;
  }

  .chart_line {
    width: 100%;
  }

  .chart_line .line {
    display: inline-block;
    background-color: #4caf50;
    width: 20px;
    height: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 40%;
    line-height: 2px;
    vertical-align: super;

    transition: transform 0.35s ease-out;
  }
</style>
