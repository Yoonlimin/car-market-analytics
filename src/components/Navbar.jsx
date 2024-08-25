import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Ensure this path is correct

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>Car Market</div>
      <div className={styles.links}>
        <Link to="/" className={styles.navLink}>Dashboard</Link>
        <Link to="/highlighted" className={styles.navLink}>Highlighted Cars</Link>
      </div>
    </div>
  );
};

export default Navbar;