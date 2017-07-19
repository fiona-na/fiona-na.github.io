import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

const API = "https://forgetful-elephant.herokuapp.com/events";

export const apiMiddleware = store => next => action => {
  next(action);
  switch(action.type) {
    case 'GET_EVENT_DATA':
      console.log('getting data')
      store.dispatch({type: 'GET_EVENT_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(API)
        .then(res => res.json())
        .then(data => next({
          type: 'GET_EVENT_DATA_RECEIVED', data
        }))
        .catch(error => next({
          type: 'GET_EVENT_DATA_ERROR', error
        }));
      break;
    case 'DELETE_EVENT_BY_ID':
      fetch(`${API}/${action.data}`, {method: "DELETE"})
        .then(() => {
          store.dispatch({type:'GET_EVENT_DATA'})
        })
      break;

    default:
      break;
  }
};

const eventReducer = (state = { events: [], loading: true, selectedEvent: null }, action) => { //default state
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
      console.log('Error getting data:', action.data)
      return state;
    case 'SET_EVENT_INFO':
      return {
        ...state,
        selectedEvent: action.data,
      }
    default:
      return state;
    }
};

export const reducer = combineReducers({
  form: reduxFormReducer,
  event: eventReducer,
});


