<template>
    <div class="parent">
        <img src="@/static/one.jpg" />
        <!-- 按钮 -->
        <div class="buttons">
            <div>
                <span @click="state = true">登录</span>
                <div class="one" v-show='state'></div>
            </div>
            <div>
                <span @click="state = false">注册</span>
                <div class="two" v-show="!state"></div>
            </div>
        </div>
        <!-- 登录界面 -->
        <div class="inputs" v-show='state'>
            <div>
                <input type="text" v-model="loginName" placeholder="用户名" />
            </div>
            <div>
                <input type="password" v-model="loginPass" maxlength="16" placeholder="密码" />
            </div>
            <button @click="login">登录</button>
            <p>忘记密码</p>
        </div>
        <!-- 注册界面 -->
        <div class="inputs" v-show="!state">
            <div>
                <input type="text" v-model="regName" placeholder="请输入用户名" />
            </div>
            <div>
                <input type="password" maxlength="16" v-model="regPass" placeholder="请输入密码" />
            </div>
            <button @click="register">注册</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            state: false,
            regName: "",
            regPass: "",
            loginName: "",
            loginPass: "",
        }
    },
    methods: {
        // 登录
        login: function () {
            axios.get("http://10.2.2.245:8088/ring_up", {
                params: {
                    user: this.loginName,
                    pass: this.loginPass
                }
            }).then((json) => {
                this.$toast(json.data.des)
                if (json.data.state === 1) {
                    window.localStorage.user = json.data.data.result.userName
                    this.$store.dispatch("updateUser", json.data.data.result)
                    this.$router.push("/personal")
                }
            })
        },

        // 注册
        register: function () {
            let regpass = new RegExp(/^[A-Za-z0-9]{8,16}$/);
            let regname = new RegExp(/^[0-9A-Za-z]+$/);
            if (this.regName.match(regname)) {
                if (this.regPass.match(regpass)) {
                    axios.get("http://10.2.2.245:8088/sign_in", {
                        params: {
                            user: this.regName,
                            pass: this.regPass
                        }
                    }).then((json) => {
                        this.$toast(json.data.des)
                        if (json.data.state === 1) {
                            this.state = true
                        }
                    })
                }
                else {
                    this.$toast("请输入8-16位的字母，数字")
                }
            }
            else {
                this.$toast("请输入含有字母，数字的昵称")
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .wid() {
      width: 100%;
    }
    .font() {
      font: normal 22px "楷体";
    }
    .center() {
      text-align: center;
    }

    .parent {
      .font;
      & img {
        .wid();
        height: 140px;
      }
    }
    //登录注册
    .buttons {
      .wid();
      background-color: #ECECEC;
      position: relative;
      & > div {
        display: inline-block;
        width: 50%;
        .center;
        padding: 10px 0 20px;

      }
    }
    // 被选中的标识
    .one,
    .two {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
      background-color: white;
    }
    .one {
      position: absolute;
      bottom: -11px;
      left: 22%;
    }
    .two {
      position: absolute;
      bottom: -11px;
      right: 22%;
    }
    // 登录，注册界面公用样式
    .inputs {
      padding: 20px 10%;
      & > div {
        border-bottom: 1px #c9c9c9 solid;
        padding: 10px 0 5px;
        margin: 20px auto;
        & input {
          font: normal 20px "楷体";
          .wid;
          border: 0;
          outline: none;
        }
      }
      & > button {
        .wid;
        font: normal 20px "楷体";
        padding: 10px 0px;
        border-radius: 5px;
        border: 0;
        background-color: #ECECEC;
        margin: 20px auto 5px;
      }
      & > p {
        font: normal 10px "微软楷体";
        text-align: right;
        color: gray;
      }
    }
</style>
