import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  None,
  Some,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  Canister,
} from "azle";

import { v4 as uuidv4 } from "uuid";

const User = Record({
  id: text,
  principal: Principal,
  name: text,
  phoneNumber: text,
  email: text,
  address: text,
});

const UserPayload = Record({
  name: text,
  phoneNumber: text,
  email: text,
  address: text,
});

// const AdoptionStatus = Variant({
//   completed: text,
//   // inProgresse: text,
//   failed: text,
//   pending: text,
//   notAdopted: text,
// });

const Pet = Record({
  id: text,
  name: text,
  species: text,
  breed: text,
  gender: text,
  age: text,
  image: text,
  description: text,
  healthStatus: text,
  shelterId: text,
  adoptionStatus: text,
});

const PetPayload = Record({
  name: text,
  species: text,
  breed: text,
  gender: text,
  age: text,
  image: text,
  description: text,
  healthStatus: text,
  shelterId: text,
});

const updatePetPayload = Record({
  id: text,
  healthStatus: text,
  age: text,
});

const Shelter = Record({
  id: text,
  principal: Principal,
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
  
  pets: Vec(text),
});

const ShelterPayload = Record({
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
 
});

const updateShelterPayload = Record({
  id: text,
  phoneNumber: text,
  email: text,
});

const Adoption = Record({
  id: text,
  petId: text,
  userId: text,
  userPhoneNumber: text,
  reasonForAdoption: text,
  status: text,
});

const AdoptionPayload = Record({
  petId: text,
  userId: text,
  userPhoneNumber: text,
  reasonForAdoption: text,
});

const updateAdoptionPayload = Record({
  id: text,
  petId: text,
  userPhoneNumber: text,
});

const StatusAdoptionPayload = Record({
  id: text,
  status: text,
});

const AdoptionRecords = Record({
  id: text,
  userId: text,
  petId: text,
  adoptionId: text,
  dateOfAdoption: text,
  shelterId: text,
});

const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
});

const UsersStorage = StableBTreeMap(0, text, User);
const PetsStorage = StableBTreeMap(1, text, Pet);
const SheltersStorage = StableBTreeMap(2, text, Shelter);
const AdoptionsStorage = StableBTreeMap(3, text, Adoption);

export default Canister({
  //add user
  addUser: update([UserPayload], Result(User, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const userId = uuidv4();
    const user = {
      id: userId,
      principal: ic.caller(),
      ...payload,
    };
    UsersStorage.insert(userId, user);
    return Ok(user);
  }),

  //get users
  getUsers: query([], Vec(User), () => {
    return UsersStorage.values();
  }),

  //get user
  getUser: query([text], Opt(User), (id) => {
    return UsersStorage.get(id);
  }),

  //get user by principal
  getUserOwner: query([], Result(User, Message), () => {
    const userOpt = UsersStorage.values().filter((user) => {
      return user.principal.toText() === ic.caller().toText();
    });
    if (userOpt.length === 0) {
      return Err({
        NotFound: `User with principal=${ic.caller()} not found`,
      });
    }
    return Ok(userOpt[0]);
  }
  ),

  //add pet
  addPet: update([PetPayload], Result(Pet, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const petId = uuidv4();
    const pet = {
      id: petId,
      adoptionStatus: "notAdopted",
      ...payload,
    };
    PetsStorage.insert(petId, pet);
    return Ok(pet);
  }),

  //get pet
  getPet: query([text], Opt(Pet), (id) => {
    return PetsStorage.get(id);
  }),

  //get pets
  getPets: query([], Vec(Pet), () => {
    return PetsStorage.values();
  }),

  //update pet info
  updatePetInfo: update([updatePetPayload], Result(Pet, Message), (payload) => {
    const petOpt = PetsStorage.get(payload.id);
    if (petOpt === null) {
      return Err({ NotFound: "Pet not found" });
    }
    const pet = petOpt.Some;
    const updatedPet = {
      ...pet,
      ...payload,
    };
    PetsStorage.insert(pet.id, updatedPet);
    return Ok(updatedPet);
  }),

  //add shelter
  createShelter: update([ShelterPayload], Result(Shelter, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const shelterId = uuidv4();
    const shelter = {
      id: shelterId,
      principal: ic.caller(),
      pets: [],
      ...payload,
    };
    SheltersStorage.insert(shelterId, shelter);
    return Ok(shelter);
  }),

  //get shelter
  getShelter: query([text], Opt(Shelter), (id) => {
    return SheltersStorage.get(id);
  }),

  //get shelters
  getShelters: query([], Vec(Shelter), () => {
    return SheltersStorage.values();
  }),

  //get shelter by principal
  getShelterOwner: query([], Result(Shelter, Message), () => {
    const shelterOpt = SheltersStorage.values().filter((shelter) => {
      return shelter.principal.toText() === ic.caller().toText();
    });
    if (shelterOpt.length === 0) {
      return Err({
        NotFound: `Shelter with principal=${ic.caller()} not found`,
      });
    }
    return Ok(shelterOpt[0]);
  }),
  
  //update shelter info
  updateShelterInfo: update(
    [updateShelterPayload],
    Result(Shelter, Message),
    (payload) => {
      const shelterOpt = SheltersStorage.get(payload.id);
      if (shelterOpt === null) {
        return Err({ NotFound: "Shelter not found" });
      }
      const shelter = shelterOpt.Some;
      const updatedShelter = {
        ...shelter,
        ...payload,
      };
      SheltersStorage.insert(shelter.id, updatedShelter);
      return Ok(updatedShelter);
    }
  ),

  //search pets by species
  searchPetsBySpecies: query([text], Vec(Pet), (species) => {
    return PetsStorage.values().filter((pet) => pet.species === species);
  }),

  //user filles for adoption
  fileForAdoption: update(
    [AdoptionPayload],
    Result(Adoption, Message),
    (payload) => {
      const userOpt = UsersStorage.get(payload.userId);
      const petOpt = PetsStorage.get(payload.petId);
      if (userOpt === null || petOpt === null) {
        return Err({ NotFound: "User or Pet not found" });
      }
      // const adoptionId = uuidv4();
      const adoption = {
        id: uuidv4(),
        status: "pending",
        ...payload,
      };

      AdoptionsStorage.insert(adoption.id, adoption);
      return Ok(adoption);
    }
  ),

  //update adoption
  updateAdoption: update(
    [updateAdoptionPayload],
    Result(Adoption, Message),
    (payload) => {
      const adoptionOpt = AdoptionsStorage.get(payload.id);
      if (adoptionOpt === null) {
        return Err({ NotFound: "Adoption not found" });
      }
      const adoption = adoptionOpt.Some;
      const updatedAdoption = {
        ...adoption,
        ...payload,
      };
      AdoptionsStorage.insert(adoption.id, updatedAdoption);
      return Ok(updatedAdoption);
    }
  ),

  //update adoption status
  // updateAdoptionStatus: update(
  //   [StatusAdoptionPayload],
  //   Result(Adoption, Message),
  //   (payload) => {
  //     const adoptionOpt = AdoptionsStorage.get(payload.id);
  //     if (adoptionOpt === null) {
  //       return Err({ NotFound: "Adoption not found" });
  //     }
  //     const adoption = adoptionOpt.Some;
  //     const updatedAdoption = {
  //       ...adoption,
  //       status: payload.status,
  //     };
  //     AdoptionsStorage.insert(adoption.id, updatedAdoption);
  //     return Ok(updatedAdoption);
  //   }
  // ),

  //change adoption status to completed
  // completeAdoption: update([text], Result(Adoption, Message), (id) => {
  //   const adoptionOpt = AdoptionsStorage.get(id);
  //   if (adoptionOpt === null) {
  //     return Err({ NotFound: "Adoption not found" });
  //   }
  //   const adoption = adoptionOpt.Some;
  //   const updatedAdoption = {
  //     ...adoption,
  //     status: "completed",
  //   };
  //   AdoptionsStorage.insert(adoption.id, updatedAdoption);
  //   return Ok(updatedAdoption);
  // }),

  //change adoption status to copleted and send  to adoption records
   completeAdoption: update([text], Result(AdoptionRecords, Message), (id) => {
     const adoptionOpt = AdoptionsStorage.get(id);
     if (adoptionOpt === null) {
       return Err({ NotFound: "Adoption not found" });
     }
     const adoption = adoptionOpt.Some;
     const updatedAdoption = {
       ...adoption,
       status: "completed",
     };
     AdoptionsStorage.insert(adoption.id, updatedAdoption);

     //change the adoption status of the pet
     const petOpt = PetsStorage.get(adoption.petId);
     if (petOpt === null) {
       return Err({ NotFound: "Pet not found" });
     }
     const pet = petOpt.Some;
     const updatedPet = {
       ...pet,
       adoptionStatus: "completed",
     };
     PetsStorage.insert(pet.id, updatedPet);

     const adoptionRecord = {
       id: uuidv4(),
       userId: adoption.userId,
       petId: adoption.petId,
       adoptionId: adoption.id,
       dateOfAdoption: new Date().toISOString(),
       shelterId: "shelterId",

    };

     return Ok(adoptionRecord);
   }),


 
  //complete adoption using pet id
  completeAdoptionByPetId: update(
    [text],
    Result(AdoptionRecords, Message),
    (petId) => {
      const adoptionOpt = AdoptionsStorage.values().filter(
        (adoption) => adoption.petId === petId
      );
      if (adoptionOpt.length === 0) {
        return Err({ NotFound: "Adoption not found" });
      }
      const adoption = adoptionOpt[0];
      const updatedAdoption = {
        ...adoption,
        status: "completed",
      };
      AdoptionsStorage.insert(adoption.id, updatedAdoption);

      //change the adoption status of the pet
      const petOpt = PetsStorage.get(adoption.petId);
      if (petOpt === null) {
        return Err({ NotFound: "Pet not found" });
      }
      const pet = petOpt.Some;
      const updatedPet = {
        ...pet,
        adoptionStatus: "completed",
      };
      PetsStorage.insert(pet.id, updatedPet);

      const adoptionRecord = {
        id: uuidv4(),
        userId: adoption.userId,
        petId: adoption.petId,
        adoptionId: adoption.id,
        dateOfAdoption: new Date().toISOString(),
        shelterId: "shelterId",
      };

      return Ok(adoptionRecord);
    }
  ),
  

  //change adoption status to failed
  failAdoption: update([text], Result(Adoption, Message), (id) => {
    const adoptionOpt = AdoptionsStorage.get(id);
    if (adoptionOpt === null) {
      return Err({ NotFound: "Adoption not found" });
    }
    const adoption = adoptionOpt.Some;
    const updatedAdoption = {
      ...adoption,
      status: "failed",
    };
    AdoptionsStorage.insert(adoption.id, updatedAdoption);
    return Ok(updatedAdoption);
  }),

  //get adoption
  getAdoption: query([text], Opt(Adoption), (id) => {
    return AdoptionsStorage.get(id);
  }),

  //get adoptions
  getAdoptions: query([], Vec(Adoption), () => {
    return AdoptionsStorage.values();
  }),

  //get adoption records
  getAdoptionRecords: query([], Vec(AdoptionRecords), () => {
    return [];
  }),
});
globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
