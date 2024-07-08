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
}
