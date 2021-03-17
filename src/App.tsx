import React, { useCallback, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { UserDatas } from './Types'
import './App.css'
import { TradeTable } from './Components/TradeTable'
import TopBar from './Components/TopBar'
import Filters from './Components/Filters'

function App() {
  const [userDatas, setUserDatas] = useState<UserDatas>()
  const [filter, setFilter] = useState('all')
  const [theme, setTheme] = useState('dark')

  const refreshData = useCallback(async () => {
    const data = await fetch(
      'https://bitcoinvsaltcoins.com/api/usertradedsignals?userid=1607'
    )
    const parsedData = await data.json()
    setUserDatas(parsedData)
  }, [])

  useEffect(() => {
    refreshData()
    const theme = localStorage.getItem('theme')
    if (theme) {
      setTheme(theme)
    }

    const filter = localStorage.getItem('filter')
    if (filter) {
      setFilter(filter)
    }
  }, [refreshData])

  useEffect(() => {
    const el = document.querySelector('#theme')
    if (el) {
      localStorage.setItem('theme', theme)
      ;(el as HTMLLinkElement).href = `bootstrap_${theme}.css`
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('filter', filter)
  }, [filter])

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
      let rows = userDatas.rows.filter((r) => r.stratname === s)
      rows = rows.filter((r) => {
        if (filter === 'opened') {
          if (r.buy_price === null || r.sell_price === null) {
            return true
          }
          return false
        }
        return true
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
        theme={theme}
        setDarkCallback={setDark}
        setLightCallback={setLight}
      ></TopBar>
      <Container fluid>
        <Filters setFilterCallback={setFilter}></Filters>
        {stratsView}
      </Container>
    </>
  )
}

export default App
