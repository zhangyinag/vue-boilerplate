<template>
<div>
    <el-table
            :data="users"
            style="width: 100%">
        <el-table-column
                prop="username"
                label="用户名"
                width="180">
        </el-table-column>
    </el-table>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {loadUsers, User} from '../../../api/user'
@Component({
  components: {},
  })
export default class Dashboard extends Vue {
  users: Array<User> = [];
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
