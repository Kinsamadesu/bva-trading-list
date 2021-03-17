import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const UserID = ({ setUserIDCallback }: { setUserIDCallback: Function }) => {
  const [userid, setUserid] = useState('')

  return (
    <Form>
      <Form.Group>
        <Form.Label>Your user ID</Form.Label>
        <Form.Control
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserid(e.target.value)
          }}
        />
        <Form.Text className="text-muted">
          (Currently only work with user ID. Not BVA key.)
        </Form.Text>
        <Button className="mt-3" onClick={() => setUserIDCallback(userid)}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default UserID
