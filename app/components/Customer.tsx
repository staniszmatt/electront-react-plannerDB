import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Customer.css';

export default function Customer() {
  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <Link to={routes.CUSTOMER}>
          <button type="button">Add Customer</button>
        </Link>
        <Link to={routes.CUSTOMER}>
          <button type="button">Show All Customers</button>
        </Link>
      </div>
    </div>
  );
}
