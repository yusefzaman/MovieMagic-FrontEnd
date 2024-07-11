import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Movie = ({ searchQuery, setGenres }) => {
  const [editMode, setEditMode] = useState(false)
  const [formButtonText, setFormButtonText] = useState('Add New Movie')
  const [editMovieId, setEditMovieId] = useState(null)
  const [movies, setMovies] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isUser, setIsUser] = useState(false) // Track if the user is logged in
  const [selectedGenres, setSelectedGenres] = useState([]) // State for selected genres

  useEffect(() => {
    checkUserStatus()
    checkAdminStatus()
    getMovies()
  }, [])

  useEffect(() => {
    filterMovies()
  }, [searchQuery, selectedGenres, movies]) // Include 'movies' in dependency array for filterMovies

  const checkUserStatus = () => {
    const userEmail = localStorage.getItem('userEmail')
    setIsUser(!!userEmail) // Set to true if userEmail exists (user is logged in)
  }

  const checkAdminStatus = () => {
    const userEmail = localStorage.getItem('userEmail')
    setIsAdmin(userEmail === 'admin_test@gmail.com')
  }

  const getMovies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/movies')
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

    // Filter movies based on selected genres
    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre
          .split(', ')
          .some((genre) => selectedGenres.includes(genre.toLowerCase()))
      )
    }

    return filteredMovies
  }

  const initialState = {
    name: '',
    genre: '',
    img: ''
  }

  const [form, setForm] = useState(initialState)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (editMode) {
        await axios.put(
          `http://localhost:5000/edit_movie/${editMovieId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      } else {
        // Validate form fields before submitting
        if (!form.name || !form.img || !form.genre) {
          console.error('Missing required fields')
          return
        }

        await axios.post('http://localhost:5000/add_movie', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
      setForm(initialState)
      setEditMode(false)
      setFormButtonText('Add New Movie')
      setEditMovieId(null)
      getMovies() // Refresh movie list after edit or add
    } catch (error) {
      console.error('Error creating/updating movie:', error)
    }
  }

  const handleEdit = (movieId) => {
    setEditMode(true)
    setFormButtonText('Edit Movie')
    setEditMovieId(movieId)
    const editMovie = movies.find((movie) => movie.id === movieId)
    if (editMovie) {
      setForm({
        name: editMovie.name,
        genre: editMovie.genre,
        img: editMovie.img
      })
    } else {
      console.error('Movie not found for editing')
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token') // Retrieve the token from localStorage
      await axios.delete(`http://localhost:5000/remove_movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the Authorization header
        }
      })
      getMovies()
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  const handleGenreChange = (genre) => {
    // Toggle genre selection
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  return (
    <div className="movies">
      <h2>Movies List</h2>
      {isUser && isAdmin && (
        <form className="MovieForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Movie Name:</label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            value={form.name}
          />
          <label htmlFor="genre">Genre:</label>
          <input
            id="genre"
            type="text"
            onChange={handleChange}
            value={form.genre}
          />
          <label htmlFor="img">Image URL:</label>
          <input
            id="img"
            type="text"
            onChange={handleChange}
            value={form.img}
          />
          <button type="submit">{formButtonText}</button>
        </form>
      )}

      <section className="container-grid">
        {filterMovies().map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`${encodeURIComponent(movie.name)}/theatres`}>
              <img src={movie.img} alt={movie.name} />
            </Link>
            <h3 className="movieName">{movie.name}</h3>
            <ul className="genres">
              {movie.genre.split(', ').map((genre) => (
                <li key={genre} className={genre.toLowerCase()}>
                  {genre}
                </li>
              ))}
              {isAdmin && (
                <>
                  <button onClick={() => handleEdit(movie.id)}>Edit</button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </>
              )}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Movie
