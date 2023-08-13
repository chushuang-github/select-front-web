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
  <el-popover placement="bottom" title="主题设置" :width="260" trigger="hover">
    <template #reference>
      <el-button size="small" circle icon="Setting"></el-button>
    </template>
    <el-form>
      <el-form-item label="主题颜色：">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          size="small"
          @change="pickerChange"
        />
      </el-form-item>
      <el-form-item label="暗黑模式：">
        <el-switch size="small" v-model="dark" @change="switchChange" />
      </el-form-item>
    </el-form>
  </el-popover>

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
import { ref } from 'vue'
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

// 主题颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const pickerChange = () => {
  const html = document.documentElement
  // 设置 css 变量
  html.style.setProperty('--el-color-primary', color.value)
  html.style.setProperty('--el-color-success', color.value)
  html.style.setProperty('--el-color-warning', color.value)
  html.style.setProperty('--el-color-danger', color.value)
  html.style.setProperty('--el-color-info', color.value)
}

// 暗黑模式
// element-plus已经支持暗黑模式了，在html标签增加dark类目，在入口文件引入暗黑模式的css文件
const dark = ref<boolean>(false)
const switchChange = () => {
  const html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
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
