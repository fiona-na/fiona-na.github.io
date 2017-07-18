import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    event: state.selectedEvent,
  })
  )

class EventInfo extends Component {
  render() {
    const { event } = this.props;
    return (
      <div className="event-info">
        {event
          ? <div class="event-details">
              <h1>{event.title}</h1>
              <p>{event.data}</p>
            </div>
          : <p>No event Selected</p>
        }
      </div>
      )
  }
}

export default EventInfo