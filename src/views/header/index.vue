<template>
<div class="header">
    <breadcrumb class="header__breadcrumb"></breadcrumb>
    <div style="flex-grow: 1;"></div>
    <notice></notice>
    <avatar></avatar>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import Avatar from '@/components/avatar/index.vue'
import Notice from '@/components/notice/index.vue'

@Component({
  components: {Breadcrumb, Avatar, Notice},
  })
export default class AppHeader extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";

@include b(header){
    height: 100%;
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-around;
    @include e(breadcrumb){
        flex-grow: 0;
    }
}
</style>
