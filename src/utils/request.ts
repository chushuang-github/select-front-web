import axios from 'axios'
// @ts-ignore
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// 创建axios实例
const request = axios.create({
  // 路径上面会携带/api (环境变量通过 import.meta.env 取值)
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 请求超时
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    config.headers.token = token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理网络错误
    let msg = ''
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
