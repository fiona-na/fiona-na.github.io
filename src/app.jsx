import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './redux/index';
import { apiMiddleware } from './redux/apimiddleware';
import EventContainer from './eventcontainer.jsx';
import EventInfo from './eventinfo.jsx';
import EventFormModal from './eventformmodal.jsx';

//creating store using combined reducer and custom api middleware
const store = createStore(reducer, applyMiddleware(apiMiddleware));

//dispatch get event data to load up events from backend on load
store.dispatch({type: 'GET_EVENT_DATA'});

export default class App extends Component {

  //set default modal state to closed
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  //handle opening and closing modal
  _handleOpenModal () {
    this.setState({ modalOpen: true });
  }

  _handleCloseModal () {
    this.setState({ modalOpen: false });
  }

  //provide store to all components, and render 3 main
  //components, Event container, Event info Sidebar,
  //and event form modal
  render() {
    const { modalOpen } = this.state;
    return (
      <Provider store={store}>
        <div>
          <h1 className="page-title">Eventy</h1>
          <button className="create-btn" onClick={this._handleOpenModal.bind(this)}>Create</button>
          <div className="flex-container">
            <EventContainer/>
            <EventInfo/>
            <EventFormModal
              open={modalOpen}
              handleOpen={this._handleOpenModal.bind(this)}
              handleClose={this._handleCloseModal.bind(this)}
            />
          </div>
        </div>
      </Provider>
    );
  }
}
