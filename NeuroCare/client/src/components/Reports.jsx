import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import styles from './styles/Reports.module.css';
import { Link, useLocation } from 'react-router-dom';

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [neurologists, setNeurologists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const patientEmail = localStorage.getItem('patientEmail');
  const location = useLocation();

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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getReports/${patientEmail}`);
        setReports(response.data);
      } catch (err) {
        setError('Failed to fetch reports. Please try again later.');
      }
    };

    const fetchNeurologists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/neurologists');
        setNeurologists(response.data);
      } catch (err) {
        console.error('Failed to fetch neurologists:', err);
      }
    };

    fetchReports();
    fetchNeurologists();
  }, [patientEmail]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleShareReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleNeurologistSelection = async (neurologistEmail) => {
    try {
      const { patientName, patientAge, patientGender, disease, detectionResult, email, createdAt } = selectedReport;

      await axios.post('http://localhost:5000/shareReport', {
        patientName,
        patientAge,
        patientGender,
        disease,
        detectionResult,
        email,
        createdAt,
        sharedWith: neurologistEmail,
      });
      alert('Report successfully shared with the neurologist!');
    } catch (err) {
      console.error('Failed to share report:', err);
    }
    setShowModal(false);
  };

  return (
    <div className="main">
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

      <div className={styles.container}>
        <h2 className={styles.heading}>Patient Reports</h2>
        {error && <div className={styles.error}>{error}</div>}
        {reports.length === 0 ? (
          <p className={styles.noReports}>No reports found for this patient.</p>
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
              <div className={styles.logoContainer}>
                <img src="https://i.ibb.co/g3c6P1s/neurocare-logo.png" alt="NeuroCare Logo" className={styles.logo} />
                <span className={styles.logoText}>Detected using NeuroCare</span>
                <button className={styles.shareButton} onClick={() => handleShareReport(report)}>Share Report</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Neurologist Selection Modal */}
      {showModal && (
        <>
          <div className={styles.overlay} onClick={() => setShowModal(false)} /> {/* Overlay */}
          <div className={styles.modal}>
            <span className={styles.closeModal} onClick={() => setShowModal(false)}>&times;</span> {/* Close button */}
            <h4>Select Neurologist to Share Report</h4>
            <ul className={styles.neurologistList}>
              {neurologists.map((neurologist) => (
                <li key={neurologist.email} onClick={() => handleNeurologistSelection(neurologist.email)} className={styles.neurologistItem}>
                  {neurologist.name} ({neurologist.email})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Reports;
