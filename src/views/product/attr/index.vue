<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0px">
      <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0px">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template>
            <el-button size="small" icon="Edit" type="warning"></el-button>
            <el-button size="small" icon="Delete" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'

const categoryStore = useCategoryStore()
</script>

<style scoped lang="scss"></style>
