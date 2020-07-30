/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import FormRadioInput from '../../forms/formRadioInput';
import FormDropDown from '../../forms/formDropDown';
import FormBtn from '../../buttonFunctions/buttonClickHandler';
import '../../forms/formInput.css';
import styles from './partNumberEditPage.css';
import getMaterialList from '../../../lists/materialList';

interface FormProps {
  props: {
    singlePartNumber: {};
  };
  partNumberMaterial: string | null;
  partNumberName: string | null;
  partNumberSerialNumberRequired: boolean | null;
  partNumberSetForProduction: boolean | null;
}

interface DispatchProps {
  onSubmit: () => {};
  props: {
    singlePartNumber: {
      partNumberMaterial: string;
      partNumberName: string;
      partNumberSerialNumberRequired: boolean;
      partNumberSetForProduction: boolean;
    };
  };
}

interface CheckRadioState {
  partNumberSerialNumberRequired: boolean;
  partNumberSetForProduction: boolean;
}

function toUpperCase(value: string) {
  return value && value.toUpperCase();
}

const PartNumberEditFormPage = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  // Preset the value for the customer name only.
  // The disabled no-param-reassign was disabled, From what I can tell we are allowed to reassign the initial values for redux-form here.
  // eslint-disable-next-line no-param-reassign

  const [
    checkRadioState,
    setCheckRadioState
    // eslint-disable-next-line react/destructuring-assignment
  ] = useState<
    | CheckRadioState
    | {
        partNumberSerialNumberRequired: boolean;
        partNumberSetForProduction: boolean;
      }
  >(props.props.singlePartNumber);

  const { partNumberMaterial, partNumberName } = props.props.singlePartNumber;
  props.initialValues.partNumberName = partNumberName;
  const materialType = getMaterialList();
  const { handleSubmit, onSubmit } = props;

  const radioButtonCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Setting radio button selection with switch of each radio button type
    let setBoolean = false;

    if (event.target.value === 'yes') setBoolean = true;

    switch (event.target.name) {
      case 'partNumberSerialNumberRequired':
        setCheckRadioState({
          ...checkRadioState,
          partNumberSerialNumberRequired: setBoolean
        });
        break;
      case 'partNumberSetForProduction':
        setCheckRadioState({
          ...checkRadioState,
          partNumberSetForProduction: setBoolean
        });
        break;
      default:
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-main-container']}
    >
      <div>
        <Field
          label="Part Number:"
          format={toUpperCase}
          component={FormInput}
          name="partNumberName"
          type="text"
          defaultValue={partNumberName}
          disabled={true}
        />
        <Field
          label="Material Type:"
          name="partNumberMaterial"
          component={FormDropDown}
          type="select"
          data={materialType}
          defaultValue={partNumberMaterial}
        />
        <label>
          Serial Number Required:
          <div>
            <label>
              Yes
              <Field
                name="partNumberSerialNumberRequired"
                component={FormRadioInput}
                type="radio"
                value="yes"
                checkedValue={checkRadioState.partNumberSerialNumberRequired}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="partNumberSerialNumberRequired"
                component={FormRadioInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.partNumberSerialNumberRequired}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
        <label>
          Approved for Production:
          <div>
            <label>
              Yes
              <Field
                name="partNumberSetForProduction"
                component={FormRadioInput}
                type="radio"
                value="yes"
                checkedValue={checkRadioState.partNumberSetForProduction}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="partNumberSetForProduction"
                component={FormRadioInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.partNumberSetForProduction}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
      </div>
      <div>
        <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'partNumberEditForm',
  destroyOnUnmount: false,
  initialValues: {
    partNumberMaterial: null,
    partNumberName: null,
    partNumberSerialNumberRequired: null,
    partNumberSetForProduction: null
  }
})(PartNumberEditFormPage);
