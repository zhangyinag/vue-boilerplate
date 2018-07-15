<template>
  <div class="layout">
    <div class="layout-aside horizon-expand-transition" :class="[{'is-expand': asideExpand}]">
      <app-aside :expand="asideExpand"></app-aside>
    </div>
    <div class="layout-main horizon-expand-transition">
      <div class="layout-header"><app-header></app-header></div>
      <div class="layout-view">
          <transition name="fade" mode="out-in">
              <router-view/>
          </transition>
          <jumbotron v-show="isHome"></jumbotron>
      </div>
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
import {AppModule} from '@/store'
import Feedback from '@/components/feedback/index.vue'
import Jumbotron from '@/components/jumbotron/index.vue'

@Component({
  components: {AppHeader, AppAside, Feedback, Jumbotron},
  })
export default class Home extends Vue {
  @AppModule.State asideExpand: boolean
  get isHome () {
    return this.$route.path === '/'
  }
}
</script>

<style lang="scss" scoped>
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
    @include when(expand){
      width: $--layout-aside-width-expand;
    }
  }
  @include b(layout-main){
    height: inherit;
    flex-grow: 1;
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
