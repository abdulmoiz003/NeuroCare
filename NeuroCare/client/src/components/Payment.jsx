// Payment.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './styles/Payment.module.css'; // Create a CSS module for Payment styling

const Payment = () => {
  const location = useLocation();
  const { timing } = location.state;

  return (
    <div className={styles.container}>
      <h2>Payment Page</h2>
      <p>Date: {timing.date}</p>
      <p>Time: {timing.time}</p>
      <p>Fee: Rs. {timing.fee}</p>
      <p>Neurologist: {timing.name}</p>
      {/* Add your payment form or details here */}
    </div>
  );
};

export default Payment;
