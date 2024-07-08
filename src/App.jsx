import './App.css'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Theatre from './pages/Theatre'
import ShowTime from './pages/ShowTime'
import Register from './pages/Register'
import Login from './pages/Login'
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
          <Route path="/theatres" element={<Theatre />} />
          <Route path="/Seats" element={<ShowTime />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
