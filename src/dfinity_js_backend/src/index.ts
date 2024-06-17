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
  age: text,
  image: text,
  description: text,
  healthStatus: text,
  shelterId: text,
});

const Shelter = Record({
  id: text,
  principal: Principal,
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
  img: text,
  pets: Vec(text),
});

const ShelterPayload = Record({
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
  img: text,
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

  //add pet
  addPet: update([PetPayload], Result(Pet, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const petId = uuidv4();
    const pet = {
      id: petId,
      adoptionStatus:  "notAdopted" ,
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

  //add shelter
  addShelter: update([ShelterPayload], Result(Shelter, Message), (payload) => {
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
      const adoptionId = uuidv4();
      const adoption = {
        id: adoptionId,
        status: "pending" ,
        ...payload,
      };

      AdoptionsStorage.insert(adoptionId, adoption);
      return Ok(adoption);
    }
  ),

  ////////////////////////////////////////////
  //user filles for adoption and send records to adoption records
  // fileForAdoptionAndSendRecords: update(
  //   [FileForAdoptionPayload],
  //   Result(AdoptionRecords, Message),
  //   (payload) => {
  //     const userOpt = UsersStorage.get(payload.userId);
  //     const petOpt = PetsStorage.get(payload.petId);
  //     if (userOpt === null || petOpt === null) {
  //       return Err({ NotFound: "User or Pet not found" });
  //     }
  //     const adoptionId = uuidv4();
  //     const adoption = {
  //       id: adoptionId,
  //       status: { pending: "pending" },
  //       ...payload,
  //     };

  //     // const shelterOpt = SheltersStorage.values();
  //     // const shelter = shelterOpt[0];
  //     // const user = userOpt.Some;
  //     // const pet = petOpt.Some;
  //     // const adoptionRecord = {
  //     //  id: adoptionId,
  //     //   userId: user.id,
  //     //   petId: pet.id,
  //     //   adoptionId: adoptionId,
  //     //   dateOfAdoption: new Date().toISOString(),
  //     //   shelterId: shelter.id,
  //     // };

  //     AdoptionsStorage.insert(adoptionId, adoption);
  //    // return Ok(adoptionRecord);

  //     return Ok(adoption);
  //   }
  // ),
  //get adoption
  getAdoption: query([text], Opt(Adoption), (id) => {
    return AdoptionsStorage.get(id);
  }),

  //get adoptions
  getAdoptions: query([], Vec(Adoption), () => {
    return AdoptionsStorage.values();
  }),
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

  //change adoption status to completed
  changeAdoptionStatusToCompleted: update(
    [StatusAdoptionPayload],
    Result(Adoption, Message),
    (payload) => {
      const adoptionOpt = AdoptionsStorage.get(payload.id);
      if (adoptionOpt === null) {
        return Err({ NotFound: "Adoption not found" });
      }
      const adoption = adoptionOpt.Some;
      const updatedAdoption = {
        ...adoption,
        status: "completed",
      };
      AdoptionsStorage.insert(adoption.id, updatedAdoption);
      return Ok(updatedAdoption);
    }
  ),
 

  //change adotion status to approve or reject adoption
  changeAdoptionStatus: update(
    [StatusAdoptionPayload],
    Result(Adoption, Message),
    (payload) => {
      const adoptionOpt = AdoptionsStorage.get(payload.id);
      if (adoptionOpt === null) {
        return Err({ NotFound: "Adoption not found" });
      }
      const adoption = adoptionOpt.Some;
      if (payload.status === "completed") {
        const updatedAdoption = {
          ...adoption,
          ...payload,
          status:  "completed" ,
        };
        AdoptionsStorage.insert(adoption.id, updatedAdoption);
        return Ok(updatedAdoption);
      } else {
        const updatedAdoption = {
          ...adoption,
          status: "failed",
        };
        AdoptionsStorage.insert(adoption.id, updatedAdoption);
        return Ok(updatedAdoption);
      }
    }
  ),

  //get adoption records
  getAdoptionRecords: query([], Vec(AdoptionRecords), () => {
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
