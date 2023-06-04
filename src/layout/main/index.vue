<template>
  <div>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts"></script>

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
