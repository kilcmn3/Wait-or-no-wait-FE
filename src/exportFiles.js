import AddCustForm from './components/AddCustForm';
import AddCustomer from './components/AddCustomer';
import CustomerListRow from './components/CustomerListRow';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ReservationListRow from './components/ReservationsListRow';
import SignUp from './components/SignUp';
import Searchbar from './components/Searchbar';
import ReservationsListRow from './components/ReservationsListRow';
import WaitListRow from './components/WaitListRow';

import AuthContainer from './containers/AuthContainer';
import CustomersContainer from './containers/CustomersContainer';
import MainContainer from './containers/MainContainer';
import WaitListContainer from './containers/WaitListContainer';

import {
  addCustomer,
  fetchCustomers,
  fetchWaitLists,
  patchCustWaitlist,
  postCustomer,
  searchWaitLists,
  updateCustomer,
} from './actions/actionsControl';

import manageCustWaitList from './reducers/manageCustWaitList';

export {
  AddCustForm,
  AddCustomer,
  AuthContainer,
  CustomerListRow,
  Header,
  Login,
  Logout,
  Navbar,
  Profile,
  ReservationListRow,
  SignUp,
  Searchbar,
  WaitListRow,
  CustomersContainer,
  MainContainer,
  WaitListContainer,
  addCustomer,
  fetchCustomers,
  fetchWaitLists,
  manageCustWaitList,
  patchCustWaitlist,
  postCustomer,
  searchWaitLists,
  ReservationsListRow,
  updateCustomer,
};
