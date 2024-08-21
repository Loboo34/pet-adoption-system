import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import coverImg from "../../assets/img/sandwich.jpg";
import imageCompression from "browser-image-compression";

const AddPet = ({ createPet, addImage}) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [petImage, setPetImage] = useState("");

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const img = new Image();
//       img.src = reader.result;

//       img.onload = () => {
//         // Create a canvas element
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         // Set the canvas dimensions (desired width and height)
//         const MAX_WIDTH = 800; // Adjust as needed
//         const MAX_HEIGHT = 600; // Adjust as needed
//         let width = img.width;
//         let height = img.height;

//         // Calculate the scaling factor
//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         // Set canvas dimensions and draw the resized image
//         canvas.width = width;
//         canvas.height = height;
//         ctx.drawImage(img, 0, 0, width, height);

//         // Get the compressed image as a Base64 string
//         const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality as needed

//         // Store the compressed image string
//         setPetImage(compressedImage);
//       };
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }
// };


  const isFormFilled = () =>
    name && species && breed && gender && age && description && healthStatus && petImage;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className=" bg-blue-700 text-white ">
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
            <FloatingLabel 
            controlId="inputAge" label="Age" className="mb-3">
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
                type="text"
               // accept="image/*"
                onChange={(e) => {
                  setPetImage(e.target.value);
                }
                }
              />
            </FloatingLabel>
            {/* {petImage && (
              <div>
                <h5>Image Preview:</h5>
                <img
                  src={petImage}
                  alt="Pet Preview"
                  style={{ width: "200px" }}
                />
              </div>
            )} */}
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
               
                console.log("image being sent:", {
                  petImage});
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
 // addImage: PropTypes.func.isRequired,
};

export default AddPet;
