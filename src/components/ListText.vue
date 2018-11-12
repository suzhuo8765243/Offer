<template>
  <div class="index-list">
    <ul class="news-img">
      <li>
        <div class="news-img-item">
          <img width="35%" height="98%" :src="data.newContent[0].src" alt="">
          <div class="news-text-item">
            <p>{{data.newTitle}}</p>
            <div>
              <span>{{data.newPlate}}</span>
              <span> <i class="fa fa-eye" aria-hidden="true"></i> {{data.newBrowse}}浏览</span>
              <span>{{data.newDate|date}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
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
  .news-img {
    li {
      margin: 10px 0;
    }
    .news-img-item {
      width: 100%;
      height: 100px;
      border-bottom: 1px solid rgba(157, 157, 157, 0.2);
      border-top: 1px solid rgba(157, 157, 157, 0.2);
      img {
        margin-top: 1px;
        float: left;
      }
      .news-text-item {
        text-align: center;
        width: 60%;
        height: 100%;
        float: right;
        position: relative;
        p {
          font-size: 15px;
          font-weight: bold;
          margin-top: 5px;
          line-height: 1.2;
          text-align: left;
          height: 78%;
          overflow: hidden;
        }
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