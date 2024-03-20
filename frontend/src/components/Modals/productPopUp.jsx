import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import Rating from "../Rating";
import {  useState } from "react";

import { useDispatch } from "react-redux";
import { addTocart } from "../../actions/cartActions";
import { toast } from "react-toastify";

const Wrapper = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media (max-width: 995px) {
    display: block;
  }
  .col1 {
    flex: 1;
    @media (max-width: 995px) {
      text-align: center;
    }
  }

  img {
    width: 350px;
  }

  .col2 {
    flex: 1;
  }

  .name {
    font-weight: 700;
    font-family: "Roboto", sans-serif;
  }

  .categoryIn {
    margin-top: -15px;
    color: #aeb4be;
    font-size: 22px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }

  .price {
    margin-top: -15px;
    color: #d23f57;
    font-size: 36px;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
  }

  .ratingIn {
    margin-top: -15px;
    margin-bottom: 10px;
  }

  .description {
    font-family: "Roboto", sans-serif;
  }

  hr {
    opacity: 0.1;
  }

  .qty {
    color: #1d1d1e;
    font-size: 22px;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .button {
    background-color: #00cc66;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    padding: 10px 25px;
    border: none;
    border-radius: 4%;
    &:hover {
      background-color: #e21133;
    }
    &:active {
      background-color: #d23f57;
    }
  }
`;

function MyVerticallyCenteredModal(props) {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addTocart(props.product._id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton className=" border-bottom-0"></Modal.Header>
      <Modal.Body>
        <Wrapper>
          <Col className="col1">
            <img src={props.product.image} />
          </Col>
          <Col className="col2">
            <h1 className="name">{props.product.name}</h1>
            <p className="categoryIn">{props.product.category}</p>
            {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
            {props.product.countInStock > 0 ? (
              <p className="price">RS {props.product.price}</p>
            ) : (
              <p className="price">SOLD OUT</p>
            )}

            <Rating
              className="ratingIn"
              value={props.product.rating}
              text={`(${props.product.numReviews})`}
            />
            <p className="description">{props.product.description}</p>

            <hr />
            {props.product.countInStock > 0 && (
              <Row>
                <Col className="qty">Qty</Col>
                <Col>
                  <Form.Select
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(props.product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            )}

            <Button
              onClick={() => {
                addToCartHandler();
                props.onHide();
                toast.success("Item Added to the Cart!");
              }}
              className="button"
              type="button"
              disabled={props.product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </Col>
        </Wrapper>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
