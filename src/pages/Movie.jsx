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

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Movies List</h2>
      <section className="container-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`${encodeURIComponent(movie.name)}/theatres`}>
              <img src={movie.img} alt={movie.name} />
            </Link>
            <h3 className="movieName"> {movie.name}</h3>
            <p className="genre"> {movie.genre}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
export default Movie
