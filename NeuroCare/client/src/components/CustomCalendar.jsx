import React, { useState } from 'react';
import styles from './styles/CustomCalendar.module.css';

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day > 0 && day <= getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startDay = getStartDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button onClick={handlePreviousMonth} className={styles.navButton}>‹</button>
        <span className={styles.monthYear}>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={handleNextMonth} className={styles.navButton}>›</button>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <div key={day} className={styles.dayOfWeek}>{day}</div>
        ))}
      </div>
      <div className={styles.daysContainer}>
        {[...Array(startDay).fill(null), ...Array(daysInMonth).keys()].map((day, index) => (
          day === null ? (
            <div key={index} className={styles.day}></div>
          ) : (
            <div
              key={index}
              className={`${styles.day} ${selectedDate.getDate() === day + 1 ? styles.selected : ''} ${day + 1 === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? styles.currentDay : ''}`}
              onClick={() => handleDateClick(day + 1)}
            >
              {day + 1}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
