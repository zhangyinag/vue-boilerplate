<template>
<div class="jumbotron">
    <div class="jumbotron__header">
        <h1>基于@vue/cli3 ElementUI 的 Web 应用</h1>
        <br/>
        <el-button type="primary" round @click="link('https://zhangyinag.github.io/vue-boilerplate/#/')">
            <svg-icon icon="start" class="sm"></svg-icon> 起步
        </el-button>
        <el-button type="info" round @click="link('https://github.com/zhangyinag/vue-boilerplate')">
            <svg-icon icon="github" class="sm"></svg-icon> github
        </el-button>
    </div>

    <div class="jumbotron__body">
        <h3>特别赞助</h3>
        <p>Powered By @PingAn.com</p>
    </div>

    <div class="jumbotron__footer">
        <el-card style="max-width: 25%;">
            <h3>灵活</h3>
            <p>基于插件安装， 你可以有选择的配合其他vue插件使用</p>
        </el-card>
        <el-card style="max-width: 25%;">
            <h3>高效</h3>
            <p>开箱即用的插件及Vue组件，无需你再次搭建这些基础设施 </p>
        </el-card>
        <el-card style="max-width: 25%;">
            <h3>易用</h3>
            <p>已经会了 Vue, TypeScript？即刻阅读指南开始构建应用</p>
        </el-card>
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class Jumbotron extends Vue {
  link (url: string): void {
    window.open(url)
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(jumbotron) {
    padding: 60px;
    @include e(header){
        text-align: center;
        margin-bottom: 60px;
    }
    @include e(body){
        text-align: center;
        margin-bottom: 60px;
    }
    @include e(footer){
        color: $--color-text-regular;
        display: flex;
        justify-content: space-between;
        & h3{
            color: $--color-primary;
            font-weight: normal;
        }
        & p {
            color: $--color-text-secondary;
        }
    }
}
</style>
