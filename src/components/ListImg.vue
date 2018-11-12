<template>
  <div class="index-list">
    <div class="news-img-item">
      <h1>{{data.newTitle}}</h1>
      <div class="news-img">
        <img width="30%" height="78" :src="data.newContent[0].src" alt="">
        <img width="30%" height="78" :src="data.newContent[1].src" alt="">
        <img width="30%" height="78" :src="data.newContent[2].src" alt="">
      </div>

      <div class="news-text">
        <span>{{data.newPlate}}</span>
        <span> <i class="fa fa-eye" aria-hidden="true"></i> {{data.newBrowse}}浏览</span>
        <span>{{data.newDate|date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {

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
  }
}
</script>

<style lang="less" scoped>
  .index-list {
    width: 100%;
    height: 155px;
    margin: 15px 0;
    border-bottom: 1px solid rgba(157, 157, 157, 0.2);
    border-top: 1px solid rgba(157, 157, 157, 0.2);
    .news-img-item {
      h1 {
        margin: 10px 0 5px 0;
        font-size: 15px;
        height: 15px;
        overflow: hidden;
      }
      .news-img {
        margin: 15px 0;
        img:nth-child(1) {
          float: left;
        }
        img:nth-child(2) {
          margin-left: 5%;
        }
        img:nth-child(3) {
          float: right;
        }
      }
      .news-text {
        width: 100%;
        text-align: center;
        span {
          font-size: 12px;
          color: rgb(85, 85, 85);
          display: inline-block;
        }
        span:nth-child(1) {
          float: left;
        }
        span:nth-child(2) {
          margin: auto;
        }
        span:nth-child(3) {
          float: right;
        }
      }
    }
  }
</style>