import request from '@/utils/request'
import type {
  SpuResponseData,
  AllTradeMarkResponseData,
  SpuImageResponseData,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
  SkuData,
  SkuInfoData,
} from './type'

enum API {
  HASSPU_URL = '/admin/product/', // 获取已有的SPU列表
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList', // 获取所有品牌
  IMAGE_URL = '/admin/product/spuImageList/', // 获取某一个spu下的照片
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/', // 销售属性列表
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList', // 获取整个项目全部的销售属性种类[颜色、版本、尺码]
  ADDSPU_URL = '/admin/product/saveSpuInfo', // 追加一个新的spu
  UPDATESPU_URL = '/admin/product/updateSpuInfo', // 更新已有的spu
  ADDSKU_URL = '/admin/product/saveSkuInfo', // 添加sku
  SKUINFO_URL = '/admin/product/findBySpuId/', // 查看spu下的sku商品
  DELETESPU_URL = '/admin/product/deleteSpu/', // 删除spu
}

// 获取已有的SPU列表
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) => {
  return request.get<any, SpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
}

// 获取spu品牌
export const reqAllTrademark = () => {
  return request.get<any, AllTradeMarkResponseData>(API.ALLTRADEMARK_URL)
}

// 照片
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuImageResponseData>(API.IMAGE_URL + spuId)
}

// 销售属性列表(已有的销售属性)
export const reqSpuHasSaleAttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}

// 销售属性种类(所有的销售属性)
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}

// 添加/更新spu
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    // 更新
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    // 添加
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}

// 添加sku
export const reqAddSku = (data: SkuData) => {
  return request.post<any, any>(API.ADDSKU_URL, data)
}

// 查看spu下的sku商品
export const reqSkuList = (spuId: string | number) => {
  return request.get<any, SkuInfoData>(API.SKUINFO_URL + spuId)
}

// 删除spu
export const reqDeleteSpu = (spuId: string | number) => {
  return request.delete<any, any>(API.DELETESPU_URL + spuId)
}
