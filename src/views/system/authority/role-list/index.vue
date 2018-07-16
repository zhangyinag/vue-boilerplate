<template>
<div class="role-list">
   <div class="role-list__btns">
       <el-button type="text" @click="add">
           <i class="el-icon-plus" style="font-size: 24px"></i>
       </el-button>
       <el-button type="text" @click="delayRefresh">
           <i class="el-icon-refresh" style="font-size: 24px"></i>
       </el-button>
   </div>
    <ul class="role-list-ul">
        <li class="role-list-ul__item link"
            v-for="(role, i) in roles" :key="role.roleCode"
            :class="{'is-active': currentRole === role}"
            @click="onSelect(role)">
            {{role.roleName}} &nbsp;
            <i class="el-icon-edit" @click.prevent="edit(role, i)"></i> &nbsp;
            <i class="el-icon-delete" @click.prevent="del(role, i)"></i>
        </li>
    </ul>
    <edit-add-role :visible.sync="editAddRoleVisible" :role="currentEditAddRole" @added="onAdded" @edited="onEdited"></edit-add-role>
</div>

</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import {deleteRole, loadRoles} from '../../../../api/role'
import EditAddRole from './edit-add-role/index.vue'
import {debounce} from 'lodash'
import Role from '../../../../models/Role'

@Component({
  components: {EditAddRole},
  })
export default class RoleList extends Vue {
  roles: Array<Role> = []

  currentRole: Role| null = null

  editAddRoleVisible: boolean = false

  currentEditAddRole: Role| null = null

  delayRefresh = debounce(this.refresh, 350)

  add () {
    this.currentEditAddRole = null
    this.editAddRoleVisible = true
  }

  edit (role: Role, index: number) {
    this.currentEditAddRole = role
    this.editAddRoleVisible = true
  }

  del (role: Role, index: number) {
    deleteRole(role.roleCode).then(() => {
      this.roles.splice(index, 1)
    })
  }

  refresh () {
    loadRoles().then(roles => {
      this.roles = roles || []
    })
  }

  onSelect (role: Role) {
    this.currentRole = role
    this.select(role)
  }

  onAdded (role: Role) {
    this.roles.push(role)
  }

  onEdited (role: Role) {
    let index = this.roles.findIndex(v => {
      return role.roleCode === v.roleCode
    })
    if (index >= 0) this.roles.splice(index, 1, role)
  }

  @Emit('select')
  select (role: Role) {}

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

@include b(role-list){
    @include e(btns) {
        text-align: right;
        padding: 0 20px;
    }
}

@include b(role-list-ul){
    margin: 0;
    padding: 0;
    list-style: no;
    @include e(item) {
        line-height: 36px;
        color: $--color-text-regular;
        padding: 0 20px;
        &:hover{
            background: $--color-primary;
            color: #fff;
        }
        @include when(active) {
            background: $--color-primary;
            color: #fff;
        }
    }
}
</style>
