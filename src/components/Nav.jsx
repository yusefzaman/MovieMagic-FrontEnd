import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
    </header>
  )
}
export default Nav
