import React from 'react';
import styles from './styles/Help.module.css';

const Help = () => {
  return (
    <div className={styles.container}>
      <img src="https://i.ibb.co/g3c6P1s/neurocare-logo.png" alt="Help Icon" className={styles.icon} />
      <h1 className={styles.heading}>Need Help?</h1>
      <p className={styles.paragraph}>
        Call our customer services team on the number below to speak to one of our advisors who will help you with all your needs.
      </p>
      <p className={styles.phoneNumber}>+923-041-754-605</p>
    </div>
  );
};

export default Help;
