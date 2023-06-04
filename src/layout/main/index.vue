<template>
  <div>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" v-if="flag"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()

// 控制当前组件是否销毁重建
const flag = ref<boolean>(true)

// 监听setting仓库里面refresh值的变化，一旦发生变化，就表示需要刷新二级路由了
// 路由组件的销毁重建：使用v-if可以销毁组件
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 点击刷新按钮，二级路由组件需要销毁
    flag.value = false
    // 组件销毁完毕之后，进行重新创建
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
