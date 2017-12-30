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
  updateEvent = () => {
    this.props.dispatch({type: 'UPDATE_EVENT', data: this.props.event._id});
  }

  //check if there is an event selected,
  //if none display appropriate message
  //else display event info
  render() {
    const { event } = this.props;
    return (
      <div className="event-info">
        {
          event
          ? <div className="event-details">
              <h1>{event.name}</h1>
              <h2>{event.isOpen ? 'Opened!' : 'Unopen..'}</h2>
              <p className="desc-text">{event.attending ? 'Attending!' : 'Not attending'}</p>
              <div className="tags">
                <button className="delete-btn" onClick={this.updateEvent}>
                  Update
                </button>
                <p className="id-tag">Service ID: {event._id}</p>
              </div>
            </div>
          : <p className="no-event">No Event Selected</p>
        }
      </div>
    );
  }
}
