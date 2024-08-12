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
  uploadImage,
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
  //const [image, setImage] = useState(null);

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

//  const getAllPets = async () => {
//    try {
//      setLoading(true);

//      const petList = await getPetList();
//      console.log("Pet List:", petList); // Log to check the response format

//      if (Array.isArray(petList)) {
//        const updatedPets = petList.map((pet) => {
//          const petImage = pet.petImage
//            ? `data:image/png;base64,${pet.petImage}`
//            : null;

//          console.log("Pet Image:", petImage); // Log to check the image string
//          return {
//            ...pet,
//            petImage,
//          };
//        });

//        setPets(updatedPets);
//      } else {
//        console.log("Unexpected response format:", petList);
//      }
//    } catch (error) {
//      console.log({ error });
//      toast(<NotificationError text="Failed to fetch pet data." />);
//    } finally {
//      setLoading(false);
//    }
//  };


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

//  const createPet = async (petPayload, petImage) => {
//   try {
//     // Set loading state, if applicable
//     setLoading(true);

//     // Upload the image file
//     let petImageUrl = "";
//     if (petImage) {
//       petImageUrl = await uploadImage(petImage);
//     }

//     // Prepare the pet payload with the uploaded image URL
//     const pet = {
//       ...petPayload,
//       petImage: petImageUrl,
//     };

//     // Add the pet through the backend
//     const response = await addPet(pet);

//     // Check for backend errors
//     if (response.Err) {
//       throw new Error(response.Err.NotFound || "Failed to add pet.");
//     }

//     // Notify success
//     toast(<NotificationSuccess text="Pet added successfully." />);
//     // Fetch all pets or update state as needed
//     getAllPets();
//   } catch (error) {
//     console.error(error);
//     toast(
//       <NotificationError text={error.message || "Failed to create a pet."} />
//     );
//   } finally {
//     // Reset loading state
//     setLoading(false);
//   }
// };




     const createPet = async (pet) => {
     try {
       setLoading(true);
     addPet(pet).then((resp) => {
       getAllPets();
     });
     toast(<NotificationSuccess text="Pet added successfully." />);
   }
   catch (error) {
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
