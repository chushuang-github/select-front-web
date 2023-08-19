<template>
  <div ref="chartsRef" class="map-box">111</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './json/china.json'

echarts.registerMap('china', chinaJSON)

const chartsRef = ref()
onMounted(() => {
  const myCharts = echarts.init(chartsRef.value)
  myCharts.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      top: 200,
      zoom: 1.4,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },
      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'skyblue', // 0% 处的颜色
            },
            {
              offset: 0.8,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.6,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: 'pink',
        },
        label: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 4,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 4,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          symbolSize: 12,
          color: 'red',
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.map-box {
}
</style>
