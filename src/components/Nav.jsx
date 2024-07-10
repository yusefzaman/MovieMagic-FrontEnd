import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'

const Nav = ({
  searchQuery,
  handleSearchChange,
  genres,
  selectedGenres,
  handleGenreChange,
  isLoggedIn,
  setIsLoggedIn
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [setIsLoggedIn])

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/')
  }

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
      </nav>
      <SearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreChange={handleGenreChange}
      />
    </header>
  )
}

export default Nav
