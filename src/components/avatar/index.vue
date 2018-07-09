<template>
<div class="avatar">
    <el-dropdown :hide-on-click="false" placement="bottom-start">
        <span class="el-dropdown-link">
           <img class="avatar__img" src="~@/assets/avatar.png">
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>Alison/艾丽森</el-dropdown-item>
            <el-dropdown-item divided>个人信息</el-dropdown-item>
            <el-dropdown-item divided @click.native="$router.push('/login')">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class Avatar extends Vue {
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
        background: $--border-color-base;
        border-radius: 100%;
        &:hover{
            @extend .link;
            background: lighten($--color-primary, 25%);
        }
    }
}
</style>
