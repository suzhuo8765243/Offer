<template>
    <div class="video">
        <div class="top-perch"></div>

        <div v-for="item in dataList" :key="item.id">
            <ListVid v-if="item.newType === '视频'" :data="item"></ListVid>
        </div>

    </div>
</template>

<script>
import ListVid from '../components/ListVid.vue'
import { mapState } from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(["dataList"])
    },
    components: {
        ListVid
    }
}
</script>

<style lang="less" scoped>
    .video {
      padding: 10px;
      .top-perch {
        height: 40px;
      }
    }
</style>