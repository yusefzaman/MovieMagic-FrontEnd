import React, { useState } from 'react'
import axios from 'axios'
const ReviewForm = ({ movieId, userId }) => {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    localStorage.setItem('content', content)
    localStorage.setItem('rating', rating)

    try {
      const response = await axios(' http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content,
          rating,
          user_id: userId,
          movie_id: movieId
        })
      })
      const result = await response.json()
      console.log(result) // Handle response as needed
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit Review</button>
    </form>
  )
}

export default ReviewForm
