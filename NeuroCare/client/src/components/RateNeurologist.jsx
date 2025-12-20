import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/RateNeurologist.module.css';

const RateNeurologist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get neurologist details from state
  const { neurologistName, neurologistEmail } = location.state || {};
  
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
      const response = await axios.post('http://localhost:5000/neurologistrating', {
        neurologistName,
        neurologistEmail,
        rating,
        review,
      });

      if (response.status === 201) {
        setSuccess('Thank you for your feedback!');
        setError('');
        setRating(0);
        setReview('');
        setTimeout(() => navigate('/patient/booked-appointments'), 2000);
      }
    } catch (err) {
      setError('Failed to submit your feedback. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Rate Neurologist</h2>
      {neurologistName && neurologistEmail ? (
        <>
          <p>
            You are rating <strong>Dr. {neurologistName}</strong> (
            {neurologistEmail})
          </p>
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
        </>
      ) : (
        <p className={styles.error}>No neurologist selected for rating.</p>
      )}
    </div>
  );
};

export default RateNeurologist;
