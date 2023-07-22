<template>
  <el-form label-width="100">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        placeholder="请输入SPU描述"
        type="textarea"
        v-model="spuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '暂无数据选择'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="Plus"
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table :data="saleAttr" border style="margin: 10px 0px">
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="120"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值">
          <template v-slot="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              closable
              style="margin: 0px 5px"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              v-model="row.saleAttrValue"
              :ref="(vc: any) => inputArr[$index] = vc"
              @blur="toLook(row)"
              placeholder="请输入属性值"
              size="small"
              style="width: 100px"
            />
            <el-button
              v-else
              size="small"
              icon="Plus"
              type="primary"
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template v-slot="{ $index }">
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
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
import { ref, computed, nextTick } from 'vue'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import type {
  SpuData,
  TradeMark,
  AllTradeMarkResponseData,
  SpuImageResponseData,
  SaleAttr,
  SaleAttrResponseData,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttrValue,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const emit = defineEmits(['changeScene'])
const cancel = () => {
  emit('changeScene', { flag: 0, param: false })
}

// 存储已有的spu数据
const allTradeMark = ref<TradeMark[]>([])
const imgList = ref<any>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
// spu对象
const spuParams = ref<SpuData>({
  category3Id: '',
  tmId: '',
  spuName: '',
  description: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')
// 收集还未选择的销售属性的id和名字
const saleAttrIdAndValueName = ref<string>('')
// 存取el-input实例
const inputArr = ref<any>([])

// 当前还未拥有的spu销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName
    })
  })
  return unSelectArr
})

// 初始化数据编辑
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = JSON.parse(JSON.stringify(spu))
  // 获取全部品牌
  const result: AllTradeMarkResponseData = await reqAllTrademark()
  // 获取spu照片
  const result1: SpuImageResponseData = await reqSpuImageList(spu.id as number)
  // 获取已有的spu销售属性
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  )
  // 获取所有的spu销售属性
  const result3: HasSaleAttrResponseData = await reqAllSaleAttr()

  allTradeMark.value = result.data
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  saleAttr.value = result2.data
  allSaleAttr.value = result3.data
  saleAttrIdAndValueName.value = ''
}

// 初始化数据添加
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(spuParams.value, {
    id: undefined,
    category3Id: c3Id,
    tmId: '',
    spuName: '',
    description: '',
    spuImageList: [],
    spuSaleAttrList: [],
  })
  imgList.value = []
  saleAttr.value = []
  saleAttrIdAndValueName.value = ''
  // 获取全部品牌
  const result: AllTradeMarkResponseData = await reqAllTrademark()
  // 获取所有的spu销售属性
  const result1: HasSaleAttrResponseData = await reqAllSaleAttr()

  allTradeMark.value = result.data
  allSaleAttr.value = result1.data
}

// 照片预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

// 照片删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

// 上传照片之前约束
const beforeUpload = (file: any) => {
  const imgType = ['image/png', 'image/jpeg', 'image/gif']
  if (imgType.includes(file.type)) {
    if (file.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小必须小于4MB',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式必须为png/jpg/gif',
    })
    return false
  }
}

// 添加销售属性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  saleAttrIdAndValueName.value = ''
}

// 编辑模式
const toEdit = (row: SaleAttr, index: number) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 失去焦点
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  // 非法条件判断
  if (saleAttrValue?.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    row.flag = false
    row.saleAttrValue = ''
    return
  }
  const repeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName === saleAttrValue,
  )
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    row.flag = false
    row.saleAttrValue = ''
    return
  }

  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

// 保存
const save = async () => {
  // 照片
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: item.response ? item.response.data : item.url,
    }
  })
  // 销售属性
  spuParams.value.spuSaleAttrList = saleAttr.value
  const result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '操作成功~',
    })
    emit('changeScene', {
      flag: 0,
      param: !spuParams.value.id,
    })
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败~',
    })
  }
}

// 对外暴露
defineExpose({
  initHasSpuData,
  initAddSpu,
})
</script>

<style scoped lang="scss"></style>
