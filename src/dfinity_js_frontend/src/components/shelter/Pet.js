import React from "react";
import PropTypes from "prop-types";
import { Card, Col } from "react-bootstrap";
import HUSKY1 from "../../assets/img/HUSKY1.png";
import { useNavigate } from "react-router-dom";

const Pet = ({ pet, image }) => {
  const { id, name } = pet;
  const navigate = useNavigate();

  const servicePrincipal = window.auth.principalText;

 

  return (
    <div className="" onClick={() =>{
      navigate(`/petInfo?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai&petName=${name}`);
    
    }}>
      <img src={image} alt={name} className="img-fluid w-[350px] h-[500px]" />
      <div>{name}</div>
    </div>
  );
};

Pet.propTypes = {
  pet: PropTypes.object.isRequired,
};

export default Pet;
