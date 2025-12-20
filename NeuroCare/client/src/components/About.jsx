// About.js

import React from "react"
import styles from "./styles/About.module.css"
import Navbar from "./Navigation" // Import your Navbar component

function About() {
  return (
    <div className={styles.aboutContainer}>
      <Navbar />
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>NeuroCare is dedicated to providing exceptional care for patients with neurological conditions. Our mission is to enhance the quality of life for individuals and their families through innovative treatments and compassionate support.</p>
        </section>

        <section className={styles.section}>
          <div className={styles.feature}>
            <h3>Disease Detection and Prediction</h3>

            <div className={styles.subFeature}>
              <h4>Parkinson’s Disease Detection</h4>
              <p>Our system provides functionality to detect Parkinson’s disease using advanced AI algorithms. Patients can upload spiral or wave drawings for analysis, and the system generates diagnostic reports along with preventive measures.</p>
            </div>
            <div className={styles.subFeature}>
              <h4>Alzheimer’s Disease Detection</h4>
              <p>Our platform allows for the detection and staging of Alzheimer's disease through AI analysis of uploaded brain MRI images. Detailed diagnostic reports and care recommendations are provided based on the analysis.</p>
            </div>
            <div className={styles.subFeature}>
              <h4>Brain Stroke Prediction</h4>
              <p>Our system predicts the risk of brain stroke using AI algorithms. Patients can enter medical details, and the system analyzes the data to generate diagnostic reports and provide preventive recommendations.</p>
            </div>
          </div>

          <div className={styles.feature}>
            <h3>Lifestyle Plans</h3>
            <p>Our platform offers personalized diet and exercise plans tailored to the patient's health conditions. The system sets reminders, provides instructions, and includes video tutorials to help patients follow their plans effectively.</p>
          </div>

          <div className={styles.feature}>
            <h3>Virtual Consultations</h3>
            <p>Our system enables patients to book and conduct virtual consultations with neurologists. Patients can share medical reports, receive e-prescriptions, and chat with neurologists about their health concerns.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About