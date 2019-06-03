/**
*
* @author tengqingya
* @create 2017-06-2017/6/7 18:55
*/
<template>
  <div>
    <div class="comment" v-for="(comment_item,comment_index) in comment_info.comments" :key="comment_item.id" :class="comment_item.reply_count?'':comment_height" @click="click_native(comment_item)">
      <div class="image_wrapper">
        <img :src="comment_item.icon"/>
      </div>
      <div class="content_wrapper">
        <div class="praise_wrapper">
          <div class="user_name">{{comment_item.user_name}}</div>
          <div class="time">{{getTime(comment_item.comment_time)}}</div>
          <div class="star_wrapper">
          <span class="star iconfont" :style="starOpacity[key]" v-for="(item,key) in comment_item.star"
                :key="key">&#xe685;</span><span class="star_left iconfont" :style="starOpacity[key]" v-for="(item,key) in star_left(comment_item.star)" v-if="comment_item.star>0 && comment_item.star<5"
                  :key="key">&#xe685;</span>
          </div>
          <div class="comment_detail">
            {{comment_item.content}}
          </div>
          <div class="face_wrapper">
            <span class="praise_count">{{comment_item.praise_count}}</span>
            <span class="iconfont" style="color: gold">&#xe601;</span>
          </div>
        </div>

        <div class="reply_wrapper" v-if="comment_item.reply_count" :class="comment_item.star?'':reply_wrapper_margin">
          <div class="reply_detail" v-for="(reply_item,reply_index) in comment_item.replies" :key="reply_index">{{reply_item.user_name}}：{{reply_item.content}}</div>
          <div class="all_reply" v-if="comment_item.reply_count>2">全部{{comment_item.reply_count}}条回复</div>
        </div>
      </div>
    </div>

    <div v-if="comment_info.total>6" class="comment_total">查看全部{{comment_info.total}}条评论</div>
  </div>
</template>

<script>
  import {getTimeAgo} from '../util/timeutil'
  export default {
    name: "commentitem",
    data() {
      return {
        stars: 5,
        starOpacity: [],
        comment_height:{
          comment_height:true
        },
        reply_wrapper_margin:{
          reply_wrapper_margin:true
        }
      }
    },
    props: {
      comment_info:{}
    },
    components: {},
    methods: {
      getTime(e){
        return getTimeAgo(e)
      },
      star_left(e){
          return 5-e
      },
      click_native(e){
        // 由于对象映射，所以调用test对象等于调用Android映射的对象
        test.hello(JSON.stringify(e));
//        alert(JSON.stringify(e))
      }
    },
    created: function () {
      for (let i = 0; i < this.stars; i++) {
        this.starOpacity[i] = "opacity:0." + (9 - i)
      }
    },
    watch: {},
    computed:{
    }
  }
</script>

<style scoped>
  .comment {
    width: 90%;
    height: 200px;
    margin: 5% 5%;
    display: flex;
  }
  .comment_height{
    height: 100px;
  }

  .comment .image_wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
  }

  .comment .image_wrapper, img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  .comment .content_wrapper {
    flex: 1;
    margin-left: 10px;
  }

  .praise_wrapper {
    position: relative;
    height: 70px;
    line-height: 20px;
  }

  .praise_wrapper .user_name {
    font-size: 14px;
  }

  .praise_wrapper .time {
    font-size: 10px;
  }

  .praise_wrapper .comment_detail {
    height: 24px;
    font-size: 12px;
    line-height: 12px;

    word-break: break-all; /** 换行 **/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  .face_wrapper {
    position: absolute;
    width: 40px;
    height: 25px;
    line-height: 25px;
    right: 2px;
    top: 2px;
  }

  .face_wrapper .praise_count {
    display: inline-block;
    font-size: 12px;
    vertical-align: bottom;
  }

  .face_wrapper .iconfont {
    display: inline-block;
    font-size: 25px;
  }

  .reply_wrapper {
    background-color: #f0f0f0;
    margin-top: 40px;
    padding: 15px;
  }
  .reply_wrapper_margin{
    margin-top: 20px;
  }

  .reply_wrapper .reply_detail {
    font-size: 14px;
    margin-bottom: 10px;

    word-break: break-all; /** 换行 **/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  .reply_wrapper .all_reply {
    font-size: 12px;
    color: #d0d0d0;
  }

  .comment .star {
    color: orange;
    padding-right: 2px;
    font-size: 8px;
  }

  .comment .star_left {
    color: #d0d0d0;
    padding-right: 2px;
    font-size: 8px;
  }
  .comment_total{
    text-align: center;
    padding: 10px 40px;
    color: mediumseagreen;
  }

</style>
