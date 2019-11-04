<template>
  <div class="users">
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- row搜索框按钮 -->
      <el-row>
        <el-col>
          <el-input @change="clear" clearable placeholder="请输入内容" v-model="input5" class="select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <el-card class="table-card">
        <el-table
          height:250
          ref="singleTable"
          :stripe="true"
          :data="tableData"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="username" label="姓名" width="100"></el-table-column>
          <el-table-column property="email" label="邮箱" width="160"></el-table-column>
          <el-table-column property="mobile" label="电话"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">{{ scope.row.create_time | filterDate }}</template>
          </el-table-column>
          <el-table-column property="role_name" label="角色"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <!-- scope.row.mg_state  -->
            <template slot-scope="scope">
              <el-switch
                @change="putUser(scope.row)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column property="address" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                class="address-btn el-icon-edit"
                @click="edit(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                class="address-btn el-icon-delete"
                @click="removeRow(scope.row.id)"
              ></el-button>
              <el-button
                size="mini"
                type="warning"
                class="address-btn el-icon-setting"
                @click="address(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="8"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </el-card>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogTableVisible">
      <el-form label-position="left" label-width="100px" :model="formLabelAlign">
        <el-form-item label="用户名称">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLabelAlign.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible">确定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户信息" :visible.sync="TableVisible">
      <el-form label-position="left" label-width="100px" :model="formLabelAlign">
        <el-form-item label="用户名称">
          <el-input disabled v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="formLabelAlign.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="TableVisibleaddUser = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </div>
    </el-dialog>

    <!--  活动对话框-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleaddUser">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
         {{curruser}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="form.r">
            <!-- form.r 保存的是option的value值 -->
            <el-option label="请选择" :value="-1"></el-option>
            <el-option 
              :label="item.roleName" 
              :value="i"
              v-for="(item,i) in roles"
              :key = "i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleaddUser = false">取 消</el-button>
        <el-button type="primary" @click="aaddress()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      currentRow: null,
      input5: '', //搜索内容
      pagenum: 1,  //页数
      pagesize: 10, //每页获取多少
      total: 0,  //总数
      tableData: [],   //用户数据
      dialogTableVisible: false, //添加对话框
      formLabelAlign: {}, //表单内容
      outerVisible: false,
      TableVisible: false, // 编辑对话框
      dialogFormVisibleaddUser: false,
      roles:[], // 循环数组
      form: {}, //活动框
      curruser:'',
      curruserid:0
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async aaddress() {
      const res = await this.$http.put(`users/${this.curruserid}`,{
        rid:this.form.r
      })
      this.dialogFormVisibleaddUser = false
    },
    async address(user) {
      this.curruser = user.username
      const res1 = await this.$http.get('roles')
      this.roles = res1.data.data
      const res = await this.$http.get(`users/${user.id}`)
      this.form.r = res.data.data.rid
      this.curruserid = user.id
      this.dialogFormVisibleaddUser = true
    },
    async putUser(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // console.log(res)
    },
    addUser() {
      this.formLabelAlign = {}
      this.dialogTableVisible = true
    },
    async editUser() {
      const res = await this.$http.put(`users/${this.formLabelAlign.id}`, this.formLabelAlign)
      const { meta: { status } } = res.data
      if (status == 200) {
        this.TableVisible = false
      }
    },
    edit(user) {
      this.formLabelAlign = user
      this.TableVisible = true
    },
    removeRow(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`)
        if (res.data.meta.status == 200) {
          this.pagenum = 1
          this.getUser()
          this.$message({
            type: "success",
            message: '成功'
          })
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async innerVisible() {
      const res = await this.$http.post('users', this.formLabelAlign)
      const { data, meta: { msg, status } } = res.data
      if (status == 201) {
        this.$message({
          type: 'info',
          message: '添加成功'
        });
        for (const key in this.formLabelAlign) {
          if (this.formLabelAlign.hasOwnProperty(key)) {
            this.formLabelAlign[key] = ''
          }
        }
        this.dialogTableVisible = false
      } else {
        this.$message.error();

      }
    },
    clear() {
      this.getUser()
    },
    search() {
      this.getUser()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUser()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUser()
      console.log(`当前页: ${val}`);
    },
    async getUser() {
      const res = await this.$http.get(`users?query=${this.input5}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const { data: { total, users }, meta: { msg, status } } = res.data
      this.tableData = users
      this.total = total
    }
  },
  components: {

  }
}
</script>

<style scoped>
.box-card,
.users {
  height: 100%;
}
.select {
  width: 500px;
  margin-top: 20px;
  margin-right: 40px;
}
.table-card {
  margin-top: 20px;
}
.address-btn {
  width: 38x;
  height: 30px;
}
</style>
