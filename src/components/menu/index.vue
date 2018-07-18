<template>
    <el-menu
        class="menu"
        style="width: 100%;"
        active-text-color="#fff"
        unique-opened
        :collapse-transition="false"
        :default-active="currentMenu && currentMenu.link"
        :collapse="!expand">
        <template v-for="(first, x) in filterByAcl(options)">
            <el-submenu :index="genKey(x)" :key="genKey(x)" v-if="getChildren(first)">
                <template slot="title">
                    <svg-icon :icon="first.icon"></svg-icon> &nbsp;
                    <span slot="title">{{first.name}}</span>
                </template>
                <template v-for="(second, y) in getChildren(first)">
                    <template v-if="getChildren(second)">
                        <el-submenu :index="genKey(x, y)" :key="genKey(x, y)">
                            <span slot="title">{{second.name}}</span>
                            <el-menu-item
                                    v-for="(third, z) in getChildren(second)"
                                    :index="third.link || genKey(x, y, z)"
                                    :key="genKey(x, y, z)"
                                    @click.native="delayOpen(third.link)">{{third.name}}</el-menu-item>
                        </el-submenu>
                    </template>
                    <el-menu-item :index="second.link || genKey(x, y)"
                                  :key="genKey(x, y)"
                                  @click.native="delayOpen(second.link)" v-else>{{second.name}}</el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else :index="first.link || genKey(x)" :key="genKey(x)" @click.native="delayOpen(first.link)">
                <svg-icon :icon="first.icon" v-if="first.icon"></svg-icon> &nbsp;
                <span slot="title">{{first.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts">

import {Component, Prop, Vue} from 'vue-property-decorator'
import options, {MenuConfig} from './config'
import {debounce} from 'lodash'

@Component({
  components: {},
  })
export default class AppMenu extends Vue {
  @Prop(Boolean) expand: boolean;
  options: Array<MenuConfig> = options
  delayOpen = debounce(this.open, 350)
  get currentMenu (): any {
    // if (this.$route.path.startsWith())
    let validItems = this.filterByAcl(getLastItems(this.options))
    return validItems.find(v => {
      return !!v.link && this.$route.path.startsWith(v.link)
    })
    function getLastItems (options: Array<MenuConfig>): Array<MenuConfig> {
      let items: Array<MenuConfig> = []
      options.forEach(v => {
        getLast(v)
      })
      return items
      function getLast (item: MenuConfig) {
        if (!item.children || item.children.length < 1) {
          if (item.link) items.push(item)
          return
        }
        item.children.forEach(c => {
          getLast(c)
        })
      }
    }
  }
  getChildren (item: MenuConfig): Array<MenuConfig>| null {
    if (!item || !Array.isArray(item.children)) return null
    let c = this.filterByAcl(item.children)
    return c.length > 0 ? c : null
  }
  genKey (...args: Array<string| number>): string {
    return String(args.reduce((result, v) => result + '-' + v))
  }
  open (url: string): void {
    this.$router.push({path: url})
  }
  filterByAcl (items: Array<MenuConfig>): Array<MenuConfig> {
    if (!Array.isArray(items) || items.length < 1) return []
    return items.filter((item: MenuConfig) => {
      if (!item.pid) return true
      return this.$auth.checkPermission(item.pid)
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(menu) {
    .el-menu-item.is-active{
        background: $--menu-item-hover-fill;
    }
}
</style>
