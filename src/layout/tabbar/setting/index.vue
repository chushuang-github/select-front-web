<template>
  <el-button
    size="small"
    circle
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button size="small" circle icon="FullScreen"></el-button>
  <el-button size="small" circle icon="Setting"></el-button>
  <img class="avatar" src="../../../../public/logo.png" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

// 刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
.avatar {
  width: 24px;
  height: 24px;
  margin: 10px;
}
</style>
