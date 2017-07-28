import React, { Component } from 'react';
import ReactModal from 'react-modal';
import SyncValidationForm from './reduxform.jsx';
import { connect } from 'react-redux';
import { map as ldMap } from 'lodash';

//random icon I found to use as default
const defaultIcon = 'https://lh3.googleusercontent.com/IpKJEd52l7TFnd3HkYk7pUMZUYgl0T36EuT0WN3H5VKDWixJWszqJp3JX4ShTwHbpx4=w300';

//connect to store so we can use dispatch
@connect((state) => {
  return {
    events: state.event.events
  };
})

//uses redux form for simple form state management,
//and front end field validations
export default class EventFormModal extends Component {

  _getIds (events) {
    return _.map(events, function(event) {
      return event.serviceid;
    });
  }

  render() {
    const { open, handleClose, handleOpen, events } = this.props;
    return (
      <ReactModal
        contentLabel="Create Event"
        isOpen={open}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        className={{
          base: 'modal',
          afterOpen: 'modal_after-open',
          beforeClose: 'modal_before-close'
        }}
      >
        <h1>New Event</h1>
        <button className="close-modal-btn" onClick={handleClose}>X</button>
        <SyncValidationForm serviceIds={this._getIds(events)} onSubmit={this._showResults}/>
      </ReactModal>
    );
  }

  //handles form submission, will dispatch action to make
  //POST request
  _showResults = (values) => {
    //Assign new event a timestamp with current time
    //and default icon if none given
    const newEvent = {...values, timestamp: Date.now().toString()};
    if (!newEvent.icon) {
      newEvent.icon = defaultIcon;
    }

    this.props.handleClose();   //closes modal upon submission
    this.props.dispatch({type: 'ADD_NEW_EVENT', data: newEvent});
  }

}
