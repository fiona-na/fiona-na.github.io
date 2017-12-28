//API middleware, all actions that make request to
//API backend goes here

const API = 'https://morning-reaches-22096.herokuapp.com/events';

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'GET_EVENT_DATA':
      //Goto action for loading up all the events from
      //backend
      store.dispatch({type: 'GET_EVENT_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(`${API}.json`)
        .then(res => res.json())
        .then(data => next({
          type: 'GET_EVENT_DATA_RECEIVED', data
        }))
        .catch(error => next({
          type: 'GET_EVENT_DATA_ERROR', error
        }));
      break;
    case 'DELETE_EVENT_BY_ID':
      //Make DELETE request then, dispatches GET_EVENT_DATA
      //to reload page with new event list
      fetch(`${API}/${action.data}`, {method: 'DELETE'})
        .then(() => {
          store.dispatch({type:'GET_EVENT_DATA'});
        });
      break;
    case 'ADD_NEW_EVENT':
      //Same as delete, make POST request, and the refetch the
      //new list of events
      fetch(API,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(action.data)
        }).then(() => {
          store.dispatch({type: 'GET_EVENT_DATA'});
        });
      break;
    default:
      break;
  }
};