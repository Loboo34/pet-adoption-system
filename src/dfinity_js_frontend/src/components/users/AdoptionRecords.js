import React, { useEffect } from "react";
import PropTypes from "prop-types";
import CompleteAdoption from "./buttons/CompleteAdoption";
import { completeAdoption } from "../../utils/petAdoption";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import Accept from "./AccepteAdoption";
import RejectAdoption from "./buttons/faiDoption";

import { updateAdoption, getAdoption, getAdoptions as getAdoptionsList } from "../../utils/petAdoption";
import UpdateApplication from "./UpdateAdoptionApplication";

const AdoptionApplication = ({ adoption }) => {

const fetchAdoptions = useCallback(async () => {
    try {
      setLoading(true);
      setAdoptions(await getAdoptionsList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  );


  const update = async (adoption) => {
    try {
      setLoading(true);
      await updateAdoption(adoption);
      fetchAdoptions();
      toast(<NotificationSuccess text="Adoption updated successfully" />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update adoption" />);
    } finally {
      setLoading(false);
    }
  }



    
  const { id, petId, petName, userName, userPhoneNumber, address, reasonForAdoption, status } = adoption;


 const triggerUpdate = ( userName, userPhoneNumber, address ) => {    
    update(
      {  id : adoption.id,
        userName,
        userPhoneNumber,
        address,}
    )
  }



useEffect(() => {
    fetchAdoptions();
  }, [] 
  

)

  return (
    <div>
      <div>
        <h1>Adoption Information</h1>
        <span>
          <UpdateApplication update={triggerUpdate} />
          <p>Adoption ID: {id}</p>
          <p>Pet ID: {petId}</p>
          <p>Pet Name: {petName}</p>
          <p>User Name: {userName}</p>
            <p>User Phone Number: {userPhoneNumber}</p>
            <p>Address: {address}</p>
          <p>Reason for Adoption: {reasonForAdoption}</p>
          <p>Status: {status}</p>
        </span>
      </div>
      <div>
      
      </div>
    </div>
  );
};

AdoptionApplication.propTypes = {
  adoption: PropTypes.object.isRequired,

};

export default AdoptionApplication;
