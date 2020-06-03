import React from 'react'
import Customer from '../components/Customer';

export default function CustomerPage() {
  return <Customer />;
}

// import { bindActionCreators, Dispatch } from 'redux';
// import { connect } from 'react-redux'
// import Customer from '../components/Customer';
// import { showAllCustomers, addCustomer } from '../actions/customer'; //TODO: Setup customer actions;
// import { customerStateType } from '../reducers/customerTypes' //TODO: Setup Customer types

// function mapStateToProps(state: customerStateType) {
//   return {
//     customer: state.customer
//   }
// }
// //TODO: Setup dispatch file with customer
// function mapDispatchToProps(dispatch: Dispatch) {
//   return bindActionCreators(
//     {
//       showAllCustomers,
//       addCustomer
//       // searchCustomer
//     },
//     dispatch
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Customer);
