import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import styles from './styles/Reports.module.css';
import { Link, useLocation } from 'react-router-dom';

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const neurologistEmail = localStorage.getItem('neurologistEmail');
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('neurologistEmail');
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/sharedReports/${neurologistEmail}`);
        setReports(response.data);
      } catch (err) {
        setError('Failed to fetch reports. Please try again later.');
      }
    };

    fetchReports();
  }, [neurologistEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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
        <Link to="/neurologist/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/dashboard')}`}>
          Dashboard
        </Link>
        <Link to="/neurologist/appointments" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/appointments')}`}>
          Appointments
        </Link>
        <Link to="/neurologist/availability" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/availability')}`}>
          Avail Timings
        </Link>
        <Link to="/neurologist/chats" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/chats')}`}>
          Chat
        </Link>
        <Link to="/neurologist/reports" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/reports')}`}>
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

      <div className={styles.container}>
        <h2 className={styles.heading}>Shared Reports</h2>
        {error && <div className={styles.error}>{error}</div>}
        {reports.length === 0 ? (
          <p className={styles.noReports}>No reports found.</p>
        ) : (
          reports.map((report, index) => (
            <div key={report._id} className={styles.reportCard}>
              <h3>Report #{index + 1}</h3>
              <div className={styles.reportDetails}>
                <p><span>Patient Name:</span> {report.patientName}</p>
                <p><span>Age:</span> {report.patientAge}</p>
                <p><span>Gender:</span> {report.patientGender}</p>
                <p><span>Disease:</span> {report.disease}</p>
                <p><span>Detection Result:</span> {report.detectionResult}</p>
                <p><span>Patient Email:</span> {report.email}</p>
                <p><span>Created At:</span> {formatDate(report.createdAt)}</p>
              </div>
              <div className={styles.logoContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginLeft: '10px' }}>
                <img src="https://i.ibb.co/g3c6P1s/neurocare-logo.png" alt="NeuroCare Logo" className={styles.logo} />
                <span className={styles.logoText}>Detected using NeuroCare</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reports;
