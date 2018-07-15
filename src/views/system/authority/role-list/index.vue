<template>
<ul class="role-list">
    <li class="role-list__item link"
        v-for="role in roles" :key="role.roleCode"
        :class="{'is-active': currentRole === role}"
        @click="onSelect(role)">{{role.roleName}}</li>
</ul>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import {loadRoles, Role} from '../../../../api/role'

@Component({
  components: {},
  })
export default class RoleList extends Vue {
  roles: Array<Role> = []

  currentRole: Role| null = null

  onSelect (role: Role) {
    this.currentRole = role
    this.select(role)
  }

  @Emit('select')
  select (role: Role) {}

  mounted () {
    loadRoles().then(roles => {
      this.roles = roles || []
    })
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(role-list){
    margin: 0;
    padding: 0;
    list-style: no;
    @include e(item) {
        line-height: 36px;
        color: $--color-text-regular;
        padding: 0 20px;
        &:hover{
            background: $--color-primary;
            color: #fff;
        }
        @include when(active) {
            background: $--color-primary;
            color: #fff;
        }
    }
}
</style>
