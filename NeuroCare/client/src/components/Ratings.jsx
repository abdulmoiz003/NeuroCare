import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/RateNeurologist.module.css';

const Ratings = () => {
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const submitRating = async () => {
    if (!rating || rating < 1 || rating > 5) {
      setError('Please provide a valid rating between 1 and 5.');
      setSuccess('');
      return;
    }
    if (!review.trim()) {
      setError('Please provide a review.');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/rating', {
        rating,
        review,
      });

      if (response.status === 201) {
        setSuccess('Thank you for your feedback!');
        setError('');
        setRating(0);
        setReview('');
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (err) {
      setError('Failed to submit your feedback. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Rate NeuroCare</h2>
        <div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <div className={styles.ratingContainer}>
            <p>Rate out of 5:</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={rating >= star ? styles.filledStar : styles.emptyStar}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <textarea
            className={styles.reviewInput}
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
          />
          <button className={styles.submitButton} onClick={submitRating}>
            Submit
          </button>
        </div>
    </div>
  );
};

export default Ratings;
