<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table :data="tableData" border style="margin: 10px 0px">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button size="small" icon="Plus" type="primary"></el-button>
              <el-button
                size="small"
                icon="Edit"
                type="warning"
                @click="updateSpu(row)"
              ></el-button>
              <el-button size="small" icon="View" type="info"></el-button>
              <el-button size="small" icon="Delete" type="danger"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          background
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @size-change="getSpuList"
          @current-change="getSpuList"
        />
      </div>
      <!-- 添加、编辑SPU -->
      <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene" />
      <!-- 添加SKU -->
      <SkuForm v-show="scene === 2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
import type { SpuData, SpuResponseData } from '@/api/product/spu/type'

const categoryStore = useCategoryStore()

const scene = ref<number>(0)
const tableData = ref<SpuData[]>([])
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const spu = ref<InstanceType<typeof SpuForm>>()

watch(
  () => categoryStore.c3Id,
  () => {
    tableData.value = []
    if (!categoryStore.c3Id) return
    getSpuList()
  },
)

onBeforeUnmount(() => {
  categoryStore.$reset()
})

// spu列表
const getSpuList = async () => {
  const result: SpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code === 200) {
    total.value = result.data.total
    tableData.value = result.data.records
  }
}

// 添加
const addSpu = () => {
  scene.value = 1
  spu.value?.initAddSpu(categoryStore.c3Id)
}

// 编辑
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value?.initHasSpuData(row)
}

const changeScene = ({ flag, param }: { flag: number; param: boolean }) => {
  scene.value = flag
  if (param) {
    // 添加
    pageNo.value = 1
  }
  getSpuList()
}
</script>

<style scoped lang="scss"></style>
