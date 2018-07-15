<template>
<div>
    <el-table
            :data="users"
            max-height="600"
            style="width: 100%">
        <el-table-column
                prop="username"
                label="用户名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="roles"
                label="角色"
                width="180">
        </el-table-column>
        <el-table-column
                prop="cname"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
                width="180">
        </el-table-column>
        <el-table-column
                prop="birthDate"
                label="出生日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
                width="180">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作" width="100">
            <template slot-scope="{row, $index}">
                <el-button class="text-danger" type="text" size="small" @click.native.prevent="delUser(row.username, $index)">删除</el-button>
                <el-button class="text-warning" type="text" size="small" @click.native.prevent="editUser(row, $index)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <user-edit :visible.sync="editVisible" :user="currentEditUser" @edited="onEdited"></user-edit>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {deleteUser, loadUsers, User} from '../../../api/user'
import UserEdit from './edit/index.vue'
@Component({
  components: {UserEdit},
  })
export default class Dashboard extends Vue {
  users: Array<User> = [];

  editVisible: boolean = false;

  currentEditUser: User| null = null

  delUser (username: string, index: number) {
    deleteUser(username).then(() => {
      this.users.splice(index, 1)
    })
  }

  editUser (user: User, index: number) {
    this.currentEditUser = user
    if (!this.currentEditUser) return
    this.editVisible = true
  }

  onEdited (user: User) {
    Object.assign(this.currentEditUser, user)
  }

  mounted () {
    loadUsers().then(data => {
      this.users = data || []
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mixins";
@import "../../../styles/variables";
</style>
