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
              <el-button
                size="small"
                icon="Plus"
                type="primary"
                @click="addSku(row)"
              ></el-button>
              <el-button
                size="small"
                icon="Edit"
                type="warning"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                icon="View"
                type="info"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确定删除${row.spuName}吗？`"
                width="200"
                @confirm="deleteSku(row)"
              >
                <template #reference>
                  <el-button
                    size="small"
                    icon="Delete"
                    type="danger"
                  ></el-button>
                </template>
              </el-popconfirm>
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
      <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene" />
    </el-card>
    <!-- sku列表 -->
    <el-dialog title="sku列表" v-model="show">
      <el-table border :data="skuList" max-height="500">
        <el-table-column label="sku名称" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="图片">
          <template v-slot="{ row }">
            <img
              :src="row.skuDefaultImg"
              style="width: 100px; height: 100px"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu, reqSkuList, reqDeleteSpu } from '@/api/product/spu'
import type {
  SpuData,
  SpuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const categoryStore = useCategoryStore()

const scene = ref<number>(0)
const tableData = ref<SpuData[]>([])
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const spu = ref<InstanceType<typeof SpuForm>>()
const sku = ref<InstanceType<typeof SkuForm>>()
const skuList = ref<SkuData[]>([])
const show = ref<boolean>(false)

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

const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value?.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// sku列表
const findSku = async (row: SpuData) => {
  const result: SkuInfoData = await reqSkuList(row.id as number | string)
  if (result.code === 200) {
    skuList.value = result.data
    show.value = true
  }
}

// 删除
const deleteSku = async (row: SpuData) => {
  const result = await reqDeleteSpu(row.id as string | number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSpuList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped lang="scss"></style>
