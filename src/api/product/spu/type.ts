export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// spu数据类型
export interface SpuData {
  category3Id: number | string
  id?: number
  tmId: number | string
  spuName: string
  description: string
  spuImageList: null | SpuImage[]
  spuSaleAttrList: null | SaleAttr[]
}

// 已有spu列表接口返回的类型
export interface SpuResponseData extends ResponseData {
  data: {
    records: SpuData[]
    total: number
    size: number
    current: number
    pages: number
    searchCount: boolean
  }
}

// 品牌类型
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

// 品牌类型接口返回的数据类型
export interface AllTradeMarkResponseData extends ResponseData {
  data: TradeMark[]
}

// 商品图片类型
export interface SpuImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}

// 图片接口返回的数据类型
export interface SpuImageResponseData extends ResponseData {
  data: SpuImage[]
}

// 销售属性值类型
export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

// 销售属性类型
export interface SaleAttr {
  flag?: boolean
  saleAttrValue?: string
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  saleAttrName: string
  baseSaleAttrId: number | string
  spuSaleAttrValueList: SaleAttrValue[]
}

// 销售属性接口返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

// 销售属性种类
export interface HasSaleAttr {
  id: number
  name: string
}

// 销售属性类型接口返回的数据类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
