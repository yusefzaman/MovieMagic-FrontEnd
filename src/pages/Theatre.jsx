import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Theatre = () => {
  const [ theatres, setTheatres] = useState([])
  const { movieName } = useParams();

  useEffect(() => {
    getTheatres()
  }, [movieName])


  const gettheatre = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/fetch_theatres`,{movieName: movieName})
      setTheatres(response.data.data)
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
    <div className="Theatres">
      <h2>Movies Details</h2>

      <section className="showTime-grid">
        {(theatres || []).map((theatre) => (
          <div key={theatre._id} className="theatre-card">
            <h3>Theatre Name: {theatre.name}</h3>
            <p>Location: {theatre.location}</p>
            <ul>
              {theatre.time.map((time, index) => (
                <Link to ={"Seats"}><li key={index}>{time}</li></Link>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  )
}
export default Theatre
