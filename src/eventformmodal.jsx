import React, { Component } from 'react';
import ReactModal from 'react-modal';
import SyncValidationForm from './reduxform.jsx';
import { connect } from 'react-redux';

//connect to store so we can use dispatch
@connect()

//uses redux form for simple form state management,
//and front end field validations
export default class EventFormModal extends Component {
  render() {
    const { open, handleClose, handleOpen } = this.props;
    return (
      <ReactModal
        contentLabel="Create Event"
        isOpen={open}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
      >
        <SyncValidationForm onSubmit={this.showResults}/>
      </ReactModal>
    )
  }

  //handles form submission, will dispatch action to make
  //POST request
  showResults = (values) => {
    //Assign new event a timestamp with current time
    //and default icon if none given
    const newEvent = Object.assign(values, {timestamp: Date.now().toString()})
    if (!newEvent.icon) {
      newEvent.icon = 'https://cdn3.iconfinder.com/data/icons/UltimateGnome/256x256/emblems/emblem-generic.png'
    }
    this.props.handleClose();   //closes modal upon submission
    this.props.dispatch({type: 'ADD_NEW_EVENT', data: values})
  }

}
