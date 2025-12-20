import React, { useState } from "react"
import axios from "axios"
import { useNavigate , Link} from "react-router-dom"
import styles from "./styles/PatientLogin.module.css" // Import external CSS file
import Navbar from "./Navigation"

function PatientLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((response) => {
        console.log(response)
        if (response.data.message === "Success") {
          localStorage.setItem("patientEmail", email);
          localStorage.setItem("userId", response.data.userId);
          navigate("/patient/dashboard")
        } else {
          alert("Login unsuccessful")
        }
      })
      .catch((error) => {
        console.error(error)
        setError("An error occurred. Please try again.") // Update state with error message
      })
  }

  return (
    <div>
      <Navbar/>
      <div className={styles["login-container"]}>
        <div className={styles["loginSide-box"]}>
          <h1 className={styles["loginSide-box-h"]}>Glad To See You</h1>
          <span className={styles["loginSide-box-s"]}>Please Enter Your Credentials </span>
        </div>
        <div className={styles["login-box"]}>
          <h2 className={styles["loginMain-h"]}>Login</h2>
          {error && <p className={styles["error-message"]}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles["input-container"]}>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles["input-container"]}>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className={styles["loginButton"]}  >Submit</button>
          </form>
          
        <p className={styles["signup-link"]}>
          Don't have an account? <a href="/PatientRegister">Sign Up</a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default PatientLogin;