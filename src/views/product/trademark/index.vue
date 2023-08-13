<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
      <el-table :data="tableData" border>
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column label="品牌Logo">
          <template v-slot="{ row }">
            <img :src="row.logoUrl" alt="图片加载失败" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template v-slot="{ row }">
            <el-button
              size="small"
              icon="Edit"
              type="warning"
              @click="updateTrademark(row)"
            ></el-button>

            <el-popconfirm
              :title="`您确定要删除${row.tmName}吗?`"
              width="250px"
              icon="Delete"
              @confirm="deleteTradkmark(row.id)"
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
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getHasTrademark"
        @current-change="getHasTrademark"
      />
    </el-card>

    <!-- 添加/编辑品牌对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="`${trademarkParams.id ? '修改' : '添加'}品牌`"
      @close="cancel"
    >
      <el-form
        ref="formRef"
        label-width="100px"
        :model="trademarkParams"
        :rules="rules"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="trademarkParams.tmName"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
              alt="图片加载失败"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps, FormInstance, FormRules } from 'element-plus'

const tableData = ref<Records>([])
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const dialogFormVisible = ref<boolean>(false)
// 新增品牌参数
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})

// 自定义表达校验
const formRef = ref<FormInstance>()
const validateTmName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数大于等于2位'))
  }
}
const validateLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('品牌Logo图片不能为空'))
  }
}
const rules: FormRules = {
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, trigger: 'blur', validator: validateLogoUrl }],
}

onMounted(() => {
  getHasTrademark()
})

// 获取已有品牌
const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    total.value = result.data.total
    tableData.value = result.data.records
  }
}

// 添加品牌
const addTrademark = () => {
  delete trademarkParams.id
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  dialogFormVisible.value = true
}

// 编辑品牌
const updateTrademark = (row: TradeMark) => {
  dialogFormVisible.value = true
  nextTick(() => {
    Object.assign(trademarkParams, row)
  })
}

// 删除品牌
const deleteTradkmark = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}

// 取消
const cancel = () => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
}

// 确定
const confirm = async () => {
  await formRef.value?.validate()
  const result = await reqAddOrUpdateTrademark(trademarkParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `${trademarkParams.id ? '修改' : '添加'}品牌成功`,
    })
    getHasTrademark()
    dialogFormVisible.value = false
  } else {
    ElMessage({
      type: 'success',
      message: `${trademarkParams.id ? '修改' : '添加'}品牌失败`,
    })
    dialogFormVisible.value = false
  }
}

// 图片上传之前 (上传png/jpg/gif，文件大小限制为4MB)
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const imgType = ['image/png', 'image/jpeg', 'image/gif']
  if (imgType.includes(rawFile.type)) {
    if (rawFile.size / 1024 / 1024 < 4) {
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

// 图片上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data
  formRef.value?.clearValidate('logoUrl')
}
</script>

<style scoped lang="scss">
.el-table {
  margin: 10px 0px;
}
img {
  width: 100px;
  height: 100px;
}
.el-form {
  width: 80%;
}
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
