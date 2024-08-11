import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import coverImg from "../../assets/img/sandwich.jpg";
import imageCompression from "browser-image-compression";

const AddPet = ({ createPet }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [petImage, setPetImage] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const options = {
      maxSizeMB: 1, // Compress to under 1 MB
      maxWidthOrHeight: 1024, // Resize if necessary
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const base64 = await convertToBase64(compressedFile);
      setPetImage(base64); // Save the compressed base64 string
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const isFormFilled = () =>
    name && species && breed && gender && age && description && healthStatus && petImage;

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
              label="Gender"
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
            <FloatingLabel controlId="inputAge" label="Age" className="mb-3">
              <Form.Control
                type="text"
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
              controlId="petImage"
              label="Pet Image"
              className="mb-3"
            >
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </FloatingLabel>
            {petImage && (
              <div>
                <h5>Image Preview:</h5>
                <img
                  src={petImage}
                  alt="Pet Preview"
                  style={{ width: "200px" }}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={!isFormFilled()}
              onClick={() => {
                createPet({
                  name,
                  species,
                  breed,
                  gender,
                  age,
                  description,
                  healthStatus,
                  petImage,
                });
                handleClose();
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
  createPet: PropTypes.func.isRequired,
};

export default AddPet;
