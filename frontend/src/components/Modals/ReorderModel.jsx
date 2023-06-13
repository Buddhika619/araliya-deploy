import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ReorderModel({ showModal, handleClose, id }) {
  console.log(id);
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveDate = async () => {
    try {
      setLoading(true);
    //   const { data } = await axios.get(
    //     `/api/distance?lat=${location.lat}&lng=${location.long}`
    //   );

      setLoading(false);
    } catch (error) {
      toast.error("Faild to fetch location");

      setLoading(false);
    }
    setQuantity("");
    setEmail("");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make an Order Mail</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ background: "skyblue" }}>
        <label className="formLabel">Supplier Email</label>
        <input
          className="formInputName"
          type="text"
          id="materialId"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="formLabel">Qty</label>
        <input
          className="formInputName"
          type="number"
          id="supplierId"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveDate}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReorderModel;
