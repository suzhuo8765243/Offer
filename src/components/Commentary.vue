<template>
  <div :class="cls">
    <div>
      <span class="fa fa-pencil" aria-hidden="true"></span>
      <textarea @focus="cls='open'" @blur="cls='operation'" v-model="stringText" type="text" placeholder="我要评论..."></textarea>
    </div>
    <div>
      <button @click="submit">发表</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  props: ["data"],
  data() {
    return {
      cls: "operation",//评论框样式
      window: window,
      stringText: ""
    }
  },
  methods: {
    submit() {
      var _this = this
      if (_this.stringText.length < 8) {
        this.$toast("评论最少不能少于8个字哦！")
      } else {
        if (!window.localStorage.user) {
          this.$toast("老铁请先登录吧！")
        } else {
          axios.get("http://10.2.2.245:8088/insert_comment", {
            params: {
              newId: _this.data,
              userId: _this.$store.state.userData.userId,
              text: _this.stringText,
            }
          }).then((json) => {
            this.$store.dispatch("updateComment", _this.commentState + 1)
            this.$toast("评论成功!")
            _this.stringText = ""
          })
        }
      }
    }
  },
  computed: {
    ...mapState(["commentState"])
  }
}
</script>

<style lang="less" scoped>
  .operation {
    background-color: #f5f5f5;
    color: gray;
    border-top: 1px #c9c9c9 solid;
    padding: 5px 2%;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    & > div:nth-child(1) {
      float: left;
      width: 92%;
      border: 1px #c9c9c9 solid;
      font-size: 17px;
      text-align: center;
      padding: 7px 5px 5px;
      border-radius: 25px;
      background-color: #f5f5f5;
      & > span {
        vertical-align: top;
        padding-top: 3px;
      }
      & > textarea {
        font-size: 20px;
        width: 75%;
        margin-left: 3%;
        border: 0;
        outline: none;
        height: 22px;
        background-color: #f5f5f5;
      }
    }
    & > div:nth-child(2) {
      width: 33%;
      float: right;
      padding: 5px;
      font-size: 30px;
      display: flex;
      justify-content: space-around;
      & > button {
        display: none;
      }
    }
  }
  // 展开样式
  .open {
    color: gray;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f5;
    border: 1px #c9c9c9 solid;
    & > div:nth-child(1) {
      font-size: 17px;
      & > span {
        display: none;
      }
      & > textarea {
        width: 96%;
        font-size: 20px;
        border: 0;
        outline: none;
        height: 70px;
        background-color: #f5f5f5;
        padding: 5px;
      }
    }
    & > div:nth-child(2) {
      padding: 7px;
      font-size: 30px;
      & > span {
        display: none;
      }
      & > button {
        float: right;
        font-size: 17px;
        padding: 2px 15px;
        margin: 5px 1%;
        border-radius: 5px;
        border: 0;
        background-color: #fe6b2d;
        color: white;
      }
    }
  }
</style>