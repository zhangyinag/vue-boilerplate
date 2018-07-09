<template>
    <div class="login-box-form" @keyup.enter="onSubmit">
        <el-form label-position="top">
            <el-form-item label="用户名" style="margin-bottom: 0;">
                <el-input v-model="form.username" name="username" prefix-icon="el-icon-service" autofocus></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password" name="password" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-box-form__button" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {ElForm} from 'element-ui/types/form'

class Form {
  username: string = '';
  password: string = '';
}

@Component({
  components: {},
  })
export default class LoginBoxForm extends Vue {
  form: Form = new Form()
  loading: boolean = false
  rules: any = {
    username: [
      {min: 3, message: '', trigger: 'change'}
    ],
    password: [
      {min: 3, message: '', trigger: 'change'}
    ]
  }

  onSubmit (): void {
    if (!this.valid()) return
    this.loading = true
    window.setTimeout(() => {
      this.loading = false
      this.$router.push('/')
    }, 3000)
  }
  valid (): boolean {
    if (!this.form.username.trim()) {
      this.$message.error('请输入用户名')
      return false
    }
    if (!this.form.password.trim()) {
      this.$message.error('请输入密码')
      return false
    }
    return true
  }
}
</script>

<style lang="scss">
    @import "~@/styles/mixins.scss";
    @import "~@/styles/variables.scss";
    @include b(login-box-form){
        border: $--border-base;
        border-radius: $--border-radius-base;
        padding: 20px;
        background: $--color-white;
        @include e(button){
            width: 100%;
        }
    }
</style>
