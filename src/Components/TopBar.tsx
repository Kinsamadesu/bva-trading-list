import {
  faCog,
  faMoon,
  faSun,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, Navbar } from 'react-bootstrap'

const TopBar = ({
  theme,
  userID,
  setDarkCallback,
  setLightCallback,
  refreshCallback,
  setUserIDCallback,
}: {
  theme: string
  userID?: string
  setDarkCallback: Function
  setLightCallback: Function
  refreshCallback: Function
  setUserIDCallback: Function
}) => {
  const toggleTheme = () => {
    if (theme === 'dark') {
      setLightCallback()
    } else {
      setDarkCallback()
    }
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      className="topbar justify-content-between"
    >
      <Navbar.Brand>
        BVA Trading list
        <small className="ml-2 text-muted">
          {userID !== undefined ? ` (${userID})` : ''}
        </small>
      </Navbar.Brand>
      <Form inline>
        <a href="#" onClick={() => refreshCallback()}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </a>
        <a href="#" onClick={() => toggleTheme()}>
          {theme === 'dark' && <FontAwesomeIcon icon={faSun} />}
          {theme === 'light' && <FontAwesomeIcon icon={faMoon} />}
        </a>
        <a href="#" onClick={() => setUserIDCallback(undefined)}>
          <FontAwesomeIcon icon={faCog} />
        </a>
      </Form>
    </Navbar>
  )
}

export default TopBar
