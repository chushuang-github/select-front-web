<template>
  <div class="rank-box">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
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
    radar: {
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感度', max: 16000 },
        { name: '出行方式', max: 30000 },
        { name: '爱好', max: 38000 },
        { name: '出行', max: 52000 },
        { name: '景点', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭',
          },
        ],
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
    height: 248px;
    margin-top: 18px;
  }
}
</style>
