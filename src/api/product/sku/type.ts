export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// sku数据类型
export interface Attr {
  attrId: number | string
  attrName: string
  createTime: string
  id: number | string
  skuId: number | string
  updateTime: string
  valueId: number | string
  valueName: string
}
export interface SaleAttr {
  createTime: string
  id: number | string
  saleAttrId: number | string
  saleAttrName: string
  saleAttrValueId: number | string
  saleAttrValueName: string
  skuId: number | string
  spuId: number | string
}

export interface SkuImage {
  createTime: string
  id: number | string
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number | string
  spuImgId: number | string
  updateTime: string
}

export interface SkuData {
  category3Id?: number | string
  spuId?: number | string
  tmId?: number | string
  id?: number | string
  isSale?: number
  skuName?: string
  price?: number | string
  weight?: number | string
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: SaleAttr[]
  skuImageList?: SkuImage[]
  skuDefaultImg?: string
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    optimizeCountSql: boolean
    hitCount: boolean
    searchCount: boolean
    pages: number
    countId: null
    maxLimit: null
    orders: []
  }
}

// sku商品详情
export interface SkuDetailResponseData extends ResponseData {
  data: SkuData
}
