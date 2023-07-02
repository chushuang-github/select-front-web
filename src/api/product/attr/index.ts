import request from '@/utils/request'
import type { CategoryResponseData } from './type'

enum API {
  C1_URL = '/admin/product/getCategory1', // 一级分类
  C2_URL = '/admin/product/getCategory2/', // 二级分类
  C3_URL = '/admin/product/getCategory3/', // 三级分类
}

// 一级分类
export const reqC1 = () => {
  return request.get<any, CategoryResponseData>(API.C1_URL)
}

// 二级分类
export const reqC2 = (category1Id: number | string) => {
  return request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
}

// 三级分类
export const reqC3 = (category2Id: number | string) => {
  return request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
}
