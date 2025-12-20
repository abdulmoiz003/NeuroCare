import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useLocation } from 'react-router-dom'; // Removed useHistory
import CustomCalendar from './CustomCalendar'; // Importing the custom calendar component
import styles from './styles/NeurologistDashboard.module.css';

const NeurologistDashboard = () => {
  const email = localStorage.getItem("neurologistEmail");
  const [name, setName] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/neurologist/${email}`)
      .then((response) => setName(response.data.name))
      .catch(() => setError("An error occurred. Please try again later."));
  }, [email]);

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("neurologistEmail");
      // No need for history.push now; you can redirect with a link
      window.location.href = '/'; // Alternatively, use a Link to manage redirection
    }
  };

  const location = useLocation(); // Get the current location

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
        <Link to="/neurologist/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/dashboard')}`}>
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
          <h1 className={styles.welcomeMessage}>Welcome, Doctor {name}</h1>
          <div className={styles.profileContainer}>
            <Link to="/neurologist/profile" className={styles.profileLink}>
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
            <Link to="/neurologist/appointments" className={styles.largeButton}>
              <img
                src="https://i.ibb.co/yNdw2Rj/appointment3.jpg"
                alt="Appointments"
                className={styles.buttonImage}
              />
              <span className={styles.buttonText}>Appointments</span>
            </Link>
            <div className={styles.gridContainer}>
              <Link to="/neurologist/availability" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/XDvzxGt/availability3.png"
                  alt="Availability Timings"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Availability Timings</span>
              </Link>
              <Link to="/neurologist/chats" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/PGQDNQy/chat2.jpg"
                  alt="Chats"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Chats</span>
              </Link>
              <Link to="/neurologist/reports" className={styles.smallButton}>
                <img
                  src="https://i.ibb.co/ysQ29ns/reports1.jpg"
                  alt="Shared Medical Reports"
                  className={styles.buttonImage}
                />
                <span className={styles.buttonText}>Shared Medical Reports</span>
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

export default NeurologistDashboard;
