import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MarketPrices, UserDatas } from './Types'
import './App.css'
import { TradeTable } from './Components/TradeTable'
import TopBar from './Components/TopBar'

function App() {
  const [userDatas, setUserDatas] = useState<UserDatas>()
  const [marketPrices, setMarketPrices] = useState<MarketPrices>()
  const [theme, setTheme] = useState('light')

  const refreshData = useCallback(async () => {
    const data = await fetch(
      'https://bitcoinvsaltcoins.com/api/useropentradedsignals?key=60495594c34e57006886477a'
    )
    const parsedData = await data.json()
    const prices = await fetch('https://bitcoinvsaltcoins.com/api/prices')
    const parcedPrices = await prices.json()
    setUserDatas(parsedData)
    setMarketPrices(parcedPrices)
  }, [])

  useEffect(() => {
    refreshData()
    const theme = localStorage.getItem('theme')
    if (theme) {
      setTheme(theme)
    }
  }, [refreshData])

  useEffect(() => {
    const el = document.querySelector('#theme')
    if (el) {
      localStorage.setItem('theme', theme)
      ;(el as HTMLLinkElement).href = `bootstrap_${theme}.css`
    }
  }, [theme])

  const setDark = () => {
    setTheme('dark')
  }
  const setLight = () => {
    setTheme('light')
  }

  const strats: string[] = []
  const stratsView: JSX.Element[] = []
  if (userDatas && marketPrices) {
    userDatas.rows.forEach((r) => {
      if (strats.indexOf(r.stratname) === -1) {
        strats.push(r.stratname)
      }
    })

    strats.sort().forEach((s) => {
      const rows = userDatas.rows.filter((r) => r.stratname === s)
      stratsView.push(
        <React.Fragment key={s}>
          <Row>
            <Col>
              <h5>{s}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <TradeTable
                marketPrices={marketPrices}
                tradeRows={rows}
              ></TradeTable>
            </Col>
          </Row>
        </React.Fragment>
      )
    })
  }

  return (
    <>
      <TopBar
        theme={theme}
        setDarkCallback={setDark}
        setLightCallback={setLight}
      ></TopBar>
      <Container fluid>{stratsView}</Container>
    </>
  )
}

export default App
