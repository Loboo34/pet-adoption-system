import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Badge, Stack } from "react-bootstrap";


const Appointment = ({ appointmentInfo  }) => {
  const { serviceId, serviceName, clientName , clientPhoneNumber, time } = appointmentInfo;



  return (
    <Col md={4} className="mb-4">
      <Card className=" position-relative">
        <Card.Body>
          <>
            <span className="text-blue-700">
              Service ID:
              <p className="text-black">{serviceId}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Service Name:
              <p className="text-black">{serviceName}</p>
            </span>

            <span className="text-blue-700 flex space-x-3">
              Client Name:
              <p className="text-black">{clientName}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Client Phone No:
              <p className="text-black">{clientPhoneNumber}</p>
            </span>
            <span className="text-blue-700 flex space-x-3">
              Time:
              <p className="text-black">{time}</p>
            </span>
          </>

        </Card.Body>
      </Card>
    </Col>
  );
};


Appointment.propTypes = {
  appointmentInfo: PropTypes.object.isRequired,
};

export default Appointment;
