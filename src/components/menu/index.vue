<template>
    <el-menu default-active="1-4-1"
             style="width: 100%;"
             active-text-color="#fff"
             class="el-menu-vertical-demo"
             :collapse-transition="false"
             :collapse="!expand">
        <el-menu-item index="5" @click="$router.push('/dashboard')">
            <svg-icon icon="dashboard-fill"></svg-icon>
            <span slot="title"> &nbsp;Dashboard</span>
        </el-menu-item>
        <el-menu-item index="5" @click="$router.push('/user')">
            <svg-icon icon="avatar"></svg-icon>
            <span slot="title"> &nbsp;用户管理</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class AppMenu extends Vue {
  @Prop(Boolean) expand: boolean;
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>