import Vue from "vue"
import Router from "vue-router"

import Home from "./views/Home.vue"
import Focus from "./views/Focus.vue"
import Video from "./views/Video.vue"
import Entertainment from "./views/Entertainment.vue"
import Sports from "./views/Sports.vue"
import Finance from "./views/Finance.vue"
import Military from "./views/Military.vue"
import Travel from "./views/Travel.vue"

import FollowDetails from "./views/follow/FollowDetails.vue"

import Entrys from "./views/Entry.vue" // 登录注册
import Article from "./views/Article.vue" // 文章详情
import PicImg from "./views/PicImg.vue" // 图片详情
import PersonalDetails from "./views/PersonalDetails.vue" // 用户详情

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", component: Home }, // 主页
    { path: "/focus", component: Focus }, // 关注

    { path: "/focus-item", component: FollowDetails }, // 关注详情
    
    { path: "/video", component: Video }, // 视频
    { path: "/entertainment", component: Entertainment }, // 娱乐
    { path: "/sports", component: Sports }, // 体育
    { path: "/finance", component: Finance }, // 财经
    { path: "/military", component: Military }, // 军事
    { path: "/travel", component: Travel }, // 旅游


    { path: "/article", component: Article }, // 文章详情
    { path: "/picimg", component: PicImg }, // 图片详情

    { path: "/entrys", component: Entrys }, // 登录注册
    { path: "/personal", component: PersonalDetails }, // 用户详情
  ]
});
