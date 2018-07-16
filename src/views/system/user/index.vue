<template>
<div>
    <user-query @query="onQuery"></user-query>
    <user-result :users="users" @del-user="onDelUser" @edit-user="onEditUser"></user-result>
    <user-edit :visible.sync="editVisible" :user="currentEditUser" @edited="onEdited"></user-edit>
</div>
</template>

<script lang="ts">
import {Component, Provide, Vue} from 'vue-property-decorator'
import {deleteUser, loadUsers} from '../../../api/user'
import UserEdit from './edit/index.vue'
import UserResult from './result/index.vue'
import UserQuery, {UserQueryForm} from './query/index.vue'
import User from '../../../models/User'
@Component({
  components: {UserQuery, UserEdit, UserResult},
  })
export default class Dashboard extends Vue {
  users: Array<User> = [];

  editVisible: boolean = false;

  currentEditUser: User| null = null

  onQuery (userQueryForm: UserQueryForm) {
    let params = (userQueryForm && userQueryForm.username) ? {username: userQueryForm.username} : undefined
    loadUsers(params).then(data => {
      this.users = data || []
    })
  }

  onDelUser (username: string, index: number) {
    deleteUser(username).then(() => {
      this.users.splice(index, 1)
    })
  }

  onEditUser (user: User, index: number) {
    this.currentEditUser = user
    if (!this.currentEditUser) return
    this.editVisible = true
  }

  onEdited (user: User) {
    Object.assign(this.currentEditUser, user)
  }

  mounted () {
    this.onQuery(null)
  }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mixins";
@import "../../../styles/variables";
</style>
