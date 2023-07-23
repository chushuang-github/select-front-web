export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 分类接口返回数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

// 品牌管理列表类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

export interface Attr {
  id?: number
  attrIdAndValueId?: string
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
