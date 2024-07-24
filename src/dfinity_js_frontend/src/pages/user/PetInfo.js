import React from 'react'
import HUSKY1 from '../../assets/img/HUSKY1.png'
import { getPets, getPet, fileForAdoption } from '../../utils/petAdoption';
import { useLocation } from 'react-router-dom';
import Adopt from '../../components/shelter/FileForAdoption';
import { toast } from "react-toastify";
import { NotificationSuccess, NotificationError } from "../../components/utils/Notifications";


const PetInfo = () => {
  const [loading, setLoading] = React.useState(false);
  const [pets, setPets] = React.useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const canisterId = params.get("canisterId");
  const petName = params.get("petName");

  const [pet, setPet] = React.useState({});

  const fetchPets = async () => {
    try {
      const pets = await getPets();
      const pet = pets.find((pet) => pet.name === petName);
      setPet(pet);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchPets();
  }, [petName]);

  //get all pets
  const getAllPets = async () => {
    try {
      setLoading(true);
      setPets(await getPets());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };
  //file for adoption
  const adopt = async (pet) => {
    try {
      setLoading(true);
      fileForAdoption(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Filled for adoption succesfilly." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to file for adoption." />);
    } finally {
      setLoading(false);
    }
  };


  const triggerAdopt = ( userId, reasonForAdoption, address, userPhoneNumber ) => {
    adopt({
      userId,
      reasonForAdoption,
      address,
      userPhoneNumber,
      petId: pet.id,
    });
  };

  return (
    <div>
      <img
        src={HUSKY1}
        alt={pet.name}
        className="img-fluid w-[350px] h-[500px]"
      />
      <Adopt adopt={triggerAdopt} />
      <h1>{pet.name}</h1>
      <p>{pet.id}</p>
      <span>
        <p>{pet.breed}</p>
        <p>{pet.age}</p>
        <p>{pet.gender}</p>
      </span>

      <div>
        <h1>About</h1>
        <span>
          Health
          <p>{pet.healthStatus}</p>
        </span>
        <span>
          Description
          <p>{pet.description}</p>
        </span>
      </div>
    </div>
  );
}


export default PetInfo