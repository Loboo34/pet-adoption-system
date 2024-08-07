import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Adopt = ({ adopt }) => {
  const [userId, setUserId] = useState("");
const[userPhoneNumber, setUserPhoneNumber] = useState("");
const [address, setAddress] = useState("");
const [reasonForAdoption, setReasonForAdoption] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => userId && userPhoneNumber && address && reasonForAdoption;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        Adopt
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adopt</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputUserId"
              label="User ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                placeholder="Enter user ID"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputUserPhoneNumber"
              label="User Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setUserPhoneNumber(e.target.value);
                }}
                placeholder="Enter user phone number"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                placeholder="Enter address"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputReasonForAdoption"
              label="Reason for Adoption"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                onChange={(e) => {
                  setReasonForAdoption(e.target.value);
                }}
                placeholder="Enter reason for adoption"
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
                adopt(userId, userPhoneNumber, address, reasonForAdoption);
                handleClose();
              }}
            >
              Adopt
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Adopt.propTypes = {
  adopt: PropTypes.func.isRequired,
};
export default Adopt;
