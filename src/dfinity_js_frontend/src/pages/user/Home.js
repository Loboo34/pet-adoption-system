import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { fileForAdoption, getPets as getPetList, getUserOwner, getUsers } from "../../utils/petAdoption";

import Pet from "../../components/shelter/Pet";

//bacground image
const Home = () => {
  // const {id} = user
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  //get users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setUsers(await getUsers());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  //fetch user
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setUser(
        await getUserOwner().then(async (res) => {
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
    fetchUsers();
    fetchUser();
    ``;
    getAllPets();
  }, []);

  return (
    <div className="w-[100%] flex flex-col relative">
      <div className=" flex relative space-x-4 ">
        <h1>Ani-pet</h1>
        <p className="">id</p>
      </div>
      <div className="justify-center">
        <h1>Welcome to the Pet Adoption Shelter</h1>
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
