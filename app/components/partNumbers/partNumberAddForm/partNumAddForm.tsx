/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import FormDropDown from '../../forms/formDropDown';
import FormTextArea from '../../forms/formTextArea';
import FormYesNo from '../../forms/formYesNo';
import FormBtn from '../../buttonFunctions/buttonClickHandler';
import styles from './partNumAddForm.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {}
interface DispatchProps {
  onSubmit: () => {};
}

function toUpperCase(value: string) {
  return value && value.toUpperCase();
}

function charCheck(value: string) {
  let changeCharString = value;
  // Disabled pretty checks here, need to keep the \ and quotes the way they are
  changeCharString = changeCharString.replace(/[`]/g, '\"').replace(/[']/g, '\"').replace(/["]/g, '\"');
  return changeCharString;
}

const PartNumAddFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;

  const materialType = [
    'INCONEL',
    'ALUMINUM',
    'TITANIUM',
    'STAINLESS'
  ]

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-main-container']}
    >
      <div>
        <Field
          label="Part Number:"
          component={FormInput}
          name="partNumber"
          type="text"
          format={toUpperCase}
        />
        <Field
          label="Material Type:"
          name="materialType"
          component={FormDropDown}
          type="select"
          data={materialType}
        />
        <Field
          label="Serial Number Required:"
          name="partSerialNumReq"
          component={FormYesNo}
          type="radio"
        />
        <Field
          label="Set for Production:"
          name="partSetForProduction"
          component={FormYesNo}
          type="radio"
        />
        <Field
          label="Part Number Notes:"
          name="partNumberNote"
          component={FormTextArea}
          rows="15"
          normalize={charCheck}
        />
      </div>
      <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
    </form>
  );
};

interface Values {
  partNumber: string;
  materialType: string;
  partSerialNumReq: string;
  partSetForProduction: string;
}

function validate(values: Values) {
  const {
    partNumber,
    materialType,
    partSerialNumReq,
    partSetForProduction
  } = values;
console.log("validation, values:", values);
  const errors: any = {};

  if (!partNumber) {
    errors.partNumber = 'Please Enter a Part Number!';
  }
  if (partNumber) {
    if (partNumber.length > 32) {
      errors.partNumber = 'Part Number is too long!';
    }
  }
  if (!materialType) {
    errors.materialType = 'Please Enter a Material Type!';
  }

  if (!partSerialNumReq) {
    errors.partSerialNumReq = 'Please Select if Part Requires a Serial Number!';
  }
  if (!partSetForProduction) {
    errors.partSetForProduction = 'Please Select if Approved for Production!';
  }
  return errors;
}

export default reduxForm<FormProps, DispatchProps>({
  form: 'partNumberAddForm',
  validate,
  destroyOnUnmount: false
})(PartNumAddFormComponent);
