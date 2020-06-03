import * as React from 'react';
// import { Link } from 'react-router-dom';
// import SearchForm from './forms/Search-Form';
// import routes from '../constants/routes.json';
// import styles from './Customer.css';
// import { exists } from 'fs';
import { ipcRenderer } from 'electron';

export default function CustomerList (props) {

  console.log("sub customer props", props);

  // async componentDidMount(){
  //   console.log("Props passed in customer list  mount");

  //   try {
  //     const requestData = {testRequestString: "Request Customers!"};
  //     ipcRenderer.send('asynchronous-message', requestData);

  //     const customerList = await ipcRenderer.on('asynchronous-reply', (event, resp) => {
  //       console.log("getCustomer: Pull Data", resp);
  //       return resp;
  //     });
  //     this.setState({
  //       error: false,
  //       customerList: customerList
  //     })
  //   } catch {
  //     this.setState({
  //       console: true,
  //       customerList: {}
  //     })
  //   }
  // }

  return (
    <div>
      Test Return Div
    </div>
  );
}
