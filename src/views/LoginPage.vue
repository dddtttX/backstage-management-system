<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form ref="form" class="login-form" :model="form" :rules="rules" inline>
        <h3 class="login-title">系统登陆</h3>
        <div class="form-list">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="loginSubmit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],

        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    loginSubmit() {
      // 校验通过
      this.$refs.form.validate(valid => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              const token = Mock.Random.guid();
              // token信息存入cookie
              if (token) {
                Cookie.set("token", token);
                // 跳转到首页
                this.$router.push("/home");
              }
            } else {
              this.$message.error("账号密码有误");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  .box-card {
    margin-top: 200px;
    width: 350px;
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .form-list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .el-input {
        width: 200px;
      }
    }
  }
}
</style>