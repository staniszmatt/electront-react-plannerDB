/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  handleEditPartNumForm,
  handlePartNumSearchForm
} from '../../../actions/partNumbersActions';
import { partNumbersStateType } from '../../../reducers/types';
import EditButton from '../../buttonFunctions/buttonClickHandler';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import styles from './partNumberList.css';

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: partNumbersStateType) {
  return {
    partnumbers: state.partnumbers
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    { handleEditPartNumForm, handlePartNumSearchForm },
    dispatch
  );
}
// Typescript to show prop is a function.
interface Props {
  handleEditPartNumForm: (partNumberName: string) => {};
  handlePartNumSearchForm: (resp: { partNumSearch: string }) => {};
  props: {
    id: number;
    partNumberName: string;
    partNumberMaterial: string;
    partNumberSerialNumberRequired: boolean;
    partNumberSetForProduction: boolean;
  };
}

function PartNumberRow(props: Props) {
  const {
    id,
    partNumberName,
    partNumberMaterial,
    partNumberSerialNumberRequired,
    partNumberSetForProduction
  } = props.props;

  const { handleEditPartNumForm, handlePartNumSearchForm } = props;
  const newID = id.toString();

  // Setup boolean to string to add to row data
  const serialNumReq = booleanToStringYesNo(partNumberSerialNumberRequired);
  const active = booleanToStringYesNo(partNumberSetForProduction);

  const handleEditButton = () => {
    handleEditPartNumForm(partNumberName);
  };

  const handleClickDisplayPartNumberBtn = () => {
    const resp = {
      partNumSearch: partNumberName
    };
    handlePartNumSearchForm(resp);
  };

  return (
    <tr className={styles['t-row']} id={newID}>
      <td>
        <button type="button" onClick={handleClickDisplayPartNumberBtn}>
          {partNumberName}
        </button>
      </td>
      <td>{partNumberMaterial}</td>
      <td>{serialNumReq}</td>
      <td>{active}</td>
      <td>
        <EditButton buttonName="EDIT" ClickHandler={handleEditButton} />
      </td>
    </tr>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PartNumberRow);
