import React from "react";
import styled from "styled-components";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  background-color: white;
  .wrapper {
    padding-top: 30vh;
    margin-bottom: -16px;
  }

  .col1 {
    margin-top: -100px;
    text-align: center;
    top: 0px;
    z-index: 999;
  }

  h1 {
    font-size: 200px;
    @media (max-width: 1000px) {
      font-size: 100px;
    }
  }

  .col2 {
    text-align: center;
  }

  img {
    @media (max-width: 1000px) {
      width: 50vw;
      margin-top: 40px;
    }
  }
`;

const NotFound = () => {
  return (
    <SidebarContainer>
      <Row className="wrapper">
        <Col s={12} className="col1">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <Link to="/">
            <Button>back to home page</Button>
          </Link>
        </Col>
        <Col s={12} className="col2">
          <img
            src="https://cdn.glitch.global/04ac2eab-7093-47ad-976f-739938dcbb74/pulp-fiction-john-travolta.gif?v=1667742225377"
            className="image"
            alt=""
          />
        </Col>
      </Row>
    </SidebarContainer>
  );
};

export default NotFound;
