import React, { Component } from 'react';
import ReactModal from 'react-modal';

class EventForm extends Component {
  render() {
    const { open, handleClose, handleOpen } = this.props;
    return (
      <ReactModal
        contentLabel="Create Event"
        isOpen={open}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
      >
      Hello!
      </ReactModal>
    )
  }
}

export default EventForm
