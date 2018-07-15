<template>
<div class="avatar">
    <el-dropdown :hide-on-click="false" placement="bottom-start">
        <span class="el-dropdown-link">
           <svg-icon icon="avatar" class="avatar__img" v-show="!$auth.isAuthenticated"></svg-icon>
           <img class="avatar__img" src="~@/assets/avatar.png" v-show="$auth.isAuthenticated">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided v-show="$auth.isAuthenticated" class="text-info">{{$auth.user && $auth.user.username}}/未知</el-dropdown-item>
            <el-dropdown-item divided v-show="!$auth.isAuthenticated" @click.native="$router.push('/login')" class="text-warning">登录/注册</el-dropdown-item>
            <el-dropdown-item divided>个人信息</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout" v-show="$auth.isAuthenticated" class="text-danger">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {logout} from '../../api/auth'

@Component({
  components: {},
  })
export default class Avatar extends Vue {
  logout (): void {
    logout().then(() => {
      this.$auth.clear()
      this.$router.push('/login')
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@import "~@/styles/common.scss";
@include b(avatar){
    @include e(img){
        height: 32px;
        width: 32px;
        padding: 5px;
        color: #fff;
        background: $--color-text-secondary;
        border-radius: 100%;
        &:hover{
            @extend .link;
            background: lighten($--color-primary, 25%);
        }
    }
}
</style>
