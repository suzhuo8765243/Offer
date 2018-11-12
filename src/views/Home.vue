<template>
  <div class="app">
    <!-- 图片轮播 -->
    <div class="swiper-parent">
      <div class="swiper-wrapper">

        <div class="swiper-slide" v-for="(item,index) in barList" :key="index">
          <img width="100%" height="140" :src="item" alt="新闻图片">
        </div>

      </div>
    </div>

    <div class="content">
      <span class="title-box"></span>
      <span class="title-news">新闻快讯</span>
      <ul class="news-text">
        <!-- 推荐列表项 -->
        <li>老干妈推出辣酱加卫衣套餐，瞬间被秒杀！</li>
        <li>李锦莲案国家赔偿290万 其女：将向最高法院申请复议</li>
        <li>奇迹！ 1岁半女童深山走失88小时候生还</li>
        <li>从4999元到12799元，iPhone越卖越贵的原因找到了！</li>
      </ul>

      <div v-for="item in dataList" :key="item.newId">
        <ListText v-if="item.newType === '文本'" :data="item" @click.native="toArticle(item)"></ListText>
        <ListImg v-if="item.newType === '图片'" :data="item" @click.native="toPicImg(item)"></ListImg>
        <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
      </div>

    </div>
  </div>
</template>

<script>
import ListText from '../components/ListText.vue'
import ListImg from '../components/ListImg.vue'
import ListVid from '../components/ListVid.vue'

import axios from 'axios'
import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper/dist/js/swiper.min.js"

import { mapState } from 'vuex'
export default {
  data() {
    return {
      barList: []
    }
  },
  methods: {
    // 跳转到图片详情
    toPicImg: function (item) {
      this.$store.dispatch("updateClick", item)
      this.$router.push("/picimg")
    },
    // 跳转到文章详情
    toArticle: function (item) {
      this.$store.dispatch("updateClick", item)
      this.$router.push("/article")
    }
  },
  computed: {
    ...mapState(["dataList"])
  },
  created() {
    axios.get("http://10.2.2.245:8088/home_list_img").then((json) => {
      this.barList = json.data
    })
  },
  mounted() {
    setTimeout(() => {
      var swiper = new Swiper('.swiper-parent', {
        loop: true,
      })
    }, 0);
  },
  components: {
    ListText,
    ListImg,
    ListVid
  }
}
</script>

<style lang="less" scoped>
  .app {
    font-size: 14px;
    font-family: "微软雅黑";
    .content {
      padding: 10px;
      .title-box {
        width: 5px;
        height: 20px;
        margin-top: 5px;
        background-color: red;
        margin-right: 8px;
        float: left;
      }
      .title-news {
        display: inline-block;
        font-weight: bold;
        font-size: 16px;
        margin-top: 8px;
      }
      .news-text {
        margin: 10px 0;
        li {
          width: 100%;
          height: 35px;
          line-height: 35px;
          color: rgb(157, 157, 157);
          font-size: 14px;
          overflow: hidden;
          margin-left: 12px;
        }
      }
    }
  }
</style>