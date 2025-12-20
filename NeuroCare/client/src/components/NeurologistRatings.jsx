import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/NeurologistRatings.module.css";

const NeurologistRatings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getneurologistratings"); // Adjust the endpoint as necessary
        setRatings(response.data);
      } catch (err) {
        console.error("Failed to fetch neurologist ratings:", err);
      }
    };

    fetchRatings();
  }, []);

  const location = useLocation(); // Get the current location
  
  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      // No need for history.push now; you can redirect with a link
      window.location.href = "/" // Alternatively, use a Link to manage redirection
    }
  }

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
    <Link to="/admin/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/admin/dashboard')}`}>
      Dashboard
    </Link>
    <Link to="/solutionreport" className={`${styles.sidebarLink} ${getActiveClass('/solutionreport')}`}>
      Sys Solutions Report
    </Link>
    <Link to="/neurologistranking" className={`${styles.sidebarLink} ${getActiveClass('/neurologistranking')}`}>
      Neur Ranking Report
    </Link>
    <Link to="/neurologistratings" className={`${styles.sidebarLink} ${getActiveClass('/neurologistratings')}`}>
      Neurologist Ratings
    </Link>
    <Link to="/systemratings" className={`${styles.sidebarLink} ${getActiveClass('/systemratings')}`}>
      System Ratings
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

    <div className={styles.tableContainer}>
      <h2 className={styles.heading}>Neurologist Ratings</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rating No.</th>
            <th>Neurologist Name</th>
            <th>Neurologist Email</th>
            <th>Rating</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, index) => (
            <tr key={rating._id}>
              <td>R{index + 1}</td>
              <td>{rating.neurologistName}</td>
              <td>{rating.neurologistEmail}</td>
              <td>{rating.rating}</td>
              <td>{rating.review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default NeurologistRatings;
