export type UserDatas = {
  rows: TradeRow[]
}

export type TradeRow = {
  id: string
  stratid: string
  stratname: string
  pair: string
  type: string
  buy_time: string | null
  sell_time: string | null
  buy_price: string | null
  sell_price: string | null
}

export type MarketPrices = {
  [key: string]: number
}
