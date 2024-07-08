import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Theatre = () => {
  const [theatre, settheatre] = useState([])

  useEffect(() => {
    gettheatre()
  }, [])

  const gettheatre = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/theatres`)
      console.log(response.data)
      settheatre(response.data)
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
    <div className="theatre">
      <h2>theatre List</h2>
      <section className="container-grid">
        {theatre.map((movie) => (
          <div key={movie._id} className="movie-card">
            <img src={movie.img} alt={movie.name} />
            <h3>Name: {movie.name}</h3>
            <p>Location: {movie.location}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
export default Theatre
