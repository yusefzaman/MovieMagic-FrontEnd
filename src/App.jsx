import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Theatre from './pages/Theatre'
import ShowTime from './pages/ShowTime'
import Register from './pages/Register'
import Login from './pages/Login'
import ReviewForm from './components/ReviewForm'
import ReviewList from './components/ReviewList'
import SignOut from './components/SignOut'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleGenreChange = (event) => {
    const genre = event.target.value
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    )
  }
  const navigateToReview = () => {
    // Implement navigation logic here
    console.log('Navigate to ReviewForm')
    // Example of programmatically changing the URL
    // history.push(`/movies/${movieName}/theatres/${id}/Review`);
  }

  return (
    <div className="App">
      <div className="space"></div>
      <Nav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreChange={handleGenreChange}
        user={user}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/movies"
            element={
              <Movie
                searchQuery={searchQuery}
                selectedGenres={selectedGenres}
                setGenres={setGenres}
                user={user}
              />
            }
          />
          <Route path="movies/:movieName/theatres" element={<Theatre />} />
          <Route
            path="/movies/:movieName/theatres/:id/Seats"
            element={<ShowTime navigateToReview={navigateToReview} />}
          />
          <Route
            path="/movies/:movieName/theatres/:id/Review"
            element={<ReviewForm />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />

          <Route
            path="/signout"
            element={<SignOut setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
