<template>
  <div id="article-detail">
    <!-- 标题 -->
    <div class="title"><span>{{clickData.newTitle}}</span></div>
    <!-- 文章作者 -->
    <div class="author">
      <div class="icon"><img @click="photoClick()" :src="clickData.newPerson.newPersonPhtot" alt=""></div>
      <div class="username"><a href="#">{{clickData.newPerson.newPersonName}}</a></div>
      <div class="time"><a href="#">{{clickData.newDate|date}}</a></div>

      <div class="follow">
        <button @click="isSelected()" class="selected" v-show="!selected">收藏</button>
        <button @click="isSelected()" class="no-selected" v-show="selected">已收藏</button>
      </div>

    </div>
    <!-- 文章主体 -->
    <div class="article" v-for="(item,index) in clickData.newContent" :key="index">
      <div class="imgs"><img :src="item.src" alt=""></div>
      <div class="pic-title"><span>{{item._title_}}</span></div>
      <div class="text"><span>{{item._text_}}</span></div>
    </div>
    <!-- 文章评论 -->
    <ListComment :data="clickData"></ListComment>
    <Commentary :data="clickData.newId"></Commentary>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ListComment from "../components/ListComment.vue"
import Commentary from "../components/Commentary.vue"
export default {
  data() {
    return {
      selected: false
    }
  },
  filters: {
    date(val) {
      var time = new Date(val)
      return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes()
    }
  },
  computed: {
    ...mapState(["userData", "clickData"])
  },
  mounted() {
    document.documentElement.scrollTop = 0
    window.pageYOffset = 0
    document.body.scrollTop = 0

    if (window.localStorage.user) {
      var arr = this.userData.userCollect.split(",")
      arr.forEach(val => {
        if (val == this.clickData.newId) {
          this.selected = true
        }
      });
    }
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
  },
  components: {
    ListComment,
    Commentary
  }
}
</script>

<style lang="less" scoped>
  @wid: 94%;
  @mar: 3%;
  @tcolor: #333;
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
  .title {
    width: @wid;
    margin: @mar;
    margin-top: 0px;
    height: 110px;
    span {
      display: block;
      font-family: "微软雅黑";
      color: @tcolor;
      font-size: 16px;
      line-height: 2;
    }
  }

  .author {
    width: @wid;
    margin: 20px @mar 20px @mar;
    height: 50px;
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
        text-align: center;
        text-decoration: none;
        font-family: "微软雅黑";
        color: @tcolor;
        font-size: 13px;
      }
    }
    .time {
      margin-top: 2px;
      margin-left: 60px;
      a {
        text-align: center;
        text-decoration: none;
        font-family: "微软雅黑";
        color: rgb(54, 54, 54);
        font-size: 13px;
      }
    }
    .follow {
      float: right;
      margin-top: -27px;
      margin-right: 10px;
      .username {
        padding-top: 8px;
        margin-left: 60px;
        a {
          text-align: center;
          text-decoration: none;
          font-family: "微软雅黑";
          color: @tcolor;
          font-size: 13px;
        }
      }
      .time {
        margin-top: 2px;
        margin-left: 60px;
        a {
          text-align: center;
          text-decoration: none;
          font-family: "微软雅黑";
          color: rgb(54, 54, 54);
          font-size: 13px;
        }
      }
      .follow {
        float: right;
        margin-top: -27px;
        margin-right: 10px;
        height: 20px;
        background-color: #ff8400;
        border-radius: 20px;
        color: white;
        line-height: 19px;
        font-size: 15px;
      }
    }
  }

  .article {
    width: @wid;
    margin: @mar;
    .imgs {
      width: 100%;
      margin: 0;
      img {
        width: 100%;
        height: 200px;
        margin: 0;
      }
    }
    .pic-title {
      text-align: left;
      margin: 5px 0 0 5px;
      span {
        font-size: 15px;
        line-height: 2;
      }
    }
    .text {
      margin: 15px 8px 15px 8px;
      span {
        line-height: 20px;
        font-family: "微软雅黑";
        color: rgb(92, 92, 92);
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
</style>