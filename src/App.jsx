import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Theatre from './pages/Theatre'
import ShowTime from './pages/ShowTime'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Login from './pages/Login'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genres, setGenres] = useState([])

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

  return (
    <div className="App">
      <div className="space"></div>
      <Nav
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreChange={handleGenreChange}
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
              />
            }
          />
          <Route path="movies/:movieName/theatres" element={<Theatre />} />
          <Route path="movies/:movieName/theatres/:id/Seats" element={<ShowTime />} />          
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signin" element={SignIn} />
          <Route path="/register" element={Register} />
          {/* <ReviewForm
            // movieId={movieId}
            // userId={userId}
            // onReviewSubmitted={handleReviewSubmitted}
          />
          <ReviewList movieId={movieId} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
