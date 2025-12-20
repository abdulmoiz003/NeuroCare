// Navbar.js

import React from "react"
import { Link } from "react-router-dom"
import styles from "./styles/Navigation.module.css" 
import brainLogo from "./brain.logo.jpeg"

function Navbar() {
  return (
    <div className={styles.mainContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          {" "}
          {/* Corrected */}
          <img src={brainLogo} alt="Brain Logo" className={styles.navbarLogo} /> {/* Corrected */}
          <span className={styles.navbarBrand}>NeuroCare</span> {/* Corrected */}
        </div>
        <div className={styles.navbarRight}>
          {" "}
          {/* Corrected */}
          <Link to="/" className={styles.navLink}>
            {" "}
            {/* Corrected */}
            Home
          </Link>
          <Link to="/About" className={styles.navLink}>
            {" "}
            {/* Corrected */}
            About
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar