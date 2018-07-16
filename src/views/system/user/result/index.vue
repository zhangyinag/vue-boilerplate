<template>
    <el-table
            :data="users"
            height="635"
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
</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, Vue} from 'vue-property-decorator'
import User from '../../../../models/User'

@Component({
  components: {},
  })
export default class UserResult extends Vue {
  @Prop() users: Array<User>

  @Emit() delUser (username: string, index: number) {}

  @Emit() editUser (user: User, index: number) {}
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
