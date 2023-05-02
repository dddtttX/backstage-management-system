import http from "@/utils/request";

// 请求首页数据
export const getData = () => {
    return http.get(
        '/home/getData',
    )
}

// 请求user页面数据
export const getUser = (params) => {
    // 返回用户列表
    return http.get(
        '/user/getUser', params
    )
}

// 新增user
export const addUser = (data) =>{
    return http.post(
        '/user/add', data
    )
}

// 编辑
export const editUser = (data) =>{
    return http.post(
        '/user/edit', data
    )
}

// 删除
export const delUser = (data) =>{
    return http.post(
        '/user/del', data
    )
}

// 登录验证
export const getMenu = (params) => {
    return http.post(
        '/login/get_permission', params
    )
}