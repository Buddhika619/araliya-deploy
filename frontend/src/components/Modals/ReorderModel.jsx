import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { toast } from "react-toastify";

import axios from "axios";

function ReorderModel({ showModal, handleClose, data, token, product, type }) {
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    // dispatch(viewSingleSupplier(data.row.supplier));
  }, []);

  // console.log(suppliers);

  const handleSaveDate = async () => {
    if (quantity) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post(
          `/api/supplier/mail`,
          { email: data.email, product, quantity, type },
          config
        );
        toast.success(`Order email sent`);
      } catch (error) {
        toast.error("Faild to send the email");
      }
      setQuantity("");
      setEmail("");
      setError(false);
      handleClose();
    } else {
      setError(true);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Make an Order Mail</Modal.Title>
      </Modal.Header>

      {data.email ? (
        <>
          <Modal.Body>
            <label className="formLabel">Supplier Email*</label>
            <input
              style={{ border: "2px solid limegreen" }}
              className="formInputName"
              type="text"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={data.email}
              readonly
              required
            />

            <label className="formLabel">Qty*</label>
            <input
              style={{ border: "2px solid limegreen" }}
              className="formInputName"
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            {error && (
              <p
                style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
              >
                **Fill all fields**
              </p>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveDate}>
              Send
            </Button>
          </Modal.Footer>
        </>
      ) : (
        <Modal.Body>
          <label className="formLabel">No Email Address</label>
        </Modal.Body>
      )}
    </Modal>
  );
}

export default ReorderModel;
