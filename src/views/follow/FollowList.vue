<template>
    <div>

        <div v-for="(item,index) in list" :key="index" @click="getItem(item)" class="list">
            <div>
                <img :src="item.newPersonPhtot" />
            </div>
            <div>
                <h3>{{item.newPersonName}}</h3>
                <p>{{item.newPersonReferral}}</p>
                <P>{{item.newPersonConcern}}人关注</P>
            </div>
        </div>

    </div>

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        if (!window.localStorage.user) {
            this.$dialog.alert({
                message: '你还没有登录，不能为你展示关注信息，你必须先完成登录！'
            }).then(() => {
                this.$router.push("/entrys")
            });
        } else {
            axios.get("http://10.2.2.245:8088/rangdenglu", {
                params: {
                    user: window.localStorage.user
                }
            }).then((json) => {
                this.$store.dispatch("updateUser", json.data.data.result)
                var arr = this.userData.userConcern.split(",")
                for (let i = 0; i < arr.length; i++) {
                    this.dataList.forEach(val => {
                        if (val.newPerson.newPersonId == arr[i]) {
                            this.list.push(val.newPerson)
                        }
                    })
                }
            })
        }
    },
    methods: {
        getItem(item) {
            this.$store.dispatch("updateClick", item)
            this.$router.push("/focus-item")
        }
    },
    computed: {
        ...mapState(["userData", "dataList"])
    }
}
</script>

<style lang="less" scoped>
    .list {
      padding: 5px 5px;
      // 头像样式
      & > div:nth-child(1) {
        display: inline-block;
        width: 24%;
        text-align: center;
        & > img {
          display: inline-block;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin: 10px 0px;
        }
      }
      // 内容样式
      & > div:nth-child(2) {
        display: inline-block;
        width: 75%;
        border-bottom: 1px #c9c9c9 solid;
        & > h3 {
          display: inline-block;
          margin: 5px 0px;
          font: normal 18px "微软雅黑";
        }
        & > p {
          margin: 5px 0px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: gray;
          font: normal 15px "微软雅黑";
        }
        & > button {
          font-size: 20px;
          padding: 0 20px;
          border-radius: 10px;
          border: 0;
          background-color: red;
          color: white;
          margin: 5px 10px;
          float: right;
        }
      }
    }
</style>