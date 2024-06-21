import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { addPet, getPets as getPetList, getShelterOwner, getShelters, fileForAdoption } from "../../utils/petAdoption";


import Pet from "./Pet";
import AddPet from "./AddPet";
import PetInfo from "./PetInformation";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [shelter, setShelter] = useState({});
  const [shelters, setShelters] = useState([]);


  //get all shelters
  const fetchShelters = useCallback(async () => {
    try {
      setLoading(true);
      setShelters(await getShelters());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

//fetch shelter
  const fetchShelter = useCallback(async () => {
    try {
      setLoading(true);
      setShelter(
        await getShelterOwner().then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
const getAllPets = useCallback(async () => {
    try {
      setLoading(true);
      setPets(await getPetList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  })


  const createPet = async (pet) => {
    try {
      setLoading(true);
      addPet(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Pet added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a pet." />);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchShelters();
    fetchShelter();
    getAllPets();
  }, []);

  return (
    <>
     
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fs-4 fw-bold mb-0">Pets</h1>
              <AddPet save={createPet} />
            </div>
             {/* <div className=" w-[350px] border">
              {pets.map((_pet, index) => (
                <Pet
                  key={index}
                  pet={{
                    ..._pet,
                  }}
                />
              ))}
            </div>  */}

          
             <div>
              {pets.map((_petInfo, index) => (
                <PetInfo
                  key={index}
                  pet={{
                    ..._petInfo,
                  }}
                />
              ))}
            </div> 
          </>
      
    </>
  );
};

export default Pets;
