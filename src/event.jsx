import React, { Component } from 'react';

//simple component, just make the individual event boxes
export default class Event extends Component {
  render() {
    const { type, serviceid, icon, timestamp, title, data } = this.props.event;
    return (
      <div className="event-box" onClick={() => {this.props.handleClick(this.props.event)}}>
        <img src={icon} height="70" width="70"/>
        <div>
          <h2>{title}</h2>
          <h4>{type}</h4>
        </div>
        <span/>
      </div>
    );
  }
}
