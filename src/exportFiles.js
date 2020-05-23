import AddCustForm from './components/AddCustForm';
import AddCustomer from './components/AddCustomer';
import CustomerListRow from './components/CustomerListRow';
import Header from './components/Header';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ReservationListRow from './components/ReservationsListRow';
import Searchbar from './components/Searchbar';
import WaitListRow from './components/WaitListRow';

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
} from './actions/fetchDatas';

import manageCustWaitList from './reducers/manageCustWaitList';

export {
  AddCustForm,
  AddCustomer,
  CustomerListRow,
  Header,
  Login,
  Navbar,
  Profile,
  ReservationListRow,
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
  updateCustomer,
};
