import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/NeurologistRanking.module.css';

const NeurologistRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/neurologistranking');
        setRankings(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch neurologist rankings. Please try again later.');
      }
    };

    fetchRankings();
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

    <div className={styles.container}>
      <h2>Neurologist Rankings</h2>
      {error && <p className={styles.error}>{error}</p>}
      {rankings.length > 0 ? (
        <table className={styles.rankingsTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Neurologist Name</th>
              <th>Email</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((neurologist, index) => (
              <tr key={neurologist.neurologistEmail}>
                <td>{index + 1}</td>
                <td>{neurologist.neurologistName}</td>
                <td>{neurologist.neurologistEmail}</td>
                <td>{neurologist.averageRating.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rankings available at the moment.</p>
      )}
    </div>

    </div>
  );
};

export default NeurologistRanking;
