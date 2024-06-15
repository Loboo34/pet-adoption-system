import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  getAppointments as getAppointmentList,
  getAppointment,
} from "../../utils/petAdoption";
import Appointment from "./Appointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">Appointments</h1>
          </div>
          <Row xs={1} sm={2} lg={3} className="">
            {appointments.map((_appointment, index) => (
              <Appointment
                key={index}
                appointmentInfo={{
                  ..._appointment,
                }}
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

export default Appointments;
