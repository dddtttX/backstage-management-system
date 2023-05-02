import axios from "axios";

const http = axios.create({
    // 通用请求的地址
    baseURL: '/api',
    timeout: 10000
})

// 请求拦截器
http.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})
// 响应拦截器
http.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})


export default http