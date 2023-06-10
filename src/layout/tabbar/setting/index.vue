<template>
  <el-button
    size="small"
    circle
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button size="small" circle icon="Setting"></el-button>
  <img class="avatar" :src="userStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()

// 刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

// 全屏按钮点击的回调
const fullScreen = () => {
  // dom对象的一个属性，可以用来判断当前是不是全屏模式
  // 如果是全屏，会返回true；如果不是全屏，会返回null
  const full = document.fullscreenElement
  if (!full) {
    // 切换为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 退出登录
const logout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
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
  border-radius: 50%;
}
</style>
