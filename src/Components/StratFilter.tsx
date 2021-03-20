import React, { ChangeEvent } from 'react'
import { Col, Row, ListGroup, Form } from 'react-bootstrap'
import { AllowedStrat } from '../Types'

const StratFilter = ({
  strats,
  opened,
  allowedStrats,
  setAllowedStratsCallback,
}: {
  strats: string[]
  opened: boolean
  allowedStrats: AllowedStrat[]
  setAllowedStratsCallback: Function
}) => {
  const stratsView = strats.map((s) => {
    let checked = false
    const strat = allowedStrats.find((strat) => strat.strat === s)
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
        allowedStrats.push({ strat: s, allowed: e.currentTarget.checked })
      }
      setAllowedStratsCallback(allowedStrats.slice())
    }

    return (
      <ListGroup.Item key={s}>
        <Form.Group controlId={`form_${s}`}>
          <Form.Check
            checked={checked}
            type="checkbox"
            label={`${s}`}
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
