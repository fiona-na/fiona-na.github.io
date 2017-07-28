//Event reducer with a default state of empty events
//and no event selected

//set default state
const initialState = {
  events: [],
  loading: false,
  selectedEvent: null,
  filter: '',
  searchStrng: ''
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EVENT_DATA_LOADING':
      //the state can know when its loading events
      return {
        ...state,
        loading: true
      };
    case 'GET_EVENT_DATA_RECEIVED':
      //finish loading and put events into state
      return {
        ...state,
        loading: false,
        events: action.data,
        selectedEvent: null
      };
    case 'GET_EVENT_DATA_ERROR':
      //log the errors
      console.log('Error getting data:', action.data)
      return state;
    case 'SET_EVENT_INFO':
      //set selected event info for sidebar
      return {
        ...state,
        selectedEvent: action.data
      };
    case 'SET_TYPE_FILTER':
      //checks to see if event in sidepanel is correct type,
      //if not, clear sidepanel
      if (state.selectedEvent && action.data && state.selectedEvent.type !== action.data) {
        return {
          ...state,
          filter: action.data,
          selectedEvent: null
        };
      } else {
        //updates filter in store
        return {
          ...state,
          filter: action.data
        };
      }
    case 'SET_SEARCH_FILTER':
      //set seacrh filter string to be used in
      //events component for live-filtering
      return {
        ...state,
        searchString: action.data
      };
    default:
      return state;
  }
};