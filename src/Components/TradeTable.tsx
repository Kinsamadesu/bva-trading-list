import React from 'react'
import { Table } from 'react-bootstrap'
import { MarketPrices, TradeRow } from '../Types'

export const TradeTable = ({
  tradeRows,
  marketPrices,
}: {
  tradeRows: TradeRow[]
  marketPrices: MarketPrices
}) => {
  const dateFormat = Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const listView = tradeRows.map((row: TradeRow) => {
    const date =
      row.type === 'LONG'
        ? row.buy_time
          ? row.buy_time
          : ''
        : row.sell_time
        ? row.sell_time
        : ''
    return (
      <tr key={row.id}>
        <td>{dateFormat.format(new Date(parseInt(date)))}</td>
        <td>{row.type}</td>
        <td>{row.pair}</td>
        <td>{row.type === 'LONG' ? row.buy_price : row.sell_price}</td>
        <td>{marketPrices[row.pair]}</td>
      </tr>
    )
  })

  return (
    <Table striped responsive="md">
      <thead>
        <tr>
          <th>Entered</th>
          <th>Type</th>
          <th>Pair</th>
          <th>Entered Price</th>
          <th>Market Price</th>
        </tr>
      </thead>
      <tbody>{listView}</tbody>
    </Table>
  )
}
