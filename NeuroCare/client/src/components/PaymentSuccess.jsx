import React, { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import styles from "./styles/PaymentSuccess.module.css" // Import the CSS module

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const location = useLocation()
  const hasBooked = useRef(false) // Ref to track if booking has been done

  // Extract appointment details from the query parameters
  const params = new URLSearchParams(location.search)
  const patientName = params.get("patientName")
  const patientEmail = params.get("patientEmail")
  const neurologistName = params.get("neurologistName")
  const neurologistEmail = params.get("neurologistEmail")
  const date = params.get("date")
  const time = params.get("time")
  const fee = params.get("fee")
  const timingId = params.get("timingId")

  useEffect(() => {
    if (!hasBooked.current) {
      hasBooked.current = true // Mark booking as done
      bookAppointment()
    }
  }, []) // Empty dependency array ensures it runs only once

  const bookAppointment = async () => {
    try {
      const response = await fetch("http://localhost:5000/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          patientEmail,
          neurologistName,
          neurologistEmail,
          date,
          time,
          fee,
          timingId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Show the notification
      showNotification(neurologistName, date, time)

    } catch (error) {
      console.error("Error booking appointment:", error)
      setError("Failed to book appointment after payment. Please try again.")
    } finally {
      setLoading(false) // Update loading state
    }
  }

  const showNotification = (neurologistName, date, time) => {
    // Request permission for notifications
    if (Notification.permission === "granted") {
      // Create and show the notification
      new Notification("Payment and Appointment Confirmation", {
        body: "Payment successful, your appointment has been booked successfully",
      });
      new Notification("Upcoming Appointment", {
        body: `You have an appointment with Dr. ${neurologistName} on Date: ${date}, Time: ${time}, please be present`,
      });
    } else if (Notification.permission !== "denied") {
      // If permission has not been denied, request permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Payment and Appointment Confirmation", {
            body: "Payment successful, your appointment has been booked successfully",
          });
          new Notification("Upcoming Appointment", {
            body: `You have an appointment with Dr. ${neurologistName} on Date: ${date}, Time: ${time}, please be present`,
          });
        }
      });
    }
  }

  return (
    <div className={styles.container}>
      {loading ? <p className={styles.loading}>Loading...</p> : <p className={styles.success}>Your appointment has been successfully booked!</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default PaymentSuccess
