import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "./styles/NeurologistRegister.module.css" // Import CSS file for styling
import Navbar from "./Navigation"

function NeurologistRegister() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [accountHolderName, setAccountHolderName] = useState("")
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [pmcRegistrationNumber, setPmcRegistrationNumber] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    // Name validation: Only alphabets and spaces allowed
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name must contain only alphabets and spaces.")
      return
    }

    // Age validation: Between 1 and 120
    if (age < 1 || age > 120) {
      setError("Age must be between 1 and 120.")
      return
    }

    // Phone number validation: Exactly 11 digits
    if (!/^\d{11}$/.test(phoneNumber)) {
      setError("Phone number must be 11 digits long.")
      return
    }

    // Check for missing fields
    if (!name || !age || !phoneNumber || !gender || !email || !password || !confirmPassword || !accountHolderName || !bankName || !accountNumber || !pmcRegistrationNumber) {
      setError("All fields are required.")
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.")
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
    } else {
      axios
        .post("http://localhost:5000/NeurologistRegister", {
          name,
          age,
          phoneNumber,
          gender,
          email,
          password,
          accountHolderName,
          bankName,
          accountNumber,
          pmcRegistrationNumber,
        })
        .then((response) => {
          console.log(response.data)
          alert("Signup successful! You will be able to login once your account is approved")
          navigate("/NeurologistLogin")
        })
        .catch((error) => {
          console.error(error)
          setError("Email already exists, try again.")
        })

      // Reset form fields
      setName("")
      setAge("")
      setPhoneNumber("")
      setGender("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAccountHolderName("")
      setBankName("")
      setAccountNumber("")
      setPmcRegistrationNumber("")
    }
  }

  return (
    <div>
      <Navbar />
      <div className={styles.signupContainer}>
      <div className={styles.SignupSideBar}>
        <h1 className={styles.SignupH}>Welcome To NeuroCare</h1>
          <span className={styles.SignupS}>Please Register Yourself </span>
      </div>

        <div className={styles.signupBox}>
          <h3 className={styles.h3}>Sign Up</h3>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Phone Number:</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <label>Gender:</label>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <input type="radio" id="male" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div>
                    <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
                    <label htmlFor="female">Female</label>
                  </div>
                  <div>
                    <input type="radio" id="other" name="gender" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Account Holder Name:</label>
                <input type="text" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <label>Bank Name:</label>
                <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Account Number:</label>
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <label>PMC Registration Number:</label>
                <input type="text" value={pmcRegistrationNumber} onChange={(e) => setPmcRegistrationNumber(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles.inputContainer}>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className={styles.SignupButton}>Submit</button>
          </form>
          <p className={styles.loginLink} >
            Already have an account? <a href="/NeurologistLogin">Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NeurologistRegister
