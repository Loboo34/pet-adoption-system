import React from "react";
import PropTypes from "prop-types";
import CompleteAdoption from "./buttons/CompleteAdoption";
import { completeAdoption } from "../../utils/petAdoption";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import Accept from "./AccepteAdoption";



const AdoptionInfo = ({ adoption, complete }) => {
  const {id, petId, petName, userName , reasonForAdoption, status } = adoption;

  // const triggerAdopt = () => {
  //   book({
  //    petId: petId,
  //   });
  // };



  return (
    <div>
      <div>
        <h1>Adoption Information</h1>
        <span>
          <p>Adoption ID: {id}</p>
          <p>Pet ID: {petId}</p>
          <p>Pet Name: {petName}</p>
          <p>User Name: {userName}</p>
          <p>Reason for Adoption: {reasonForAdoption}</p>
          <p>Status: {status}</p>
        </span>
      </div>
      <div>
      <Accept />
      </div>
    </div>
  );
};


AdoptionInfo.propTypes = {
  adoption: PropTypes.object.isRequired,
 
};

export default AdoptionInfo;
