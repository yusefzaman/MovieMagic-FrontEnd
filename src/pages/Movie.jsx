import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Movie = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/movies`)
      console.log(response.data)
      setMovies(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="movies-container">
      <h2>Movies List</h2>
      <section className="container-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/theatres`}>
              <img src={movie.img} alt={movie.name} className="movie-image" />
            </Link>
            <div className="movie-details">
              <h3>{movie.name}</h3>
              <p>Genre: {movie.genre}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Movie