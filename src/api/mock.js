import mockjs from "mockjs";
import homeapi from "./mockServeData/home";
import user from "./mockServeData/user"
import permission from "./mockServeData/permission";

// 定义mock请求拦截
mockjs.mock('/api/home/getData', homeapi.getStatisticalData)

// 用户列表的数据
mockjs.mock('/api/user/add', 'post', user.createUser)
mockjs.mock('/api/user/del', 'post', user.deleteUser)
mockjs.mock('/api/user/edit', 'post', user.updateUser)
mockjs.mock(/api\/user\/getUser/, user.getUserList)

// 登录请求
mockjs.mock(/api\/login\/get_permission/, 'post', permission.getMenu)