import React, { useState, useEffect } from "react"
import axios from "axios"
import styles from "./styles/NeurologistEditProfile.module.css"

function EditProfileModal({ isOpen, onClose, neurologist, onUpdate }) {
  const [updatedNeurologist, setUpdatedNeurologist] = useState({ ...neurologist })
  const [error, setError] = useState("")

  useEffect(() => {
    setUpdatedNeurologist({ ...neurologist })
  }, [neurologist])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedNeurologist({ ...updatedNeurologist, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Name validation: Only alphabets and spaces allowed
    if (!/^[A-Za-z\s]+$/.test(updatedNeurologist.name)) {
      setError("Name must contain only alphabets and spaces.")
      return
    }

    // Age validation: Between 1 and 120
    if (updatedNeurologist.age < 1 || updatedNeurologist.age > 120) {
      setError("Age must be between 1 and 120.")
      return
    }

    // Phone number validation: Exactly 11 digits
    if (!/^\d{11}$/.test(updatedNeurologist.phoneNumber)) {
      setError("Phone number must be 11 digits long.")
      return
    }

    try {
      await axios.put(`http://localhost:5000/neurologist/${neurologist.email}`, updatedNeurologist)
      onUpdate(updatedNeurologist) // Update the parent component's state
      onClose() // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("An error occurred. Please try again.")
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
          <input type="text" id="name" name="name" value={updatedNeurologist.name} onChange={handleChange} required />
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={updatedNeurologist.age} onChange={handleChange} required />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={updatedNeurologist.phoneNumber} onChange={handleChange} required />
          
          <button type="submit" className={styles["editButton"]} >Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default EditProfileModal
