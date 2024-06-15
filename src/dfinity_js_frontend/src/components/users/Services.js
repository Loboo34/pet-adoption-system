import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  getServices as getServiceList,
  bookAppointment,
  getAppointments as getAppointmentList,
  updateAppointment,
} from "../../utils/petAdoption";
import {
  getClientByPrincipal,
  getClients as getclientList,
  createClient,
} from "../../utils/client";
import Cservice from "./Service";
import User from "./User";
import Appointment from "./Appointment";

const Cservices = () => {
  const [services, setServices] = useState([]);
  const [client, setClient] = useState({});
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const getAllClients = useCallback(async () => {
    try {
      setLoading(true);
      setClients(await getclientList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });
  [];

  const getClient = useCallback(async () => {
    try {
      setLoading(true);
      setClient(await getClientByPrincipal());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const getServices = useCallback(async () => {
    try {
      setLoading(true);
      setServices(await getServiceList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const book = async (Booking) => {
    try {
      setLoading(true);
      bookAppointment(Booking).then((resp) => {
        getServices();
      });
      toast(<NotificationSuccess text="Appointment booked successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to book appointment." />);
    } finally {
      setLoading(false);
    }
  };

  const getAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setAppointments(await getAppointmentList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const update = async (UpdateAppointmentInfo) => {
    try {
      setLoading(true);
      updateAppointment(UpdateAppointmentInfo).then((resp) => {
        getAppoint();
      });
      toast(<NotificationSuccess text="Appointment updated successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to update appointment." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
    getClient();
    getServices();
    getAppointments();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className=" flex w-full">
            <div>
              <h1>Client Info</h1>
              {clients.map((_client, index) => (
                <User
                  key={index}
                  client={{
                    ..._client,
                  }}
                />
              ))}
            </div>
            <div>
              <h1>Appointment</h1>
              {appointments.map((_appointmentInfo, index) => (
                <Appointment
                  key={index}
                  appointmentInfo={{
                    ..._appointmentInfo,
                  }}
                  update={update}
                />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Services offered</h1>
          </div>
          <Row xs={1} sm={2} lg={3} className="">
            {services.map((_cservice, index) => (
              <Cservice
                key={index}
                service={{
                  ..._cservice,
                }}
                book={book}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Cservices;
