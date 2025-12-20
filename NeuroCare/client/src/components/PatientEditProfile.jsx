import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles/PatientEditProfile.module.css"

function EditProfileModal({ isOpen, onClose, patient, onUpdate }) {
  const [updatedPatient, setUpdatedPatient] = useState({ ...patient })
  const [error, setError] = useState("")

  useEffect(() => {
    setUpdatedPatient({ ...patient })
  }, [patient])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedPatient({ ...updatedPatient, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate input
    if (!/^[A-Za-z\s]+$/.test(updatedPatient.name)) {
      setError("Name must contain only alphabets and spaces.")
      return
    }

    if (updatedPatient.age < 1 || updatedPatient.age > 120) {
      setError("Age must be between 1 and 120.")
      return
    }

    if (!/^\d{11}$/.test(updatedPatient.phoneNumber)) {
      setError("Phone number must be 11 digits long.")
      return
    }

    try {
      await axios.put(`http://localhost:5000/patient/${patient.email}`, updatedPatient)
      onUpdate(updatedPatient) 
      // Update the parent component's state
      onClose() // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("An error occurred. Try again.")
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Edit Profile</h2>
        {error && <p className={styles["error-message"]}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={updatedPatient.name} onChange={handleChange} required />
          <br />
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={updatedPatient.age} onChange={handleChange} required />
          <br />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={updatedPatient.phoneNumber} onChange={handleChange} required />
          <br />
          
          <button type="submit" className={styles["editButton"]}>Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
