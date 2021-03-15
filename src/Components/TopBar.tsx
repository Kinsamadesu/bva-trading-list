import { Form, Navbar } from 'react-bootstrap'

const TopBar = ({
  theme,
  setDarkCallback,
  setLightCallback,
}: {
  theme: string
  setDarkCallback: Function
  setLightCallback: Function
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
      className="justify-content-between"
    >
      <Navbar.Brand>BVA Trading list</Navbar.Brand>
      <Form inline>
        <div className="toggle transparent">
          <input
            id="transparent"
            type="checkbox"
            checked={theme === 'dark'}
            onChange={() => toggleTheme()}
          />
          <label className="toggle-item" htmlFor="transparent"></label>
        </div>
      </Form>
    </Navbar>
  )
}

export default TopBar
