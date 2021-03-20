import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const Filters = ({
  setFilterCallback,
  openFilterCallback,
}: {
  setFilterCallback: Function
  openFilterCallback: Function
}) => {
  return (
    <Row>
      <Col>
        <Button onClick={() => setFilterCallback('all')}>All</Button>
        <Button onClick={() => setFilterCallback('closed')} className="ml-2">
          Closed
        </Button>
        <Button onClick={() => setFilterCallback('opened')} className="ml-2">
          Opened
        </Button>
        <Button onClick={() => openFilterCallback(true)} className="ml-2">
          Filter
        </Button>
      </Col>
    </Row>
  )
}

export default Filters
