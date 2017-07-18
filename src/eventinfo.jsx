import React, { Component } from 'react';
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

class EventInfo extends Component {
  render() {
    // const { events } = this.props;
    return (
      <div className="event-info">
        Event info here
      </div>
      )
  }
}

export default EventInfo