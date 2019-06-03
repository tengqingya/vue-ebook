/**
*
* @author tengqingya
* @create 2017-06-2017/6/24 12:58
*/
<template>
  <div class="category_detail">
    <back :desc="detail.name">
      <span slot="desc"></span>
      <span slot="i4"></span>
    </back>

    <div class="desc">
      <div class="desc_wrapper">
        <div class="text1_wrapper">
          <span class="text1" :class="{picked:end_status_index ===-1}"
                @click="click_end_status(-1)">全部</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
        <div class="desc_detail_wrapper">
          <span class="text" :class="{picked:end_status_index ===0}"
                @click="click_end_status(0)">连载</span>
          <span class="text" :class="{picked:end_status_index ===1}"
                @click="click_end_status(1)">完结</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
      </div>
      <p class="one_border"></p>
    </div>

    <div class="desc">
      <div class="desc_wrapper">
        <div class="text1_wrapper">
          <span class="text1" :class="{picked:free_type_index ===-1}" @click="click_free_type(-1)">全部</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
        <div class="desc_detail_wrapper">
          <span class="text" :class="{picked:free_type_index ===0}"
                @click="click_free_type(0)">收费</span>
          <span class="text" :class="{picked:free_type_index ===1}"
                @click="click_free_type(1)">免费</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
      </div>
      <p class="one_border"></p>
    </div>

    <div class="desc">
      <div class="desc_wrapper">
        <div class="text1_wrapper">
          <span class="text1" :class="{picked:third_category_index ===-1}"
                @click="click_third_category(-1)">全部</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
        <div class="desc_detail_wrapper">
          <span class="text" v-for="(item,index) in detail.third_categories" :key="index"
                v-text="item.name" :class="{picked:third_category_index ===index}"
                @click="click_third_category(index)"></span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
      </div>
      <p class="one_border"></p>
    </div>

    <div class="desc">
      <div class="desc_wrapper">
        <div class="text1_wrapper">
          <span class="text1" :class="{picked:sub_condition_index ===0}"
                @click="click_sub_condition(0)">综合</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
        <div class="desc_detail_wrapper">
          <span class="text" :class="{picked:sub_condition_index ===1}"
                @click="click_sub_condition(1)">销量最高</span>
          <i style="display: inline-block;width: 0;height: 100%;vertical-align: middle"></i>
        </div>
      </div>
      <p class="one_border"></p>
    </div>


    <div>
      <bookitem :book="item" :key="index" v-for="(item,index) in books"
                :book_desc_style="desc_style" @click.native="clickBook(item)">
        <span slot="book_auhor"></span>
      </bookitem>

      <infinite-loading :on-infinite="loadMore" ref="infiniteLoading" spinner="bubbles">
        <span slot="no-more">
      There is no more data
        </span>
      </infinite-loading>
    </div>


  </div>

</template>

<script>
  import back from './back'
  import bookitem from './bookitem'

  import {getcategorydetail} from '../axios/axios'

  import InfiniteLoading from 'vue-infinite-loading';


  import {mapGetters} from 'vuex'

  export default {
    name: "",
    data() {
      return {
        detail: this.$route.query.detail,
        end_status: -1,
        free_type: -1,
        offset: 0,
        count: 10,
        third_category_id: 0,
        sub_condition: 0,
        total: 0,
        books: [],

        end_status_index: -1,
        free_type_index: -1,
        third_category_index: -1,
        sub_condition_index: 0,

        desc_style: {marginTop: "12px"},
      }
    },
    props: {},
    components: {back, bookitem, InfiniteLoading},
    methods: {
      click_sub_condition(index){
        this.sub_condition_index = index
        this.sub_condition = index
        this.getAjax()
      },
      click_end_status(index){
        this.end_status_index = index
        this.end_status = index
        this.getAjax()
      },
      click_free_type(index){
        this.free_type_index = index
        this.free_type = index
        this.getAjax()
      },
      click_third_category(index){
        if (index === -1) {
          this.third_category_index = index
          this.third_category_id = 0
        } else {
          this.third_category_index = index
          this.third_category_id = this.detail.third_categories[index].id
        }
        this.getAjax()
      },
      getAjax(){
        getcategorydetail({
          id: this.detail.id,
          end_status: this.end_status,
          free_type: this.free_type,
          offset: this.offset,
          count: this.count,
          third_category_id: this.third_category_id,
          sub_condition: this.sub_condition
        }).then(e => {
          this.total = e.total
          this.books = e.books
        }).catch(e => console.warn(e))
      },
      loadMore: function () {
        if (this.books.length >= this.total) {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        }
        getcategorydetail({
          id: this.detail.id,
          end_status: this.end_status,
          free_type: this.free_type,
          offset: this.books.length,
          count: this.count,
          third_category_id: this.third_category_id,
          sub_condition: this.sub_condition
        }).then(e => {
          this.books.push(...e.books)
          this.$refs.infiniteLoading && this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }).catch(e => console.warn(e))
      },
      clickBook(item){
        this.$router.push({path: '/book/detail', query: {"bookId": item.id}})
      },
    },
    created: function () {
      this.$route.query.detail.id && this.$store.dispatch("addcategorydetail",this.$route.query.detail)
      !this.$route.query.detail.id && (this.detail = this.categorydetail)
      this.getAjax()
    },
    watch: {},
    computed:{
      ...mapGetters({
        categorydetail: 'categorydetail'
      })
    }
  }
</script>

<style scoped>
  @import "../../src/common/css/one_border.css";

  .category_detail {
    width: 100%;
  }

  .desc {
    width: 90%;
    height: 60px;
    margin-top: 6%;
    margin-left: 5%;
    margin-right: 5%;
    font-size: 20px;
    line-height: 10px;
  }

  .desc_wrapper {
    width: 100%;
    display: flex;
  }

  .text1_wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 60px;
    display: table;
  }

  .desc_wrapper .text1_wrapper .text1 {
    display: inline-block;
    vertical-align: middle;
  }

  .desc_wrapper .text {
    flex: 1;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    padding: 5px;
  }

  .desc_wrapper .desc_detail_wrapper {
    margin-left: 5%;
    height: 60px;
  }

  .one_border {
    margin-top: 5px;
  }

  .picked {
    color: #4caf50;
  }
</style>
