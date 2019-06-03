/**
* 头部
* @author tengqingya
* @create 2017-05-2017/5/23 14:05
*/
<template>
  <div class="header">
    <span>我的书架</span>
    <span>书店</span>
    <i class="iconfont search" @click="click">&#xe600;</i>
    <i class="iconfont" @click="click2">&#xe633;</i>
  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {}
    },
    props: {},
    components: {},
    methods: {
      click: function () {
        this.$router.push({path: '/search'});
      },
      click2: function () {
        this.$router.push({path: '/user/center'});
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: relative;
  }

  .header span {
    font-size: 20px;
    display: inline-block;
    position: relative;
    left: 4px;
    padding-right: 30px;
    vertical-align: middle;
  }

  .header i {
    font-size: 30px;
    display: inline-block;
    position: absolute;
    right: 10px;
  }

  .header .search {
    margin-right: 50px;
  }
</style>
