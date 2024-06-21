import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddPet = ({ save }) => {
  const [shelterId, setShelterId] = useState("");
  const [name, setName] = useState("");
 const [species, setSpecies] = useState("");
 const [breed, setBreed] = useState("");
 const [gender, setGender] = useState("");
 const [age, setAge] = useState(0);
 const [description, setDescription] = useState("");
 const [healthStatus, setHealthStatus] = useState("");
 const [image, setImage] = useState("");


  const isFormFilled = () => name && species && breed && gender && age && description && healthStatus;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add Animal</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Form>
          <Modal.Body>
            <h4>Add Animal</h4>
            <FloatingLabel
              controlId="inputShelterId"
              label="Shelter ID"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setShelterId(e.target.value);
                }}
                placeholder="Enter Shelter ID"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputName"
              label="Pet name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name of the animal"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputSpecies"
              label="Species"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setSpecies(e.target.value);
                    }}
                    placeholder="Enter species of the animal"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputBreed"
              label="Breed"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setBreed(e.target.value);
                    }}
                    placeholder="Enter breed of the animal"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputGender"
              label ="Gender"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setGender(e.target.value);
                    }}
                    placeholder="Enter animals Gender"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputAge"
              label="Age"
              className="mb-3"
            >
                <Form.Control
                    type="number"
                    onChange={(e) => {
                    setAge(e.target.value);
                    }}
                    placeholder="Enter age of the animal"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setDescription(e.target.value);
                    }}
                    placeholder="Enter description of the animal"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputHealthStatus"
              label="Health Status"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setHealthStatus(e.target.value);
                    }}
                    placeholder="Enter health status of the animal"
                />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputImage"
              label="Image"
              className="mb-3"
            >
                <Form.Control
                    type="text"
                    onChange={(e) => {
                    setImage(e.target.value);
                    }}
                    placeholder="Enter image of the animal"
                />
            </FloatingLabel>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (isFormFilled()) {
                  save({ shelterId, name, species, breed, gender, age, description, healthStatus, image});
                  handleClose();
                }
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

AddPet.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddPet;
