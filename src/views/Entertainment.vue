<template>
    <div class="video">
        <div class="top-perch"></div>

        <div v-for="item in dataList" :key="item.id">
            <template v-if="item.newPlate === '娱乐'">
                <div>
                    <ListText @click.native="toArticle(item)" v-if="item.newType === '文本'" :data="item"></ListText>
                    <ListImg @click.native="toPicImg(item)" v-if="item.newType === '图片'" :data="item"></ListImg>
                    <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
import ListText from '../components/ListText.vue'
import ListImg from '../components/ListImg.vue'
import ListVid from '../components/ListVid.vue'

import { mapState } from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
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
    },
    computed: {
        ...mapState(["dataList"])
    },
    components: {
        ListText,
        ListImg,
        ListVid
    }
}
</script>

<style lang="less" scoped>
    .video {
      padding: 10px;
      .top-perch {
        height: 30px;
      }
    }
</style>