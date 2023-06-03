<template>
  <div>
    <RouterView v-slot="{ Component }">
      <Transition name="fade">
        <component :is="Component"></component>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all .3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>