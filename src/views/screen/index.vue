<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Counter from './components/counter/index.vue'

const screenRef = ref()
// 缩放的比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

onMounted(() => {
  screenRef.value.style.transform = `scale(${getScale()}) translateX(-50%)`
})

window.onresize = () => {
  screenRef.value.style.transform = `scale(${getScale()}) translateX(-50%)`
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    left: 50%;
    transform-origin: left top;
    width: 1920px;
    height: 1080px;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 1040px;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1.4;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.2;
        }
        .year {
          flex: 1;
        }
        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>
