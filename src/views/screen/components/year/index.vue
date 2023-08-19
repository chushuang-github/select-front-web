<template>
  <div class="rank-box">
    <div class="top">
      <p class="title">年度数据量对比</p>
      <p class="bg"></p>
    </div>
    <div ref="chartsRef" class="charts"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartsRef = ref()

onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      axisLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 60,
      top: 30,
      right: 20,
      bottom: 40,
    },
    series: [
      {
        type: 'scatter',
        name: '年度数据',
        symbol: 'arrow',
        symbolSize: 16,
        data: [333, 688, 421, 339, 788, 1212, 500, 333, 780, 555, 999, 444],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.rank-box {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
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
  }
  .charts {
    width: 100%;
    height: 247px;
    margin-top: 19px;
  }
}
</style>
