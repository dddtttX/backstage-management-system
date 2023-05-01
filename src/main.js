import Vue from "vue"
// import { Row, Button } from "element-ui"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import VueRouter from "vue-router"
import App from "./App.vue"
import router from "./router"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
// 按需引入
// Vue.use(Row)
// Vue.use(Button)

new Vue({
    router,
    render: h => h(App),
}).$mount("#app")
