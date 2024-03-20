import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import MyVerticallyCenteredModal from "./Modals/productPopUp";
import { useState } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
    backdrop-filter: blur(3px);
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const TextContainer = styled.div`
  .name {
    padding-top: 10px;
    font-weight: 500;
    font-family: "Roboto", sans-serif;
  }
  .price {
    color: #d23f57;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
  }
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  const cartHandler = () => {
    setModalShow(true);
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
      />
      <Container>
        <Circle />
        <Image src={product.image} />
        <Info>
          <Icon onClick={() => cartHandler(product._id)}>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <Link to={`/product/${product._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          {/* <Icon>
            <FavoriteBorderOutlined />
          </Icon> */}
        </Info>
      </Container>
      <TextContainer className="ps-3">
        <p className="name">{product.name}</p>
        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
        <p className="price">RS {product.price}</p>
      </TextContainer>
    </>
  );
};

export default Product;
