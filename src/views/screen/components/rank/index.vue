<template>
  <div class="rank-box">
    <div class="top">
      <p class="title">热门景区排行</p>
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
  let myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
  myCharts.setOption({
    grid: {
      top: '10%',
      left: '22%',
      bottom: '10%',
      containLabel: false,
    },
    xAxis: {
      show: false,
    },
    yAxis: [
      {
        type: 'category',
        data: ['万里长城', '夫子庙', '玉龙雪山', '呼伦贝尔', '大理古城'],
        inverse: true,
        //不显示y轴线条
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
        },
      },
      {
        show: true,
        data: [702, 350, 610, 793, 664],
        inverse: true,
        // 不显示y轴的线
        axisLine: {
          show: false,
        },
        // 不显示刻度
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            fontSize: 12,
            color: '#fff',
          },
        },
      },
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        // 关联yAxis里面的第0项
        yAxisIndex: 0,
        // 柱子之间的距离
        barCategoryGap: 50,
        //柱子的宽度
        barWidth: 10,
        // 柱子设为圆角
        itemStyle: {
          barBorderRadius: 20,
          color: function (params) {
            return myColor[params.dataIndex]
          },
        },
        label: {
          show: true,
          color: 'white',
          // 显示柱子内部的文字
          position: 'inside',
          // 文字的显示格式
          formatter: '{c}%',
        },
        data: [70, 34, 60, 78, 69],
      },
      {
        name: '框',
        type: 'bar',
        // 关联yAxis里面的第1项
        yAxisIndex: 1,
        barCategoryGap: 50,
        barWidth: 16,
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15,
        },
        data: [100, 100, 100, 100, 100],
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
  }
  .charts {
    width: 100%;
    height: 298px;
    margin-top: 30px;
  }
}
</style>
