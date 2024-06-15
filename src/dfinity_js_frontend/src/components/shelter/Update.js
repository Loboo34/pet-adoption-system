import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const UpdateAppointment = ({ update }) => {
  const [serviceName, setServiceName] = useState("");

  const [time, setTime] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => serviceName && time;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        update
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>updateAppointment</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputServiceName"
              label="Service Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                value={serviceName}
                onChange={(e) => {
                  setServiceName(e.target.value);
                }}
                placeholder="Enter service name"
              />
            </FloatingLabel>

            <FloatingLabel controlId="inputTime" label="Time" className="mb-3">
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter time"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="dark"
              disabled={!isFormFilled()}
              onClick={() => {
                update(time, serviceName);
                handleClose();
              }}
            >
              updateAppointment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

UpdateAppointment.propTypes = {
  update: PropTypes.func.isRequired,
};
export default UpdateAppointment;
