import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";

const PetInfo = ({ pet }) => {
  const {
    id,
    name,
    species,
    breed,
    gender,
    description,
    age,
    image,
    healthStatus,
    adoptionStatus,
  } = pet;

  const servicePrincipal = window.auth.principalText;

  return (
    <div>
      <div>
        <img src={image} alt={name} className="img-fluid" />
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

PetInfo.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default PetInfo;
