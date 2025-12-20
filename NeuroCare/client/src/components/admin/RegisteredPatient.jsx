import { Link, useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "../styles/RegisteredPatient.module.css"


function RegisteredPatient() {
  const [patients, setPatients] = useState([])
  const maleCount = patients.filter((patient) => patient.gender.toLowerCase() === "male").length;
  const femaleCount = patients.filter((patient) => patient.gender.toLowerCase() === "female").length;


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/registered-patients") // Replace with your API endpoint

        setPatients(response.data)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchPatient()
  }, [])

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      // No need for history.push now; you can redirect with a link
      window.location.href = "/" // Alternatively, use a Link to manage redirection
    }
  }

  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  return (
    <div className={styles.Container}>
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

      {/* Male and Female Count Boxes */}
      <div className={styles.gender_box}>
        <div className={styles.male}>
          <h4>Total Male Patients</h4>
          <h5>{maleCount}</h5>
        </div>
        <div className={styles.female}>
          <h4>Total Female Patients</h4>
          <h5>{femaleCount}</h5>
        </div>
      </div>

      <div className={styles.patient_table_container}>
        {/* <h2>Registered Patients</h2> */}
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient._id}>
                <td>{index + 1}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default RegisteredPatient
