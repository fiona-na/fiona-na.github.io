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
    this.props.dispatch({type: 'DELETE_EVENT_BY_ID', data: this.props.event.id});
  }

  //check if there is an event selected,
  //if none display appropriate message
  //else display event info
  render() {
    const { event } = this.props;
    // const postDate = new Date(parseInt(event.timestamp, 10));
    return (
      <div className="event-info">
        {
          event
          ? <div className="event-details">
              <img
                className="side-icon"
                src={event.icon}
                width="150"
                height="150"
              />
              <h1>{event.title}</h1>
              <h2>{event.type}</h2>
              <p className="desc-text">{event.data}</p>
              <div className="tags">
                <button className="delete-btn" onClick={this._deleteEvent}>
                  Delete
                </button>
                <p className="id-tag">Service ID: {event.serviceid}</p>
                <p className="date-tag">Posted: {new Date(parseInt(event.timestamp, 10)).toString()}</p>
              </div>
            </div>
          : <p className="no-event">No Event Selected</p>
        }
      </div>
    );
  }
}
