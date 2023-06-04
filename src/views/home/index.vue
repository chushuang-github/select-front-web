<template>
  <div>
    <h1>首页</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss"></style>
