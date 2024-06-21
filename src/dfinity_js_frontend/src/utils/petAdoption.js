import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";

//add shelter
export async function createShelter(shelter) {
  return window.canister.petAdoption.createShelter(shelter);
}


export async function addPet(pet) {
  return window.canister.petAdoption.addPet(pet);
}

//add user
export async function addUser(user) {
  return window.canister.petAdoption.addUser(user);
}

//file for adoption
export async function fileForAdoption(petId) {
  return window.canister.petAdoption.fileForAdoption(petId);
}

//complete adoption
export async function completeAdoption(petId) {
  return window.canister.petAdoption.completeAdoption(petId);
}

//fail adoption
export async function failAdoption(petId) {
  return window.canister.petAdoption.failAdoption(petId);
}

//get shelters
export async function getShelters() {
  try {
    return await window.canister.petAdoption.getShelters();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get shelter
export async function getShelter(shelterId) {
  try {
    return await window.canister.petAdoption.getShelter(shelterId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}


export async function getPets() {
  try {
    return await window.canister.petAdoption.getPets();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getPet(petId) {
  try {
    return await window.canister.petAdoption.getPet(petId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}

//get users
export async function getUsers() {
  try {
    return await window.canister.petAdoption.getUsers();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
      
    }
    return [];
  }
}


export async function getUser(userId) {
  try {
    return await window.canister.petAdoption.getUser(userId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}


//get adoptions
export async function getAdoptions() {
  try {
    return await window.canister.petAdoption.getAdoptions();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get adoption
export async function getAdoption(adoptionId) {
  try {
    return await window.canister.petAdoption.getAdoption(adoptionId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}

//get user by owner
export async function getUserOwner() {
  try {
    return await window.canister.petAdoption.getUserOwner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get shelter by owner
export async function getShelterOwner() {
  try {
    return await window.canister.petAdoption.getShelterOwner();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//update adoption
export async function updateAdoption(adoption) {
  return window.canister.petAdoption.updateAdoption(adoption);
}

//update shelter
export async function updateShelter(shelter) {
  return window.canister.petAdoption.updateShelter(shelter);
}

//update pet
export async function updatePet(pet) {
  return window.canister.petAdoption.updatePet(pet);
}

