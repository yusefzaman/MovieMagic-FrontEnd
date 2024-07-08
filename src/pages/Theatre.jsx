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

      <section className="container-container">
        <div key={theatres._id} className="Detailcard">
          <img src={theatres.img} alt={theatres.title} />
          <h3>{theatres.title}</h3>
          <p>{theatres.time}</p>
        </div>
      </section>
    </div>
  )
}
export default Theatre
