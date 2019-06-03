/**
* 模版上面标题
* @author tengqingya
* @create 2017-05-2017/5/26 9:57
*/
<template>
  <div class="book_item_title">
    <span class="icon1"></span>
    <span class="text1">{{name}}</span>
    <span class="text2">{{num?`共`+num+`本`:subname}}</span>
    <i class="iconfont icon2" v-if="num">&#xe604;</i>

      <span class="icon2" :style="mycolor" v-if="time.text && $slots.timer">{{time.text}}</span>
      <span class="icon2" :style="mycolor" v-else-if="$slots.timer">{{time.HH}}:{{time.mm}}:{{time.ss}}</span>
  </div>
</template>

<script>
  import {getTime} from '../util/timeutil'
  export default {
    name: "",
    data() {
      return {
          now:new Date().getTime(),
          time:{}
      }
    },
    props: {
      name: {
        type: String
      },
      num: {
        type: Number
      },
      subname: {
        type: String
      },
      mycolor: {
        type: Object,
        default:function () {
          return {color: "#ef4f4f"}
        }
      },
      time_end:0,
      free_type:{
        type: Number,
        default:0
      }
    },
    components: {},
    methods: {
      run: function() {
        this.now = new Date().getTime()
        let time = getTime(this.time_end, this.now)
        if (this.time_end >= this.now) {
            this.time = time
        } else {
            if(this.free_type === 2){
              this.time.text = "特价结束"
            }else if(this.free_type === 1){
              this.time.text = "限免结束"
            }
          return
        }
        setTimeout(this.run, 1000)
      }
    },
    watch: {},
    created:function () {
        this.run()
    }
  }
</script>

<style scoped>
  .book_item_title {
    position: relative;
    width: 100%;
    height: 30px;
    margin-top: 15px;
  }

  .book_item_title .icon1 {
    display: inline-block;
    width: 8px;
    height: 30px;
    background-color: lightgreen;
  }

  .book_item_title .text1 {
    display: inline-block;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    font-weight: bolder;
    margin-left: 5px;
    vertical-align: top;
  }

  .book_item_title .text2 {
    position: absolute;
    font-size: 15px;
    line-height: 15px;
    height: 10px;
    right: 30px;
    top: 38%;
  }

  .book_item_title .icon2 {
    position: absolute;
    right: 10px;
    top: 38%;
    color: aqua;
  }
</style>
