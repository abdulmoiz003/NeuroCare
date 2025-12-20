import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles/ViewPres.module.css';
import { Link, useLocation } from 'react-router-dom';

function ViewPres() {
  const { appointmentId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('patientEmail');
      window.location.href = '/'; // Alternatively, use a Link to manage redirection
    }
  };

  useEffect(() => {
    const fetchEPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getpres/${appointmentId}`);
        setPrescriptions(response.data);
      } catch (err) {
        setError('Failed to fetch E-Prescriptions. Please try again later.');
      }
    };

    fetchEPrescriptions();
  }, [appointmentId]);

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
        <Link to="/patient/e-prescription" className={`${styles.sidebarLink} ${getActiveClass('/patient/e-prescription')}`}>
          E-Pres
        </Link>
        <Link to="/patientt/ratings" className={`${styles.sidebarLink} ${getActiveClass('/patientt/ratings')}`}>
          Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img src="https://i.ibb.co/fQ7RJ3f/logout.png" alt="Logout" className={styles.logoutImage} />
          Logout
        </button>
      </div>

    <div className={styles.container}>
      <h2 className={styles.heading}>E-Prescription</h2>
      {error && <div className={styles.error}>{error}</div>}
      {prescriptions.length === 0 ? (
        <p>No E-Prescriptions found for this appointment.</p>
      ) : (
        prescriptions.map((prescription) => (
          <div key={prescription._id} className={styles.prescriptionCard}>
            <h3>Patient Name: {prescription.patientName}</h3>
            <p><strong>Appointment Id:</strong> {prescription.appointmentId}</p>
            <p><strong>Disease:</strong> {prescription.disease}</p>
            <p><strong>Prescribed Medications:</strong></p>
            <ul>
              {prescription.medications.map((medication, index) => (
                <li key={index}>
                  {medication.name} - {medication.dosage} at - {medication.time}
                </li>
              ))}
            </ul>
            <p><strong>Health Improvement Status:</strong> {prescription.status}</p>
            <p><strong>Instructions:</strong> {prescription.instructions || 'None'}</p>
            <p><strong>Neurologist Name:</strong> Dr. {prescription.neurologistName}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default ViewPres;
