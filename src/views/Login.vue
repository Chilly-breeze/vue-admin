<template>
  <div class="login">
    <el-form label-position="top" label-width="80px" :model="formLabelAlign" class="login-form">
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.prevent="login">登录</el-button>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      formLabelAlign: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.formLabelAlign)
      console.log(res)
      const {
        data,
        meta: { msg, status }
      } = res.data
      let sts = status + ''
      if (sts.startsWith('2')) {
        localStorage.setItem('token',data.token)
        this.$message.success('登录成功')
        this.$router.push({ name: 'home' })
      } else {
        this.$message.error('用户不存在')
      }
    }
  }

}
</script>

<style scoped>
.login {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.login-form {
  margin-top: 150px;
  width: 400px;
  height: 300px;
  background: #fff;
  padding: 25px;
  border-radius: 20px;
}
.login-btn {
  width: 100%;
}
</style>
