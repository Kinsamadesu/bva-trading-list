import {
  faSun,
  faMoon,
  faCog,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, ListGroup, Navbar } from 'react-bootstrap'

const SideMenu = ({
  sideMenuOpened,
  theme,
  setLightCallback,
  setDarkCallback,
  setUserIDCallback,
  setViewCallback,
  openSideMenuCallback,
}: {
  sideMenuOpened: boolean
  theme: string
  setLightCallback: Function
  setDarkCallback: Function
  setUserIDCallback: Function
  setViewCallback: Function
  openSideMenuCallback: Function
}) => {
  const toggleTheme = () => {
    if (theme === 'dark') {
      setLightCallback()
    } else {
      setDarkCallback()
    }
  }

  return (
    <div
      id="sidebar"
      className="bg-secondary"
      style={{ right: sideMenuOpened ? 0 : '-100vw' }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        className=" topbar justify-content-between"
      >
        <Navbar.Brand></Navbar.Brand>
        <Form inline>
          <Button variant="link" onClick={() => toggleTheme()}>
            {theme === 'dark' && <FontAwesomeIcon icon={faSun} />}
            {theme === 'light' && <FontAwesomeIcon icon={faMoon} />}
          </Button>
          <Button variant="link" onClick={() => setUserIDCallback(undefined)}>
            <FontAwesomeIcon icon={faCog} />
          </Button>
          <Button variant="link" onClick={() => openSideMenuCallback(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Form>
      </Navbar>
      <ListGroup variant="flush">
        <ListGroup.Item onClick={() => setViewCallback('trading')}>
          Trading list
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setViewCallback('gains')}>
          Gains
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default SideMenu
