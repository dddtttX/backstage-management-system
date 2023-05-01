import Vue from "vue"
import VueRouter from "vue-router"

// 1.引入组件
import MainPage from "../views/MainPage"
import HomePage from "../views/HomePage"
import UserPage from "../views/UserPage"
import MallPage from "../views/MallPage"
import PageOne from "../views/PageOne"
import PageTwo from "../views/PageTwo"

Vue.use(VueRouter)

// 2.定义路由 将路由和组件进行映射
const routes = [
    // 主路由
    {
        path: "/",
        component: MainPage,
        redirect: "/home", //重定向
        children: [
            { path: "home", component: HomePage },
            { path: "user", component: UserPage },
            { path: "mall", component: MallPage },
            { path: "one", component: PageOne },
            { path: "two", component: PageTwo },
        ],
    },
]
// 3.创建router实例
const router = new VueRouter({
    routes,
})

// 4.对外暴露
export default router

// 5.挂在到根节点
