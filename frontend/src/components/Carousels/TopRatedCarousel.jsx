import Carousel from "react-bootstrap/Carousel";
import { Button, Card, CardGroup, Col, Container } from "react-bootstrap";
import styled from "styled-components";

import Product from "../Product";

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { listTopProducts } from "../../actions/productActions";

const HeroCarousel = styled(Carousel)`
  /* margin: 0 100px 0 140px; */

  padding-bottom: 20px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const HeroCol = styled(Col)`
  /* margin: 0 100px 0 140px; */
  display: flex;
  justify-content: space-around;
`;

const TopRatedCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const {  success, products } = productTopRated;

  const products1 = [];
  const products2 = [];

  if (success) {
    for (let i = 0; i < 3; i++) {
      if (products[i]) {
        products1[i] = products[i];
      }
    }

    for (let i = 3; i < 6; i++) {
      if (products[i]) {
        products2[i] = products[i];
      }
    }
  }

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <HeroCarousel variant="dark">
      <Carousel.Item>
        <Container>
          <HeroCol sm={12}>
            {}

            {products1?.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </HeroCol>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <HeroCol>
            {products2?.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <Product product={product} />
              </Col>
            ))}
          </HeroCol>
        </Container>
      </Carousel.Item>
    </HeroCarousel>
  );
};

export default TopRatedCarousel;
