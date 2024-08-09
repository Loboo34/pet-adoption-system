import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fileForAdoption, getPets as getPetList, getUserOwner, getUsers } from "../../utils/petAdoption";

import Pet from "../../components/shelter/Pet";

//bacground image
const Home = ({user}) => {
   const {id, name, phoneNumber, email, address} = user
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const getAllPets = useCallback(async () => {
    try {
      setLoading(true);
      setPets(await getPetList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

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

  useEffect(() => {
   
    getAllPets();
  }, []);

  return (
    <div className="w-[100%] flex flex-col relative">
      <div className=" flex relative space-x-4 ">
        <h1>Ani-pet</h1>
        <p className="">{id}</p>
      </div>
      <div className="justify-center">
        <h1>Welcome {name} to the Pet Adoption Shelter</h1>
        <Link to="/records?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
          Adoption Records
        </Link>
        <div className=" w-[350px] border">
          {pets.map((_pet, index) => (
            <Pet
              key={index}
              pet={{
                ..._pet,
              }}
              adopt={adopt}
            />
          ))}
        </div>
      </div>
      <footer>
        <p>&copy; 2021 Pet Adoption Shelter</p>
      </footer>
    </div>
  );
};

export default Home;
