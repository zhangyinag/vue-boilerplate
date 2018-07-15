<template>
<div class="acl-tree">
    <role-list class="acl-tree__role-list" @select="onSelectRole"></role-list>
    <acl-tree class="acl-tree__acl-tree" :role-code="role && role.roleCode"></acl-tree>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import RoleList from './role-list/index.vue'
import AclTree from './acl-tree/index.vue'
import {Role} from '../../../api/role'

@Component({
  components: {RoleList, AclTree},
  })
export default class Authority extends Vue {
  role: Role| null = null

  onSelectRole (role: Role) {
    this.role = role
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(acl-tree){
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    @include e(role-list){
        flex-grow: 0;
        border: $--border-base;
        min-width: 20%;
    }
    @include e(acl-tree){
        flex-grow: 1;
        border: $--border-base;
    }
}
</style>
