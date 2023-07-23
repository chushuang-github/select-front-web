<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0px" :data="tableData">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="250"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="默认图片" width="150">
          <template v-slot="{ row }">
            <img
              :src="row.skuDefaultImg"
              style="width: 100px; height: 100px"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量(g)"
          width="150"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          width="150"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="260" fixed="right">
          <template v-slot="{ row }">
            <el-button
              size="small"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              type="primary"
              @click="updateSale(row)"
            ></el-button>
            <el-button
              size="small"
              icon="Edit"
              type="warning"
              @click="edit"
            ></el-button>
            <el-button
              size="small"
              icon="View"
              type="info"
              @click="skuDetail(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确定删除${row.skuName}吗？`"
              width="250"
              @confirm="skuDelete(row)"
            >
              <template #reference>
                <el-button size="small" icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getSkuList"
        @current-change="getSkuList"
      />
    </el-card>
    <!-- 详情 -->
    <el-drawer v-model="drawerShow" direction="rtl" size="40%">
      <template #header>
        <h4>sku详情</h4>
      </template>
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ detail?.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ detail?.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ detail?.price }}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">重量</el-col>
          <el-col :span="18">{{ detail?.weight }}克</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in detail?.skuAttrValueList"
              :key="item.id"
            >
              {{ item.attrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              type="danger"
              style="margin: 5px"
              v-for="item in detail.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in detail.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSaleSku,
  reqSkuDetail,
  reqSkuDelete,
} from '@/api/product/sku'
import type {
  SkuData,
  SkuResponseData,
  SkuDetailResponseData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const tableData = ref<SkuData[]>([])
const drawerShow = ref<boolean>(false)
const detail = ref<SkuData>({})

onMounted(() => {
  getSkuList()
})

// 列表
const getSkuList = async () => {
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}

// 上架、下架
const updateSale = async (row: SkuData) => {
  const updateFn = row.isSale === 1 ? reqCancelSaleSku : reqSaleSku
  const result = await updateFn(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `${row.isSale === 1 ? '下架' : '上架'}成功`,
    })
    getSkuList()
  } else {
    ElMessage({
      type: 'error',
      message: `${row.isSale === 1 ? '下架' : '上架'}失败`,
    })
  }
}

// 编辑
const edit = () => {
  ElMessage({
    type: 'success',
    message: '程序员正在努力的研发中~',
  })
}

// 详情
const skuDetail = async (row: SkuData) => {
  drawerShow.value = true
  const result: SkuDetailResponseData = await reqSkuDetail(row.id as number)
  if (result.code === 200) {
    detail.value = result.data
  }
}

// 删除
const skuDelete = async (row: SkuData) => {
  const result = await reqSkuDelete(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSkuList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 15px;
}
</style>
