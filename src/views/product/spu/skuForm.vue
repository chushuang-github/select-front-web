<template>
  <el-form label-width="100">
    <el-form-item label="sku名称">
      <el-input placeholder="sku名称" v-model="skuParams.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuParams.price"
      />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      />
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        placeholder="sku名称"
        type="textarea"
        v-model="skuParams.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="100" style="line-height: 40px">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="item1 in item.attrValueList"
              :key="item1.id"
              :label="item1.valueName"
              :value="`${item.id}:${item1.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline>
        <el-form-item
          v-for="item in saleArr"
          :label="item.saleAttrName"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="item1 in item.spuSaleAttrValueList"
              :key="item1.id"
              :label="item1.saleAttrValueName"
              :value="`${item.id}:${item1.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="tableRef">
        <el-table-column
          type="selection"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template v-slot="{ row }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from '@/api/product/spu'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
import type {
  SpuData,
  SaleAttrResponseData,
  SpuImageResponseData,
  SaleAttr,
  SkuData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['changeScene'])

// 取消
const cancel = () => {
  emit('changeScene', { flag: 0, param: false })
}

// 存取数据
const attrArr = ref<Attr[]>([])
const saleArr = ref<SaleAttr[]>([])
const imgArr = ref<any>([])
// sku参数
const skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})
const tableRef = ref<any>()

// 初始化数据
const initSkuData = async (
  c1Id: string | number,
  c2Id: string | number,
  row: SpuData,
) => {
  Object.assign(skuParams, {
    category3Id: row.category3Id,
    spuId: row.id as string | number,
    tmId: row.tmId,
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  })
  // 平台属性
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, row.category3Id)
  // 销售属性
  const result1: SaleAttrResponseData = await reqSpuHasSaleAttr(
    row.id as number,
  )
  // 图片
  const result2: SpuImageResponseData = await reqSpuImageList(row.id as number)

  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

// 默认图片
const handler = (row: any) => {
  imgArr.value.forEach((row: any) => {
    tableRef.value.toggleRowSelection(row, false)
  })
  tableRef.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

// 保存
const save = async () => {
  const attrArrTemp = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  skuParams.skuAttrValueList = attrArrTemp

  const saleArrTemp = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = saleArrTemp

  const result = await reqAddSku(skuParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加sku成功',
    })
    emit('changeScene', { flag: 0, param: false })
  } else {
    ElMessage({
      type: 'error',
      message: '添加sku失败',
    })
  }
}

defineExpose({ initSkuData })
</script>

<style scoped lang="scss"></style>
