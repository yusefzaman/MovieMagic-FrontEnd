import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Movie = ({ searchQuery, selectedGenres, setGenres }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    filterMovies()
  }, [searchQuery, selectedGenres])

  const getMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/movies')
      console.log(response.data)
      setMovies(response.data)

      const uniqueGenres = [
        ...new Set(response.data.flatMap((movie) => movie.genre.split(', ')))
      ]
      setGenres(uniqueGenres)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const filterMovies = () => {
    let filteredMovies = movies

    if (searchQuery) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre
          .split(', ')
          .some((genre) => selectedGenres.includes(genre.toLowerCase()))
      )
    }

    return filteredMovies
  }

  return (
    <div>
      <h2>Movies List</h2>
      <section className="container-grid">
        {filterMovies().map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`${encodeURIComponent(movie.name)}/theatres`}>
              <img src={movie.img} alt={movie.name} />
            </Link>
            <h3>{movie.name}</h3>
            <ul className="genres">
              {movie.genre.split(', ').map((genre) => (
                <li key={genre} className={genre.toLowerCase()}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Movie
