<template>
    <el-dialog title="编辑用户" :visible="visible" @update:visible="close">
        <el-form :model="form" label-position="left" label-width="120px" style="max-height: 60vh; overflow: auto;">
            <el-form-item label="用户名">
                <el-input v-model="form.username" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-checkbox-group v-model="form.roles">
                    <el-checkbox :label="role.roleCode" name="role" v-for="role in roles" :key="role.roleCode">{{role.roleName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.cname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input type="email" v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="form.birthDate"
                                value-format="yyyy/MM/dd"
                                format="yyyy/MM/dd"
                                style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right;">
                <el-button type="primary" @click="onSubmit" size="small">&nbsp;&nbsp;确定&nbsp;&nbsp;</el-button>
                <el-button size="small" @click="close(false)">&nbsp;&nbsp;取消&nbsp;&nbsp;</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator'
import {putUser} from '@/api/user'
import {loadRoles} from '@/api/role'
import Role from '../../../../models/Role'
import User from '../../../../models/User'
const emptyForm: User = {
  username: '',
  roles: [],
  cname: '',
  email: '',
  birthDate: '',
  address: ''
}
@Component({
  components: {},
  })
export default class UserEdit extends Vue {
  @Prop(Boolean) visible: boolean

  @Prop() user: User

  form: User = emptyForm

  roles: Array<Role> = []

  onSubmit () {
    putUser(this.form).then((user) => {
      this.edited(user)
      this.close(false)
    })
  }

  @Emit('update:visible')
  close (visible: boolean) {}

  @Emit('edited')
  edited (user: User) {
  }

  @Watch('visible')
  visibleChange (newVal: boolean) {
    if (newVal) {
      Object.assign(this.form, this.user)
      this.form.roles = (this.user.roles || []).slice()
    }
  }

  mounted () {
    loadRoles().then(roles => {
      this.roles = roles || []
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
