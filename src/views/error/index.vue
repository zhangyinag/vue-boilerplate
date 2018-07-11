<template>
<div class="error" :class="[is404 ? 'error--danger' : 'error--warning']">
    <div class="error__icon">
        <i class="el-icon-error error__icon--danger" v-show="is404"></i>
        <i class="el-icon-warning error__icon--warning" v-show="!is404"></i>
    </div>
    <div class="error__text">
        <h1>{{code}}</h1>
        <p>你暂时没有权限访问该页面， 请联系管理员申请权限</p>
    </div>
    <div class="error__btn">
        <el-button :type="is404 ? 'danger' : 'warning'" @click="$router.go(-1)">返回上一级</el-button>
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class Error extends Vue {
  get code (): string {
    return this.$route.params['code']
  }
  get is404 (): boolean {
    return this.code === '404'
  }
  get is403 (): boolean {
    return this.code === '403'
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(error){
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include m(danger){
        color: $--color-danger;
    }
    @include m(warning){
        color: $--color-warning;
    }
    @include e(icon){
        font-size: 64px;
        margin-bottom: 20px;
        @include m(danger){
            color: $--color-danger;
        }
        @include m(warning){
            color: $--color-warning;
        }
    }
    @include e(text){
        text-align: center;
        color: $--color-text-regular;
        margin-bottom: 20px;
    }
    @include e(btn){
        & > * {
            width: 160px;
        }
    }
}
</style>
