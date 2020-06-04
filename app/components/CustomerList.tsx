import * as React from 'react';
// import { Link } from 'react-router-dom';
// import SearchForm from './forms/Search-Form';
// import routes from '../constants/routes.json';
// import styles from './Customer.css';
// import { exists } from 'fs';

export default function CustomerList (props) {
  const {
    id,
    customerActive,
    customerCodeName,
    customerGenStd,
    customerName,
    customerRsStd } = props

  console.log("sub customer props", props);

  return (
    <div className="customerRowContainer">
      <div></div>
    </div>
  );
}
