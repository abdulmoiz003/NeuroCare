import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles/BookAppointment.module.css';
import { Link, useLocation } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilityTimings, setAvailabilityTimings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const patientEmail = localStorage.getItem("patientEmail")
  const [patient, setPatient] = useState({});

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const fetchAvailabilityTimings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/availability/${selectedDate}`);
      setAvailabilityTimings(response.data);
      setError('');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error fetching availability timings');
      setAvailabilityTimings([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAvailabilityTimings();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/${patientEmail}`)
      .then((response) => setPatient(response.data))
      .catch((error) => alert('An error occurred. Please try again later.'));
  }, []);
  const patientName = patient.name;

  const handleBookAppointment = async (timing) => {
    // PAYMENT INTEGRATION

    
    try {
      const stripe = await loadStripe("pk_test_51PsioQRt6rKMjsYLYUV6drAQuyuEBwRMpwTu53XjQmsa97dY2dlx19sBiXE63wutTlY2G72sgU7fhQ3HfyJ54Kik00WN0XXgcH")
      const body = {
       
          patientName,
          patientEmail,
          fee: timing.fee,
          neurologistName: timing.name,
          neurologistEmail: timing.email,
          date: timing.date,
          time: timing.time,
          timingId: timing._id,
        
      }
      const headers = {
        "Content-Type": "application/json",
      }
      const res = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }

      const session = await res.json()
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        console.error("Payment error", result.error.message)
      }
    } catch (error) {
      console.error("Fetch error:", error)
    }

    // try {
    //   await axios.post('http://localhost:5000/book-appointment', {
    //     patientName,
    //     patientEmail,
    //     neurologistName: timing.name,
    //     neurologistEmail: timing.email,
    //     date: timing.date,
    //     time: timing.time,
    //     timingId: timing._id,
    //   });
    //   alert('Appointment booked successfully!');
    //   fetchAvailabilityTimings();
    // } catch (error) {
    //   console.error('Error booking appointment:', error);
    //   alert('Failed to book appointment. Please try again.');
    // }
  };

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('patientEmail');
      window.location.href = '/'; // Alternatively, use a Link to manage redirection
    }
  };

  return (
    <div className="main">
      {/* Left Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.neurocareLogoContainer}>
          <img
            src="https://i.ibb.co/g3c6P1s/neurocare-logo.png"
            alt="NeuroCare Logo"
            className={styles.neurocareLogoImage}
          />
        </div>
        <Link to="/patient/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/patient/dashboard')}`}>
          Dashboard
        </Link>
        <Link to="/patient/book-appointment" className={`${styles.sidebarLink} ${getActiveClass('/patient/book-appointment')}`}>
          Book App
        </Link>
        <Link to="/patient/booked-appointments" className={`${styles.sidebarLink} ${getActiveClass('/patient/booked-appointments')}`}>
          Booked App
        </Link>
        <Link to="/patient/chat-with-neurologist" className={`${styles.sidebarLink} ${getActiveClass('/patient/chat-with-neurologist')}`}>
          Chat
        </Link>
        <Link to="/reports" className={`${styles.sidebarLink} ${getActiveClass('/reports')}`}>
          Reports
        </Link>
        <Link to="/ratings" className={`${styles.sidebarLink} ${getActiveClass('/ratings')}`}>
          Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img src="https://i.ibb.co/fQ7RJ3f/logout.png" alt="Logout" className={styles.logoutImage} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <header>
          <h2>Book Appointment</h2>
          <div className={styles.introSection}>
            <h3>
              Never compromise when it comes to your well-being.    
              Book appointment for the best Neurologist here.

            </h3>
            
            
            <img
              src="https://i.ibb.co/wRGR8ZY/appointment2.jpg"
              alt="Doctor Illustration"
              className={styles.doctorImage}
            />
            
          </div>
        </header>

        <form onSubmit={handleSubmit}>
          <label className={styles.dateLabel}>
            Select Date: {" "}
            <input type="date" value={selectedDate} onChange={handleDateChange} required />
          </label>
          <button type="submit" className={styles.bookingButton}   >Check Availability</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}

        {availabilityTimings.length > 0 && (
          <div>
            <h3>Available Timings</h3>
            <ul>
              {availabilityTimings.map((timing) => (
                <li key={timing._id} className={styles.listItem}>
                   <p>Neurologist: {timing.name}</p>
                  <p>Date: {formatDate(timing.date)} </p>
                  <p>Time: {timing.time}</p>
                  <p>Fee: Rs. {timing.fee}</p>
                 
                  <button className={`${styles.bookButton} ${styles.button}`} onClick={() => handleBookAppointment(timing)}>
                    Book 
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
