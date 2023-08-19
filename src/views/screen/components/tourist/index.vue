<template>
  <div class="tourist-box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">
        {{ item }}
      </span>
    </div>
    <div ref="chartsRef" class="charts"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 水球图拓展插件（echarts扩展插件）
import 'echarts-liquidfill'

const people = ref('215908人')
const chartsRef = ref()

onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.6, 0.4, 0.2],
        waveAnimation: true,
        animationDuration: 3,
        animationDurationUpdate: 0,
        radius: '80%',
        itemStyle: {
          shadowBlur: 0,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.tourist-box {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
      margin-top: 5px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
        font-size: 18px;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 24px;
    }
  }
  .charts {
    width: 100%;
    height: 235px;
  }
}
</style>
