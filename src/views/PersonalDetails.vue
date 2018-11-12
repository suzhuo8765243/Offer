<template>
    <div class="">
        <!-- 个人资料 -->
        <div class="details">
            <img :src="userData.userPhoto|url" />
            <div>
                <p>{{userData.userName}}</p>
                <span>{{userData.userManifesto}}</span>
            </div>
            <button @click="goout">退出登录</button>
        </div>
        <!-- 收藏评论切换 -->
        <div class="bottons">
            <div :class="one" @click="collection">
                <span class="fa fa-star"></span>
                <p>收藏</p>
            </div>
            <div :class="two" @click="comment">
                <span class="fa fa-comment"></span>
                <p>评论</p>
            </div>
        </div>
        <!-- 收藏展示 -->
        <div v-show="state" class="currency" v-for="item in collectList" :key="item.newTitle">
            <ListText v-if="item.newType === '文本'" :data="item" @click.native="toArticle(item)"></ListText>
            <ListImg v-if="item.newType === '图片'" :data="item" @click.native="toPicImg(item)"></ListImg>
            <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
        </div>
        <!-- 评论展示 -->
        <div v-show="!state" class="currency" v-for="item in commentList" :key="item.newId">
            <ListText v-if="item.newType === '文本'" :data="item" @click.native="toArticle(item)"></ListText>
            <ListImg v-if="item.newType === '图片'" :data="item" @click.native="toPicImg(item)"></ListImg>
            <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
        </div>
    </div>
</template>

<script>
import ListText from './../components/ListText.vue';
import ListImg from './../components/ListImg.vue';
import ListVid from './../components/ListVid.vue';
import axios from 'axios'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            state: true,
            one: "check",//收藏是否被选中的样式
            two: "",//评论是否被选中的样式
            collectList: [],
            commentList: [],
        }
    },
    filters: {
        url(val) {
            return "http://10.2.2.245:8088" + val
        }
    },
    mounted() {
        var _this = this
        axios.get("http://10.2.2.245:8088/rangdenglu", {
            params: {
                user: window.localStorage.user
            }
        }).then((json) => {
            this.$store.dispatch("updateUser", json.data.data.result)
            var arr = this.userData.userCollect.split(",")
            for (let i = 0; i < arr.length; i++) {
                this.dataList.forEach(val => {
                    if (val.newId == arr[i]) {
                        this.collectList.push(val);
                    }
                })
            }
        })

        // 评论过的列表
        axios.get("http://10.2.2.245:8088/select_comment_user", {
            params: {
                userId: _this.userData.userId
            }
        }).then((json) => {
            var arr = []
            json.data.forEach(val => {
                arr.push(val.commentNewId)
            })
            var [...arrList] = new Set(arr)
            arrList.forEach(val => {
                for (let i = 0; i < _this.dataList.length; i++) {
                    if (val == _this.dataList[i].newId) {
                        _this.commentList.push(_this.dataList[i])
                    }
                }
            })
        })
    },
    methods: {
        // 点击收藏的时候
        collection: function () {
            this.state = true;
            this.two = "";
            this.one = "check";
        },
        // 点击评论的时候
        comment: function () {
            this.state = false;
            this.one = "";
            this.two = "check";
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
        },
        // 退出登录
        goout: function () {
            delete window.localStorage.user;
            this.$store.dispatch("updateUser", {});
            this.$toast("您已退出登录");
            this.$router.push("/");
        }
    },
    computed: {
        ...mapState(["userData", "dataList"])
    },
    components: {
        ListText,
        ListImg,
        ListVid
    }
}
</script>

<style lang="less" scoped>
    // 个人资料
    .details {
      padding: 25px 0 15px;
      background-color: #e7e7e7;
      & > img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 2%;
      }
      & > div {
        display: inline-block;
        vertical-align: top;
        margin: 4% 1% 0;
        width: 43%;
        & > p {
          font-size: 17px;
          margin: 0 0 10px;
        }
        & > span {
          font-size: 14px;
          color: gray;
        }
      }
      & > button {
        vertical-align: top;
        font-size: 14px;
        padding: 5px 10px;
        border-radius: 5px;
        border: 1px gray solid;
        margin: 10% 1% 0;
      }
    }
    // 选项样式
    .bottons {
      margin: 1% 0;
      & > div {
        display: inline-block;
        width: 50%;
        text-align: center;
        & > span {
          font-size: 30px;
          margin: 5px 0;
        }
        & > p {
          margin: 3px 0 5px;
        }
      }
    }
    // 被选中样式
    .check {
      color: #fe692b;
      background-color: #fafafa;
    }
    .currency {
      padding: 0 2%;
    }
</style>