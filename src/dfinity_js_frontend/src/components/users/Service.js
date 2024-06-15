import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";
import Book from "../shelter/BookApointment";

const Cservice = ({ service, book }) => {
  const { id, name, description, price } = service;

  const triggerBook = (clientId, time) => {
    book({
      clientId,
      time,
      serviceId: id,
    });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <>
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
          <Book book={triggerBook} />
        </Card.Body>
      </Card>
    </Col>
  );
};

Cservice.propTypes = {
  service: PropTypes.object.isRequired,
};

export default Cservice;
