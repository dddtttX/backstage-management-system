import mockjs from "mockjs";
import homeapi from "./mockServeData/home";
import user from "./mockServeData/user"

// 定义mock请求拦截
mockjs.mock('/api/home/getData', homeapi.getStatisticalData)

// 用户列表的数据
mockjs.mock('/api/user/add', 'post', user.createUser)
mockjs.mock('/api/user/del', 'post', user.deleteUser)
mockjs.mock('/api/user/edit', 'post', user.updateUser)
mockjs.mock(/api\/user\/getUser/, user.getUserList)