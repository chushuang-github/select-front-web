<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-if="!layoutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
    white-space: nowrap;
  }
}
</style>
