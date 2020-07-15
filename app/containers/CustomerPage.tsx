import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Customer from '../components/customer/Customer';
import {
  requestCustomerList,
  customerAddPageSelected,
  handleCustomerSearchForm,
  handleCustomerAddForm,
  handleEditCustomerForm,
  handleEditCustomerSubmit
} from '../actions/customerActions';
import { customerStateType } from '../reducers/types';

function mapStateToProps(state: customerStateType) {
  return {
    customer: state.customer
  };
}

function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      requestCustomerList,
      customerAddPageSelected,
      handleCustomerSearchForm,
      handleCustomerAddForm,
      handleEditCustomerForm,
      handleEditCustomerSubmit
    },
    dispatch
  );
}
// TODO: Fix typescript, either the rules or the interface.
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
