import React, { useState } from 'react'

const ReviewForm = ({ movieId, userId, onReviewSubmitted }) => {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        content,
        rating,
        movie_id: movieId,
        user_id: userId
      })
    })
    const result = await response.json()
    if (result.message === 'Review created successfully') {
      onReviewSubmitted(result)
      setContent('')
      setRating('')
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
