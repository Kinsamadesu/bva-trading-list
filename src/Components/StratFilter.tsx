import React, { ChangeEvent } from 'react'
import { Col, Row, ListGroup, Form } from 'react-bootstrap'
import { AllowedStrat, TradeStrat } from '../Types'

const StratFilter = ({
  tradeStrats,
  opened,
  allowedStrats,
  setAllowedStratsCallback,
}: {
  tradeStrats: TradeStrat[]
  opened: boolean
  allowedStrats: AllowedStrat[]
  setAllowedStratsCallback: Function
}) => {
  const stratsView = tradeStrats.map((t) => {
    let checked = false
    const strat = allowedStrats.find((strat) => strat.strat === t.stratname)
    if (strat) {
      if (strat.allowed) {
        checked = true
      }
    } else {
      checked = true
    }

    const updateStrat = (e: ChangeEvent<HTMLInputElement>) => {
      if (strat) {
        strat.allowed = e.currentTarget.checked
      } else {
        allowedStrats.push({
          strat: t.stratname,
          allowed: e.currentTarget.checked,
        })
      }
      setAllowedStratsCallback(allowedStrats.slice())
    }

    return (
      <ListGroup.Item key={t.stratid}>
        <Form.Group controlId={`form_${t.stratid}`}>
          <Form.Check
            checked={checked}
            type="checkbox"
            label={`${t.stratname}`}
            onChange={(e) => updateStrat(e)}
          />
        </Form.Group>
      </ListGroup.Item>
    )
  })

  return (
    <Row
      id="stratFilter"
      style={{
        bottom: opened ? 0 : '',
        top: opened ? 'unset' : '',
      }}
    >
      <Col>
        <ListGroup variant="flush">{stratsView}</ListGroup>
      </Col>
    </Row>
  )
}

export default StratFilter
