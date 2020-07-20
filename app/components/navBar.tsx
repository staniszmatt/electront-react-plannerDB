import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './navBar.css';

export default function Nav() {
  return (
    <div className={styles.container}>
      <Link to={routes.CUSTOMER}>
        <button type="button">CUSTOMER</button>
      </Link>
      {/**
        TODO: Hiding for now until next page setup is ready.
      <Link to={routes.HOME}>
        <button type="button">HOME</button>
      </Link>
      <Link to={routes.HOME}>
        <button type="button">HOME</button>
      </Link>
      <Link to={routes.HOME}>
        <button type="button">HOME</button>
      </Link>
      <Link to={routes.HOME}>
        <button type="button">HOME</button>
      </Link>
      <Link to={routes.HOME}>
        <button type="button">HOME</button>
      </Link>
      */}
    </div>
  );
}
