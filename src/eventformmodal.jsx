import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import SyncValidationForm from './reduxform.jsx';
import { connect } from 'react-redux';

@connect()

class EventFormModal extends Component {
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

  showResults = (values) => {
    const newEvent = Object.assign(values, {timestamp: Date.now().toString()})
    this.props.dispatch({type: 'ADD_NEW_EVENT', data: values})
    // console.log("results here", JSON.stringify(values, null, 2))
  }

}

export default EventFormModal
