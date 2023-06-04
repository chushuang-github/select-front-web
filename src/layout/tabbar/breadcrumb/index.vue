<template>
  <el-icon class="icon" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'

// 控制菜单的折叠还是展开
const layoutSettingStore = useLayoutSettingStore()
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
</style>
