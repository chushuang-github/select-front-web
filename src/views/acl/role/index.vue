<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="form">
        <el-form-item label="角色名称：">
          <el-input placeholder="请输入角色名称" v-model="keyWord" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyWord" @click="getRoleList">
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 15px 0px">
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <el-table style="margin: 10px 0px" border :data="tableData">
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300">
          <template v-slot="{ row }">
            <el-button
              icon="User"
              size="small"
              type="primary"
              @click="addPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              icon="Edit"
              size="small"
              type="success"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`您确定删除${row.roleName}吗？`"
              width="250"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getRoleList"
        @current-change="getRoleList"
      />
    </el-card>

    <!-- 添加角色 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="`${roleParams.id ? '编辑' : '添加'}角色`"
      @close="cancel"
    >
      <el-form
        ref="formRef"
        label-width="100px"
        :model="roleParams"
        :rules="rules"
      >
        <el-form-item label="角色名称：" prop="roleName">
          <el-input
            v-model="roleParams.roleName"
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 分配权限 -->
    <el-drawer v-model="drawerShow" direction="rtl" size="30%">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          :data="menuData"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="roleCancel">取消</el-button>
          <el-button type="primary" @click="roleSave">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqMenu,
  reqPermission,
  reqRemoveRole,
} from '@/api/acl/role'
import type { RoleData } from '@/api/acl/role/type'
import { type FormRules, type FormInstance, ElMessage } from 'element-plus'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const tableData = ref<RoleData[]>([])
const keyWord = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const roleParams = reactive<RoleData>({
  id: '',
  roleName: '',
})
const drawerShow = ref<boolean>(false)
const menuData = ref<any>([])
const defaultProps = {
  children: 'children',
  label: 'name',
}

const treeRef = ref<any>()

onMounted(() => {
  getRoleList()
})

// 校验
const formRef = ref<FormInstance>()
const validateRoleName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('角色名称位数大于等于2位'))
  }
}
const rules: FormRules = {
  roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }],
}

// 列表
const getRoleList = async () => {
  const result = await reqRoleList(pageNo.value, pageSize.value, keyWord.value)
  if (result.code === 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}

// 重置
const reset = () => {
  keyWord.value = ''
  pageNo.value = 1
  pageSize.value = 5
  getRoleList()
}

// 添加角色
const addRole = () => {
  roleParams.id = ''
  roleParams.roleName = ''
  dialogFormVisible.value = true
}

// 编辑角色
const updateRole = (row: RoleData) => {
  dialogFormVisible.value = true
  nextTick(() => {
    roleParams.id = row.id as string
    roleParams.roleName = row.roleName
  })
}

// 取消、确定
const cancel = () => {
  dialogFormVisible.value = false
  formRef.value?.resetFields()
}
const confirm = async () => {
  await formRef.value?.validate()
  const result = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: `${roleParams.id ? '编辑' : '新增'}成功`,
    })
    if (!roleParams.id) {
      pageNo.value = 1
    }
    cancel()
    getRoleList()
  }
}

// 获取选中的权限id
const filterSelectArr = (alldata: any, initArr: any) => {
  alldata.forEach((item: any) => {
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    } else if (item.select) {
      initArr.push(item.id)
    }
  })
  return initArr
}

// 分配权限按钮
const addPermission = async (row: RoleData) => {
  drawerShow.value = true
  Object.assign(roleParams, {
    id: row.id,
    roleName: row.roleName,
  })
  const result = await reqMenu(row.id as number)
  if (result.code === 200) {
    menuData.value = result.data
    const roleArr = filterSelectArr(menuData.value, [])
    treeRef.value.setCheckedKeys(roleArr)
  }
}

// 分配权限取消
const roleCancel = () => {
  drawerShow.value = false
}

// 分配权限确定
const roleSave = async () => {
  const roleId = roleParams.id
  // 选中id
  const arr = treeRef.value.getCheckedKeys()
  // 半选id
  const arr1 = treeRef.value.getHalfCheckedKeys()
  const permissionId = [...arr, ...arr1]
  const result = await reqPermission(roleId as number, permissionId)
  if (result.code === 200) {
    roleCancel()
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
  }
}

// 删除
const deleteRole = async (roleId: number) => {
  const result = await reqRemoveRole(roleId)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getRoleList()
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
