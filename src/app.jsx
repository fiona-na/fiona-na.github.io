import React, { Component } from 'react';
import Event from './event.jsx';
import EventForm from './eventform.jsx';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const reducer = (state = {}, action) => {

}

const store = createStore(reducer, {})

class App extends Component {

  postEvent() {
    fetch("https://forgetful-elephant.herokuapp.com/events",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          type: "Meetup",
          timestamp: "now",
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
          <p>cool</p>
          <button onClick={this.postEvent}>Post Event</button>
        </div>
      </Provider>
    );
  }
}
export default App;