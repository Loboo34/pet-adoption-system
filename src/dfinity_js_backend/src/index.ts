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
  application: Vec(text),
});

const UserPayload = Record({
  name: text,
  phoneNumber: text,
  email: text,
  address: text,
});



const Pet = Record({
  id: text,
  name: text,
  species: text,
  breed: text,
  gender: text,
  age: text,
  petImage: text,
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
  petImage: text,
  description: text,
  healthStatus: text,
  shelterId: text,
});

const PetImage = Record({
  petId: text,
  petImage: text,
});


const updatePetPayload = Record({
  petId: text,
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
  address: text,
  reasonForAdoption: text,
  //status: text,
});

const AdoptionPayload = Record({
  petId: text,
  userId: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
});

const AdoptionRecords = Record({
  adoptionId: text,
  userId: text,
  petId: text,
  petName: text,
  userName: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
  dateOfAdoption: text,
  status: text,
});

const updateAdoption = Record({
  adoptionId: text,
  userName: text,
  userPhoneNumber: text,
  address: text,
  reasonForAdoption: text,
});

const StatusAdoptionPayload = Record({
  id: text,
  status: text,
});

const Error = Variant({
  NotFound: text,
  InvalidPayload: text,
});

const UsersStorage = StableBTreeMap(0, text, User);
const PetsStorage = StableBTreeMap(1, text, Pet);
const SheltersStorage = StableBTreeMap(2, text, Shelter);
const AdoptionsStorage = StableBTreeMap(3, text, AdoptionRecords);

export default Canister({
  //add user
  addUser: update([UserPayload], Result(User, Error), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const userId = uuidv4();
    const user = {
      id: userId,
      principal: ic.caller(),
      application: [],
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
  getUserOwner: query([], Result(User, Error), () => {
    const userOpt = UsersStorage.values().filter((user) => {
      return user.principal.toText() === ic.caller().toText();
    });
    if (userOpt.length === 0) {
      return Err({
        NotFound: `User with principal=${ic.caller()} not found`,
      });
    }
    return Ok(userOpt[0]);
  }),

  //add pet
  addPet: update([PetPayload], Result(Pet, Error), (payload) => {
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

  //add pet image
  addPetImage: update([PetImage], Result(PetImage, Error), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    PetsStorage.insert(payload.petId, payload);
    return Ok(payload);
  }),



  //get pet
  getPet: query([text], Opt(Pet), (id) => {
    return PetsStorage.get(id);
  }),

  //get pets
  getPets: query([], Vec(Pet), () => {
    return PetsStorage.values();
  }),

  //get pet that are not adopted
  getPetsNotAdopted: query([], Vec(Pet), () => {
    return PetsStorage.values().filter((pet) => pet.adoptionStatus === "notAdopted");
  }),

  //update pet info
  updatePetInfo: update([updatePetPayload], Result(Pet, Error), (payload) => {
    const petOpt = PetsStorage.get(payload.petId);
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
  createShelter: update([ShelterPayload], Result(Shelter, Error), (payload) => {
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
  getShelterOwner: query([], Result(Shelter, Error), () => {
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
    Result(Shelter, Error),
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

  fileForAdoption: update(
    [AdoptionPayload],
    Result(AdoptionRecords, Error),
    (payload) => {
      const userOpt = UsersStorage.get(payload.userId);
      if ("None" in userOpt) {
        return Err({
          NotFound: `user with ID ${payload.userId} not found`,
        });
      }
      const petOpt = PetsStorage.get(payload.petId);
      if ("None" in petOpt) {
        return Err({
          NotFound: `pet with ID ${payload.petId} not found`,
        });
      }

      const user = userOpt.Some;
      const pet = petOpt.Some;

      const adoption = {
        id: uuidv4(),
        userId: user.id,
        petId: pet.id,
        userPhoneNumber: user.phoneNumber,
        address: user.address,
        status: "pending",
        reasonForAdoption: payload.reasonForAdoption,
      };

      const records = {
        adoptionId: adoption.id,
        userId: adoption.userId,
        petId: adoption.petId,
        userPhoneNumber: adoption.userPhoneNumber,
        address: adoption.address,
        reasonForAdoption: adoption.reasonForAdoption,
        dateOfAdoption: new Date().toISOString(),
        userName: user.name,
        petName: pet.name,
        status: "peding",
      };

      //sent records to application
      user.application.push(records.adoptionId);
      AdoptionsStorage.insert(records.adoptionId, records);

      return Ok(records);
    }
  ),

  //get adoption records
  getAdoptionRecords: query([], Vec(AdoptionRecords), () => {
    return AdoptionsStorage.values();
  }),

  // get adoption record
  getAdoptionRecord: query([text], Opt(AdoptionRecords), (id) => {
    return AdoptionsStorage.get(id);
  }),

  //update adoption record
  updateAdoptionRecord: update(
    [updateAdoption],
    Result(AdoptionRecords, Error),
    (payload) => {
      const adoptionOpt = AdoptionsStorage.get(payload.adoptionId);
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

  //change adoption status to copleted and send  to adoption records
  completeAdoption: update(
    [text],
    Result(AdoptionRecords, Error),
    (adoptionId) => {
      const adoptionOpt = AdoptionsStorage.get(adoptionId);
      if (adoptionOpt === null) {
        return Err({ NotFound: "Adoption not found" });
      }
      const adoption = adoptionOpt.Some;
      const updatedAdoption = {
        ...adoption,
        status: "completed",
      };
      AdoptionsStorage.insert(adoptionId, updatedAdoption);
      return Ok(updatedAdoption);
    }
  ),

  //change adoption status to failed
  failAdoption: update([text], Result(AdoptionRecords, Error), (adoptionId) => {
    const adoptionOpt = AdoptionsStorage.get(adoptionId);
    if (adoptionOpt === null) {
      return Err({ NotFound: "Adoption not found" });
    }
    const adoption = adoptionOpt.Some;
    const updatedAdoption = {
      ...adoption,
      status: "failed",
    };
    AdoptionsStorage.insert(adoptionId, updatedAdoption);
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
