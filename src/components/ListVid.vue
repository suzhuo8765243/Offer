<template>
    <div class="index-list">
        <div class="video">
            <video @playing="video=false" :poster="data.newContent.src.imgSrc" controls width="100%" :src="data.newContent.src.vidSrc"></video>
            <span v-show="video">{{data.newContent._text_}}</span>
        </div>
        <div class="control">
            <img @click="photoClick()" width="50" height="50" :src="data.newPerson.newPersonPhtot" alt="">
            <span>{{data.newPerson.newPersonName}}</span>
            <span>{{data.newComment.length}} <i class="fa fa-commenting-o" aria-hidden="true"></i></span>
            <span>{{data.newGive}} <i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
            <span>{{data.newCollect}} <i class="fa fa-star-o" aria-hidden="true"></i></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data() {
        return {
            video: true
        }
    },
    methods: {
        photoClick() {
            this.$store.dispatch("updateClick", this.data.newPerson)
            this.$router.push("/focus-item")
        }
    }
}
</script>

<style lang="less" scoped>
    .index-list {
        margin-bottom: 15px;
        .video {
            width: 100%;
            position: relative;
            span {
                display: inline-block;
                position: absolute;
                height: 35px;
                overflow: hidden;
                top: 10px;
                left: 20px;
                font-size: 14px;
                color: #fff;
            }
        }
        .control {
            margin-top: 15px;
            img {
                border-radius: 50%;
            }
            span {
                vertical-align: top;
                display: inline-block;
                height: 50px;
                line-height: 50px;
                margin: 0 2%;
                font-size: 12px;
            }
        }
    }
</style>