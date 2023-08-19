<template>
  <div class="sex-box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <span>男士</span>
        <img src="../../images/man.png" />
      </div>
      <div class="woman">
        <span>女士</span>
        <img src="../../images/woman.png" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
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
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 40,
      top: 0,
      right: 40,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.sex-box {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
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
  .sex {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .man {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 20px 10px 20px;
      width: 111px;
      height: 115px;
      background: url('../../images/man-bg.png') no-repeat;
      span {
        position: absolute;
        top: 4px;
        color: white;
        font-size: 13px;
      }
    }
    .woman {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 20px 10px 20px;
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png') no-repeat;
      span {
        position: absolute;
        top: 2px;
        color: white;
        font-size: 13px;
      }
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
    margin: 10px 40px 0px;
  }
  .charts {
    height: 50px;
  }
}
</style>
