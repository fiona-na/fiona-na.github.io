import React, { Component } from 'react';

//simple component, just make the individual event boxes
//takes in selected events id, and adds additional class
//to component if it is equal to self's id
export default class Event extends Component {
  render() {
    const { type, serviceid, icon, timestamp, title, data, id } = this.props.event;
    return (
      <div
        className={this.props.selected === id ? "event-box selected-event" : "event-box"}
        onClick={() => {this.props.handleClick(this.props.event)}}
      >
        <img src={icon} alt={icon} height="70" width="70"/>
        <div>
          <h2>{title}</h2>
          <h4>{type}</h4>
        </div>
        <span/>
      </div>
    );
  }
}
