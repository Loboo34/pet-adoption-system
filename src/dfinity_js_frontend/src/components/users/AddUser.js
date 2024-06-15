import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddUser = ({ save }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
 

  const isFormFilled = () => name && email && phoneNo && address;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="d-flex"
        //style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
        <span className="fs-6">ADD user</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="User name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of user"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="email"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputPhoneNumber"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              if (isFormFilled()) {
                save({
                  name,
                  email,
                  phoneNo,
                  address,
                });
                handleClose();
              }
            }}
          >
            Save user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddUser.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddUser;
