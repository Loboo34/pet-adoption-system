import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  addPet,
  getPets as getPetList,
  getShelterOwner,
  getShelters,
  updatePet,
} from "../../utils/petAdoption";

import Pet from "./Pet";
import AddPet from "./AddPet";
import PetInfo from "./PetInformation";
import { Link } from "react-router-dom";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shelter, setShelter] = useState({});
  const [shelters, setShelters] = useState([]);
  const [image, setImage] = useState(null);

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

  //fetch shelter

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

  // const uploadImage = async (event) => {
  //   const file = event.target.files[0];
  //   const options = {
  //     maxSizeMB: 1, // Compress to under 1 MB
  //     maxWidthOrHeight: 1024, // Resize if necessary
  //   };

  //   try {
  //     const compressedFile = await imageCompression(file, options);
  //     const base64 = await convertToBase64(compressedFile);
  //     setImage(base64); // Save the compressed base64 string
  //   } catch (error) {
  //     console.error("Error compressing image:", error);
  //   }
  // };

 const createPet = async (pet, petImage) => {
   try {
     setLoading(true);

     // Upload the image separately (if applicable)
     let petImageUrl;
     if (petImage) {
       petImageUrl = await uploadImage(petImage);
     }

     // Create the pet payload
     const petPayload = {
       ...pet,
       petImage: petImageUrl || pet.petImage, // Use the uploaded image URL or existing petImage
     };

     // Validate the payload (optional, based on your backend's needs)
     if (!petPayload.name || !petPayload.petImage) {
       throw new Error("Pet name and image are required.");
     }

     // Call the backend function to add the pet
     const response = await addPet(petPayload);

     // Check if the backend returned an error
     if (response.Err) {
       throw new Error(response.Err.NotFound || "Failed to add pet");
     }

     // On success, refresh the pet list and show success notification
     getAllPets();
     toast(<NotificationSuccess text="Pet added successfully." />);
   } catch (error) {
     console.log({ error });
     toast(
       <NotificationError text={error.message || "Failed to create a pet."} />
     );
   } finally {
     setLoading(false);
   }
 };




  // const createPet = async (pet) => {
  //   try {
  //     setLoading(true);
  //   addPet(pet).then((resp) => {
  //     getAllPets();
  //   });
  //   toast(<NotificationSuccess text="Pet added successfully." />);
  // }
  // catch (error) {
  //   console.log({ error });
  //   toast(<NotificationError text="Failed to add a pet." />);
  // } finally {
  //   setLoading(false);
  // }
  // };

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
    console.log("Data being sent:", {
      age,
      name,
      description,
      healthStatus,
      gender,
      shelterId: shelter.id,
      breed,
      petImage,
      species,
    });
  };

  const update = async (pet) => {
    try {
      setLoading(true);
      updatePet(pet).then((resp) => {
        getAllPets();
      });
      toast(<NotificationSuccess text="Pet updated successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update a pet." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();

    getAllPets();
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
            </div>  */}

        <div>
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
        </div>
      </>
    </>
  );
};

export default Pets;
