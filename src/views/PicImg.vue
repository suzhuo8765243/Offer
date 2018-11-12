<template>
  <div id="pic-detail">
    <div class="swiper-container-img">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in clickData.newContent" :key="index">
          <div class="follow">
            <button @click="isSelected()" class="selected" v-show="!selected">收藏</button>
            <button @click="isSelected()" class="no-selected" v-show="selected">已收藏</button>
          </div>
          <ul>
            <li>
              <div :style="picObj" class="mainpic">
                <img :src="item.src" alt="">
              </div>
            </li>
            <li>
              <!-- 文章作者 -->
              <div class="author">
                <div class="icon"><img @click="photoClick()" :src="clickData.newPerson.newPersonPhtot" alt=""></div>
                <div class="username"><a href="#">{{clickData.newPerson.newPersonName}}</a></div>
                <div class="time"><a href="#">{{clickData.newDate|date}}</a></div>
                <div class="follow"></div>
              </div>
            </li>
            <li>
              <!-- 图片详情 -->
              <div class="info">
                <div class="num"><span>{{++index}}/{{clickData.newContent.length}}</span></div>
                <div class="title"><span>{{item._title_}}</span></div>
                <div class="detail"><span>{{item._text_}}</span></div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import "swiper/dist/css/swiper.min.css"
import Swiper from "swiper/dist/js/swiper.min.js"
import axios from 'axios'
export default {
  data() {
    return {
      picObj: {
        height: "100%",
        width: "100%"
      },
      selected: false
    }
  },
  filters: {
    date(val) {
      var time = new Date(val)
      return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()
    }
  },
  mounted() {
    var swiper = new Swiper('.swiper-container-img', {
      slidesPerView: 1
    })
    this.picObj.width = window.innerWidth + 'px'
    this.picObj.height = window.innerHeight - 50 + 'px'
    if (window.localStorage.user) {
      var arr = this.userData.userCollect.split(",")
      arr.forEach(val => {
        if (val == this.clickData.newId) {
          this.selected = true
        }
      });
    }
  },
  computed: {
    ...mapState(["userData", "clickData"])
  },
  methods: {
    photoClick() {
      this.$store.dispatch("updateClick", this.clickData.newPerson)
      this.$router.push("/focus-item")
    },
    isSelected() {
      if (window.localStorage.user) {
        if (this.selected) { //已经收藏了
          axios.get("http://10.2.2.245:8088/no-collect", {
            params: {
              newId: this.clickData.newId,
              userId: this.userData.userId
            }
          }).then(() => {
            this.$toast("你已取消收藏!")
            this.selected = !this.selected
          })
        } else {    //没有收藏
          axios.get("http://10.2.2.245:8088/collect", {
            params: {
              newId: this.clickData.newId,
              userId: this.userData.userId
            }
          }).then(() => {
            this.$toast("收藏成功!")
            this.selected = !this.selected
          })
        }
      } else {
        this.$dialog.alert({
          message: '你还没有登录，不能收藏哦！'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @wid: 94%;
  @mar: 3%;
  @tcolor: #333;

  // html {
  //   width: 100%;
  //   height: 100%;
  //   body {
  //   }
  // }
  .follow {
    button {
      border: 0;
      outline: none;
      width: 70px;
      height: 30px;
      background-color: rgb(56, 151, 245);
      border-radius: 5px;
      color: white;
      line-height: 30px;
      position: absolute;
      z-index: 25;
      top: 25px;
      right: 25px;
      font-size: 12px;
    }
    .selected {
      background-color: rgb(56, 151, 245);
    }
    .no-selected {
      color: rgb(118, 118, 118);
      border: 1px solid rgb(236, 236, 236);
      background-color: #fff;
    }
  }
  .mainpic {
    background-color: deepskyblue;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }

  .author {
    width: @wid;
    margin: 0;
    padding: @mar;
    height: 50px;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .icon {
      width: 50px;
      height: 50px;
      float: left;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
    }
    .username {
      padding-top: 8px;
      margin-left: 60px;
      a {
        text-decoration: none;
        text-align: center;
        font-family: "微软雅黑";
        color: #eeeeee;
        font-size: 13px;
      }
    }
    .time {
      padding-top: 2px;
      margin-left: 60px;
      a {
        text-decoration: none;
        text-align: center;
        font-family: "微软雅黑";
        color: #eeeeee;
        font-size: 13px;
      }
    }
    .follow {
      float: right;
      margin-top: -25px;
      button {
        border: 0;
        background-color: transparent;
        outline: none;
        width: 50px;
        height: 20px;
        background-color: #ff8400;
        border-radius: 20px;
        color: white;
        line-height: 19px;
        font-size: 15px;
      }
    }
  }

  .info {
    width: 100%;
    height: 30%;
    margin: 0;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    .num {
      margin: 10px 15px 5px 15px;
      float: left;
      span {
        color: #eeeeee;
        font-size: 16px;
        line-height: 28px;
      }
    }
    .title {
      margin: 10px 5px 5px 15px;
      span {
        color: #eeeeee;
        font-size: 20px;
        line-height: 25px;
      }
    }
    .detail {
      margin: 10px;
      span {
        color: #eeeeee;
        font-size: 15px;
        line-height: 22px;
      }
    }
  }
</style>