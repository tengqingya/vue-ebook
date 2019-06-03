/**
* 入口位
* @author tengqingya
* @create 2017-05-2017/5/24 15:12
*/
<template>
  <div class="entry">
    <div class="entry_wrap" v-for="(item,index) in entries" @click="entry_click(item)">
      <span class="entry_pic" :style="`background-image:url(`+item.icon+`)`" :key="index"></span>
      <i class="entry_text">{{item.name}}</i>
    </div>
  </div>
</template>

<script>
  import store from '../vuex/store'
    export default {
        name: "entry",
        data() {
            return {}
        },
        props: {
          entries:{
              type:Array
          },
          extensions:{
              type:Object
          }
        },
        components: {},
        methods: {
          entry_click(item){
            if(item.type === 1){
                  //排行榜
              this.$router.push({name:"chart",query:{charts:this.extensions.charts}})
              this.$store.dispatch("addChartParam",this.extensions.charts)
            }else if(item.type === 2) {
                //分类
              this.$router.push({name:"category"})
            }else if(item.type === 4){
                //特价
              this.$router.push({name:"special"})
            }else if(item.type === 3){
                //限免
              this.$router.push({name:"limit"})
            }
          }
        },
        watch: {}
    }
</script>

<style scoped>
  .entry{
    display: flex;
    width: 100%;
    height: 85px;
  }
  .entry .entry_wrap{
    flex: 1;
    text-align: center;
  }
  .entry .entry_pic{
    /*撑满一行*/
    display: block;
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
    background-repeat: no-repeat;
    margin: 15px auto;
  }
  .entry .entry_text{
    font-size: 15px;
    line-height: 15px;
  }
</style>
