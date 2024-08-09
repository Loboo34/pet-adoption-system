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
export async function fileForAdoption(pet) {
  return window.canister.petAdoption.fileForAdoption(pet);
}

//complete adoption
export async function completeAdoption(id) {
  return window.canister.petAdoption.completeAdoption(id);
}


//fail adoption
export async function failAdoption(id) {
  return window.canister.petAdoption.failAdoption(id);
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
export async function getAdoptionRecords() {
  try {
    return await window.canister.petAdoption.getAdoptionRecords();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

//get adoption
export async function getAdoptionRecord(adoptionId) {
  try {
    return await window.canister.petAdoption.getAdoptionRecord(adoptionId);
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
 export async function updateAdoptionRecord(adoptionRecord) {
   return window.canister.petAdoption.updateAdoptionRecord(adoptionRecord);
 }

//update shelter
export async function updateShelter(shelter) {
  return window.canister.petAdoption.updateShelter(shelter);
}

//update pet
export async function updatePet(pet) {
  return window.canister.petAdoption.updatePet(pet);
}

