import React, { Component } from 'react';
import Event from './event.jsx';
import EventContainer from './eventcontainer.jsx';
import EventIndo from './eventinfo.jsx';
import EventForm from './eventform.jsx';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer, apiMiddleware } from './redux'

const store = createStore(reducer, {}, applyMiddleware(apiMiddleware))

store.dispatch({type: "GET_EVENT_DATA"})

class App extends Component {



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
      })
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Hello Thalmic!</h1>
          <EventContainer />
          <EventInfo />
          <button onClick={this.postEvent}>Post Event</button>
        </div>
      </Provider>
    );
  }
}
export default App;