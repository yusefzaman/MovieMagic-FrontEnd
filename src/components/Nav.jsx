import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'

const Nav = ({
  searchQuery,
  handleSearchChange,
  genres,
  selectedGenres,
  handleGenreChange
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    // Check if token exists in localStorage and update isLoggedIn state
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false) // Update isLoggedIn state immediately
    navigate('/') // Navigate to home page after signing out
  }

  // Determine if SearchBar should be rendered based on the current route
  const showSearchBar = location.pathname === '/movies'

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-logo">
            MovieMagic
          </NavLink>
        </div>
        <div className="navbar-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/movies" className="nav-link">
            Movies
          </NavLink>
        </div>
        <div className="navbar-auth">
          {isLoggedIn ? (
            <button onClick={handleSignOut} className="nav-link">
              Sign Out
            </button>
          ) : (
            <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
              <NavLink to="/signin" className="nav-link">
                Sign In
              </NavLink>
            </>
          )}
        </div>
        {/* Conditionally render SearchBar only on the '/movies' page */}
        {showSearchBar && (
          <SearchBar
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            genres={genres}
            selectedGenres={selectedGenres}
            handleGenreChange={handleGenreChange}
          />
        )}
      </nav>
    </header>
  )
}

export default Nav
