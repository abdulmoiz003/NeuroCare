import React from "react"
import { Link } from "react-router-dom"
import styles from "./styles/HomePage.module.css"
import Navbar from "./Navigation"

function HomePage() {
  return (
    <div className={styles.homeBackground}>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.content}>
          <div className={styles.detail}>
            <h3>Our Mission</h3>
            <p>NeuroCare is dedicated to providing exceptional care for patients with neurological conditions. Our mission is to improve the quality of life for individuals and their families through innovative treatments and compassionate support.</p>
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/PatientLogin" className={styles.patientButton}>
              Patient
            </Link>
            <Link to="/NeurologistLogin" className={styles.neurologistButton}>
              Neurologist
            </Link>
            <Link to="/AdminLogin" className={styles.adminButton}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;