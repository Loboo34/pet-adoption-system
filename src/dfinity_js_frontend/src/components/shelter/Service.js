import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

const Pservice = ({ service }) => {
  const { id, name, description, price } = service;

  const servicePrincipal = window.auth.principalText;

  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <>
            <span className="text-blue-700">
              Service ID:
              <p className="text-black">{id}</p>
            </span>
           <span className="text-blue-700 flex space-x-3">
              Service Name:
              <p className="text-black">{name}</p>
            </span>

            <span className="text-blue-700 flex space-x-3">
              Description:
              <p className="text-black">{description}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Price:
              <p className="text-black">{price}</p>
            </span>
          </>
        </Card.Body>
      </Card>
    </Col>
  );
};

Pservice.propTypes = {
  service: PropTypes.object.isRequired,
};

export default Pservice;
