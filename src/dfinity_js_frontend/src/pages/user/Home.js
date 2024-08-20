import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fileForAdoption,
  getPets as getPetList,
  getUserOwner,
  getUsers,
  getPetsNotAdopted,
} from "../../utils/petAdoption";

import Pet from "../../components/shelter/Pet";
import Nav from "../../components/users/Nav";

//bacground image
const Home = ({ user }) => {
  const { id, name, phoneNumber, email, address } = user;
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get pets not adopted
  const getPets = useCallback(async () => {
    try {
      setLoading(true);
      setPets(await getPetsNotAdopted());
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
    //fetchAllPets();
    getPets();
  }, []);

  return (
    <div className=" relative">
      <Nav />
      <div className="text-center pt-3 pb-3">
        <h1>Find Your New Friend</h1>
        {/* <Link to="/records?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai">
          Adoption Records
        </Link> */}
        <div className="flex space-x-3 pl-4 ">
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
