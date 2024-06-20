import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import { addPet, getPets as getPetList, } from "../../utils/petAdoption";

import AddService from "./Addshelter";
import Pservice from "./Pet";
import Appointments from "./Adoptions";
import Pet from "./Pet";
import AddPet from "./AddPet";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  //const [professionals, setProfessionals] = useState([]);

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


  const addPet = async (pet) => {
    try {
      setLoading(true);
      createPet(pet).then((resp) => {
        getPets();
      });
      toast(<NotificationSuccess text="Pet added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a pet." />);
    } finally {
      setLoading(false);
    }
  };

  // const getAllProfessionals = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     setProfessionals(await getProfessionalsList());
  //   } catch (error) {
  //     console.log({ error });
  //   } finally {
  //     setLoading(false);
  //   }
  // });



  // const fetchProfessional = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     setProfessional(
  //       await getProfessionalByPrincipal().then(async (res) => {
  //         console.log(res);
  //         return res.Ok;
  //       })
  //     );
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // });





  useEffect(() => {
    fetchProfessional();
    getAllProfessionals();
    getServices();
  }, []);

  return (
    <>
      {!loading ? (
        !professional?.name ? (
          <AddService save={addService} />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fs-4 fw-bold mb-0">Pets</h1>
             <AddPet save={addPet} />
            </div>
            <div className=" w-[350px] border">
              {pets.map((_pet, index) => (
                <Pet
                  key={index}
                  pet={{
                    ..._pet,
                  }}
                />
              ))}
            </div>
            <div>
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Pets;
