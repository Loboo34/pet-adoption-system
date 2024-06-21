import React from 'react'
import HUSKY1 from '../../assets/img/HUSKY1.png'
import { getPets, getPet } from '../../utils/petAdoption';
import { useLocation } from 'react-router-dom';
import Adopt from '../../components/shelter/FileForAdoption';

const PetInfo = ({triggerAdopt}) => {
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
  }

  React.useEffect(() => {
    fetchPets();
  }, [petName]);

  

  return (
    <div>
    <img src={HUSKY1} alt={pet.name} className="img-fluid w-[350px] h-[500px]" />
    <Adopt adopt={triggerAdopt}/>
    <h1>{pet.name}</h1>
    <p>{pet.id}</p>
    <span>
      <p>{pet.breed}</p>
      <p>{pet.age}</p>
      <p>{pet.gender}</p>
    </span>

    <div>
      <h1>About</h1>
      <span>Health
        <p>{pet.healthStatus}</p>
      </span>
      <span>Description
        <p>{pet.description}</p>
      </span>
      </div>
    </div>
  );
}


export default PetInfo