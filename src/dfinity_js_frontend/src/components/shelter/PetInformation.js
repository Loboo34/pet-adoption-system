import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import UpdatePetInfo from "./UpdatePetInfo";
const PetInformation = ({ pet, update }) => {
  const {
    id,
    name,
    breed,
    gender,
    description,
    age,
    //image,
    healthStatus,
  adoptionStatus,
  } = pet;

  const servicePrincipal = window.auth.principalText;

  const triggerUpdate = (healthStatus, age) => {
    update({ id, healthStatus, age });
  }

  return (
    <div>
      <UpdatePetInfo update={triggerUpdate} />
      <div>
        <img src={HUSKY1} alt={name} className="img-fluid" />
        <div>
          <h1>Meet {name}</h1>
          <span>
            <p>{breed}</p>
            <p>{gender}</p>
            <p>{age}</p>
          </span>
        </div>
        <div>
            <h1>About</h1>
            <span>Health
                <p>{healthStatus}</p>
            </span>
            <span>Description
                <p>{description}</p>
            </span>
        </div>
        <button>Adopt</button>
      </div>
    </div>
  );
};

PetInformation.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default PetInformation;
