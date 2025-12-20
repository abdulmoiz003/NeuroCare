import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditProfileModal from "./PatientEditProfile";
import ResetPasswordModal from "./PatientResetPassword";
import styles from "./styles/PatientProfile.module.css";

function Dashboard() {
  const [patient, setPatient] = useState({});
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [editedPatientData, setEditedPatientData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("patientEmail");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/patient/${email}`)
      .then((response) => setPatient(response.data))
      .catch(() => setError("An error occurred. Please try again later."));
  }, [email, patient]);

  const handleEditProfile = () => {
    setEditedPatientData(patient);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteProfile = () => {
    axios
      .delete(`http://localhost:5000/patients/${patient._id}`)
      .then((response) => {
        alert("Account Deleted successfully");
        navigate("/");
      })
      .catch(() => setError("An error occurred while deleting the profile."));
  };

  const navigateToResetPassword = () => {
    setIsResetModalOpen(true);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("patientEmail");
      window.location.href = '/';
    }
  };

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
    <Link to="/patient/dashboard" className={`${styles.sidebarLink} ${getActiveClass('/patient/dashboard')}`}>
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

    <div className={styles["PatientProfileContainer"]}>
      <div className={styles["ProfileSideBar"]}>
        <h1 className={styles["ProfileH"]}></h1>
        <span className={styles["ProfileS"]}> </span>
      </div>
      <div className={styles["dashboard-container"]}>
        <h2>Profile</h2>
        {error && <p className={styles["error-message"]}>{error}</p>}
        <div className={styles["profile-details"]}>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Phone Number: {patient.phoneNumber}</p>
          <p>Gender: {patient.gender}</p>
        </div>
        <div className={styles["button-container"]}>
          <button onClick={handleEditProfile} className={styles["EditProfile"]}>
            Edit Profile
          </button>
          <button
            onClick={handleDeleteProfile}
            className={styles["DeleteProfile"]}
          >
            Delete Profile
          </button>
          <button
            onClick={navigateToResetPassword}
            className={styles["ResetPassword"]}
          >
            Reset Password
          </button>
        </div>
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={handleModalClose}
          patient={editedPatientData}
          onUpdate={handleModalClose}
        />
        <ResetPasswordModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          email={patient.email}
          previousPath={location.pathname}
        />
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
