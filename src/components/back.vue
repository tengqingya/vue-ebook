/**
* 返回箭头头部
* @author tengqingya
* @create 2017-05-2017/5/31 19:47
*/
<template>
  <div class="wrap" :style="mystyle">
    <span class="iconfont back" @click="back">&#xe61f;</span>
    <span class="desc" v-if="$slots.desc" :style="desc_mystyle">{{desc}}</span>
    <i class="iconfont padding margin_right" v-if="$slots.i1">&#xe626;</i>
    <i class="iconfont padding" v-if="$slots.i2">{{type == 1 ? '&#xe605;' : '&#xe643;'}}</i>
    <i class="iconfont padding"
       v-else-if="$slots.i3" :style="i3_style">{{booklistFavourite != 2 ? '&#xe623;' : '&#xe621;'}}</i>
    <i class="iconfont padding" v-else-if="$slots.i4" @click="search_click" style="font-size: 22px">&#xe600;</i>
    <i class="iconfont padding" v-if="$slots.i5" style="right: 30px">&#xe607;</i>

    <slot name="expand"></slot>
    <p class="one_border margin_top" v-if="borderShow"></p>

  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {
      desc: {
        type: String,
        default: ""
      },
      type: {
        type: Number,
        default: 1
      },
      booklistFavourite: {
        type: Number,
        default: 1
      },
      mystyle: {},
      borderShow: {
        type: Boolean,
        default: true
      },
      i3_style:{},
      desc_mystyle:{}
    },
    components: {},
    methods: {
      back: function () {
        this.$router.go(-1)
      },
      search_click(){
        this.$router.push({path: '/search'})
      }
    },
    created: function () {
    },
    watch: {}
  }
</script>

<style scoped>
  @import "../../src/common/css/one_border.css";

  .wrap {
    width: 100%;
    position: relative;
  }

  .back {
    display: inline-block;
    width: 40px;
    font-size: 25px;
    margin-top: 4%;
  }

  .desc {
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
  }

  .margin_top {
    margin-top: 10px;
  }

  .padding {
    position: absolute;
    display: inline-block;
    bottom: -5px;
    right: 10px;
    padding: 5px;
  }

  .margin_right {
    margin-right: 30px;
  }
</style>
