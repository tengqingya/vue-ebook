/**
*
* @author tengqingya
* @create 2017-06-2017/6/18 13:35
*/
<template>
  <div>
    <back desc="榜单">
      <span slot="desc"></span>
    </back>

    <div class="chart_wrapper" v-for="(item,index) in groups" v-if="groups[0]" :key="index"
         @click="chart_click(item)">
      <img class="chart_image" v-lazy="item.cover_image"/>
    </div>
  </div>
</template>

<script>
  import {getChartList} from '../axios/axios'
  import {Lazyload} from 'mint-ui';

  import Vue from 'vue'
  Vue.use(Lazyload)

  import {mapGetters} from 'vuex'
  import store from '../vuex/store'

  import back from './back'
  export default {
    name: "",
    data() {
      return {
        charts: this.$route.query.charts,
        groups: []
      }
    },
    props: {},
    components: {back},
    methods: {
      chart_click(e){
        this.$store.dispatch("addChartDetailParam",{chartdetail: e.charts, name: e.name})
        this.$router.push({name: "chartdetail", query: {chartdetail: e.charts, name: e.name}})
      }
    },
    created: function () {
      this.charts = this.charts[0].id?this.charts:this.chartParam
      let ids = this.charts.map(item => item.id).toString()
      getChartList({ids: "[" + ids + "]"}).then(e => {
        this.groups = e.groups
      }).catch(e => {
        console.warn(e)
      })

    },
    watch: {},
    computed: {
      ...mapGetters({
        chartParam: 'chartParam'
      })
    }
  }
</script>

<style scoped>
  .chart_wrapper {
    width: 90%;
    height: 120px;
    margin: 5% 5% 2% 5%;
  }

  .chart_image {
    width: 100%;
    height: 100%;
  }
</style>
