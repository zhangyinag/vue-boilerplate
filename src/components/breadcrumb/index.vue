<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in items" :key="item.name" :to="{path: item.path || '/'}">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

const routes : any = {
  home: '首页',
  dashboard: 'Dashboard'
}

interface Item {
  name: string,
  path: string
}

@Component({
  components: {},
  })
export default class extends Vue {
  get items (): Array<Item> {
    return this.$route.matched.map((v) => {
      return {
        name: (v.meta && v.meta.cname) || v.name,
        path: v.path || '/'
      }
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
