//Event reducer with a default state of empty events and no event selected

export const eventReducer = (state = { events: [], loading: true, selectedEvent: null }, action) => { //default state
  switch (action.type) {
    case 'GET_EVENT_DATA_LOADING':
      //the state can know when its loading events
      return {
        ...state,
        loading: true,
      };
    case 'GET_EVENT_DATA_RECEIVED':
      //finish loading and put events into state
      return {
        loading: false,
        events: action.data,
      };
    case 'GET_EVENT_DATA_ERROR':
      //log the errors
      console.log('Error getting data:', action.data)
      return state;
    case 'SET_EVENT_INFO':
      //set selected event info for sidebar
      return {
        ...state,
        selectedEvent: action.data,
      }
    default:
      return state;
    }
};