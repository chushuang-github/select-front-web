import request from '@/utils/request'
import type { SkuResponseData, SkuDetailResponseData } from './type'

enum API {
  SKU_URL = '/admin/product/list/', // 获取已有的SKU列表
  SALE_URL = '/admin/product/onSale/', // 上架
  CANCELSALE_URL = '/admin/product/cancelSale/', // 下架
  SKUDETAIL_URL = '/admin/product/getSkuInfo/', // 详情
  SKUDELETE_RUL = '/admin/product/deleteSku/', // 删除
}

// sku列表
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}

// 上架
export const reqSaleSku = (skuId: number) => {
  return request.get<any, any>(API.SALE_URL + skuId)
}

// 下架
export const reqCancelSaleSku = (skuId: number) => {
  return request.get<any, any>(API.CANCELSALE_URL + skuId)
}

// 详情
export const reqSkuDetail = (skuId: number) => {
  return request.get<any, SkuDetailResponseData>(API.SKUDETAIL_URL + skuId)
}

// 删除
export const reqSkuDelete = (skuId: number) => {
  return request.delete<any, any>(API.SKUDELETE_RUL + skuId)
}
