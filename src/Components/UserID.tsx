import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const UserID = ({ setUserIDCallback }: { setUserIDCallback: Function }) => {
  const [userid, setUserid] = useState('')

  const submit = () => {
    if (userid !== undefined && userid !== '') {
      setUserIDCallback(userid)
    }
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Your user ID</Form.Label>
        <Form.Control
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUserid(e.target.value)
          }}
        />
        <Form.Text className="text-muted">
          (Currently only work with user ID. Not BVA key.)
        </Form.Text>
        <Button className="mt-3" onClick={() => submit()}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default UserID
