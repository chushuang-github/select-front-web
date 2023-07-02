import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

enum API {
  C1_URL = '/admin/product/getCategory1', // 一级分类
  C2_URL = '/admin/product/getCategory2/', // 二级分类
  C3_URL = '/admin/product/getCategory3/', // 三级分类
  ATTR_URL = '/admin/product/attrInfoList/', // 属性管理列表
  ADD_UPDATE_URL = '/admin/product/saveAttrInfo', // 添加或者修改已有属性的接口
  ATTR_DELETE_URL = '/admin/product/deleteAttr/', // 删除属性
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

// 获取属性管理列表
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )
}

// 新增/修改已有属性接口
export const reqAddOrUpdate = (data: Attr) => {
  return request.post<any, any>(API.ADD_UPDATE_URL, data)
}

// 删除
export const reqRemoveAttr = (attrId: number | string) => {
  return request.delete<any, any>(API.ATTR_DELETE_URL + attrId)
}
