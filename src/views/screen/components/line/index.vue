<template>
  <div class="line-box">
    <div class="top">
      <p class="title">30天游客数量趋势图</p>
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
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: [
        '05/01',
        '05/03',
        '05/05',
        '05/07',
        '05/09',
        '05/11',
        '05/13',
        '05/15',
        '05/17',
        '05/19',
        '05/21',
        '05/23',
        '05/25',
        '05/27',
        '05/29',
      ],
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      right: 25,
      top: 20,
      bottom: 30,
    },
    series: [
      {
        type: 'line',
        smooth: true,
        name: '访客量',
        data: [
          80, 320, 66, 99, 360, 88, 280, 30, 89, 220, 188, 278, 200, 100, 200,
        ],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(240, 250, 10, 0.7)',
            },
            {
              offset: 1,
              color: 'rgba(240, 250, 10, 0.1)',
            },
          ]),
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.line-box {
  width: calc(100% - 40px);
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 0px 20px;
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
    margin-top: 17px;
    width: 100%;
    height: 211px;
  }
}
</style>
