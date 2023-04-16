import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function DateModal({ showModal, handleClose,url }) {
  const [selectedDate, setSelectedDate] = useState('');
  console.log(selectedDate)

  const handleSaveDate = () => {
    if(selectedDate){
       window.open(url+'/'+selectedDate)
    }
    setSelectedDate('')
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select the date </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate((event.target.value))}
        />
       
      </Modal.Body>

      <Modal.Footer>
    
        <Button variant="primary" onClick={handleSaveDate}>
          Generate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DateModal;