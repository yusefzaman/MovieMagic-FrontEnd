import React, { useEffect, useState } from 'react'

const ReviewList = ({ movieId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/reviews/${movieId}`)
      const result = await response.json()
      setReviews(result)
    }
    fetchReviews()
  }, [movieId])
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.content}</p>
            <p>Posted by: {review.user ? review.user.name : 'Anonymous'}</p>
            <p>On: {new Date(review.created_at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}
export default ReviewList
