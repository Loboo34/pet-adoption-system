import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";



export async function createService(service) {
  return window.canister.beautyPalor.createService(service);
}

export async function getServices() {
  try {
    return await window.canister.beautyPalor.getServices();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getService(serviceId) {
  try {
    return await window.canister.beautyPalor.getService(serviceId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}



export async function createProfessional(professional) {
  return window.canister.beautyPalor.createProfessional(professional);
}


export async function getProfessionalByPrincipal() {
  try {
    return await window.canister.beautyPalor.getProfessionalByPrincipal();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getProfessionals() {
  try {
    return await window.canister.beautyPalor.getProfessionals();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getProfessional(professionalId) {
  try {
    return await window.canister.beautyPalor.getProfessional(professionalId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}




export async function bookAppointment(Booking) {
  return window.canister.beautyPalor.bookAppointment(Booking);
}

export async function getAppointments() {
  try {
    return await window.canister.beautyPalor.getAppointments();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function getAppointment(appointmentId) {
  try {
    return await window.canister.beautyPalor.getAppointment(appointmentId);
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return null;
  }
}

export async function updateAppointment(UpdateAppointmentInfo) {
  return window.canister.beautyPalor.updateAppointment(UpdateAppointmentInfo);
}

