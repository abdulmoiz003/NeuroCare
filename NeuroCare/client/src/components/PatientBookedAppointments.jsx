import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/PatientBookedAppointments.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PatientBookedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientEmail = localStorage.getItem('patientEmail');
        const response = await axios.get(
          `http://localhost:5000/patientappointments/${patientEmail}`
        );
        setAppointments(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('patientEmail');
      window.location.href = '/';
    }
  };

  const joinConsultation = (appointment) => {
    const value = appointment.neurologistEmail;
    navigate(`/room/${value}`);
  };

  const viewPrescription = (appointmentId) => {
    navigate(`/viewpres/${appointmentId}`);
  };

  const rateNeurologist = (appointment) => {
    navigate('/rateneurologist', {
      state: {
        neurologistName: appointment.neurologistName,
        neurologistEmail: appointment.neurologistEmail,
      },
    });
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
        <Link
          to="/patient/dashboard"
          className={`${styles.sidebarLink} ${getActiveClass('/patient/dashboard')}`}
        >
          Dashboard
        </Link>
        <Link
          to="/patient/book-appointment"
          className={`${styles.sidebarLink} ${getActiveClass('/patient/book-appointment')}`}
        >
          Book App
        </Link>
        <Link
          to="/patient/booked-appointments"
          className={`${styles.sidebarLink} ${getActiveClass('/patient/booked-appointments')}`}
        >
          Booked App
        </Link>
        <Link
          to="/patient/chat-with-neurologist"
          className={`${styles.sidebarLink} ${getActiveClass('/patient/chat-with-neurologist')}`}
        >
          Chat
        </Link>
        <Link
          to="/reports"
          className={`${styles.sidebarLink} ${getActiveClass('/reports')}`}
        >
          Reports
        </Link>
        <Link
          to="/ratings"
          className={`${styles.sidebarLink} ${getActiveClass('/ratings')}`}
        >
          Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img
            src="https://i.ibb.co/fQ7RJ3f/logout.png"
            alt="Logout"
            className={styles.logoutImage}
          />
          Logout
        </button>
      </div>

      {/* Appointments List */}
      <div className={styles.container}>
        <header>
          <h2>Appointments</h2>
        </header>
        {error && <p className={styles.error}>{error}</p>}
        {appointments.length > 0 ? (
          <ul className={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <li key={appointment._id} className={styles.listItem}>
                <p>
                  <strong>Appointment ID:</strong> {appointment._id}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Patient Name:</strong> {appointment.patientName}
                </p>
                <p>
                  <strong>Patient Email:</strong> {appointment.patientEmail}
                </p>
                <p>
                  <strong>Neurologist Name:</strong>{' '}
                  {appointment.neurologistName}
                </p>
                <p>
                  <strong>Neurologist Email:</strong>{' '}
                  {appointment.neurologistEmail}
                </p>
                <button
                  onClick={() => joinConsultation(appointment)}
                  className={styles.consultationButton}
                >
                  Join Virtual Consultation
                </button>
                <button
                  onClick={() => viewPrescription(appointment._id)}
                  className={styles.prescriptionButton}
                >
                  View E-Prescription
                </button>
                <button
                  onClick={() => rateNeurologist(appointment)}
                  className={styles.rateButton}
                >
                  Rate Neurologist
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientBookedAppointments;
