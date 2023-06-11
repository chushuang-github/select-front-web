export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有品牌的类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含全部品牌数据的类型
export type Records = TradeMark[]

// 已有品牌接口返回的类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
    searchCount: boolean
  }
}
