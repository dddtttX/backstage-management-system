import Cookies from "js-cookie"

export default {
    state: {
        menuData: []
    },
    mutations: {
        // 设置menu数据
        setMenuData(state, val) {
            state.menuData = val
            Cookies.set('menuData', JSON.stringify(val))
        },
        // 动态注册路由
        addMenuData(state, router) {
            console.log(router);
            // 判断缓存中是否有数据
            if (!Cookies.get('menuData')) { return }
            const menuData = JSON.parse(Cookies.get('menuData'))
            state.menuData = menuData
            // 处理动态路由的数据
            const menuArray = []
            menuData.forEach(menu => {
                if (menu.children) {
                    menu.children = menu.children.map((child) => {
                        child.component = () => import(`../views/${child.url}`)
                        return child
                    })
                    menuArray.push(...menu.children)
                } else {
                    menu.component = () => import(`../views/${menu.url}`)
                    menuArray.push(menu)
                }
            });
            // 路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
                console.log(item,"item");
                console.log(router,"router");
                
                
            })
            
        }
    }
}