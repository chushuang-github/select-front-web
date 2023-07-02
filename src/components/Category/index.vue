<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handlerOne"
          :disabled="scene !== 0"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handlerTwo"
          :disabled="scene !== 0"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene !== 0">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'

defineProps(['scene'])

const categoryStore = useCategoryStore()

onMounted(() => {
  getC1()
})

const getC1 = () => {
  categoryStore.getC1()
}

// 一级分类下拉菜单变化事件
const handlerOne = () => {
  categoryStore.getC2()
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
}
// 二级分类下拉菜单变化事件
const handlerTwo = () => {
  categoryStore.getC3()
  categoryStore.c3Id = ''
}
</script>

<script lang="ts">
export default {
  name: 'Category',
}
</script>

<style scoped lang="scss"></style>
