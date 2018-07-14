<template>
    <el-menu
        style="width: 100%;"
        active-text-color="#fff"
        :collapse-transition="false"
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
                                    :index="genKey(x, y, z)"
                                    :key="genKey(x, y, z)"
                                    @click.native="delayOpen(third.link)">{{third.name}}</el-menu-item>
                        </el-submenu>
                    </template>
                    <el-menu-item :index="genKey(x, y)"
                                  :key="genKey(x, y)"
                                  @click.native="delayOpen(second.link)" v-else>{{second.name}}</el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item v-else :index="genKey(x)" :key="genKey(x)" @click.native="delayOpen(first.link)">
                <svg-icon :icon="first.icon" v-if="first.icon"></svg-icon> &nbsp;
                <span slot="title">{{first.name}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import options, {MenuConfig} from './config'
import {debounce} from 'lodash'
@Component({
  components: {},
  })
export default class AppMenu extends Vue {
  @Prop(Boolean) expand: boolean;
  options: Array<MenuConfig> = options
  delayOpen = debounce(this.open, 350)
  getChildren (item: MenuConfig): Array<MenuConfig>| null {
    if (!item || !Array.isArray(item.children)) return null
    let c = this.filterByAcl(item.children)
    return c.length > 0 ? c : null
  }
  genKey (...args: Array<string| number>): string {
    return String(args.reduce((result, v) => result + '-' + v))
  }
  open (url: string): void {
    this.$router.push({path: url, query: {_t: String(Date.now())}})
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
</style>
