<template>
<div style="padding-left: 80px;">
    <chart :options="bar"></chart>
    <chart :options="radar"></chart>
    <div>
        <svg-icon icon="alert" class="sm"></svg-icon> &nbsp;
        <svg-icon icon="alert"></svg-icon> &nbsp;
        <svg-icon icon="alert" class="md"></svg-icon> &nbsp;
        <svg-icon icon="alert" class="lg"></svg-icon> &nbsp;
        <svg-icon icon="alert" class="xl"></svg-icon> &nbsp;
    </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'

const bar = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}

const radar = {
  title: {
    text: '基础雷达图'
  },
  tooltip: {},
  legend: {
    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: [
      {name: '销售（sales）', max: 6500},
      {name: '管理（Administration）', max: 16000},
      {name: '信息技术（Information Techology）', max: 30000},
      {name: '客服（Customer Support）', max: 38000},
      {name: '研发（Development）', max: 52000},
      {name: '市场（Marketing）', max: 25000}
    ]
  },
  series: [{
    name: '预算 vs 开销（Budget vs spending）',
    type: 'radar',
    // areaStyle: {normal: {}},
    data: [
      {
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: '预算分配（Allocated Budget）'
      },
      {
        value: [5000, 14000, 28000, 31000, 42000, 21000],
        name: '实际开销（Actual Spending）'
      }
    ]
  }]
}

@Component({
  components: {},
  })
export default class Dashboard extends Vue {
  bar: any = bar;
  radar: any = radar;
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
@import "~@/styles/variables.scss";
</style>
