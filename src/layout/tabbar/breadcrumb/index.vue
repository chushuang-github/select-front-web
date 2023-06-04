<template>
  <el-icon class="icon" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <template v-for="item in route.matched" :key="item.path">
      <el-breadcrumb-item
        v-show="item.meta.title"
        :to="item.path"
        class="breadcrumb-item"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span class="title">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'

// route里面的matched属性，可以做面包屑功能(里面已经将所有的面包屑路径收集好了)
const route = useRoute()
const layoutSettingStore = useLayoutSettingStore()
// 控制菜单的折叠还是展开
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped lang="scss">
.icon {
  margin-right: 10px;
}
.breadcrumb-item {
  margin-top: 3px;
  .title {
    margin: 0px 5px;
    vertical-align: top;
  }
}
</style>
