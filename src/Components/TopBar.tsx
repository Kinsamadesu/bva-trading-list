import { faMoon, faSun, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, Navbar } from 'react-bootstrap'

const TopBar = ({
  theme,
  setDarkCallback,
  setLightCallback,
  refreshCallback,
}: {
  theme: string
  setDarkCallback: Function
  setLightCallback: Function
  refreshCallback: Function
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
      <Navbar.Brand>BVA Trading list</Navbar.Brand>
      <Form inline>
        <a href="#" onClick={() => refreshCallback()}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </a>
        <a href="#" onClick={() => toggleTheme()}>
          {theme === 'dark' && <FontAwesomeIcon icon={faSun} />}
          {theme === 'light' && <FontAwesomeIcon icon={faMoon} />}
        </a>
      </Form>
    </Navbar>
  )
}

export default TopBar
