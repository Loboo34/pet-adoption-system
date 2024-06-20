import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import HUSKY1 from "../../assets/images/husky1.jpg";

const Pet = ({ pet }) => {
  const {  name } = pet;

  const servicePrincipal = window.auth.principalText;

  return (
    <div className="">
      <img src={HUSKY1} alt={name} className="img-fluid" />
      <div>{name}</div>
    </div>
  );
};

Pet.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default Pet;
