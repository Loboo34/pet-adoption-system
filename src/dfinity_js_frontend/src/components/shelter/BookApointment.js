import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const Book = ({ book }) => {
  const [clientId, setClientId] = useState("");
  const [time, setTime] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isFormFilled = () => clientId && time;

  return (
    <>
      <Button onClick={handleShow} variant="dark" className="">
        Book
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book</Modal.Title>
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
                value={clientId}
                onChange={(e) => {
                  setClientId(e.target.value);
                }}
                placeholder="Enter user ID"
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
                book(clientId, time);
                handleClose();
              }}
            >
              Book
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

Book.propTypes = {
  book: PropTypes.func.isRequired,
};
export default Book;
