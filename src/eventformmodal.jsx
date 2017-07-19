import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import SyncValidationForm from './reduxform.jsx'

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
    console.log("results here", JSON.stringify(values, null, 2))
  }

}

export default EventFormModal
