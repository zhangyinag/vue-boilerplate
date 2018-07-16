<template>
    <div class="notice">
        <el-popover
                placement="bottom"
                width="320"
                trigger="click">
            <div>
                <div style="line-height: 32px;">系统消息通知</div>
                <div class="divider">
                    <a href="javascript:void(0);" style="color: #409EFF; text-decoration: none;">您有一张50元优惠券待使用，请查收</a>
                    <p>2018/06/08 12:12:00</p>
                </div>
                <div class="divider">
                    <a href="javascript:void(0);" style="color: #409EFF; text-decoration: none;">您有一张50元优惠券待使用，请查收</a>
                    <p>2018/06/08 12:15:00</p>
                </div>
                <div class="divider">
                    <a href="javascript:void(0);" style="color: #409EFF; text-decoration: none;">您有一张50元优惠券待使用，请查收</a>
                    <p>2018/06/08 13:12:00</p>
                </div>
            </div>
            <el-badge slot="reference" :value="3">
                <svg-icon  icon="bell-fill" class="notice__icon link"></svg-icon>
            </el-badge>
        </el-popover>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  components: {},
  })
export default class Notice extends Vue {
}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
@include b(notice){
    padding: 0 20px;
    @include e(icon){
        color: $--color-info;
        &:hover{
            color: $--color-primary;
        }
    }
}
</style>
