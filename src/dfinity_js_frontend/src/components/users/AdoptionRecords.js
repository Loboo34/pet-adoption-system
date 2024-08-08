import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { NotificationError, NotificationSuccess } from "../utils/Notifications";

import {
  updateAdoptionInfo,
  getAdoptionRecords as getAdoptionsList,
} from "../../utils/petAdoption";
import UpdateApplication from "./UpdateAdoptionApplication";
import { toast } from "react-toastify";

const AdoptionApplication = ({ adoption, update }) => {


   const { adoptionId, petId, petName, userName, userPhoneNumber, address, reasonForAdoption, status } = adoption;





   const triggerUpdate = (userName, userPhoneNumber, address) => {
     update({id: adoptionId , userName, userPhoneNumber, address });
   };



  return (
    <div>
      <div>
        <h1>Adoption Information</h1>
        <span>
           <UpdateApplication update={triggerUpdate} /> 
          <p>Adoption ID: {adoptionId}</p>
          <p>Pet ID: {petId}</p>
          <p>Pet Name: {petName}</p>
          <p>User Name: {userName}</p>
          <p>User Phone Number: {userPhoneNumber}</p>
          <p>Address: {address}</p>
          <p>Reason for Adoption: {reasonForAdoption}</p>
          <p>Status: {status}</p>
        </span>
      </div>
      <div></div>
    </div>
  );
};




export default AdoptionApplication;
