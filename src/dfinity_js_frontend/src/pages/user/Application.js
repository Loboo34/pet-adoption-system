import React, { useCallback, useEffect, useState } from "react";
import { login, logout as destroy } from "../../utils/auth";
import { Notification, NotificationError, NotificationSuccess } from "../../components/utils/Notifications";
import Cover from "../../components/utils/Cover";
import coverImg from "../../assets/img/sandwich.jpg";
import Loader from "../../components/utils/Loader";

import { getAdoptions as getAdoptionsList, getAdoption, updateAdoption } from "../../utils/petAdoption";
import PetInfo from "./PetInfo";
import AdoptionApplication from "../../components/users/AdoptionRecords";
import { toast } from "react-toastify";

const Application = () => {
const [adoption, setAdoption] = useState({});
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
    });

 const fetchAdoption = useCallback(async () => {
    try {
      setLoading(true);
      setAdoption(
        await getAdoption().then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
    );

    
  const update = async (updateAdoptionPayload) => {
    try {
      setLoading(true);
      await updateAdoption(updateAdoptionPayload);
      fetchAdoptions();
      toast(<NotificationSuccess text="Adoption updated successfully" />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update adoption" />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
 
    fetchAdoptions();
     fetchAdoption();
  }, []);

  return (
    <>
    {!loading ? (
      
      <div>
        <Cover img={coverImg} title="Adoption Application" />
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <AdoptionApplication adoption={adoptions} update={update} />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loader />
    )}
    
    </>
  );
};
export default Application;
