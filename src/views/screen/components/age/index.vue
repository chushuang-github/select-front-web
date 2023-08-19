<template>
  <div class="age-box">
    <div class="top">
      <p class="title">年龄比例</p>
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
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vetical',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '娱乐' },
          { value: 484, name: '财经' },
          { value: 300, name: '体育' },
        ],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.age-box {
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
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
    height: 265px;
  }
}
</style>
