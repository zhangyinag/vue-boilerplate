<template>
    <el-form inline style="padding: 10px 20px;" @keyup.native.enter="query(form)">
        <el-form-item label="用户名">
            <el-autocomplete
                    v-model.trim="form.username"
                    size="small"
                    clearable
                    :fetch-suggestions="querySearch"
                    @select="handleSelect">
                <template slot-scope="{ item }">
                    <span>{{ item.username }}</span> -
                    <span>{{ item.cname }}</span>
                </template>
            </el-autocomplete>
        </el-form-item>
        <el-form-item>
            <el-button type="success" size="small" @click="query(form)">&nbsp;查 询&nbsp;</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import {Component, Emit, Vue} from 'vue-property-decorator'
import {queryUsersLikeUsername} from '../../../../api/user'
import User from '../../../../models/User'
import {getFlatSubject} from '@/util'

export class UserQueryForm {
  username = ''
}

@Component({
  components: {},
  })
export default class UserQuery extends Vue {
  form = new UserQueryForm()

  flatObject = getFlatSubject<User>(this.getQueryResult)

  cb?: Function

  @Emit()query (userqueryForm: UserQueryForm) {}

  querySearch (qs: string, cb: Function) {
    this.cb = cb
    this.flatObject.fire(queryUsersLikeUsername(qs))

    // no flat object invoke, remained these for demo
    // queryUsersLikeUsername(qs).then(data => {
    //   cb(data)
    // })
  }

  getQueryResult (data: User) {
    if (this.cb) this.cb(data)
  }

  handleSelect (item: {username: string, cname: string}) {
    this.form.username = item && item.username
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
