import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Movie = () => {
    const [movies, setMovies] = useState([])

    useEffect (() => {
    getMovies()
    }, [])

   const getMovies = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/movies/movies`)
        console.log(response.data);
        setMovies(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const handleChange = (event) => {
      setForm({ ...form, [event.target.id]: event.target.value });
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    };
    
    return( 

    <div className="Movies">
        <h2>Movies List</h2>
        <section className="container-grid">
        {movies.map((movie) => (
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
export default Movie;
