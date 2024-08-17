import React, { useState } from "react";
import { uploadImage, createPet } from "../../utils/petAdoption"; // Assuming you have these functions
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
const PetInputForm = () => {
 const [petData, setPetData] = useState({
   name: "",
   species: "",
   breed: "",
   gender: "",
   age: "",
   description: "",
   healthStatus: "",
  
 });

 const [petImage, setPetImage] = useState(null);
 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
   const { name, value } = e.target;
   setPetData({
     ...petData,
     [name]: value,
   });
 };

 const handleImageChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     setPetImage(file);
   }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (!petImage) {
     alert("Please upload an image of the pet.");
     return;
   }

   try {
     setLoading(true);

     const petImageUrl = await uploadImage(petImage);

     await createPet({ ...petData, petImage: petImageUrl });

     alert("Pet added successfully!");
     setPetData({
       name: "",
       species: "",
       breed: "",
       gender: "",
       age: "",
       description: "",
       healthStatus: "",
    
     });
     setPetImage(null);
     console.log("data being sent:", { ...petData, petImage: petImageUrl });
   } catch (error) {
     console.error("Failed to add pet:", error);
     alert("Failed to add pet.");
   } finally {
     setLoading(false);
   }
 };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className=" bg-black text-white ">
        <i className="bi bi-plus"></i>
        <span className=" fs-6"> Add</span>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pet Name:</label>
            <input
              type="text"
              name="name"
              value={petData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Species:</label>
            <input
              type="text"
              name="species"
              value={petData.species}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={petData.breed}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={petData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={petData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
            type="text"
              name="description"
              value={petData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Health Status:</label>
            <input
              type="text"
              name="healthStatus"
              value={petData.healthStatus}
              onChange={handleChange}
              required
            />
          </div>
        
          <div>
            <label>Upload Pet Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Adding Pet..." : "Add Pet"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default PetInputForm;
