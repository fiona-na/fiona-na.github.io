
const API = "https://forgetful-elephant.herokuapp.com/events";

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'GET_EVENT_DATA':
      store.dispatch({type: 'GET_EVENT_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(API)
        .then(response => response.json())
        .then(data => next({
          type: 'GET_EVENT_DATA_RECEIVED', data
        }))
        .catch(error => next({
          type: 'GET_EVENT_DATA_ERROR', error
        }));
      break;

    default:
      break;
  }
};

export const reducer = (state = { events: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_EVENT_DATA_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_EVENT_DATA_RECEIVED':
      console.log('action data here',action.data)
      return {
        loading: false,             // set loading to false
        events: action.data,
      };
    case 'GET_EVENT_DATA_ERROR':
      return state;
    default:
      return state;
    }
};