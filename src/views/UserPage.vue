<template>
  <div class="manage">
    <el-dialog
      :title="modalType == 0 ? '新增用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.birth"
            value-format="yyyy-MM-DD"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="message-header">
      <el-button type="primary" @click="handleAdd()">+ 新增</el-button>
      <el-form class="header-form" :model="userForm">
        <el-form-item class="header-form-item">
          <el-input placeholder="请输入要查询的名字或地址" v-model="userForm.name" @keyup.native.enter="selectSubmit"></el-input>
        </el-form-item>
        <el-button type="primary" @click="selectSubmit">查询</el-button>
      </el-form>
    </div>
    <!-- from的搜索区域 -->
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%; " height="90%"  stripe >
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="birth" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="addr" label="地址"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handleChangePage"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getUser, delUser, editUser, addUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请输入出生日期" }],
        addr: [{ required: true, message: "请输入地址" }]
      },
      tableData: [],
      modalType: 0, //0表示增加，1表示编辑
      total: 0, //总条数
      pageDate: {
        limit: 10,
        page: 1
      },
      userForm: {
        name: ""
      }
    };
  },
  methods: {
    submit() {
      // 提交用户表单
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("*******1111********");
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              console.log("00000");
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              console.log("11111");
              this.getList();
            });
          }
          // 填写成功后关闭弹窗
          this.dialogVisible = false;
          this.$refs.form.resetFields();
        }
      });
    },
    // 弹窗关闭后，清除表单
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 深拷贝
      this.form = JSON.parse(JSON.stringify(row));
      console.log(row);
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(row.id);
    },
    getList() {
      // 获取的列表数据
      getUser({ params: { ...this.userForm, ...this.pageDate } }).then(
        ({ data }) => {
          this.tableData = data.list.map(item => {
            item.sex = item.sex === 0 ? "女" : "男";
            return item;
          });
          this.total = data.count || 0;
        }
      );
    },
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 选择页码的回调函数
    handleChangePage(val) {
      this.pageDate.page = val;
      this.getList();
    },
    // 列表查询
    selectSubmit() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;

  .common-table {
    position: relative;
    height: calc(100% - 62px);
    .pagination {
      position: absolute;
      right: 20px;
      bottom: 0;
    }
  }
}
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-form {
  display: flex;
  align-items: center;
}
.header-form-item {
  margin-bottom: 0;
  margin-right: 10px;

}
</style>
