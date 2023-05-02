import Vue from "vue"
// import { Row, Button } from "element-ui"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import VueRouter from "vue-router"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import mockjs from "./api/mock"
import Cookie from "js-cookie";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
// 按需引入
// Vue.use(Row)
// Vue.use(Button)

// 添加前置导航
router.beforeEach((to, from, next) => {
    // 判断token是否存在
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        // 当前用户没有登陆
        next({ name: 'login' })
    } else if (token && to.name === 'login') {
        // 已经登录，跳转到首页
        next({ name: 'home' })
    }else{
        next()
    }

})

new Vue({
    router,
    store,
    axios,
    render: h => h(App),
}).$mount("#app")
