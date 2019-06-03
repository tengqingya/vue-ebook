<template>
  <div class="hello">

    <swiper :options="swiperOptionContent" class="myswiperContent">
      <swiper-slide>
        <banner :banners="homepagedata.banners"></banner>
      </swiper-slide>
    </swiper>

      <entry :entries="homepagedata.entries" :extensions="homepagedata.extensions"></entry>

      <div v-for="(item,index) in homepagedata.recommendations" :key="index" >
        <div v-if="item.template === 'LIST'">
          <bookitemtitle :name="item.content_name" :num="item.books_num" @click.native.prevent="clickbooklist2(item)"></bookitemtitle>
          <bookitem  v-for="(item2,index2) in item.books"  :book="item2" :key="index2" :type="1" @click.native.prevent="clickbook(item2)">
            <span slot="book_auhor"></span>
            <span slot="book_status"></span>
            <span slot="book_limit"></span>
            <span slot="book_price"></span>
          </bookitem>
        </div>
        <div v-else-if="item.template === 'ROW' && !item.image">
          <bookitemtitle :name="item.content_name" :num="item.books_num" @click.native.prevent="clickbooklist2(item)"></bookitemtitle>
          <div style="display: flex;">
            <bookitemrow v-for="(item2,index2) in item.books"  :book="item2" :key="index2" @click.native.prevent="clickbook(item2)"></bookitemrow>
          </div>
        </div>
        <div v-else-if="item.template === 'GRIDBANNER'">
          <gridbanner :booklists="item.booklists"></gridbanner>
        </div>
        <div v-else-if="item.template === 'BANNER'">
          <bookitemtitle :name="item.title" subname="查看全部专题"></bookitemtitle>
          <banner_item :banner="item" @click.native.prevent="clickbooklist(item)"></banner_item>
        </div>
        <div v-else-if="item.template === 'GRID' || (item.template === 'ROW' && item.image)">
          <grid :grid="item"></grid>
        </div>
      </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import banner from './swiper/banner'
  import entry from './entry'
  import bookitem from './bookitem'
  import bookitemtitle from './bookitemtitle'
  import bookitemrow from './bookitemrow'
  import gridbanner from './gridbanner'
  import banner_item from './banner_item'
  import grid from './grid'

export default {
  name: 'hello',
  data () {
    return {
      swiperOptionContent: {
        slidesPerView: 0,
        direction : 'vertical',
        freeMode : true,
        notNextTick: true,
        freeModeMomentumRatio : 0.5,
//        freeModeSticky : true,
        onTap: function(e){
        }
      }
    }
  },
  created:function () {
  },
  components:{
    banner,entry,bookitem,bookitemtitle,bookitemrow,gridbanner,banner_item,grid
  },
  props:{
    homepagedata:{
          type:Object
      }
  },
  methods:{
    click2:function () {
      this.$store.dispatch("click")
    },
    clickdiv:function (e) {
      alert(this.homepagedata)
    },
    clickbook:function (item2) {
       this.$router.push({ path: '/book/detail' ,query: {"bookId":item2.id}})
    },
    clickbooklist(item,hideBanner){
      this.$router.push({ path: '/book/list' ,query: {"bookListId":item.content_id,"hideBanner":hideBanner}});
    },
    clickbooklist2(item){
      this.$router.push({ path: '/book/list2' ,query: {"bookListId":item.content_id}});
    }
  },
  computed: {
    ...mapGetters({
      userClick: 'userClick',
      userClick2: 'userClick2'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    font-size: 20px;
  }
</style>
