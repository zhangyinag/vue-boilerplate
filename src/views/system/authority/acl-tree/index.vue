<template>
<div style="position: relative; padding: 20px;" v-loading="loading">
    <el-tree @check="onCheck"
             ref="aclTree"
            check-strictly
            :data="aclObjects"
            show-checkbox
            default-expand-all
            node-key="pid"
            :props="defaultProps">
    </el-tree>
    <el-button type="text" @click="delayRefresh" style="position: absolute; top: -5px; right: 10px;">
        <i class="el-icon-refresh" style="font-size: 24px"></i>
    </el-button>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {AclObject, addAclObject, delAclObject, loadAclObjects, loadPidsByRoleCode} from '../../../../api/role'
import {debounce} from 'lodash'

export declare interface AclObjectTree {
  pid: string
  name: string,
  description?: string| null,
  configurable?: boolean,
  children?: Array<AclObjectTree>| null
}

@Component({
  components : {},
  })
export default class AclTree extends Vue {
  @Prop([String]) roleCode : string | null

  aclObjects : Array < AclObjectTree > = []

  selectedPids : Array<string> = []

  defaultProps = {
    children: 'children',
    label: 'name'
  }

  loading: boolean = false

  delayRefresh = debounce(this.refresh, 350)

  loadPids (roleCode: string) {
    if (!roleCode) {
      this.selectedPids = []
      return
    }
    this.loading = true
    loadPidsByRoleCode(roleCode).then(data => {
      this.selectedPids = (data || [])
      let aclTree: any = this.$refs.aclTree
      aclTree.setCheckedKeys(this.selectedPids, true)
      this.loading = false
    }).catch(err => {
      this.loading = false
      console.error(err)
    })
  }

  refresh () {
    if (!this.roleCode) return
    this.loadPids(this.roleCode)
  }

  onCheck (item: AclObject, {checkedKeys}: {checkedKeys: Array<string>}) {
    if (!this.roleCode) return
    let pid = item.pid
    if (checkedKeys.indexOf(pid) !== -1) {
      addAclObject(this.roleCode, pid)
    } else {
      delAclObject(this.roleCode, pid)
    }
  }

  @Watch('roleCode')
  roleCodeChange (roleCode: string) {
    this.loadPids(roleCode)
  }

  mounted () {
    loadAclObjects().then(data => {
      this.aclObjects = convert(data || [])
    })
  }
}

function convert (aclObjects: Array<AclObject>, parent?: AclObjectTree): Array<AclObjectTree> {
  let nextParents: Array<AclObjectTree> = []
  let rest = aclObjects.filter(aclObject => {
    if (!parent) {
      if (!aclObject.parentPid) {
        nextParents.push(aclObject)
        return false
      }
      return true
    }
    if (aclObject.parentPid === parent.pid) {
      (parent.children || (parent.children = [])).push(aclObject)
      nextParents.push(aclObject)
      return false
    }
    return true
  })
  nextParents.forEach(v => {
    convert(rest, v)
  })
  return nextParents
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
