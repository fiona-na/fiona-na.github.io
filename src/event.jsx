import React, { Component } from 'react';

class Event extends Component {
  render() {
  const { type, serviceId, icon, timestamp, title, data } = this.props.event;
    return (
      <div className="event-box">
        <h2>{title}</h2>
        <h4>{type}</h4>
        <img src={icon} height="70" width="70"/>
      </div>
      )
  }
}

export default Event