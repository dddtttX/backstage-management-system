export default {
    state: {
        isCollapse: false, //控制菜单的展开还是收起
        // 面包屑数据
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "HomePage/HomePage",
            },
        ],
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state, val) {
            // 判断添加的数据是否为首页
            if (val.name !== 'home') {
                // 添加
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index === -1) {
                    // 不存在
                    state.tabList.push(val)
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state, item) {
            const index = state.tabList.findIndex(tab => tab.name == item.name)
            state.tabList.splice(index, 1)
        }
    }
}