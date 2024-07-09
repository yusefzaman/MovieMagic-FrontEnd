import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Theatre from './pages/Theatre'
import ShowTime from './pages/ShowTime'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import ReviewForm from './components/ReviewForm'
import ReviewList from './components/ReviewList'
const App = () => {
  return (
    <div className="App">
      <div className="space"></div>
      <Nav></Nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/movies/:id/theatres" element={<Theatre />} />
          <Route path="/Seats" element={<ShowTime />} />
          <Route path="/signin" element={SignIn} />
          <Route path="/register" element={Register} />
          <ReviewForm
            movieId={movieId}
            userId={userId}
            onReviewSubmitted={handleReviewSubmitted}
          />
          <ReviewList movieId={movieId} />
        </Routes>
      </main>
    </div>
  )
}

export default App
