<template>
<div class="aside" :class="[{'is-expand': expand}, {'aside-horizon-expand-animation': expand}]">
    <div class="aside__logo" :class="[expand ? 'aside__logo--large' : 'aside__logo--small']">
        <img src="~@/assets/logo.png" @click="$router.push('/')">
    </div>
    <div class="aside__toggle" @click="setAsideExpand(!expand)">
        <svg-icon :icon="expand ? 'outdent' : 'indent'"></svg-icon>
    </div>
    <app-menu :expand="expand" class="aside__menu"></app-menu>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import AppMenu from '@/components/menu/index.vue'
import {AppModule} from '@/store/index'

@Component({
  components: {AppMenu},
  })
export default class AppAside extends Vue {
  @Prop(Boolean) expand: boolean;
  @AppModule.Mutation setAsideExpand: void
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@import "~@/styles/common.scss";
@include b(aside){
    overflow: hidden;
    @include when(expand) {
        width: $--layout-aside-width-expand;
    }
    @include e(logo){
        height: 64px;
        padding-top: 20px;
        text-align: center;
        @include m(large){
            &>img{
                height: 64px;
                width: 64px;
                @extend .link
            }
        }
        @include m(small){
            &>img{
                height: 32px;
                width: 32px;
                @extend .link
            }
        }
    }
    @include e(toggle){
        height: 24px;
        padding: 6px 0;
        text-align: center;
        background: lighten($--menu-item-fill, 5%);
        color: $--menu-item-color;
        @extend .link;
        &:hover{
            color: #fff;
        }
    }
}

@keyframes aside-horizon-expand-animation
{
    from {width: $--layout-aside-width;}
    to {width: $--layout-aside-width-expand;}
}

.aside-horizon-expand-animation{
    animation: aside-horizon-expand-animation 0.5s;
}
</style>
