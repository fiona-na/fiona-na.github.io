import React, { Component } from 'react';
import { connect } from 'react-redux';

//connect to store and grab
//selected event info for sidebar
@connect(
  state => ({
    event: state.event.selectedEvent,
  })
)

export default class EventInfo extends Component {

  //function for handling the delete button
  _deleteEvent = () => {
    this.props.dispatch({type: 'DELETE_EVENT_BY_ID', data: this.props.event.id})
  }

  //check if there is an event selected,
  //if none display appropriate message
  //else display event info
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
