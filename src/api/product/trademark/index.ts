import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/', // 获取已有品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save', // 添加品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update', // 修改品牌
}

// 获取已有品牌
export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
}

// 添加/修改品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    // 修改品牌
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // 添加品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
