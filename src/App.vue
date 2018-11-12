<template>
    <div class="top-nav">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <router-link v-for="(item,index) in navList" :key="index" :to="item.path" tag="div" class="swiper-slide">{{item.text}}</router-link>
            </div>
        </div>

        <ul class="item right">
            <li @click="bigger()"><i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i></li>
        </ul>

        <router-view></router-view>

    </div>

</template>

<script>
import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper/dist/js/swiper.min.js"
import axios from 'axios'

import Home from "./views/Home.vue"

export default {
    data() {
        return {
            navList: [
                { path: "/", text: "推荐" },
                { path: "/focus", text: "关注" },
                { path: "/video", text: "视频" },
                { path: "/entertainment", text: "娱乐" },
                { path: "/sports", text: "体育" },
                { path: "/finance", text: "财经" },
                { path: "/military", text: "军事" },
                { path: "/travel", text: "旅游" }
            ]
        }
    },
    components: {
        Home
    },
    methods: {
        bigger() {
            if (window.localStorage.user) {
                this.$router.push("/personal")
            } else {
                this.$router.push("/entrys")
            }
        }
    },
    created() {
        axios.get("http://10.2.2.245:8088/index").then((json) => {
            this.$store.dispatch("updateList", json.data)
        })
        if (window.localStorage.user) {
            axios.get("http://10.2.2.245:8088/rangdenglu", {
                params: {
                    user: window.localStorage.user
                }
            }).then((json) => {
                this.$toast(window.localStorage.user + "---已自动登录")
                this.$store.dispatch("updateUser", json.data.data.result)
            })
        }
    },
    mounted() {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 5
        });
    }
}
</script>

<style lang="less" scoped>
.top-nav {
  background-color: #ececec;
  height: 50px;
  margin-bottom: 10px;
  .swiper-container {
    width: 80%;
    height: 50px;
    line-height: 50px;
    float: left;
    .swiper-slide {
      text-align: center;
      font-size: 18px;
    }
  }
  .item {
    li {
      font-size: 18px;
      line-height: 50px;
      display: inline-block;
      width: 30px;
      margin-left: 15px;
      text-align: center;
    }
  }
  .right {
    width: 18%;
    float: right;
  }
}
</style>