<template>
  <div class="layout">
    <div class="layout-aside" :class="{'is-expand': asideExpand}">
      <app-aside :expand="asideExpand"></app-aside>
    </div>
    <div class="layout-main">
      <div class="layout-header"><app-header></app-header></div>
      <div class="layout-view"><router-view/></div>
      <div class="layout-footer"><p> &nbsp; &nbsp; &nbsp; &nbsp;© 2018-2019 Pingan.com 版权所有 Email: zhangyinag@126.com</p></div>
    </div>
    <!--widget-->
    <feedback></feedback>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from './header/index.vue'
import AppAside from './aside/index.vue'
import {AppModule} from '@/store/index'
import Feedback from '@/components/feedback/index.vue'

@Component({
  components: {AppHeader, AppAside, Feedback},
  })
export default class Home extends Vue {
  @AppModule.State asideExpand: boolean
}
</script>

<style lang="scss">
  @import "../styles/mixins";
  @import "../styles/utils";
  @import "../styles/common";
  @import "../styles/variables";
  @include b(layout){
    height: 100vh;
    width: 100vw;
    display: flex;
  }
  @include b(layout-aside){
    height: inherit;
    background: $--menu-item-fill;
    width: $--layout-aside-width;
    flex-grow: 0;
    transition: width .25s ease-in-out;
    @include when(expand){
      width: $--layout-aside-width-expand;
    }
  }
  @include b(layout-main){
    height: inherit;
    flex-grow: 1;
    transition: width .25s ease-in-out;
  }
  @include b(layout-header) {
    height: $--layout-header-height;
    border-bottom: $--border-base;
  }
  @include b(layout-view) {
    height: calc(100% - #{$--layout-header-height} - #{$--layout-footer-height} - 2 * #{$--border-width-base});
    overflow: auto;
  }
  @include b(layout-footer) {
    height: $--layout-footer-height;
    border-top: $--border-base;
    background: $--border-color-light;
    & *{
        color: invert($--border-color-light);
    }
  }
</style>
