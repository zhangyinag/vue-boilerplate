<template>
<div class="login">
    <div class="login-box">
        <div class="login-box__logo"><img src="~@/assets/logo.png"></div>
        <div class="login-box__title">XXXXX系统登录</div>
        <login-box-form></login-box-form>
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import LoginBoxForm from './LoginBoxForm.vue'

@Component({
  components: {LoginBoxForm},
  })
export default class Login extends Vue {
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixins.scss";
    @import "~@/styles/utils.scss";
    @import "~@/styles/common.scss";
    $--logo-size: 48px;
    @include b(login){
        @include utils-full-screen();
        background: #f9f9f9;
    }
    @include b(login-box){
        width: 320px;
        margin: 32px auto auto;
        @include e(logo) {
            width: $--logo-size;
            margin: auto auto 32px;
            &>img{
                height: $--logo-size;
                width: $--logo-size;
            }
        }
        @include e(title) {
            text-align: center;
            @extend .extra-title-text;
            margin-bottom: 32px;
        }
    }
</style>
