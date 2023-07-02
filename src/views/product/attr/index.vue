<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table :data="tableData" border style="margin: 10px 0px">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template v-slot="{ row }">
              <el-button
                size="small"
                icon="Edit"
                type="warning"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm
                :title="`您确定要删除${row.attrName}吗?`"
                width="250px"
                icon="Delete"
                @confirm="deleteAttr(row)"
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
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" @click="addAttrValue">
          添加属性值
        </el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80"
            type="index"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-input
                v-if="row.flag"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
                :ref="(vc: any) => inputArr[$index] = vc"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template v-slot="{ $index }">
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                @click="attrDelete($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="!attrParams.attrName || !attrParams.attrValueList.length"
          @click="save"
        >
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref, watch, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
import { reqAttr, reqAddOrUpdate, reqRemoveAttr } from '@/api/product/attr'
import type { Attr, AttrValue } from '@/api/product/attr/type'

const categoryStore = useCategoryStore()

const tableData = ref<Attr[]>([])
const scene = ref<number>(0)
// 新增/编辑参数
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
// 存取el-input实例
const inputArr = ref<any>([])

watch(
  () => categoryStore.c3Id,
  () => {
    tableData.value = []
    if (!categoryStore.c3Id) return
    getAttrList()
  },
)

onBeforeUnmount(() => {
  categoryStore.$reset()
})

// 获取属性列表
const getAttrList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    tableData.value = result.data
  }
}

// 添加属性按钮回调
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}

// 修改属性按钮的回调
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 取消
const cancel = () => {
  scene.value = 0
}

// 添加属性值按钮
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

// 保存
const save = async () => {
  const result = await reqAddOrUpdate(attrParams)
  if (result.code === 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttrList()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

const toLook = (row: AttrValue, index: number) => {
  // 属性值为空
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值名称不能为空')
    return
  }
  // 属性值相同
  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值名称不能重复')
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
const attrDelete = (index: number) => {
  attrParams.attrValueList.splice(index, 1)
}

// 删除属性
const deleteAttr = async (row: Attr) => {
  const result = await reqRemoveAttr(row.id!)
  if (result.code === 200) {
    ElMessage.success('删除属性成功')
    getAttrList()
  } else {
    ElMessage.error('删除属性失败')
  }
}
</script>

<script lang="ts">
export default {
  name: 'Attr',
}
</script>

<style scoped lang="scss"></style>
