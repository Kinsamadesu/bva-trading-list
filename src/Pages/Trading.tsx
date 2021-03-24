import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DismissArea from '../Components/DismissArea'
import Filters from '../Components/Filters'
import StratFilter from '../Components/StratFilter'
import { TradeTable } from '../Components/TradeTable'
import { AllowedStrat, MarketPrices, TradeStrat } from '../Types'

const Trading = ({
  tradeStrats,
  marketPrices,
}: {
  tradeStrats: TradeStrat[]
  marketPrices: MarketPrices
}) => {
  const [openFilter, setOpenFilter] = useState(false)
  const [allowedStrats, setAllowedStrats] = useState<AllowedStrat[]>([])
  const [filter, setFilter] = useState('all')

  const onDismiss = () => {
    setOpenFilter(false)
  }

  useEffect(() => {
    const filter = localStorage.getItem('filter')
    if (filter) {
      setFilter(filter)
    }
    const allowedStrats = localStorage.getItem('allowedSrats')
    if (allowedStrats) {
      setAllowedStrats(JSON.parse(allowedStrats))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

  useEffect(() => {
    localStorage.setItem('allowedSrats', JSON.stringify(allowedStrats))
  }, [allowedStrats])

  const stratsView: JSX.Element[] = []

  tradeStrats.forEach((t) => {
    let tPNL = 0
    let lPNL = 0
    let sPNL = 0
    const rows = t.rows.filter((r) => {
      const strat = allowedStrats.find((st) => r.stratname === st.strat)
      if (strat) {
        if (!strat.allowed) {
          return false
        }
      }
      if (filter === 'opened') {
        if (r.buy_price === null || r.sell_price === null) {
          return true
        }
        return false
      }
      if (filter === 'closed') {
        if (r.buy_price !== null && r.sell_price !== null) {
          return true
        }
        return false
      }
      return true
    })

    rows.forEach((r) => {
      let price = r.buy_price
      if (r.type !== 'LONG') {
        price = r.sell_price
      }
      if (r.pnl === null && price && marketPrices) {
        const marketPrice = marketPrices[r.pair]
        r.pnl = (
          ((marketPrice - parseFloat(price)) / parseFloat(price)) * 100 -
          0.2
        ).toString()
      }

      if (r.pnl) {
        tPNL += parseFloat(r.pnl)
      }
      if (r.pnl && r.type === 'LONG') {
        lPNL += parseFloat(r.pnl)
      } else if (r.pnl && r.type === 'SHORT') {
        sPNL += parseFloat(r.pnl)
      }
    })

    rows.sort((a, b) => {
      if (filter === 'closed' && a.sell_time && b.sell_time) {
        if (parseFloat(a.sell_time) > parseFloat(b.sell_time)) return -1
        if (parseFloat(a.sell_time) < parseFloat(b.sell_time)) return 1
      }
      return 0
    })
    if (rows.length > 0) {
      stratsView.push(
        <Row key={t.stratid} className="mt-4">
          <Col>
            <Row>
              <Col>
                <h5>{t.stratname}</h5>
              </Col>
            </Row>
            <Row>
              <Col
                style={{ display: 'flex' }}
                className="justify-content-between"
              >
                <span
                  className={
                    tPNL > 0 ? 'text-success' : tPNL < 0 ? 'text-danger' : ''
                  }
                >
                  PnL: {Math.round(tPNL * 1000) / 1000}%
                </span>
                <span>
                  <small
                    className={
                      lPNL > 0 ? 'text-success' : lPNL < 0 ? 'text-danger' : ''
                    }
                  >
                    long: {Math.round(lPNL * 1000) / 1000}%
                  </small>
                  &nbsp;/&nbsp;
                  <small
                    className={
                      sPNL > 0 ? 'text-success' : sPNL < 0 ? 'text-danger' : ''
                    }
                  >
                    short: {Math.round(sPNL * 1000) / 1000}%
                  </small>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <TradeTable tradeRows={rows}></TradeTable>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    }
  })

  return (
    <>
      <Container fluid>
        <Filters
          openFilterCallback={setOpenFilter}
          setFilterCallback={setFilter}
        ></Filters>
        {stratsView}
      </Container>
      <DismissArea
        visible={openFilter}
        onDismissCallback={onDismiss}
      ></DismissArea>
      <StratFilter
        setAllowedStratsCallback={setAllowedStrats}
        allowedStrats={allowedStrats}
        tradeStrats={tradeStrats}
        opened={openFilter}
      ></StratFilter>
    </>
  )
}

export default Trading
