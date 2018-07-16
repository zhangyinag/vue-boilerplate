<template>
    <el-dialog :title="title" :visible="visible" @update:visible="close">
        <el-form :model="form" ref="form" label-position="left" label-width="120px" style="max-height: 60vh; overflow: auto;">
            <el-form-item label="角色编码">
                <el-input v-model.trim="form.roleCode" auto-complete="off" :disabled="isEdit" required></el-input>
            </el-form-item>
            <el-form-item label="角色姓名">
                <el-input v-model.trim="form.roleName" auto-complete="off" required></el-input>
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
import {addRole, putRole, Role} from '../../../../../api/role'

const emptyForm: Role = {
  roleCode: '',
  roleName: ''
}

@Component({
  components: {},
  })
export default class EditAddRole extends Vue {

  @Prop(Boolean) visible: boolean

  @Prop() role: Role| null

  form: Role = Object.assign({}, emptyForm)

  get isEdit (): boolean {
    return !!(this.role && this.role.roleCode)
  }

  get title (): string {
    return this.isEdit ? '编辑用户' : '新建用户'
  }

  onSubmit () {
    let form: any = this.$refs.form
    form.validate().then((valid: boolean) => {
      if (!valid) return
      if (this.isEdit) {
        putRole(this.form).then(role => {
          this.edited(role)
        })
      } else {
        addRole(this.form).then(role => {
          this.added(role)
        })
      }
    })
  }

  @Emit('update:visible')
  close (visible: boolean) {}

  @Emit('edited')
  edited (role: Role) {
    this.close(false)
  }

  @Emit('added')
  added (role: Role) {
    this.close(false)
  }

  @Watch('visible')
  visibleChange (newVal: boolean) {
    if (newVal) {
      Object.assign(this.form, this.role || emptyForm)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
