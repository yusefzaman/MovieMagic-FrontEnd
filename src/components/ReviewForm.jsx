import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ movieId, userId }) => {
  const [content, setContent] = useState(localStorage.getItem('content') || '');
  const [rating, setRating] = useState(localStorage.getItem('rating') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('content', content);
    localStorage.setItem('rating', rating);

    try {
      const response = await axios.post('http://localhost:5000/reviews', {
        content,
        rating,
        user_id: userId,
        movie_id: movieId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data); // Handle response as needed

      // Clear local storage after successful submission
      localStorage.removeItem('content');
      localStorage.removeItem('rating');
      setContent('');
      setRating('');
    } catch (error) {
      console.error('Error submitting review:', error.response?.data || error.message);
    }
  };

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
  );
};

export default ReviewForm;
