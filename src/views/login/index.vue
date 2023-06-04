<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          ref="loginForms"
          class="login_form"
          :model="loginForm"
          :rules="rules"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              :show-password="true"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
// @ts-ignore
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'

const useStore = useUserStore()
const router = useRouter()
const route = useRoute()
const loginForms = ref()

const loading = ref<boolean>(false)
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

// 自定义表达校验
const validateUserName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为5位'))
  }
}
const validatePassWord = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少为6位'))
  }
}
const rules = {
  username: [{ validator: validateUserName, trigger: 'change' }],
  password: [{ validator: validatePassWord, trigger: 'change' }],
}

const login = async () => {
  // 表达校验
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      title: `HI,${getTime()}好`,
      message: '欢迎回来',
    })
    loading.value = false
  } catch (error) {
    ElNotification({
      type: 'error',
      title: '提示',
      message: (error as Error).message,
    })
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
