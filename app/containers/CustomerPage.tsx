import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Customer from '../components/Customer';
import {
  listAllCustomers,
  addACustomer,
  editCustomer,
  searchACustomer
} from '../actions/customer';
import { customerStateType } from '../reducers/types';

function mapStateToProps(state: customerStateType) {
  return {
    customer: state
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      listAllCustomers,
      editCustomer,
      addACustomer,
      searchACustomer
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
