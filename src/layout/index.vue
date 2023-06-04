<template>
  <div class="layout_container">
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :default-active="route.path"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

let route = useRoute()
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: #001529;
    color: white;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      left: $base-menu-min-width;
      width: calc(100% - $base-menu-min-width);
    }
  }
}
</style>
