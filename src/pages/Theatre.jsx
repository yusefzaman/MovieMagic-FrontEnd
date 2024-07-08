import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Theatre = () => {
  const [theatres, setTheatres] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getTheatres()
  }, [id])

  const getTheatres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/theatres`)
      console.log(response.data)
      setTheatres(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="Theatres">
      <h2>Movies Details</h2>

      <section className="showTime-grid">
        {theatres.map((theatre) => (
          <div key={theatre.id} className="movie-card">
            <h3>Name: {theatre.name}</h3>
            <p>genre: {theatre.location}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
export default Theatre
