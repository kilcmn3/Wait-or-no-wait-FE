const moment = require('moment');
const URL = 'http://localhost:3000';

export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_CUSTOMER_REQUEST' });
    fetch(URL + '/customers')
      .then((response) => response.json())
      .then((customers) => {
        dispatch({ type: 'ADD_CUSTOMERS', customers });
      })
      .catch((error) => console.log('Error customer', error));
  };
};

export const fetchWaitLists = () => {
  return (dispatch) => {
    fetch(URL + '/waitlists')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: 'SHOW_ALL',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      })
      .catch((error) => console.log('Error waitList', error));
  };
};

export const postCustomer = (data) => {
  console.log(data);
  return (dispatch) => {
    fetch(URL + '/customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch({
          type: 'ADD_CUSTOMER',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      });
  };
};

// fetch('http://localhost:3000/favorites')
// .then(resp => resp.json())
// .then(list => {
//     // List[Promise] -> Promise[List]
//     // loop through each of the list in favorites
//     return Promise.all(list.map(l => {
//         const {user_id, project_id, id} = l
//         // console.log(id ,"fav_id")
//         // fetch both user and projectId
//         const fetchUser = fetch(`http://localhost:3000/users/${user_id}`)
//         const fetchProject = fetch(`http://localhost:3000/projects/${project_id}`)
//         return Promise.all([fetchUser,fetchProject])
//         .then(([userJson, projectJson]) => {
//             // get the payload result in Json
//             return Promise.all([userJson.json(), projectJson.json()])
//         })
//         // aggregate the user, project inside a single object
//         .then(([user, project]) => {
//             // console.log(user, project)
//             return {
//                 id,
//                 user: { ...user },
//                 project: {...project}
//             }
//         })
//     }))

// export const postWaitList = () => {
//   let waitlist = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

//   return (dispatch) => {
//     fetch(URL + '/waitlists', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify({ waitlist }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         return dispatch({
//           type: 'SHOW_ALL',
//           customers: [],
//           waitList: data.waitlist_date,
//         });
//       });
//   };
// };
