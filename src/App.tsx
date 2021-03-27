import { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MarketPrices, TradeStrat, UserDatas } from './Types'
import './App.css'
import TopBar from './Components/TopBar'
import UserID from './Components/UserID'
import Trading from './Pages/Trading'
import SideMenu from './Components/SideMenu'
import Gains from './Pages/Gains'

function App() {
  const [userDatas, setUserDatas] = useState<UserDatas>()
  const [tradeStrats, setTradeStrats] = useState<TradeStrat[]>()
  const [userID, setUserID] = useState<string>()
  const [marketPrices, setMarketPrices] = useState<MarketPrices>()
  const [theme, setTheme] = useState('dark')
  const [view, setView] = useState('trading')
  const [sideMenuOpened, setSideMenuOpened] = useState(false)

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
    setSideMenuOpened(false)
  }, [view])

  useEffect(() => {
    if (userDatas) {
      const tradeStrats: TradeStrat[] = []
      userDatas.rows.forEach((r) => {
        let currentStrat: TradeStrat | undefined = tradeStrats.find(
          (s) => r.stratid === s.stratid
        )
        if (!currentStrat) {
          currentStrat = {
            stratid: r.stratid,
            stratname: r.stratname,
            rows: [],
          }
          tradeStrats.push(currentStrat)
        }
        currentStrat.rows.push(r)
      })

      tradeStrats.sort((a, b) => {
        if (parseFloat(a.stratid) < parseFloat(b.stratid)) return -1
        if (parseFloat(a.stratid) > parseFloat(b.stratid)) return 1
        return 0
      })

      setTradeStrats(tradeStrats)
    }
  }, [userDatas])

  const setDark = () => {
    setTheme('dark')
  }
  const setLight = () => {
    setTheme('light')
  }

  return (
    <>
      <TopBar
        openSideMenuCallback={setSideMenuOpened}
        refreshCallback={refreshData}
      ></TopBar>
      <SideMenu
        sideMenuOpened={sideMenuOpened}
        theme={theme}
        openSideMenuCallback={setSideMenuOpened}
        setDarkCallback={setDark}
        setLightCallback={setLight}
        setUserIDCallback={setUserID}
        setViewCallback={setView}
      ></SideMenu>
      {userID === undefined && (
        <Container fluid>
          <Row className="mt-5">
            <Col xs={{ span: 6, offset: 3 }}>
              <UserID setUserIDCallback={setUserID}></UserID>
            </Col>
          </Row>
        </Container>
      )}
      {userID && tradeStrats && marketPrices && view === 'trading' && (
        <Trading
          tradeStrats={tradeStrats}
          marketPrices={marketPrices}
        ></Trading>
      )}
      {userID && tradeStrats && marketPrices && view === 'gains' && (
        <Gains tradeStrats={tradeStrats} marketPrices={marketPrices}></Gains>
      )}
    </>
  )
}

export default App
