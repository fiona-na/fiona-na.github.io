import React, { Component } from 'react';
import Event from './event.jsx'
import { connect } from 'react-redux';

@connect(
  state => ({
    events: state.events,
    loading: state.loading
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_EVENT_DATA'})
  })
  )

class EventContainer extends Component {
  render() {
    const { events } = this.props;
    return (
      <div className="event-container">
        {events
        ? <div>
          {events.map((event) =>
            <Event event={event} key={event.id} handleClick={this.handleClick}/>
          )}
          </div>
        : <p>events loading</p>
        }
      </div>
      )
  }

  handleClick = (event) => {
    console.log(event)
  }
}

export default EventContainer