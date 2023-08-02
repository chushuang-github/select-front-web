<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 15px 0px">
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
      <el-table style="margin: 10px 0px" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="#"></el-table-column>
        <el-table-column label="id"></el-table-column>
        <el-table-column label="用户名字"></el-table-column>
        <el-table-column label="用户名称"></el-table-column>
        <el-table-column label="用户角色"></el-table-column>
        <el-table-column label="创建时间"></el-table-column>
        <el-table-column label="更新时间"></el-table-column>
        <el-table-column label="操作" width="260"></el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="getUserList"
        @current-change="getUserList"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)

const getUserList = () => {}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
