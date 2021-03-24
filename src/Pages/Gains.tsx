import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { MarketPrices, TradeStrat } from '../Types'

const Gains = ({
  tradeStrats,
  marketPrices,
}: {
  tradeStrats: TradeStrat[]
  marketPrices: MarketPrices
}) => {
  const dateFormat = Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const [day, setDay] = useState(Date.now())
  const formattedDay = dateFormat.format(day)

  let allowNextDay = true
  if (formattedDay === dateFormat.format(Date.now())) {
    allowNextDay = false
  }

  const prevDay = () => {
    setDay(day - 86400000)
  }
  const nextDay = () => {
    setDay(day + 86400000)
  }

  const stratsView: JSX.Element[] = []

  tradeStrats.forEach((t) => {
    let tPNL = 0
    let lPNL = 0
    let sPNL = 0
    let rows = t.rows.filter((r) => {
      let time = r.buy_time
      if (r.type === 'LONG') {
        time = r.sell_time
      }
      if (
        time &&
        r.stratname === t.stratname &&
        formattedDay === dateFormat.format(parseInt(time))
      ) {
        return true
      }
      return false
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
          </Col>
        </Row>
      )
    }
  })

  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <Button variant="link" onClick={() => prevDay()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Col>
        <Col className="text-center">{dateFormat.format(day)}</Col>
        <Col className="text-center">
          <Button
            variant="link"
            disabled={!allowNextDay}
            onClick={() => nextDay()}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>{stratsView}</Col>
      </Row>
    </Container>
  )
}

export default Gains
