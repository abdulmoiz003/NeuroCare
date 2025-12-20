import React, { useState } from "react"
import axios from "axios"
import styles from "./styles/PatientResetPassword.module.css"
import { useNavigate } from "react-router-dom"

function ResetPasswordModal({ isOpen, onClose, email, previousPath }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const navigate = useNavigate()

  const handleVerifyPassword = () => {
    axios
      .post("http://localhost:5000/PatientVerifyPassword", { email, currentPassword })
      .then(() => {
        if (newPassword !== confirmPassword) {
          setError("Passwords do not match")
          return
        } else if (newPassword.length < 8) {
          setError("Password must be at least 8 characters long.")
          return
        }
        axios
          .post("http://localhost:5000/PatientResetPassword", { email, newPassword })
          .then((response) => {
            setSuccessMessage(response.data.message)
            setError("")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            alert("Password reset successfully")
            onClose()
            navigate(previousPath) // Redirect to the desired page after successful password reset
          })
          .catch(() => setError("An error occurred. Please try again later."))
      })
      .catch(() => setError("Incorrect current password"))
  }

  if (!isOpen) return null

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Reset Password</h2>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        
        <label>Current Password:</label>
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        <br />
        <br />
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <br />
        <br />
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button onClick={handleVerifyPassword} className={styles.resetButton} >Reset Password</button>
      </div>
    </div>
  )
}

export default ResetPasswordModal