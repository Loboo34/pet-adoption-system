import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";


const AdoptionInfo = ({ adoption  }) => {
  const { petId, petName, userName , reasonForAdoption, status } = adoption;



  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <>
            <Card.Title>
              <h4>{petName}</h4>
            </Card.Title>
            <Card.Text>
              <Stack direction="horizontal" gap={3}>
                <Badge bg="primary">Pet ID: {petId}</Badge>
                <Badge bg="secondary">User Name: {userName}</Badge>
              </Stack>
              <p>Reason for Adoption: {reasonForAdoption}</p>
              <p>Status: {status}</p>
            </Card.Text>
          </>

        </Card.Body>
      </Card>
    </Col>
  );
};


AdoptionInfo.propTypes = {
AdoptionInfo: PropTypes.object.isRequired,
};

export default AdoptionInfo;
