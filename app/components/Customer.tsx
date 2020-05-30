import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Customer.css';

export default function Customer() {
  return (
    <div className={styles.container}>
      <h2>Customer page</h2>
      <Link to={routes.HOME}>Back To Home</Link>
    </div>
  );
}
