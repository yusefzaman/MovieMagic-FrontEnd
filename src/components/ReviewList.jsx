import { useEffect, useState } from 'react'

const ReviewList = ({ movieId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/reviews/${movieId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        const result = await response.json()
        setReviews(result)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
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
