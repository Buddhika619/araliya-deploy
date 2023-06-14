import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function DateModal({ showModal, handleClose, url }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log(selectedDate);

  const handleSaveDate = () => {
    if (selectedDate && endDate && (selectedDate < endDate)) {
      window.open(url + "/" + selectedDate + 'x' + endDate);
    }
    setSelectedDate("");
    setEndDate("");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select the date </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <label className="formLabel">From</label>
        <input
          style={{ border: "2px solid limegreen" }}
          className="formInputName"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          required
        />

        <label className="formLabel">To</label>
        <input
          style={{ border: "2px solid limegreen" }}
          className="formInputName"
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
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
