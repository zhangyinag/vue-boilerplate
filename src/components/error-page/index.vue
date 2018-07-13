<template>
    <div class="error-page" :class="[is404 ? 'error-page--danger' : 'error-page--warning']">
        <div class="error-page__icon">
            <i class="el-icon-error" v-show="is404"></i>
            <i class="el-icon-warning" v-show="!is404"></i>
        </div>
        <div class="error-page__text">
            <h1>{{code}}</h1>
            <p>你暂时没有权限访问该页面， 请联系管理员申请权限</p>
        </div>
        <div class="error-page__btn">
            <el-button :type="is404 ? 'danger' : 'warning'" @click="$router.go(-1)">返回上一级</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class ErrorPage extends Vue {
  @Prop(String) code: string;
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
    @include b(error-page){
        margin-top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
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

        @include m(danger){
            @include e(icon) {
                color: $--color-danger;
            }
        }
        @include m(warning){
            @include e(icon) {
                color: $--color-warning;
            }
        }
    }
</style>
