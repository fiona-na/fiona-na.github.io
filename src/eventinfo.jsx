import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    event: state.event.selectedEvent,
  })
  )

class EventInfo extends Component {

  _deleteEvent = () => {
    this.props.dispatch({type: 'DELETE_EVENT_BY_ID', data: this.props.event.id})
  }

  render() {
    const { event } = this.props;
    return (
      <div className="event-info">
        {event
          ? <div className="event-details">
              <h1>{event.title}</h1>
              <p>{event.data}</p>
              <button onClick={this._deleteEvent}>
                Delete
              </button>
            </div>
          : <p>No event Selected</p>
        }
      </div>
      )

  }
}

export default EventInfo