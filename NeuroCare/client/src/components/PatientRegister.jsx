import React, { useState } from "react"
import styles from "./styles/PatientRegister.module.css" // Import CSS module for styling
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Navbar from "./Navigation"

function PatientSignup() {
  // State variables to store user input and error messages
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [age, setAge] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Validate the form data
    if (!name || !email || !password || !confirmPassword || !age || !phoneNumber || !gender) {
      setError("All fields are required.")
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name must contain only alphabets and spaces.")
    } else if (age < 1 || age > 120) {
      setError("Age must be between 1 and 120.")
    } else if (!/^\d{11}$/.test(phoneNumber)) {
      setError("Phone number must be 11 digits long.")
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.")
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
    } else {
      axios
        .post("http://localhost:5000/register", { name, age, phoneNumber, gender, email, password })
        .then((response) => {
          console.log(response.data)
          // Handle success (e.g., show a success message)
          alert("Signup successful!")
          navigate("/PatientLogin")
        })
        .catch((error) => {
          setError("Account already exists, try again")
          // Handle error (e.g., show an error message)
        })
      
      // Clear form after submission
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAge(0)
      setPhoneNumber("")
      setGender("")
    }
  }

  return (
    <div>
      <Navbar/>
    <div className={styles.PatientSignupContainer}>
      <div className={styles.SignupSideBar}>
        <h1 className={styles.SignupH}>Welcome To NeuroCare</h1>
          <span className={styles.SignupS}>Please Register Yourself </span>
      </div>
      <div className={styles.PatientSignupBox}>
        <h2>Sign Up</h2>
        {error && <p className={styles.ErrorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.InputContainer}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className={styles.InputContainer}>
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className={styles.InputContainer}>
            <label>Phone Number:</label>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className={styles.InputContainer}>
            <label>Gender:</label>
            <div></div>
            <span>
              <input type="radio" id="male" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
              <label htmlFor="male">Male</label>
            </span>
            <span>
              <input type="radio" id="female" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
              <label htmlFor="female">Female</label>
            </span>
            <span>
              <input type="radio" id="other" name="gender" value="other" checked={gender === "other"} onChange={() => setGender("other")} />
              <label htmlFor="other">Other</label>
            </span>
          </div>
          <div className={styles.InputContainer}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.InputContainer}>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className={styles.InputContainer}>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className={styles.SignupButton}  >Submit</button>
        </form>
        <p className={styles.LoginLink}>
          Already have an account?  
          <Link to="/PatientLogin">
           Log in
          </Link>
        </p>
      </div>

    </div>
    </div>
  )
}

export default PatientSignup
