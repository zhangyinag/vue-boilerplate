<template>
<div>
    <el-tree @node-click="onClick"
             ref="aclTree"
            :data="aclObjects"
            show-checkbox
            default-expand-all
            node-key="pid"
            :props="defaultProps">
    </el-tree>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import {AclObject, loadAclObjects, loadPidsByRoleCode} from '../../../../api/role'

export declare interface AclObjectTree {
  pid: string
  name: string,
  description?: string| null,
  configurable?: boolean,
  children?: Array<AclObjectTree>| null
}

@Component({
  components: {},
  })
export default class AclTree extends Vue {
  @Prop([String]) roleCode: string| null

  aclObjects: Array<AclObjectTree> = []

  selectedPids: Array<string> = []

  defaultProps = {
    children: 'children',
    label: 'name'
  }

  onClick () {
    console.log(arguments)
  }

  @Watch('roleCode')
  roleCodeChange (roleCode: string) {
    if (!roleCode) {
      this.selectedPids = []
      return
    }
    loadPidsByRoleCode(roleCode).then(data => {
      this.selectedPids = (data || [])
      let aclTree: any = this.$refs.aclTree
      let checkedKeys = computeCheckedKeys(this.selectedPids)
      console.log(checkedKeys)
      aclTree.setCheckedKeys(checkedKeys, true)
    })
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

function computeCheckedKeys (checkedKeys: Array<string>) {
  if (!Array.isArray(checkedKeys) || checkedKeys.length < 1) return null
  return checkedKeys.filter(v => {
    return !checkedKeys.find(w => {
      return w.startsWith(v) && w !== v
    })
  })
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
