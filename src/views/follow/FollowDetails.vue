<template>
    <div>
        <div class="headers">
            <div class="head-portrait">
                <img :src="clickData.newPersonPhtot" />
            </div>

            <button @click="isSelected()" class="selected" v-show="!selected">关注</button>
            <button @click="isSelected()" class="no-selected" v-show="selected">已关注</button>

            <div class="information">
                <h3>{{clickData.newPersonName}}</h3>
                <div>
                    <div>
                        <p>粉丝</p>
                        <p>{{clickData.newPersonFans}}</p>
                    </div>
                    <div>
                        <p>关注</p>
                        <p>{{clickData.newPersonConcern}}</p>
                    </div>
                    <div>
                        <p>浏览</p>
                        <p>{{clickData.newPersonBrowse}}</p>
                    </div>
                </div>
                <p>{{clickData.newPersonReferral}}</p>
            </div>
        </div>

        <div class="lists" v-for="item in dataList" v-if="item.newPerson.newPersonId==clickData.newPersonId" :key="item.newId">
            <ListText v-if="item.newType === '文本'" :data="item" @click.native="toArticle(item)"></ListText>
            <ListImg v-if="item.newType === '图片'" :data="item" @click.native="toPicImg(item)"></ListImg>
            <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import ListText from '../../components/ListText.vue'
import ListImg from '../../components/ListImg.vue'
import ListVid from '../../components/ListVid.vue'

export default {
    data() {
        return {
            selected: false
        }
    },
    computed: {
        ...mapState(["clickData", "dataList", "userData"])
    },
    mounted() {
        if (window.localStorage.user) {
            var arr = this.userData.userConcern.split(",")
            arr.forEach(val => {
                if (val == this.clickData.newPersonId) {
                    this.selected = true
                }
            });
        }
    },
    components: {
        ListText,
        ListImg,
        ListVid
    },
    methods: {
        isSelected() {
            if (window.localStorage.user) {
                if (this.selected) { //已经关注了
                    axios.get("http://10.2.2.245:8088/no-concern", {
                        params: {
                            newPersonId: this.clickData.newPersonId,
                            userId: this.userData.userId
                        }
                    }).then(() => {
                        this.$toast("你已取消关注!")
                        this.selected = !this.selected
                    })
                } else {    //没有关注
                    axios.get("http://10.2.2.245:8088/concern", {
                        params: {
                            newPersonId: this.clickData.newPersonId,
                            userId: this.userData.userId
                        }
                    }).then(() => {
                        this.$toast("关注成功!")
                        this.selected = !this.selected
                    })
                }
            } else {
                this.$dialog.alert({
                    message: '你还没有登录，不能关注作者哦！'
                })
            }
        },
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
    }
};
</script>

<style lang="less" scoped>
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
    .headers {
      background-color: #ececec;
      padding: 5px 5px;
      // 头像样式
      .head-portrait {
        display: inline-block;
        width: 24%;
        text-align: center;
        vertical-align: top;
        & img {
          display: inline-block;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-top: 15px;
        }
      }
      // 内容样式
      .information {
        display: inline-block;
        width: 75%;
        color: gray;
        & > h3 {
          display: inline-block;
          margin: 5px 0px;
          font: normal 18px "微软雅黑";
          color: black;
        }
        & > div {
          margin: 10px 0;
          & > div {
            display: inline-block;
            padding: 0px 4%;
            border-right: 1px #d9dadb solid;
            text-align: center;
            & > p {
              font-size: 14px;
              margin: 7px 0px;
            }
          }
          & > div:nth-child(3) {
            border: 0;
          }
        }
        & > p {
          margin: 5px 0px;
          font: normal 14px "微软雅黑";
        }
      }
    }
    .lists {
      padding: 10px 3%;
    }
</style>