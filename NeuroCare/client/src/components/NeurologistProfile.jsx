import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, useLocation, useNavigate } from "react-router-dom"
import EditProfileModal from "./NeurologistEditProfile"
import ResetPasswordModal from "./NeurologistResetPassword"
import styles from "./styles/NeurologistProfile.module.css"

function Dashboard() {
  const [neurologist, setNeurologist] = useState({})
  const [error, setError] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [editedNeurologistData, setEditedNeurologistData] = useState({})
  // const location = useLocation()
  const navigate = useNavigate()
  const email = localStorage.getItem("neurologistEmail")

  useEffect(() => {
    axios
      .get(`http://localhost:5000/neurologist/${email}`)
      .then((response) => setNeurologist(response.data))
      .catch(() => setError("An error occurred. Please try again later."))
  }, [email, neurologist])

  const handleEditProfile = () => {
    setEditedNeurologistData(neurologist)
    setIsEditModalOpen(true)
  }

//   const handleUpdateProfile = (updatedNeurologistData) => {
//     axios
//       .put(`http://localhost:5000/neurologist/${updatedNeurologistData._id}`, updatedNeurologistData)
//       .then(() => {
//         setNeurologist(updatedNeurologistData)
//         setIsEditModalOpen(false)
//       })
//       .catch()
//   }

  const handleModalClose = () => {
    setIsEditModalOpen(false)
  }

  const handleDeleteProfile = () => {
    axios
      .delete(`http://localhost:5000/neurologist/${neurologist._id}`)
      .then((response) => {
        alert("Account Deleted successfully")
        navigate("/")
      })
      .catch(() => setError("An error occurred while deleting the profile."))
  }

  const navigateToResetPassword = () => {
    setIsResetModalOpen(true)
  }

  // Logout confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("neurologistEmail");
      // No need for history.push now; you can redirect with a link
      window.location.href = '/'; // Alternatively, use a Link to manage redirection
    }
  };

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
    <Link to="/neurologist/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/dashboard')}`}>
      Dashboard
    </Link>
    <Link to="/about" className={`${styles.sidebarLink} ${getActiveClass('/about')}`}>
      About
    </Link>
    <Link to="/help" className={`${styles.sidebarLink} ${getActiveClass('/help')}`}>
      Help
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

    <div className={styles["NeurologistProfileContainer"]}>
      <div className={styles["ProfileSideBar"]}>
        <h1 className={styles["ProfileH"]}></h1>
        <span className={styles["ProfileS"]}> </span>
      </div>
    <div className={styles["dashboard-container"]}>
      <h2>Profile</h2>
      {error && <p className={styles["error-message"]}>{error}</p>}
      <div className={styles["profile-details"]}>
        <p>Name: {neurologist.name}</p>
        <p>Age: {neurologist.age}</p>
        <p>Phone Number: {neurologist.phoneNumber}</p>
        <p>Gender: {neurologist.gender}</p>
      </div>
      <div className={styles["button-container"]}>
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleDeleteProfile}>Delete Profile</button>
        <button onClick={navigateToResetPassword}>Reset Password</button>
      </div>
      <EditProfileModal isOpen={isEditModalOpen} onClose={handleModalClose} neurologist={editedNeurologistData} onUpdate={handleModalClose} />
      <ResetPasswordModal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} email={neurologist.email} previousPath={location.pathname} />
    </div>
    </div>

    </div>
  )
}

export default Dashboard