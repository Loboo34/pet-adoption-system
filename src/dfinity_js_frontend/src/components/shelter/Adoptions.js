import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import { getAdoptions as getAdoptionsList, completeAdoption, failAdoption, completeAdoptionByPetId } from "../../utils/petAdoption";
import AdoptionInfo from "./Adoption";

const Adoptions = () => {
const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(false);

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

  //complete adoption
  const adopt = async (petId) => {
    try {
      setLoading(true);
      await completeAdoptionByPetId(petId);
      fetchAdoptions();
      NotificationSuccess("Adoption completed successfully");
    } catch (error) {
      console.log({ error });
      NotificationError("Failed to complete adoption");
    } finally {
      setLoading(false);
    }
  };

  //fail adoption
  const fail = async (adoption) => {
    try {
      setLoading(true);
      await failAdoption(adoption);
      fetchAdoptions();
      NotificationSuccess("Adoption failed successfully");
    } catch (error) {
      console.log({ error });
      NotificationError("Failed to fail adoption");
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
   fetchAdoptions();

  }, [
    fetchAdoptions,

  ]);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Adoptions</h1>
          </div>
          <Row xs={1} sm={2} lg={3} className="">
            {adoptions.map((_adoption, index) => (
              <AdoptionInfo
                key={index}
                adoption={{
                  ..._adoption,
                }}
                adopt={adopt}
                fail={fail}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Adoptions;
