import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MarketPrices, UserDatas } from './Types'
import './App.css'
import { TradeTable } from './Components/TradeTable'
import TopBar from './Components/TopBar'
import Filters from './Components/Filters'
import UserID from './Components/UserID'

function App() {
  const [userDatas, setUserDatas] = useState<UserDatas>()
  const [userID, setUserID] = useState<string>()
  const [marketPrices, setMarketPrices] = useState<MarketPrices>()
  const [filter, setFilter] = useState('all')
  const [theme, setTheme] = useState('dark')

  const refreshData = useCallback(async () => {
    if (userID !== undefined) {
      const data = await fetch(
        `https://bitcoinvsaltcoins.com/api/usertradedsignals?userid=${userID}`
      )
      const parsedData = await data.json()
      const prices = await fetch('https://bitcoinvsaltcoins.com/api/prices')
      const parcedPrices = await prices.json()
      setUserDatas(parsedData)
      setMarketPrices(parcedPrices)
    }
  }, [userID])

  useEffect(() => {
    const userid = localStorage.getItem('userID')
    if (userid) {
      setUserID(userid)
    }
    const theme = localStorage.getItem('theme')
    if (theme) {
      setTheme(theme)
    }
    const filter = localStorage.getItem('filter')
    if (filter) {
      setFilter(filter)
    }
  }, [])

  useEffect(() => {
    if (userID !== undefined) {
      localStorage.setItem('userID', userID)
    }
    refreshData()
  }, [userID, refreshData])

  useEffect(() => {
    const el = document.querySelector('#theme')
    if (el) {
      localStorage.setItem('theme', theme)
      ;(el as HTMLLinkElement).href = `${process.env.PUBLIC_URL}/bootstrap_${theme}.css`
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('filter', filter)
    refreshData()
  }, [filter, refreshData])

  const setDark = () => {
    setTheme('dark')
  }
  const setLight = () => {
    setTheme('light')
  }

  const strats: string[] = []
  const stratsView: JSX.Element[] = []
  if (userDatas) {
    userDatas.rows.forEach((r) => {
      if (strats.indexOf(r.stratname) === -1) {
        strats.push(r.stratname)
      }
    })

    strats.sort().forEach((s) => {
      let tPNL = 0
      let lPNL = 0
      let sPNL = 0
      let rows = userDatas.rows.filter((r) => r.stratname === s)
      rows = rows.filter((r) => {
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
          <Row key={s} className="mt-4">
            <Col>
              <Row>
                <Col>
                  <h5>{s}</h5>
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
                        lPNL > 0
                          ? 'text-success'
                          : lPNL < 0
                          ? 'text-danger'
                          : ''
                      }
                    >
                      long: {Math.round(lPNL * 1000) / 1000}%
                    </small>
                    &nbsp;/&nbsp;
                    <small
                      className={
                        sPNL > 0
                          ? 'text-success'
                          : sPNL < 0
                          ? 'text-danger'
                          : ''
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
  }

  return (
    <>
      <TopBar
        userID={userID}
        theme={theme}
        setDarkCallback={setDark}
        setLightCallback={setLight}
        refreshCallback={refreshData}
        setUserIDCallback={setUserID}
      ></TopBar>
      <Container fluid>
        {userID !== undefined && (
          <Filters setFilterCallback={setFilter}></Filters>
        )}
        {userID === undefined && (
          <Row className="mt-5">
            <Col xs={{ span: 6, offset: 3 }}>
              <UserID setUserIDCallback={setUserID}></UserID>
            </Col>
          </Row>
        )}
        {userID !== undefined && stratsView}
      </Container>
    </>
  )
}

export default App
