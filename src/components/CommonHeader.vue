<template lang="">
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right:20px" icon="el-icon-menu" size="mini" @click="handleMenu()"></el-button>
            <!-- 面包屑 -->
            <!-- <span class="bread-text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="main-avatar" src="../assets/avatar.jpg" alt="" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Cookie from 'js-cookie';

    export default {
        data(){
            return{}
        },
        methods:{
            handleMenu(){
             this.$store.commit("collapseMenu")
            },
            logout(){
                Cookie.remove('token')
                // 清除cookie中的menu
                Cookie.remove('menuData')
                this.$router.push('/login')
            }
        },
        computed:{
            ...mapState({
                tags: state => state.tab.tabList
            })
        },
        mounted(){
        }
    }
</script>
<style lang="less" scoped>
    .header-container {
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;

        .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
        .main-avatar {
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }

        // 面包屑部分
        .l-content {
            display: flex;
            align-items: center;

            ::v-deep .el-breadcrumb__item{
                .el-breadcrumb__inner{
                    font-weight: normal;
                    &.is-link{
                        color: #666;
                    }
                }
            }
        }
    }
</style>
