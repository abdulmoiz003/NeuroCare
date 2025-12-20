import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvailabilityTimings.css'; // Import CSS file for styling
import { Link, useLocation } from 'react-router-dom'; // Removed useHistory
import styles from './styles/NeurologistDashboard.module.css';

const formatDateForDisplay = (dateStr) => {
  const [datePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-');
  return `${day}-${month}-${year}`;
};

const formatDateForInput = (dateStr) => {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

const formatTimeForDisplay = (timeStr) => {
  return timeStr;
};

const formatFeeForDisplay = (fee) => {
  return `Rs. ${fee}`;
};

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};

const getCurrentTime = () => {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const AvailabilityTimings = () => {
  const [availabilityTimings, setAvailabilityTimings] = useState([]);
  const [neurologist, setNeurologist] = useState({});
  const email = localStorage.getItem("neurologistEmail");
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    time: '',
    fee: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/neurologist/${email}`)
      .then((response) => setNeurologist(response.data))
      .catch(() => alert("An error occurred. Please try again later."));
  }, [email]);

  const name = neurologist.name;

  useEffect(() => {
    fetchAvailabilityTimings();
  }, []);

  const fetchAvailabilityTimings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/neurologistavailability/${email}`);
      const formattedData = response.data.map(item => ({
        ...item,
        id: item._id,
        date: formatDateForDisplay(item.date),
        time: formatTimeForDisplay(item.time),
        fee: formatFeeForDisplay(item.fee)
      }));
      setAvailabilityTimings(formattedData);
    } catch (error) {
      console.error('Error fetching availability timings:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (timing) => {
    setFormData({
      id: timing.id,
      date: formatDateForInput(timing.date),
      time: timing.time,
      fee: timing.fee
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability timing?')) {
      try {
        await axios.delete(`http://localhost:5000/api/availability-timings/${id}`);
        alert('Availability timing deleted successfully!');
        fetchAvailabilityTimings();
      } catch (error) {
        console.error('Error deleting availability timing:', error);
        alert('Failed to delete availability timing. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, date, time, fee } = formData;
    const todayDate = getTodayDate();
    const currentTime = getCurrentTime();

    if (!date || !time || !fee) {
      alert('Please fill in all fields.');
      return;
    }

    if (date < todayDate) {
      alert('Please select a current or future date.');
      return;
    }

    if (date === todayDate && time <= currentTime) {
      alert('Please select a future time.');
      return;
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/availability-timings/${id}`, { date, time, fee });
        alert('Availability timing updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/availability-timings', { date, time, fee, name, email });
        alert('Availability timing added successfully!');
      }
      fetchAvailabilityTimings();
      setIsFormVisible(false);
      setFormData({ id: '', date: '', time: '', fee: '' });
    } catch (error) {
      console.error('Error saving availability timing:', error);
      alert('Failed to save/update availability timing. Please try again.');
    }
  };

  const addAvailabilityTiming = () => {
    setFormData({ id: '', date: '', time: '', fee: '' });
    setIsFormVisible(true);
  };

  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? styles.activeLink : '';
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('neurologistEmail');
      window.location.href = '/';
    }
  };

  return (
    <div className="main">
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

      <div className="availability-timings-container">
        <h2>Availability Timings</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Appointment Fee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availabilityTimings.map(timing => (
              <tr key={timing.id}>
                <td>{timing.date}</td>
                <td>{timing.time}</td>
                <td>{timing.fee}</td>
                <td>
                  {timing.booked === 'n' ? (
                    <>
                      <button className="update-button" onClick={() => handleUpdate(timing)}>Update</button>
                      <button className='delete-button' onClick={() => handleDelete(timing.id)}>Delete</button>
                    </>
                  ) : (
                    <span>Appointment Booked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='add-button' onClick={addAvailabilityTiming}>Add Availability Timing</button>

        {isFormVisible && (
          <div className="form-container">
            <h3>{formData.id ? 'Update' : 'Add'} Availability Timing</h3>
            <form onSubmit={handleSubmit}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                min={getTodayDate()}
                required
              />
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
              <label>Appointment Fee:</label>
              <input
                type="text"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                required
              />
              <div className="form-buttons">
                <button className='add-button' type="submit">{formData.id ? 'Update' : 'Add'} Timing</button>
                <button className='delete-button' onClick={() => setIsFormVisible(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailabilityTimings;
