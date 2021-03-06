export type UserDatas = {
  rows: TradeRow[]
}

export type TradeStrat = {
  stratid: string
  stratname: string
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
  pnl: string | null
  qty: string
  yo: boolean
}

export type MarketPrices = {
  [key: string]: number
}

export type AllowedStrat = {
  strat: string
  allowed: boolean
}
