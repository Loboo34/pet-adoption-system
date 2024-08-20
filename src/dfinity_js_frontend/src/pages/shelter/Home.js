import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../../components/utils/Notifications";
import {
  addPet,
  getPets as getPetList,
  getShelterOwner,
  getShelters,
  updatePet,
  getPetsNotAdopted,
} from "../../utils/petAdoption";


import AddPet from "../../components/shelter/AddPet";
import PetInfo from "../../components/shelter/PetInformation";
import { Link } from "react-router-dom";


const Home = () => {
  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(false);
  const [shelter, setShelter] = useState({});
  const [shelters, setShelters] = useState([]);
  const [images, setImages] = useState(null);

  //get all shelters

  const fetchShelters = async () => {
    try {
      const shelters = await getShelters();
      const shelter = shelters.find((shelter) => shelter.id === shelter.id);
      setShelter(shelter);
    } catch (error) {
      console.error(error);
    }
  };

  //fetch pets
  const fetchPets = async () => {
    try {
      const pets = await getPetList();
      const pet = pets.find((pet) => pet.id === pet.id);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  //get all pets
  const getAllPets = async () => {
    try {
      setLoading(true);
      setPets(await getPetList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const createPet = async (pet) => {
    try {
      setLoading(true);
      addPet(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Pet added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to add a pet." />);
    } finally {
      setLoading(false);
    }
  };

  const triggerAdd = ({
    name,
    species,
    breed,
    gender,
    description,
    age,
    petImage,
    healthStatus,
  }) => {
    createPet({
      shelterId: shelter.id,
      name,
      species,
      breed,
      gender,
      description,
      age,
      petImage,
      healthStatus,
    });
  };

  useEffect(() => {
    fetchShelters();
    getAllPets();
    fetchPets();
  }, []);

  return (
    <>
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-bold mb-0">Pets</h1>
          <AddPet createPet={triggerAdd} />

          <Link to="/adoptions?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
            {" "}
            <h1>Adoptions</h1>
          </Link>
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
            </div>   */}

        <div className=" flex">
          <Row xs={1} sm={2} lg={3} className="">
            {pets.map((_petInfo, index) => (
              <PetInfo
                key={index}
                pet={{
                  ..._petInfo,
                }}
                // image={image}
                update={update}
              />
            ))}
          </Row>
        </div>
      </>
    </>
  );
};

export default Home;
