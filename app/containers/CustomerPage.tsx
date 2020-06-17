import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Customer from '../components/customer/Customer';
import { listAllCustomers, requestCustomerList } from '../actions/customer';
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
      requestCustomerList
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
