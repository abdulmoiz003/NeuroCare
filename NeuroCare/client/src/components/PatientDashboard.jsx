import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import CustomCalendar from './CustomCalendar';
import styles from './styles/NeurologistDashboard.module.css';

const PatientDashboard = () => {
  const email = localStorage.getItem("patientEmail");
  const [name, setName] = useState('');
  const [error, setError] = useState("");

  const location = useLocation(); // Get the current location

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/${email}`)
      .then((response) => setName(response.data.name))
      .catch(() => setError("An error occurred. Please try again later."));
  }, [email]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("patientEmail");
      window.location.href = '/';
    }
  };

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  return (
    <div className={styles.dashboardContainer}>
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
        <Link to="/about" className={`${styles.sidebarLink} ${getActiveClass('/about')}`}>
          About
        </Link>
        <Link to="/help" className={`${styles.sidebarLink} ${getActiveClass('/help')}`}>
          Help
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

      {/* Main content section */}
      <div className={styles.mainContent}>
        {/* Top section with welcome message */}
        <div className={styles.topSection}>
          <h1 className={styles.welcomeMessage}>Welcome, {name}</h1>
          <div className={styles.profileContainer}>
            <Link to="/patient/profile" className={styles.profileLink}>
              <img
                src="https://i.ibb.co/1LXVBK7/profile.png"
                alt="Profile"
                className={styles.profileImage}
              />
            </Link>
          </div>
        </div>

        {/* Main dashboard menu */}
        <div className={styles.mainSection}>
          <div className={styles.menuContainer}>
            <Link to="/patient/book-appointment" className={styles.largeButton}>
              <img
                src="https://i.ibb.co/yNdw2Rj/appointment3.jpg"
                alt="Appointments"
                className={styles.buttonImage}
              />
              <span className={styles.buttonText}>Book Appointment</span>
            </Link>
            <div className={styles.gridContainer}>
              <Link to="/patient/booked-appointments" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/XDvzxGt/availability3.png"
                  alt="Availability Timings"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Booked Appointments</span>
              </Link>
              <Link to="/patient/chat-with-neurologist" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/PGQDNQy/chat2.jpg"
                  alt="Chats"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Chat With Neurologist</span>
              </Link>
              <Link to="/reports" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/ysQ29ns/reports1.jpg"
                  alt="Shared Medical Reports"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Medical Reports</span>
              </Link>
              <Link to="/ratings" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/R9q9Hwc/ratings3.png"
                  alt="System Ratings"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>System Ratings</span>
              </Link>
            </div>
          </div>

          {/* Custom Calendar Section */}
          <div className={styles.calendarContainer}>
            <h2 className={styles.calendarHeading}>Calendar</h2>
            <CustomCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
