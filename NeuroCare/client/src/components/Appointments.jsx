import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './styles/Appointments.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const navigate = useNavigate();
  const value = localStorage.getItem('neurologistEmail');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const neurologistEmail = localStorage.getItem('neurologistEmail');
        const response = await axios.get(`http://localhost:5000/neurologistappointments/${neurologistEmail}`);
        setAppointments(response.data);
        setError('');
      } catch (err) {
        setError('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('neurologistEmail');
      window.location.href = '/';
    }
  };

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  const initiateConsultation = (appointment) => {
    const patientEmail = localStorage.getItem('patientEmail');
    if (patientEmail === appointment.patientEmail) {
      if (Notification.permission === 'granted') {
        new Notification("Join Virtual Consultation", { 
          body: `Join virtual consultation initiated by Dr. ${appointment.neurologistName} for your today's appointment with ID: ${appointment._id}`,
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification("Join Virtual Consultation", { 
              body: `Join virtual consultation initiated by Dr. ${appointment.neurologistName} for your today's appointment with ID: ${appointment._id}`,
            });
          }
        });
      }
    }
    handleJoinRoom();
  };

  const generatePrescription = (appointmentId) => {
    navigate(`/genpres/${appointmentId}`);
  };

  const rescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
    setNewDate('');
    setNewTime('');
  };

  const handleSaveChanges = async () => {
    try {
      const updatedAppointment = {
        ...selectedAppointment,
        date: newDate,
        time: newTime,
      };

      // Update the appointment in the backend (MongoDB)
      await axios.put(`http://localhost:5000/updateappointment/${selectedAppointment._id}`, updatedAppointment);

      // Close the modal and refresh the list of appointments
      handleModalClose();
      const neurologistEmail = localStorage.getItem('neurologistEmail');
      const response = await axios.get(`http://localhost:5000/neurologistappointments/${neurologistEmail}`);
      setAppointments(response.data);
      alert("Appointment Rescheduled Successfully");
      const patientEmail = localStorage.getItem('patientEmail');
    if (patientEmail === selectedAppointment.patientEmail) {
      if (Notification.permission === 'granted') {
        new Notification("Appointment Rescheduled", { 
          body: `Your appointment with Dr. ${selectedAppointment.neurologistName} for your appointment ID: ${selectedAppointment._id} is rescheduled on Date: ${newDate} and Time: ${newTime}`,
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification("Appointment Rescheduled", { 
              body: `Your appointment with Dr. ${selectedAppointment.neurologistName} for your appointment ID: ${selectedAppointment._id} is rescheduled on Date: ${newDate} and Time: ${newTime}`,
            });
          }
        });
      }
    }
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError('Error rescheduling appointment');
    }
  };

  // Get today's date in the format YYYY-MM-DD
  const todayDate = new Date().toISOString().split('T')[0];

  // Handle time input restrictions
  const handleTimeInput = (e) => {
    const selectedTime = e.target.value;
    const selectedDate = new Date(newDate);
    const currentDate = new Date();

    if (selectedDate.toDateString() === currentDate.toDateString() && selectedTime <= currentDate.toLocaleTimeString().slice(0, 5)) {
      // If selected date is today, ensure time is in the future
      alert('Please select a future time.');
      setNewTime('');
    } else {
      setNewTime(selectedTime);
    }
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
        <Link to="/neurologist/appointments" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/appointments')}`}>
          Appointments
        </Link>
        <Link to="/neurologist/availability" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/availability')}`}>
          Avail Timings
        </Link>
        <Link to="/neurologist/chats" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/chats')}`}>
          Chat
        </Link>
        <Link to="/neurologist/reports" className={`${styles.sidebarLink} ${getActiveClass('/neurologist/reports')}`}>
          Reports
        </Link>
        <Link to="/ratings" className={`${styles.sidebarLink} ${getActiveClass('/ratings')}`}>
          Ratings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <img src="https://i.ibb.co/fQ7RJ3f/logout.png" alt="Logout" className={styles.logoutImage} />
          Logout
        </button>
      </div>

      <div className={styles.container}>
        <header>
          <h2>Appointments</h2>
        </header>
        {error && <p className={styles.error}>{error}</p>}
        {appointments.length > 0 ? (
          <ul className={styles.appointmentsList}>
            {appointments.map((appointment) => (
              <li key={appointment._id} className={styles.listItem}>
                <p><strong>Appointment ID:</strong> {appointment._id}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                <p><strong>Patient Email:</strong> {appointment.patientEmail}</p>
                <p><strong>Neurologist Name:</strong> {appointment.neurologistName}</p>
                <p><strong>Neurologist Email:</strong> {appointment.neurologistEmail}</p>

                {/* New buttons for each appointment */}
                <button onClick={() => initiateConsultation(appointment)} className={styles.consultationButton}>
                  Initiate Virtual Consultation
                </button>
                <button onClick={() => generatePrescription(appointment._id)} className={styles.prescriptionButton}>
                  Generate E-Prescription
                </button>
                <button onClick={() => rescheduleAppointment(appointment)} className={styles.rescheduleButton}>
                  Reschedule Appointment
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>

      {/* Modal for rescheduling appointment */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Reschedule Appointment</h3>
            <label>Date:</label>
            <input 
              type="date" 
              value={newDate} 
              onChange={(e) => setNewDate(e.target.value)} 
              min={todayDate} // Ensure only future or today's date can be selected
            />
            <label>Time:</label>
            <input 
              type="time" 
              value={newTime} 
              onChange={handleTimeInput}
              min={newDate === todayDate ? new Date().toLocaleTimeString().slice(0, 5) : ''} // Ensure future time if today's date is selected
            />
            <button onClick={handleSaveChanges} className={styles.saveButton}>Save Changes</button>
            <button onClick={handleModalClose} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
