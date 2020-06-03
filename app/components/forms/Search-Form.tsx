import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './Form-Field';

const SearchForm = props =>{
  const { handleSubmit, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field label="Search Field" component={Input} name="searchItem" type="text" />
    </form>
  )
}

function validate(values){
  const {SearchField} = values;
  const errors = {};
  console.log("Validate, search values", values);
  if (!SearchField) {
    errors.SearchField = 'Search was Empty';
  }

  return errors;
}

export default reduxForm({
  form: 'NewSearch',
  validate: validate
})(SearchForm);
