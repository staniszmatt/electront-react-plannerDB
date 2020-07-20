import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import CustomerPage from './containers/CustomerPage';
import PartNumbersPage from './containers/PartNumbersPage'
import App from './containers/App';
import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';
import Nav from './components/navBar';
import ErrorModal from './components/modals/ModalPage';

export default function Routes() {
  return (
    <App>
      <ErrorModal />
      <Nav />
      <Switch>
        <Route path={routes.CUSTOMER} component={CustomerPage} />
        <Route path={routes.PARTNUMBERS} component={PartNumbersPage} />
        <Route path={routes.HOME} component={HomePage} />
        {/**   <Route path={routes.COUNTER} component={CounterPage} />  */}
      </Switch>
    </App>
  );
}
