<template>
    <div class="tags">
        <el-tag v-for="(tag, index) in tags" :key="tag.path" :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' : 'plain'" @click="changeMenu(tag)" @close="handleClose(tag, index)"
            size="small">
            {{ tag.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'CommonTag',
    data() {
        return {}
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabList
        })
    },
    methods: {
        // 点击tag跳转的方法
        changeMenu(item) {
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
                this.$router.push(item.path)

            }
        },
        handleClose(item, index) {
            // 删除数据,删除的是高亮的就跳前一个，不删高亮不变化
            const length = this.tags.length - 1
            this.$store.commit("closeTag", item)
            console.log(index);
            console.log(length);
            // 删除逻辑
            if (item.name !== this.$route.name) {
                return
            } else {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            }
            this.$store.commit("selectMenu", item)


        },


    }

}
</script>
<style lang="less" scoped>
.tags {
    padding: 20px;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>