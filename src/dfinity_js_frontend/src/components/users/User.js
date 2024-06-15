import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Stack } from "react-bootstrap";

//import UpdateUser from "./UpdateUser";

const User = ({ client }) => {
  const { id, name, phoneNumber, email, address, appointment } = client;

  return (
    <Col>
      <Card className=" ">
        <Card.Body className="d-flex  flex-column">
          <Stack>
            <div className="">
            {id}
            </div>
            <Card.Title>Name: {name}</Card.Title>
          </Stack>
          <Card.Text>Phone No: {phoneNumber}</Card.Text>
          <Card.Text>Email: {email}</Card.Text>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Appointment:{appointment}</Card.Text>
         
        </Card.Body>
      </Card>
    </Col>
  );
};

User.propTypes = {
  client: PropTypes.object.isRequired,
};

export default User;
