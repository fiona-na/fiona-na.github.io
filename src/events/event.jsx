import React, { Component } from 'react';

//simple component, just make the individual event boxes
//takes in selected events id, and adds additional class
//to component if it is equal to self's id
export default class Event extends Component {
  render() {
    const { _id, name, isOpen, attending } = this.props.event;
    return (
      <div
        className={this.props.selected === _id ? "event-box selected-event" : "event-box"}
        onClick={() => {this.props.handleClick(this.props.event)}}
      >
        <div>
          <h2>{name}</h2>
          <h4>{isOpen}</h4>
        </div>
        <span/>
      </div>
    );
  }
}
