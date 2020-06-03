import React from 'react';
import './Form-Field.css';

export default props => {
  // console.log("Form Field Props", props)
  const { input, label, type='text', meta: { error, touched } } = props;

  return (
    <div className="form-container" >
    <label id="input-label"> {label} </label>
    <input className="form-field" {...input} type={type ? type : 'text'} autoComplete="off" />
    <p className="red-text darken-2" > {touched && error} </p>
  </div>
  )
}
