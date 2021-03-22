import { faBars, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form, Navbar } from 'react-bootstrap'

const TopBar = ({
  refreshCallback,
  openSideMenuCallback,
}: {
  refreshCallback: Function
  openSideMenuCallback: Function
}) => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      className="topbar justify-content-between"
    >
      <Navbar.Brand>BVA Trading list</Navbar.Brand>
      <Form inline>
        <Button variant="link" onClick={() => refreshCallback()}>
          <FontAwesomeIcon icon={faSyncAlt} />
        </Button>
        <Button variant="link" onClick={() => openSideMenuCallback(true)}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Form>
    </Navbar>
  )
}

export default TopBar
