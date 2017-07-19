import React, { Component } from 'react';
import Event from './event.jsx';
import EventContainer from './eventcontainer.jsx';
import EventInfo from './eventinfo.jsx';
import EventForm from './eventform.jsx';
import ReactModal from 'react-modal';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer, apiMiddleware } from './redux'

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))

store.dispatch({type: "GET_EVENT_DATA"})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  postEvent() {
    fetch("https://forgetful-elephant.herokuapp.com/events",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          type: "Meetup",
          icon: "https://cdn3.iconfinder.com/data/icons/social-media-chat-1/512/MeetUp-128.png",
          serviceId: "THL001",
          timestamp: Date.now().toString(),
          title: "Thalmic Meetup",
          data: "Come for an amazing afternoon of wearable technology fun!"
        })
      }).then((res) => {
        console.log("worked:", res)
        store.dispatch({type: "GET_EVENT_DATA"})
      })
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Hello Thalmic!</h1>
          <div className="flex-container">
            <EventContainer />
            <EventInfo />
            <ReactModal
              isOpen={this.state.modalOpen}
              shouldCloseOnOverlayClick={false}
            />
          </div>
          <button onClick={this.postEvent}>Post Event</button>
          <button onClick={() => this.setState({modalOpen: true})}>Create Event</button>
        </div>
      </Provider>
    );
  }
}
export default App;