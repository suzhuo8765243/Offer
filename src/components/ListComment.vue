<template>
    <div class="parent">
        <h2>全部评论</h2>
        <div class="son" v-for="(obj,index) in comments" :key="index">
            <div>
                <img :src="'http://10.2.2.245:8088' + obj.userPhoto" />
            </div>
            <div>
                <h3>{{obj.userName}}</h3>
                <p>{{obj.commentText}}</p>
                <p>
                    <span>{{obj.commentDate|date}}</span>
                    <span>{{obj.commentGive}}</span>
                    <span class="fa fa-thumbs-up"></span>
                </p>
            </div>
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
            comments: [],
        }
    },
    filters: {
        date(val) {
            var ms = new Date().getTime() - new Date(val).getTime();
            if (Math.round(ms / 1000 / 60) > 59) {
                return Math.round(ms / 1000 / 60 / 60) + "小时前"
            }
            return Math.round(ms / 1000 / 60) + "分钟前"
        }
    },
    created() {
        this.$store.dispatch("updateComment", 1)
    },
    computed: {
        ...mapState(["commentState"])
    },
    watch: {
        commentState() {
            var _this = this
            axios.get("http://10.2.2.245:8088/select_comment_new", {
                params: {
                    newId: _this.data.newId
                }
            }
            ).then((json) => {
                _this.comments = json.data
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .parent {
      width: 94%;
      margin: 40px auto 70px;
      & > h2 {
        margin: 10px 0;
      }
      .son {
        //   头像样式
        & > div:nth-child(1) {
          width: 12%;
          text-align: center;
          display: inline-block;
          vertical-align: top;
          padding: 15px 0;
          & > img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        }
        // 评论样式
        & > div:nth-child(2) {
          padding: 15px 0;
          border-top: 1px #c9c9c9 solid;
          display: inline-block;
          width: 85%;
          & > h3 {
            color: gray;
          }
          p {
            margin: 10px 0;
            line-height: 20px;
            span {
              font-size: 12px;
              color: gray;
            }
            // 时间
            & span:nth-child(1) {
              float: left;
            }
            // 点赞数
            & span:nth-child(2) {
              float: right;
              margin: 0 10px;
            }
            // 图标
            & span:nth-child(3) {
              float: right;
            }
          }
        }
      }
    }
</style>