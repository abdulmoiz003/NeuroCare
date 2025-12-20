import { Link, useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/SolutionReport.module.css';

function SolutionReport() {
  const [statusCounts, setStatusCounts] = useState({
    improving: 0,
    notImproving: 0,
    gettingWorse: 0,
  });
  const [error, setError] = useState('');
  const [effectiveness, setEffectiveness] = useState('');

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/eprescriptions');
        const eprescriptions = response.data;

        // Initialize counters
        let improving = 0;
        let notImproving = 0;
        let gettingWorse = 0;

        // Loop through the data and count statuses
        eprescriptions.forEach((eprescription) => {
          switch (eprescription.status) {
            case 'Improving':
              improving++;
              break;
            case 'Not Improving':
              notImproving++;
              break;
            case 'Getting Worse':
              gettingWorse++;
              break;
            default:
              break;
          }
        });

        // Set the counts in state
        setStatusCounts({
          improving,
          notImproving,
          gettingWorse,
        });

        // Determine effectiveness
        if (improving > notImproving + gettingWorse) {
          setEffectiveness('Positive');
        } else if (improving < notImproving + gettingWorse) {
          setEffectiveness('Negative');
        } else {
          setEffectiveness('Neutral');
        }
      } catch (err) {
        setError('Failed to fetch prescription data. Please try again later.');
      }
    };

    fetchStatusCounts();
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
      <h2 className={styles.heading}>System Solutions Report</h2>
      {error && <div className={styles.error}>{error}</div>}
      
      {/* Effectiveness Display */}
      <div className={styles.effectiveness}>
        <h3>Effectiveness of System Solutions: {effectiveness}</h3>
      </div>

      {/* Status Cards */}
      <div className={styles.statusContainer}>
        <div className={styles.statusCard}>
          <h3>Improving Patients</h3>
          <p className={styles.count}>{statusCounts.improving}</p>
        </div>
        <div className={styles.statusCard}>
          <h3>Not Improving</h3>
          <p className={styles.count}>{statusCounts.notImproving}</p>
        </div>
        <div className={styles.statusCard}>
          <h3>Getting Worse</h3>
          <p className={styles.count}>{statusCounts.gettingWorse}</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SolutionReport;
