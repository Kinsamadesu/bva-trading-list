import React from 'react'
import { Table } from 'react-bootstrap'
import { TradeRow } from '../Types'

export const TradeTable = ({ tradeRows }: { tradeRows: TradeRow[] }) => {
  const dateFormat = Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const listView = tradeRows.map((row: TradeRow) => {
    const entryDate =
      row.type === 'LONG'
        ? row.buy_time
          ? row.buy_time
          : ''
        : row.sell_time
        ? row.sell_time
        : ''

    const pnl = row.pnl ? Math.round(parseFloat(row.pnl) * 100) / 100 : 0

    return (
      <tr key={row.id}>
        <td>{dateFormat.format(new Date(parseInt(entryDate)))}</td>
        <td>{row.type}</td>
        <td>{row.pair}</td>
        <td style={{ color: pnl > 0 ? 'green' : pnl < 0 ? 'red' : 'white' }}>
          {row.pnl ? `${pnl}%` : '-'}
        </td>
      </tr>
    )
  })

  return (
    <Table className="tradeTable" striped responsive="md">
      <thead>
        <tr>
          <th>Entered</th>
          <th>Type</th>
          <th>Pair</th>
          <th>PnL</th>
        </tr>
      </thead>
      <tbody>{listView}</tbody>
    </Table>
  )
}
