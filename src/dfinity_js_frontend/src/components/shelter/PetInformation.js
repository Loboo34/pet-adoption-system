import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import UpdatePetInfo from "./UpdatePetInfo";
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { updatePet, getAllPets as getPetList } from "../../utils/petAdoption";
const PetInformation = ({ pet }) => {
  const {
    id,
    name,
    breed,
    gender,
    description,
    age,
    petImage,
    healthStatus,
status,
  } = pet;
 

  const servicePrincipal = window.auth.principalText;

  


  const triggerUpdate = (healthStatus, age) => {
    update({ id: id, healthStatus, age });
  }

  

  return (
    <div>
      <Card>
        <Card.Img variant="top" src={HUSKY1} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <div>
            <p>Breed: {breed}</p>
            <p>Gender: {gender}</p>
            <p>Description: {description}</p>
            <p>Age: {age}</p>
            <p>Health Status: {healthStatus}</p>
            <p>Adoption Status: {status}</p>
          </div>
          <UpdatePetInfo triggerUpdate={triggerUpdate} />
        </Card.Body>
      </Card>
    </div>
  );
};

PetInformation.propTypes = {
  pet: PropTypes.object.isRequired,
 
};

export default PetInformation;
