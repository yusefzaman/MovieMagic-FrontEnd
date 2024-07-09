import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/About">About</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </header>
  )
}
export default Nav
