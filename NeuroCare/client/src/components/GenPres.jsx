import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from './styles/GenPres.module.css';
import { Link, useLocation } from 'react-router-dom';

function GenPres() {
  const { appointmentId } = useParams();
  const email = localStorage.getItem('neurologistEmail');
  const [name, setName] = useState('');
  const [error, setError] = useState("");
  
  const [patientName, setPatientName] = useState('');
  const [medications, setMedications] = useState([{ name: '', dosage: '', time: '' }]);
  const [status, setStatus] = useState('');
  const [disease, setDisease] = useState('');
  const [instructions, setInstructions] = useState('');

  //helper
  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('neurologistEmail');
      window.location.href = '/'; // Alternatively, use a Link to manage redirection
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/neurologist/${email}`)
      .then((response) => setName(response.data.name))
      .catch(() => setError("An error occurred. Please try again later."));
  }, [email]);

  const handleMedicationChange = (index, event) => {
    const updatedMedications = medications.map((medication, i) => 
      i === index ? { ...medication, [event.target.name]: event.target.value } : medication
    );
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', time: '' }]);
  };

  const removeMedication = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const prescriptionData = {
      appointmentId,
      patientName,
      disease,
      medications,
      status,
      neurologistName: name,
      instructions
    };
  
    axios
      .post('http://localhost:5000/savepres', prescriptionData)
      .then((response) => {
        alert('E-Prescription submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting E-Prescription:', error);
        alert('Failed to submit E-Prescription. Please try again.');
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
        <Link to="/neurologist/ratings" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/ratings')}`}>
          Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img src="https://i.ibb.co/fQ7RJ3f/logout.png" alt="Logout" className={styles.logoutImage} />
          Logout
        </button>
      </div>

    <div className={styles.container}>
      <h2>E-Prescription</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>
            Appointment Id:
            <input 
              type="text" 
              value={appointmentId}  
              required
              readOnly 
            />
          </label>
          <label>
            Patient Name:
            <input 
              type="text" 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Disease:
            <input 
              type="text" 
              value={disease} 
              onChange={(e) => setDisease(e.target.value)} 
              required 
            />
          </label>
        </div>

        <label>Prescribed Medications:</label>
        {medications.map((medication, index) => (
          <div key={index} className={styles.medication}>
            <input
              type="text"
              name="name"
              placeholder="Medication Name"
              value={medication.name}
              onChange={(e) => handleMedicationChange(index, e)}
              required
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={medication.dosage}
              onChange={(e) => handleMedicationChange(index, e)}
              required
            />
            <input
              type="text"
              name="time"
              placeholder="Time"
              value={medication.time}
              onChange={(e) => handleMedicationChange(index, e)}
              required
            />
            {medications.length > 1 && (
              <button type="button" className={styles.removeButton} onClick={() => removeMedication(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={addMedication}>
          Add Medication
        </button>

        <div className={styles.row}>
          <label>
            Patient Health Improvement Status:
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              required
            >
              <option value="">Select Status</option>
              <option value="N/A">N/A</option>
              <option value="Improving">Improving</option>
              <option value="Not Improving">Not Improving</option>
              <option value="Getting Worse">Getting Worse</option>
            </select>
          </label>
          <label>
            Neurologist Name:
            <input type="text" value={name} readOnly />
          </label>
        </div>

        <label>
          Special Instructions (optional):
          <textarea 
            value={instructions} 
            onChange={(e) => setInstructions(e.target.value)} 
          />
        </label>

        <button className={styles.subButton} type="submit">Send E-Prescription</button>
      </form>
    </div>
    </div>
  );
}

export default GenPres;