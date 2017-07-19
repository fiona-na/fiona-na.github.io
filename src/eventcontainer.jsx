import React, { Component } from 'react';
import Event from './event.jsx'
import { connect } from 'react-redux';

@connect((state) => {
    return {
      events: state.event.events,
      loading: state.event.loading
    };
  })

class EventContainer extends Component {
  render() {
    const { events } = this.props;
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

  _handleClick = (event) => {
    // console.log(event)
    this.props.dispatch({type: 'SET_EVENT_INFO', data: event})
  }
}

export default EventContainer