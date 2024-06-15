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

const AdoptionStatus = Variant({
  completed: text,
  inProgresse: text,
  failed: text,
  pending: text,
  notAdopted: text,
});

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
  adoptionStatus: AdoptionStatus,
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
  pets: Vec(text),
});

const ShelterPayload = Record({
  name: text,
  location: text,
  phoneNumber: text,
  email: text,
});

const Adoption = Record({
  id: text,
  petId: text,
  userId: text,
  status: AdoptionStatus,
  //applicationDate: text,
});

const AdoptionPayload = Record({
  petId: text,
  userId: text,
});

const AdoptionRecords = Record({
  id: text,
  petId: text,
  adoptionId: text,
  dateOfAdoption: text,
  shelterId: text,
});

const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
});

const ShelltersStorage = StableBTreeMap(0, text, Shelter);
const UsersStorage = StableBTreeMap(1, text, User);
const PetsStorage = StableBTreeMap(2, text, Pet);
const AdoptionsStorage = StableBTreeMap(3, text, Adoption);

export default Canister({
  //add user
  addUser: query([UserPayload], Result(User, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const id = uuidv4();
    const user = { id, principal: ic.caller(), ...payload };
    UsersStorage.insert(id, user);
    return Ok(user);
  }),

  //get user
  getUser: query([text], Opt(User), (id) => {
    return UsersStorage.get(id);
  }),

  //get users
  getUsers: query([], Vec(User), () => {
    return UsersStorage.values();
  }),

  //add pet
  addPet: query([PetPayload], Result(Pet, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const id = uuidv4();
    const pet = {
      id,
      adoptionStatus: { notAdopted: "notAdopted" },
      ...payload,
    };
    PetsStorage.insert(id, pet);
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
  addShelter: query([ShelterPayload], Result(Shelter, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const id = uuidv4();
    const shelter = { id, principal: ic.caller(), pets: [], ...payload };
    ShelltersStorage.insert(id, shelter);
    return Ok(shelter);
  }),

  //get shelter
  getShelter: query([text], Opt(Shelter), (id) => {
    return ShelltersStorage.get(id);
  }),

  //get shelters
  getShelters: query([], Vec(Shelter), () => {
    return ShelltersStorage.values();
  }),

  
  //user filles for adoption
  fileForAdoption: query([AdoptionPayload], Result(Adoption, Message), (payload) => {
    if (typeof payload !== "object" || Object.keys(payload).length === 0) {
      return Err({ NotFound: "invalid payoad" });
    }
    const id = uuidv4();
    const adoption = { id, status: { pending: "pending" }, ...payload };
    AdoptionsStorage.insert(id, adoption);
    return Ok(adoption);
  }),

  //get adoption
  getAdoption: query([text], Opt(Adoption), (id) => {
    return AdoptionsStorage.get(id);
  }),

  //get adoptions
  getAdoptions: query([], Vec(Adoption), () => {
    return AdoptionsStorage.values();
  }),

  //approve adoption
 

  //reject adoption
 

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
