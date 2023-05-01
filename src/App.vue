<template>
    <div id="app">
        <!-- 使用 router-link 组件来导航 -->
        <!-- 通过传入 to 属性指定链接 -->

        <!-- 路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App",
    }
</script>

<style lang="less">
    html,
    body {
        margin: 0;
        padding: 0;
    }
</style>
