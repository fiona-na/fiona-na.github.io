import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './redux';
import { apiMiddleware } from './redux/apimiddleware';
import EventContainer from './events/eventcontainer.jsx';
import EventInfo from './events/eventinfo.jsx';
import EventFormModal from './modal/eventformmodal.jsx';

//creating store using combined reducer and custom api middleware
const store = createStore(reducer, applyMiddleware(apiMiddleware));

//dispatch get event data to load up events from backend on load
store.dispatch({type: 'GET_EVENT_DATA'});

export default class App extends Component {

  //set default modal state to closed
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      searchString: '',
      inviteeName: ''
    };
  }

  //dispatch type filter and search filter values
  //to store to access them from within events.jsx
  //for live-rendering of events upon typing
  _handleFilterChange (event) {
    const filter = event.target.value;
    this.setState({filter: filter});
    store.dispatch({type: 'SET_TYPE_FILTER', data: filter});
  }

  _handleSearchChange (event) {
    const searchString = event.target.value;
    this.setState({searchString: searchString});
    store.dispatch({type: 'SET_SEARCH_FILTER', data: searchString});
  }

  _clearSearch (event) {
    this.setState({searchString: ''});
    this.setState({inviteeName: ''});
    store.dispatch({type: 'SET_SEARCH_FILTER', data: ''});
  }

  updateName (name) {
    this.setState({inviteeName: name.target.value});
  }

  addInvitee () {
    store.dispatch({type: 'ADD_INVITEE', data: this.state.inviteeName})
  }

  //provide store to all components, and render 3 main
  //components, Event container, Event info Sidebar,
  //and event form modal
  render() {
    const { inviteeName, filter, searchString } = this.state;
    return (
      <Provider store={store}>
        <div className="page">
          <div className="header">
            <h1 className="page-title">Fiona-Na</h1>
            <div className="header-form">
              <div className="input-group">
                <input
                  placeholder="Name"
                  value={inviteeName}
                  onChange={(name) => this.updateName(name)}
                />
                <span className="input-group-btn">
                  <button onClick={() => this.addInvitee()}>Add</button>
                </span>
                <input
                  className="form-control"
                  placeholder="Search"
                  type="text"
                  value={searchString}
                  onChange={this._handleSearchChange.bind(this)}
                  ref={(input) => {this.searchField = input}}
                />
                <span className="input-group-btn">
                  <button onClick={this._clearSearch.bind(this)}>Clear</button>
                </span>
              </div>
            </div>
          </div>
          <div className="flex-container">
            <EventContainer/>
            <EventInfo/>
          </div>
        </div>
      </Provider>
    );
  }
}
