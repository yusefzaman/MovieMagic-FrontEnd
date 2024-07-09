import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-logo">
            MovieMagic
          </NavLink>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className="nav-link" activeClassName="active-link">
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="nav-link"
            activeClassName="active-link"
          >
            About
          </NavLink>
          <NavLink
            to="/movies"
            className="nav-link"
            activeClassName="active-link"
          >
            Movies
          </NavLink>
        </div>
        <div className="navbar-auth">
          <NavLink
            to="/register"
            className="nav-link"
            activeClassName="active-link"
          >
            Register
          </NavLink>
          <NavLink
            to="/signin"
            className="nav-link"
            activeClassName="active-link"
          >
            Sign In
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
export default Nav
