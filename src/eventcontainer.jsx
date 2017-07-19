import React, { Component } from 'react';
import Event from './event.jsx'
import { connect } from 'react-redux';

//Grab events and loading info from store
@connect((state) => {
    return {
      events: state.event.events,
      loading: state.event.loading
    };
  })

export default class EventContainer extends Component {
  render() {
    const { events } = this.props;

    //check if events exists if it does,
    //map through each one and print it,
    //otherwise tell user we are loading
    return (
      <div className="event-container">
        {events
        ? <div>
          {events.map((event) =>
            <Event event={event} key={event.id} handleClick={this._handleClick}/>
          )}
          </div>
        : <p>events loading</p>
        }
      </div>
      )
  }

  //function handles clicks by setting sidebar info
  _handleClick = (event) => {
    this.props.dispatch({type: 'SET_EVENT_INFO', data: event})
  }
}
