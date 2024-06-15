import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

import { NotificationSuccess, NotificationError } from "../utils/Notifications";

import {
  createService,
  getServices as getServiceList,
  getProfessionalByPrincipal,
  getProfessionals as getProfessionalsList,
} from "../../utils/petAdoption";

import AddService from "./Addservice";
import Pservice from "./Service";
import Appointments from "./Appointments";

const Pservices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [professional, setProfessional] = useState({});
  const [professionals, setProfessionals] = useState([]);

  const getAllProfessionals = useCallback(async () => {
    try {
      setLoading(true);
      setProfessionals(await getProfessionalsList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const fetchProfessional = useCallback(async () => {
    try {
      setLoading(true);
      setProfessional(
        await getProfessionalByPrincipal().then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  const addService = async (service) => {
    try {
      setLoading(true);
      createService(service).then((resp) => {
        getServices();
      });
      toast(<NotificationSuccess text="Service added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a service." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessional();
    getAllProfessionals();
    getServices();
  }, []);

  return (
    <>
      {!loading ? (
        !professional?.name ? (
          <AddService save={addService} />
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fs-4 fw-bold mb-0">Services offered</h1>
              <AddService save={addService} />
            </div>
            <div className=" w-[350px] border">
              {services.map((_service, index) => (
                <Pservice
                  key={index}
                  service={{
                    ..._service,
                  }}
                />
              ))}
            </div>
            <div>
              <Appointments />
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Pservices;
