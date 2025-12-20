import { Link, useLocation } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "../styles/RegisteredPatient.module.css"

function RegisteredNeurologist() {
  const [neurologists, setNeurologists] = useState([])
  const maleCount = neurologists.filter((neurologists) => neurologists.gender.toLowerCase() === "male").length
  const femaleCount = neurologists.filter((neurologists) => neurologists.gender.toLowerCase() === "female").length

  useEffect(() => {
    const fetchNeurologists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/registered-neurologists") 

        setNeurologists(response.data)
      } catch (error) {
        console.error("Error fetching neurologists:", error)
      }
    }

    fetchNeurologists()
  }, [])

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      
      window.location.href = "/" // Alternatively, use a Link to manage redirection
    }
  }

  const handleDelete= async (neurologist) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-neurologists/${neurologist._id}`)
     
      setNeurologists(neurologists.filter((doc) => doc._id !== neurologist._id))
    } catch (error) {
      console.error("Error disapproving neurologists:", error)
    }
  }

  const location = useLocation(); // Get the current location

  // Helper function to apply the active class
  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
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

      <div className={styles.Container}>
      {/* Male and Female Count Boxes */}
      <div className={styles.gender_box}>
        <div className={styles.male}>
          <h4>Total Male Neurologists</h4>
          <h5>{maleCount}</h5>
        </div>
        <div className={styles.female}>
          <h4>Total Female Neurologists</h4>
          <h5>{femaleCount}</h5>
        </div>
      </div>

      <div className={styles.patient_table_container}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>PMC Registration Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {neurologists.map((neurologist, index) => (
              <tr key={neurologists._id}>
                <td>{index + 1}</td>
                <td>{neurologist.name}</td>
                <td>{neurologist.age}</td>
                <td>{neurologist.gender}</td>
                <td>{neurologist.phoneNumber}</td>
                <td>{neurologist.email}</td>
                <td>{neurologist.pmcRegistrationNumber}</td>
                <td>
                  <button className={styles.delete} onClick={() => handleDelete(neurologist)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
  )
}
export default RegisteredNeurologist
