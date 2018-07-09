<template>
<div class="feedback link">
    <el-popover
            placement="left"
            v-model="visible"
            width="200">
        <div>
            <p>请给该系统评分</p>
            <el-rate v-model="rate" show-text></el-rate>
            <p>请提供建议</p>
            <el-input
                    style="font-size: 12px;"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="remark">
            </el-input>
            <div style="text-align: right;">
                <el-button type="text" size="mini" @click="visible = false"><p>提交</p></el-button>
            </div>
        </div>
        <div slot="reference" style="text-align: center; padding-top: 5px;">反馈</div>
    </el-popover>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class Feedback extends Vue {
  visible: boolean = false;
  rate: number = 0;
  remark: string = '';
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
$--feed-background-color: #f4364c;
@include b(feedback){
    position: fixed;
    bottom: 120px;
    right: 0;
    height: 48px;
    width: 20px;
    background: $--feed-background-color;
    color: #fff;
    border-radius: 4px 0 0 4px;
    box-shadow: -1px 1px 5px lighten($--feed-background-color, 25%);
    &:hover{
        transform:scaleX(1.2);
    }
}
</style>
